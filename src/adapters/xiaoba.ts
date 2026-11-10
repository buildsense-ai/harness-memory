import {
  assert,
  type ProjectedRecord,
  type ProjectedEvent,
  textOf,
} from "../contracts.js";
export function projectXiaoba(r: any): ProjectedRecord {
  if (typeof r.role === "string") return projectNative(r);
  const events: ProjectedEvent[] = [];
  const add = (
    kind: ProjectedEvent["kind"],
    pointer: string,
    content: unknown,
    extra = {},
  ) =>
    events.push({
      kind,
      pointer,
      content,
      text: textOf(content),
      order: events.length,
      fidelity: "turn_aggregate",
      ...extra,
    });
  if (
    r.entry_type === "runtime" ||
    r.entry_type === "prompt_trace" ||
    r.entry_type === "subagent_event"
  )
    return { events, timestamp: r.timestamp };
  assert(
    (r.entry_type === "turn" || r.entry_type === undefined) &&
      typeof r.user?.text === "string" &&
      typeof r.assistant?.text === "string" &&
      Array.isArray(r.assistant?.tool_calls),
    "unsupported XiaoBa record",
  );
  add("query", "/user/text", r.user.text);
  add("message", "/assistant/text", r.assistant.text);
  for (const [i, c] of r.assistant.tool_calls.entries()) {
    assert(
      typeof c.id === "string" &&
        typeof c.name === "string" &&
        typeof c.result === "string",
      "invalid XiaoBa tool",
    );
    const fields = ["id", "name", "arguments"].filter((k) => k in c);
    add(
      "tool_call",
      `/assistant/tool_calls/${i}`,
      Object.fromEntries(fields.map((k) => [k, c[k]])),
      { tool_call_id: c.id, fields },
    );
    add("tool_result", `/assistant/tool_calls/${i}/result`, c.result, {
      tool_call_id: c.id,
    });
  }
  return { events, timestamp: r.timestamp };
}

/** Frozen native messages are preserved as uploaded; no aggregate final-only projection. */
function projectNative(r: any): ProjectedRecord {
  const events: ProjectedEvent[] = [];
  const add = (kind: ProjectedEvent["kind"], pointer: string, content: unknown, extra = {}) =>
    events.push({ kind, pointer, content, text: textOf(content), order: events.length, fidelity: "native_recorded", ...extra });
  assert(["user", "assistant", "tool", "system", "developer"].includes(r.role), "unsupported XiaoBa native role");
  if (r.__injected || r.__checkpointSummary || r.__runtimeObservation || ["system", "developer"].includes(r.role))
    return { events, timestamp: r.timestamp };
  if (r.role === "tool") {
    assert(typeof r.tool_call_id === "string" && r.content !== undefined, "invalid native tool result");
    add("tool_result", "/content", r.content, { tool_call_id: r.tool_call_id });
  } else {
    const kind = r.role === "user" ? "query" : "message";
    if (typeof r.content === "string" && r.content.trim()) add(kind, "/content", r.content);
    else if (Array.isArray(r.content)) r.content.forEach((b: any, i: number) => {
      if (b.type === "text") { assert(typeof b.text === "string", "invalid native text"); if (b.text.trim()) add(kind, `/content/${i}/text`, b.text); }
    });
    else assert(r.content == null || typeof r.content === "string", "invalid native content");
    if (r.tool_calls !== undefined) {
      assert(r.role === "assistant" && Array.isArray(r.tool_calls), "invalid native tool calls");
      r.tool_calls.forEach((c: any, i: number) => {
        assert(c.type === "function" && typeof c.id === "string" && typeof c.function?.name === "string" && typeof c.function.arguments === "string", "invalid native tool call");
        add("tool_call", `/tool_calls/${i}`, c, { tool_call_id: c.id });
      });
    }
  }
  return { events, timestamp: r.timestamp };
}
