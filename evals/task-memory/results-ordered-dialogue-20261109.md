# Stage 1 with every recorded public message

The input change is useful and source-faithful, but it did not resolve the
previous correction-assignment problem. This is a Stage 1 experiment only;
no Stage 2 generation or production migration was performed.

## Controlled comparison

Monday ran the current frozen prompt first, then the original
`memory-eval-20261108-baseline` prompt, on identical ordered inputs. Both used
`deepseek-flash`, `thinking: {type: "enabled"}`, a 60,000-token output limit,
the same output tool schema, validator and existing three-attempt retry loop.
Neither system prompt was edited. The baseline still permits task relations;
the current prompt fixes them to `[]`. Relations were not used for review or
candidate expansion.

The evaluated runner/builder are at `aaec587`; `45239b1` only adapts its tests
to the repository's Vitest suite and removes an unused import. Its CI passed:
https://github.com/buildsense-ai/harness-memory/actions/runs/42618611472

The XiaoBa aggregate upload records retain only the final assistant response.
For this experiment, frozen native session files from Saturday supplied every
recorded public user/assistant text within the exact original sample bounds.
All original query and final-response anchors matched verbatim. Native byte
pointers, chronological order, prompt identity and equal request payloads
were checked. Tools, hidden reasoning, injected/checkpoint records and later
conversation were excluded from Stage 1 input.

| Sample | Previous input | Ordered input |
| --- | --- | --- |
| Development | 10 queries + 10 final messages | 12 queries + 56 assistant messages |
| Non-development | 10 queries + 10 final messages | 10 queries + 22 assistant messages |

The two additional development queries are genuine interleaved questions
about the skill's name and identity, omitted as separate queries in the old
aggregate logs. Consequently this is not a strict assistant-message-only
ablation. Historical runs also used 30K rather than the current 60K budget.
Each prompt/sample has one fresh partition trial; retries are not independent
replications. Do not infer stable superiority or causal effects from counts.

## Transport results

| Prompt | Development | Non-development |
| --- | --- | --- |
| Current | Failed all 3 attempts: unknown query references | Passed first attempt; 3 tasks |
| Original baseline | Passed first attempt; 5 tasks | Passed first attempt; 4 tasks |

Current/development copied an `evt_dialogue_...` query reference as
`evt_probe_...`. The first two attempts contained one such error; the third
contained two. The existing tool error only reported
`assignment references unknown/non-query event`, without identifying the
offending reference. This was neither JSON truncation nor budget exhaustion.
No invalid partition was accepted, manually corrected or silently normalized.

A separately recorded **single diagnostic format repair** continued the last
response, supplying the actual invalid and permitted query references in the
tool error. The frozen system prompt, schema and 60K/thinking settings were
unchanged. It passed production validation in 8.9 seconds. A field comparison
verified that only the two `query_ref` values changed: task descriptions,
assignments, reasons and relations remained identical. This is evidence for
more specific retry feedback on this failure, not proof of general recovery.
That retry enhancement is not integrated into the product.

## Actual development partitions

Numbers below identify the original ten aggregate turns. The interleaved
name questions belong to original turn 3. Event counts include original
tools for the eventual candidate, although Stage 1 did not read tool content.

| Prompt | Task | Original turns | Original events |
| --- | --- | --- | --- |
| Current, diagnostic repaired | 实测最新生图 skill（image-generation 1.0.2）是否可用 | 1, 2 | 56 |
| Current, diagnostic repaired | 排查并修复第三方生图 400（unsupported_parameter/stream）：relay 严格 marker + skill stream:false | 3–9 | 202 |
| Current, diagnostic repaired | 确认生图 skill 的名称与身份 | 3 | 96 |
| Current, diagnostic repaired | 处理 skill 发布预检卡住与是否手动上传 zip 的决策 | 9, 10 | 42 |
| Original baseline | 实测 image-generation 1.0.2 生图 skill 并验收其可用性 | 1 | 38 |
| Original baseline | 查证 skill→relay→上游三段的流式/非流式默认行为 | 2 | 18 |
| Original baseline | 定位并修复他人遇到的 400 unsupported_parameter(param: stream) 无法生图问题 | 3–9 | 202 |
| Original baseline | 解决 image-generation 1.0.3（stream:false）发布预检被拒并决定分发方式 | 9, 10 | 42 |
| Original baseline | 确认自有生图 skill 的名称与发布 id，区分同名技能 | 3 | 96 |

Both valid outputs cover all 12 query anchors and all ten original turns.
Each task would receive one assembled candidate Episode, not one Episode per
event. Counts here describe candidate assembly; no Stage 2 ran.

Both have 118 extra memberships / 278 original events = **42.4%**.
With newly exposed dialogue included, both have 142 / 326 = **43.6%**.
These are extra-membership ratios, not percentages of events dropped.
Most duplication comes from expanding the small naming question to its entire
original aggregate turn: 96 original events, or 120 with full dialogue.
The remaining shared turn 9 contains both the repair's merge result and the
publication problem. Naming is a supported request; the large expansion is a
material-granularity limitation, not evidence that all those events are about
naming. Invalid original attempts have no accepted candidate set and must not
be reported using the diagnostic repair's success statistics.

## Actual non-development partitions

| Prompt | Task | Original turns | Original events |
| --- | --- | --- | --- |
| Current | 换机时机判断与现用 vivo Y78+ 是否该换 | 1, 2 | 22 |
| Current | 2400 元内 12/16+512 机型筛选与红米 Turbo 5 / 5 Max 抉择 | 1–3 | 28 |
| Current | 蓝牙耳机形态选择（半入耳/夹耳/挂耳/头戴）与 250-350 元耳夹式选型 | 4–10 | 44 |
| Original baseline | 判断 vivo Y78+ 是否该现在换机（2400 预算、12/16+512 需求） | 1, 2 | 22 |
| Original baseline | 2400 元内定机型：红米 Turbo 5 标准版 vs Turbo 5 Max | 3 | 6 |
| Original baseline | 确定耳机形态与需求优先级（耳夹/挂耳/头戴/半入耳ANC） | 4–9 | 38 |
| Original baseline | 耳夹式耳机具体型号推荐与到货验证方案 | 10 | 6 |

Both cover all ten query anchors and original turns. Current overlap is
22 / 72 = **30.6%**, or 26 / 84 = **31.0%** including intermediate messages.
The shared phone turns establish both whether to replace and what to buy;
this overlap has a content-based justification. Baseline overlap is zero,
but its model-selection candidate omits the earlier budget/requirements and
its final earphone-recommendation candidate omits the preceding user needs.
Metadata paraphrases are not substitutes for source candidate inclusion.

## Source-based semantic review

- Both development outputs preserve diagnosis, implementation and most
  corrections inside the repair task. The naming request now has an explicit
  source anchor. Current non-development keeps the earphone discussion and
  changing recommendations together, which fits a future historical memory.
- The key development correction is **still not assigned back** to the
  earlier explanation: current T1 retains turn 2's stale relay/stream claim
  but not turn 3's retraction; baseline T2 does the same. The old final reply
  already contained that correction. Missing intermediate messages therefore
  cannot fully explain the previous failure.
- Both repair candidates still omit turn 10's final production-code 6/6
  verification. Turn 9 already reports merge/deployment, so this loses an
  additional validation update, not the entire successful repair path. No
  paid post-deployment end-to-end test should be inferred from that 6/6 check.
- The explicit retraction of fabricated `grp_6619` history in turn 4 remains
  inside both repair candidates. Current assignment text recognizes it as a
  retraction. This is preserved evidence, not independent fact verification.
- Current non-development metadata still calls APP/EQ and multipoint support
  "hard conditions", although those were assistant-proposed criteria. It also
  describes the user's conditional no-subway scenario as an actual change of
  requirement. Baseline promotes 16+512 into a preference although the user
  allowed 12 **or** 16, and has the same conditional/criterion risks. Full input
  did not solve speaker and commitment attribution.

Keep all recorded public messages as the input contract. The remaining high
impact issues concern assigning explicit corrections back to affected tasks,
retaining conditions/speakers in metadata, and making ref-validation feedback
actionable. Do not conclude that either prompt is ready for rollout from this
experiment. Larger overlap is mainly explained by the previously omitted
naming request and coarse source-turn assembly, so a blanket overlap penalty
would be misleading.

## Traceability and deployment boundary

The adjacent JSON manifest records exact inputs/prompts, every attempt's
status and token usage, per-task memberships, historical comparisons and
private artifact hashes. Sixteen remote artifact files matched downloaded
bytes. Raw conversation, complete requests/responses and the full source-based
report remain outside Git in `artifacts/stage1-all-messages-20261109`.

The eval input builder is committed; the production XiaoBa uploader remains
aggregate-only and cannot reconstruct intermediate messages that it never
uploaded. A future capture change must retain native public messages rather
than pretend old final-only logs contain them. Monday production was checked
active at release `8f1b4033139611aebf6fb9026a07b4008686c632`. Merge-first
deployment policy remains in force.
