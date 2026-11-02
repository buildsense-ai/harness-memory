import type { Pool } from "pg";
import { assert } from "./contracts.js";
const fold = (s: string) => s.replace(/[A-Z]/g, (c) => c.toLowerCase());
export async function searchEpisodes(
  pool: Pool,
  p: string,
  req: { keywords: string[]; operator?: "AND" | "OR"; limit?: number },
) {
  assert(
    req &&
      Array.isArray(req.keywords) &&
      req.keywords.length > 0 &&
      req.keywords.length <= 16 &&
      req.keywords.every(
        (k) =>
          typeof k === "string" && k.trim().length > 0 && [...k].length <= 256,
      ),
    "invalid keywords",
  );
  const op = req.operator ?? "AND",
    limit = req.limit ?? 10;
  assert(
    ["AND", "OR"].includes(op) &&
      Number.isInteger(limit) &&
      limit >= 1 &&
      limit <= 50,
    "invalid operator/limit",
  );
  const folded =
    "translate(e.search_text,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')";
  const condition =
    op === "AND"
      ? `not exists(select 1 from unnest($2::text[]) k where strpos(${folded},k)=0)`
      : `exists(select 1 from unnest($2::text[]) k where strpos(${folded},k)>0)`;
  const sql = `with hits as (select ep.id episode_ref,ep.goal,e.id event_ref,r.metadata->>'timestamp' ts,substring(e.search_text from greatest(1,(select min(nullif(strpos(${folded},k),0)) from unnest($2::text[]) k)-100) for 400) snippet,row_number() over(partition by ep.id order by r.metadata->>'timestamp' desc nulls last,e.id) rn from episodes ep join extraction_runs run on run.id=ep.run_id and run.project_id=ep.project_id join episode_events m on m.episode_id=ep.id and m.project_id=ep.project_id join events e on e.id=m.event_id and e.project_id=m.project_id join raw_records r on r.id=e.raw_id and r.project_id=e.project_id where ep.project_id=$1 and run.status='completed' and ${condition}) select episode_ref,goal,jsonb_agg(jsonb_build_object('event_ref',event_ref,'snippet',snippet) order by rn) matches from hits where rn<=3 group by episode_ref,goal order by max(ts) desc nulls last,episode_ref limit $3`;
  return (
    await pool.query(sql, [p, [...new Set(req.keywords.map(fold))], limit])
  ).rows;
}
