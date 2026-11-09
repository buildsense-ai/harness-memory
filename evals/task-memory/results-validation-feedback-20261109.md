# Detailed validation feedback: regression and live failure repair

Evaluated commit: `417e94b87435e592d83f8f83dd7ad04dc1691044`.
The implementation and scope are described in [validation-feedback.md](validation-feedback.md).
Neither stage's task-generation prompt was changed.

## Automated verification

[CI](https://github.com/buildsense-ai/harness-memory/actions/runs/42627942704)
passed 55 tests with PostgreSQL, four Python deployment tests and the TypeScript
build. The new tests include both query prefix errors in the same response,
all missing query assignments, independent schema and relation problems,
retry exhaustion, malformed/multiple/missing output tool calls, provider
truncation, and the direct Markdown schema/optional-section rules.

Local non-database tests passed; the initial local full-suite attempt could
not connect to PostgreSQL on port 15460. Complete database verification was
provided by CI, not counted as a local pass. Thirteen historical accepted
Stage 2 outputs passed the new Markdown validator, including the older 60K
replay. The three historical failed Stage 2 responses remained rejected:
one for truncation/invalid JSON, and two for missing root markdown plus an
unexpected arguments wrapper. No body or required field was manufactured.

## Monday live repair experiment

A fresh isolated checkout built the evaluated commit. Each stage received
one saved historical failure as its first response, after which the current
retry code generated feedback and made real DeepSeek calls. This measures
repair of specific known failures; it is not an independent fresh-generation
success rate. Both stages used `deepseek-flash`, thinking enabled and a 60K
output limit. Initial system/user messages and output tool schemas matched
the historical requests. Original traces were not overwritten.

### Stage 1

The saved third failed attempt contained two unknown `query_ref` values. One
feedback reported five issues: both erroneous paths/values, both missing
source query assignments, and the task left without a valid query assignment.
The permitted query refs were included once in `reference_sets.query_refs`.

The model passed validation on its **first live repair request** (2,275 output
tokens, including 17 reasoning). It corrected both prefixes and additionally
assigned the identity-confirmation query to the naming task. The four task
definitions stayed identical. That extra assignment is source-supported and
shares original turn 3 with the existing naming question, so expanding full
source turns yields the exact same candidate membership. Do not describe this
run as changing only query refs; that description belongs to the previous,
separate diagnostic continuation.

### Stage 2

The saved response was a valid JSON object with an `arguments` string holding
another JSON object, but no root `markdown`. Feedback reported both missing
`/markdown` and unexpected `/arguments`, rather than just “missing title/body”.

The model passed validation on its **first live repair request** (5,952 output
tokens, including 127 reasoning). It returned root `markdown` with all four
optional sections and 11,709 characters. Its Markdown was byte-for-byte
identical to the historical body inside the wrapper. This was model-produced
resubmission; the application neither extracted nor rewrote the wrapped body.

## Limits and traceability

The adjacent aggregate JSON includes the actual feedback, token usage, hashes
and provenance. Eleven remote artifacts matched their downloaded SHA-256
hashes. Raw requests/responses and the repair Markdown are private artifacts
under `artifacts/memory-validation-feedback-20261109` and the isolated Monday
directory `/tmp/hmemory-validation-feedback-20261109`.

These results show the known failures are detected and that targeted feedback
can repair them. They do not guarantee every model output will recover, nor
resolve semantic task-boundary/correction-attribution issues. Retries still
stop after three attempts. Monday production remained active at release
`8f1b4033139611aebf6fb9026a07b4008686c632`; no unmerged deployment or database
write occurred.
