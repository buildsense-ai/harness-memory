import type { Pool } from "pg";
import { assert } from "./contracts.js";

export function formatMemoryDocument(row: { id: string; markdown: string; episode_id: string }) {
  return {
    memory_id: row.id,
    markdown: row.markdown.trim() + "\n\n## source_refs\n- episode_id: `" + row.episode_id + "`\n",
    source_refs: [row.episode_id],
  };
}

export async function searchMemories(pool: Pool, project: string, req: { keywords: string[]; operator?: "AND" | "OR"; offset?: number; limit?: number; upload_key_id?: string; date_from?: string; date_to?: string }) {
  assert(req && Array.isArray(req.keywords) && req.keywords.length >= 1 && req.keywords.length <= 16 && req.keywords.every(k => typeof k === "string" && k.trim().length > 0 && [...k].length <= 256), "invalid keywords");
  const op = req.operator ?? "AND", limit = req.limit ?? 10, offset = req.offset ?? 0;
  assert(req.upload_key_id === undefined || (typeof req.upload_key_id === "string" && req.upload_key_id.length <= 256), "invalid upload_key_id");
  const validDate = (value: string | undefined) => {
    if (value === undefined) return true;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const parsed = Date.parse(`${value}T00:00:00Z`);
    return Number.isFinite(parsed) && new Date(parsed).toISOString().slice(0, 10) === value;
  };
  assert(validDate(req.date_from) && validDate(req.date_to), "invalid processing date");
  assert(!req.date_from || !req.date_to || req.date_from <= req.date_to, "date_from must be on or before date_to");
  assert(["AND", "OR"].includes(op) && Number.isInteger(limit) && limit >= 1 && limit <= 10 && Number.isSafeInteger(offset) && offset >= 0, "invalid operator/limit/offset");
  const folded = "translate(markdown,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')";
  const condition = op === "AND"
    ? `not exists(select 1 from unnest($2::text[]) k where strpos(${folded},k)=0)`
    : `exists(select 1 from unnest($2::text[]) k where strpos(${folded},k)>0)`;
  // One row per immutable document: all keyword matches are deduplicated BEFORE limit.
  const rows = (await pool.query(`select d.id memory_id,d.markdown,d.episode_id from memory_documents d
    join extraction_runs x on x.project_id=d.project_id and x.id=d.run_id
    where d.project_id=$1 and ${condition}
      and ($5::text is null or exists(select 1 from episode_events ee join events e on e.project_id=ee.project_id and e.id=ee.event_id
        join raw_records r on r.project_id=e.project_id and r.id=e.raw_id where ee.project_id=d.project_id and ee.episode_id=d.episode_id
        and coalesce(r.upload_key_id,'__unattributed__')=$5))
      and ($6::date is null or x.created_at >= $6::date)
      and ($7::date is null or x.created_at < ($7::date + interval '1 day'))
    order by d.created_at desc,d.id offset $3 limit $4`, [project, [...new Set(req.keywords.map(k => k.replace(/[A-Z]/g, c => c.toLowerCase())))], offset, limit + 1, req.upload_key_id ?? null, req.date_from ?? null, req.date_to ?? null])).rows;
  return { items: rows.slice(0, limit).map(r => formatMemoryDocument({ id: r.memory_id, markdown: r.markdown, episode_id: r.episode_id })), next_offset: rows.length > limit ? offset + limit : null };
}
