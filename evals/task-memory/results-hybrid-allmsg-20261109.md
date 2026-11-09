# Frozen baseline partition + current Markdown generation

The recommended hybrid was freshly evaluated on the same two immutable native snapshots as `results-full-allmsg-20261109.md`. Stage 1 used the exact frozen baseline system prompt; Stage 2 used the exact frozen current system prompt. No prompt was tuned during this run.

Both partitions and all seven documents completed. This is one new sample per source, not a stability benchmark or a controlled Stage 2-only ablation.

| Sample | Public queries + messages at Stage 1 | Full source events | Tasks / documents | Unique candidate coverage | Shared source events | Extra memberships | Markdown body characters |
| --- | --- | ---: | --- | --- | ---: | ---: | ---: |
| Code | 12 + 56 | 326 | 5 / 5 | 326/326 | 122 | 122 | 32,417 |
| Noncode | 10 + 22 | 84 | 2 / 2 | 84/84 | 0 | 0 | 15,698 |

Each task was expanded to one candidate Episode containing its complete assigned original aggregate turns, including tools and every public message. The code candidates covered turns `[1]`, `[2,4]`, `[3,4,5,6,7,8]`, `[9,10]`, and `[3]`; the noncode candidates covered `[1,2,3]` and `[4,5,6,7,8,9,10]`. A merged candidate can span multiple noncontiguous original turns. Relations were ignored during expansion.

The code overlaps were two events in turn 4 and 120 events in turn 3. The latter came from expanding a small interleaved identification request to its entire tool-heavy aggregate turn. The resulting identification document stayed on topic. Lower duplication than the previous baseline run is sampling variation under the same partition prompt, not evidence of a newly improved partition rule.

## Content review

The hybrid is a reasonable iteration baseline: its tasks kept broader result chains together, and current Markdown generation retained detailed work paths while distinguishing assistant reports, source claims, direct checks, and user acceptance. A previously missing personal-constraint correction was retained by keeping its whole selection task together. A previous unsupported ownership claim did not recur in the new output; that single observation does not establish systematic speaker-attribution correctness.

Three issues remain material:

1. A repair task's description explicitly mentioned merge/deployment verification, but its actual query assignments stopped before those updates. The resulting repair memory ended pending deployment although the later publishing memory contained the update. Aggregate coverage therefore still does not imply complete per-task history.
2. A mechanism-explanation candidate now included a later correction, but its final conclusion still repeated an older incompatible claim. Both missing context and generation's handling of old tool evidence versus later correction contributed.
3. A hypothetical user condition became an adopted constraint. This strengthening already appeared in Stage 1 metadata and was reinforced by Stage 2. Concrete descriptions should retain source, chronology and conditionality rather than becoming uniformly vague.

A publishing memory also overstated service-level verification in one passage: service/file timestamps plus a separate direct function check were described as verification inside the running process. Other passages correctly limited the check to a non-network function test and left real end-to-end validation pending.

These findings support improving assignment/update consistency and attribution/conditionality before adding more processing stages. They do not establish that the hybrid is universally best.

## Live format retries

- Code partition and all five code documents passed on the first submission.
- Noncode partition: invalid argument JSON, then an extra root wrapper. The second rejection reported all 14 detected structural/reference issues and the allowed query refs. The third submission passed.
- One noncode memory was initially ordinary message content instead of the required tool call. Feedback produced a valid second submission with a byte-identical Markdown body.
- The other noncode memory passed on its first submission.

All 12 actual requests used `deepseek-flash`, enabled thinking, and `max_tokens: 60000`, with at most three format attempts. No response ended due to length. No wrapper recovery, field synthesis, ID substitution, event-pruning call or extra model review was used.

## Verification and runtime provenance

- Stage 1 input payloads matched both prior variants byte for byte; source and frozen prompt hashes matched the intended composition.
- Candidate event content matched the immutable native ordered context and assigned query anchors.
- Model/output-validation module hashes matched the prior full comparison.
- All 41 remote result-file hashes matched local copies.
- Runtime checkout base: `0d2c554`; the variant-selectable runner from `61e2c46` was copied over that checkout. Its SHA-256 was `661eea33aa4421d920bb4267f9a1a562480d843bea066137019b3caf7b927eea`, matching the local committed runner. This was not a clean checkout of `61e2c46`.
- Monday execution was isolated under `/tmp/hmemory-hybrid-allmsg-20261109`. No production service, uploader or database was changed.
- Private inputs, full requests/responses, real Markdown documents, detailed source review and audit manifests remain outside the public repository.
