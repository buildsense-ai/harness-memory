# Fixed-candidate Stage 2 replay: faithful-record-v1

The prompt and runner at `bb44ffe` were evaluated on Monday against all seven
actual candidate inputs from the frozen `hybrid-allmsg-v1` run. Stage 1 was not
rerun. The system message was the only changed model input; the saved user
messages, source events, task metadata, schemas, validators and parameters were
verified against the historical requests.

Outcome: all seven documents completed on their first submission, but the
content result does not justify replacing the frozen generation prompt.

| Candidate | Historical body characters | New body characters | Source review |
| --- | ---: | ---: | --- |
| Code T1: usability/testing | 5,479 | 6,217 | Broadly maintained concrete results and their scope |
| Code T2: mechanism explanation | 6,589 | 6,350 | Later alternative path retained in body; older exclusive conclusion still repeated at end |
| Code T3: repair | 10,148 | 5,516 | Core implementation retained; an important corrected tradeoff and a publication-blocking reason omitted |
| Code T4: publishing | 7,209 | 6,881 | Final verification claims more accurately bounded |
| Code T5: identification | 2,992 | 2,274 | Identity retained; source of script-role statements made clearer |
| Noncode T1: phone selection | 7,193 | 5,608 | Some attribution retained/improved; one conflicting source item omitted |
| Noncode T2: headphone selection | 8,505 | 7,347 | Hypothetical condition still treated as decision; a new assistant-derived requirement attributed to user |

## Material findings

- The two primary target failures persisted: a hypothetical user condition was
  still presented as adopted, and an explanation's conclusion still selected an
  old exclusive claim despite a later alternative in its own input/body.
- A new explicit attribution error described an assistant-proposed multi-device
  criterion as a user hard requirement, although no candidate user query stated
  that requirement.
- The repair memory omitted a significant correction about a non-streaming
  path's continued provider failover. It also omitted the reason a locally
  tested change was not published, retaining only the unpublished status.
- A publishing memory improved its final separation of service/file status and
  a separate function-level test, rather than presenting them as verification
  inside the running service or end-to-end recovery.
- Reviewed explicit test outcomes and decisions were generally retained
  concretely. The observed tradeoff was not uniform epistemic downgrading, but
  residual strengthening and some material omissions. This is not a guarantee
  against every possible downgrade.

The fixed partition's missing later merge/deployment updates remained outside
the repair candidate. They were not treated as new generation failures: this
replay must not invent material absent from its candidate.

The new system was 1,788 JavaScript string characters versus the historical
1,804. Reorganizing approximately the same prompt length did not eliminate the
core semantic failures. This observation does not isolate the causal effect of
individual instructions.

## Verification

- Seven requests: `deepseek-flash`, enabled thinking, `max_tokens: 60000`;
  zero retries, truncations or final failures.
- Thirty-five remote result-file SHA-256 hashes matched local copies.
- All seven candidate payloads and actual user message strings matched the
  historical run exactly; tool schemas and output-validation module hashes
  matched. Saved Markdown matched the validated model body with only the
  mechanical Episode reference appended.
- Build and 21 model/document-output tests passed; commit CI passed.
- Prompt SHA-256 (UTF-8, LF):
  `b9025c65a0248540d507056e4050ec4028f5451480d37952f7be35837241be40`.
- Runtime: clean `bb44ffe` checkout under
  `/tmp/hmemory-faithful-record-20261110-repo`, using a shared dependency symlink;
  artifacts under `/tmp/hmemory-faithful-record-20261110`.
- No production service, uploader or database changes. Private conversations,
  complete traces and real documents remain outside the public repository.

This is one new output per fixed candidate against one historical output, with
no fresh old-prompt control or repeated generations. It supports retaining the
existing baseline, not a statistical claim that the new prompt always worsens
results. A small transient evidence scaffold remains an untested next option;
it was not implemented or called in this run.
