# Three-layer memory workbench

## Revision approved 2026-11-13

The visible graph now has two planes: Wiki and conversation batch. Wiki nodes map directly to their source processing batch; task/Episode membership stays in the data and drives the reader without a separate context node.

The reader offers Wiki and conversation source tabs. The source tab shows the full batch in order, with the selected Wiki's persisted Episode members at normal contrast and other input visibly muted. With no Wiki selected, it shows the entire batch normally. Query and message bodies appear as conversation blocks; only a leading speaker annotation is removed for display. Original stored text is unchanged. Timestamps and immutable refs appear at the block's bottom corner on hover or keyboard focus. Continuous tool records collapse into a group, with each call/result still inspectable inside it. Batch banners and quiet conversation boundaries replace visible event/execution IDs.

Source pagination appends to the existing batch, preserves scroll position and open tool sections, and allows continuing to a later loaded batch of the same session. Scrolling updates the selected batch on the graph/sidebar. A focused Wiki is retained independently of that batch selection so returning to the Wiki cannot select a sibling document. Later batches remain unselected for that Wiki. Existing project isolation, filters, extraction prompts and raw-reference semantics are unchanged.

The three-layer description below records the original design; this revision supersedes its visible layers and reader tabs.

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
7. Offer optional upload-Key and processing-date filters. Store the authenticated Key identity on each newly accepted raw record; never expose the secret. Existing records without attribution remain available under an explicit "unrecorded Key" choice. Apply the date range to extraction-run creation time and use the same filters for sessions, batches, and Markdown search results. These filters narrow the view; project-Key authorization remains the access boundary.

## Delivery and verification

Preserve existing incremental ingestion changes and frozen extraction prompts. Test transcript pending-input selection against stored membership, pagination, multi-session/source isolation, Markdown sanitization, tools spanning pages, asynchronous selection and batch scroll. Run full PostgreSQL integration and production build. Merge tested commits before Monday deployment; verify deployed SHA and service reads. Collector stays outside this repository.


## 原始名称和用户筛选

会话名称仅使用日志明确记录的名称或一次性导入的 Cats Company 原始名称；缺失时省略名称，不生成主题。Bot 和用户使用下拉精确筛选，用户选项来自该 Bot 日志里实际出现的 query 发言人，不代表账户认证身份。筛选同时作用于会话、批次和记忆搜索。

同一 Bot 身份与 session_id 的批次跨日志来源归组，按时间排列；无 Bot 身份或会话身份的旧记录回退到来源/流标识。原文、提取输入与提示词不变。已有数据通过 `scripts/workbench-metadata.ts PROJECT_ID [CATALOG_JSON]` 回填展示元数据；原始名称目录按项目隔离，不建立实时外部同步。
