# Narrow revision from the original baseline

This branch starts from `memory-eval-20261108-baseline` (`dc37e9b`), not
the broad `memory-eval-20261109-evidence-fidelity` prompt revision.

Stage 1 adds one rule: explicitly corrected/retracted conclusions or material
state changes also belong to the affected earlier task. General elaboration,
shared context, or related topics do not justify extra membership or new tasks.
There is no fixed number of tasks and no fixed overlap target.

Stage 2 uses the original Markdown prompt plus three concise rules: record who
proposed/accepted/executed an action; retain grounded corrections or unresolved
conflicts; reconcile the final recommendations and completion state with the
body, preserving conditional alternatives. The schema and skeleton are unchanged.

Only evaluation infrastructure is reused from the broad revision: an explicit
prompt file, private workspace selection, provenance, and overwrite protection.
Candidate assembly and output validation remain the same as the baseline.

Rerun both immutable source snapshots from the original experiment with the
same model, thinking setting, output limit, and raw response logging. Compare
source coverage, memberships and their semantic necessity, task boundaries,
correction coverage, information attribution, conflicts and final states. Do
not rewrite generated output or silently tune prompts after seeing the result.
This is an evaluation branch, not an instruction to deploy the experiment.
