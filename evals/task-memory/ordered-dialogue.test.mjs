import { test } from 'vitest';
import assert from 'node:assert/strict';
import { orderedDialogue, orderedContext } from './ordered-dialogue.mjs';

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

test('reconstructs chronological tools and messages while rejecting any aggregate/native mismatch', () => {
  const nativeRows = structuredClone(rows);
  nativeRows[2].tool_calls = [{ id: 'c1', type: 'function', function: { name: 'shell', arguments: '{"command":"inspect"}' } }];
  nativeRows[3].tool_call_id = 'c1';
  const toolCall = { ref: 'tc1', kind: 'tool_call', tool_call_id: 'c1', content: { id:'c1', name:'shell', arguments:'{"command":"inspect"}' }, text:'call' };
  const toolResult = { ref: 'tr1', kind: 'tool_result', tool_call_id: 'c1', content: nativeRows[3].content, text: nativeRows[3].content };
  const aggregate = { ...snapshot, events: [snapshot.events[0], toolCall, toolResult, ...snapshot.events.slice(1)] };
  const full = orderedContext(bytes(nativeRows), aggregate);
  assert.deepEqual(full.events.map(e => e.kind), ['query','message','tool_call','tool_result','query','message','message','query','message']);
  assert.equal(full.events.find(e=>e.ref==='tc1').original_turn, 1);
  assert.equal(full.events.find(e=>e.ref==='tr1').content, nativeRows[3].content);
  assert.deepEqual(full.events.filter(e=>['query','message'].includes(e.kind)), orderedDialogue(bytes(nativeRows),aggregate).events);
  nativeRows[3].content = 'modified tool result';
  assert.throws(()=>orderedContext(bytes(nativeRows),aggregate), /tool mismatch/);
});

test('preserves parallel native call order and equivalent result text blocks', () => {
  const calls = ['a','b'].map(id => ({ id, type:'function', function:{ name:'shell', arguments:'{}' } }));
  const nativeRows = [ {role:'user',content:'first'}, {role:'assistant',content:null,tool_calls:calls},
    {role:'tool',tool_call_id:'b',content:[{type:'text',text:'B'}]},
    {role:'tool',tool_call_id:'a',content:'A'}, {role:'assistant',content:'done'} ];
  const events = [snapshot.events[0], ...calls.flatMap(c=>[
    {ref:'tc'+c.id,kind:'tool_call',tool_call_id:c.id,content:{id:c.id,...c.function}},
    {ref:'tr'+c.id,kind:'tool_result',tool_call_id:c.id,content:c.id.toUpperCase(),text:c.id.toUpperCase()},
  ]), snapshot.events[1]];
  const result=orderedContext(bytes(nativeRows),{sha256:'source',events});
  assert.deepEqual(result.events.map(e=>e.ref),['q1','tca','tcb','trb','tra','m1']);
  assert.deepEqual(result.events[3].content,nativeRows[2].content);
});
