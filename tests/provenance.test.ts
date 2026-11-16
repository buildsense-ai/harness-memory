import { expect, it } from 'vitest';
import { buildProvenance, flattenTree, scopedRunIds, sourcePaths, graphSources } from '../frontend/provenance.js';

const session = { session_key: 's1', bot_id: 'bot1', session_name: '真实会话名', participant_names: ['Alice', 'Bob'] };
const batch = (run_id: string, participants: string[], session_key = 's1') => ({
  run_id, created_at: '2026-11-15T08:00:00Z', published_memory_count: 2,
  sessions: [{ session_key, bot_id: 'bot1', participant_names: participants }],
});

it('builds Bot/user/session/batch paths and scopes exact batch participants', () => {
  const roots = buildProvenance([session], [batch('r1', ['Alice']), batch('r2', ['Bob']), batch('r3', ['Alice', 'Bob'])], [{ bot_id: 'bot1', bot_name: 'Saturday' }]);
  expect(roots[0].label).toBe('Saturday');
  const nodes = flattenTree(roots);
  const alice = nodes.find(node => node.kind === 'user' && node.userName === 'Alice');
  const bob = nodes.find(node => node.kind === 'user' && node.userName === 'Bob');
  expect([...scopedRunIds(roots, alice)].sort()).toEqual(['r1', 'r3']);
  expect([...scopedRunIds(roots, bob)].sort()).toEqual(['r2', 'r3']);
  expect([...scopedRunIds(roots, null)].sort()).toEqual(['r1', 'r2', 'r3']);
  expect(sourcePaths(roots, 'r3').map(path => path.map(node => node.kind))).toEqual([
    ['bot', 'user', 'session', 'batch'], ['bot', 'user', 'session', 'batch'],
  ]);
  expect(nodes.filter(node => node.kind === 'session').map(node => node.label)).toEqual(['真实会话名', '真实会话名']);
  expect([...scopedRunIds(roots, { id: 'stale-scope' })]).toEqual([]);
});

it('keeps unnamed and unprocessed sessions without inventing a title or user attribution', () => {
  const unnamed = { session_key: 's2', bot_id: 'bot2', participant_names: [] };
  const roots = buildProvenance([session, unnamed], [batch('r1', ['Alice']), batch('unknown', [])]);
  const nodes = flattenTree(roots);
  expect(nodes.find(node => node.kind === 'session' && node.sessionKey === 's2').label).toBe('');
  expect(sourcePaths(roots, 'unknown')[0][1].label).toBe('未记录用户');
  expect([...scopedRunIds(roots, nodes.find(node => node.kind === 'user' && node.userName === 'Alice'))]).toEqual(['r1']);
  expect(nodes.find(node => node.kind === 'bot' && node.botId === 'bot2').children[0].children[0].children).toEqual([]);
});

it('hydrates missing session records from batch membership and orders batches chronologically', () => {
  const later = { ...batch('later', ['Alice']), created_at: '2026-11-15T09:00:00Z' };
  const roots = buildProvenance([], [later, batch('earlier', ['Alice'])]);
  expect(flattenTree(roots).filter(node => node.kind === 'batch').map(node => node.runId)).toEqual(['earlier', 'later']);
});

it('groups shared sessions once using all recorded participants across batches', () => {
  const wikis = ['r1', 'r2'].map(runId => ({ id: runId, runId, context: { sessionKey: 's1' } }));
  const result = graphSources(wikis, [session], [batch('r1', ['Alice']), batch('r2', ['Bob'])]);
  expect(result).toHaveLength(2);
  expect(result[0].layoutSource.userLabel).toBe('Alice、Bob');
  expect(result[0].layoutSource.userId).toBe(result[1].layoutSource.userId);
  expect(result[0].layoutSource.sessionId).toBe(result[1].layoutSource.sessionId);
  expect(result[0].layoutSource.sessionLabel).toBe('真实会话名');
  expect(result[0].layoutSource.batchId).not.toBe(result[1].layoutSource.batchId);
});

it('keeps same-name users from different bots separate and does not attribute cross-session memories to the first session', () => {
  const other = { ...session, session_key: 's2', bot_id: 'bot2' };
  const wikis = ['s1', 's2'].map(sessionKey => ({ id: sessionKey, runId: 'r', context: { sessionKey } }));
  const result = graphSources([...wikis, { id: 'shared', runId: 'r', context: { task: { sessions: [{ session_key: 's1' }, { session_key: 's2' }] } } }], [session, other], []);
  expect(result[0].layoutSource.userId).not.toBe(result[1].layoutSource.userId);
  expect(result[2].layoutSource.sessionId).not.toBe(result[0].layoutSource.sessionId);
  expect(result[2].layoutSource.sessionId).not.toBe(result[1].layoutSource.sessionId);
});
