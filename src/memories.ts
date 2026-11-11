import type { Pool } from "pg";
import { assert } from "./contracts.js";

export function formatMemoryDocument(row: { id: string; markdown: string; episode_id: string }) {
  return {
    memory_id: row.id,
    markdown: row.markdown.trim() + "\n\n## source_refs\n- episode_id: `" + row.episode_id + "`\n",
    source_refs: [row.episode_id],
  };
}

export async function searchMemories(pool: Pool, project: string, req: { keywords: string[]; operator?: "AND" | "OR"; offset?: number; limit?: number }) {
  assert(req && Array.isArray(req.keywords) && req.keywords.length >= 1 && req.keywords.length <= 16 && req.keywords.every(k => typeof k === "string" && k.trim().length > 0 && [...k].length <= 256), "invalid keywords");
  const op = req.operator ?? "AND", limit = req.limit ?? 10, offset = req.offset ?? 0;
  assert(["AND", "OR"].includes(op) && Number.isInteger(limit) && limit >= 1 && limit <= 10 && Number.isSafeInteger(offset) && offset >= 0, "invalid operator/limit/offset");
  const folded = "translate(markdown,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')";
  const condition = op === "AND"
    ? `not exists(select 1 from unnest($2::text[]) k where strpos(${folded},k)=0)`
    : `exists(select 1 from unnest($2::text[]) k where strpos(${folded},k)>0)`;
  // One row per immutable document: all keyword matches are deduplicated BEFORE limit.
  const rows = (await pool.query(`select id memory_id,markdown,episode_id from memory_documents where project_id=$1 and ${condition} order by created_at desc,id offset $3 limit $4`, [project, [...new Set(req.keywords.map(k => k.replace(/[A-Z]/g, c => c.toLowerCase())))], offset, limit + 1])).rows;
  return { items: rows.slice(0, limit).map(r => formatMemoryDocument({ id: r.memory_id, markdown: r.markdown, episode_id: r.episode_id })), next_offset: rows.length > limit ? offset + limit : null };
}
