# Task Threads and Evidence-Preserving Episodes

Date: 2026-11-05. Status: implementation authorized by the user in this conversation. This iteration replaces the extraction model described in section 4 of the v1 design; upload, raw-record immutability, project isolation, search, and read behavior remain unchanged.

## Purpose

Turn one uploaded conversation snapshot into a stable, searchable task-thread directory and one evidence-preserving Episode per task thread. The Episode is a set of original event references for later retrieval and future Skill/Wiki work. It is not a model-written summary.

## Stage 1: Task-thread partition

Input contains only standardized human `query` and assistant `message` (`msg`) content from the fixed extraction snapshot. Tool calls and tool results are not sent to the partition model. Every input item retains its immutable event reference and original order.

The model returns standardized JSON with these top-level arrays:

- `task_threads`: `thread_id`, `title`, `desired_outcome`, `include_topics`, `exclude_topics`, and `boundary_note`.
- `query_assignments`: exactly one record for every human query, with `query_ref`, one or more `thread_ids`, `role`, and an optional `reason`. A compound, authorization, or retrospective query may belong to several already-established task threads; this does not merge those threads.
- `relations`: zero or more evidence-backed relations between distinct task threads. Supported directed kinds are `depends_on`, `continues`, and `supersedes`. Each record has `from_thread_id`, `relation`, `to_thread_id`, `evidence_refs`, and `reason`. Direction is literal: `T4 depends_on T1` means T4's result depends on T1. Do not infer an edge from shared project, vocabulary, symptom, proximity, or a compound query alone. Empty is valid. No generic undirected related edge is emitted.

Partition boundaries follow the user's desired result and observable acceptance condition, not symptom or root cause. Merge follow-up clarification, correction, diagnosis, implementation, repair, status, and verification when they advance the same result. Split distinct results that can independently succeed/fail, even if they share symptoms or context. Explicit user boundary corrections take precedence over assistant interpretation.

Structured output is validated for schema, unique IDs, complete query coverage, valid task references, and relation evidence references from the input. Invalid output receives bounded validator feedback and retry; no partial partition is published. Stable references point to immutable uploaded events. Model-generated `thread_id` values are identifiers within this partition; stored references are scoped by extraction run.

The relation list describes task semantics and is retained for future knowledge-document linking. It does not control Episode membership. If a future Wiki/Skill graph uses navigable links in both directions, it may materialize a directed semantic relation as a bidirectional navigation link while preserving the original relation kind and direction as metadata.

## Stage 2: Per-thread event selection

Run one selection call per task thread. Each call receives:

1. The complete task-thread definition from Stage 1.
2. Only that thread's `query_assignments`, including each original query reference, role, and reason. Query text is read from the source event, not copied or rewritten.
3. The complete ordered event list from the same immutable extraction snapshot, including `query`, assistant `message`, `tool_call`, and `tool_result` records with references, timestamps/order, and tool pairing IDs.

Stage 1 assignments are anchors and scope guidance only. They are not a preselection filter: the model sees the full source snapshot and selects relevant events, including relevant events that were not user queries. Other threads' assignments and the Stage 1 relation list are not passed into selection. Episode extraction is thread-internal; cross-thread navigation belongs to the relation/knowledge-document layer.

The selection unit is an event. A stored Episode is one task thread's ordered, possibly discontinuous event selection for this extraction run. The initial implementation creates at most one Episode per thread per run. A selected tool call or tool result always causes its matching partner in the snapshot to be retained; source-missing partners are recorded as missing and never invented. The server attaches the known `thread_id`; the model does not need to echo it.

The model returns standardized JSON containing:

- `event_refs`: selected original event references, without rewritten event content.
- `evidence_coverage`: compact reference arrays for `constraints_and_corrections`, `diagnosis_and_failures`, `decision`, `implementation`, `verification`, and `final_state`. Empty arrays are valid when that evidence is absent in the snapshot. Every listed ref must be selected.

No exhaustive `omitted_material` list is required. Every unselected source event is omitted by definition; the server can derive that set. Acceptance reports may inspect omissions, especially boundary cases, without expanding the production model response. The prompt preserves the request, material constraints/corrections, diagnostic failures that changed the path, the chosen decision, decisive implementation/tool evidence, verification, final state, and unresolved status when recorded. It may drop unrelated events, duplicate evidence, and routine transient errors with no diagnostic or future reference value. An error that explains a root cause, changes the plan, or distinguishes a failed path from the successful path is not routine noise and must remain.

Selection validation checks references, ordering, query-anchor inclusion for all assignments relevant to the thread, tool-pair closure, evidence coverage membership, and output shape. Oversized Stage 1 input uses chronological bisection that does not split tool pairs; task threads discovered in separate Stage 1 chunks remain separate in this iteration. Oversized Stage 2 input is selected chunk by chunk in chronological order, then selected refs and evidence coverage are merged into the single Episode for that task thread; tool pairs are never split. Cross-chunk task merging is not inferred in this iteration.

## Stage 2 acceptance

Evaluate task-thread partition quality separately from event-selection quality. For each Episode, report selected and omitted counts by event kind, anchor coverage, tool-pair closure, overlap across threads, and coverage refs for each evidence category. Human review checks whether the selected original events let a context-free reader understand the task, key failure/correction, successful path, and verification, while omitted events are truly irrelevant, redundant, or transient noise. This is a quality probe, not a claim that one sample proves general accuracy.

## Explicit non-goals

No Skill/Wiki generation, summary rewriting, cross-thread Episode merge, graph traversal, vector retrieval, automatic forgetting, upload changes, compaction hook, or cache-specific behavior is added here.
