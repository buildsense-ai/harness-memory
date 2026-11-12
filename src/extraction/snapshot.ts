import type { Pool } from "pg";
import { assert, type StoredEvent } from "../contracts.js";
import { selectPiPath } from "../adapters/index.js";
import { eventSelect, eventFromRow } from "../read.js";
export interface ExtractionRequest {
  source_id: string;
  stream_id: string;
  start_offset?: number;
  end_offset?: number;
  leaf_id?: string;
}
export async function snapshotEvents(
  pool: Pool,
  p: string,
  req: ExtractionRequest,
): Promise<StoredEvent[]> {
  assert(
    req &&
      typeof req.source_id === "string" &&
      typeof req.stream_id === "string",
    "source_id/stream_id required",
  );
  const s = (
    await pool.query(
      "select * from streams where project_id=$1 and source_id=$2 and stream_id=$3",
      [p, req.source_id, req.stream_id],
    )
  ).rows[0];
  assert(s, "unknown stream", 404);
  const start = req.start_offset ?? 0,
    end = req.end_offset ?? Number(s.next_offset);
  assert(
    Number.isSafeInteger(start) &&
      Number.isSafeInteger(end) &&
      start >= 0 &&
      end > start &&
      end <= Number(s.next_offset),
    "invalid snapshot range",
  );
  const records = (
    await pool.query(
      "select id,offset_bytes,metadata from raw_records where project_id=$1 and source_id=$2 and stream_id=$3 and offset_bytes<$4 order by offset_bytes",
      [p, req.source_id, req.stream_id, Number(s.next_offset)],
    )
  ).rows.map((r) => ({ ...r, ...r.metadata }));
  const boundaries = new Set([
    0,
    Number(s.next_offset),
    ...records.map((r) => Number(r.offset_bytes)),
  ]);
  assert(
    boundaries.has(start) && boundaries.has(end),
    "range must use record boundaries",
  );
  const transcriptRuns = new Set(
    records
      .filter((r) => r.record_type === "transcript" && typeof r.run_id === "string")
      .map((r) => JSON.stringify([r.session_id, r.run_id])),
  );
  const inRange = records.filter((r) => Number(r.offset_bytes) >= start && Number(r.offset_bytes) < end);
  const selectedConversationRuns = new Set(
    inRange
      .filter((r) => r.record_type === "transcript" && typeof r.conversation_run_id === "string")
      .map((r) => r.conversation_run_id),
  );
  const completedConversationRuns = new Set(
    records
      .filter((r) => r.record_type === "transcript" && r.transcript_event_type === "run_finished")
      .map((r) => r.conversation_run_id)
      .filter((id): id is string => typeof id === "string"),
  );
  const closedRunsToProcess = new Set(
    [...selectedConversationRuns].filter((id) => completedConversationRuns.has(id)),
  );
  const path =
    s.harness === "pi" ? selectPiPath(records, req.leaf_id) : records;
  const rawIds = path
    .filter(
      (r) =>
        (r.record_type === "transcript" && typeof r.conversation_run_id === "string"
          ? closedRunsToProcess.has(r.conversation_run_id)
          : Number(r.offset_bytes) >= start && Number(r.offset_bytes) < end) &&
        !(r.record_type === "turn" && typeof r.run_id === "string" &&
          transcriptRuns.has(JSON.stringify([r.session_id, r.run_id]))),
    )
    .map((r) => r.id);
  const rows = await pool.query(
    eventSelect +
      " where e.project_id=$1 and r.id=any($2::text[]) order by r.offset_bytes,e.ordinal",
    [p, rawIds],
  );
  const events = rows.rows.map(eventFromRow);
  return events;
}
