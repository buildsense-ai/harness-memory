# Context-purpose-v1: Monday evaluation results

Evaluated commit: `fb3e6ba20826d08a2ce0f4067c062ad300eda0f0`.
Tag: `memory-eval-20261109-context-purpose-v1`.
The approved prompts, runner, model configuration and source snapshots were
frozen before execution. No prompt tuning or output rewriting followed failures.

The isolated Monday checkout completed both samples. Overall: **needs revision**.
Production was not switched, and evaluation Episodes were not registered in the
production database. The live event-selection pipeline was not migrated.

| Sample | Source turns / events | Tasks / candidate Episodes | Candidate source coverage | Extra event memberships / source events | Accepted Markdown |
|---|---|---|---|---|---|
| Code | 10 / 278 | 4 / 4 | 278/278 | 40/278 (14.4%) | 3/4 |
| Non-code | 10 / 72 | 3 / 3 | 72/72 | 20/72 (27.8%) | 3/3 |

Each task has one candidate Episode, assembled from complete assigned native
turns, including tools. Coverage describes those candidates, not successfully
generated documents. Stage 1 saw query/message only; relations were empty.

Source-based manual review found clearer historical attribution and preservation
of some conflicting source statements. The non-code output explicitly identified
one assistant-inferred condition instead of presenting it as a user requirement.
Concrete process and important wrong paths remained readable.

However, Stage 1 failed to assign an explicit later correction back to an earlier
mechanism task, despite full aggregate coverage. Some Stage 1 metadata still
promoted assistant assumptions into hard requirements. Stage 2 retained local
attribution ambiguities and some repeated detail. A lower overlap rate alone
therefore does not demonstrate better memory completeness.

The longest code thread failed all three output attempts. The first HTTP 200
response reached 30,000 completion tokens, including 25,753 reasoning tokens,
and truncated its JSON string. The next two HTTP 200 responses nested the expected
Markdown object inside an `arguments` field; validation rejected both. No accepted
document was created. Mechanically unwrapped diagnostic text is not counted as
successful generation, and no replacement document was invented.

Stage 2 prompt-token totals, including full retries:

| Sample | First attempt per task | All attempts |
|---|---:|---:|
| Code | 199,604 | 496,770 |
| Non-code | 268,375 | 268,375 |

Source pointers, tool pairs, complete candidate assembly, approved prompts, and
accepted-output fidelity passed mechanical checks. All 44 original remote run
artifacts matched their downloaded hashes. These checks do not turn the failed
thread into a pass. Private raw logs, requests/responses, documents and manual
review remain outside Git; aggregate results and artifact hashes are in the
[result manifest](results-context-purpose-v1.json).

[CI on the evaluated commit](https://github.com/buildsense-ai/harness-memory/actions/runs/42588834810)
passed 31 TypeScript tests, 4 Python deployment tests, and the build. Deployment
was skipped. These tests cover product behavior, not long-context semantic quality.

Each version ran once per immutable sample. This is evidence of specific output
behavior, not statistical stability, causal attribution to one prompt rule, or
improved performance on future retrieval tasks. Keep this revision as a draft
evaluation version. Resolve output reliability and important correction membership
before considering a production migration.
