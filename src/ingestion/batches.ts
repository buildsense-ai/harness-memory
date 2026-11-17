import type { PoolClient } from 'pg';
import type { StoredEvent } from '../contracts.js';
import { eventFromRow, eventSelect } from '../read.js';
import { MemoryRunner } from '../extraction/memory-runner.js';
import { hardInput, logicalDay, pack, type RequestBudget } from '../extraction/budget.js';
import type { ChatModel } from '../extraction/model.js';
import type { SessionScope } from './episodes.js';
interface EpisodeRow { episode_key: string; raw_ids: string[]; logical_day: string; started_at: string | null }

/** Count outside a transaction; publish each finished batch atomically. */
export async function planBatches(c: PoolClient, s: SessionScope, runner: MemoryRunner, model: ChatModel, budget: RequestBudget, now: number, idleMs: number) {
  const incomplete = (await c.query<{ path: string }>(`select distinct f->>'path' path from ingestion_manifests m cross join jsonb_array_elements(m.files) f
    where m.project_id=$1 and m.source_id=$2 and m.session_key=$3 and m.lane=$4 and m.status='waiting' and not exists(
      select 1 from streams st where st.project_id=m.project_id and st.source_id=m.source_id and st.stream_id=f->>'stream_id' and st.next_offset >= (f->>'end_offset')::bigint)`, [s.project_id, s.source_id, s.session_key,s.lane])).rows;
  const watermarks = new Map<string, string>();
  for (const file of incomplete) {
    const last = (await c.query<{ timestamp: string }>("select metadata->>'timestamp' timestamp from raw_records where project_id=$1 and source_id=$2 and metadata->'origin'->>'path'=$3 order by (metadata->'origin'->>'offset')::bigint desc limit 1", [s.project_id, s.source_id, file.path])).rows[0];
    watermarks.set(file.path, logicalDay(last?.timestamp));
  }
  const episodes = (await c.query<EpisodeRow>("select episode_key,raw_ids,logical_day,started_at from ingestion_episodes where project_id=$1 and source_id=$2 and session_key=$3 and lane=$4 and status='ready' and ended_at<=$5 order by logical_day,started_at,episode_key", [s.project_id, s.source_id, s.session_key, s.lane, new Date(now - idleMs)])).rows;
  const units: { ep: EpisodeRow; events: StoredEvent[]; refs: string[]; cost: number }[] = [];
  for (const ep of episodes) {
    // A blocked file holds only its unfinished logical-day tail. Other complete
    // files and earlier closed days continue; later arrivals form supplemental batches.
    const origins = (await c.query<{ path: string }>("select distinct metadata->'origin'->>'path' path from raw_records where project_id=$1 and id=any($2::text[])", [s.project_id, ep.raw_ids])).rows;
    if (origins.some(({ path }) => watermarks.has(path) && (ep.logical_day === 'unknown_date' || watermarks.get(path) === 'unknown_date' || watermarks.get(path)! <= ep.logical_day))) continue;
    const refs = (await c.query<{ id: string }>('select id from events where project_id=$1 and raw_id=any($2::text[]) order by array_position($2::text[],raw_id),ordinal', [s.project_id, ep.raw_ids])).rows.map(r => r.id);
    const rows = (await c.query(eventSelect + " where e.project_id=$1 and e.raw_id=any($2::text[]) and e.kind in ('query','message') order by array_position($2::text[],e.raw_id),e.ordinal", [s.project_id, ep.raw_ids])).rows;
    const dialogue = rows.map(eventFromRow);
    const cost = model.inputTokens?.('stage1', dialogue) ?? budget.count(JSON.stringify(dialogue)) + 8192;
    if (cost > hardInput(budget)) {
      await c.query("update ingestion_episodes set status='deferred_oversize',error='deferred_oversize:stage1' where project_id=$1 and source_id=$2 and episode_key=$3", [s.project_id, s.source_id, ep.episode_key]); continue;
    }
    if (!dialogue.some(e => e.kind === 'query')) {
      await c.query("update ingestion_episodes set status='no_query',error='no recorded query' where project_id=$1 and source_id=$2 and episode_key=$3", [s.project_id, s.source_id, ep.episode_key]); continue;
    }
    units.push({ ep, events: dialogue, refs, cost });
  }
  const days = new Map<string, typeof units>();
  for (const u of units) { const items = days.get(u.ep.logical_day) ?? []; items.push(u); days.set(u.ep.logical_day, items); }
  const ranges = [...days.values()];
  for (let i = 0; i < ranges.length; i++) {
    let range = ranges[i]; const next = ranges[i + 1];
    const cost = (u: typeof units) => model.inputTokens?.('stage1', u.flatMap(x => x.events)) ?? u.reduce((n, x) => n + x.cost, 0);
    if (next && range[0].ep.logical_day !== 'unknown_date' && Date.parse(next[0].ep.logical_day) - Date.parse(range[0].ep.logical_day) === 86400000 && cost([...range, ...next]) <= 100000) { range = [...range, ...next]; i++; }
    for (const batch of pack(range, cost, Math.min(budget.stage1, hardInput(budget)), 50000)) {
      await c.query('begin');
      try {
        const refs = batch.flatMap(u => u.refs);
        const result = await runner.enqueueEvents(s.project_id, refs, { source_id: s.source_id, session_key: s.session_key, episode_keys: batch.map(u => u.ep.episode_key), token_method: budget.method }, { lane: s.lane, source: s.source_id, session: s.session_key }, c);
        await c.query("update ingestion_episodes set status='queued',run_id=$4 where project_id=$1 and source_id=$2 and episode_key=any($3::text[])", [s.project_id, s.source_id, batch.map(u => u.ep.episode_key), result.run_id]);
        await c.query('commit');
      } catch (error) {
        await c.query('rollback');
        throw error;
      }
    }
  }
}
