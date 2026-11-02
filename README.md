# Harness Memory

An early, deliberately small memory service for XiaoBa and Pi. Upload recorded logs, manually extract goal-related event groups, and read the original evidence by immutable reference. Keyword search is a diagnostic implementation.

## What works in v0.1

- Two format adapters, one file uploader with optional 30-second polling.
- PostgreSQL transactions, project Keys, basic record deduplication and confirmed byte offsets.
- Manual `discover goals → select source event IDs`; overlong inputs split at event boundaries.
- Read one event, one episode, or the uploaded raw record. The model never rewrites returned evidence.

No automatic extraction, Skill/Wiki generation, embedding search, cache reuse, account console, or automatic historical-file discovery. XiaoBa aggregate turn logs cannot reconstruct missing intermediate assistant messages. Pi extraction follows one explicit branch. Chunked extraction can create separate episodes for the same goal.

## Run

Requires Node.js 20.20+, PostgreSQL 16+. Run commands from the repository root.

```sh
npm ci
npm run build
node --env-file=.env dist/src/admin.js migrate
node --env-file=.env dist/src/admin.js project-create demo
node --env-file=.env dist/src/server.js
```

Copy `.env.example` to `.env` and configure `DATABASE_URL`. Model variables are optional for upload/read, required for extraction. The server binds to `127.0.0.1:8460`. For a remote service, use HTTPS or an SSH tunnel. `MODEL_INPUT_BUDGET` is the UTF-8 byte budget of the messages array (default 65536), not a tokenizer count; leave enough provider context for the configured output (default 4096 tokens).

Save the returned project Key in a private local connector file, e.g. `connector.local.json`:

```json
{"url":"http://127.0.0.1:8460","key":"YOUR_PROJECT_KEY"}
```

```sh
npm run upload -- --config connector.local.json --harness xiaoba --file /path/session.jsonl --state uploader.local.json
npm run upload -- --config connector.local.json --harness pi --file /path/session.jsonl --state pi-uploader.local.json --watch
```

Each state file belongs to one endpoint, Key, harness and input file; use only one running uploader per state file. The uploader reports source_id, stream_id and confirmed offset. For another file, use another state file. Uploading does not automatically trigger extraction.

To validate the complete flow (including a real model):

```sh
npm run smoke -- --config connector.local.json --harness xiaoba --file tests/fixtures/xiaoba.jsonl
```

Only upload logs you intend to store. The service does not automatically remove secrets contained in source logs. Credentials and private acceptance reports must stay outside Git.

## Known limits

- Ordinary batches only, max 4 MiB encoded request. Oversized individual records stop upload visibly; no multipart protocol.
- Source files must remain append-only. Rewritten/truncated files require a fresh stream; server evidence is never overwritten.
- Failed delivery retains the local offset; there is no independent spool if the source file disappears.
- One extraction at a time, manual rerun after failure/restart. A single indivisible oversized event/tool group fails without deleting raw evidence.
- No semantic merging across chunks, automatic retention/deletion, or production retrieval ranking.

See [API](docs/api.md), [deployment](docs/deployment.md), and [the approved design](docs/superpowers/specs/2026-11-02-harness-memory-v1-design.md).

## Tests

Set `TEST_DATABASE_URL` to a dedicated database (tests add records); `npm test` loads `.env` if present. The database integration tests are real PostgreSQL tests, not an in-memory substitute. `npm run build` checks TypeScript. Fixtures contain synthetic data only.
