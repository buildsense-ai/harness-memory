import { forceSimulation, forceManyBody, forceCollide, forceX, forceY, forceZ } from 'd3-force-3d';

export function stableHash(text) {
  let value = 2166136261;
  for (const char of text) value = Math.imul(value ^ char.codePointAt(0), 16777619);
  return value >>> 0;
}

// Source grouping is a visual aid, never a persisted or inferred semantic edge.
export function createLayout(wikis, mode, previous = new Map()) {
  const groups = [...new Set(wikis.map(wiki => wiki.sessionKey || wiki.context?.sessionKey || wiki.runId))].sort();
  const radius = Math.max(170, Math.sqrt(wikis.length) * 38);
  const nodes = [...wikis].sort((a, b) => a.id.localeCompare(b.id)).map((wiki, i) => {
    const group = wiki.sessionKey || wiki.context?.sessionKey || wiki.runId;
    const index = groups.indexOf(group), angle = index * 2.39996323;
    const spread = groups.length > 1 ? radius * Math.sqrt((index + .5) / groups.length) : 0;
    let ax = Math.cos(angle) * spread, ay = Math.sin(angle) * spread, az = 0;
    if (mode === 'sphere') {
      const y = 1 - 2 * (i + .5) / Math.max(1, wikis.length), r = Math.sqrt(1 - y * y);
      ax = Math.cos(i * 2.39996323) * r * radius; ay = y * radius; az = Math.sin(i * 2.39996323) * r * radius;
    } else if (mode === 'stars') az = ((stableHash(group) % 100) / 100 - .5) * radius;
    const cached = previous.get(wiki.id), jitter = stableHash(wiki.id);
    return { ...wiki, group, ax, ay, az, x: cached?.x ?? ax + Math.cos(jitter) * 45,
      y: cached?.y ?? ay + Math.sin(jitter) * 45, z: mode === 'map' ? 0 : cached?.z ?? az + Math.sin(jitter * 2) * 35 };
  });
  const simulation = forceSimulation(nodes, mode === 'map' ? 2 : 3).stop()
    .force('charge', forceManyBody().strength(mode === 'map' ? -650 : -140).distanceMax(radius * 2))
    .force('collision', forceCollide(25).iterations(2))
    .force('x', forceX(node => node.ax).strength(mode === 'sphere' ? .15 : .055))
    .force('y', forceY(node => node.ay).strength(mode === 'sphere' ? .15 : .055))
    .force('z', forceZ(node => node.az).strength(mode === 'sphere' ? .15 : .055))
    .velocityDecay(.45).alphaDecay(.045);
  return { nodes, simulation, radius };
}
