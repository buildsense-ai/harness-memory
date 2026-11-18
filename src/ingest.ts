import type { Pool } from "pg";
import { isDeepStrictEqual } from "node:util";
import {
  assert,
  ref,
  sha256,
  type UploadBatch,
  type IngestAck,
} from "./contracts.js";
import { projectRecord } from "./adapters/index.js";
import { workbenchMetadata } from "./workbench-metadata.js";
import { botUid, type UploadBot } from './ingestion/bot-identity.js';
export async function ingestBatch(
  pool: Pool,
  projectId: string,
  b: UploadBatch,
  uploadKeyId?: string,
  bot?: UploadBot,
): Promise<IngestAck> {
  assert(
    b &&
      typeof b.source_id === "string" &&
      b.source_id.length > 0 &&
      b.source_id.length <= 256 &&
      typeof b.stream_id === "string" &&
      b.stream_id.length > 0 &&
      b.stream_id.length <= 256,
    "invalid source/stream",
  );
  assert(
    (b.harness === "xiaoba" || b.harness === "pi") &&
      Array.isArray(b.records) &&
      b.records.length > 0 &&
      b.records.length <= 10000,
    "invalid batch",
  );
  const c = await pool.connect();
  try {
    await c.query("BEGIN");
    await c.query(
      "insert into streams(project_id,source_id,stream_id,harness) values($1,$2,$3,$4) on conflict do nothing",
      [projectId, b.source_id, b.stream_id, b.harness],
    );
    const s = (
      await c.query(
        "select * from streams where project_id=$1 and source_id=$2 and stream_id=$3 for update",
        [projectId, b.source_id, b.stream_id],
      )
    ).rows[0];
    assert(s.harness === b.harness, "harness conflict", 409);
    await c.query('select pg_advisory_xact_lock(hashtextextended($1,0))', [projectId + ':' + b.source_id]);
    let next = Number(s.next_offset);
    const out: IngestAck["records"] = [];
    let previousEnd: number | undefined;
    for (const r of b.records) {
      assert(
        Number.isSafeInteger(r.offset) &&
          r.offset >= 0 &&
          typeof r.raw_base64 === "string" &&
          r.raw_base64.length > 0,
        "invalid record",
      );
      const raw = Buffer.from(r.raw_base64, "base64");
      assert(
        raw.toString("base64") === r.raw_base64 && raw.at(-1) === 10,
        "record must be complete base64 JSONL",
      );
      assert(
        previousEnd === undefined || r.offset === previousEnd,
        "noncontiguous batch",
      );
      previousEnd = r.offset + raw.length;
      assert(Number.isSafeInteger(previousEnd), "offset too large");
      if (r.origin !== undefined) {
        assert(
          r.origin &&
            typeof r.origin.path === "string" &&
            r.origin.path.length > 0 &&
            r.origin.path.length <= 512 &&
            !r.origin.path.startsWith("/") &&
            !r.origin.path.includes("\\") &&
            r.origin.path.split("/").every((part: string) => part && part !== "." && part !== "..") &&
            Number.isSafeInteger(r.origin.offset) &&
            r.origin.offset >= 0,
          "invalid source origin",
        );
      }
      const p = projectRecord(b.harness, raw),
        expected = p.events.map(({ content, text, fidelity, ...d }) => d);
      const display = workbenchMetadata(raw, p);
      if (bot && display.bot_id) assert(botUid(display.bot_id) === bot.uid, 'record belongs to another bot', 409);
      if (r.events !== undefined)
        assert(
          Array.isArray(r.events) && isDeepStrictEqual(expected, r.events),
          "event descriptors do not match original",
        );
      const old = (
        await c.query(
          "select id,hash,metadata from raw_records where project_id=$1 and source_id=$2 and stream_id=$3 and offset_bytes=$4 union all select raw_id id,hash,jsonb_build_object('origin',origin) metadata from ingest_receipts where project_id=$1 and source_id=$2 and stream_id=$3 and offset_bytes=$4 limit 1",
          [projectId, b.source_id, b.stream_id, r.offset],
        )
      ).rows[0];
      let id: string;
      if (old) {
        assert(old.hash === sha256(raw), "record content conflict", 409);
        if (r.origin !== undefined)
          assert(
            isDeepStrictEqual(old.metadata?.origin, r.origin),
            "source origin conflict",
            409,
          );
        id = old.id;
      } else {
        assert(r.offset === next, "offset conflict", 409);
        const overlap = r.origin ? (await c.query<{ id: string; hash: string; metadata: { origin: { offset: number } }; bytes: number }>(
          "select id,hash,metadata,octet_length(raw) bytes from raw_records where project_id=$1 and source_id=$2 and metadata->'origin'->>'path'=$3 and (metadata->'origin'->>'offset')::bigint < $4 and (metadata->'origin'->>'offset')::bigint + octet_length(raw) > $5 limit 1",
          [projectId, b.source_id, r.origin.path, r.origin.offset + raw.length, r.origin.offset])).rows[0] : undefined;
        if (overlap) {
          assert(overlap.metadata.origin.offset === r.origin!.offset && overlap.bytes === raw.length && overlap.hash === sha256(raw), 'source origin overlap conflict', 409);
          id = overlap.id;
          await c.query('insert into ingest_receipts(project_id,source_id,stream_id,offset_bytes,raw_id,length_bytes,hash,origin) values($1,$2,$3,$4,$5,$6,$7,$8)', [projectId,b.source_id,b.stream_id,r.offset,id,raw.length,sha256(raw),JSON.stringify(r.origin)]);
        } else {
        id = ref("raw");
        await c.query(
          "insert into raw_records(id,project_id,source_id,stream_id,offset_bytes,raw,hash,metadata,received_at,upload_key_id) values($1,$2,$3,$4,$5,$6,$7,$8,now(),$9)",
          [
            id,
            projectId,
            b.source_id,
            b.stream_id,
            r.offset,
            raw,
            sha256(raw),
            JSON.stringify({
              native_id: p.native_id,
              parent_id: p.parent_id,
              timestamp: p.timestamp,
              format_version: p.format_version,
              record_type: p.record_type,
              conversation_run_id: p.conversation_run_id,
              transcript_event_type: p.transcript_event_type,
              transcript_event_id: p.transcript_event_id,
              transcript_stream_id: p.transcript_stream_id,
              transcript_sequence: p.transcript_sequence,
              session_id: p.session_id,
              run_id: p.run_id,
              ...display,
              ...(bot ? { bot_id: bot.uid, bot_name: bot.name ?? display.bot_name, bot_identity_source: display.bot_id ? 'recorded' : 'upload_declared' } : {}),
              ...(r.origin ? { origin: r.origin } : {}),
            }),
            uploadKeyId ?? null,
          ],
        );
        for (const e of p.events) {
          const { content, text, ...meta } = e;
          await c.query(
            "insert into events(id,project_id,raw_id,ordinal,kind,pointer,content_json,search_text,metadata) values($1,$2,$3,$4,$5,$6,$7,$8,$9)",
            [
              ref("evt"),
              projectId,
              id,
              e.order,
              e.kind,
              e.pointer,
              JSON.stringify(content),
              text.replaceAll("\0", "\uFFFD"),
              JSON.stringify(meta),
            ],
          );
        }
        }
        next = r.offset + raw.length;
      }
      const es = await c.query(
        "select id from events where project_id=$1 and raw_id=$2 order by ordinal",
        [projectId, id],
      );
      out.push({
        offset: r.offset,
        raw_ref: id,
        event_refs: es.rows.map((e) => e.id),
      });
    }
    if (next > Number(s.next_offset)) {
      await c.query(
        "update streams set next_offset=$4,last_received_at=now() where project_id=$1 and source_id=$2 and stream_id=$3",
        [projectId, b.source_id, b.stream_id, next],
      );
    } else {
      await c.query(
        "update streams set next_offset=$4 where project_id=$1 and source_id=$2 and stream_id=$3",
        [projectId, b.source_id, b.stream_id, next],
      );
    }
    await c.query("COMMIT");
    return { next_offset: previousEnd!, records: out, sha256: sha256(Buffer.concat(b.records.map(r => Buffer.from(r.raw_base64, 'base64')))) };
  } catch (e) {
    await c.query("ROLLBACK");
    throw e;
  } finally {
    c.release();
  }
}
