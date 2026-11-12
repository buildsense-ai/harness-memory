import type { Pool } from "pg";
import { assert, type StoredEvent } from "./contracts.js";
export function eventFromRow(r: any): StoredEvent {
  return {
    ref: r.id,
    raw_ref: r.raw_id,
    offset: Number(r.offset_bytes),
    ...r.metadata,
    kind: r.kind,
    pointer: r.pointer,
    content: JSON.parse(r.content_json),
    text: r.search_text,
    order: r.ordinal,
    native_id: r.raw_metadata?.native_id,
    parent_id: r.raw_metadata?.parent_id,
    timestamp: r.raw_metadata?.timestamp,
    origin: r.raw_metadata?.origin,
    format_version: r.raw_metadata?.format_version,
  };
}
export const eventSelect =
  "select e.*,r.offset_bytes,r.metadata raw_metadata from events e join raw_records r on r.id=e.raw_id and r.project_id=e.project_id";
export async function readRaw(pool: Pool, p: string, id: string) {
  const r = (
    await pool.query(
      "select raw,hash,metadata from raw_records where project_id=$1 and id=$2",
      [p, id],
    )
  ).rows[0];
  assert(r, "unknown reference", 404);
  return { bytes: r.raw as Buffer, sha256: r.hash as string, origin: r.metadata?.origin };
}
export async function readReference(
  pool: Pool,
  p: string,
  req: { ref: string; offset?: number; limit?: number },
): Promise<any> {
  assert(req && typeof req.ref === "string", "ref required");
  const offset = req.offset ?? 0,
    limit = req.limit ?? 20;
  assert(
    Number.isSafeInteger(offset) &&
      offset >= 0 &&
      Number.isInteger(limit) &&
      limit >= 1 &&
      limit <= 50,
    "invalid offset/limit",
  );
  if (req.ref.startsWith("evt_")) {
    const r = (
      await pool.query(eventSelect + " where e.project_id=$1 and e.id=$2", [
        p,
        req.ref,
      ])
    ).rows[0];
    assert(r, "unknown reference", 404);
    return { ref: req.ref, event: eventFromRow(r) };
  }
  const ep = (
    await pool.query("select * from episodes where project_id=$1 and id=$2", [
      p,
      req.ref,
    ])
  ).rows[0];
  assert(ep, "unknown reference", 404);
  const total = Number(
    (
      await pool.query(
        "select count(*) n from episode_events where project_id=$1 and episode_id=$2",
        [p, req.ref],
      )
    ).rows[0].n,
  );
  const rows = await pool.query(
    eventSelect +
      " join episode_events m on m.project_id=e.project_id and m.event_id=e.id where m.project_id=$1 and m.episode_id=$2 order by m.ordinal offset $3 limit $4",
    [p, req.ref, offset, limit],
  );
  return {
    ref: req.ref,
    goal: ep.goal,
    thread_id: ep.thread_id,
    task_thread: ep.task_thread,
    evidence_coverage: ep.evidence_coverage,
    missing_pair_refs: ep.missing_pair_refs,
    chunk_id: ep.chunk_id,
    total_events: total,
    events: rows.rows.map(eventFromRow),
    next_offset:
      offset + rows.rows.length < total ? offset + rows.rows.length : null,
  };
}
