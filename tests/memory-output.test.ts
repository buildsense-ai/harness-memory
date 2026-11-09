import { expect, it } from "vitest";
import { validateMemoryDocument } from "../src/extraction/memory-output.js";
import { OutputValidationError } from "../src/extraction/output.js";
import { readToolOutput, appendOutputRetry } from "../src/extraction/output.js";

it("reports missing Markdown and unexpected fields together without manufacturing a body", () => {
  const value = { arguments: { markdown: "# 任务\n\n实际正文" }, extra: true };
  try { validateMemoryDocument(value); throw Error("accepted invalid document"); }
  catch (error) {
    expect(error).toBeInstanceOf(OutputValidationError);
    expect((error as OutputValidationError).issues).toEqual(expect.arrayContaining([
      expect.objectContaining({ path: "/markdown", code: "schema_required" }),
      expect.objectContaining({ path: "/arguments", code: "schema_additionalProperties" }),
      expect.objectContaining({ path: "/extra", code: "schema_additionalProperties" }),
    ]));
  }
  expect(value.arguments.markdown).toBe("# 任务\n\n实际正文");
});

it("keeps optional sections optional and ignores headings quoted inside code blocks", () => {
  const markdown = '# 历史\n\n## 发生了什么\n具体过程。\n\n```md\n## arbitrary\n## source_refs\n```\n';
  expect(validateMemoryDocument({ markdown })).toEqual({ markdown, headings: ["发生了什么"] });
  expect(validateMemoryDocument({ markdown: "# 记录\n\n只有一段实际内容。" }).markdown).toContain("实际内容");
});

it("reports duplicate/unknown sections, extra titles and model-generated refs together", () => {
  const markdown = '# 历史\n实际内容\n## 背景\n背景\n## 背景\n重复\n## 其他\n错误章节\n# 第二份\n## source_refs\n伪造引用';
  try { validateMemoryDocument({ markdown }); throw Error("accepted invalid document"); }
  catch (error) {
    expect((error as OutputValidationError).issues.map(i => i.code)).toEqual(expect.arrayContaining([
      "duplicate_h2", "unexpected_h2", "multiple_markdown_titles", "model_generated_source_refs",
    ]));
  }
});

it.each([null, [], {}, { markdown: 1 }, { markdown: "# 空标题之外没有正文" }, { markdown: "# 只有章节\n## 背景\n## 发生了什么" }, { markdown: "```md\n# 围起来的正文\ntext\n```" }, { markdown: "# 不完整\n\n```sh\ncommand" }])("rejects incomplete/wrong document shapes without fallback: %j", value => {
  expect(() => validateMemoryDocument(value)).toThrow(OutputValidationError);
});

it("can send all Stage 2 format errors back as tool feedback and validate the corrected Markdown unchanged", () => {
  const completion = (args: string) => ({ choices: [{ finish_reason: "tool_calls", message: { role: "assistant", content: null, tool_calls: [{ id: "doc", type: "function", function: { name: "submit_memory_document", arguments: args } }] } }] });
  const data = completion(JSON.stringify({ markdown: "# 旧正文\n\n## 其他\n错误\n## source_refs\n不该生成", extra: true }));
  const messages: any[] = [];
  try { validateMemoryDocument(readToolOutput(data, "submit_memory_document")); throw Error("accepted"); }
  catch (error) { appendOutputRetry(messages, data.choices[0].message, error, "submit_memory_document"); }
  const feedback = JSON.parse(messages[1].content);
  expect(feedback.issues.map((i: any) => i.code)).toEqual(expect.arrayContaining(["schema_additionalProperties", "unexpected_h2", "model_generated_source_refs"]));
  const markdown = "# 修正后的历史\n\n## 发生了什么\n完整实际正文。";
  expect(validateMemoryDocument(readToolOutput(completion(JSON.stringify({ markdown })), "submit_memory_document")).markdown).toBe(markdown);
});
