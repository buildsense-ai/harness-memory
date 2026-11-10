import { schemaIssues, requireValid } from '../../dist/src/extraction/output.js';
import { memoryTool, validateMemoryDocument } from '../../dist/src/extraction/memory-output.js';

// Evaluation-only extension. Production and the frozen baseline schema stay unchanged.
export const evidenceTool = structuredClone(memoryTool);
evidenceTool.function.description = '先提交少量临时原文依据，再提交完整 Markdown 任务记忆。';
evidenceTool.function.parameters = {
  type: 'object', additionalProperties: false, required: ['support_notes', 'markdown'],
  properties: {
    support_notes: { type: 'array', items: {
      type: 'object', additionalProperties: false, required: ['source_ref', 'quote', 'record_as'],
      properties: { source_ref: { type: 'string' }, quote: { type: 'string' }, record_as: { type: 'string' } },
    } },
    markdown: { type: 'string' },
  },
};

export function validateEvidenceDocument(value, events) {
  const issues = schemaIssues(value, evidenceTool.function.parameters);
  const sources = new Map(events.map((event, index) => [event.ref, { ...event, index }]));
  let previous = -1;
  if (Array.isArray(value?.support_notes)) value.support_notes.forEach((note, i) => {
    if (!note || typeof note !== 'object') return;
    const prefix = `/support_notes/${i}`, source = sources.get(note.source_ref);
    if (typeof note.source_ref === 'string' && !source)
      issues.push({ path: prefix + '/source_ref', code: 'unknown_source_ref', message: 'Copy a candidate_events ref exactly.', received: note.source_ref, allowed_ref_set: 'event_refs' });
    if (source) {
      if (source.index < previous) issues.push({ path: prefix + '/source_ref', code: 'unordered_evidence', message: 'List support notes in original event order.' });
      previous = source.index;
      if (typeof note.quote === 'string' && (!note.quote.trim() || !source.text.includes(note.quote)))
        issues.push({ path: prefix + '/quote', code: 'quote_not_in_source', message: 'Copy a nonempty continuous exact substring of this event text; do not paraphrase or splice.' });
    }
    if (typeof note.record_as === 'string' && !note.record_as.trim())
      issues.push({ path: prefix + '/record_as', code: 'empty_record_as', message: 'State speaker, source status and the bounded account it supports.' });
  });
  try { validateMemoryDocument({ markdown: value?.markdown }); }
  catch (error) { if (error.issues) issues.push(...error.issues); else throw error; }
  requireValid(issues, issues.some(i => i.allowed_ref_set) ? { event_refs: events.map(e => e.ref) } : {});
  return value;
}
