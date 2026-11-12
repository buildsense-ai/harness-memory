import {
  assert,
  type ProjectedRecord,
  type ProjectedEvent,
  textOf,
} from "../contracts.js";
export function projectXiaoba(r: any): ProjectedRecord {
  if (r.entry_type === "transcript") return projectTranscript(r);
  if (typeof r.role === "string") return projectNative(r);
  if (r.entry_type === "turn" && Array.isArray(r.messages))
    return projectOrderedTurn(r);
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
    return { events, timestamp: r.timestamp, record_type: r.entry_type, session_id: r.session_id };
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
  return { events, timestamp: r.timestamp, record_type: "turn", session_id: r.session_id, run_id: r.run_id };
}

function projectTranscript(r: any): ProjectedRecord {
  assert(r.schema_version === 1, "unsupported XiaoBa transcript schema");
  assert(typeof r.event_id === "string" && typeof r.stream_id === "string", "invalid XiaoBa transcript identity");
  assert(Number.isSafeInteger(r.seq) && r.seq > 0, "invalid XiaoBa transcript sequence");
  assert(typeof r.session_id === "string" && typeof r.timestamp === "string", "invalid XiaoBa transcript session");
  assert(r.event && typeof r.event === "object" && !Array.isArray(r.event), "invalid XiaoBa transcript event");
  const event = r.event;
  const runId = typeof r.run_id === "string" ? r.run_id : undefined;
  const conversationRunId = runId ? JSON.stringify([r.session_id, r.stream_id, runId]) : undefined;
  const record: ProjectedRecord = {
    events: [],
    timestamp: r.timestamp,
    format_version: "xiaoba-transcript-v1",
    record_type: "transcript",
    transcript_event_type: event.type,
    transcript_event_id: r.event_id,
    transcript_stream_id: r.stream_id,
    transcript_sequence: r.seq,
    session_id: r.session_id,
    run_id: runId,
    conversation_run_id: conversationRunId,
  };
  const add = (kind: ProjectedEvent["kind"], pointer: string, content: unknown, extra: Partial<ProjectedEvent> = {}) => {
    record.events.push({
      kind,
      pointer,
      content,
      text: textOf(content),
      order: record.events.length,
      fidelity: "transcript_event",
      ...(conversationRunId ? { conversation_run_id: conversationRunId } : {}),
      sequence: r.seq,
      ...extra,
    });
  };
  switch (event.type) {
    case "input_received":
      assert(typeof event.input_id === "string" && typeof event.text === "string", "invalid XiaoBa input receipt");
      break;
    case "run_started":
    case "run_finished":
      break;
    case "input_consumed":
      assert(Array.isArray(event.input_ids) && event.input_ids.every((id: unknown) => typeof id === "string"), "invalid XiaoBa consumed input ids");
      assert(typeof event.text === "string", "invalid XiaoBa consumed input text");
      if (event.kind === "runtime_observation") {
        add("message", "/event/text", event.text, { source: event.source || "runtime_observation" });
      } else {
        assert(event.kind === "root" || event.kind === "pending", "invalid XiaoBa input kind");
        add("query", "/event/text", event.text, { input_kind: event.kind, input_ids: event.input_ids });
      }
      break;
    case "runtime_observation":
      assert(typeof event.source === "string" && typeof event.text === "string", "invalid XiaoBa runtime observation");
      add("message", "/event/text", event.text, { source: event.source });
      break;
    case "assistant_message":
      assert(typeof event.text === "string" && typeof event.phase === "string" && Number.isSafeInteger(event.model_call), "invalid XiaoBa assistant message");
      add("message", "/event/text", event.text, { phase: event.phase });
      break;
    case "tool_started":
      assert(typeof event.call_id === "string" && typeof event.name === "string" && typeof event.arguments === "string", "invalid XiaoBa tool start");
      add("tool_call", "/event", { id: event.call_id, name: event.name, arguments: event.arguments }, { tool_call_id: event.call_id });
      break;
    case "tool_finished":
      assert(typeof event.call_id === "string" && typeof event.name === "string" && typeof event.result === "string", "invalid XiaoBa tool result");
      add("tool_result", "/event/result", event.result, { tool_call_id: event.call_id });
      break;
    case "model_failed":
      assert(Number.isSafeInteger(event.model_call) && typeof event.error_name === "string", "invalid XiaoBa model failure");
      add("message", "/event", { model_call: event.model_call, error_name: event.error_name }, { source: "model_failure" });
      break;
    case "input_deferred":
      assert(Array.isArray(event.input_ids) && typeof event.reason === "string", "invalid XiaoBa deferred input");
      break;
    default:
      assert(false, "unsupported XiaoBa transcript event");
  }
  return record;
}

function projectOrderedTurn(r: any): ProjectedRecord {
  const events: ProjectedEvent[] = [];
  r.messages.forEach((message: any, messageIndex: number) => {
    assert(message && typeof message === "object" && !Array.isArray(message), "invalid XiaoBa turn message");
    for (const event of projectNative(message).events)
      events.push({ ...event, pointer: `/messages/${messageIndex}${event.pointer}`, order: events.length, fidelity: "turn_messages" });
  });

  return { events, timestamp: r.timestamp, format_version: "xiaoba-turn-messages-v1", record_type: "turn", session_id: r.session_id, run_id: r.run_id };
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
