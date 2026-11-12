# Three-layer memory workbench

## Approved experience

Adapt the approved minimal 3D prototype to the Monday memory service. Keep a quiet gray/white interface, soft colored point nodes, three horizontal planes and an orbitable perspective camera. No synthetic density data, folder semantics or semantic edges.

| Layer | Stored identity | Click result |
| --- | --- | --- |
| Wiki | memory_documents.id | Sanitized rendered Markdown, then its source Episode reference |
| Selected context | extraction run + task thread, persisted Episode when published | Complete batch input in source order; Episode members normal, other events faded |
| Batch | extraction_runs.id | Fixed uploaded processing snapshot; adjacent batches of the same session can be read continuously |

Session identity comes from source_id + recorded session_id; if absent, source_id + stream_id is explicitly a fallback. A processing batch may contain several sessions; preserve all memberships rather than invent one. Batch order uses extraction creation time, not a guessed conversation time. All displayed context is uploaded input, not unavailable source-file history.

## Required adaptation

1. Paginated session listing and session metadata on run summaries, including streams with uploaded source but no processing run yet.
2. Context endpoint supports full input with selected flags. Published selection comes from episode_events; unpublished candidates use exactly the generation candidate function, labeled preview. Include source groups, real execution IDs, timestamps and immutable event/raw refs.
3. Lazy batch graph, document and source loading; paginate source reads. Search calls the real AND/OR Markdown API (max 10 deduplicated hits) and loads off-screen hit batches on demand.
4. Pair tool call/results by ID and execution, including across pages; unmatched records remain visible. Collapse tool bodies, never discard them. Distinguish selected Episode from execution/query boundaries.
5. Scope every read by project key. Keep key in page memory only. Disconnection aborts requests, clears graph and reader; late responses cannot restore previous-project content.
6. Show queued/running/partial/failed state, counts and retryable read errors without pretending unpublished memories exist. Load more explicitly; loaded graph is not the entire project.

## Delivery and verification

Preserve existing incremental ingestion changes and frozen extraction prompts. Test transcript pending-input selection against stored membership, pagination, multi-session/source isolation, Markdown sanitization, tools spanning pages, asynchronous selection and batch scroll. Run full PostgreSQL integration and production build. Merge tested commits before Monday deployment; verify deployed SHA and service reads. Collector stays outside this repository.
