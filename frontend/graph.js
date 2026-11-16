import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createLayout, stableHash } from './graph-layout.js';

const palette = ['#4c79ac', '#418b80', '#b78c48', '#8e73ae', '#b76c72', '#4f889f'];
const $ = id => document.getElementById(id);

export function createGraph(onSelect, onReveal) {
  const stage = $('scene'), canvas = $('graph');
  const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(40, 1, 1, 20000);
  const controls = new OrbitControls(camera, canvas);
  controls.minDistance = 100; controls.maxDistance = 12000;
  controls.enableRotate = false; controls.mouseButtons.LEFT = THREE.MOUSE.PAN; controls.zoomSpeed = .85;
  controls.listenToKeyEvents(canvas);
  let renderer = null, context = null;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0xffffff, 0);
  } catch {
    try { context = canvas.getContext('2d'); } catch { /* The node list remains usable without a rendering context. */ }
  }
  $('graph-error').hidden = Boolean(renderer || context);
  const material = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, vertexColors: true,
    uniforms: { uPixelRatio: { value: renderer ? renderer.getPixelRatio() : 1 } },
    vertexShader: 'uniform float uPixelRatio; attribute float aSize; attribute float aOpacity; varying vec3 vColor; varying float vOpacity; void main(){vColor=color;vOpacity=aOpacity;vec4 mv=modelViewMatrix*vec4(position,1.0);gl_Position=projectionMatrix*mv;gl_PointSize=clamp(aSize*1200.0/max(150.0,-mv.z),7.0,32.0)*uPixelRatio;}',
    fragmentShader: 'varying vec3 vColor; varying float vOpacity; void main(){float r=length(gl_PointCoord-vec2(.5))*2.0;float a=(1.0-smoothstep(.82,1.0,r))*vOpacity;if(a<.01)discard;gl_FragColor=vec4(vColor,a);\n#include <colorspace_fragment>\n}',
  });
  let points, nodes = [], selected = null, hits = null, highlightedRunIds = null, groupColors = new Map();
  let width = 900, height = 800, signature = '', nodeListSignature = '', hovered = null, clusters = [], layoutRadius = 180;
  function projected(node) {
    const p = new THREE.Vector3(node.x, node.y, node.z).project(camera);
    return { x: (p.x + 1) * width / 2, y: (1 - p.y) * height / 2, z: p.z };
  }
  function home() {
    const radius = Math.max(180, layoutRadius);
    const distance = radius / Math.tan(camera.fov * Math.PI / 360) * 1.25 / Math.min(1, width / height);
    camera.position.set(0, 0, distance);
    controls.target.set(0, 0, 0); controls.update();
  }
  function updateGeometry() {
    if (!points) return;
    const geometry = points.geometry;
    nodes.forEach((node, i) => {
      geometry.attributes.position.setXYZ(i, node.x, node.y, node.z);
    });
    geometry.attributes.position.needsUpdate = true;
    geometry.computeBoundingSphere();
  }
  function paintSelection() {
    const activeId = selected?.memoryId || selected?.focusWiki?.memoryId;
    nodes.forEach((node, i) => {
      node.active = node.memoryId === activeId;
      node.sourceMatch = highlightedRunIds?.has(node.runId) || false;
      node.searchMatch = hits?.has(node.memoryId) || false;
      node.emphasized = node.active || node.sourceMatch || node.searchMatch;
      node.opacity = node.emphasized ? 1 : .78;
      node.size = node.active ? 20 : node.emphasized ? 17 : 12;
      const color = new THREE.Color(groupColors.get(node.group) || palette[stableHash(node.group) % palette.length]);
      if (node.emphasized) color.multiplyScalar(node.active ? .65 : .85);
      node.color = '#' + color.getHexString();
      points.geometry.attributes.color.setXYZ(i, color.r, color.g, color.b);
      points.geometry.attributes.aSize.setX(i, node.size);
      points.geometry.attributes.aOpacity.setX(i, node.opacity);
    });
    if (points) for (const name of ['color', 'aSize', 'aOpacity']) points.geometry.attributes[name].needsUpdate = true;
    const listSignature = nodes.map(node => node.id).join('|');
    if (listSignature !== nodeListSignature) $('node-list').replaceChildren(...nodes.map(node => {
      const button = document.createElement('button'); button.textContent = node.title;
      button.dataset.memoryId = node.memoryId; button.dataset.runId = node.runId; button.title = '单击阅读；双击定位左侧来源';
      button.onclick = () => onSelect(node); button.ondblclick = () => onReveal(node); return button;
    }));
    nodeListSignature = listSignature;
    for (const button of $('node-list').children) {
      const active = button.dataset.memoryId === activeId;
      button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active));
      button.classList.toggle('source-match', highlightedRunIds?.has(button.dataset.runId) || false);
      button.classList.toggle('search-match', hits?.has(button.dataset.memoryId) || false);
    }
    draw();
  }
  function rebuild(wikis) {
    if (points) { points.geometry.dispose(); scene.remove(points); }
    const layout = createLayout(wikis); nodes = layout.nodes; clusters = layout.clusters; layoutRadius = layout.radius;
    groupColors = new Map([...new Set(nodes.map(node => node.group))].sort().map((group, i) => [group, palette[i % palette.length]]));
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(nodes.length * 3), 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(new Float32Array(nodes.length * 3), 3));
    geometry.setAttribute('aSize', new THREE.Float32BufferAttribute(new Float32Array(nodes.length), 1));
    geometry.setAttribute('aOpacity', new THREE.Float32BufferAttribute(new Float32Array(nodes.length), 1));
    points = new THREE.Points(geometry, material); points.frustumCulled = false; scene.add(points);
    $('renderer-label').textContent = `2D · ${renderer ? 'WebGL' : context ? 'Canvas' : '节点列表'}`;
    $('graph-empty').hidden = nodes.length > 0;
    updateGeometry(); home(); paintSelection();
  }
  function drawClusters() {
    const svg = $('cluster-regions'), namespace = 'http://www.w3.org/2000/svg';
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    const elements = [];
    for (const cluster of clusters) {
      const p = projected({ ...cluster, z: 0 }), edge = projected({ x: cluster.x + cluster.radius, y: cluster.y, z: 0 });
      const radius = Math.abs(edge.x - p.x);
      if (radius < 3 || Math.abs(p.z) >= 1) continue;
      const group = document.createElementNS(namespace, 'g');
      group.setAttribute('class', `cluster-region ${cluster.kind}`); group.dataset.clusterId = cluster.id;
      const circle = document.createElementNS(namespace, 'circle');
      circle.setAttribute('cx', p.x); circle.setAttribute('cy', p.y); circle.setAttribute('r', radius);
      group.append(circle);
      // Labels use the space reserved inside each enclosing circle; zoom reveals smaller groups.
      const minimum = cluster.kind === 'batch' ? 48 : cluster.kind === 'session' ? 60 : 30;
      if (radius > minimum) {
        const text = document.createElementNS(namespace, 'text');
        text.setAttribute('x', p.x); text.setAttribute('y', p.y - radius + (cluster.kind === 'user' ? 17 : 14));
        const maxCharacters = Math.max(5, Math.floor(radius * 1.2 / 10));
        text.textContent = cluster.label.length > maxCharacters ? cluster.label.slice(0, maxCharacters) + '…' : cluster.label;
        group.append(text);
      }
      elements.push(group);
    }
    // Parents first, so their fill never covers the nested groups.
    elements.sort((a, b) => ['user', 'session', 'batch'].indexOf(a.classList[1]) - ['user', 'session', 'batch'].indexOf(b.classList[1]));
    svg.replaceChildren(...elements);
  }
  function draw() {
    camera.updateMatrixWorld();
    drawClusters();
    if (renderer) renderer.render(scene, camera);
    else if (context) {
      context.clearRect(0, 0, width, height);
      for (const node of [...nodes].sort((a, b) => projected(b).z - projected(a).z)) {
        const p = projected(node); if (Math.abs(p.z) >= 1) continue;
        const r = Math.min(32, Math.max(7, node.size * 1200 / camera.position.distanceTo(controls.target))) / 2;
        context.globalAlpha = node.opacity; context.fillStyle = node.color; context.beginPath(); context.arc(p.x, p.y, r, 0, Math.PI * 2); context.fill();
      }
      context.globalAlpha = 1;
    }
    const boxes = [], labels = [], rings = [];
    const candidates = [...nodes].sort((a, b) => (Number(b.active) * 4 + Number(b.id === hovered?.id) * 3 + Number(b.emphasized)) - (Number(a.active) * 4 + Number(a.id === hovered?.id) * 3 + Number(a.emphasized)));
    for (const node of candidates) {
      const p = projected(node); if (Math.abs(p.z) >= 1 || p.x < 0 || p.x > width || p.y < 0 || p.y > height) continue;
      if (node.emphasized) {
        const ring = document.createElement('span');
        ring.className = 'graph-ring' + (node.sourceMatch ? ' source-match' : '') + (node.searchMatch ? ' search-match' : '') + (node.active ? ' active' : '');
        ring.dataset.memoryId = node.memoryId; ring.style.left = p.x + 'px'; ring.style.top = p.y + 'px'; rings.push(ring);
      }
      if (!node.emphasized && node.id !== hovered?.id && !$('show-labels').checked) continue;
      const labelX = Math.max(88, Math.min(width - 88, p.x));
      const labelY = Math.min(height - 38, p.y);
      const box = { x: labelX - 82, y: labelY + 15, w: 164, h: 22 };
      if (!node.active && boxes.some(b => box.x < b.x + b.w && box.x + box.w > b.x && box.y < b.y + b.h && box.y + box.h > b.y)) continue;
      boxes.push(box);
      const label = document.createElement('span'); label.className = 'graph-label wiki' + (node.active ? ' focus' : '');
      label.classList.toggle('source-match', node.sourceMatch); label.classList.toggle('search-match', node.searchMatch);
      label.dataset.memoryId = node.memoryId; label.textContent = node.title; label.style.left = labelX + 'px'; label.style.top = labelY + 'px';
      if (labels.length < 80) labels.push(label);
    }
    $('node-highlights').replaceChildren(...rings);
    $('labels').replaceChildren(...labels);
  }
  function resize() {
    width = stage.clientWidth || 900; height = stage.clientHeight || 800;
    camera.aspect = width / height; camera.updateProjectionMatrix();
    if (renderer) renderer.setSize(width, height, false); else { canvas.width = width; canvas.height = height; }
    draw();
  }
  function pick(event) {
    const rect = canvas.getBoundingClientRect(); let best = null, distance = 18;
    for (const node of nodes) {
      const p = projected(node); if (Math.abs(p.z) >= 1) continue;
      const d = Math.hypot(event.clientX - rect.left - p.x, event.clientY - rect.top - p.y);
      if (d < distance) { distance = d; best = node; }
    }
    return best;
  }
  let start = null;
  canvas.addEventListener('pointerdown', event => { start = [event.clientX, event.clientY]; });
  canvas.addEventListener('pointerup', event => {
    if (start && event.button === 0 && Math.hypot(event.clientX - start[0], event.clientY - start[1]) < 5) { const node = pick(event); if (node) onSelect(node); }
    start = null;
  });
  canvas.addEventListener('dblclick', event => { const node = pick(event); if (node) onReveal(node); });
  canvas.addEventListener('pointermove', event => {
    hovered = event.buttons ? null : pick(event); const tip = $('hover-tip');
    tip.style.display = hovered ? 'block' : 'none'; canvas.style.cursor = hovered ? 'pointer' : 'grab';
    if (hovered) { const rect = canvas.getBoundingClientRect(); tip.textContent = hovered.title; tip.style.left = Math.max(5, Math.min(width - 230, event.clientX - rect.left + 14)) + 'px'; tip.style.top = Math.min(height - 60, event.clientY - rect.top + 14) + 'px'; }
    draw();
  });
  canvas.addEventListener('pointerleave', () => { start = null; hovered = null; $('hover-tip').style.display = 'none'; draw(); });
  controls.addEventListener('change', draw);
  $('reset').onclick = home;
  function zoom(factor) { const d = camera.position.clone().sub(controls.target).multiplyScalar(factor).clampLength(controls.minDistance, controls.maxDistance); camera.position.copy(controls.target).add(d); controls.update(); }
  $('zoom-in').onclick = () => zoom(.8); $('zoom-out').onclick = () => zoom(1.25);
  $('show-labels').onchange = draw;
  new ResizeObserver(resize).observe(stage); resize();
  return { update(nextData, selection, searchHits = null, sourceRunIds = null) {
    selected = selection; hits = searchHits; highlightedRunIds = sourceRunIds;
    const next = nextData.wikis.map(wiki => JSON.stringify([wiki.id, wiki.layoutSource])).sort().join('|');
    if (!points || next !== signature) { signature = next; rebuild(nextData.wikis); } else paintSelection();
  } };
}
