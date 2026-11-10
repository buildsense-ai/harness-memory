# Effort and temporary-evidence probe, 2026-11-10

Decision: retain the frozen hybrid-v1 Markdown prompt. Explicit max remains the
requested setting for future active model calls; the evidence scaffold is not
accepted as a replacement. This evaluation does not merge or deploy the branch.

## Method and fidelity

Seven frozen Stage 2 candidates: five engineering tasks, two non-engineering
tasks. Stage 1 was not rerun. Its assignments, source event contents, original
user request strings and Episode IDs remained unchanged. All candidates include
their original tools. Primary run revision: `05da312`; supplemental run: `2e54478`.

Fresh high and max use identical hybrid-v1 system/tool/input; only effort differs.
The evidence arm appends a small source-excerpt task and adds support_notes before
markdown. Auxiliary excerpts are never persisted into final memory documents.
All arms use deepseek-flash with thinking enabled, a 60,000 output-token budget,
three workers and at most three format attempts. No additional model review.

Private audit confirmed identical source bytes, initial messages and schemas,
including failed/retry requests; raw accepted Markdown plus mechanical Episode
footer matched saved documents. Evidence quotes were independently revalidated.
No missing fields or document bodies were invented. Remote/local SHA-256 matched
all 116 primary and 14 supplemental result files.

## Generation results

Cells show Markdown characters / attempts. Length is not a quality score.

| Case | Events | high | max | max + evidence |
|---|---:|---:|---:|---:|
| Engineering T1 | 49 | 5970 / 1 | 8298 / 1 | 6163 / 3 |
| Engineering T2 | 22 | 7468 / 1 | 7654 / 1 | 7976 / 1 |
| Engineering T3 | 215 | 8580 / 1 | 7614 / 3 | 5821 / 2 |
| Engineering T4 | 42 | 7795 / 1 | failed / 3 | 5434 / 2 |
| Engineering T5 | 120 | 4143 / 1 | 2047 / 1 | 2380 / 2 |
| Non-engineering T1 | 32 | 4794 / 1 | 9824 / 1 | 7397 / 1 |
| Non-engineering T2 | 52 | 8357 / 1 | 9819 / 1 | 7633 / 2 |

High completed 7/7 on first attempts; max completed 6/7, 5 first-attempt;
evidence completed 7/7, 2 first-attempt. Total requests: 7/11/13 respectively.
All-attempt completion tokens including reasoning: 51,820 / 349,730 / 311,411.
Cache-hit differences prevent treating latency differences as pure effort effects.

## Source-based semantic review

- T1: all preserve the main implementation/test path. More thinking did not
  establish a material correctness gain.
- T2: max and evidence better distinguish default streaming from explicit falsey
  requests and conflicting code-version observations. Fresh high also improves
  over historical output, so improvement cannot all be assigned to effort.
- T3: high and max preserve an important correction about fallback behavior;
  evidence omits it even though it is in the fixed input. Evidence is better at
  distinguishing mock/unit verification from end-to-end scope. Main repair,
  mistaken diagnosis, retraction and final unmerged status survive in all arms.
- T4: evidence distinguishes assistant recommendation from user decision and
  helper-function tests from real end-to-end validation. Primary max fails the
  required output contract; an offline recovered inner document is diagnostic,
  not an accepted memory.
- T5: max/evidence stay more focused; all retain the identifying names. This is
  mostly organization rather than a correctness breakthrough.
- Non-engineering T1: max/evidence better retain missing user prerequisites,
  unconfirmed device details and source disagreements. Some source interpretation
  still goes beyond what the candidate establishes, and some conflicts remain.
- Non-engineering T2: all three still turn a conditional scenario into a decided
  user state. Evidence copied the condition but another note and the body still
  promote it. Assistant-added screening criteria also remain insufficiently
  separated from long-term user requirements. Actual purchase/arrival is not
  invented, and several explicit user corrections are retained.

The frozen Stage 1 metadata itself contains an overstrong condition in the last
case. This experiment tests Stage 2 with that same input, not the separate causal
contributions of metadata and repeated historical assistant assertions. Excerpt
validity is not semantic entailment or completeness.

## Failures and separate budget follow-up

Max T3/T4 first responses reached 60,000 completion tokens, with 56,879/57,924
reasoning tokens; tool JSON was truncated. T3 then omitted the required tool and
succeeded on attempt three. T4 omitted the tool, then wrapped its complete body
inside an additional arguments string; it remained rejected after three attempts.
Evidence added six retries for non-exact quotes or excerpt ordering. That order
constraint is not essential to the final document and is a candidate for removal
if this scaffold is studied again; it was not changed mid-experiment.

Separate identical-input max replays at 131,072 tokens:

- T3: two attempts, 8067 characters; first response placed a complete body in
  ordinary content, not the required tool; retry passed. No truncation.
- T4: one attempt, 7855 characters; completion 34,123 including 30,300 reasoning.
  No truncation; recommendation/user decision and verification scope are clearer.

Neither supplemental response exceeded 60K in actual usage, so success does not
establish that the larger cap caused improvement. Preserve the original failure.
DeepSeek currently documents 128K as the default budget for max:
https://api-docs.deepseek.com/api/create-chat-completion/

Production still has its prior deployment and an explicit 4096-token environment
setting. A later max deployment must align output budget with the evaluated route;
this experiment did not change the live service configuration. Current general
evaluation scripts remain at 60K; only the labeled supplement used 128K.

## Limits and next experiment

This is one generation per case/arm, on known tuning examples, not a reliability
estimate or proof of downstream task improvement. Keep max as requested, preserve
hybrid-v1, and do not adopt the evidence scaffold globally. A narrower subsequent
experiment could clarify that task metadata determines scope, not proof of user
decisions, and that assistant progression under an assumption is not user consent.
That proposed change has not been implemented or tested here.

Private report, raw requests/responses and all full documents remain outside Git:
`artifacts/memory-effort-evidence-20261110` and
`artifacts/memory-effort-budget-20261110` in the task workspace.
Server manifest SHA-256 values:

- Primary: `27aa461f8ea5f4a4ddee2e51bfb4724cbc19e58232b0e036292ce42c013c3595`
- Supplemental: `e26919f15bf4c686a7a5ec224273acf52d04ed2acd26d0faddd19c0ca9fcb17e`

These private manifests list individual immutable result hashes; do not publish
conversation text, request traces, source identifiers or generated documents.
