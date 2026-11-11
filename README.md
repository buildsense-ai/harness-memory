# Harness Memory

An early memory service for XiaoBa and Pi. It stores uploaded logs, partitions dialogue into task threads, generates Markdown memories from selected whole-turn context, and reads original evidence by immutable reference. The same-origin workbench at `/workbench` shows upload streams, processing runs, provenance, keyword search, and source reads.

## What works in v0.1

- XiaoBa and Pi log adapters, incremental upload, PostgreSQL persistence, project-scoped API Keys, and immutable source references.
- Automatic Stage 1 task partitioning from uploaded query/message records, followed by Stage 2 Markdown generation from each task's complete selected turns.
- Literal AND/OR search across published Markdown, with deduplication before the ten-document page limit.
- A same-origin workbench at `/workbench` for upload streams, processing runs, task assignments, published memories, search, and original-source reads.
- Episode and exact raw-record reads with SHA-256 returned for the original bytes.

The workbench displays provenance stored in PostgreSQL. It does not infer semantic links between memories or record which search results an Agent later used. The service does not automatically discover historical files. XiaoBa aggregate turn logs cannot reconstruct intermediate assistant messages that the source log did not save. Pi extraction follows one explicit branch. Oversized model inputs fail visibly; raw uploads remain stored.

## Run

Requires Node.js 20.20+, PostgreSQL 16+. Run commands from the repository root.

```sh
npm ci
npm run build
node --env-file=.env dist/src/admin.js migrate
node --env-file=.env dist/src/admin.js project-create demo
node --env-file=.env dist/src/server.js
```

Copy `.env.example` to `.env` and configure `DATABASE_URL`. Model variables are optional for upload/read, required for extraction. The service binds to `127.0.0.1:8460`; on Monday, Nginx exposes the workbench and API over HTTPS at the server's public hostname. Do not expose the plain HTTP application port because API Keys are sent as Bearer credentials. `MODEL_INPUT_BUDGET` is the UTF-8 byte budget of the messages array (default 65536), not a tokenizer count; leave enough provider context for the configured output (default 4096 tokens).

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

- Ordinary batches only, max 4 MiB encoded request. Oversized individual records stop upload visibly; no multipart protocol.
- Source files must remain append-only. Rewritten/truncated files require a fresh stream; server evidence is never overwritten.
- Failed delivery retains the local offset; there is no independent spool if the source file disappears.
- Individual task failures can leave a run partial. Retry and restart behavior is documented in [API](docs/api.md).
- No semantic merging across chunks, automatic retention/deletion, or production retrieval ranking.

See [API](docs/api.md), [deployment](docs/deployment.md), and [the approved design](docs/superpowers/specs/2026-11-02-harness-memory-v1-design.md).

## Tests

Set `TEST_DATABASE_URL` to a dedicated database (tests add records); `npm test` loads `.env` if present. The database integration tests are real PostgreSQL tests, not an in-memory substitute. `npm run build` checks TypeScript. Fixtures contain synthetic data only.
