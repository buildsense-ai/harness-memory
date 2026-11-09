# hybrid-allmsg-v1

Frozen iteration baseline selected after the complete November 9 hybrid run:
the original partition prompt plus the current direct-Markdown prompt, with
all native public messages at Stage 1. This is an evaluated version, not a
claim of semantic acceptance for production. Known limitations are recorded in
[the result review](../../results-hybrid-allmsg-20261109.md).

The adjacent JSON files contain the exact system messages and output tool
schemas, without source conversations, credentials or request-specific data.
`manifest.json` freezes their hashes, input semantics, model parameters,
runtime provenance, immutable source hashes and private result-file hashes.
The version does not change the production partition prompt automatically.

To rerun, build this tagged checkout, create a fresh private evaluation directory
and copy the adjacent `hybrid.request-template.json` and
`hybrid.memory-system.json` into it. Supply `code.context.jsonl`,
`noncode.context.jsonl`, `code.snapshot.json` and `noncode.snapshot.json` matching
the manifest. Set the existing model environment variables, including
`MODEL_NAME=deepseek-flash`, then run from the repository:

```sh
EVAL_VARIANTS=hybrid EVAL_WORKSPACE=/absolute/private/evaluation \
  node --env-file=/absolute/private/model.env evals/task-memory/run-full-dialogue.mjs
```

The frozen `hybrid.memory-tool.json` records the Stage 2 contract. The runner
uses its built-in equivalent; verify its equality before replaying this version
after future tool-schema changes. Model output may vary across reruns.

Tag: `memory-eval-20261109-hybrid-v1`.
