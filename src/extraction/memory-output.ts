import { requireValid, schemaIssues, type OutputIssue } from "./output.js";

export const memoryTool = { type: "function", function: {
  name: "submit_memory_document", description: "提交唯一的 Markdown 任务记忆正文。",
  parameters: { type: "object", additionalProperties: false, required: ["markdown"], properties: { markdown: { type: "string" } } },
} };
const allowedHeadings = ["背景", "发生了什么", "判断与处理", "结果与待确认"];

/** Validate transport/document shape, not whether the historical account is true or complete. */
export function validateMemoryDocument(value: unknown): { markdown: string; headings: string[] } {
  const issues: OutputIssue[] = schemaIssues(value, memoryTool.function.parameters);
  const markdown = (value as any)?.markdown;
  const headings: string[] = [];
  if (typeof markdown === "string") {
    const text = markdown.trim(), lines = text.split(/\r?\n/);
    const add = (line: number, code: string, message: string, received?: unknown) =>
      issues.push({ path: "/markdown", code, message: `Line ${line}: ${message}`, received });
    if (!/^# [^\s].*/.test(lines[0])) add(1, "missing_markdown_title", "Start with a nonempty '# ' title; no surrounding code fence or preamble.");
    const seen = new Set<string>();
    let titleCount = 0, hasBody = false, fence: { char: string; length: number } | undefined;
    lines.forEach((line, i) => {
      if (fence) {
        const closing = line.match(/^ {0,3}(`+|~+)\s*$/);
        if (closing && closing[1][0] === fence.char && closing[1].length >= fence.length) fence = undefined;
        else if (line.trim()) hasBody = true;
        return;
      }
      const opening = line.match(/^ {0,3}(`{3,}|~{3,})(.*)$/);
      if (opening) { fence = { char: opening[1][0], length: opening[1].length }; return; }
      const heading = line.match(/^ {0,3}(#{1,6})[ \t]+(.+?)\s*#*\s*$/);
      if (!heading) { if (i > 0 && line.trim()) hasBody = true; return; }
      const [, marks, title] = heading;
      if (/^source_refs$/i.test(title)) add(i + 1, "model_generated_source_refs", "source_refs are appended by code, not the model.");
      if (marks.length === 1 && ++titleCount > 1) add(i + 1, "multiple_markdown_titles", "Only one document title is permitted.", title);
      if (marks.length !== 2) return;
      headings.push(title);
      if (!allowedHeadings.includes(title) && !/^source_refs$/i.test(title)) add(i + 1, "unexpected_h2", `Unexpected H2 skeleton; allowed optional sections: ${allowedHeadings.join("、")}.`, title);
      if (seen.has(title)) add(i + 1, "duplicate_h2", "Do not repeat a section; combine its content.", title);
      seen.add(title);
    });
    if (!hasBody) add(1, "missing_markdown_body", "Missing Markdown body; titles/section headings alone are not a memory.");
    if (fence) add(lines.length, "unclosed_code_fence", "Close the Markdown code fence; do not submit a truncated document.");
  }
  requireValid(issues);
  return { markdown, headings };
}
