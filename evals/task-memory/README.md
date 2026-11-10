# Direct task-memory evaluation

The selected all-message iteration baseline is now frozen as
[`hybrid-allmsg-v1`](versions/hybrid-allmsg-v1/README.md), with exact prompts,
output schemas, parameters and source/result hashes. Its tag is
`memory-eval-20261109-hybrid-v1`. See its result review for remaining semantic
limitations; this anchor does not deploy or migrate the production pipeline.

From November 10, active product model requests and current all-message/fixed
evaluation runners explicitly set `reasoning_effort: "max"` with thinking enabled.
Frozen historical tags/manifests and original reproduction scripts are unchanged.
The [effort/evidence probe](effort-evidence-v1.md) replays the same seven Stage 2
candidates with a fresh explicit-high control, max, and max plus temporary source
excerpts. Its high arm is only a comparison control. Evidence notes are private
evaluation artifacts; final memory still contains only Markdown and an Episode
reference. This change does not accept the failed faithful-record prompt or
deploy the direct-Markdown evaluation route.

The [completed effort/evidence comparison](results-effort-evidence-v1.md) records
all seven cases per arm and the separate 128K budget follow-up. Max had local
semantic improvements but did not solve conditional-to-decision promotion;
temporary evidence also introduced retries and an important omission. The
hybrid-v1 prompt remains the baseline.

This directory freezes the actual two-stage experiment used on 2026-11-08:

1. The repository's `CompatibleChatModel.partition` reads query/message only.
2. The runner collects complete native turns for each query assignment and
   directly generates a Markdown memory, without the older event-selection stage.
3. A local Episode manifest anchors each document to immutable source bytes.

The production service still has its previous Episode-selection pipeline. These
scripts exercise the agreed direct-Markdown route separately; they do not deploy
it or insert test documents into the production database.

## Baseline provenance

`baseline-manifest.json` records the product commit, exact script hashes, prompt
hashes, immutable sample hashes, and hashes of all saved intermediate/results.
The four scripts are byte-for-byte copies of the actual local experiment. The
private logs, complete requests/responses, and generated documents stay outside
Git; their hashes make the historical run verifiable without publishing them.

Baseline tag: `memory-eval-20261108-baseline`. Product base:
`8f1b4033139611aebf6fb9026a07b4008686c632`.

## Reproduce the baseline

Build that tagged checkout with `npm ci && npm run build`. Copy the four scripts
to a private working directory together with the exact `code.raw.jsonl` and
`noncode.raw.jsonl` matching the manifest. Set `PROBE_REPO` to the tagged checkout
and configure `MODEL_BASE_URL`, `MODEL_API_KEY`, and `MODEL_NAME` in the environment.
Run `node run-validation.mjs`, then `node review-validation.mjs`, then
`python verify-validation.py` in that directory. No API keys are written to the
request traces. Model-generated results may vary between runs; the manifest
identifies the historical run, not a promise of deterministic generation.

The baseline Markdown prompt is extracted by the original runner from
`original-direct-probe.mjs`. That older probe is retained solely to preserve the
exact prompt source; `run-validation.mjs` is the evaluation entry point.

The Python verifier checks source pointers, candidate membership, tool pairing,
raw response fidelity, and Episode references. Semantic review additionally
compares the documents with the complete original events. Mechanical checks do
not establish semantic correctness or downstream task success.

## Current experiment: context-purpose-v1

See [the frozen revision notes](revision-context-purpose-v1.md) for the approved
prompt hashes and evaluation boundary. The runner still uses the repository's
Stage 1 and the adjacent `memory-prompt.txt` for direct Markdown generation.
It retains all assigned native turns, including tools, and appends one local
Episode reference. Use a fresh `EVAL_WORKSPACE`; the runner refuses to overwrite
an existing provenance record. This experiment is not a production pipeline
migration or instruction to deploy an unmerged branch to the live service.

The [completed Monday evaluation](results-context-purpose-v1.md) records six
accepted documents out of seven, an output-format failure, and remaining source
fidelity issues. This revision is not marked semantically accepted for production.

The current runner requests a 60,000-token output limit for both processing
stages. The frozen November 9 context-purpose results above used 30,000; their
historical manifests and tag remain unchanged. Increasing this limit does not
change prompts, inputs, validation, or format-retry behavior.

A [single-candidate replay](results-context-purpose-60k-replay.json) of the
previously failed task succeeded on its first request at the new limit. It used
9,335 completion tokens (5,331 reasoning), so one successful random replay does
not establish that the higher budget caused success. Stage 1 was not rerun.
An offline probe recovered the two complete, incorrectly wrapped old responses
without rewriting their bodies; that fallback has not been added to the pipeline.

## Ordered public dialogue input

`ordered-dialogue.mjs` recovers every recorded public user/assistant text in
native order from a frozen XiaoBa context file, matching the original sample's
exact query/final-response anchors and preserving byte provenance. Tools and
hidden thinking are excluded. Existing aggregate upload logs alone do not
contain the missing intermediate text.

`run-stage1-dialogue.mjs` compares the frozen current and original Stage 1
prompts on the same prepared inputs. Set `EVAL_WORKSPACE` to a fresh directory
containing `code.context.jsonl`, `noncode.context.jsonl`, the two original
`*.snapshot.json` files and `current.request-template.json` /
`baseline.request-template.json` (frozen system messages and tools). Configure
the established model environment and build the checkout first. The runner
refuses an existing experiment provenance file and does not run Stage 2 or
write production data. Private source files must stay outside Git.

See [the completed ordered-dialogue comparison](results-ordered-dialogue-20261109.md)
and its adjacent aggregate/hash JSON. Three original trials passed; current
development failed ref validation. A separately recorded diagnostic format
repair succeeded without changing its semantic partition. Source-based review
still found missed backward correction assignments and attribution issues.

## Output validation feedback

The current [validation/retry change](validation-feedback.md) reports schema
and source-ref errors together with their exact paths and permitted reference
sets. Direct Markdown generation uses the same tool-protocol feedback path;
missing required fields remain rejected without wrapper extraction or content
repair. See [regression and live repair results](results-validation-feedback-20261109.md).
Both known historical failures repaired on their first live retry; the Stage 2
body was unchanged. These seeded replays do not measure fresh-generation success.
