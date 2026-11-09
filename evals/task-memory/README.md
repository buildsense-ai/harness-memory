# Direct task-memory evaluation

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
