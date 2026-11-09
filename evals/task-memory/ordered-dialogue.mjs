import { createHash } from 'node:crypto';

const hash = x => createHash('sha256').update(x).digest('hex');
function contentText(content) {
  if (content == null) return '';
  if (typeof content === 'string') return content;
  if (!Array.isArray(content)) throw Error('Unsupported native message content');
  return content.filter(block => block.type === 'text').map(block => {
    if (typeof block.text !== 'string') throw Error('Invalid text block');
    return block.text;
  }).join('');
}

/** Join exact historical turn anchors to a frozen native context. No synthesis. */
export function orderedDialogue(contextBytes, snapshot) {
  const native = [];
  let offset = 0;
  for (const line of contextBytes.toString('utf8').split('\n')) {
    if (line.trim()) native.push({ value: JSON.parse(line), offset, line: native.length + 1 });
    offset += Buffer.byteLength(line) + 1;
  }
  const sourceHash = hash(contextBytes);
  const queries = snapshot.events.filter(e => e.kind === 'query');
  const messages = snapshot.events.filter(e => e.kind === 'message');
  if (queries.length !== messages.length) throw Error('Expected one aggregate final message per turn');
  const match = (role, text) => native.flatMap((r, i) => r.value.role === role && contentText(r.value.content) === text ? [i] : []);
  const starts = queries.map(q => {
    const found = match('user', q.text);
    if (found.length !== 1) throw Error('Missing/ambiguous exact query anchor: ' + q.ref);
    return found[0];
  });
  const events = [], turns = [];
  for (let t = 0; t < queries.length; t++) {
    const start = starts[t];
    const endings = match('assistant', messages[t].text).filter(i => i > start && (t === queries.length - 1 || i < starts[t + 1]));
    if (endings.length !== 1) throw Error('Missing/ambiguous exact final anchor: ' + messages[t].ref);
    const end = endings[0] + 1;
    if (t < queries.length - 1 && end !== starts[t + 1]) throw Error('Unaccounted context between source turns');
    const block = [];
    for (let i = start; i < end; i++) {
      const row = native[i], m = row.value;
      if (m.role !== 'user' && m.role !== 'assistant') continue;
      if (m.__injected || m.__checkpointSummary || m.__runtimeObservation) throw Error('Synthetic record inside selected native turn');
      const text = contentText(m.content);
      if (!text.trim()) continue;
      const original = i === start ? queries[t] : i === end - 1 ? messages[t] : undefined;
      const event = {
        ref: original?.ref ?? 'evt_dialogue_' + hash(sourceHash + ':' + row.offset + ':/content').slice(0, 24),
        raw_ref: 'native_context_' + sourceHash.slice(0, 24) + '_' + row.offset,
        kind: m.role === 'user' ? 'query' : 'message',
        text, content: m.content, pointer: '/content', offset: row.offset,
        native_line: row.line, native_index: i, source_context_sha256: sourceHash,
        original_turn: t + 1, owner_query_ref: queries[t].ref,
        fidelity: 'native_recorded_text', original_aggregate_ref: original?.ref ?? null,
      };
      events.push(event); block.push(event.ref);
    }
    turns.push({ ordinal: t + 1, owner_query_ref: queries[t].ref,
      native_start_index: start, native_end_index_exclusive: end,
      query_count: events.filter(e => e.original_turn === t + 1 && e.kind === 'query').length,
      message_count: events.filter(e => e.original_turn === t + 1 && e.kind === 'message').length,
      dialogue_refs: block,
    });
  }
  if (new Set(events.map(e => e.ref)).size !== events.length) throw Error('Duplicate dialogue refs');
  return { source_context_sha256: sourceHash, original_snapshot_sha256: snapshot.sha256, events, turns };
}
