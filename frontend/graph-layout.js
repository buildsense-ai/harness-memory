import { forceSimulation, forceManyBody, forceCollide, forceX, forceY } from 'd3-force-3d';

export function stableHash(text) {
  let value = 2166136261;
  for (const char of text) value = Math.imul(value ^ char.codePointAt(0), 16777619);
  return value >>> 0;
}

// Source grouping is a visual aid, never a persisted or inferred semantic edge.
export function createLayout(wikis, previous = new Map()) {
  const groups = [...new Set(wikis.map(wiki => wiki.sessionKey || wiki.context?.sessionKey || wiki.runId))].sort();
  const radius = Math.max(170, Math.sqrt(wikis.length) * 38);
  const nodes = [...wikis].sort((a, b) => a.id.localeCompare(b.id)).map(wiki => {
    const group = wiki.sessionKey || wiki.context?.sessionKey || wiki.runId;
    const index = groups.indexOf(group), angle = index * 2.39996323;
    const spread = groups.length > 1 ? radius * Math.sqrt((index + .5) / groups.length) : 0;
    const ax = Math.cos(angle) * spread, ay = Math.sin(angle) * spread;
    const cached = previous.get(wiki.id), jitter = stableHash(wiki.id);
    return { ...wiki, group, ax, ay, x: cached?.x ?? ax + Math.cos(jitter) * 45,
      y: cached?.y ?? ay + Math.sin(jitter) * 45, z: 0 };
  });
  const simulation = forceSimulation(nodes, 2).stop()
    .force('charge', forceManyBody().strength(-650).distanceMax(radius * 2))
    .force('collision', forceCollide(25).iterations(2))
    .force('x', forceX(node => node.ax).strength(.055))
    .force('y', forceY(node => node.ay).strength(.055))
    .velocityDecay(.45).alphaDecay(.045);
  return { nodes, simulation, radius };
}
