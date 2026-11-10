# Faithful historical recording: fixed Stage 2 replay

Approved scope: replay all seven actual candidate payloads from the November 9
`hybrid-allmsg-v1` run. Do not rerun Stage 1, expand candidates, add evidence
fields, prune events, add a model reviewer, or modify production behavior.

Hypothesis: organizing the prompt around faithful attribution, positive
coverage obligations and the separation of historical updates from factual
verification reduces both strengthened claims and obsolete final conclusions,
without making established actions/results vague or losing important paths.

The new system prompt is `faithful-record-v1-prompt.txt`. It replaces the old
system message only. The runner copies each saved user message exactly,
including potentially misleading Stage 1 metadata, and preserves the frozen
tool schema, format validator, three-attempt retry path, 60,000-token output
limit, enabled thinking and `deepseek-flash` model. Two requests run concurrently.

After building, configure the existing model environment and run:

```sh
EVAL_BASELINE=/absolute/private/hybrid-run \
EVAL_WORKSPACE=/absolute/private/fresh-output \
node --env-file=/absolute/private/model.env evals/task-memory/run-stage2-fixed.mjs
```

The baseline must contain the original `hybrid/{code,noncode}/metrics.json`
and each completed document's saved input, request trace, Episode manifest and
Markdown. Output must be a new directory. Runtime provenance records exact
user-input, prompt, baseline-output and module hashes. No credentials are saved.

Review each new document against its fixed candidate source and historical
output, separately assessing attribution/conditions, absorption of updates,
important content omissions, and unsupported downgrading. Review actual source
claims rather than outside factual correctness. Candidate coverage/overlap is
unchanged by construction. Missing later updates outside a candidate remain a
Stage 1 limitation, not a Stage 2 failure to invent their content.

This is one new generation per fixed candidate; differences from the recorded
baseline are observations, not a causal or repeatability guarantee. Preserve
all intermediate requests and real Markdown privately, publish aggregate
findings only, and keep the frozen baseline tag unchanged.
