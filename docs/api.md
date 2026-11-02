# v1 API

All `/v1` endpoints require `Authorization: Bearer PROJECT_KEY`; the Key determines the project. Source names and references never grant access. Unknown and foreign references return 404. `/healthz` only checks service/database health.

| Method/path | Input | Result |
|---|---|---|
| POST /v1/ingest/batches | source_id, stream_id, harness, records | Durable ACK and stable raw/event references |
| POST /v1/extractions | source_id, stream_id, optional start_offset/end_offset/leaf_id | run_id; 409 if busy, 503 if no model |
| GET /v1/extractions/:id | — | status, input_refs, error, episodes |
| POST /v1/episodes/search | keywords[], optional operator AND/OR, limit | Episode hits and original snippets |
| POST /v1/read | ref, optional offset/limit | One original event or one episode page |
| GET /v1/raw/:ref | — | Raw bytes; x-content-sha256 header |

Upload records contain `{offset,raw_base64,events}`. `raw_base64` contains exactly one original UTF-8 JSONL record including its newline; use the shared uploader/adapters to produce event descriptors. All records in a batch must be contiguous. At the same project/source/stream/offset, identical bytes return the original references; different bytes return 409. Unsupported or malformed records are not skipped.

Extraction ranges use complete-record byte boundaries, start inclusive and end exclusive. The default is the currently uploaded stream. Pi `leaf_id` is required when more than one branch leaf exists. The input event list is fixed before model execution. Status is running/completed/failed/interrupted; only completed episodes are searchable. Restart does not automatically retry interrupted work.

Read examples:

```json
{"ref":"evt_UUID"}
```

```json
{"ref":"ep_UUID","offset":0,"limit":20}
```

Episode output includes goal, chunk_id, total_events, events, missing_pair_refs and next_offset (`null` at end). missing_pair_refs lists selected tool calls/results whose counterpart was absent from the fixed extraction input; it does not invent missing evidence. Limit defaults to 20 and must be 1–50. Each event includes content, source pointer, raw_ref, source offset and fidelity. Event content is the original field value; the raw endpoint returns the exact source bytes. Episode descriptions are generated metadata, not original evidence. Reading a large single event returns its full recorded content.

Search example:

```json
{"keywords":["上传","8460"],"operator":"AND","limit":10}
```

Literal substrings; AND requires all words within the same event. OR permits any word. ASCII is case-insensitive, Chinese is matched literally; `%`, `_` and regex syntax have no special meaning. 1–16 keywords of at most 256 characters; default limit 10, max 50. Results group by episode and provide up to 3 snippets of at most 400 characters. Ordering is newest matching recorded timestamp then episode ID, not semantic relevance. No embeddings, random hops or LLM reranking.
