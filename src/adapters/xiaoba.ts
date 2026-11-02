import {
  assert,
  type ProjectedRecord,
  type ProjectedEvent,
  textOf,
} from "../contracts.js";
export function projectXiaoba(r: any): ProjectedRecord {
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
