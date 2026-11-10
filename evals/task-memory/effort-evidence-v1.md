# Fixed-candidate effort and temporary-evidence probe

Approved scope: use maximum thinking effort for future memory processing; compare
the frozen hybrid-v1 Stage 2 prompt with and without a temporary source-evidence
scaffold. Stage 1 is not rerun. No production documents or service deployment.

## Probe

- Replay the same seven actual hybrid-allmsg-v1 candidates, including all original
  tools and the original task metadata. Preserve candidate bytes and Episode IDs.
- Fresh control `hybrid-high`: frozen hybrid system/schema, explicit `high`.
- `hybrid-max`: same system/schema, explicit `max`; only effort changes.
- `hybrid-max-evidence`: same candidates at `max`, append a small evidence task
  and extend the output tool with `support_notes`, preceding `markdown`.
- A note contains an exact continuous source quote, its event ref and a short
  speaker/status/recording statement. It is a source-evidence artifact, not a
  request for private chain of thought. It does not restrict the memory to quoted
  material. Check all quote/ref/shape errors together; no invented recovery.
- Keep auxiliary notes in private evaluation traces, never in final memory.
  Final source_refs remain mechanically appended Episode IDs.
- 60,000 output tokens, three workers, at most three format attempts, no extra
  model review. Interleave variants by candidate. A fresh high control avoids
  treating all historical variation as an effort gain.

## Review and acceptance

Compare each actual document against original candidate events. Focus on user
conditions vs decisions, assistant suggestions vs user requirements, correction
uptake and final conclusion consistency, important error/implementation/result
omissions, and unnecessary weakening of explicit outcomes. Do not reward shorter
or merely more cautious documents. A valid quote does not prove correct
interpretation or completeness. Preserve negative results and raw outputs.

One generation per variant/candidate is a directional probe, not a statistical
claim of reliability. Known difficult examples are tuning cases; untouched
conversations will be needed before accepting a prompt for production.

## Execution checklist

- [ ] Set active model requests to explicit max; keep historical frozen versions.
- [ ] Build, run output regressions and test exact-quote rejection offline.
- [ ] Run the three variants on Monday using existing private model environment.
- [ ] Verify input/prompt/parameter/output fidelity and source pointers.
- [ ] Review all seven candidates and report concrete improvements/regressions.

Use `EVAL_BASELINE` for the private November 9 hybrid artifact root and a fresh
`EVAL_WORKSPACE`, with the existing model environment. Run
`node evals/task-memory/run-effort-evidence.mjs` after `npm run build`.

Historical tags/manifests remain byte-for-byte unchanged. Active product requests
and current evaluation entry points use explicit max. The comparison's high arm
is an intentional control, not the new default.
