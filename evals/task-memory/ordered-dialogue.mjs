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

/** Expand the same bounded native history with tools, checking every aggregate tool byte for byte. */
export function orderedContext(contextBytes, snapshot) {
  const dialogue = orderedDialogue(contextBytes, snapshot);
  const byIndex = new Map(dialogue.events.map(e => [e.native_index, e]));
  const tools = snapshot.events.filter(e => e.kind === 'tool_call' || e.kind === 'tool_result');
  const native = []; let offset = 0;
  for (const line of contextBytes.toString('utf8').split('\n')) {
    if (line.trim()) native.push({ value: JSON.parse(line), offset });
    offset += Buffer.byteLength(line) + 1;
  }
  const events = []; const usedTools = new Set();
  const addTool = (kind, id, content, pointer, row, i, turn) => {
    const sameContent = original => kind === 'tool_result'
      ? contentText(original.content) === contentText(content)
      : JSON.stringify(original.content) === JSON.stringify(content);
    const matches = tools.filter(e => !usedTools.has(e.ref) && e.kind === kind && e.tool_call_id === id && sameContent(e));
    if (matches.length !== 1)
      throw Error('Native/aggregate tool mismatch at native index ' + i);
    const original = matches[0]; usedTools.add(original.ref);
    events.push({ ...original, content, pointer, offset: row.offset,
      raw_ref: 'native_context_' + dialogue.source_context_sha256.slice(0, 24) + '_' + row.offset,
      native_index: i, native_line: i + 1, original_turn: turn.ordinal,
      owner_query_ref: turn.owner_query_ref, source_context_sha256: dialogue.source_context_sha256,
      original_aggregate_ref: original.ref, fidelity: 'native_recorded_tool',
    });
  };
  for (const turn of dialogue.turns) for (let i = turn.native_start_index; i < turn.native_end_index_exclusive; i++) {
    const row = native[i], message = row.value;
    if (message.__injected || message.__checkpointSummary || message.__runtimeObservation) throw Error('Synthetic record inside selected native turn');
    if (byIndex.has(i)) events.push(byIndex.get(i));
    if (message.role === 'assistant' && message.tool_calls) message.tool_calls.forEach((call, j) => {
      if (call.type !== 'function') throw Error('Unsupported native tool call');
      addTool('tool_call', call.id, { id: call.id, name: call.function.name, arguments: call.function.arguments }, '/tool_calls/' + j, row, i, turn);
    });
    if (message.role === 'tool') addTool('tool_result', message.tool_call_id, message.content, '/content', row, i, turn);
  }
  if (usedTools.size !== tools.length) throw Error('Unmatched aggregate tools remain');
  if (new Set(events.map(e => e.ref)).size !== events.length) throw Error('Duplicate full-context refs');
  return { ...dialogue, events };
}
