import { afterAll, beforeAll, expect, it, vi } from 'vitest';
import { Pool } from 'pg';
import { migrate } from '../src/db/migrate.js';
import { createProject } from '../src/db/projects.js';
import { buildApp } from '../src/app.js';
import type { ChatModel } from '../src/extraction/model.js';
import { sha256 } from '../src/contracts.js';

const pool = new Pool({ connectionString: process.env.TEST_DATABASE_URL, max: 6 });
beforeAll(() => migrate(pool));
afterAll(() => pool.end());
vi.setConfig({ testTimeout: 60000, hookTimeout: 60000 });
const thread = { thread_id: 'T1', title: '身份上传测试', desired_outcome: '记录原文', include_topics: [], exclude_topics: [], boundary_note: '本次记录' };
const model: ChatModel = {
  partition: async events => ({ task_threads: [thread], query_assignments: events.filter(e => e.kind === 'query').map(e => ({ query_ref: e.ref, thread_ids: ['T1'], role: 'origin' })), relations: [] }),
  memory: async () => ({ markdown: '# Bot 上传记录\n\n## 发生了什么\n记录字体检索。' }),
  select: async () => { throw Error('unused'); },
};

it('accepts keyless bot history, publishes a Wiki, updates its display name and keeps read authorization', async () => {
  const project = await createProject(pool, 'keyless-history');
  const catscoRead = { token: 'test-catsco-reader' };
  const app = await buildApp({ pool, model, botUploadProject: project.project_id, catscoRead });
  await app.ready();
  const headers = { authorization: 'Bearer ' + project.key };
  const response = await app.inject({ url: '/v1/bot-ingest/config' });
  expect(response.statusCode).toBe(200);
  const dataset_id = response.json().dataset_id;
  const record = { entry_type: 'turn', timestamp: '2026-11-17T00:00:00Z', session_id: 'font-session', agent_identity: { agent_id: 'usr365' }, user: { text: '记录字体搜索' }, assistant: { text: '搜索没有交付文件', tool_calls: [] } };
  const raw = Buffer.from(JSON.stringify(record) + '\n');
  const body = { dataset_id, bot_name: 'Saturday', source_id: 'installation-one', stream_id: 'history', harness: 'xiaoba', records: [{ offset: 0, raw_base64: raw.toString('base64'), origin: { path: 'sessions/cli/2026-11-17/cli_font.jsonl', offset: 0 } }] };
  try {
    const manifest = { dataset_id, bot_name: 'Saturday', source_id: body.source_id, manifest_id: 'first', session_key: 'cli/cli_font.jsonl', lane: 'backfill', files: [{ stream_id: 'history', end_offset: raw.length, path: body.records[0].origin.path }] };
    expect((await app.inject({ method: 'POST', url: '/v1/bots/365/ingest/manifests', payload: manifest })).statusCode).toBe(200);
    const uploaded = await app.inject({ method: 'POST', url: '/v1/bots/365/ingest/batches', payload: body });
    expect(uploaded.statusCode).toBe(200);
    const ack = uploaded.json();
    await vi.waitFor(async () => expect((await pool.query('select count(*)::int n from memory_documents where project_id=$1', [project.project_id])).rows[0].n).toBe(1), { timeout: 10000 });
    const catalog = await app.inject({
      method: 'POST', url: '/internal/catsco/memory/catalog',
      headers: { authorization: 'Bearer ' + catscoRead.token },
      payload: {},
    });
    expect(catalog.statusCode).toBe(200);
    expect(catalog.json().items).toEqual([expect.objectContaining({
      title: 'Bot 上传记录', bot_uid: '365', topic_id: null,
    })]);
    const renamed = await app.inject({ method: 'POST', url: '/v1/bots/365/ingest/batches', payload: { ...body, bot_name: 'Saturday renamed' } });
    expect(renamed.json()).toEqual(ack);
    expect((await pool.query('select count(*)::int n from raw_records where project_id=$1', [project.project_id])).rows[0].n).toBe(1);
    expect((await pool.query('select metadata,raw from raw_records where project_id=$1', [project.project_id])).rows[0]).toMatchObject({ metadata: { bot_id: '365', bot_identity_source: 'recorded' }, raw });
    const filters = await app.inject({ url: '/v1/workbench/filters', headers });
    expect(filters.json().bots).toContainEqual(expect.objectContaining({ bot_id: '365', bot_name: 'Saturday renamed' }));
    const search = await app.inject({ method: 'POST', url: '/v1/memories/search', headers, payload: { keywords: ['字体'], operator: 'OR' } });
    expect(search.json().items).toHaveLength(1);
    const source = search.json().items[0].source_refs[0];
    expect((await app.inject({ method: 'POST', url: '/v1/read', headers, payload: { ref: source } })).statusCode).toBe(200);
    expect((await app.inject({ method: 'POST', url: '/v1/read', payload: { ref: source } })).statusCode).toBe(401);
    expect((await app.inject({ method: 'POST', url: '/v1/memories/search', payload: { keywords: ['字体'] } })).statusCode).toBe(401);
  } finally { await app.close(); }
});

it('separates bots with identical transport ids and rejects conflicting recorded attribution', async () => {
  const project = await createProject(pool, 'keyless-isolation');
  const app = await buildApp({ pool, botUploadProject: project.project_id });
  const dataset_id = (await app.inject({ url: '/v1/bot-ingest/config' })).json().dataset_id;
  const raw = Buffer.from(JSON.stringify({ entry_type: 'turn', user: { text: '历史' }, assistant: { text: '结果', tool_calls: [] } }) + '\n');
  const body = { dataset_id, source_id: 'same-device', stream_id: 'same-stream', harness: 'xiaoba', records: [{ offset: 0, raw_base64: raw.toString('base64'), origin: { path: 'sessions/cli/2026-11-17/cli_same.jsonl', offset: 0 } }] };
  try {
    for (const uid of ['365', '366']) expect((await app.inject({ method: 'POST', url: '/v1/bots/' + uid + '/ingest/batches', payload: body })).statusCode).toBe(200);
    const records = (await pool.query('select source_id,metadata from raw_records where project_id=$1 order by source_id', [project.project_id])).rows;
    expect(records.map(r => r.metadata.bot_id)).toEqual(['365', '366']);
    const foreign = Buffer.from(JSON.stringify({ entry_type: 'turn', agent_identity: { agent_id: 'usr366' }, user: { text: '另一 Bot' }, assistant: { text: '结果', tool_calls: [] } }) + '\n');
    const conflict = await app.inject({ method: 'POST', url: '/v1/bots/365/ingest/batches', payload: { ...body, stream_id: 'conflict', records: [{ offset: 0, raw_base64: foreign.toString('base64') }] } });
    expect(conflict.statusCode).toBe(409);
    expect((await app.inject({ method: 'POST', url: '/v1/bots/365/ingest/batches', payload: { ...body, dataset_id: 'wrong' } })).statusCode).toBe(409);
    expect((await app.inject({ method: 'POST', url: '/v1/bots/no-id/ingest/batches', payload: body })).statusCode).toBe(400);
  } finally { await app.close(); }
});

it('reassembles keyless fragments under the declared bot without changing the original bytes', async () => {
  const project = await createProject(pool, 'keyless-fragments');
  const app = await buildApp({ pool, botUploadProject: project.project_id });
  const dataset_id = (await app.inject({ url: '/v1/bot-ingest/config' })).json().dataset_id;
  const raw = Buffer.from(JSON.stringify({ entry_type: 'turn', user: { text: '大记录' }, assistant: { text: 'x'.repeat(1024 * 1024 + 10), tool_calls: [] } }) + '\n');
  const base = { dataset_id, bot_name: 'Saturday', source_id: 'fragment-device', stream_id: 'large', record_offset: 0, total_bytes: raw.length, record_hash: sha256(raw), origin: { path: 'sessions/cli/2026-11-17/cli_large.jsonl', offset: 0 } };
  const send = (start: number) => app.inject({ method: 'POST', url: '/v1/bots/365/ingest/fragments', payload: { ...base, fragment_offset: start, raw_base64: raw.subarray(start, Math.min(start + 1024 * 1024, raw.length)).toString('base64') } });
  try {
    const first = await send(0);
    expect(first.statusCode).toBe(200);
    expect(first.json().next_offset).toBeUndefined();
    expect((await pool.query('select count(*)::int n from raw_records where project_id=$1', [project.project_id])).rows[0].n).toBe(0);
    const final = await send(1024 * 1024);
    expect(final.statusCode).toBe(200);
    expect(final.json()).toMatchObject({ next_offset: raw.length, sha256: sha256(raw) });
    expect((await pool.query('select raw,metadata from raw_records where project_id=$1', [project.project_id])).rows).toEqual([
      expect.objectContaining({ raw, metadata: expect.objectContaining({ bot_id: '365', bot_name: 'Saturday', bot_identity_source: 'upload_declared', origin: base.origin }) }),
    ]);
  } finally { await app.close(); }
});
