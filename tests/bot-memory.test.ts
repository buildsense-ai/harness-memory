import { afterAll, beforeAll, expect, it } from 'vitest';
import { Pool } from 'pg';
import { buildApp } from '../src/app.js';
import { ref } from '../src/contracts.js';
import { HttpError } from '../src/contracts.js';
import { migrate } from '../src/db/migrate.js';
import { createProject } from '../src/db/projects.js';

const pool = new Pool({ connectionString: process.env.TEST_DATABASE_URL });
let app: Awaited<ReturnType<typeof buildApp>>;
let project: Awaited<ReturnType<typeof createProject>>;

beforeAll(async () => {
  await migrate(pool);
  project = await createProject(pool, 'bot memory reader fixture');
  app = await buildApp({ pool, botUploadProject: project.project_id, identifyBot: async credential => {
    const uid = { 'ApiKey fixture-365': '365', 'ApiKey fixture-101': '101' }[credential];
    if (!uid) throw new HttpError(401, 'invalid Bot credential');
    return uid;
  } });
});
afterAll(async () => {
  await app?.close();
  await pool.end();
});

async function wiki(bot: string | null, markdown: string, date: string, withSource = false) {
  const p = project.project_id;
  const mem = ref('mem'), run = ref('run'), episode = ref('ep');
  const source = bot === null ? null : 'bot:' + bot + ':fixture';
  await pool.query("insert into extraction_runs(id,project_id,source_id,status,input_refs) values($1,$2,$3,'completed','[]')", [run, p, source]);
  await pool.query("insert into episodes(id,project_id,run_id,goal,chunk_id) values($1,$2,$3,'{}','fixture')", [episode, p, run]);
  await pool.query('insert into memory_documents(id,project_id,run_id,thread_id,episode_id,markdown,created_at) values($1,$2,$3,$4,$5,$6,$7)', [mem,p,run,'T1',episode,markdown,date]);
  if (withSource && source) {
    const stream = ref('stream'), raw = ref('raw');
    await pool.query("insert into streams(project_id,source_id,stream_id,harness) values($1,$2,$3,'xiaoba')", [p,source,stream]);
    await pool.query("insert into raw_records(id,project_id,source_id,stream_id,offset_bytes,raw,hash,metadata) values($1,$2,$3,$4,0,$5,'fixture','{}')", [raw,p,source,stream,Buffer.from('fixture')]);
    for (const [index, text] of ['What happens on retry?', 'The connection closes.'].entries()) {
      const event = ref('evt');
      await pool.query("insert into events(id,project_id,raw_id,ordinal,kind,pointer,content_json,search_text,metadata) values($1,$2,$3,$4,$5,'/text',$6,$7,'{}')", [event,p,raw,index,index === 0 ? 'query' : 'message',JSON.stringify(text),text]);
      await pool.query('insert into episode_events(project_id,episode_id,event_id,ordinal) values($1,$2,$3,$4)', [p,episode,event,index]);
    }
  }
  return { mem, episode };
}

const botHeaders = (uid: string) => ({ authorization: 'ApiKey fixture-' + uid, 'x-bot-uid': uid });
const search = '/v1/bot-memory/search';
const page = (id: string) => '/v1/bot-memory/wikis/' + id;

it('ranks distinct OR hits, serves ten excerpts plus twenty IDs, and returns a retrieval ID', async () => {
  const hits = await Promise.all([
    wiki('365', '# 分页锚点\n\n一个带条件的稳定方案。', '2026-01-02'),
    wiki('365', '# 分页\n\n先确认版本。这里明确说明锚点如何恢复。', '2026-01-03'),
    wiki('365', '# 另一项任务\n\n分页与锚点同时出现。', '2026-01-04'),
    wiki('365', '# 分页\n\n' + '分页 '.repeat(55), '2026-01-05'),
    wiki('36', '# 分页锚点\n\nforeign', '2026-01-06'),
    wiki('3650', '# 分页锚点\n\nforeign prefix collision', '2026-01-06'),
    wiki(null, '# 分页锚点\n\nunattributed', '2026-01-06'),
  ]);
  for (let i = 0; i < 28; i++) {
    await wiki('365', '# 通用案例 ' + i + '\n\n分页。', '2026-01-01');
  }
  const response = await app.inject({ method: 'POST', url: search, headers: botHeaders('365'), payload: { keywords: [' 分页 ', '锚点', '分页'] } });
  expect(response.statusCode).toBe(200);
  const { items, has_more, retrieval_id } = response.json();
  expect(items).toHaveLength(30);
  expect(has_more).toBe(true);
  expect(items.slice(0, 4).map((item: { wiki_id: string }) => item.wiki_id)).toEqual(hits.slice(0, 4).map(row => row.mem));
  expect(items[0]).toMatchObject({ title: '分页锚点', matched_keywords: ['分页', '锚点'] });
  expect(items[2].snippet).toContain('分页与锚点同时出现');
  expect(items.slice(0, 10).every((item: { snippet?: string }) => item.snippet)).toBe(true);
  expect(Object.keys(items[10]).sort()).toEqual(['title', 'wiki_id']);
  expect(retrieval_id).toMatch(/^ret_/);
  const noHits = await app.inject({ method: 'POST', url: search, headers: botHeaders('365'), payload: { keywords: ['no exact hit'] } });
  expect(noHits.json()).toMatchObject({ items: [], has_more: false });
  for (const payload of [{ keywords: ['分页'], bot_uid: '36' }, { keywords: ['分页'], operator: 'AND' }]) {
    expect((await app.inject({ method: 'POST', url: search, headers: botHeaders('365'), payload })).statusCode).toBe(400);
  }
});

it('verifies the existing Bot credential and pins full Wiki and Episode reads to the same Bot and Wiki', async () => {
  const a = await wiki('101', '# Retry\n\nConnection details.', '2026-01-02', true);
  const b = await wiki('102', '# Retry\n\nPrivate to a different Bot.', '2026-01-03', true);
  const otherEpisode = await wiki('101', '# Retry with a different source\n\nOther history.', '2026-01-04', true);
  const headers = botHeaders('101');
  for (const denied of [undefined, { 'x-bot-uid': '101' }, botHeaders('999')]) {
    expect((await app.inject({ method: 'POST', url: search, headers: denied, payload: { keywords: ['retry'] } })).statusCode).toBe(401);
  }
  expect((await app.inject({ url: '/v1/memories/' + a.mem, headers })).statusCode).toBe(401);
  const full = await app.inject({ url: page(a.mem), headers });
  expect(full.statusCode).toBe(200);
  expect(full.headers['cache-control']).toBe('private, no-store');
  expect(full.json()).toMatchObject({ wiki_id: a.mem, markdown: expect.stringContaining('Connection details.'), source_refs: [a.episode] });
  expect((await app.inject({ url: page(b.mem), headers })).statusCode).toBe(404);
  for (const source of [b, otherEpisode]) {
    expect((await app.inject({ method: 'POST', url: page(a.mem) + '/source', headers, payload: { ref: source.episode } })).statusCode).toBe(404);
  }
  expect((await app.inject({ method: 'POST', url: page(b.mem) + '/source', headers, payload: { ref: b.episode } })).statusCode).toBe(404);
  const firstPage = await app.inject({ method: 'POST', url: page(a.mem) + '/source', headers, payload: { ref: a.episode, limit: 1 } });
  expect(firstPage.statusCode).toBe(200);
  expect(firstPage.json()).toMatchObject({ ref: a.episode, events: [{ content: 'What happens on retry?' }], next_offset: 1 });
  const nextPage = await app.inject({ method: 'POST', url: page(a.mem) + '/source', headers, payload: { ref: a.episode, offset: 1, limit: 1 } });
  expect(nextPage.json()).toMatchObject({ events: [{ content: 'The connection closes.' }], next_offset: null });
  expect((await app.inject({ url: page(b.mem), headers: { ...headers, 'x-bot-uid': '102' } })).statusCode).toBe(403);
});
