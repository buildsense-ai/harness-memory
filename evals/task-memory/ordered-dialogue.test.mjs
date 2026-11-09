import { test } from 'node:test';
import assert from 'node:assert/strict';
import { orderedDialogue } from './ordered-dialogue.mjs';

const snapshot = { sha256: 'source', events: [
  { ref: 'q1', kind: 'query', text: 'first' }, { ref: 'm1', kind: 'message', text: 'done' },
  { ref: 'q2', kind: 'query', text: 'next' }, { ref: 'm2', kind: 'message', text: 'finished' },
] };
const rows = [
  { role: 'user', content: 'older history' },
  { role: 'user', content: 'first' },
  { role: 'assistant', content: 'checking', tool_calls: [{ id: 'c1' }] },
  { role: 'tool', content: 'DO NOT include tool result' },
  { role: 'user', content: 'interleaved user' },
  { role: 'assistant', content: [{ type: 'thinking', thinking: 'DO NOT include' }, { type: 'text', text: 'correction' }] },
  { role: 'assistant', content: 'done' },
  { role: 'user', content: 'next' },
  { role: 'assistant', content: 'finished' },
  { role: 'user', content: 'later history' },
];
const bytes = r => Buffer.from(r.map(x => JSON.stringify(x)).join('\n') + '\n');

test('preserves every public message and interleaved user in native order, exact turn ownership and byte pointers', () => {
  const data = bytes(rows), result = orderedDialogue(data, snapshot);
  assert.deepEqual(result.events.map(e => e.text), ['first', 'checking', 'interleaved user', 'correction', 'done', 'next', 'finished']);
  assert.deepEqual(result.events.map(e => e.ref).filter(r => ['q1','q2','m1','m2'].includes(r)), ['q1','m1','q2','m2']);
  assert.equal(result.events[2].owner_query_ref, 'q1');
  assert.equal(result.turns[0].query_count, 2);
  for (const e of result.events) {
    const source = JSON.parse(data.subarray(e.offset).toString('utf8').split('\n')[0]);
    assert.deepEqual(source.content, e.content);
  }
});

test('fails closed for missing or duplicated anchors, missing finals and unexpected gaps', () => {
  assert.throws(() => orderedDialogue(bytes(rows.filter(x => x.content !== 'first')), snapshot), /query anchor/);
  assert.throws(() => orderedDialogue(bytes([...rows, { role: 'user', content: 'first' }]), snapshot), /query anchor/);
  assert.throws(() => orderedDialogue(bytes(rows.filter(x => x.content !== 'done')), snapshot), /final anchor/);
  assert.throws(() => orderedDialogue(bytes([...rows.slice(0,7), { role:'assistant', content:'unowned' }, ...rows.slice(7)]), snapshot), /Unaccounted/);
});

test('does not silently turn injected instructions into user requests', () => {
  const altered = structuredClone(rows); altered[4].__injected = true;
  assert.throws(() => orderedDialogue(bytes(altered), snapshot), /Synthetic/);
});
