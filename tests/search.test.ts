import { it, expect, afterAll } from "vitest";
import { Pool } from "pg";
import { createProject } from "../src/db/projects.js";
import { ingestBatch } from "../src/ingest.js";
import { projectRecord } from "../src/adapters/index.js";
import { ExtractionRunner } from "../src/extraction/runner.js";
import type { ChatModel, TaskPartition } from "../src/extraction/model.js";
import { searchEpisodes } from "../src/search.js";
import { readReference } from "../src/read.js";
import { snapshotEvents } from "../src/extraction/snapshot.js";
import { migrate } from "../src/db/migrate.js";
import { beforeAll } from "vitest";
const pool = new Pool({ connectionString: process.env.TEST_DATABASE_URL });
function taskModel(overrides: Partial<ChatModel> = {}): ChatModel {
  return {
    partition: async (events) => {
      const query = events.find((event) => event.kind === "query");
      const result: TaskPartition = {
        task_threads: [{ thread_id: "T1", title: "test", desired_outcome: "test outcome", include_topics: [], exclude_topics: [], boundary_note: "single task" }],
        query_assignments: query ? [{ query_ref: query.ref, thread_ids: ["T1"], role: "origin" }] : [],
        relations: [],
      };
      return result;
    },
    select: async (_thread, _assignments, events) => ({
      event_refs: events.map((event) => event.ref),
      evidence_coverage: { constraints_and_corrections: [], diagnosis_and_failures: [], decision: [], implementation: [], verification: [], final_state: [] },
    }),
    ...overrides,
  };
}
beforeAll(() => migrate(pool));
afterAll(() => pool.end());

it("resolves Pi leaf ancestry before applying an earlier byte range", async () => {
  const p = (await createProject(pool, "pi-range")).project_id;
  const values = [
    {
      type: "message",
      id: "a",
      parentId: null,
      message: { role: "user", content: "root" },
    },
    {
      type: "message",
      id: "b",
      parentId: "a",
      message: {
        role: "assistant",
        content: [{ type: "text", text: "branch b" }],
      },
    },
    {
      type: "message",
      id: "c",
      parentId: "b",
      message: { role: "user", content: "late leaf" },
    },
  ];
  let offset = 0;
  const records = values.map((x) => {
    const raw = Buffer.from(JSON.stringify(x) + "\n");
    const r = {
      offset,
      raw_base64: raw.toString("base64"),
      events: projectRecord("pi", raw).events.map(
        ({ content, text, fidelity, ...d }) => d,
      ),
    };
    offset += raw.length;
    return r;
  });
  await ingestBatch(pool, p, {
    source_id: p,
    stream_id: "pi",
    harness: "pi",
    records,
  });
  const es = await snapshotEvents(pool, p, {
    source_id: p,
    stream_id: "pi",
    leaf_id: "c",
    end_offset: records[1].offset,
  });
  expect(es.map((e) => e.native_id)).toEqual(["a"]);
});
async function seed() {
  const p = await createProject(pool, "search");
  const raw = Buffer.from(
    JSON.stringify({
      user: { text: "中文 Alpha %_" },
      assistant: { text: "Beta", tool_calls: [] },
    }) + "\n",
  );
  const request = { source_id: p.project_id, stream_id: "test" };
  await ingestBatch(pool, p.project_id, {
    ...request,
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
  return { p, request, raw };
}
it("publishes selected episodes and searches literal keywords with project isolation", async () => {
  const { p, request } = await seed();
  const runner = new ExtractionRunner(
    pool,
    taskModel(),
    65536,
  );
  const { run_id } = await runner.start(p.project_id, request);
  await runner.wait();
  const extraction = await runner.get(p.project_id, run_id);
  expect(extraction.status).toBe("completed");
  expect(extraction.task_partition.task_threads).toHaveLength(1);
  expect(extraction.episodes[0]).toMatchObject({ thread_id: "T1", task_thread: { title: "test" } });
  expect(
    await searchEpisodes(pool, p.project_id, { keywords: ["alpha", "BETA"] }),
  ).toEqual([]);
  const r = await searchEpisodes(pool, p.project_id, {
    keywords: ["中文", "alpha", "%_"],
  });
  expect(r).toHaveLength(1);
  const episode = await readReference(pool, p.project_id, { ref: r[0].episode_ref });
  expect(episode.events).toHaveLength(2);
  expect(episode.thread_id).toBe("T1");
  expect(episode.evidence_coverage).toHaveProperty("diagnosis_and_failures");
  expect(
    await searchEpisodes(pool, p.project_id, {
      keywords: ["alpha", "beta"],
      operator: "OR",
    }),
  ).toHaveLength(1);
  expect(
    await searchEpisodes(
      pool,
      (await createProject(pool, "other")).project_id,
      { keywords: ["alpha"] },
    ),
  ).toEqual([]);
  await expect(
    searchEpisodes(pool, p.project_id, { keywords: ["a"], limit: 51 }),
  ).rejects.toThrow();
});
it("rejects concurrent runs and publishes nothing on model failure", async () => {
  const { p, request } = await seed();
  let release!: () => void;
  const gate = new Promise<void>((r) => (release = r));
  const runner = new ExtractionRunner(
    pool,
    taskModel({
      partition: async () => {
        await gate;
        throw Error("provider failed");
      },
    }),
    65536,
  );
  const first = await runner.start(p.project_id, request);
  await expect(runner.start(p.project_id, request)).rejects.toMatchObject({
    statusCode: 409,
  });
  release();
  await runner.wait();
  expect((await runner.get(p.project_id, first.run_id)).status).toBe("failed");
  expect(
    await searchEpisodes(pool, p.project_id, { keywords: ["alpha"] }),
  ).toEqual([]);
  await expect(
    runner.get((await createProject(pool, "foreign")).project_id, first.run_id),
  ).rejects.toMatchObject({ statusCode: 404 });
});
it("reads an explicit record-bounded subrange", async () => {
  const { p, request, raw } = await seed();
  const second = Buffer.from(raw.toString().replace("Alpha", "Gamma"));
  await ingestBatch(pool, p.project_id, {
    ...request,
    harness: "xiaoba",
    records: [
      {
        offset: raw.length,
        raw_base64: second.toString("base64"),
        events: projectRecord("xiaoba", second).events.map(
          ({ content, text, fidelity, ...d }) => d,
        ),
      },
    ],
  });
  const es = await snapshotEvents(pool, p.project_id, {
    ...request,
    end_offset: raw.length,
  });
  expect(es).toHaveLength(2);
  expect(es[0].text).toContain("Alpha");
});

it("marks a pending run interrupted on startup and leaves original data readable", async () => {
  const { p, request } = await seed();
  let release!: () => void;
  const gate = new Promise<void>((r) => (release = r));
  const runner = new ExtractionRunner(
    pool,
    taskModel({
      partition: async (events) => {
        await gate;
        const query = events.find((event) => event.kind === "query")!;
        return { task_threads: [{ thread_id: "T1", title: "g", desired_outcome: "g", include_topics: [], exclude_topics: [], boundary_note: "g" }], query_assignments: [{ query_ref: query.ref, thread_ids: ["T1"], role: "origin" }], relations: [] };
      },
    }),
    65536,
  );
  const started = await runner.start(p.project_id, request);
  const before = await runner.get(p.project_id, started.run_id);
  const newer = Buffer.from(
    JSON.stringify({
      user: { text: "new record" },
      assistant: { text: "new reply", tool_calls: [] },
    }) + "\n",
  );
  const end = Number(
    (
      await pool.query(
        "select next_offset from streams where project_id=$1 and source_id=$2",
        [p.project_id, request.source_id],
      )
    ).rows[0].next_offset,
  );
  await ingestBatch(pool, p.project_id, {
    ...request,
    harness: "xiaoba",
    records: [
      {
        offset: end,
        raw_base64: newer.toString("base64"),
        events: projectRecord("xiaoba", newer).events.map(
          ({ content, text, fidelity, ...d }) => d,
        ),
      },
    ],
  });
  expect((await runner.get(p.project_id, started.run_id)).input_refs).toEqual(
    before.input_refs,
  );
  release();
  await runner.wait();
  const stale = "run_interrupted_" + p.project_id;
  await pool.query(
    "insert into extraction_runs(id,project_id,status,input_refs) values($1,$2,'running',$3)",
    [stale, p.project_id, JSON.stringify(before.input_refs)],
  );
  await runner.interrupt();
  expect((await runner.get(p.project_id, stale)).status).toBe("interrupted");
  expect(
    (await readReference(pool, p.project_id, { ref: before.input_refs[0] }))
      .event,
  ).toBeTruthy();
});
