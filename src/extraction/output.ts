import { Ajv, type AnySchema, type ValidateFunction } from "ajv";
import { HttpError } from "../contracts.js";

export interface OutputIssue {
  path: string;
  code: string;
  message: string;
  received?: unknown;
  expected?: unknown;
  allowed_ref_set?: string;
}

export class OutputValidationError extends HttpError {
  constructor(public issues: OutputIssue[], public reference_sets: Record<string, string[]> = {}) {
    super(422, issues.map(issue => `${issue.path || "/"}: ${issue.message}`).join("; "));
  }
}

// Validate the same schemas sent to the model, without defaults, coercion or field removal.
const ajv = new Ajv({ allErrors: true });
const validators = new WeakMap<object, ValidateFunction>();
export const isObject = (value: unknown): value is Record<string, any> =>
  value !== null && typeof value === "object" && !Array.isArray(value);
const escapePointer = (key: string) => key.replace(/~/g, "~0").replace(/\//g, "~1");

export function schemaIssues(value: unknown, schema: object): OutputIssue[] {
  let validate = validators.get(schema);
  if (!validate) { validate = ajv.compile(schema as AnySchema); validators.set(schema, validate); }
  if (validate(value)) return [];
  return (validate.errors ?? []).map(error => {
    const field = error.keyword === "required" ? error.params.missingProperty
      : error.keyword === "additionalProperties" ? error.params.additionalProperty : undefined;
    return {
      path: error.instancePath + (field ? "/" + escapePointer(field) : ""),
      code: "schema_" + error.keyword,
      message: error.message ?? "invalid output structure",
      expected: error.params,
    };
  });
}

export function requireValid(issues: OutputIssue[], referenceSets: Record<string, string[]> = {}): void {
  if (issues.length) throw new OutputValidationError(issues, referenceSets);
}

export function outputFeedback(error: unknown, toolName: string) {
  const failure = error instanceof OutputValidationError ? error : new OutputValidationError([
    { path: "/", code: "invalid_output", message: error instanceof Error ? error.message : "Invalid output" },
  ]);
  // Inspect all errors. Bound only the feedback payload for pathological outputs and say what was omitted.
  return {
    ok: false, error: "output_validation_failed", required_tool: toolName,
    issues: failure.issues.slice(0, 100), issue_count: failure.issues.length,
    omitted_issue_count: Math.max(0, failure.issues.length - 100),
    reference_sets: failure.reference_sets,
    instruction: "Correct every reported issue and resubmit the complete result through the required tool. Copy source IDs exactly from the input. Do not invent, omit required content, or return only a patch.",
  };
}

/** Read one unambiguous required output. No wrapper scanning, rewriting or missing-field recovery. */
export function readToolOutput(data: any, toolName: string): unknown {
  const choice = data?.choices?.[0], message = choice?.message;
  const calls: any[] = Array.isArray(message?.tool_calls) ? message.tool_calls : [];
  const issues: OutputIssue[] = [];
  if (choice?.finish_reason === "length") issues.push({ path: "/", code: "output_truncated", message: "Output token limit reached; resubmit a complete result within the output budget." });
  if (message?.refusal) issues.push({ path: "/", code: "model_refusal", message: "The model refused to produce the required result." });
  if (calls.length !== 1) issues.push({ path: "/tool_calls", code: "output_call_count", message: `Expected exactly one ${toolName} tool call, received ${calls.length}.`, expected: 1 });
  const ids = new Set<string>();
  calls.forEach((call, index) => {
    const p = `/tool_calls/${index}`;
    if (!isObject(call)) { issues.push({ path: p, code: "invalid_tool_call", message: "Tool call must be an object." }); return; }
    if (typeof call.id !== "string" || !call.id.trim() || ids.has(call.id)) issues.push({ path: p + "/id", code: "invalid_tool_call_id", message: "Tool call ID must be nonempty and unique." });
    ids.add(call.id);
    if (call.type !== "function") issues.push({ path: p + "/type", code: "invalid_tool_type", message: "Expected function tool call." });
    if (call.function?.name !== toolName) issues.push({ path: p + "/function/name", code: "wrong_output_tool", message: `Call ${toolName}.`, received: call.function?.name, expected: toolName });
  });
  let value: unknown;
  if (calls.length === 1 && isObject(calls[0])) {
    const args = calls[0].function?.arguments;
    if (typeof args !== "string") issues.push({ path: "/", code: "invalid_arguments_type", message: "Tool arguments must be a JSON object encoded as a string." });
    else try { value = JSON.parse(args); }
    catch (error) { issues.push({ path: "/", code: "invalid_json", message: `Invalid tool-argument JSON: ${(error as Error).message}` }); }
  }
  requireValid(issues);
  return value;
}

/** Reply to every emitted call so retries also satisfy the provider's tool protocol. */
export function appendOutputRetry(messages: any[], message: any, error: unknown, toolName: string): void {
  const feedback = JSON.stringify(outputFeedback(error, toolName));
  const calls = message?.tool_calls;
  const replayable = Array.isArray(calls) && calls.length > 0 && calls.every((c: any) =>
    isObject(c) && typeof c.id === "string" && c.id.trim() && c.type === "function" &&
    typeof c.function?.name === "string" && typeof c.function?.arguments === "string") &&
    new Set(calls.map((c: any) => c.id)).size === calls.length;
  if (replayable) {
    messages.push(message, ...calls.map((call: any) => ({ role: "tool", tool_call_id: call.id, content: feedback })));
  } else {
    // A malformed tool envelope cannot be replayed as a valid assistant tool turn.
    messages.push({ role: "assistant", content: typeof message?.content === "string" ? message.content : "" }, { role: "user", content: feedback });
  }
}
