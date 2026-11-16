import { forceSimulation, forceCollide, forceX, forceY } from 'd3-force-3d';

export function stableHash(text) {
  let value = 2166136261;
  for (const char of text) value = Math.imul(value ^ char.codePointAt(0), 16777619);
  return value >>> 0;
}

// Pack the provenance hierarchy from the inside out. These circles are not semantic edges.
function pack(children, padding) {
  if (!children.length) return 0;
  const spread = Math.max(...children.map(child => child.radius)) * Math.sqrt(children.length);
  children.forEach((child, i) => {
    const angle = i * 2.39996323, distance = spread * Math.sqrt(i / children.length);
    child.x = Math.cos(angle) * distance; child.y = Math.sin(angle) * distance;
  });
  const simulation = forceSimulation(children, 2).stop()
    .force('collision', forceCollide(child => child.radius + 8).iterations(4))
    .force('x', forceX(0).strength(.035)).force('y', forceY(0).strength(.035))
    .velocityDecay(.5);
  simulation.tick(240); simulation.stop();
  // Remove the small overlaps that can remain at the simulation's equilibrium.
  for (let pass = 0; pass < 80; pass++) {
    let overlap = false;
    for (let i = 0; i < children.length; i++) for (let j = i + 1; j < children.length; j++) {
      const a = children[i], b = children[j], dx = b.x - a.x, dy = b.y - a.y;
      const distance = Math.hypot(dx, dy), required = a.radius + b.radius + 12;
      if (distance >= required - .001) continue;
      const ux = distance ? dx / distance : 1, uy = distance ? dy / distance : 0;
      const shift = (required - distance) / 2;
      a.x -= ux * shift; a.y -= uy * shift; b.x += ux * shift; b.y += uy * shift; overlap = true;
    }
    if (!overlap) break;
  }
  const left = Math.min(...children.map(child => child.x - child.radius));
  const right = Math.max(...children.map(child => child.x + child.radius));
  const top = Math.min(...children.map(child => child.y - child.radius));
  const bottom = Math.max(...children.map(child => child.y + child.radius));
  const cx = (left + right) / 2, cy = (top + bottom) / 2;
  children.forEach(child => { child.x -= cx; child.y -= cy; });
  return Math.max(...children.map(child => Math.hypot(child.x, child.y) + child.radius)) + padding;
}

export function createLayout(wikis) {
  const users = new Map();
  for (const wiki of [...wikis].sort((a, b) => a.id.localeCompare(b.id))) {
    const source = wiki.layoutSource || { userId: 'unknown', userLabel: '未记录用户',
      sessionId: wiki.sessionKey || wiki.context?.sessionKey || wiki.runId, sessionLabel: '会话', batchId: wiki.runId, batchLabel: '处理批次' };
    if (!users.has(source.userId)) users.set(source.userId, { id: source.userId, kind: 'user', label: source.userLabel, groups: new Map() });
    const user = users.get(source.userId);
    if (!user.groups.has(source.sessionId)) user.groups.set(source.sessionId, { id: source.sessionId, kind: 'session', label: source.sessionLabel, groups: new Map() });
    const session = user.groups.get(source.sessionId);
    if (!session.groups.has(source.batchId)) session.groups.set(source.batchId, { id: source.batchId, kind: 'batch', label: source.batchLabel, order: source.batchOrder || source.batchId, children: [] });
    session.groups.get(source.batchId).children.push({ ...wiki, kind: 'wiki', group: source.userId, batchGroup: source.batchId, sessionGroup: source.sessionId, radius: 20, z: 0 });
  }
  const root = { id: 'root', groups: users };
  function arrange(group) {
    if (group.groups) group.children = [...group.groups.values()].sort((a, b) => (a.order || a.id).localeCompare(b.order || b.id));
    group.children.filter(child => child.kind !== 'wiki').forEach(arrange);
    group.radius = pack(group.children, group.kind === 'user' ? 42 : group.kind === 'session' ? 30 : 22);
  }
  arrange(root);
  const nodes = [], clusters = [];
  function place(group, x, y, parentId) {
    for (const child of group.children) {
      child.x += x; child.y += y;
      if (child.kind === 'wiki') nodes.push(child);
      else {
        clusters.push({ id: child.id, kind: child.kind, label: child.label, x: child.x, y: child.y, radius: child.radius, parentId });
        place(child, child.x, child.y, child.id);
      }
    }
  }
  place(root, 0, 0, null);
  return { nodes: nodes.sort((a, b) => a.id.localeCompare(b.id)), clusters, radius: root.radius };
}
