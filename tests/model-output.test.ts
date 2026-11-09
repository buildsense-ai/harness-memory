import { afterEach, expect, it, vi } from "vitest";
import { CompatibleChatModel } from "../src/extraction/model.js";
import type { StoredEvent } from "../src/contracts.js";
import { OutputValidationError, appendOutputRetry, outputFeedback, readToolOutput } from "../src/extraction/output.js";

afterEach(() => vi.unstubAllGlobals());
const events = ["evt_dialogue_a", "evt_dialogue_b"].map((ref, order): StoredEvent => ({
  ref, raw_ref: "raw", offset: order, order, kind: "query", pointer: "/content", content: "query", text: "query", fidelity: "recorded",
}));
const good = {
  task_threads: [{ thread_id: "T1", title: "任务", desired_outcome: "完成任务", include_topics: [], exclude_topics: [], boundary_note: "同一结果" }],
  query_assignments: events.map(e => ({ query_ref: e.ref, thread_ids: ["T1"], role: "origin" })),
  relations: [],
};
const completion = (value: unknown) => ({ choices: [{ finish_reason: "tool_calls", message: {
  role: "assistant", content: null, tool_calls: [{ id: "output-1", type: "function", function: { name: "submit_task_partition", arguments: JSON.stringify(value) } }],
} }] });
const model = () => new CompatibleChatModel({ baseUrl: "https://model.invalid/v1", key: "test", model: "test", maxOutputTokens: 60000 });

it("returns every bad query ID and missing anchor in one tool error, then accepts the model's complete correction", async () => {
  const bad = structuredClone(good);
  bad.query_assignments[0].query_ref = "evt_probe_a";
  bad.query_assignments[1].query_ref = "evt_probe_b";
  const requests: any[] = [];
  vi.stubGlobal("fetch", vi.fn(async (_url, options) => {
    requests.push(JSON.parse(options.body));
    return Response.json(completion(requests.length === 1 ? bad : good));
  }));
  expect(await model().partition(events)).toEqual(good);
  expect(requests).toHaveLength(2);
  const error = JSON.parse(requests[1].messages.at(-1).content);
  expect(error.issues).toEqual(expect.arrayContaining([
    expect.objectContaining({ path: "/query_assignments/0/query_ref", code: "unknown_query_ref", received: "evt_probe_a" }),
    expect.objectContaining({ path: "/query_assignments/1/query_ref", code: "unknown_query_ref", received: "evt_probe_b" }),
    expect.objectContaining({ code: "missing_query_assignment", received: "evt_dialogue_a" }),
    expect.objectContaining({ code: "missing_query_assignment", received: "evt_dialogue_b" }),
  ]));
  expect(error.reference_sets.query_refs).toEqual(events.map(e => e.ref));
  expect(bad.query_assignments[0].query_ref).toBe("evt_probe_a");
  expect(requests[1].messages[0]).toEqual(requests[0].messages[0]);
  expect(requests[1].messages[1]).toEqual(requests[0].messages[1]);
});

it("collects nested schema, duplicate, missing, role and relation errors before the next attempt", async () => {
  const bad: any = structuredClone(good);
  bad.task_threads[0].title = " ";
  bad.task_threads[0].extra = true;
  bad.task_threads.push({ ...good.task_threads[0] });
  bad.task_threads.push({ ...good.task_threads[0], thread_id: "T2" });
  bad.query_assignments = [
    { query_ref: events[0].ref, thread_ids: ["Missing", "Missing"], role: "compound" },
    { query_ref: events[0].ref, thread_ids: ["T1"], role: "wrong" },
    null,
  ];
  bad.relations = [{ from_thread_id: "T1", relation: "depends_on", to_thread_id: "T1", evidence_refs: ["wrong-a", "wrong-b"], reason: "" }];
  const requests: any[] = [];
  vi.stubGlobal("fetch", vi.fn(async (_url, options) => {
    requests.push(JSON.parse(options.body));
    return Response.json(completion(requests.length === 1 ? bad : good));
  }));
  expect(await model().partition(events)).toEqual(good);
  const error = JSON.parse(requests[1].messages.at(-1).content);
  expect(error.issues.map((i: any) => i.code)).toEqual(expect.arrayContaining([
    "empty_string", "schema_additionalProperties", "schema_type", "schema_enum", "duplicate_thread_id",
    "unknown_thread_id", "duplicate_assignment_thread", "missing_assignment_reason", "duplicate_query_assignment",
    "missing_query_assignment", "unassigned_thread", "self_relation", "unknown_evidence_ref", "empty_relation_reason",
  ]));
  expect(error.issues.filter((i: any) => i.code === "unknown_evidence_ref")).toHaveLength(2);
  expect(error.reference_sets).toMatchObject({ thread_ids: ["T1", "T2"], evidence_refs: events.map(e => e.ref) });
});

it("never accepts an invalid output after exhausting three attempts and retains structured errors", async () => {
  const bad = { ...good, query_assignments: [] };
  const fetch = vi.fn(async () => Response.json(completion(bad)));
  vi.stubGlobal("fetch", fetch);
  const error = await model().partition(events).catch(e => e);
  expect(error).toBeInstanceOf(OutputValidationError);
  expect(error.issues.filter((i: any) => i.code === "missing_query_assignment")).toHaveLength(2);
  expect(fetch).toHaveBeenCalledTimes(3);
});

it("rejects valid-looking JSON if the provider reports truncation", () => {
  const data = completion(good); data.choices[0].finish_reason = "length";
  expect(() => readToolOutput(data, "submit_task_partition")).toThrow(/token limit/);
});

it.each(["not-json", '```json\n{"task_threads": []}\n```']) ("rejects malformed/fenced JSON tool arguments and can ask for a complete retry: %s", args => {
  const data = completion(good); data.choices[0].message.tool_calls[0].function.arguments = args;
  expect(() => readToolOutput(data, "submit_task_partition")).toThrow(/Invalid tool-argument JSON/);
});

it("does not silently choose one of multiple tool calls, and answers all calls on retry", () => {
  const data = completion(good), first = data.choices[0].message.tool_calls[0];
  data.choices[0].message.tool_calls.push({ ...first, id: "output-2", function: { ...first.function, name: "unexpected" } });
  const error = (() => { try { readToolOutput(data, "submit_task_partition"); } catch (e) { return e; } })();
  expect((error as OutputValidationError).issues.map(i => i.code)).toEqual(["output_call_count", "wrong_output_tool"]);
  const messages: any[] = [];
  appendOutputRetry(messages, data.choices[0].message, error, "submit_task_partition");
  expect(messages.slice(1).map(m => m.tool_call_id)).toEqual(["output-1", "output-2"]);
  expect(messages.slice(1).every(m => m.role === "tool")).toBe(true);
});

it("uses valid user feedback when the assistant emitted no call or an invalid tool envelope", () => {
  for (const message of [{ role: "assistant", content: "No tool" }, { ...completion(good).choices[0].message, tool_calls: [null] }]) {
    const messages: any[] = [];
    appendOutputRetry(messages, message, Error("missing required tool"), "submit_task_partition");
    expect(messages.map(m => m.role)).toEqual(["assistant", "user"]);
    expect(JSON.parse(messages[1].content).required_tool).toBe("submit_task_partition");
  }
});

it("bounds unusually large diagnostic payloads explicitly without treating partial feedback as success", () => {
  const failure = new OutputValidationError(Array.from({ length: 125 }, (_, i) => ({ path: `/items/${i}`, code: "bad", message: "bad ref" })));
  const feedback = outputFeedback(failure, "submit_task_partition");
  expect(feedback).toMatchObject({ ok: false, issue_count: 125, omitted_issue_count: 25 });
  expect(feedback.issues).toHaveLength(100);
});
