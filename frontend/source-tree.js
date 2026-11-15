import { flattenTree, sourcePaths } from './provenance.js';

const icons = { bot: '◈', user: '◉', session: '▤', batch: '·' };

export function createSourceTree(container, onScope) {
  const expanded = new Set(), initialized = new Set();
  let roots = [], scope = null, selectedRunId = null;
  function render() {
    const scroll = container.scrollTop;
    const focused = container.contains(document.activeElement) ? {
      id: document.activeElement.closest('.tree-row')?.dataset.treeId,
      toggle: document.activeElement.classList.contains('tree-toggle'),
    } : null;
    const paths = sourcePaths(roots, selectedRunId);
    const related = new Set(paths.flatMap(path => path.map(node => node.id)));
    const rows = [];
    function visit(nodes, depth) {
      for (const node of nodes) {
        const row = document.createElement('div'); row.className = 'tree-row';
        row.style.setProperty('--depth', depth); row.dataset.treeId = node.id; row.dataset.kind = node.kind;
        if (node.runId) row.dataset.runId = node.runId;
        row.classList.toggle('is-scope', scope?.id === node.id);
        row.classList.toggle('is-related', related.has(node.id));
        row.classList.toggle('is-selected', node.kind === 'batch' && node.runId === selectedRunId);
        const toggle = document.createElement('button'); toggle.className = 'tree-toggle';
        toggle.textContent = node.kind === 'batch' ? '' : expanded.has(node.id) ? '⌄' : '›';
        toggle.disabled = node.kind === 'batch';
        toggle.setAttribute('aria-label', `${expanded.has(node.id) ? '收起' : '展开'}${node.label || '会话'}`);
        if (node.kind !== 'batch') toggle.setAttribute('aria-expanded', String(expanded.has(node.id)));
        toggle.onclick = () => { if (expanded.has(node.id)) expanded.delete(node.id); else expanded.add(node.id); render(); };
        const button = document.createElement('button'); button.className = 'tree-select';
        button.setAttribute('aria-pressed', String(scope?.id === node.id));
        const icon = document.createElement('span'); icon.className = 'tree-icon'; icon.textContent = icons[node.kind]; icon.setAttribute('aria-hidden', 'true');
        const label = document.createElement('span'); label.className = 'tree-label';
        const receivedAt = node.session?.first_received_at || node.session?.last_received_at || node.children[0]?.batch?.created_at;
        label.textContent = node.kind === 'batch' ? new Date(node.batch.created_at).toLocaleString([], { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
          : node.label || (receivedAt ? new Date(receivedAt).toLocaleDateString() : '—');
        const count = document.createElement('small');
        count.textContent = node.kind === 'batch' ? `${node.batch.published_memory_count} Wiki` : String(node.children.length);
        button.title = node.session?.session_key || (node.kind === 'batch' ? `${node.batch.status} · ${node.runId}` : node.label);
        button.setAttribute('aria-label', `${{ bot: 'Bot', user: '用户', session: '会话', batch: '批次' }[node.kind]} ${label.textContent}`);
        button.onclick = () => { expanded.add(node.id); onScope(node); };
        button.append(icon, label, count); row.append(toggle, button); rows.push(row);
        if (expanded.has(node.id)) visit(node.children, depth + 1);
      }
    }
    visit(roots, 0); container.replaceChildren(...rows); container.scrollTop = scroll;
    const focusedRow = focused && rows.find(row => row.dataset.treeId === focused.id);
    focusedRow?.querySelector(focused.toggle ? '.tree-toggle' : '.tree-select').focus({ preventScroll: true });
  }
  return {
    update(nextRoots, nextScope, runId) {
      roots = nextRoots; scope = nextScope; selectedRunId = runId;
      for (const node of flattenTree(roots)) if (!initialized.has(node.id)) {
        if (node.kind === 'bot' || node.kind === 'user') expanded.add(node.id); initialized.add(node.id);
      }
      render();
    },
    reveal(runId, scroll = false) {
      selectedRunId = runId;
      const paths = sourcePaths(roots, runId);
      for (const path of paths) for (const node of path) expanded.add(node.id);
      render();
      if (scroll) {
        const path = paths.find(path => path.some(node => node.id === scope?.id)) || paths[0];
        const target = path && [...container.children].find(row => row.dataset.treeId === path.at(-1).id);
        if (target) container.scrollTop += target.getBoundingClientRect().top - container.getBoundingClientRect().top - container.clientHeight * .4;
      }
    },
  };
}
