# v1 API

All `/v1` endpoints require `Authorization: Bearer PROJECT_KEY`; the Key determines the project. Source names and references never grant access. Unknown and foreign references return 404. `/healthz` only checks service/database health.

| Method/path | Input | Result |
|---|---|---|
| POST /v1/ingest/batches | source_id, stream_id, harness, records | Durable ACK and stable raw/event references |
| POST /v1/ingest/complete | source_id, stream_id, acknowledged end_offset, optional leaf_id/start_offset/retry | Durable Markdown processing run_id/status |
| POST /v1/memories/search | keywords[], optional operator AND/OR, offset, limit<=10 | Complete Markdown documents and Episode source_refs |
| POST /v1/extractions | source_id, stream_id, optional start_offset/end_offset/leaf_id | run_id; 409 if busy, 503 if no model |
| GET /v1/extractions/:id | — | status, input_refs, task_partition, error, episodes |
| POST /v1/episodes/search (deprecated) | keywords[], optional operator AND/OR, limit | Legacy Episode hits and original snippets; not the Markdown memory search |
| POST /v1/read | ref, optional offset/limit | One original event or one episode page |
| GET /v1/raw/:ref | — | Raw bytes; x-content-sha256 header |

Upload records contain `{offset,raw_base64,events}`. `raw_base64` contains exactly one original UTF-8 JSONL record including its newline; use the shared uploader/adapters to produce event descriptors. All records in a batch must be contiguous. At the same project/source/stream/offset, identical bytes return the original references; different bytes return 409. Unsupported or malformed records are not skipped.

## Current Markdown pipeline

The CLI uploader uploads original JSONL bytes and automatically calls `POST /v1/ingest/complete` after the complete acknowledged file prefix is uploaded (private config `process: false` disables processing). Raw batch uploads alone remain storage-only: integrations must send this completion signal after their batches, so a partial upload is not mistaken for a complete conversation. The low-level `uploadOnce` library opts into this using `process: true`.

```json
{"source_id":"src_UUID","stream_id":"stream_UUID","end_offset":12345}
```

The completion response is `{run_id,status}`. `end_offset` is the acknowledged complete-record byte boundary, not a token or event count. Optional `start_offset` defaults to 0; Pi `leaf_id` is required when a stream branches. This fixed event snapshot is enqueued durably; repeat submission returns the same run. `retry:true` resumes a failed/partial run while preserving its successful documents. Upload success is distinct from processing success.

`GET /v1/extractions/:id` returns `queued/running/completed/partial/failed`, `task_partition`, `episodes`, `documents` (memory_id, thread_id, source_refs), and an error for failed tasks. New runs resume after service restart with a previously saved partition and already published documents. Older legacy runs can remain interrupted. `POST /v1/extractions` also submits the new pipeline when the configured model supports Markdown generation; legacy clients/tests without that capability retain the old extraction path.

Stage 1 uses the frozen hybrid-allmsg-v1 original partition prompt with all ordered public queries/messages, no tools; relations are disabled (`[]`). Each task's assigned whole query turns form one immutable candidate Episode. Stage 2 sees that task, its assignments, and that complete candidate with messages and tools. It directly generates the fixed-skeleton Markdown; there is no model event-pruning step. Model calls use thinking enabled, reasoning_effort=max and up to 3 schema-feedback attempts. The output-token default is 131072 (including reasoning); byte input budget defaults to 4194304. Oversized new-pipeline inputs fail explicitly rather than silently dropping messages.

Native XiaoBa `role:user/assistant/tool` JSONL messages preserve intermediate assistant text, tool calls and results. Original aggregate turn logs remain supported but expose only their recorded final assistant message (`turn_aggregate` fidelity); missing intermediate messages are not reconstructed. Pi ancestry is resolved before snapshotting. Injected summaries, system/developer records and hidden reasoning do not enter partitioning.

## Markdown search

`POST /v1/memories/search` requires the same Bearer Key used to upload the source logs. This first version preserves one Key per project: other Keys' data, even with identical source names or known references, is inaccessible.

```json
{"keywords":["上传","API Key"],"operator":"AND","offset":0,"limit":10}
```

Searches the title and body of all published Markdown for this Key. Literal substrings, ASCII case-insensitive; AND requires all terms in the same document (including different paragraphs), OR any term. Mechanical source_refs are excluded from matching. Same-document matches are deduplicated before sorting/pagination/limit. Limit defaults to 10 and must be 1–10; offset defaults to 0. Newest published documents first, then ID; this is not semantic ranking. 1–16 keywords, each at most 256 Unicode codepoints. Returns `{items:[{memory_id,markdown,source_refs}],next_offset}`. Markdown is complete and contains the program-appended Episode reference. No hits returns empty items; `next_offset:null` means the end.

Each referenced Episode contains the exact complete Stage 2 candidate, not the whole multi-task session and not a rewritten summary. Read it through `/v1/read` below. Successful documents remain searchable if another task in the same run failed. Markdown must pass shape/schema validation before a transaction publishes it with its source Episode. Generated references are never trusted.

Read examples:

```json
{"ref":"evt_UUID"}
```

```json
{"ref":"ep_UUID","offset":0,"limit":20}
```

Episode output includes the compatibility `goal` description, `thread_id`, `task_thread`, `evidence_coverage`, `chunk_id`, `total_events`, `events`, `missing_pair_refs` and `next_offset` (`null` at end). `missing_pair_refs` lists selected tool calls/results whose counterpart was absent from the fixed extraction input; it does not invent missing evidence. Limit defaults to 20 and must be 1–50. Each event includes content, source pointer, raw_ref, source offset and fidelity. Event content is the original field value; the raw endpoint returns the exact source bytes. Task-thread and coverage fields are generated metadata, not original evidence. Reading a large single event returns its full recorded content.

Legacy Episode search example (deprecated; retained for compatibility, not used by the new Markdown memory search):

```json
{"keywords":["上传","8460"],"operator":"AND","limit":10}
```

Literal substrings; AND requires all words within the same event. OR permits any word. ASCII is case-insensitive, Chinese is matched literally; `%`, `_` and regex syntax have no special meaning. 1–16 keywords of at most 256 characters; default limit 10, max 50. Results group by episode and provide up to 3 snippets of at most 400 characters. Ordering is newest matching recorded timestamp then episode ID, not semantic relevance. No embeddings, random hops or LLM reranking.
