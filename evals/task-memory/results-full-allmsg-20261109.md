# Frozen baseline/current pipelines with all public messages

Both frozen prompt versions were freshly run through partitioning and direct Markdown generation, using the same native snapshots and the output validation/retry implementation from `417e94b`. Runner revision: `0d2c554`.

All 4 partitions and 17 documents completed. These are single runs per version/sample, not a stability benchmark or a validated retrieval evaluation.

| Version / sample | Stage 1 query + message | Full source events | Threads / documents | Unique coverage | Events shared by multiple candidates | Extra memberships |
| --- | --- | --- | --- | --- | --- | --- |
| Baseline / code | 12 + 56 | 326 | 5 / 5 | 326 | 177 | 177 |
| Current / code | 12 + 56 | 326 | 6 / 6 | 326 | 171 | 411 |
| Baseline / noncode | 10 + 22 | 84 | 2 / 2 | 84 | 0 | 0 |
| Current / noncode | 10 + 22 | 84 | 4 / 4 | 84 | 26 | 26 |

Extra memberships count each assignment beyond an event's first; they can exceed source size when the same event appears in more than two candidates. Coverage means candidate membership, not semantic recall in generated documents.

## Controlled inputs

- Stage 1 receives every public user/assistant text in native order, including two interleaved code queries missing from the aggregate log. No tool records or hidden reasoning are exposed there.
- Stage 2 expands assigned queries to the union of complete original aggregate turns, with every native public message and all recorded tool calls/results. Each thread becomes one offline candidate Episode. No event-pruning call or additional model review is added.
- Native tool order is preserved. Calls are matched exactly against aggregate call content; result text blocks are compared against their existing text projection while retaining native content and byte pointers. All aggregate tools must match exactly once.
- Each version uses its historical full system messages for both stages. Model configuration is identical across all 24 actual requests: `deepseek-flash`, enabled thinking, `max_tokens: 60000`, maximum three format attempts.
- Candidate expansion ignores relations. The current prompt requests empty relations; the frozen baseline can still emit them.
- Markdown bodies are preserved from validated model submissions; Episode references are appended mechanically. Evaluation Episode IDs are not registered in production.

## Live retry outcomes

- Baseline/code partition: one extra property; second submission removed only that property.
- Current/code partition: two incorrectly copied query IDs. One feedback response reported all six resulting issues (two unknown refs, two missing assignments, two unassigned threads), with the allowed query refs. Second submission changed only those IDs, ignoring JSON key order.
- Current/noncode model-selection memory: first response contained the Markdown as ordinary message content instead of the required tool call. Explicit missing-tool feedback produced a valid second submission with a byte-identical body.
- The other 16 memory documents and both noncode partitions passed on the first attempt. No arbitrary wrapper extraction, field synthesis, ID substitution or manual repair was used.

## Source-based review

Current Markdown generation more clearly distinguishes assistant reports, direct tool checks, external source claims and user acceptance, while retaining concrete implementation and failed/correct paths. A merge/deployment update was included in the current repair candidate that the baseline repair candidate missed.

However, neither partition returned a later correction to an earlier mechanism-explanation task. Current also separated diagnosis from implementation, leaving a diagnosis document awaiting a decision already present in another task; its publishing candidate omitted a user decision, and its product-selection candidate omitted an answered personal constraint. These omissions produced concrete obsolete or unnecessary pending states. Complete aggregate coverage did not prevent per-task gaps.

Both versions still had residual conditional/speaker attribution issues: a hypothetical scenario became an adopted constraint, and an assistant's statement about user-owned equipment was repeated without sufficiently clear attribution. Current documents were longer (code 40,152 vs 22,016 characters; noncode 21,199 vs 9,137), which is not itself evidence of better memory quality.

The result supports the retry fix and improvements in the current generation prompt, but does **not** establish that the current end-to-end pipeline is better overall. No further prompt changes were made during this comparison.

## Verification and artifacts

- Build and 26 targeted output/input tests passed; CI for runner revision passed.
- Same-sample Stage 1 input payload hashes matched across versions. Candidate events were checked against the immutable native context and assignment anchors.
- All 97 remote result-file hashes matched local copies.
- Full inputs, requests/responses, partition JSON, Markdown, detailed Chinese review and SHA manifest remain outside the public repository under the private evaluation artifacts. No source conversations were committed.
- Monday execution used `/tmp/hmemory-full-allmsg-20261109`; production service, uploader and database were unchanged.
