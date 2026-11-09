# Output validation and repair feedback

This change addresses the observed unknown-query-ref retry failure without
changing either processing prompt, output schema, task assignment policy or
Markdown content policy. It does not add a generation-review model call.

Stage 1 previously stopped at the first failed assertion and returned only
`assignment references unknown/non-query event`. It now uses the exact output
JSON Schema with Ajv `allErrors`, followed by guarded semantic checks across
every structurally readable item. Missing fields/types and unexpected fields
are rejected; no coercion, defaults, field removal, wrapper extraction or ID
replacement is performed.

The tool error lists each issue's JSON pointer, code and explanation, the
received value for bad refs, and a named set of permitted refs. It reports
all unknown/missing query assignments, duplicate IDs/assignments, empty or
unused tasks, incompatible role/thread assignments and invalid relation refs.
Independent items are still inspected if a sibling item has the wrong type.
Malformed parent structures are reported at the parent rather than guessed.

Only feedback is bounded to 100 issues for a pathological output; the total
and omitted count are explicit. Validation itself checks everything and never
accepts a result because an issue was omitted from the feedback payload.
Reference sets are sent only where applicable and copy the input's actual IDs.

Stage 2's direct Markdown evaluation uses the same tool-envelope/JSON error
handling and strict single-field schema. It checks a real title and nonempty
body, allowed/unique optional H2 sections, a single document title, forbidden
model-generated source_refs headings and unclosed code fences. Headings inside
fenced code examples are not interpreted as document sections. The approved
prompt explicitly permits omitting inapplicable sections, so all four H2s are
not required. Episode refs are still mechanically appended by the runner.

Both stages reject a provider-reported output length truncation, even if its
JSON happens to parse. Missing/wrong/multiple output tool calls and malformed
argument JSON receive explicit diagnostics. Retry feedback answers every
emitted tool call; an invalid tool envelope uses an ordinary assistant/user
retry pair rather than replaying a broken provider protocol. Attempts remain
capped at three; final failure retains structured issues.

This validates output structure and reference integrity. It cannot establish
that every semantic correction was assigned to the right task or that a
memory faithfully distinguishes a hypothesis from a confirmed requirement.
Those issues still need source-based evaluation. The older event-selection
validator receives the same error aggregation defensively, but this does not
reintroduce that selection stage into the agreed direct Markdown experiment.

Tests cover the actual HTTP retry boundary, repeated malformed refs, multiple
simultaneous schema/semantic errors, retry exhaustion, truncated and malformed
outputs, protocol-complete replies to multiple calls, optional Markdown
sections and code examples. Raw failure replays and live repair results are
recorded separately from independent fresh generation success rates.
