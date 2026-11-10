# Narrow revision evaluation

Evaluated `2d08814e735c6bad55532d1cb23eb2cc971cdf52`, directly based on the
original frozen `dc37e9b` baseline. This does not inherit the broad revision's
prompts. Both immutable Saturday samples were regenerated with the same model,
thinking setting, and 30,000 output-token limit. No model documents were edited.

| Sample | Baseline tasks / extra memberships | Broad revision | Narrow revision |
|---|---|---|---|
| Code, 278 events | 4 / 22 (7.9%) | 3 / 186 (66.9%) | 4 / 118 (42.4%) |
| Non-code, 72 events | 2 / 0 | 3 / 32 (44.4%) | 2 / 0 |

All three runs cover every source query and event in their candidates. The
overlap fraction means extra memberships divided by unique source events,
not generated-text similarity. The narrow code overlap consists of one
necessary correction turn (96 events) and one shared merge/publication turn
(22 events). Complete-turn assembly also imports unrelated material.

Stage 2 input tokens: code 180,409 -> 275,375 -> 231,408; non-code
202,080 -> 302,006 -> 202,525, in baseline/broad/narrow order.

Source-based review: **needs revision**. Stream mechanism correction and
publication recommendation/decision attribution improved. Conditional final
recommendations no longer reproduce the broad run's ranking inconsistency.
However, imported side discussions have stale unresolved states when their
later closure is outside the local candidate. A final code-validation update
still misses its repair task. Some assistant assumptions remain promoted to
hard user requirements; contradictory source specifications are still resolved
by picking one side. One non-code dependency edge is insufficiently conservative.

Mechanical checks pass, including original-byte pointers, full-turn candidate
membership, paired tools, raw model output equality, and Episode manifests.
Both Stage 1 outputs and all six documents passed format validation on their
first attempt. Independent review needed one request for code and two for
non-code (first rejected for an inexact document quote). Human review corrected
reviewer attribution mistakes and did not adopt its overall verdict blindly.

CI for the evaluated commit passed 31 tests with PostgreSQL, the TypeScript
build, and 4 Python deployment tests. Production remains on `8f1b403`; no merge,
production-memory writes, or deployment occurred. Episode IDs are private
evaluation references, not registered production API records.

Each revision has one stochastic run per sample, not an ablation or stability
estimate. No downstream retrieval or task-completion improvement was measured.
Full private inputs, outputs, review, and report remain in the evaluation
workspace; [the result manifest](results-20261109-narrow.json) records their
hashes without publishing conversation content.
