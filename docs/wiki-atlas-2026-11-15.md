# Wiki atlas and source navigation

The canvas contains Wiki memories only. Source provenance belongs in an expandable Bot → user → session → batch tree, with the existing Markdown / conversation reader on the right. A batch is a model-processing snapshot, not an HTTP upload request.

## Two-dimensional layout

The workbench uses a single two-dimensional layout, with pan and zoom. A white canvas shows solid circular Wiki nodes. Provenance is packed from the inside out: batch → session → user. Collision-based circle packing separates siblings and reserves space around each parent. Nested, lightly outlined circles show the three source levels; labels appear as zoom provides enough room. The renderer reuses Three.js and collision-culled Wiki labels; `d3-force-3d` runs in two-dimensional mode only during packing. Once packed, source selection never changes node membership, positions or camera. No semantic edges are synthesized or persisted.

These options were informed by the official [3d-force-graph](https://github.com/vasturiano/3d-force-graph), [d3-force-3d](https://github.com/vasturiano/d3-force-3d), [Sigma GPU ForceAtlas2 example](https://www.sigmajs.org/embed/core/fa2-gpu-layout/) and [Cosmos](https://github.com/cosmosgl/graph) projects. Replacing the renderer is unnecessary for the current dataset; larger datasets would justify measuring a worker or GPU layout separately.

## Source selection

- Selecting Bot/user/session/batch highlights the corresponding memories inside the complete loaded graph. All other Wiki nodes retain their original color, opacity and position. Shared batches produce one Wiki node per memory ID. Selected sources receive larger solid points, blue outline rings and stronger labels. The currently read Wiki has a dark ring; keyword hits have gold rings.
- User attribution is taken from the batch's own raw-record metadata. A historical participant is not attributed to a batch where their name was not recorded.
- Session identity survives daily file / source changes using the recorded Bot and session identity. Only original session names are shown as names. Unnamed sessions have a receipt-date label, with identity available on hover.
- A Wiki single-click reads Markdown, expands the corresponding source paths and highlights matching batches while preserving the tree's scroll position.
- A double-click additionally scrolls to the preferred matching source path, choosing the current scope when a batch has several paths. It does not change the scope.
- Search uses the real Markdown search endpoint across all memories eligible under the explicit Key/date filters, independently of source highlighting. Search results highlight nodes rather than hiding the rest. The ten-document search result limit remains. Neither search nor source selection constructs semantic edges.
- Original conversation display remains based on the saved Episode membership: unselected context is faded, tools are collapsed, and source references remain intact.

## Verification

Focused tests cover source grouping, shared membership, unattributed records, empty sessions, chronological batches, finite separated layout coordinates, deterministic result ordering, nested containment and sibling separation. Database tests cover the actual run-participant SQL and scoped search, including empty scope, invalid IDs and foreign-project IDs.

The initial version's read-only preview against Monday's data verified 19 sessions, 23 batches and 42 Wiki memories. Selecting the `ty` user showed 7 batches / 11 Wikis; selecting “单字教学视频剪辑” showed 2 batches / 3 Wikis. Selecting one batch showed 1 Wiki and its real conversation. A graph single-click kept the source-tree scroll position at 656.67 px even when its highlighted batch was above the viewport; a double-click brought that batch into view. The original source reader retained collapsed tool groups. Counts describe the observed dataset, not fixed product assumptions.

A subsequent interaction correction keeps all 42 Wiki nodes when a source is selected; the earlier subset counts describe matched memories, not visible graph membership. The 3D modes were removed. This behavior is verified in the real browser before publishing.

The current workbench loads sessions and batches in pages and labels additional available batches. It is not an all-at-once renderer for an unbounded graph. No ingestion, extraction prompt, stored memory or semantic-edge generation changes are part of this feature.

## White provenance clusters (2026-11-16)

The graph groups all Wikis from a processing batch together, batches from one session inside a larger circle, and sessions by their recorded user identity scoped to Bot. A multi-participant session belongs to one shared participant-set group so that it is never split or duplicated. Multi-session task memories retain a combined session group rather than being silently assigned to the first session. These visual groups do not change the sidebar’s exact per-batch attribution or create semantic edges. The current dataset preview showed 43 Wikis, 24 batch groups, 18 populated sessions and 3 user groups. The 19th session had no Wiki and remained in the sidebar. Selecting ty highlighted 11 Wikis while all 43 nodes and all group positions remained unchanged.
