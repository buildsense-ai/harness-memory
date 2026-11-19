import type { FastifyInstance } from 'fastify';
import { Pool } from 'pg';
import { afterAll, beforeAll, expect, it } from 'vitest';
import { buildApp } from '../src/app.js';
import { ref } from '../src/contracts.js';
import { migrate } from '../src/db/migrate.js';
import { createProject } from '../src/db/projects.js';

const pool = new Pool({ connectionString: process.env.TEST_DATABASE_URL });
const token = 'catsco-service-test-token';
const sourceID = 'bot:365:source';
const other = 'bot:365:other';
const direct = 'p2p_7_365';
const group = 'grp_80';
const owner = { kind: 'owner', bot_uid: '365' };
let app: FastifyInstance, project: string, projectKey: string;
const docs: Record<string, string> = {};

type Origin = { session: string; source?: string; when?: string | null; batchOnly?: boolean };
async function document(title: string, created: string, origins: Origin[], p = project) {
  const run = ref('run'), episode = ref('ep'), id = ref('mem');
  const source = origins[0].source ?? sourceID;
  const sessionKey = 'catscompany/fixture.jsonl';
  const rawIds = [];
  const events = [];
  await pool.query("insert into extraction_runs(id,project_id,status,input_refs,source_id,session_key) values($1,$2,'completed','[]',$3,$4)", [run, p, source, sessionKey]);
  await pool.query("insert into episodes(id,project_id,run_id,goal,chunk_id) values($1,$2,$3,'{}','fixture')", [episode, p, run]);
  for (const [index, origin] of origins.entries()) {
    const raw = ref('raw'), event = ref('evt'), stream = ref('stream');
    rawIds.push(raw);
    const source = origin.source ?? sourceID;
    events.push(event);
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
  await pool.query("update extraction_runs set input_refs=$1 where project_id=$2 and id=$3", [JSON.stringify(events), p, run]);
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
  docs.otherBot = await document('Different Bot', '2026-11-19T08:00:00Z', [{ session: group, source: 'bot:573:other' }]);
  docs.conflicting = await document('Unclear Bot', '2026-11-19T09:00:00Z', [{ session: group }, { session: group, source: 'bot:573:other' }]);
  docs.separate = await document('Different project', '2026-11-19T06:00:00Z', [{ session: direct }], separate);
  app = await buildApp({ pool, botUploadProject: project, catscoRead: { token } });
}, 20000);
afterAll(async () => { await app?.close(); await pool.end(); });

function query(path: 'catalog' | 'wiki', payload: object, extraHeaders: Record<string, string> = {}) {
  return app.inject({
    method: 'POST', url: '/internal/catsco/memory/' + path, payload,
    headers: { authorization: 'Bearer ' + token, ...extraHeaders },
  });
}

it('pages over the existing project and exports Bot and full run topic attribution', async () => {
  const first = await query('catalog', { limit: 1 });
  expect(first.statusCode).toBe(200);
  expect(first.json().items).toEqual([]);
  expect(first.json().next_cursor).toEqual(expect.any(String));
  const rest = await query('catalog', { cursor: first.json().next_cursor });
  expect(rest.json()).toMatchObject({ items: [
    { id: docs.otherBot, bot_uid: '573', topic_id: group },
    { id: docs.undated, bot_uid: '365', topic_id: direct },
    { id: docs.newer, bot_uid: '365', topic_id: direct },
    { id: docs.unverified, bot_uid: '365', topic_id: direct },
    { id: docs.unknown, bot_uid: '365', topic_id: null },
    { id: docs.multi, bot_uid: '365', topic_id: null },
    { id: docs.partition, bot_uid: '365', topic_id: null },
    { id: docs.direct, bot_uid: '365', topic_id: direct, title: 'Private', created_at: '2026-11-19T01:00:00.000123Z' },
    { id: docs.group, bot_uid: '365', topic_id: group },
  ], next_cursor: null });
  expect(rest.json().items.every((item: Record<string, unknown>) => !('markdown' in item))).toBe(true);
  expect((await query('catalog', { scope: owner })).statusCode).toBe(400);
});

it('authorizes before reading a Wiki or returning 304', async () => {
  const opened = await query('wiki', { id: docs.direct });
  expect(opened.statusCode).toBe(200);
  expect(opened.json()).toMatchObject({ id: docs.direct, markdown: '# Private\n\nWiki body.', source_refs: [expect.any(String)] });
  const etag = opened.headers.etag!;
  const cached = await query('wiki', { id: docs.direct }, { 'if-none-match': etag });
  expect(cached.statusCode).toBe(304);
  expect(cached.body).toBe('');
  expect((await query('wiki', { scope: owner, id: docs.direct }, { 'if-none-match': etag })).statusCode).toBe(400);
  expect((await query('wiki', { id: docs.separate })).statusCode).toBe(404);
  expect((await query('wiki', { id: docs.direct }, { authorization: 'Bearer ' + projectKey, 'if-none-match': etag })).statusCode).toBe(401);
});
