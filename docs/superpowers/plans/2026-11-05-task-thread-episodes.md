# Task Threads and Episodes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current goal-only extraction with query/msg task-thread partitioning, evidence-backed task relations, and per-thread selection of original events.

**Architecture:** Keep upload, immutable raw events, search, and read APIs. Stage 1 sees only query/message text and persists task threads, query assignments, and directional relations. Stage 2 runs once per task thread against the complete ordered snapshot and emits original event refs plus compact evidence-coverage refs; the server attaches the thread ID and enforces tool-pair closure.

**Tech Stack:** TypeScript, Node.js 20.20.2, Fastify, PostgreSQL 16, Vitest.

**Spec:** `docs/superpowers/specs/2026-11-05-task-thread-episodes-design.md`

## Global Constraints

- Preserve uploaded UTF-8 source bytes and immutable event references.
- Stage 1 input is query/message only; Stage 2 input is the complete fixed snapshot.
- Every human query is assigned exactly once; its assignment may name multiple task threads.
- Relations are evidence-backed and only `depends_on`, `continues`, or `supersedes`; no unsupported generic links.
- One Episode per task thread per extraction run; selection is event-ref based and may be discontinuous. Stage 2 chunks merge back into that Episode.
- Tool calls/results are selected as a pair when both exist; never fabricate missing source events.
- PRs do not deploy; only a passing main commit deploys to Monday through the existing workflow.

## Review Focus

- A compound query must be assigned to all named threads without merging those threads; test exact multi-assignment.
- Directional relation evidence must be valid and must not silently reverse `depends_on`; test source refs and endpoints.
- Stage 1 must never expose tool logs; Stage 2 must receive them; test captured model payloads.
- Missing or unselected tool partners must be handled without inventing refs; test pair closure and missing-pair metadata.
- Large snapshots must bisect chronologically without splitting tool pairs; test stable per-thread chunk output and provenance.

---

### Task 1: Define extraction contracts and persistence

**Files:**
- Modify: `src/contracts.ts`
- Modify: `src/db/migrations/001_initial.sql`
- Create: `src/db/migrations/002_task_threads.sql`
- Modify: `src/extraction/runner.ts`
- Modify: `src/app.ts`
- Test: `tests/extraction.test.ts`, `tests/api.test.ts`

**Interfaces:**
- Produce `TaskThread`, `QueryAssignment`, `TaskRelation`, `PartitionResult`, `EpisodeSelection`, and `EvidenceCoverage` types.
- Store partition JSON on `extraction_runs`; store `thread_id` and coverage JSON on `episodes`.
- Read responses return `thread_id` and coverage without changing original event content.

- [ ] Add migration tests for fresh and existing v1 databases.
- [ ] Extend extraction/API tests to assert stored partition, relations, per-thread episodes, and backward-compatible reads.
- [ ] Implement migration and contracts; keep all new foreign identifiers scoped to the extraction run/project.
- [ ] Run `npm test` and `npm run build`.

### Task 2: Implement Stage 1 task partition prompt and validation

**Files:**
- Modify: `src/extraction/model.ts`
- Test: `tests/extraction.test.ts`

**Interfaces:**
- Replace `ChatModel.discover(events)` with `ChatModel.partition(events)` returning `PartitionResult`.
- Keep `Stage 1` serialization limited to human query and assistant message events.
- Validate exact query assignment coverage, unique task IDs, relation endpoints, allowed relation kinds, and evidence refs.

- [ ] Add tests proving tool_call/tool_result contents are absent from partition payload.
- [ ] Add tests for missing/duplicate/unknown query assignments and malformed relation endpoints/evidence.
- [ ] Add retry tests proving validator feedback requests a complete corrected partition.
- [ ] Implement the Chinese task-boundary prompt and structured JSON function schema from the spec.
- [ ] Run targeted tests, full tests, and build.

### Task 3: Implement per-thread Stage 2 event selection

**Files:**
- Modify: `src/extraction/model.ts`
- Modify: `src/extraction/runner.ts`
- Modify: `src/extraction/chunk.ts`
- Test: `tests/extraction.test.ts`

**Interfaces:**
- `ChatModel.select(thread, assignments, events)` returns `EpisodeSelection`.
- Each call receives one thread's assignments and the complete ordered source-event snapshot.
- Model output does not echo `thread_id`; runner attaches it to the stored Episode.

- [ ] Add payload-capture tests proving Stage 2 includes tool events and only current-thread assignments.
- [ ] Add tests for compact evidence coverage, empty categories, invalid refs, and query-anchor inclusion.
- [ ] Add tests for omitting routine noise while preserving diagnostic failures and decisive tool evidence using deterministic fake-model selections.
- [ ] Implement one selection per thread, original order, one Episode per thread/chunk, and tool-pair closure.
- [ ] Preserve pair provenance and merge selected refs/coverage from chronological chunks back into one Episode; fail only when an indivisible event/tool pair exceeds budget.
- [ ] Run targeted tests, full tests, and build.

### Task 4: Update API/docs and acceptance probes

**Files:**
- Modify: `docs/api.md`
- Modify: `docs/acceptance-2026-11-02.md`
- Modify: `README.md`
- Test: `tests/api.test.ts`, `tests/smoke` behavior as applicable

- [ ] Document partition and Episode response fields, including directional relation semantics and thread-internal selection.
- [ ] Add synthetic acceptance covering query-only partition, full-event selection, source-ref readback, and a reasoned transient-error omission.
- [ ] Record quality observations separately from transport/integrity checks.
- [ ] Run `npm test`, `npm run build`, smoke checks, and Python deploy tests.

### Task 5: Merge and deploy the tested main SHA to Monday

**Files:**
- No manual server source edits; use the existing GitHub Actions deployment path.

- [ ] Commit the tested implementation on a feature branch and push it.
- [ ] Wait for PR CI; merge only after checks pass.
- [ ] Confirm the main push deploys its exact SHA through `.github/workflows/ci-deploy.yml`.
- [ ] Verify deployed SHA, health endpoint, partition/extraction behavior, and existing raw readback/search behavior on Monday.
- [ ] Report release SHA and verification results; do not overwrite private acceptance data.
