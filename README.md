# Harness Memory

An early memory service for XiaoBa and Pi. It stores uploaded logs, partitions dialogue into task threads, generates Markdown memories from selected whole-turn context, and reads original evidence by immutable reference. The same-origin workbench at `/workbench` shows upload streams, processing runs, provenance, keyword search, and source reads.

## What works in v0.1

- XiaoBa and Pi log adapters, incremental upload, PostgreSQL persistence, authorized search/source reads, and immutable source references. XiaoBa's independent automatic uploader uses a separate keyless Bot UID ingress.
- Automatic Stage 1 task partitioning from uploaded query/message records, followed by Stage 2 Markdown generation from each task's complete selected turns.
- Literal AND/OR search across published Markdown, with deduplication before the ten-document page limit.
- A same-origin workbench at `/workbench` for upload streams, processing runs, task assignments, published memories, search, and original-source reads.
- Episode and exact raw-record reads with SHA-256 returned for the original bytes.

The workbench displays provenance stored in PostgreSQL. It does not infer semantic links between memories or record which search results an Agent later used. The independent XiaoBa uploader discovers full history and future appends; Monday stores originals, plans whole Episodes and processes persistent stage queues. Legacy aggregate turns cannot reconstruct messages that the source did not save. Pi extraction follows one explicit branch. Oversized indivisible inputs remain visibly deferred with their originals stored.

## Run

Requires Node.js 20.20+, PostgreSQL 16+. Run commands from the repository root.

```sh
npm ci
npm run build
node --env-file=.env dist/src/admin.js migrate
node --env-file=.env dist/src/admin.js project-create demo
node --env-file=.env dist/src/server.js
```

Copy `.env.example` to `.env` and configure `DATABASE_URL`. Model variables are optional for upload/read, required for extraction. The service binds to `127.0.0.1:8460`. Monday's public ingress proxies only the keyless Bot config/upload routes; authorized search, workbench and original reads remain on the private application endpoint. The shared pipeline uses tokenizer-based context/output limits, 200K Stage1 and 880K Stage2 request targets by default. `MODEL_INPUT_BUDGET` applies to the legacy extraction path. See [full-history pipeline](docs/full-history-pipeline.md) for the automatic uploader, budgets, concurrency and deployment settings.

To enable the Cats Company chat Wiki sidebar, set a dedicated `MEMORY_CATSCO_READ_TOKEN` and make `/internal/catsco/memory/{catalog,wiki}` reachable from the Cats Company backend over the private connection. The reader queries published Wiki documents and their existing Episode and intake metadata in `MEMORY_BOT_PROJECT_ID`. Cats Company supplies the viewer's current scope.

`MEMORY_CATSCO_SOURCE_BINDINGS` is an optional JSON object mapping an independently verified uploader source to the end of its verified snapshot, for example `{"bot:365:managed_source":"2026-11-19T03:00:00Z"}`. Bot owners can browse their bot's Wiki directory. Ordinary members can browse automatic intake batches whose source is verified and whose conversations they can read. Set or advance the cutoff using evidence from the managed uploader. The setting defaults to an empty map and is independent of upload requests.

Automatic Bot uploads require no client memory key or project configuration. `/v1/bot-ingest/config` provides the dataset; `/v1/bots/{uid}/ingest/{manifests,batches,fragments}` accepts logs. `MEMORY_BOT_PROJECT_ID` selects their server-owned workspace. UID declares provenance, not authentication. Names update on upload without rewriting originals. The manual single-file uploader below continues using project authorization.

Save the returned project Key in a private local connector file, e.g. `connector.local.json`:

```json
{"url":"http://127.0.0.1:8460","key":"YOUR_PROJECT_KEY"}
```

```sh
npm run upload -- --config connector.local.json --harness xiaoba --file /path/session.jsonl --state uploader.local.json
npm run upload -- --config connector.local.json --harness pi --file /path/session.jsonl --state pi-uploader.local.json --watch
```

Each state file belongs to one endpoint, Key, harness and input file; use only one running uploader per state file. The uploader reports source_id, stream_id and confirmed offset. For another file, use another state file. After the complete file prefix is acknowledged, the uploader sends a completion signal and the service queues processing for that fixed snapshot.

To validate the complete flow (including a real model):

```sh
npm run smoke -- --config connector.local.json --harness xiaoba --file tests/fixtures/xiaoba.jsonl
```

Only upload logs you intend to store. The service does not automatically remove secrets contained in source logs. Credentials and private acceptance reports must stay outside Git.

## Known limits

- Ordinary HTTP requests are limited to 4 MiB. The automatic uploader uses resumable fragments for original records over 1 MiB, up to 64 MiB per whole record; larger records stop that file visibly.
- Source files must remain append-only. Rewritten/truncated files require a fresh stream; server evidence is never overwritten.
- Failed delivery retains the local offset; there is no independent spool if the source file disappears.
- Individual task failures can leave a run partial. Retry and restart behavior is documented in [API](docs/api.md).
- No semantic merging across chunks, automatic retention/deletion, or production retrieval ranking.

See [API](docs/api.md), [deployment](docs/deployment.md), and [the approved design](docs/superpowers/specs/2026-11-02-harness-memory-v1-design.md).

## Tests

Set `TEST_DATABASE_URL` to a dedicated database (tests add records); `npm test` loads `.env` if present. The database integration tests are real PostgreSQL tests, not an in-memory substitute. `npm run build` checks TypeScript. Fixtures contain synthetic data only.
