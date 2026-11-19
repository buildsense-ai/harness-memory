import type { FastifyInstance } from 'fastify';
import { Pool } from 'pg';
import { afterAll, beforeAll, expect, it } from 'vitest';
import { buildApp } from '../src/app.js';
import { ref } from '../src/contracts.js';
import { migrate } from '../src/db/migrate.js';
import { createProject } from '../src/db/projects.js';

const pool = new Pool({ connectionString: process.env.TEST_DATABASE_URL });
const token = 'catsco-service-test-token';
const verified = 'bot:365:verified';
const other = 'bot:365:other';
const direct = 'p2p_7_365';
const group = 'grp_80';
const owner = { kind: 'owner', bot_uid: '365' };
const member = (topic_ids: string[]) => ({ kind: 'topics', bot_uid: '365', topic_ids });
const sourceBindings = { [verified]: '2026-11-19T03:00:00Z' };
let app: FastifyInstance, project: string, projectKey: string;
const docs: Record<string, string> = {};

type Origin = { session: string; source?: string; when?: string | null; batchOnly?: boolean };
async function document(title: string, created: string, origins: Origin[], p = project) {
  const run = ref('run'), episode = ref('ep'), id = ref('mem');
  const source = origins[0].source ?? verified;
  const sessionKey = 'catscompany/fixture.jsonl';
  const rawIds = [];
  await pool.query("insert into extraction_runs(id,project_id,status,input_refs,source_id,session_key) values($1,$2,'completed','[]',$3,$4)", [run, p, source, sessionKey]);
  await pool.query("insert into episodes(id,project_id,run_id,goal,chunk_id) values($1,$2,$3,'{}','fixture')", [episode, p, run]);
  for (const [index, origin] of origins.entries()) {
    const raw = ref('raw'), event = ref('evt'), stream = ref('stream');
    rawIds.push(raw);
    const source = origin.source ?? verified;
    await pool.query("insert into streams(project_id,source_id,stream_id,harness) values($1,$2,$3,'xiaoba')", [p, source, stream]);
    await pool.query(`
      insert into raw_records(id,project_id,source_id,stream_id,offset_bytes,raw,hash,metadata,received_at)
      values($1,$2,$3,$4,0,''::bytea,'fixture',$5,$6)`,
    [raw, p, source, stream, JSON.stringify({ session_id: origin.session, bot_id: source.split(':')[1] }),
      origin.when === undefined ? '2026-11-19T02:00:00Z' : origin.when]);
    await pool.query(`
      insert into events(id,project_id,raw_id,ordinal,kind,pointer,content_json,search_text,metadata)
      values($1,$2,$3,0,'query','/text','"example"','example','{}')`, [event, p, raw]);
    if (!origin.batchOnly) {
      await pool.query('insert into episode_events(project_id,episode_id,event_id,ordinal) values($1,$2,$3,$4)', [p, episode, event, index]);
    }
  }
  await pool.query(`
    insert into ingestion_episodes(project_id,source_id,episode_key,session_key,lane,logical_day,raw_ids,run_id)
    values ($1,$2,$3,$4,'incremental','2026-11-19',$5,$6)`, [p, source, episode, sessionKey, JSON.stringify(rawIds), run]);
  await pool.query(`
    insert into memory_documents(id,project_id,run_id,thread_id,episode_id,markdown,created_at)
    values($1,$2,$3,'thread',$4,$5,$6)`, [id, p, run, episode, '# ' + title + '\n\nWiki body.', created]);
  return id;
}

beforeAll(async () => {
  await migrate(pool);
  ({ project_id: project, key: projectKey } = await createProject(pool, 'catsco catalog'));
  const separate = (await createProject(pool, 'separate catalog')).project_id;
  docs.direct = await document('Private', '2026-11-19T01:00:00.000123Z', [
    { session: 'session:v2:catscompany:p2p:p2p_7_365:agent:usr365' },
  ]);
  docs.group = await document('Group', '2026-11-19T01:00:00.000100Z', [{ session: 'cc_group:grp_80' }]);
  docs.multi = await document('Mixed', '2026-11-19T03:00:00Z', [{ session: direct }, { session: group }]);
  docs.unknown = await document('Unknown', '2026-11-19T04:00:00Z', [{ session: 'cli:private' }]);
  docs.unverified = await document('Unverified', '2026-11-19T05:00:00Z', [{ session: direct, source: other }]);
  docs.newer = await document('Newer than verified snapshot', '2026-11-19T06:00:00Z', [
    { session: direct },
    { session: direct, when: '2026-11-19T03:00:00.000001Z' },
  ]);
  docs.undated = await document('Source with unknown receipt time', '2026-11-19T07:00:00Z', [
    { session: direct }, { session: direct, when: null },
  ]);
  docs.partition = await document('Selected from a mixed batch', '2026-11-19T02:00:00Z', [
    { session: direct }, { session: group, batchOnly: true },
  ]);
  docs.separate = await document('Different project', '2026-11-19T06:00:00Z', [{ session: direct }], separate);
  app = await buildApp({ pool, botUploadProject: project, catscoRead: { token, sourceBindings } });
}, 20000);
afterAll(async () => { await app?.close(); await pool.end(); });

function query(path: 'catalog' | 'wiki', payload: object, extraHeaders: Record<string, string> = {}) {
  return app.inject({
    method: 'POST', url: '/internal/catsco/memory/' + path, payload,
    headers: { authorization: 'Bearer ' + token, ...extraHeaders },
  });
}

it('limits the directory by project, bot, verified sources and every conversation before paging', async () => {
  const allowed = await query('catalog', { scope: member([direct]), topic_id: direct, limit: 1 });
  expect(allowed.statusCode).toBe(200);
  expect(allowed.json()).toEqual({
    items: [{ id: docs.direct, title: 'Private', conversation_ids: [direct],
      revision: expect.any(String), created_at: '2026-11-19T01:00:00.000123Z' }],
    next_cursor: null,
  });
  const ownerDirectory = await query('catalog', { scope: owner });
  expect(ownerDirectory.statusCode).toBe(200);
  expect(ownerDirectory.json().items.map((item: { id: string }) => item.id)).toEqual(
    [docs.undated, docs.newer, docs.unverified, docs.unknown, docs.multi, docs.partition, docs.direct, docs.group]);
  expect((await query('catalog', { scope: { ...owner, bot_uid: '573' } })).json().items).toEqual([]);
  const fullScope = member([direct, group]);
  const first = await query('catalog', { scope: fullScope, limit: 3 });
  expect(first.json().items[1]).toMatchObject({ id: docs.partition, conversation_ids: [direct] });
  const second = await query('catalog', { scope: fullScope, cursor: first.json().next_cursor, limit: 3 });
  expect(second.json().items.map((item: { id: string }) => item.id)).toEqual([docs.group]);
  expect((await query('catalog', { scope: member([direct]), cursor: first.json().next_cursor })).statusCode).toBe(400);
  expect((await query('catalog', { scope: member([direct]), topic_id: group })).statusCode).toBe(404);
});

it('authorizes before reading a Wiki or returning 304', async () => {
  const opened = await query('wiki', { scope: member([direct]), id: docs.direct });
  expect(opened.statusCode).toBe(200);
  expect(opened.json()).toMatchObject({ id: docs.direct, markdown: '# Private\n\nWiki body.', source_refs: [expect.any(String)] });
  const etag = opened.headers.etag!;
  const cached = await query('wiki', { scope: member([direct]), id: docs.direct }, { 'if-none-match': etag });
  expect(cached.statusCode).toBe(304);
  expect(cached.body).toBe('');
  const revoked = await query('wiki', { scope: member([group]), id: docs.direct }, { 'if-none-match': etag });
  expect(revoked.statusCode).toBe(404);
  expect(revoked.headers.etag).toBeUndefined();
  expect((await query('wiki', { scope: owner, id: docs.separate })).statusCode).toBe(404);
  expect((await query('wiki', { scope: member([direct]), id: docs.multi })).statusCode).toBe(404);
  expect((await query('wiki', { scope: member([direct]), id: docs.partition })).statusCode).toBe(404);
  expect((await query('wiki', { scope: member([direct]), id: docs.undated })).statusCode).toBe(404);
  expect((await query('wiki', { scope: owner, id: docs.direct }, { authorization: 'Bearer ' + projectKey })).statusCode).toBe(401);
});
