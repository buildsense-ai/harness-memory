export function messageFormat(text) {
  let value;
  try { value = JSON.parse(text); } catch { return { kind: 'markdown', text }; }
  if (!value || typeof value !== 'object') return { kind: 'markdown', text };
  if (!Array.isArray(value) && value.source === 'memory' && typeof value.summary === 'string') {
    return { kind: 'memory', text: value.summary, raw: text };
  }
  return { kind: 'json', text: JSON.stringify(value, null, 2) };
}
