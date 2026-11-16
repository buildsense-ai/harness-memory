import { expect, it } from 'vitest';
import { createLayout } from '../frontend/graph-layout.js';

const wikis = Array.from({ length: 60 }, (_, i) => ({ id: `m${i}`, runId: `r${i % 8}`, sessionKey: `s${i % 4}` }));

it('settles the two-dimensional graph into finite separated coordinates without inferred edges', () => {
  const { nodes } = createLayout(wikis);
  expect(nodes).toHaveLength(wikis.length);
  for (const node of nodes) {
    expect([node.x, node.y, node.z].every(Number.isFinite)).toBe(true);
    expect(node).not.toHaveProperty('links');
    expect(node.z).toBe(0);
  }
  const distances = nodes.flatMap((a, i) => nodes.slice(i + 1).map(b => Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z)));
  expect(Math.min(...distances)).toBeGreaterThan(35);
});

it('keeps deterministic positions regardless of result order', () => {
  const a = createLayout(wikis), b = createLayout([...wikis].reverse());
  expect(a.nodes.map(({ id, x, y, z }) => [id, x, y, z])).toEqual(b.nodes.map(({ id, x, y, z }) => [id, x, y, z]));
});

it('contains each batch inside its session and each session inside its user, with no sibling overlap', () => {
  const fixture = Array.from({ length: 120 }, (_, i) => ({ id: `m${i}`, runId: `r${i % 16}`,
    layoutSource: { userId: `u${i % 2}`, userLabel: `用户${i % 2}`, sessionId: `s${i % 8}`,
      sessionLabel: `会话${i % 8}`, batchId: `r${i % 16}`, batchLabel: `批次${i % 16}` } }));
  const { nodes, clusters } = createLayout(fixture);
  expect(clusters.filter(item => item.kind === 'user')).toHaveLength(2);
  expect(clusters.filter(item => item.kind === 'session')).toHaveLength(8);
  expect(clusters.filter(item => item.kind === 'batch')).toHaveLength(16);
  for (const group of clusters) {
    const parent = clusters.find(item => item.id === group.parentId);
    if (parent) expect(Math.hypot(group.x - parent.x, group.y - parent.y) + group.radius).toBeLessThan(parent.radius);
    for (const sibling of clusters.filter(item => item.parentId === group.parentId && item.id !== group.id)) {
      expect(Math.hypot(group.x - sibling.x, group.y - sibling.y)).toBeGreaterThan(group.radius + sibling.radius);
    }
  }
  for (const node of nodes) {
    const batch = clusters.find(item => item.id === node.batchGroup)!;
    expect(Math.hypot(node.x - batch.x, node.y - batch.y) + node.radius).toBeLessThan(batch.radius);
  }
  expect(createLayout([])).toEqual({ nodes: [], clusters: [], radius: 0 });
});
