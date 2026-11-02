import {
  assert,
  type ProjectedRecord,
  type ProjectedEvent,
  textOf,
} from "../contracts.js";
export function projectPi(r: any): ProjectedRecord {
  assert(typeof r.type === "string", "unsupported Pi record");
  const events: ProjectedEvent[] = [];
  const meta = {
    native_id: r.id,
    parent_id: r.parentId ?? null,
    timestamp: r.timestamp,
  };
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
      fidelity: "recorded",
      ...extra,
    });
  if (r.type === "session") return { events };
  assert(typeof r.id === "string", "Pi entry missing id");
  if (r.type !== "message" && r.type !== "custom_message")
    return { ...meta, events };
  const m =
    r.type === "custom_message"
      ? { role: "custom", content: r.content }
      : r.message;
  assert(m && typeof m.role === "string", "invalid Pi message");
  if (m.role === "system") return { ...meta, events };
  const p = r.type === "custom_message" ? "/content" : "/message/content";
  if (m.role === "toolResult") {
    add("tool_result", p, m.content, { tool_call_id: m.toolCallId });
  } else if (typeof m.content === "string") {
    add(m.role === "user" ? "query" : "message", p, m.content);
  } else {
    assert(Array.isArray(m.content), "unsupported Pi content");
    for (const [i, b] of m.content.entries()) {
      if (b.type === "text")
        add(m.role === "user" ? "query" : "message", `${p}/${i}/text`, b.text);
      else if (b.type === "toolCall")
        add("tool_call", `${p}/${i}`, b, { tool_call_id: b.id });
    }
  }
  return { ...meta, events };
}
export function selectPiPath<
  T extends { native_id?: string; parent_id?: string | null },
>(records: T[], leafId?: string): T[] {
  const map = new Map<string, T>();
  for (const r of records)
    if (r.native_id) {
      assert(!map.has(r.native_id), "duplicate Pi id");
      map.set(r.native_id, r);
    }
  const parents = new Set(records.map((r) => r.parent_id).filter(Boolean));
  const leaves = [...map.keys()].filter((id) => !parents.has(id));
  if (!leafId) {
    assert(leaves.length === 1, "specify leaf_id for Pi branches");
    leafId = leaves[0];
  }
  assert(map.has(leafId), "unknown Pi leaf");
  const path: T[] = [];
  const seen = new Set<string>();
  while (leafId) {
    assert(!seen.has(leafId), "cyclic Pi history");
    seen.add(leafId);
    const r = map.get(leafId);
    assert(r, "missing Pi parent");
    path.push(r);
    leafId = r.parent_id ?? undefined;
  }
  return path.reverse();
}
