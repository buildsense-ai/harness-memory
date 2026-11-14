import { afterAll, beforeAll, expect, it, vi } from "vitest";
import { Pool } from "pg";
import { readFileSync } from "node:fs";
import { buildApp } from "../src/app.js";
import { createProject, createProjectKey, authenticateIdentity } from "../src/db/projects.js";
import { migrate } from "../src/db/migrate.js";
import { ingestBatch } from "../src/ingest.js";
import { projectRecord } from "../src/adapters/index.js";
import { ref } from "../src/contracts.js";
import { listWorkbenchFilters, getWorkbenchGraph } from "../src/workbench.js";

const pool = new Pool({ connectionString: process.env.TEST_DATABASE_URL });
vi.setConfig({ testTimeout: 20000, hookTimeout: 60000 });
let app: Awaited<ReturnType<typeof buildApp>>;
let project: { project_id: string; key: string };
let other: { project_id: string; key: string };
let stream: { source_id: string; stream_id: string };
let runId: string;
let memoryId: string;
let episodeId: string;
let rawId: string;

beforeAll(async () => {
  await migrate(pool);
  project = await createProject(pool, "workbench");
  other = await createProject(pool, "workbench-other");
  stream = { source_id: project.project_id, stream_id: "workbench-test" };
  app = await buildApp({ pool });
  const raw = readFileSync("tests/fixtures/xiaoba.jsonl");
  const projection = projectRecord("xiaoba", raw);
  const ack = await ingestBatch(pool, project.project_id, {
    ...stream,
    harness: "xiaoba",
    records: [{
      offset: 0,
      raw_base64: raw.toString("base64"),
      events: projection.events.map(({ content, text, fidelity, ...descriptor }) => descriptor),
    }],
  });
  rawId = ack.records[0].raw_ref;
  const eventRefs = ack.records[0].event_refs;
  const taskThread = {
    thread_id: "T1",
    title: "工作台测试任务",
    desired_outcome: "验证来源映射和记忆回查",
    include_topics: [],
    exclude_topics: [],
    boundary_note: "单一测试任务",
  };
  const queryRef = eventRefs[0];
  runId = ref("run");
  episodeId = ref("ep");
  memoryId = ref("mem");
  await pool.query(
    "insert into extraction_runs(id,project_id,status,input_refs,task_partition,memory_request) values($1,$2,'completed',$3,$4,$5)",
    [runId, project.project_id, JSON.stringify(eventRefs), JSON.stringify({
      task_threads: [taskThread],
      query_assignments: [{ query_ref: queryRef, thread_ids: ["T1"], role: "origin", reason: "测试任务起点" }],
      relations: [],
    }), JSON.stringify(stream)],
  );
  await pool.query(
    "insert into episodes(id,project_id,run_id,goal,chunk_id,thread_id,task_thread) values($1,$2,$3,$4,'whole-turns','T1',$5)",
    [episodeId, project.project_id, runId, JSON.stringify({ description: taskThread.desired_outcome }), JSON.stringify(taskThread)],
  );
  for (const [ordinal, eventRef] of eventRefs.slice(0, 3).entries()) {
    await pool.query("insert into episode_events(project_id,episode_id,event_id,ordinal) values($1,$2,$3,$4)", [project.project_id, episodeId, eventRef, ordinal]);
  }
  await pool.query(
    "insert into memory_documents(id,project_id,run_id,thread_id,episode_id,markdown) values($1,$2,$3,'T1',$4,$5)",
    [memoryId, project.project_id, runId, episodeId, "# 工作台测试记忆\n\n可通过引用回查来源。"],
  );
}, 60000);

afterAll(async () => {
  await app?.close();
  await pool.end();
});

const get = (url: string, key = project.key) => app.inject({
  method: "GET",
  url,
  headers: { authorization: "Bearer " + key },
});

it("serves the workbench shell and same-origin assets", async () => {
  expect((await app.inject({ method: "GET", url: "/workbench" })).statusCode).toBe(200);
  expect((await app.inject({ method: "GET", url: "/workbench.css" })).headers["content-type"]).toContain("text/css");
  expect((await app.inject({ method: "GET", url: "/workbench.js" })).headers["content-type"]).toContain("javascript");
});

it("lists project streams and run states without leaking another project", async () => {
  const sessions = await get("/v1/workbench/sessions");
  expect(sessions.statusCode).toBe(200);
  expect(sessions.json().items).toEqual(expect.arrayContaining([
    expect.objectContaining({ source_id: stream.source_id, session_id: null, stream_id: stream.stream_id, raw_record_count: 1 }),
  ]));
  expect((await get("/v1/workbench/sessions", other.key)).json().items).toEqual([]);
  const response = await get("/v1/workbench/streams");
  expect(response.statusCode).toBe(200);
  expect(response.json().items).toEqual(expect.arrayContaining([
    expect.objectContaining({ source_id: stream.source_id, stream_id: stream.stream_id, raw_record_count: 1, event_count: 4 }),
  ]));
  expect((await get("/v1/workbench/streams", other.key)).json().items).toEqual([]);
  const runs = await get(`/v1/workbench/runs?source_id=${stream.source_id}&stream_id=${stream.stream_id}`);
  expect(runs.json().items).toEqual(expect.arrayContaining([expect.objectContaining({ run_id: runId, published_memory_count: 1 })]));
});

it("projects stored task, Episode and memory identities and pages the fixed input", async () => {
  await getWorkbenchGraph(pool, project.project_id, runId, {});
  const graph = await get(`/v1/workbench/runs/${runId}/graph`);
  expect(graph.statusCode).toBe(200);
  expect(graph.json().tasks).toEqual(expect.arrayContaining([
    expect.objectContaining({ thread_id: "T1", sessions: [expect.objectContaining({ session_key: expect.any(String) })], episode: expect.objectContaining({ episode_id: episodeId, memory_id: memoryId }) }),
  ]));
  const events = await get(`/v1/workbench/runs/${runId}/events?thread_id=T1&limit=1`);
  expect(events.json().items).toHaveLength(1);
  expect(events.json().next_offset).toBe(1);
  expect((await get(`/v1/workbench/runs/${runId}/graph`, other.key)).statusCode).toBe(404);
  expect((await get(`/v1/workbench/runs/${runId}/events`)).json().total).toBe(4);
  const context = await get(`/v1/workbench/runs/${runId}/events?thread_id=T1&context=true&limit=100`);
  expect(context.json()).toMatchObject({ selection_source: "published_episode", episode_id: episodeId, selected_count: 3 });
  expect(context.json().items.filter((event: any) => event.selected)).toHaveLength(3);
  expect(context.json().items.some((event: any) => !event.selected)).toBe(true);
  expect(context.json().items.every((event: any) => event.session_key)).toBe(true);
  expect(context.json().items.find((event: any) => event.kind === "tool_call")).toMatchObject({ tool_pair_ref: expect.any(String), tool_pair_selected: false });
  const firstContextPage = await get(`/v1/workbench/runs/${runId}/events?thread_id=T1&context=true&limit=2`);
  expect(firstContextPage.json()).toMatchObject({ total: 4, selected_count: 3, next_offset: 2 });
  const secondContextPage = await get(`/v1/workbench/runs/${runId}/events?thread_id=T1&context=true&offset=2&limit=2`);
  expect(secondContextPage.json().items.some((event: any) => !event.selected)).toBe(true);
  expect((await get(`/v1/workbench/runs/${runId}/events?thread_id=T1&limit=100`)).json()).toMatchObject({ selection_source: "candidate_preview", total: 4, selected_count: 4 });
});

it("returns the exact document reference and rejects foreign memory IDs", async () => {
  const response = await get(`/v1/memories/${memoryId}`);
  expect(response.statusCode).toBe(200);
  expect(response.json()).toMatchObject({ memory_id: memoryId, run_id: runId, source_refs: [episodeId] });
  expect(response.json().markdown).toContain(episodeId);
  expect((await get(`/v1/memories/${memoryId}`, other.key)).statusCode).toBe(404);
});

it("records server receipt time for new immutable raw records", async () => {
  const row = (await pool.query("select received_at from raw_records where project_id=$1 and id=$2", [project.project_id, rawId])).rows[0];
  expect(row.received_at).toBeTruthy();
  const streamResponse = await get("/v1/workbench/streams");
  const found = streamResponse.json().items.find((item: any) => item.stream_id === stream.stream_id);
  expect(found.first_received_at).toBeTruthy();
  expect(found.last_received_at).toBeTruthy();
});

it("attributes new API uploads to the authenticating Key and offers project-scoped filters", async () => {
  const raw = readFileSync("tests/fixtures/xiaoba.jsonl");
  const uploaderKey = await createProjectKey(pool, project.project_id);
  const identity = await authenticateIdentity(pool, uploaderKey.key);
  const response = await app.inject({
    method: "POST",
    url: "/v1/ingest/batches",
    headers: { authorization: "Bearer " + uploaderKey.key },
    payload: {
      source_id: "key-attribution-source",
      stream_id: "key-attribution-stream",
      harness: "xiaoba",
      records: [{ offset: 0, raw_base64: raw.toString("base64") }],
    },
  });
  expect(response.statusCode).toBe(200);
  const record = (await pool.query("select upload_key_id from raw_records where id=$1", [response.json().records[0].raw_ref])).rows[0];
  expect(record.upload_key_id).toBe(identity.upload_key_id);
  await listWorkbenchFilters(pool, project.project_id);
  const filters = await get("/v1/workbench/filters");
  expect(filters.statusCode, filters.body).toBe(200);
  expect(filters.json().upload_keys).toEqual(expect.arrayContaining([
    expect.objectContaining({ upload_key_id: identity.upload_key_id, label: `上传 Key · ${identity.upload_key_id.slice(0, 16)}` }),
    expect.objectContaining({ upload_key_id: null, label: "旧记录（未记录 Key）" }),
  ]));
  expect((await get(`/v1/workbench/sessions?upload_key_id=${identity.upload_key_id}`)).json().items)
    .toEqual(expect.arrayContaining([expect.objectContaining({ source_id: "key-attribution-source" })]));
  expect((await get("/v1/workbench/sessions?upload_key_id=__unattributed__")).json().items)
    .toEqual(expect.arrayContaining([expect.objectContaining({ source_id: stream.source_id })]));
});

it("filters batches, sessions and memory search by the inclusive processing-date range", async () => {
  const future = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
  expect((await get(`/v1/workbench/runs?date_from=${future}`)).json().items).toEqual([]);
  expect((await get(`/v1/workbench/sessions?date_from=${future}`)).json().items).toEqual([]);
  const search = await app.inject({
    method: "POST",
    url: "/v1/memories/search",
    headers: { authorization: "Bearer " + project.key },
    payload: { keywords: ["来源"], date_from: future },
  });
  expect(search.statusCode).toBe(200);
  expect(search.json().items).toEqual([]);
  expect((await get("/v1/workbench/runs?date_from=2026-11-13&date_to=2026-11-12")).statusCode).toBe(400);
});


it("groups batches across sources by Bot and session, with exact Bot-scoped user filters", async () => {
  const makeBatch = async (source: string, bot: string, user: string, uploadKey?: string) => {
    const raw = Buffer.from(JSON.stringify({ entry_type: 'turn', session_id: 'shared-session',
      agent_identity: { agent_id: bot },
      user: { text: `[发言人: ${user}（人）]\n筛选测试` },
      assistant: { text: '筛选回答', tool_calls: [] } }) + '\n');
    const ack = await ingestBatch(pool, project.project_id, {
      source_id: source, stream_id: source, harness: 'xiaoba',
      records: [{ offset: 0, raw_base64: raw.toString('base64'), events: projectRecord('xiaoba', raw).events.map(({ content, text, fidelity, ...descriptor }) => descriptor) }],
    }, uploadKey);
    const refs = ack.records[0].event_refs;
    const run = ref('run'), ep = ref('ep'), mem = ref('mem');
    await pool.query("insert into extraction_runs(id,project_id,status,input_refs) values($1,$2,'completed',$3)", [run, project.project_id, JSON.stringify(refs)]);
    await pool.query("insert into episodes(id,project_id,run_id,goal,chunk_id) values($1,$2,$3,'{}','whole-turns')", [ep, project.project_id, run]);
    for (const [i, event] of refs.entries()) await pool.query("insert into episode_events(project_id,episode_id,event_id,ordinal) values($1,$2,$3,$4)", [project.project_id, ep, event, i]);
    await pool.query("insert into memory_documents(id,project_id,run_id,thread_id,episode_id,markdown) values($1,$2,$3,'T1',$4,$5)", [mem, project.project_id, run, ep, '# 筛选文档 ' + source]);
    return { run, mem };
  };
  const key = await createProjectKey(pool, project.project_id);
  const identity = await authenticateIdentity(pool, key.key);
  const a = await makeBatch('filter-source-a', 'bot-a', 'Alice');
  const b = await makeBatch('filter-source-b', 'bot-a', 'Alice');
  await makeBatch('filter-source-c', 'bot-b', 'Bob', identity.upload_key_id);
  await pool.query('insert into workbench_catalog(project_id,data) values($1,$2)', [project.project_id, JSON.stringify({ bots: { 'bot-a': { name: 'Saturday', sessions: { 'shared-session': '真实原名' } } } })]);
  const sessions = (await get('/v1/workbench/sessions?bot_id=bot-a&user_name=Alice')).json().items;
  expect(sessions).toHaveLength(1);
  expect(sessions[0]).toMatchObject({ session_name: '真实原名', bot_name: 'Saturday', participant_names: ['Alice'], raw_record_count: 2 });
  expect(sessions[0].source_ids.sort()).toEqual(['filter-source-a', 'filter-source-b']);
  const runs = (await get('/v1/workbench/runs?bot_id=bot-a&user_name=Alice')).json();
  expect(runs.total).toBe(2);
  expect(runs.items.map((r: any) => r.run_id).sort()).toEqual([a.run, b.run].sort());
  expect(runs.items.every((r: any) => r.sessions[0].session_key === sessions[0].session_key)).toBe(true);
  const filters = (await get('/v1/workbench/filters?bot_id=bot-a')).json();
  expect(filters.users).toEqual(['Alice']);
  expect((await get(`/v1/workbench/filters?upload_key_id=${identity.upload_key_id}`)).json().users).toEqual(['Bob']);
  expect((await get('/v1/workbench/sessions?bot_id=bot-b')).json().items[0].session_name).toBeNull();
  expect(filters.bots.find((bot: any) => bot.bot_id === 'bot-a')).toMatchObject({ bot_name: 'Saturday', users: ['Alice'] });
  expect((await get('/v1/workbench/sessions?bot_id=bot-a&user_name=Ali')).json().items).toEqual([]);
  expect((await get('/v1/workbench/runs?bot_id=bot-a&user_name=Bob')).json().items).toEqual([]);
  expect((await get('/v1/workbench/filters', other.key)).json().bots).toEqual([]);
  const search = (user: string) => app.inject({ method: 'POST', url: '/v1/memories/search', headers: { authorization: 'Bearer ' + project.key }, payload: { keywords: ['筛选文档'], bot_id: 'bot-a', user_name: user } });
  const found = await search('Alice'); expect(found.statusCode).toBe(200);
  expect(found.json().items.map((item: any) => item.memory_id).sort()).toEqual([a.mem, b.mem].sort());
  expect((await search('Bob')).json().items).toEqual([]);
});
