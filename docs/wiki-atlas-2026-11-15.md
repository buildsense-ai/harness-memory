# Wiki atlas and source navigation

The canvas contains Wiki memories only. Source provenance belongs in an expandable Bot → user → session → batch tree, with the existing Markdown / conversation reader on the right. A batch is a model-processing snapshot, not an HTTP upload request.

## Layout choices

| View | Arrangement | Interaction |
| --- | --- | --- |
| 2D map, default | Source-session anchors, repulsion and collision | Pan and zoom; readable overview |
| 3D clusters | The same anchors at different depths | Orbit, pan and zoom; inspect source clusters |
| Sphere | Fibonacci-sphere anchors, repulsion and collision | Orbit a spherical distribution |

The renderer reuses Three.js, with soft point sprites and collision-culled labels. `d3-force-3d` provides the layout simulation. Simulation settles and stops; selecting a memory does not restart it. Coordinates are cached separately for each layout. No semantic edges are synthesized or persisted. Distance and color indicate the display arrangement / source session, not semantic similarity.

These options were informed by the official [3d-force-graph](https://github.com/vasturiano/3d-force-graph), [d3-force-3d](https://github.com/vasturiano/d3-force-3d), [Sigma GPU ForceAtlas2 example](https://www.sigmajs.org/embed/core/fa2-gpu-layout/) and [Cosmos](https://github.com/cosmosgl/graph) projects. Replacing the renderer is unnecessary for the current dataset; larger datasets would justify measuring a worker or GPU layout separately.

## Source selection

- User and session scopes include their loaded processing batches; batch scope includes that one snapshot. Shared batches produce one Wiki node per memory ID.
- User attribution is taken from the batch's own raw-record metadata. A historical participant is not attributed to a batch where their name was not recorded.
- Session identity survives daily file / source changes using the recorded Bot and session identity. Only original session names are shown as names. Unnamed sessions have a receipt-date label, with identity available on hover.
- A Wiki single-click reads Markdown, expands the corresponding source paths and highlights matching batches while preserving the tree's scroll position.
- A double-click additionally scrolls to the preferred matching source path, choosing the current scope when a batch has several paths. It does not change the scope.
- Search uses the real Markdown search endpoint, restricted to the selected scope before the ten-document limit. Key/date filters remain available. Searches and scope selections do not construct semantic edges.
- Original conversation display remains based on the saved Episode membership: unselected context is faded, tools are collapsed, and source references remain intact.

## Verification

Focused tests cover source grouping, shared membership, unattributed records, empty sessions, chronological batches, finite separated layout coordinates and cached positions. Database tests cover the actual run-participant SQL and scoped search, including empty scope, invalid IDs and foreign-project IDs.

A read-only preview against Monday's data verified 19 sessions, 23 batches and 42 Wiki memories. Selecting the `ty` user showed 7 batches / 11 Wikis; selecting “单字教学视频剪辑” showed 2 batches / 3 Wikis. Selecting one batch showed 1 Wiki and its real conversation. A graph single-click kept the source-tree scroll position at 656.67 px even when its highlighted batch was above the viewport; a double-click brought that batch into view. The original source reader retained collapsed tool groups. Counts describe the observed dataset, not fixed product assumptions.

The current workbench loads sessions and batches in pages and labels additional available batches. It is not an all-at-once renderer for an unbounded graph. No ingestion, extraction prompt, stored memory or semantic-edge generation changes are part of this feature.
