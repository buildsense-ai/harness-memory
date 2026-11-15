import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createLayout, stableHash } from './graph-layout.js';

const palette = ['#7ba9eb', '#6ac8b7', '#d9b978', '#ba9fd8', '#dc929c', '#86baca'];
const $ = id => document.getElementById(id);

export function createGraph(onSelect, onReveal) {
  const stage = $('scene'), canvas = $('graph');
  const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(40, 1, 1, 20000);
  const controls = new OrbitControls(camera, canvas);
  controls.minDistance = 100; controls.maxDistance = 12000;
  controls.rotateSpeed = .65; controls.zoomSpeed = .85;
  controls.listenToKeyEvents(canvas);
  let renderer = null, context = null;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x12171e, 1);
  } catch {
    try { context = canvas.getContext('2d'); } catch { /* The node list remains usable without a rendering context. */ }
  }
  $('graph-error').hidden = Boolean(renderer || context);
  const material = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, vertexColors: true,
    uniforms: { uPixelRatio: { value: renderer ? renderer.getPixelRatio() : 1 } },
    vertexShader: 'uniform float uPixelRatio; attribute float aSize; attribute float aOpacity; varying vec3 vColor; varying float vOpacity; void main(){vColor=color;vOpacity=aOpacity;vec4 mv=modelViewMatrix*vec4(position,1.0);gl_Position=projectionMatrix*mv;gl_PointSize=clamp(aSize*2000.0/max(150.0,-mv.z),16.0,90.0)*uPixelRatio;}',
    fragmentShader: 'varying vec3 vColor; varying float vOpacity; void main(){float r=length(gl_PointCoord-vec2(.5))*2.0;float a=(exp(-r*r*6.0)*.40+exp(-r*r*38.0)*.9)*(1.0-smoothstep(.60,1.0,r))*vOpacity;if(a<.003)discard;gl_FragColor=vec4(vColor,a);\n#include <colorspace_fragment>\n}',
  });
  let points, nodes = [], selected = null, hits = null, mode = $('graph-layout').value;
  let width = 900, height = 800, signature = '', nodeListSignature = '', simulation = null, frame = null, hovered = null;
  const cached = new Map();
  function projected(node) {
    const p = new THREE.Vector3(node.x, node.y, node.z).project(camera);
    return { x: (p.x + 1) * width / 2, y: (1 - p.y) * height / 2, z: p.z };
  }
  function home() {
    const radius = Math.max(180, ...nodes.map(node => Math.hypot(node.x, node.y, node.z)));
    const distance = radius / Math.tan(camera.fov * Math.PI / 360) * 1.25 / Math.min(1, width / height);
    camera.position.set(...(mode === 'map' ? [0, 0, distance] : [distance * .22, distance * .18, distance]));
    controls.target.set(0, 0, 0); controls.update();
  }
  function updateGeometry() {
    if (!points) return;
    const geometry = points.geometry;
    nodes.forEach((node, i) => {
      geometry.attributes.position.setXYZ(i, node.x, node.y, node.z);
      cached.set(mode + ':' + node.id, { x: node.x, y: node.y, z: node.z });
    });
    geometry.attributes.position.needsUpdate = true;
    geometry.computeBoundingSphere();
  }
  function paintSelection() {
    const activeId = selected?.memoryId || selected?.focusWiki?.memoryId;
    nodes.forEach((node, i) => {
      node.active = node.memoryId === activeId;
      node.related = node.runId === selected?.runId;
      node.opacity = hits && !hits.has(node.memoryId) ? .13 : node.active ? 1 : node.related ? .95 : .78;
      node.size = node.active ? 58 : node.related ? 38 : 29;
      const color = new THREE.Color(palette[stableHash(node.group) % palette.length]);
      node.color = '#' + color.getHexString();
      points.geometry.attributes.color.setXYZ(i, color.r, color.g, color.b);
      points.geometry.attributes.aSize.setX(i, node.size);
      points.geometry.attributes.aOpacity.setX(i, node.opacity);
    });
    if (points) for (const name of ['color', 'aSize', 'aOpacity']) points.geometry.attributes[name].needsUpdate = true;
    const listSignature = nodes.map(node => node.id).join('|');
    if (listSignature !== nodeListSignature) $('node-list').replaceChildren(...nodes.map(node => {
      const button = document.createElement('button'); button.textContent = node.title;
      button.dataset.memoryId = node.memoryId; button.title = '单击阅读；双击定位左侧来源';
      button.onclick = () => onSelect(node); button.ondblclick = () => onReveal(node); return button;
    }));
    nodeListSignature = listSignature;
    for (const button of $('node-list').children) {
      const active = button.dataset.memoryId === activeId;
      button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active));
    }
    draw();
  }
  function rebuild(wikis) {
    simulation?.stop(); if (frame) cancelAnimationFrame(frame);
    if (points) { points.geometry.dispose(); scene.remove(points); }
    const previous = new Map(wikis.map(wiki => [wiki.id, cached.get(mode + ':' + wiki.id)]));
    const layout = createLayout(wikis, mode, previous); nodes = layout.nodes; simulation = layout.simulation;
    simulation.tick(nodes.length < 500 ? 80 : 5);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(nodes.length * 3), 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(new Float32Array(nodes.length * 3), 3));
    geometry.setAttribute('aSize', new THREE.Float32BufferAttribute(new Float32Array(nodes.length), 1));
    geometry.setAttribute('aOpacity', new THREE.Float32BufferAttribute(new Float32Array(nodes.length), 1));
    points = new THREE.Points(geometry, material); points.frustumCulled = false; scene.add(points);
    controls.enableRotate = mode !== 'map';
    controls.mouseButtons.LEFT = mode === 'map' ? THREE.MOUSE.PAN : THREE.MOUSE.ROTATE;
    $('graph-instructions').textContent = mode === 'map' ? '拖拽平移 · 滚轮缩放 · 双击定位来源' : '拖拽旋转 · 右键平移 · 双击定位来源';
    $('renderer-label').textContent = `${mode === 'map' ? '2D' : '3D'} · ${renderer ? 'WebGL' : context ? 'Canvas' : '节点列表'}`;
    $('graph-empty').hidden = nodes.length > 0;
    updateGeometry(); home(); paintSelection();
    // Settle, then stop rendering. Selecting a Wiki never restarts the layout.
    function settle() {
      if (document.hidden) { frame = null; return; }
      simulation.tick(); updateGeometry(); draw();
      if (simulation.alpha() > simulation.alphaMin()) frame = requestAnimationFrame(settle); else { frame = null; simulation.stop(); }
    }
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches && nodes.length) frame = requestAnimationFrame(settle);
    else { simulation.tick(90); updateGeometry(); home(); draw(); }
  }
  function draw() {
    camera.updateMatrixWorld();
    if (renderer) renderer.render(scene, camera);
    else if (context) {
      context.clearRect(0, 0, width, height); context.fillStyle = '#12171e'; context.fillRect(0, 0, width, height);
      for (const node of [...nodes].sort((a, b) => projected(b).z - projected(a).z)) {
        const p = projected(node); if (Math.abs(p.z) >= 1) continue;
        const r = node.size * .55, g = context.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
        g.addColorStop(0, node.color); g.addColorStop(.18, node.color + 'aa'); g.addColorStop(1, node.color + '00');
        context.globalAlpha = node.opacity; context.fillStyle = g; context.fillRect(p.x - r, p.y - r, r * 2, r * 2);
      }
      context.globalAlpha = 1;
    }
    const boxes = [], labels = [];
    const candidates = [...nodes].sort((a, b) => Number(b.active || b.id === hovered?.id) - Number(a.active || a.id === hovered?.id));
    for (const node of candidates) {
      if (!node.active && node.id !== hovered?.id && (!$('show-labels').checked || node.opacity < .3)) continue;
      const p = projected(node); if (Math.abs(p.z) >= 1 || p.x < 0 || p.x > width || p.y < 0 || p.y > height) continue;
      const labelX = Math.max(88, Math.min(width - 88, p.x));
      const labelY = Math.min(height - 38, p.y);
      const box = { x: labelX - 82, y: labelY + 15, w: 164, h: 22 };
      if (!node.active && boxes.some(b => box.x < b.x + b.w && box.x + box.w > b.x && box.y < b.y + b.h && box.y + box.h > b.y)) continue;
      boxes.push(box);
      const label = document.createElement('span'); label.className = 'graph-label wiki' + (node.active ? ' focus' : '');
      label.textContent = node.title; label.style.left = labelX + 'px'; label.style.top = labelY + 'px'; labels.push(label);
      if (labels.length >= 80) break;
    }
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
  let latestWikis = [];
  $('graph-layout').onchange = () => { mode = $('graph-layout').value; signature = ''; rebuild(latestWikis); };
  new ResizeObserver(resize).observe(stage); resize();
  return { update(nextData, selection, searchHits = null) {
    latestWikis = nextData.wikis; selected = selection; hits = searchHits;
    const next = mode + ':' + latestWikis.map(wiki => wiki.id).sort().join('|');
    if (next !== signature) { signature = next; rebuild(latestWikis); } else paintSelection();
  } };
}
