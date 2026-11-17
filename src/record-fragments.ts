import type { Pool } from 'pg';
import { isDeepStrictEqual } from 'node:util';
import { assert, sha256 } from './contracts.js';
import { isObject } from './extraction/output.js';
import { ingestBatch } from './ingest.js';
import type { UploadBot } from './ingestion/bot-identity.js';

/** Transport-only fragments. A record is normalized only after exact whole-record verification. */
export async function ingestFragment(pool: Pool, project: string, value: unknown, key?: string, bot?: UploadBot) {
  assert(isObject(value), 'invalid fragment');
  const { source_id: source, stream_id: stream, record_offset: offset, fragment_offset: fragment, total_bytes: total, record_hash: hash, origin } = value;
  assert(typeof source === 'string' && source.length > 0 && source.length <= 256 && typeof stream === 'string' && stream.length > 0 && stream.length <= 256, 'invalid source/stream');
  assert(Number.isSafeInteger(offset) && offset >= 0 && Number.isSafeInteger(fragment) && fragment >= 0 && Number.isSafeInteger(total) && total > 0 && total <= 64 * 1024 * 1024 && offset + total <= Number.MAX_SAFE_INTEGER, 'invalid fragment range');
  assert(typeof hash === 'string' && /^[a-f0-9]{64}$/.test(hash) && typeof value.raw_base64 === 'string', 'invalid fragment hash/data');
  assert(isObject(origin) && typeof origin.path === 'string' && /^sessions\/[^/\\]+\/\d{4}-\d{2}-\d{2}\/[^/\\]+\.jsonl$/.test(origin.path) && Number.isSafeInteger(origin.offset) && origin.offset >= 0, 'invalid fragment origin');
  const bytes = Buffer.from(value.raw_base64, 'base64');
  assert(bytes.length > 0 && bytes.length <= 1024 * 1024 && bytes.toString('base64') === value.raw_base64 && fragment + bytes.length <= total, 'invalid fragment bytes');
  const coordinates = [project, source, stream, offset];
  const c = await pool.connect();
  let record: Buffer | undefined;
  try {
    await c.query('begin');
    await c.query('select pg_advisory_xact_lock(hashtextextended($1,0))', ['fragment:' + JSON.stringify(coordinates)]);
    const old = (await c.query<{ hash: string; metadata: { origin: unknown }; size: number; part: Buffer }>('select hash,metadata,octet_length(raw) size,substring(raw from $5 for $6) part from raw_records where project_id=$1 and source_id=$2 and stream_id=$3 and offset_bytes=$4', [...coordinates, fragment + 1, bytes.length])).rows[0];
    if (old) {
      assert(old.hash === hash && old.size === total && old.part.equals(bytes) && isDeepStrictEqual(old.metadata.origin, origin), 'fragment replay conflict', 409);
      await c.query('delete from ingest_fragments where project_id=$1 and source_id=$2 and stream_id=$3 and record_offset=$4', coordinates);
      await c.query('commit');
      return { next_fragment_offset: total, next_offset: offset + total, sha256: hash };
    }
    const parts = (await c.query<{ fragment_offset: string; total_bytes: string; record_hash: string; origin: unknown; size: number }>('select fragment_offset,total_bytes,record_hash,origin,octet_length(raw) size from ingest_fragments where project_id=$1 and source_id=$2 and stream_id=$3 and record_offset=$4 order by fragment_offset', coordinates)).rows;
    let next = 0;
    for (const part of parts) {
      assert(Number(part.total_bytes) === total && part.record_hash === hash && isDeepStrictEqual(part.origin, origin), 'fragment identity conflict', 409);
      assert(Number(part.fragment_offset) === next, 'stored fragment gap', 409); next += part.size;
    }
    const existing = parts.find(p => Number(p.fragment_offset) === fragment);
    if (existing) {
      const saved = (await c.query<{ raw: Buffer }>('select raw from ingest_fragments where project_id=$1 and source_id=$2 and stream_id=$3 and record_offset=$4 and fragment_offset=$5', [...coordinates, fragment])).rows[0];
      assert(saved.raw.equals(bytes), 'fragment content conflict', 409);
    }
    else {
      assert(fragment === next, 'fragment offset conflict', 409);
      await c.query('insert into ingest_fragments(project_id,source_id,stream_id,record_offset,fragment_offset,total_bytes,record_hash,origin,raw) values($1,$2,$3,$4,$5,$6,$7,$8,$9)', [...coordinates, fragment, total, hash, JSON.stringify(origin), bytes]);
      next += bytes.length;
    }
    if (next === total) {
      const stored = (await c.query<{ raw: Buffer }>('select raw from ingest_fragments where project_id=$1 and source_id=$2 and stream_id=$3 and record_offset=$4 order by fragment_offset', coordinates)).rows;
      record = Buffer.concat(stored.map(p => p.raw));
      assert(sha256(record) === hash && record.at(-1) === 10, 'whole record hash/newline mismatch', 409);
    }
    await c.query('commit');
    if (!record) return { next_fragment_offset: next };
  } catch (e) { await c.query('rollback'); throw e; } finally { c.release(); }
  const ack = await ingestBatch(pool, project, { source_id: source, stream_id: stream, harness: 'xiaoba', records: [{ offset, raw_base64: record.toString('base64'), origin: { path: origin.path, offset: origin.offset } }] }, key, bot);
  await pool.query('delete from ingest_fragments where project_id=$1 and source_id=$2 and stream_id=$3 and record_offset=$4', coordinates);
  return { next_fragment_offset: total, next_offset: ack.next_offset, sha256: hash };
}
