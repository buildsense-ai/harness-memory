import { describe, it, expect } from "vitest";
import { projectRecord, selectPiPath } from "../src/adapters/index.js";
const x = {
  entry_type: "turn",
  turn: 1,
  timestamp: "2026-11-02T00:00:00Z",
  user: { text: "检查上传" },
  assistant: {
    text: "完成",
    tool_calls: [
      { id: "c1", name: "bash", arguments: { command: "ls" }, result: "成功" },
    ],
  },
};
describe("log adapters", () => {
  it("reports malformed UTF-8 JSON as a client error", () => {
    try {
      projectRecord("xiaoba", Buffer.from([255, 10]));
      throw Error("accepted invalid input");
    } catch (e) {
      expect(e).toMatchObject({ statusCode: 400 });
    }
  });
  it("preserves Chinese CRLF bytes and selects individual fields", () => {
    const raw = Buffer.from(JSON.stringify(x) + "\r\n");
    const copy = Buffer.from(raw);
    const p = projectRecord("xiaoba", raw);
    expect(raw.equals(copy)).toBe(true);
    expect(p.events.map((e) => e.kind)).toEqual([
      "query",
      "message",
      "tool_call",
      "tool_result",
    ]);
    expect(p.events[3].content).toBe("成功");
    expect(p.events[0].fidelity).toBe("turn_aggregate");
    expect(p.events[2].content).not.toHaveProperty("result");
  });
  it("separates Pi assistant text, call and result", () => {
    const p = projectRecord(
      "pi",
      Buffer.from(
        JSON.stringify({
          type: "message",
          id: "a",
          parentId: null,
          message: {
            role: "assistant",
            content: [
              { type: "text", text: "先检查" },
              {
                type: "toolCall",
                id: "c",
                name: "bash",
                arguments: { command: "ls" },
              },
            ],
          },
        }),
      ),
    );
    expect(p.events.map((e) => e.kind)).toEqual(["message", "tool_call"]);
    expect(p.native_id).toBe("a");
    const r = projectRecord(
      "pi",
      Buffer.from(
        JSON.stringify({
          type: "message",
          id: "b",
          parentId: "a",
          message: {
            role: "toolResult",
            toolCallId: "c",
            content: [{ type: "text", text: "ok" }],
          },
        }),
      ),
    );
    expect(r.events[0].tool_call_id).toBe("c");
  });
  it("requires a leaf for branching and never mixes siblings", () => {
    const rs: any[] = [
      { native_id: "a", parent_id: null },
      { native_id: "b", parent_id: "a" },
      { native_id: "c", parent_id: "a" },
    ];
    expect(() => selectPiPath(rs)).toThrow(/leaf/);
    expect(selectPiPath(rs, "b").map((r) => r.native_id)).toEqual(["a", "b"]);
  });
  it("rejects missing parents, duplicate IDs and unsupported source formats", () => {
    expect(() =>
      selectPiPath([{ native_id: "a", parent_id: "missing" }] as any),
    ).toThrow();
    expect(() =>
      selectPiPath([{ native_id: "a" }, { native_id: "a" }] as any),
    ).toThrow();
    expect(() => projectRecord("xiaoba", Buffer.from("{}"))).toThrow(
      /unsupported/,
    );
  });
});

it("preserves native XiaoBa intermediate messages, tool identity, source fields and ignores injected records", () => {
  const messages=[{role:"user",content:"任务"},{role:"assistant",content:"先检查",tool_calls:[{id:"c1",type:"function",function:{name:"shell",arguments:"{}"}}]},{role:"tool",tool_call_id:"c1",content:"结果"},{role:"assistant",content:"完成"}];
  const records=messages.map(m=>projectRecord("xiaoba",Buffer.from(JSON.stringify(m)+"\n")));
  expect(records.flatMap(r=>r.events.map(e=>e.kind))).toEqual(["query","message","tool_call","tool_result","message"]);
  expect(records[1].events[1].content).toEqual(messages[1].tool_calls![0]);
  expect(records[1].events[1].pointer).toBe("/tool_calls/0");
  expect(records[1].events[0].fidelity).toBe("native_recorded");
  expect(projectRecord("xiaoba",Buffer.from(JSON.stringify({role:"assistant",content:"合成摘要",__checkpointSummary:true}))).events).toEqual([]);
});

it("normalizes an ordered public-message turn while preserving tool pairs and raw pointers", () => {
  const messages = [
    { role: "user", content: "实现增量上传" },
    { role: "assistant", content: "先查看文件" },
    { role: "assistant", content: null, tool_calls: [{ id: "call-1", type: "function", function: { name: "read_file", arguments: "{\"path\":\"a.ts\"}" } }] },
    { role: "tool", tool_call_id: "call-1", content: "文件内容" },
    { role: "assistant", content: "已完成" },
  ];
  const raw = Buffer.from(JSON.stringify({ entry_type: "turn", turn: 8, timestamp: "2026-11-12T00:00:00Z", messages }) + "\n");
  const projected = projectRecord("xiaoba", raw);
  expect(projected.format_version).toBe("xiaoba-turn-messages-v1");
  expect(projected.events.map((event) => event.kind)).toEqual(["query", "message", "tool_call", "tool_result", "message"]);
  expect(projected.events.map((event) => event.order)).toEqual([0, 1, 2, 3, 4]);
  expect(projected.events[2]).toMatchObject({ pointer: "/messages/2/tool_calls/0", tool_call_id: "call-1" });
  expect(projected.events[3]).toMatchObject({ pointer: "/messages/3/content", tool_call_id: "call-1", text: "文件内容" });
  expect(raw.toString("utf8")).toContain("实现增量上传");
});

it("keeps separate text blocks separately anchored in ordered XiaoBa messages", () => {
  const raw = Buffer.from(JSON.stringify({ entry_type: "turn", messages: [
    { role: "user", content: [{ type: "text", text: "first" }, { type: "image", source: "omitted" }, { type: "text", text: "second" }] },
  ] }) + "\n");
  const events = projectRecord("xiaoba", raw).events;
  expect(events.map(({ pointer, content }) => ({ pointer, content }))).toEqual([
    { pointer: "/messages/0/content/0/text", content: "first" },
    { pointer: "/messages/0/content/2/text", content: "second" },
  ]);
  expect(events.every((event) => event.fidelity === "turn_messages")).toBe(true);
});

it("normalizes XiaoBa transcript receipts, consumed inputs, public messages and paired tool events", () => {
  const common = { entry_type: "transcript", schema_version: 1, stream_id: "logger-1", timestamp: "2026-11-12T10:00:00Z", session_id: "session-1" };
  const receipt = projectRecord("xiaoba", Buffer.from(JSON.stringify({ ...common, event_id: "logger-1:1", seq: 1, event: { type: "input_received", input_id: "input-1", text: "pending text" } })+"\n"));
  expect(receipt.events).toEqual([]);
  expect(receipt).toMatchObject({format_version:"xiaoba-transcript-v1",record_type:"transcript",transcript_event_type:"input_received"});
  const consumed = projectRecord("xiaoba", Buffer.from(JSON.stringify({ ...common, event_id: "logger-1:2", seq: 2, run_id: "run-1", event: { type: "input_consumed", input_ids: ["input-1"], kind: "pending", text: "pending text" } })+"\n"));
  expect(consumed.events[0]).toMatchObject({kind:"query",text:"pending text",input_kind:"pending",input_ids:["input-1"],conversation_run_id:JSON.stringify(["session-1","logger-1","run-1"]),sequence:2});
  const assistant = projectRecord("xiaoba", Buffer.from(JSON.stringify({ ...common, event_id: "logger-1:3", seq: 3, run_id: "run-1", event: { type: "assistant_message", text: "检查中", phase: "tool_prelude", model_call: 1 } })+"\n"));
  expect(assistant.events[0]).toMatchObject({kind:"message",text:"检查中",phase:"tool_prelude"});
  const start = projectRecord("xiaoba", Buffer.from(JSON.stringify({ ...common, event_id: "logger-1:4", seq: 4, run_id: "run-1", event: { type: "tool_started", call_id: "call-1", name: "shell", arguments: "{\\\"cmd\\\":\\\"pwd\\\"}" } })+"\n"));
  const finish = projectRecord("xiaoba", Buffer.from(JSON.stringify({ ...common, event_id: "logger-1:5", seq: 5, run_id: "run-1", event: { type: "tool_finished", call_id: "call-1", name: "shell", result: "D:/work", duration_ms: 15 } })+"\n"));
  expect(start.events[0]).toMatchObject({kind:"tool_call",tool_call_id:"call-1",content:{id:"call-1",name:"shell"}});
  expect(finish.events[0]).toMatchObject({kind:"tool_result",tool_call_id:"call-1",content:"D:/work"});
  const observation = projectRecord("xiaoba", Buffer.from(JSON.stringify({ ...common, event_id: "logger-1:6", seq: 6, run_id: "run-1", event: { type: "runtime_observation", source: "memory_branch", text: "已有记忆摘要" } })+"\n"));
  expect(observation.events[0]).toMatchObject({kind:"message",source:"memory_branch",text:"已有记忆摘要"});
  expect(() => projectRecord("xiaoba", Buffer.from(JSON.stringify({ ...common, event_id: "logger-1:7", seq: 7, event: { type: "future_event" } })+"\n"))).toThrow(/unsupported XiaoBa transcript event/);
});
