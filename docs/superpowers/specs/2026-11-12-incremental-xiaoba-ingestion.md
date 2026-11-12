# Incremental XiaoBa ingestion contract

## Ownership

The Saturday collector reads XiaoBa session JSONL and sends raw complete lines. It is a separate companion project and is not part of this repository. Monday owns authentication, immutable source storage, harness normalization, extraction, Markdown publication and search.

## Source record

The collector sends one JSONL line per record. It does not rewrite or normalize that line. A batch record is:

```json
{
  "offset": 0,
  "raw_base64": "...exact JSONL bytes including newline...",
  "origin": {
    "path": "sessions/catscompany/2026-11-11/session.jsonl",
    "offset": 9182
  }
}
```

`offset` is the contiguous offset in the server stream. `origin.offset` is the original file byte offset. The source path is relative to the approved XiaoBa log root. The server keeps the exact bytes, validates the path, and stores origin metadata with the immutable raw record.

## Normalization

The server adapter converts XiaoBa `entry_type:"transcript", schema_version:1` records, old aggregate turns, ordered `entry_type:"turn"` message arrays, and native `role` records to the shared ordered event kinds: `query`, `message`, `tool_call`, and `tool_result`. Transcript input receipts remain raw-only; consumed root/pending inputs become queries. Public messages and paired tool records retain source pointers. A compatible turn summary is excluded from extraction when the same session/run has transcript records. The downstream Stage 1 and Stage 2 inputs therefore do not depend on the source log shape. Client-supplied event descriptors remain optional; when supplied, Monday validates them against the source bytes.

## Baseline and cursors

At collector installation, the first directory scan records the exact EOF of every existing file and uploads none of its prior contents. If an existing file ends mid-line, the collector discards that pre-baseline row through its next newline before uploading subsequent rows. Files first created after the baseline start at byte zero. Each file keeps independent local-file, server-stream and processed-stream cursors. State is durable; a lost ACK retries the same bytes and coordinates. Shrink/rewrite or corrupt state pauses that file rather than silently starting a new history.

## Scheduled processing

The collector scans every six hours. Files modified less than ten minutes ago are deferred without advancing source/upload/processing offsets. New files are registered at zero before the idle check. Files idle for at least 600 seconds are eligible. Each upload is bounded by the observed file size; if size or modification time changes during upload, acknowledged raw bytes remain stored but the new processing submission waits for a later idle scan. Existing submitted runs may still be polled or retried. Each completed append range is submitted as `[previous_processed_stream_offset, acknowledged_stream_offset)`. Ranges with no eligible normalized events are acknowledged as skipped. Processing offsets advance only after an ACK.

A ten-minute idle window reduces active-conversation splits but does not prove a task has ended. For transcript runs that span upload windows, the server saves raw events first, defers unclosed runs, and includes the full uploaded run when `run_finished` arrives. It never reads pre-baseline local history. Other supported formats retain range-based snapshots. Each Markdown cites its fixed Episode evidence; cross-delta memory edges remain out of scope.

## Processing capacity

The server drains up to two extraction runs concurrently by default. Each run retains the existing maximum of three task-document workers. Model calls and persisted runs remain bounded and restart-recoverable.

## Validation

Before activating the collector, verify upload idempotency, original byte round-trips, source-path/offset reads, old/new XiaoBa normalization, exact incremental ranges, eventless ranges, processing retry, and project-key isolation. A historical two-day replay uses a separate test project; the production collector baseline remains deployment time.
