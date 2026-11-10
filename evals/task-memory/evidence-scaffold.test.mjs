import { test } from 'vitest';
import assert from 'node:assert/strict';
import { schemaIssues, requireValid } from '../../src/extraction/output.ts';
import { memoryTool, validateMemoryDocument } from '../../src/extraction/memory-output.ts';
import { createEvidenceScaffold } from './evidence-scaffold.mjs';
const { validateEvidenceDocument } = createEvidenceScaffold({ schemaIssues, requireValid, memoryTool, validateMemoryDocument });

const events = [{ ref: 'q1', text: '如果改用 B 呢？' }, { ref: 'm1', text: '当时建议试用 B。' }];
const valid = () => ({ support_notes: [{ source_ref: 'q1', quote: '如果改用 B 呢？', record_as: '用户的条件性讨论，不能写为已决定。' }], markdown: '# 方案讨论\n\n## 背景\n用户询问改用 B 的可能性。' });

test('retains exact submitted evidence and complete body without rewriting', () => {
  const value = valid();
  assert.equal(validateEvidenceDocument(value, events), value);
});
test('rejects all bad source/quote/structure issues together, without repairing them', () => {
  const value = valid();
  value.support_notes.push({ source_ref: 'unknown', quote: 'fake', record_as: 'statement' });
  value.support_notes[0].quote = '用户决定采用 B';
  value.support_notes[0].record_as = '';
  delete value.markdown;
  assert.throws(() => validateEvidenceDocument(value, events), error => {
    const codes = error.issues.map(i => i.code);
    assert.ok(['quote_not_in_source', 'empty_record_as', 'unknown_source_ref', 'schema_required'].every(c => codes.includes(c)));
    assert.deepEqual(error.reference_sets.event_refs, ['q1', 'm1']);
    return true;
  });
});
test('rejects evidence in reverse source order and malformed memory skeleton', () => {
  const value = valid();
  value.support_notes.unshift({ source_ref: 'm1', quote: '建议试用 B', record_as: '助手建议。' });
  value.markdown = '```markdown\n# 方案讨论\ntext';
  assert.throws(() => validateEvidenceDocument(value, events), error => {
    assert.ok(error.issues.some(i => i.code === 'unordered_evidence'));
    assert.ok(error.issues.some(i => i.code === 'missing_markdown_title'));
    return true;
  });
});
test('does not require manufactured evidence and rejects missing auxiliary structure', () => {
  assert.equal(validateEvidenceDocument({ ...valid(), support_notes: [] }, events).support_notes.length, 0);
  assert.throws(() => validateEvidenceDocument({ markdown: valid().markdown }, events), /support_notes/);
});
