# Incremental Ingestion Acceptance, 2026-11-12

## Scope

Replayed XiaoBa logs for 2026-11-10 and 2026-11-11 through the isolated Monday service, project, and database. This is a historical acceptance replay, not the deployment-time production collector baseline. No memory edges were built and the production service/database were not changed.

## Upload and normalization

- 18 JSONL files, 43,685 complete records, 127,814,332 source bytes.
- All records were valid JSON. Source file offsets, server stream offsets, and acknowledged byte totals matched at end of upload.
- Source records were 41,873 `runtime`, 1,708 `subagent_event`, 30 `prompt_trace`, and 74 legacy aggregate `turn` records.
- Monday normalized supported records server-side. Runtime-only content produced no model run; 17 non-empty snapshots were submitted.
- The real logs used the legacy aggregate `turn` shape. The newer ordered `entry_type: "turn"` plus `messages` format was separately tested end-to-end with synthetic data through upload, Stage 1, Markdown generation, Episode read, and exact raw-byte readback.

## Processing and retrieval

- 17/17 extraction runs completed; 27 Markdown memories passed the output schema checks.
- Stage 1 returned 74 query assignments: 69 assigned, 5 unassigned, and 7 assigned to more than one task thread.
- The 27 Episodes contained 2,646 event links representing 2,562 unique source events. The 34 input events outside those Episodes were exactly the event groups belonging to the five unassigned queries; no events from assigned queries were omitted by Stage 2.
- Manual review of all five unassigned query texts found only greetings (`你好` / `hello`) and platform-generated unavailable-attachment placeholders; none contained an actionable task or a task update.
- 69 distinct raw JSONL records referenced by Episodes were fetched and verified against their original file bytes, SHA-256, source path, and byte offset.
- Each generated memory was found by its title-derived keyword search; results respected the 10-item limit and contained no duplicate memory IDs. A negative search returned no results. Total search checks: 28.
- No run failed or entered `partial`, and the collector recorded zero processing retries. The service allows up to three schema-feedback attempts per model call but does not persist per-call attempt counts, so the exact number of model-level retries is unavailable.

## Verification

- Monday PostgreSQL integration suite: 14 test files, 88 tests passed.
- TypeScript build: passed.
- Companion collector suite: 5 tests passed, including baseline-only startup, append-only incremental upload, eventless ranges, rewrite detection, and one processing retry.
- Whitespace/diff check: passed.

## Limits observed

This replay confirms upload, normalization, processing, search, and source provenance for the log formats present in the selected dates. It does not establish Stage 1 completeness in general; in this sample, manual review confirmed the five unassigned queries were non-task greetings or unavailable-attachment placeholders, so their 34 events correctly did not enter a memory. Ordered-message format coverage is synthetic because the selected historical logs contained only aggregate turns. Model-internal retry telemetry remains unavailable.
