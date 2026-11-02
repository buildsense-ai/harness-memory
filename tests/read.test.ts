import { beforeAll, afterAll, it, expect } from "vitest";
import { Pool } from "pg";
import { readFileSync } from "node:fs";
import { createProject } from "../src/db/projects.js";
import { ingestBatch } from "../src/ingest.js";
import { projectRecord } from "../src/adapters/index.js";
import { readReference, readRaw } from "../src/read.js";
import { ref, sha256 } from "../src/contracts.js";
import { migrate } from "../src/db/migrate.js";
const pool = new Pool({ connectionString: process.env.TEST_DATABASE_URL });
let p: string, q: string, ack: any;
const raw = readFileSync("tests/fixtures/xiaoba.jsonl");
beforeAll(async () => {
  await migrate(pool);
  p = (await createProject(pool, "read")).project_id;
  q = (await createProject(pool, "other")).project_id;
  ack = await ingestBatch(pool, p, {
    source_id: "read",
    stream_id: "read",
    harness: "xiaoba",
    records: [
      {
        offset: 0,
        raw_base64: raw.toString("base64"),
        events: projectRecord("xiaoba", raw).events.map(
          ({ content, text, fidelity, ...d }) => d,
        ),
      },
    ],
  });
});
afterAll(() => pool.end());
it("returns exact raw bytes and event fields", async () => {
  const r = await readRaw(pool, p, ack.records[0].raw_ref);
  expect(r.bytes.equals(raw)).toBe(true);
  expect(r.sha256).toBe(sha256(raw));
  const e = await readReference(pool, p, { ref: ack.records[0].event_refs[0] });
  expect(e.event.content).toBe(JSON.parse(raw.toString()).user.text);
});
it("never reads a different project reference", async () => {
  await expect(readRaw(pool, q, ack.records[0].raw_ref)).rejects.toMatchObject({
    statusCode: 404,
  });
  await expect(
    readReference(pool, q, { ref: ack.records[0].event_refs[0] }),
  ).rejects.toMatchObject({ statusCode: 404 });
});
it("paginates episode members in order and validates limits", async () => {
  const run = ref("run"),
    ep = ref("ep");
  await pool.query(
    "insert into extraction_runs(id,project_id,status,input_refs) values($1,$2,'completed','[]')",
    [run, p],
  );
  await pool.query(
    "insert into episodes(id,project_id,run_id,goal,chunk_id) values($1,$2,$3,'{}','0')",
    [ep, p, run],
  );
  for (let i = 0; i < 4; i++)
    await pool.query("insert into episode_events values($1,$2,$3,$4)", [
      p,
      ep,
      ack.records[0].event_refs[i],
      i,
    ]);
  const a = await readReference(pool, p, { ref: ep, limit: 3 });
  expect(a.events).toHaveLength(3);
  expect(a.next_offset).toBe(3);
  expect(
    (await readReference(pool, p, { ref: ep, offset: 3 })).events,
  ).toHaveLength(1);
  await expect(
    readReference(pool, p, { ref: ep, limit: 51 }),
  ).rejects.toThrow();
});

it("defaults to 20 members and reads the final member exactly once", async () => {
  const project = (await createProject(pool, "pagination")).project_id;
  const records = Array.from({ length: 6 }, (_, i) => ({
    offset: i * raw.length,
    raw_base64: raw.toString("base64"),
    events: projectRecord("xiaoba", raw).events.map(
      ({ content, text, fidelity, ...d }) => d,
    ),
  }));
  const accepted = await ingestBatch(pool, project, {
    source_id: project,
    stream_id: "pages",
    harness: "xiaoba",
    records,
  });
  const refs = accepted.records.flatMap((r) => r.event_refs).slice(0, 21),
    run = ref("run"),
    ep = ref("ep");
  await pool.query(
    "insert into extraction_runs(id,project_id,status,input_refs) values($1,$2,'completed','[]')",
    [run, project],
  );
  await pool.query(
    "insert into episodes(id,project_id,run_id,goal,chunk_id) values($1,$2,$3,'{}','0')",
    [ep, project, run],
  );
  for (const [i, event] of refs.entries())
    await pool.query("insert into episode_events values($1,$2,$3,$4)", [
      project,
      ep,
      event,
      i,
    ]);
  const first = await readReference(pool, project, { ref: ep });
  expect(first.events).toHaveLength(20);
  expect(first.next_offset).toBe(20);
  const last = await readReference(pool, project, {
    ref: ep,
    offset: first.next_offset,
  });
  expect(last.events).toHaveLength(1);
  expect(last.next_offset).toBeNull();
  expect([...first.events, ...last.events].map((e) => e.ref)).toEqual(refs);
});
