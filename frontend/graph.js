import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const palette = ['#6e8bd0', '#60a296', '#789ab9', '#bf986f', '#b28a9a', '#8391ba'];
const $ = id => document.getElementById(id);

export function createGraph(onSelect) {
  const stage = $('scene'), canvas = $('graph');
  const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(40, 1, 1, 10000);
  const home = new THREE.Vector3(630, 540, 1050);
  camera.position.copy(home);
  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 0, 0);
  controls.minDistance = 350; controls.maxDistance = 4000;
  controls.minPolarAngle = .06; controls.maxPolarAngle = Math.PI - .06;
  controls.rotateSpeed = .65; controls.zoomSpeed = .75;
  controls.listenToKeyEvents(canvas);
  let renderer = null, context = null;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0xfcfcfc, 1);
  } catch {
    try { context = canvas.getContext('2d'); } catch { /* Accessible node list remains available. */ }
  }
  $('renderer-label').textContent = renderer ? '3D · WebGL' : context ? '3D · Canvas' : '节点列表';
  $('graph-error').hidden = Boolean(renderer || context);
  const material = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, vertexColors: true,
    uniforms: { uPixelRatio: { value: renderer ? renderer.getPixelRatio() : 1 } },
    vertexShader: 'uniform float uPixelRatio; attribute float aSize; varying vec3 vColor; void main(){vColor=color;vec4 mv=modelViewMatrix*vec4(position,1.0);gl_Position=projectionMatrix*mv;gl_PointSize=clamp(aSize*1050.0/max(150.0,-mv.z),8.0,78.0)*uPixelRatio;}',
    fragmentShader: 'varying vec3 vColor; void main(){float r=length(gl_PointCoord-vec2(.5))*2.0;float a=(exp(-r*r*4.8)*.27+exp(-r*r*34.0)*.75)*smoothstep(1.0,.50,r);if(a<.002)discard;gl_FragColor=vec4(vColor,a);\n#include <colorspace_fragment>\n}',
  });
  let points, nodes = [], segments = [], labels = [], lines = new THREE.Group();
  let width = 900, height = 800, selected = null, hits = null;
  let data = { batches: [], contexts: [], wikis: [] };
  scene.add(lines);
  const projected = v => {
    const p = v.clone().project(camera);
    return { x: (p.x + 1) * width / 2, y: (1 - p.y) * height / 2, z: p.z };
  };
  function segment(a, b, color, opacity) {
    segments.push({ a, b, color, opacity });
    lines.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([a, b]),
      new THREE.LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false })));
  }
  function rebuild() {
    for (const line of [...lines.children]) { line.geometry.dispose(); line.material.dispose(); lines.remove(line); }
    if (points) { points.geometry.dispose(); scene.remove(points); }
    nodes = []; segments = []; labels = [];
    const positions = new Map(), batchGroups = new Map();
    for (const b of data.batches) {
      const key = b.sessions.length === 1 ? b.sessions[0].session_key : `shared:${b.run_id}`;
      if (!batchGroups.has(key)) batchGroups.set(key, []);
      batchGroups.get(key).push(b);
    }
    const entries = [...batchGroups];
    entries.forEach(([key, batches], i) => {
      batches.sort((a, b) => a.created_at.localeCompare(b.created_at) || a.run_id.localeCompare(b.run_id));
      const columns = Math.min(3, entries.length);
      const cx = ((i % columns) - (columns - 1) / 2) * 280;
      const cz = (Math.floor(i / columns) - (Math.ceil(entries.length / columns) - 1) / 2) * 170;
      batches.forEach((b, j) => positions.set(b.run_id, new THREE.Vector3(cx + (j - (batches.length - 1) / 2) * Math.min(55, 230 / Math.max(1, batches.length)), -235, cz)));
      const first = positions.get(batches[0].run_id), last = positions.get(batches.at(-1).run_id);
      segment(first, last, '#9aa4b3', .35);
      const session = batches[0].sessions;
      labels.push({ position: first.clone().lerp(last, .5).add(new THREE.Vector3(0, 0, -30)), title: session.length === 1 ? session[0].session_id ?? session[0].stream_id ?? key : '多个会话', kind: 'session' });
    });
    for (const y of [235, -235]) {
      const corners = [[-445, y, -245], [445, y, -245], [445, y, 245], [-445, y, 245]].map(p => new THREE.Vector3(...p));
      for (let i = 0; i < 4; i++) segment(corners[i], corners[(i + 1) % 4], '#b9c0c8', .21);
      labels.push({ position: corners[0], title: y === 235 ? 'Wiki' : '会话批次', kind: 'layer' });
    }
    const activeRun = selected?.runId;
    const vertices = [], colors = [], sizes = [];
    const add = node => {
      const active = node.id === selected?.id || node.id === selected?.focusWiki?.id;
      const related = node.runId === activeRun;
      const match = !hits || node.kind === 'batch' || hits.has(node.memoryId);
      const color = new THREE.Color(node.color);
      if (!match) color.lerp(new THREE.Color('#ebedef'), .8);
      nodes.push({ ...node, active, related, color: '#' + color.getHexString() });
      vertices.push(node.position.x, node.position.y, node.position.z);
      colors.push(color.r, color.g, color.b); sizes.push(active ? 65 : related ? 47 : 32);
    };
    data.batches.forEach(b => {
      const p = positions.get(b.run_id);
      add({ id: b.run_id, runId: b.run_id, kind: 'batch', position: p, color: '#8b98aa', title: `${new Date(b.created_at).toLocaleString()} · ${b.task_count ?? 0} 个目标` + (b.sessions.length > 1 ? ' · 多会话' : '') });
      segment(p.clone().add(new THREE.Vector3(-8, 0, 0)), p.clone().add(new THREE.Vector3(8, 0, 0)), '#8e98a7', .7);
    });
    const wikisByRun = new Map();
    for (const wiki of data.wikis) { if (!wikisByRun.has(wiki.runId)) wikisByRun.set(wiki.runId, []); wikisByRun.get(wiki.runId).push(wiki); }
    for (const [runId, wikis] of wikisByRun) {
      const batch = positions.get(runId); if (!batch) continue;
      wikis.forEach((wiki, index) => {
        const angle = index * 2.39996323, radius = wikis.length === 1 ? 0 : 32 + Math.sqrt(index) * 20;
        const p = new THREE.Vector3(batch.x + Math.cos(angle) * radius, 235, batch.z + Math.sin(angle) * radius * .8);
        const color = palette[index % palette.length];
        add({ ...wiki, position: p, kind: 'wiki', color });
        if ($('show-links').checked || runId === activeRun) segment(p, batch, color, runId === activeRun ? .5 : .12);
      });
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.setAttribute('aSize', new THREE.Float32BufferAttribute(sizes, 1));
    points = new THREE.Points(geometry, material); points.frustumCulled = false; scene.add(points);
    $('node-list').replaceChildren(...nodes.map(n => {
      const button = document.createElement('button'); button.textContent = `${n.kind === 'wiki' ? 'Wiki' : '批次'} · ${n.title}`;
      button.classList.toggle('active', n.active); button.onclick = () => onSelect(n); return button;
    }));
    draw();
  }
  function draw() {
    camera.updateMatrixWorld();
    if (renderer) renderer.render(scene, camera);
    else if (context) {
      context.clearRect(0, 0, width, height);
      context.fillStyle = '#fcfcfc'; context.fillRect(0, 0, width, height);
      for (const s of segments) {
        const a = projected(s.a), b = projected(s.b); if (Math.abs(a.z) >= 1 || Math.abs(b.z) >= 1) continue;
        context.globalAlpha = s.opacity; context.strokeStyle = s.color; context.beginPath(); context.moveTo(a.x, a.y); context.lineTo(b.x, b.y); context.stroke();
      }
      context.globalAlpha = 1;
      for (const n of [...nodes].sort((a, b) => projected(b.position).z - projected(a.position).z)) {
        const p = projected(n.position); if (Math.abs(p.z) >= 1) continue;
        const r = n.active ? 20 : n.related ? 15 : 11;
        const g = context.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
        g.addColorStop(0, n.color + 'dc'); g.addColorStop(.2, n.color + '88'); g.addColorStop(1, n.color + '00');
        context.fillStyle = g; context.fillRect(p.x - r, p.y - r, r * 2, r * 2);
      }
    }
    $('labels').replaceChildren(...[...labels, ...nodes.filter(n => $('show-labels').checked || n.active)].flatMap(n => {
      const p = projected(n.position); if (Math.abs(p.z) >= 1) return [];
      const label = document.createElement('span'); label.className = 'graph-label ' + n.kind + (n.active ? ' focus' : '');
      label.textContent = n.title; label.style.left = p.x + 'px'; label.style.top = p.y + 'px'; return [label];
    }));
  }
  function resize() {
    width = stage.clientWidth || 900; height = stage.clientHeight || 800;
    camera.aspect = width / height; camera.updateProjectionMatrix();
    if (renderer) renderer.setSize(width, height, false); else { canvas.width = width; canvas.height = height; }
    draw();
  }
  function pick(e) {
    const rect = canvas.getBoundingClientRect(); let best = null, distance = 19;
    for (const n of nodes) { const p = projected(n.position); if (Math.abs(p.z) >= 1) continue;
      const d = Math.hypot(e.clientX - rect.left - p.x, e.clientY - rect.top - p.y);
      if (d < distance) { distance = d; best = n; }
    } return best;
  }
  let start = null;
  canvas.addEventListener('pointerdown', e => { start = [e.clientX, e.clientY]; });
  canvas.addEventListener('pointerup', e => {
    if (start && e.button === 0 && Math.hypot(e.clientX - start[0], e.clientY - start[1]) < 5) { const node = pick(e); if (node) onSelect(node); }
    start = null;
  });
  canvas.addEventListener('pointermove', e => {
    const node = e.buttons ? null : pick(e), tip = $('hover-tip');
    tip.style.display = node ? 'block' : 'none'; canvas.style.cursor = node ? 'pointer' : 'grab';
    if (node) { const rect = canvas.getBoundingClientRect(); tip.textContent = node.title; tip.style.left = Math.max(5, Math.min(width - 220, e.clientX - rect.left + 14)) + 'px'; tip.style.top = Math.min(height - 50, e.clientY - rect.top + 14) + 'px'; }
  });
  canvas.addEventListener('pointerleave', () => { start = null; $('hover-tip').style.display = 'none'; });
  controls.addEventListener('change', draw);
  $('reset').onclick = () => { camera.position.copy(home); controls.target.set(0, 0, 0); controls.update(); draw(); };
  $('view-front').onclick = () => { camera.position.set(80, 260, 1400); controls.target.set(0, 0, 0); controls.update(); };
  $('view-top').onclick = () => { camera.position.set(0, 1400, 1); controls.target.set(0, 0, 0); controls.update(); };
  function zoom(factor) { const d = camera.position.clone().sub(controls.target).multiplyScalar(factor).clampLength(controls.minDistance, controls.maxDistance); camera.position.copy(controls.target).add(d); controls.update(); }
  $('zoom-in').onclick = () => zoom(.88); $('zoom-out').onclick = () => zoom(1.12);
  $('show-labels').onchange = draw; $('show-links').onchange = rebuild;
  new ResizeObserver(resize).observe(stage); resize();
  return { update(nextData, selection, searchHits = null) { data = nextData; selected = selection; hits = searchHits; rebuild(); } };
}
