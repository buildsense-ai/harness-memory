import { beforeAll, afterAll, it, expect } from "vitest";
import { Pool } from "pg";
import { migrate } from "../src/db/migrate.js";
import { createProject, createProjectKey, authenticate } from "../src/db/projects.js";
import { ingestBatch } from "../src/ingest.js";
import { readRaw } from "../src/read.js";
import { projectRecord } from "../src/adapters/index.js";
import { readFileSync } from "node:fs";
const pool = new Pool({ connectionString: process.env.TEST_DATABASE_URL });
beforeAll(async () => {
  if (!process.env.TEST_DATABASE_URL) throw Error("TEST_DATABASE_URL required");
  await migrate(pool);
});
afterAll(() => pool.end());
const raw = readFileSync("tests/fixtures/xiaoba.jsonl");
const batch = (source: string) => ({
  source_id: source,
  stream_id: "test",
  harness: "xiaoba" as const,
  records: [
    {
      offset: 0,
      raw_base64: raw.toString("base64"),
      events: projectRecord("xiaoba", raw).events.map(
        ({ content, text, fidelity, ...e }) => e,
      ),
    },
  ],
});
it("stores immutable records and returns the same refs on duplicate upload", async () => {
  const p = await createProject(pool, "ingest");
  expect(await authenticate(pool, p.key)).toBe(p.project_id);
  const b = batch(p.project_id);
  const a = await ingestBatch(pool, p.project_id, b);
  expect(await ingestBatch(pool, p.project_id, b)).toEqual(a);
  expect(a.next_offset).toBe(raw.length);
  const stored = await pool.query("select key_hash from projects where id=$1", [
    p.project_id,
  ]);
  expect(stored.rows[0].key_hash).not.toBe(p.key);
  await expect(authenticate(pool, "wrong")).rejects.toThrow();
});
it("accepts raw-only records and preserves their original file coordinates", async () => {
  const p = await createProject(pool, "origin"),
    rawRecord = {
      offset: 0,
      raw_base64: raw.toString("base64"),
      origin: { path: "sessions/catscompany/2026-11-11/session.jsonl", offset: 9182 },
    };
  const ack = await ingestBatch(pool, p.project_id, {
    source_id: "origin-source",
    stream_id: "origin-stream",
    harness: "xiaoba",
    records: [rawRecord],
  });
  const stored = await readRaw(pool, p.project_id, ack.records[0].raw_ref);
  expect(stored.bytes.equals(raw)).toBe(true);
  expect(stored.origin).toEqual(rawRecord.origin);
  await expect(ingestBatch(pool, p.project_id, {
    source_id: "origin-source",
    stream_id: "origin-stream",
    harness: "xiaoba",
    records: [{ ...rawRecord, origin: { ...rawRecord.origin, offset: 9183 } }],
  })).rejects.toThrow(/origin conflict/);
});
it("rejects unsafe source paths", async () => {
  const p = await createProject(pool, "unsafe-origin"), b = batch("unsafe-origin");
  await expect(ingestBatch(pool, p.project_id, {
    ...b,
    records: [{ ...b.records[0], origin: { path: "../outside.jsonl", offset: 0 } }],
  })).rejects.toThrow(/invalid source origin/);
});
it("issues an additional project key without invalidating the original", async () => {
  const p = await createProject(pool, "multi-key");
  const added = await createProjectKey(pool, p.project_id);
  expect(added.project_id).toBe(p.project_id);
  expect(await authenticate(pool, p.key)).toBe(p.project_id);
  expect(await authenticate(pool, added.key)).toBe(p.project_id);
  const hash = (await pool.query("select key_hash from project_keys where project_id=$1", [p.project_id])).rows[0].key_hash;
  expect(hash).not.toBe(added.key);
});
it("rejects content conflicts without overwriting and rolls back a mixed batch", async () => {
  const p = await createProject(pool, "conflict"),
    b = batch(p.project_id);
  await ingestBatch(pool, p.project_id, b);
  const changed = Buffer.from(raw.toString().replace("8460", "8461"));
  await expect(
    ingestBatch(pool, p.project_id, {
      ...b,
      records: [{ ...b.records[0], raw_base64: changed.toString("base64") }],
    }),
  ).rejects.toThrow(/conflict/);
  const fresh = batch(p.project_id + "x");
  await expect(
    ingestBatch(pool, p.project_id, {
      ...fresh,
      records: [
        ...fresh.records,
        {
          offset: raw.length,
          raw_base64: Buffer.from("{}\n").toString("base64"),
          events: [],
        },
      ],
    }),
  ).rejects.toThrow();
  expect(
    (
      await pool.query(
        "select count(*)::int n from raw_records where project_id=$1 and source_id=$2",
        [p.project_id, fresh.source_id],
      )
    ).rows[0].n,
  ).toBe(0);
});
it("isolates identical sources across projects", async () => {
  const p = await createProject(pool, "a"),
    q = await createProject(pool, "b");
  const b = batch("same");
  expect(
    (await ingestBatch(pool, p.project_id, b)).records[0].raw_ref,
  ).not.toBe((await ingestBatch(pool, q.project_id, b)).records[0].raw_ref);
});
