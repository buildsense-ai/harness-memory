import type { PoolClient } from 'pg';
import { logicalDay } from '../extraction/budget.js';

export interface SessionScope { project_id: string; source_id: string; session_key: string; lane: string }
export interface RawRecord {
  id: string;
  metadata: {
    record_type?: string; session_id?: string; run_id?: string; timestamp?: string;
    transcript_event_type?: string; transcript_event_id?: string; transcript_stream_id?: string;
    transcript_sequence?: number; conversation_run_id?: string;
  };
}

/** Rebuild only runs touched by new raw records, including runless sequence-gap arrivals. */
export async function refreshEpisodes(c: PoolClient, scope: SessionScope, changes: RawRecord[]) {
  const coordinates = [scope.project_id, scope.source_id];
  const streams = [...new Set(changes.flatMap(r => r.metadata.transcript_stream_id ?? []))];
  const keys = new Set(changes.flatMap(r => r.metadata.conversation_run_id ?? []));
  if (streams.length) {
    const awaiting = (await c.query<{ episode_key: string }>(`select e.episode_key from ingestion_episodes e
      join raw_records r on r.project_id=e.project_id and r.id=(e.raw_ids->>0)
      where e.project_id=$1 and e.source_id=$2 and e.session_key=$3 and e.status='awaiting_material'
        and r.metadata->>'transcript_stream_id'=any($4::text[])`, [...coordinates, scope.session_key, streams])).rows;
    for (const row of awaiting) keys.add(row.episode_key);
  }
  const records = keys.size ? (await c.query<RawRecord>(`select id,metadata from raw_records
    where project_id=$1 and source_id=$2 and metadata->>'record_type'='transcript'
      and metadata->>'conversation_run_id'=any($3::text[])
    order by metadata->'origin'->>'path',(metadata->'origin'->>'offset')::bigint`, [...coordinates, [...keys]])).rows : [];
  const groups = new Map<string, RawRecord[]>(), identities = new Set<string>();
  for (const record of records) {
    const m = record.metadata, identity = JSON.stringify([m.transcript_stream_id, m.transcript_event_id]);
    if (identities.has(identity)) continue;
    identities.add(identity);
    const group = groups.get(m.conversation_run_id!) ?? [];
    group.push(record); groups.set(m.conversation_run_id!, group);
  }
  for (const record of changes.filter(r => r.metadata.record_type === 'turn')) {
    const m = record.metadata;
    const transcript = m.run_id && (await c.query(`select 1 from raw_records where project_id=$1 and source_id=$2
      and metadata->>'record_type'='transcript' and metadata->>'session_id'=$3 and metadata->>'run_id'=$4 limit 1`,
    [...coordinates, m.session_id, m.run_id])).rowCount;
    if (!transcript) groups.set('legacy:' + record.id, [record]);
  }
  for (const [key, group] of groups) {
    group.sort((a, b) => (a.metadata.transcript_sequence ?? 0) - (b.metadata.transcript_sequence ?? 0));
    const legacy = key.startsWith('legacy:');
    const first = group.find(r => r.metadata.transcript_event_type === 'run_started');
    const last = [...group].reverse().find(r => r.metadata.transcript_event_type === 'run_finished');
    const start = (first ?? group[0]).metadata.timestamp;
    const finish = (last ?? (legacy ? group[0] : undefined))?.metadata.timestamp;
    let error: string | null = !legacy && (!first || !last) ? 'awaiting_run_boundaries' : null;
    if (first && last) {
      const { metadata: m } = first;
      const count = (await c.query<{ n: number }>(`select count(distinct (metadata->>'transcript_sequence')::bigint)::int n from raw_records
        where project_id=$1 and source_id=$2 and metadata->>'record_type'='transcript'
          and metadata->>'transcript_stream_id'=$3 and metadata->>'session_id'=$4
          and (metadata->>'transcript_sequence')::bigint between $5 and $6`,
      [...coordinates, m.transcript_stream_id, m.session_id, m.transcript_sequence, last.metadata.transcript_sequence])).rows[0].n;
      if (count !== last.metadata.transcript_sequence! - m.transcript_sequence! + 1) error = 'awaiting_sequence_gap';
    }
    const ended = finish && Number.isFinite(Date.parse(finish)) ? finish : legacy ? new Date(0).toISOString() : null;
    await c.query(`insert into ingestion_episodes(project_id,source_id,episode_key,session_key,lane,logical_day,started_at,ended_at,raw_ids,status,error)
      values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) on conflict(project_id,source_id,episode_key) do update
      set raw_ids=excluded.raw_ids,ended_at=excluded.ended_at,status=excluded.status,error=excluded.error
      where ingestion_episodes.run_id is null and ingestion_episodes.status<>'deferred_oversize'`,
    [...coordinates, key, scope.session_key, scope.lane, logicalDay(start), start, ended, JSON.stringify(group.map(r => r.id)), error ? 'awaiting_material' : 'ready', error]);
  }
}
