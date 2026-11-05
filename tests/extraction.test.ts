import { it, expect } from "vitest";
import { extractEpisodes, ContextTooLong, type ChatModel } from "../src/extraction/model.js";
import type { EpisodeSelection, StoredEvent, TaskPartition, TaskThread } from "../src/contracts.js";

const ev = (n: number, kind: StoredEvent["kind"] = "message", extra = {}): StoredEvent => ({
  ref: `evt_${n}`,
  raw_ref: `raw_${n}`,
  offset: n,
  kind,
  pointer: "/x",
  order: n,
  content: `text ${n}`,
  text: `text ${n}`,
  fidelity: "recorded",
  ...extra,
});

const t1: TaskThread = {
  thread_id: "T1",
  title: "修复上传限制",
  desired_outcome: "大文件上传成功",
  include_topics: ["413", "上传上限"],
  exclude_topics: ["无关的 502"],
  boundary_note: "独立验收：上传成功。",
};
const partition: TaskPartition = {
  task_threads: [t1],
  query_assignments: [{ query_ref: "evt_1", thread_ids: ["T1"], role: "origin" }],
  relations: [],
};
const coverage = (refs: string[] = []): EpisodeSelection["evidence_coverage"] => ({
  constraints_and_corrections: [],
  diagnosis_and_failures: [],
  decision: [],
  implementation: refs,
  verification: [],
  final_state: [],
});
const baseModel: ChatModel = {
  partition: async () => partition,
  select: async (_thread, _assignments, events) => ({ event_refs: events.map((event) => event.ref), evidence_coverage: coverage() }),
};

it("partitions on dialogue only, then gives the full snapshot to the task-thread selector", async () => {
  const events = [
    ev(1, "query"),
    ev(2, "tool_call", { tool_call_id: "call-a" }),
    ev(3, "tool_result", { tool_call_id: "call-a" }),
    ev(4, "message"),
  ];
  let partitionInput: StoredEvent[] = [];
  let selectionInput: StoredEvent[] = [];
  const model: ChatModel = {
    ...baseModel,
    partition: async (input) => { partitionInput = input; return partition; },
    select: async (_thread, assignments, input) => {
      selectionInput = input;
      expect(assignments.map((item) => item.query_ref)).toEqual(["evt_1"]);
      return { event_refs: ["evt_1", "evt_4"], evidence_coverage: coverage(["evt_4"]) };
    },
  };
  const result = await extractEpisodes(events, model, 65536);
  expect(partitionInput.map((event) => event.kind)).toEqual(["query", "message"]);
  expect(selectionInput.map((event) => event.kind)).toEqual(["query", "tool_call", "tool_result", "message"]);
  expect(result.episodes[0].event_refs).toEqual(["evt_1", "evt_4"]);
  expect(result.episodes[0].evidence_coverage.implementation).toEqual(["evt_4"]);
});

it("preserves relations, multi-thread compound assignments, and one episode per thread", async () => {
  const events = [ev(1, "query"), ev(2, "query"), ev(3, "message")];
  const second: TaskThread = { ...t1, thread_id: "T2", title: "发布说明" };
  const resultPartition: TaskPartition = {
    task_threads: [t1, second],
    query_assignments: [
      { query_ref: "evt_1", thread_ids: ["T1"], role: "origin" },
      { query_ref: "evt_2", thread_ids: ["T1", "T2"], role: "compound", reason: "复合请求覆盖两个独立结果。" },
    ],
    relations: [{ from_thread_id: "T2", relation: "depends_on", to_thread_id: "T1", evidence_refs: ["evt_2"], reason: "发布交付明确依赖修复内容。" }],
  };
  const model: ChatModel = {
    partition: async () => resultPartition,
    select: async (thread, assignments) => ({
      event_refs: assignments.map((item) => item.query_ref),
      evidence_coverage: coverage(),
    }),
  };
  const result = await extractEpisodes(events, model, 65536);
  expect(result.partition.relations[0]).toMatchObject({ from_thread_id: "T2", relation: "depends_on", to_thread_id: "T1" });
  expect(result.episodes).toHaveLength(2);
  expect(result.episodes.map((episode) => episode.thread.thread_id)).toEqual(["T1", "T2"]);
  expect(result.episodes[0].event_refs).toEqual(["evt_1", "evt_2"]);
});

it("rejects unknown refs, missing query anchors, unsupported relations, and invalid coverage", async () => {
  await expect(extractEpisodes([ev(1, "query")], {
    ...baseModel,
    select: async () => ({ event_refs: ["evt_unknown"], evidence_coverage: coverage() }),
  }, 65536)).rejects.toThrow(/unknown event/);

  await expect(extractEpisodes([ev(1, "query")], {
    ...baseModel,
    select: async () => ({ event_refs: [], evidence_coverage: coverage() }),
  }, 65536)).rejects.toThrow(/query anchor/);

  await expect(extractEpisodes([ev(1, "query")], {
    ...baseModel,
    partition: async () => ({ ...partition, relations: [{ ...({ from_thread_id: "T1", relation: "depends_on", to_thread_id: "T1", evidence_refs: ["evt_1"], reason: "self" } as any) }] }),
  }, 65536)).rejects.toThrow(/self-loop/);

  await expect(extractEpisodes([ev(1, "query")], {
    ...baseModel,
    select: async () => ({ event_refs: ["evt_1"], evidence_coverage: { ...coverage(), implementation: ["evt_unknown"] } }),
  }, 65536)).rejects.toThrow(/evidence_coverage/);
});

it("rejects partition omissions and unsupported evidence refs", async () => {
  await expect(extractEpisodes([ev(1, "query"), ev(2, "query")], {
    ...baseModel,
    partition: async () => partition,
  }, 65536)).rejects.toThrow(/exactly one assignment/);
  await expect(extractEpisodes([ev(1, "query")], {
    ...baseModel,
    partition: async () => ({ ...partition, relations: [{ from_thread_id: "T1", relation: "continues", to_thread_id: "T1", evidence_refs: ["evt_1"], reason: "bad self relation" }] }),
  }, 65536)).rejects.toThrow(/self-loop/);
  await expect(extractEpisodes([ev(1, "query")], {
    ...baseModel,
    partition: async () => ({ ...partition, task_threads: [t1, { ...t1, thread_id: "T2" }] }),
  }, 65536)).rejects.toThrow(/no assigned query/);
});

it("keeps tool call/result together and returns source order", async () => {
  const events = [
    ev(1, "query"),
    ev(2, "tool_call", { tool_call_id: "call-a" }),
    ev(3, "tool_result", { tool_call_id: "call-a" }),
    ev(4, "message"),
  ];
  const result = await extractEpisodes(events, {
    ...baseModel,
    select: async () => ({ event_refs: ["evt_4", "evt_3", "evt_1"], evidence_coverage: coverage() }),
  }, 65536);
  expect(result.episodes[0].event_refs).toEqual(["evt_1", "evt_2", "evt_3", "evt_4"]);
});

it("merges chronological chunks into a single thread Episode", async () => {
  const events = [ev(1, "query"), ev(2), ev(3), ev(4)];
  let partitionCalls = 0;
  const model: ChatModel = {
    partition: async (input) => {
      partitionCalls++;
      if (input.length > 2) throw new ContextTooLong();
      const query = input.find((event) => event.kind === "query")!;
      return { task_threads: [t1], query_assignments: [{ query_ref: query.ref, thread_ids: ["T1"], role: "origin" }], relations: [] };
    },
    select: async (_thread, assignments) => ({ event_refs: assignments.map((assignment) => assignment.query_ref), evidence_coverage: coverage() }),
  };
  const result = await extractEpisodes(events, model, 65536);
  expect(partitionCalls).toBe(2);
  expect(result.episodes).toHaveLength(1);
  expect(result.episodes[0].event_refs).toEqual(["evt_1"]);
});

it("fails when an indivisible oversized tool pair cannot fit", async () => {
  const events = [ev(1, "query"), ev(2, "tool_call", { tool_call_id: "call-a" }), ev(3, "tool_result", { tool_call_id: "call-a" })];
  await expect(extractEpisodes(events, {
    ...baseModel,
    partition: async () => { throw new ContextTooLong(); },
  }, 65536)).rejects.toThrow(/indivisible/);
});
