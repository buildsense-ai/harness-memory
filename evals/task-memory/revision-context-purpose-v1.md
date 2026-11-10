# Context-purpose prompt revision v1

Version: `context-purpose-v1`, approved after the four-reader comprehension
probe. This revision copies both tested drafts without rewriting their content.

Stage 1's embedded `partitionPrompt` matches the approved Stage 1 text, with
only the final file newline omitted. Stage 2's `memory-prompt.txt` is an exact
copy of the approved file. The existing untrusted-data/transport wrappers,
output tool schemas, native-turn candidate assembly, and retries are unchanged.

Approved draft SHA256 (UTF-8, LF, including final newline):

- Stage 1: `514129c3e1bec3e3a7ad84b901dce8fd267d5f780aeaf800036908e8398fa584`
- Stage 2: `a688f211bebfcd798cb3ab24fd36b791bf223936831b144503a5b8af14cbfbe5`

Each query assignment's existing `reason` distinguishes, per thread, primary
material from later corrective/conflicting/result/validation supplements. The
full assigned native turn still enters that thread's candidate Episode; a
supplement can revise a core conclusion without importing another task's whole
narrative. No new schema fields or event pruning are added. Relations remain
an empty array in this experiment.

Both stages preserve assistant statements as historical judgments, suggestions,
explanations, or action reports. Concrete actions, necessary cross-task context,
important failures, corrections, and successful paths must remain readable.
Tool evidence is limited to its actual observation; statements read from a
webpage/file are not automatically verified facts. Stage 2 addresses only
updates/conflicts present in its own candidate and does not invent follow-up
work to independently verify every assistant statement.

## Evaluation

Use the same immutable code/non-code Saturday snapshots and model configuration
as all prior runs: `deepseek-flash`, thinking enabled, `max_tokens: 30000`.
Run from a clean committed checkout on Monday in a fresh private `EVAL_WORKSPACE`.
Save all requests, responses, task assignments, Episode manifests and Markdown.
The existing evaluation wrapper uses a 600-second diagnostic request timeout.

Before accepting output, separately review Stage 1 boundaries, complete coverage,
supplement memberships/reasons and overlap. Then review each Stage 2 document
against its actual candidate, for concrete process/failure coverage, historical
attribution, in-input corrections/conflicts and consistent final states. An
out-of-candidate update is a Stage 1 omission, not a Stage 2 hallucination.
Compare against baseline, broad and narrow runs; do not tune this frozen prompt
after observing results. No private logs or generated documents are published.

## Deployment boundary

This evaluation uses the direct Markdown runner. Production still runs the older
event-selection pipeline; merely updating its service would not enable this
Stage 2. Test the new committed version in an isolated Monday checkout. Do not
merge, switch production releases, or write evaluation memories to production
as part of this experiment. Production rollout follows the existing merge-first
release process once the intended pipeline and acceptance are ready.
