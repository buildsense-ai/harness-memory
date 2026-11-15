import { expect, it } from 'vitest';
import { createLayout } from '../frontend/graph-layout.js';

const wikis = Array.from({ length: 60 }, (_, i) => ({ id: `m${i}`, runId: `r${i % 8}`, sessionKey: `s${i % 4}` }));

it.each(['map', 'stars', 'sphere'])('settles %s into finite separated coordinates without inferred edges', mode => {
  const { nodes, simulation } = createLayout(wikis, mode);
  simulation.tick(200);
  expect(nodes).toHaveLength(wikis.length);
  for (const node of nodes) {
    expect([node.x, node.y, node.z].every(Number.isFinite)).toBe(true);
    expect(node).not.toHaveProperty('links');
    if (mode === 'map') expect(node.z).toBe(0);
  }
  const distances = nodes.flatMap((a, i) => nodes.slice(i + 1).map(b => Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z)));
  expect(Math.min(...distances)).toBeGreaterThan(35);
  expect(simulation.alpha()).toBeLessThan(simulation.alphaMin());
  simulation.stop();
});

it('keeps cached positions and deterministic initial positions regardless of result order', () => {
  const a = createLayout(wikis, 'stars'), b = createLayout([...wikis].reverse(), 'stars');
  expect(a.nodes.map(({ id, x, y, z }) => [id, x, y, z])).toEqual(b.nodes.map(({ id, x, y, z }) => [id, x, y, z]));
  a.simulation.tick(120);
  const cached = new Map(a.nodes.map(node => [node.id, { x: node.x, y: node.y, z: node.z }]));
  const restored = createLayout(wikis, 'stars', cached);
  expect(restored.nodes.map(node => [node.id, node.x, node.y, node.z])).toEqual(a.nodes.map(node => [node.id, node.x, node.y, node.z]));
  for (const layout of [a, b, restored]) layout.simulation.stop();
});
