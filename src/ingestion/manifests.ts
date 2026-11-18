import type { Pool, PoolClient } from 'pg';
import { assert } from '../contracts.js';
import { isObject } from '../extraction/output.js';
import { isDeepStrictEqual } from 'node:util';
import { refreshEpisodes, type RawRecord } from './episodes.js';
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

/** Manifest offsets are the durable semantic-index checkpoint, not a second ledger. */
export async function indexManifests(c: PoolClient) {
  const pending = (await c.query<Manifest & { project_id: string; indexed_offsets: Record<string, number> | null }>(`select m.* from ingestion_manifests m where m.status='waiting' and (m.indexed_offsets is null or exists(
    select 1 from jsonb_array_elements(m.files) f left join streams s on s.project_id=m.project_id and s.source_id=m.source_id and s.stream_id=f->>'stream_id'
    where least(coalesce(s.next_offset,0),(f->>'end_offset')::bigint) <> coalesce((m.indexed_offsets->>(f->>'stream_id'))::bigint,0)
  )) order by m.created_at,m.manifest_id limit 100`)).rows;
  for (const manifest of pending) {
    await c.query('begin');
    try {
      const streams = (await c.query<{ stream_id: string; next_offset: string }>(
        'select stream_id,next_offset from streams where project_id=$1 and source_id=$2 and stream_id=any($3::text[])',
        [manifest.project_id, manifest.source_id, manifest.files.map(f => f.stream_id)])).rows;
      const ranges = manifest.files.map(file => ({
        stream_id: file.stream_id,
        start: manifest.indexed_offsets?.[file.stream_id] ?? 0,
        end: Math.min(file.end_offset, Number(streams.find(s => s.stream_id === file.stream_id)?.next_offset ?? 0)),
      }));
      const changes = (await c.query<RawRecord>(`with bounds as (
        select * from jsonb_to_recordset($3::jsonb) as b(stream_id text,start bigint,"end" bigint)
      ), changed as (
        select r.id from raw_records r join bounds b on r.stream_id=b.stream_id and r.offset_bytes>=b.start and r.offset_bytes<b."end"
          where r.project_id=$1 and r.source_id=$2
        union
        select r.raw_id from ingest_receipts r join bounds b on r.stream_id=b.stream_id and r.offset_bytes>=b.start and r.offset_bytes<b."end"
          where r.project_id=$1 and r.source_id=$2
      ) select r.id,r.metadata from changed d join raw_records r on r.id=d.id
        where r.project_id=$1 and r.source_id=$2 and r.metadata->>'record_type' in ('transcript','turn')`,
      [manifest.project_id, manifest.source_id, JSON.stringify(ranges.filter(r => r.end > r.start))])).rows;
      await refreshEpisodes(c, manifest, changes);
      const complete = ranges.every((range, i) => range.end >= manifest.files[i].end_offset);
      const offsets = Object.fromEntries(ranges.map(r => [r.stream_id, r.end]));
      await c.query('update ingestion_manifests set status=$4,indexed_offsets=$5 where project_id=$1 and source_id=$2 and manifest_id=$3',
        [manifest.project_id, manifest.source_id, manifest.manifest_id, complete ? 'indexed' : 'waiting', JSON.stringify(offsets)]);
      await c.query('commit');
    } catch (error) {
      await c.query('rollback');
      throw error;
    }
  }
}
