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
