import type { Pool } from 'pg';
import { assert, type StoredEvent } from './contracts.js';
import { eventFromRow, eventSelect } from './read.js';
import { MemoryRunner } from './extraction/memory-runner.js';
import { configuredBudget, hardInput, logicalDay, pack, type RequestBudget } from './extraction/budget.js';
import type { ChatModel } from './extraction/model.js';
import { isObject } from './extraction/output.js';
import { isDeepStrictEqual } from 'node:util';

interface ManifestFile { stream_id: string; end_offset: number; path: string }
interface Manifest { source_id: string; manifest_id: string; session_key: string; lane: 'backfill' | 'incremental'; files: ManifestFile[] }
function parseManifest(value: unknown): Manifest {
  assert(isObject(value), 'invalid manifest');
  assert(typeof value.source_id === 'string' && value.source_id.length > 0 && value.source_id.length <= 256, 'invalid source_id');
  assert(typeof value.manifest_id === 'string' && value.manifest_id.length > 0 && value.manifest_id.length <= 256, 'invalid manifest_id');
  assert(typeof value.session_key === 'string' && /^[^/\\]+\/[^/\\]+\.jsonl$/.test(value.session_key), 'invalid session_key');
  assert(value.lane === 'backfill' || value.lane === 'incremental', 'invalid lane');
  assert(Array.isArray(value.files) && value.files.length > 0 && value.files.length <= 10000, 'invalid manifest files');
  const files = value.files.map((file: unknown) => {
    assert(isObject(file) && typeof file.stream_id === 'string' && file.stream_id.length > 0 && file.stream_id.length <= 256 && Number.isSafeInteger(file.end_offset) && file.end_offset > 0, 'invalid manifest file');
    assert(typeof file.path === 'string' && /^sessions\/[^/\\]+\/\d{4}-\d{2}-\d{2}\/[^/\\]+\.jsonl$/.test(file.path), 'invalid manifest path');
    assert(file.path.split('/')[1] + '/' + file.path.split('/')[3] === value.session_key, 'manifest crosses sessions');
    return { stream_id: file.stream_id, end_offset: Number(file.end_offset), path: file.path };
  });
  assert(new Set(files.map(f => f.stream_id)).size === files.length, 'duplicate manifest stream');
  return { source_id: value.source_id, manifest_id: value.manifest_id, session_key: value.session_key, lane: value.lane, files };
}
export async function registerManifest(pool: Pool, p: string, value: unknown) {
  const m = parseManifest(value);
  const result = await pool.query<{ session_key: string; lane: string; files: ManifestFile[] }>(
    'insert into ingestion_manifests(project_id,source_id,manifest_id,session_key,lane,files) values($1,$2,$3,$4,$5,$6) on conflict(project_id,source_id,manifest_id) do update set manifest_id=excluded.manifest_id returning session_key,lane,files',
    [p, m.source_id, m.manifest_id, m.session_key, m.lane, JSON.stringify(m.files)]);
  const stored = result.rows[0];
  assert(stored.session_key === m.session_key && stored.lane === m.lane && isDeepStrictEqual(stored.files, m.files), 'manifest identity conflict', 409);
  return { manifest_id: m.manifest_id, status: 'accepted' };
}
interface RawRow {
  id: string; stream_id: string; offset_bytes: string;
  metadata: { record_type?: string; session_id?: string; run_id?: string; timestamp?: string; transcript_event_type?: string; transcript_event_id?: string; transcript_stream_id?: string; transcript_sequence?: number; conversation_run_id?: string; origin?: { path: string; offset: number } };
}
interface EpisodeRow { episode_key: string; raw_ids: string[]; logical_day: string; started_at: string | null }

export class IngestionPlanner {
  private timer?: ReturnType<typeof setInterval>;
  private active?: Promise<void>;
  private stopped = false;
  private sourceCursor = ['', '', '', ''];
  constructor(private pool: Pool, private runner: MemoryRunner, private model?: ChatModel, private budget: RequestBudget = configuredBudget(), private idleMs = 600000) {}
  start() { this.timer = setInterval(() => this.kick(), 2000); this.timer.unref(); this.kick(); }
  private kick() {
    if (this.active || this.stopped || !this.model?.memory) return;
    this.active = this.plan().catch(error => console.error('Ingestion planning failed', error instanceof Error ? error.message : 'unknown')).finally(() => { this.active = undefined; });
  }
  async close() { this.stopped = true; if (this.timer) clearInterval(this.timer); await this.active; }
  async plan(now = Date.now()) {
    const c = await this.pool.connect();
    try {
      await c.query('begin');
      if (!(await c.query('select pg_try_advisory_xact_lock(846018) locked')).rows[0].locked) { await c.query('rollback'); return; }
      const pending = (await c.query<Manifest & { project_id: string }>(`select m.* from ingestion_manifests m where m.status='waiting' and (m.indexed_offsets is null or exists(
        select 1 from jsonb_array_elements(m.files) f left join streams s on s.project_id=m.project_id and s.source_id=m.source_id and s.stream_id=f->>'stream_id'
        where least(coalesce(s.next_offset,0),(f->>'end_offset')::bigint) <> coalesce((m.indexed_offsets->>(f->>'stream_id'))::bigint,0)
      )) order by m.created_at,m.manifest_id limit 100`)).rows;
      for (const manifest of pending) {
        const streams = (await c.query<{ stream_id: string; next_offset: string }>('select stream_id,next_offset from streams where project_id=$1 and source_id=$2 and stream_id=any($3::text[])', [manifest.project_id, manifest.source_id, manifest.files.map(f => f.stream_id)])).rows;
        const complete = manifest.files.every(f => streams.some(s => s.stream_id === f.stream_id && Number(s.next_offset) >= f.end_offset));
        const [type, filename] = manifest.session_key.split('/');
        const records = (await c.query<RawRow>("select id,stream_id,offset_bytes,metadata from raw_records where project_id=$1 and source_id=$2 and split_part(metadata->'origin'->>'path','/',2)=$3 and split_part(metadata->'origin'->>'path','/',4)=$4 order by metadata->'origin'->>'path',(metadata->'origin'->>'offset')::bigint", [manifest.project_id, manifest.source_id, type, filename])).rows;
        const groups = new Map<string, RawRow[]>(), transcript = new Set<string>();
        const seenEvents = new Map<string, RawRow>();
        for (const r of records) {
          const m = r.metadata;
          if (m.record_type === 'transcript' && m.run_id) transcript.add(JSON.stringify([m.session_id, m.run_id]));
          if (m.record_type !== 'transcript' || !m.conversation_run_id) continue;
          const identity = JSON.stringify([m.transcript_stream_id, m.transcript_event_id]);
          if (seenEvents.has(identity)) continue;
          seenEvents.set(identity, r);
          const group = groups.get(m.conversation_run_id) ?? []; group.push(r); groups.set(m.conversation_run_id, group);
        }
        for (const r of records) {
          const m = r.metadata;
          if (m.record_type === 'turn' && !(m.run_id && transcript.has(JSON.stringify([m.session_id, m.run_id])))) groups.set('legacy:' + r.id, [r]);
        }
        for (const [key, group] of groups) {
          group.sort((a, b) => (a.metadata.transcript_sequence ?? 0) - (b.metadata.transcript_sequence ?? 0));
          const first = group.find(r => r.metadata.transcript_event_type === 'run_started');
          const last = [...group].reverse().find(r => r.metadata.transcript_event_type === 'run_finished');
          const legacy = key.startsWith('legacy:');
          const start = (first ?? group[0]).metadata.timestamp;
          const finish = (last ?? (legacy ? group[0] : undefined))?.metadata.timestamp;
          let error: string | null = !legacy && (!first || !last) ? 'awaiting_run_boundaries' : null;
          if (!legacy && first && last) {
            const range = records.filter(r => r.metadata.transcript_stream_id === first.metadata.transcript_stream_id && (r.metadata.transcript_sequence ?? 0) >= first.metadata.transcript_sequence! && (r.metadata.transcript_sequence ?? 0) <= last.metadata.transcript_sequence!);
            const seq = new Set(range.map(r => r.metadata.transcript_sequence));
            if (seq.size !== last.metadata.transcript_sequence! - first.metadata.transcript_sequence! + 1) error = 'awaiting_sequence_gap';
          }
          // Unknown legacy dates are visible and processable; unfinished transcripts never use this fallback.
          const ended = finish && Number.isFinite(Date.parse(finish)) ? finish : legacy ? new Date(0).toISOString() : null;
          const status = error ? 'awaiting_material' : 'ready';
          await c.query("insert into ingestion_episodes(project_id,source_id,episode_key,session_key,lane,logical_day,started_at,ended_at,raw_ids,status,error) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) on conflict(project_id,source_id,episode_key) do update set raw_ids=excluded.raw_ids,ended_at=excluded.ended_at,status=excluded.status,error=excluded.error where ingestion_episodes.run_id is null and ingestion_episodes.status<>'deferred_oversize'", [manifest.project_id, manifest.source_id, key, manifest.session_key, manifest.lane, logicalDay(start), start, ended, JSON.stringify(group.map(r => r.id)), status, error]);
        }
        const offsets = Object.fromEntries(manifest.files.map(f => [f.stream_id, Math.min(f.end_offset, Number(streams.find(s => s.stream_id === f.stream_id)?.next_offset ?? 0))]));
        await c.query("update ingestion_manifests set status=$4,indexed_offsets=$5 where project_id=$1 and source_id=$2 and manifest_id=$3", [manifest.project_id, manifest.source_id, manifest.manifest_id, complete ? 'indexed' : 'waiting', JSON.stringify(offsets)]);
      }
      if (this.model?.memory) {
        const sources = (await c.query<{ project_id: string; source_id: string; session_key: string; lane: string }>(`with candidates as (select distinct project_id,source_id,session_key,lane from ingestion_episodes where status='ready' and ended_at<=$1)
          select * from candidates order by (project_id,source_id,session_key,lane)<=($2,$3,$4,$5),project_id,source_id,session_key,lane limit 100`, [new Date(now - this.idleMs),...this.sourceCursor])).rows;
        for (const s of sources) {
          this.sourceCursor = [s.project_id,s.source_id,s.session_key,s.lane];
          const incomplete = (await c.query<{ path: string }>(`select distinct f->>'path' path from ingestion_manifests m cross join jsonb_array_elements(m.files) f
            where m.project_id=$1 and m.source_id=$2 and m.session_key=$3 and m.lane=$4 and m.status='waiting' and not exists(
              select 1 from streams st where st.project_id=m.project_id and st.source_id=m.source_id and st.stream_id=f->>'stream_id' and st.next_offset >= (f->>'end_offset')::bigint)`, [s.project_id, s.source_id, s.session_key,s.lane])).rows;
          const watermarks = new Map<string, string>();
          for (const file of incomplete) {
            const last = (await c.query<{ timestamp: string }>("select metadata->>'timestamp' timestamp from raw_records where project_id=$1 and source_id=$2 and metadata->'origin'->>'path'=$3 order by (metadata->'origin'->>'offset')::bigint desc limit 1", [s.project_id, s.source_id, file.path])).rows[0];
            watermarks.set(file.path, logicalDay(last?.timestamp));
          }
          const episodes = (await c.query<EpisodeRow>("select episode_key,raw_ids,logical_day,started_at from ingestion_episodes where project_id=$1 and source_id=$2 and session_key=$3 and lane=$4 and status='ready' and ended_at<=$5 order by logical_day,started_at,episode_key", [s.project_id, s.source_id, s.session_key, s.lane, new Date(now - this.idleMs)])).rows;
          const units: { ep: EpisodeRow; events: StoredEvent[]; refs: string[]; cost: number }[] = [];
          for (const ep of episodes) {
            // A blocked file holds only its unfinished logical-day tail. Other complete
            // files and earlier closed days continue; later arrivals form supplemental batches.
            const origins = (await c.query<{ path: string }>("select distinct metadata->'origin'->>'path' path from raw_records where project_id=$1 and id=any($2::text[])", [s.project_id, ep.raw_ids])).rows;
            if (origins.some(({ path }) => watermarks.has(path) && (ep.logical_day === 'unknown_date' || watermarks.get(path) === 'unknown_date' || watermarks.get(path)! <= ep.logical_day))) continue;
            const refs = (await c.query<{ id: string }>('select id from events where project_id=$1 and raw_id=any($2::text[]) order by array_position($2::text[],raw_id),ordinal', [s.project_id, ep.raw_ids])).rows.map(r => r.id);
            const rows = (await c.query(eventSelect + " where e.project_id=$1 and e.raw_id=any($2::text[]) and e.kind in ('query','message') order by array_position($2::text[],e.raw_id),e.ordinal", [s.project_id, ep.raw_ids])).rows;
            const dialogue = rows.map(eventFromRow);
            const cost = this.model.inputTokens?.('stage1', dialogue) ?? this.budget.count(JSON.stringify(dialogue)) + 8192;
            if (cost > hardInput(this.budget)) {
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
            const cost = (u: typeof units) => this.model!.inputTokens?.('stage1', u.flatMap(x => x.events)) ?? u.reduce((n, x) => n + x.cost, 0);
            if (next && range[0].ep.logical_day !== 'unknown_date' && Date.parse(next[0].ep.logical_day) - Date.parse(range[0].ep.logical_day) === 86400000 && cost([...range, ...next]) <= 100000) { range = [...range, ...next]; i++; }
            for (const batch of pack(range, cost, Math.min(this.budget.stage1, hardInput(this.budget)), 50000)) {
              const refs = batch.flatMap(u => u.refs);
              const result = await this.runner.enqueueEvents(s.project_id, refs, { source_id: s.source_id, session_key: s.session_key, episode_keys: batch.map(u => u.ep.episode_key), token_method: this.budget.method }, { lane: s.lane, source: s.source_id, session: s.session_key }, c);
              await c.query("update ingestion_episodes set status='queued',run_id=$4 where project_id=$1 and source_id=$2 and episode_key=any($3::text[])", [s.project_id, s.source_id, batch.map(u => u.ep.episode_key), result.run_id]);
            }
          }
        }
      }
      await c.query('commit');
    } catch (e) { await c.query('rollback'); throw e; } finally { c.release(); }
  }
}
