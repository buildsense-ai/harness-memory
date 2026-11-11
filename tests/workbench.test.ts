import { afterAll, beforeAll, expect, it, vi } from "vitest";
import { Pool } from "pg";
import { readFileSync } from "node:fs";
import { buildApp } from "../src/app.js";
import { createProject } from "../src/db/projects.js";
import { migrate } from "../src/db/migrate.js";
import { ingestBatch } from "../src/ingest.js";
import { projectRecord } from "../src/adapters/index.js";
import { ref } from "../src/contracts.js";

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
  for (const [ordinal, eventRef] of eventRefs.entries()) {
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
  const graph = await get(`/v1/workbench/runs/${runId}/graph`);
  expect(graph.statusCode).toBe(200);
  expect(graph.json().tasks).toEqual(expect.arrayContaining([
    expect.objectContaining({ thread_id: "T1", episode: expect.objectContaining({ episode_id: episodeId, memory_id: memoryId }) }),
  ]));
  const events = await get(`/v1/workbench/runs/${runId}/events?thread_id=T1&limit=1`);
  expect(events.json().items).toHaveLength(1);
  expect(events.json().next_offset).toBe(1);
  expect((await get(`/v1/workbench/runs/${runId}/graph`, other.key)).statusCode).toBe(404);
  expect((await get(`/v1/workbench/runs/${runId}/events`)).json().total).toBe(4);
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
