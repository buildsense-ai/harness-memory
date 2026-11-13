import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { createGraph } from './graph.js';

marked.setOptions({ gfm: true, breaks: false });
const $ = id => document.getElementById(id);
const state = { key: '', sessions: [], batches: [], contexts: [], wikis: [], selected: null, loading: false, error: '', sessionOffset: 0, batchOffset: 0, searchHits: null, abort: null, generation: 0, uploadKeyId: '', dateFrom: '', dateTo: '', uploadKeys: [] };
const graph = createGraph(selectNode);
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const labelRun = run => `${new Date(run.created_at).toLocaleString()} · ${run.status} · ${run.task_count ?? 0} tasks · ${run.published_memory_count ?? 0} Wiki`;
function toast(text) { $('toast').textContent = text; $('toast').classList.add('visible'); setTimeout(() => $('toast').classList.remove('visible'), 2400); }
async function api(path, options = {}, signal) {
  const response = await fetch('/v1' + path, { ...options, signal, headers: { authorization: 'Bearer ' + state.key, ...(options.body ? { 'content-type': 'application/json' } : {}), ...options.headers } });
  if (!response.ok) { const body = await response.json().catch(() => ({})); throw new Error(body.error || `HTTP ${response.status}`); }
  return response.json();
}
function resetData() {
  state.generation++; state.abort?.abort(); state.abort = null;
  state.sessions = []; state.batches = []; state.contexts = []; state.wikis = []; state.selected = null; state.searchHits = null;
  state.activeSession = null; state.sessionOffset = 0; state.batchOffset = 0; state.sessionNext = null; state.batchNext = null; state.totalBatches = 0;
  graph.update({ sessions: [], batches: [], contexts: [], wikis: [] }, null);
  $('sessions').replaceChildren(); $('search-results').replaceChildren(); $('reader-content').replaceChildren();
  $('reader-title').textContent = ''; $('reader-id').textContent = ''; $('reader-meta').textContent = '';
}
function renderGraph() {
  graph.update({ sessions: state.sessions, batches: state.batches, contexts: state.contexts, wikis: state.wikis }, state.selected, state.searchHits);
  $('map-status').textContent = state.loading ? '加载中…' : state.error ? '读取失败' : `${state.batches.length} / ${state.totalBatches ?? state.batches.length} 批次已载入`;
  $('sample-count').textContent = `${state.wikis.length} 篇 Wiki · ${state.contexts.length} 个上下文`;
  $('selection-path').textContent = state.selected ? `${state.selected.sessionLabel || state.selected.sessions?.[0]?.session_id || state.selected.sessions?.[0]?.stream_id || '来源'} / ${state.selected.runLabel || state.selected.title}` : '';
}
function renderSidebar() {
  $('session-count').textContent = String(state.sessions.length);
  $('sessions').replaceChildren(...state.sessions.map(session => {
    const group = document.createElement('section'); group.className = 'session-group';
    const title = document.createElement('button'); title.className = 'session-name';
    title.textContent = session.session_id || session.stream_id || session.source_id; title.title = session.session_key;
    title.onclick = async () => { try { state.activeSession = session; state.batches = []; state.contexts = []; state.wikis = []; state.batchOffset = 0; state.selected = null; await loadBatches(); renderSidebar(); renderGraph(); const first = state.batches[0]; if (first) await loadBatch(first.run_id); } catch (e) { toast('会话载入失败：' + e.message); } };
    const info = document.createElement('small'); info.textContent = `${session.raw_record_count} records`;
    title.append(info); group.append(title);
    const list = document.createElement('div'); list.className = 'batch-list';
    for (const batch of state.batches.filter(b => b.sessions.some(s => s.session_key === session.session_key))) {
      const button = document.createElement('button'); button.className = 'batch-button' + (state.selected?.runId === batch.run_id ? ' active' : '');
      button.textContent = new Date(batch.created_at).toLocaleString(); button.onclick = () => loadBatch(batch.run_id); list.append(button);
    }
    group.append(list); return group;
  }));
  $('more-sessions').hidden = !state.sessionNext;
  $('more-runs').hidden = !state.batchNext;
}
function renderMarkdown(target, markdown) { target.innerHTML = DOMPurify.sanitize(marked.parse(markdown), { USE_PROFILES: { html: false } }); }
function eventText(event) {
  const text = event.text || JSON.stringify(event.content, null, 2);
  return text.length > 30000 ? text.slice(0, 30000) + '\n… clipped in viewer; use the exact source reference to inspect raw bytes.' : text;
}
function renderSource(container, events, selectedOnly = false) {
  container.replaceChildren();
  const groups = new Map();
  for (const event of events) { const key = event.session_key + '\0' + (event.source_group || event.conversation_run_id || event.ref); if (!groups.has(key)) groups.set(key, []); groups.get(key).push(event); }
  for (const group of groups.values()) {
    const queries = group.filter(e => e.kind === 'query');
    const runIds = [...new Set(group.map(e => e.conversation_run_id).filter(Boolean))];
    group.forEach((event, index) => {
      if (event.kind === 'tool_result' && event.tool_call_id) {
        const prior = group.find(e => e.kind === 'tool_call' && e.tool_call_id === event.tool_call_id);
        if (prior) return;
      }
      const article = document.createElement(event.kind === 'tool_call' ? 'details' : 'article');
      article.className = event.kind === 'tool_call' ? 'tool-pair' : 'event' + (event.kind === 'message' ? ' msg' : '') + (event.selected ? '' : ' unselected');
      if (event.kind === 'tool_call') {
        const summary = document.createElement('summary');
        const paired = group.find(e => e.kind === 'tool_result' && e.tool_call_id === event.tool_call_id);
        summary.textContent = `${event.selected ? '已选' : '未选'} · ${event.content?.name || 'tool'}${paired ? ' · call/result' : event.tool_pair_ref ? ' · result on another page' : ' · result missing'}`;
        const body = document.createElement('div'); body.className = 'tool-body';
        const call = document.createElement('pre'); call.textContent = eventText(event);
        body.append(call);
        if (paired) { const result = document.createElement('pre'); result.textContent = eventText(paired); body.append(result); }
        else if (event.tool_pair_ref) {
          const loadPair = document.createElement('button'); loadPair.textContent = '加载配对结果';
          loadPair.onclick = async () => {
            try {
              const response = await api('/read', { method: 'POST', body: JSON.stringify({ ref: event.tool_pair_ref }) });
              const result = document.createElement('pre'); result.textContent = eventText({ ...response.event, selected: event.tool_pair_selected });
              loadPair.replaceWith(result);
            } catch (error) { toast('工具结果读取失败：' + error.message); }
          };
          body.append(loadPair);
        }
        article.append(summary, body);
      } else {
        const heading = document.createElement('div'); heading.className = 'event-heading';
        heading.textContent = `${event.kind} · ${event.timestamp || ''} · ${event.ref}`;
        const p = document.createElement('p'); p.textContent = eventText(event);
        article.append(heading, p);
      }
      container.append(article);
    });
    const queriesText = queries.map(q => q.text).join('\n');
    const heading = document.createElement('div'); heading.className = 'episode-divider';
    heading.textContent = `${runIds.length ? '执行段 ' + runIds.join(', ') : '日志段'} · ${queries.length} query · ${group.filter(e => e.selected).length}/${group.length} selected`;
    container.insertBefore(heading, container.lastChild);
    void queriesText;
  }
}
function renderReader() {
  const selection = state.selected;
  document.querySelectorAll('[data-view]').forEach(el => el.classList.toggle('active', el.dataset.view === (selection?.kind === 'wiki' ? 'wiki' : selection?.kind === 'context' ? 'context' : 'batch')));
  if (!selection) { $('reader-label').textContent = '未连接'; $('reader-content').textContent = state.error || '使用项目 Key 连接记忆服务'; $('reader-footnote').textContent = '未读取服务器内容'; $('follow-source').disabled = true; return; }
  $('reader-title').textContent = selection.title; $('reader-id').textContent = selection.id;
  $('reader-content').replaceChildren(); $('reader-meta').replaceChildren(); $('follow-source').disabled = false;
  if (selection.kind === 'wiki') {
    $('reader-label').textContent = 'Wiki'; $('reader-footnote').textContent = '保存的 Markdown · 引用 Episode 原文';
    renderMarkdown($('reader-content'), selection.markdown || '加载记忆…');
    $('reader-meta').textContent = `${selection.sessionLabel} · ${selection.runLabel}`;
  } else if (selection.kind === 'context') {
    $('reader-label').textContent = selection.selectionSource === 'published_episode' ? 'Episode 上下文' : '候选上下文';
    $('reader-footnote').textContent = selection.selectionSource === 'published_episode' ? '已保存 Episode 成员高亮；同批次其余输入淡显' : '尚未发布；按生成候选规则预览';
    $('reader-meta').textContent = `${selection.selectedCount} selected · ${selection.events?.length ?? 0} loaded`;
    const marker = document.createElement('div'); marker.className = 'episode-divider'; marker.textContent = `Episode · ${selection.title} · ${selection.selectionSource === 'published_episode' ? '已发布' : '候选预览'}`; $('reader-content').append(marker);
    renderSource($('reader-content'), selection.events || []);
  } else {
    $('reader-label').textContent = `会话批次 · ${selection.status}`;
    $('reader-footnote').textContent = '当前批次完整输入；滚动到底载入下一批次';
    $('reader-meta').textContent = `${selection.input_event_count} events · ${selection.task_count} tasks · ${selection.published_memory_count} Wiki`;
    if (selection.error) { const error = document.createElement('p'); error.className = 'reader-error'; error.textContent = `处理错误：${selection.error}`; $('reader-content').append(error); }
    renderSource($('reader-content'), selection.events || [], false);
  }
}
async function loadBatch(runId) {
  const run = state.batches.find(b => b.run_id === runId); if (!run) return;
  state.selected = { id: runId, runId, kind: 'batch', title: labelRun(run), status: run.status, ...run, events: [] };
  renderGraph(); renderReader();
  const generation = state.generation, controller = new AbortController(); state.abort?.abort(); state.abort = controller;
  try {
    const response = await api(`/workbench/runs/${encodeURIComponent(runId)}/events?limit=100`, {}, controller.signal);
    if (generation !== state.generation || state.selected?.runId !== runId) return;
    state.selected.events.push(...response.items); state.selected.nextOffset = response.next_offset; renderReader();
  } catch (e) { if (e.name !== 'AbortError') toast('批次读取失败：' + e.message); }
}
async function loadContext(node) {
  state.selected = { ...node, title: node.title || node.task.title, selectionSource: 'candidate_preview', events: [], selectedCount: 0 };
  renderGraph(); renderReader(); const generation = state.generation;
  const response = await api(`/workbench/runs/${encodeURIComponent(node.runId)}/events?thread_id=${encodeURIComponent(node.threadId)}&context=true&limit=100`);
  if (generation !== state.generation || state.selected?.id !== node.id) return;
  Object.assign(state.selected, response, { events: response.items }); renderReader();
}
async function loadWiki(node) {
  state.selected = { ...node, kind: 'wiki', title: node.title, markdown: null };
  renderGraph(); renderReader(); const generation = state.generation;
  const response = await api(`/memories/${encodeURIComponent(node.memoryId)}`);
  if (generation !== state.generation || state.selected?.id !== node.id) return;
  Object.assign(state.selected, { markdown: response.markdown }); renderReader();
}
async function selectNode(node) {
  try {
    if (node.kind === 'wiki') await loadWiki(node);
    else if (node.kind === 'context') await loadContext(node);
    else await loadBatch(node.runId);
  } catch (e) { toast('读取失败：' + e.message); }
}
async function loadSessions(append = false) {
  const generation = state.generation;
  const params = new URLSearchParams({ limit: '50', offset: String(append ? state.sessionOffset : 0) });
  if (state.uploadKeyId) params.set('upload_key_id', state.uploadKeyId);
  if (state.dateFrom) params.set('date_from', state.dateFrom);
  if (state.dateTo) params.set('date_to', state.dateTo);
  const result = await api(`/workbench/sessions?${params}`);
  if (generation !== state.generation) return;
  if (!append) state.sessions = [];
  state.sessions.push(...result.items); state.sessionOffset = state.sessions.length; state.sessionNext = result.next_offset;
}
async function loadBatches(append = false) {
  const generation = state.generation;
  const params = new URLSearchParams({ limit: '50', offset: String(append ? state.batchOffset : 0) });
  if (state.activeSession) params.set('session_key', state.activeSession.session_key);
  if (state.uploadKeyId) params.set('upload_key_id', state.uploadKeyId);
  if (state.dateFrom) params.set('date_from', state.dateFrom);
  if (state.dateTo) params.set('date_to', state.dateTo);
  const result = await api(`/workbench/runs?${params}`);
  if (!append) state.batches = [];
  state.batches.push(...result.items); state.batchOffset = state.batches.length; state.batchNext = result.next_offset; state.totalBatches = result.total;
  const taskRuns = result.items.filter(run => run.task_count);
  const graphs = await Promise.all(taskRuns.map(run => api(`/workbench/runs/${encodeURIComponent(run.run_id)}/graph?limit=100`)));
  if (generation !== state.generation) return;
  for (let i = 0; i < taskRuns.length; i++) {
    for (const task of graphs[i].tasks) {
      const id = `${taskRuns[i].run_id}:${task.thread_id}`;
      const session = task.sessions.find(s => !state.activeSession || s.session_key === state.activeSession.session_key) || taskRuns[i].sessions[0];
      const context = { id: `context:${id}`, runId: taskRuns[i].run_id, threadId: task.thread_id, title: task.title, task, episode: task.episode, memoryId: task.episode?.memory_id, sessionKey: session?.session_key, sessionLabel: session?.session_id || session?.stream_id, runLabel: labelRun(taskRuns[i]) };
      state.contexts.push(context);
      if (context.memoryId) state.wikis.push({ id: context.memoryId, memoryId: context.memoryId, contextId: context.id, runId: context.runId, threadId: context.threadId, title: task.title, context, sessionLabel: context.sessionLabel, runLabel: context.runLabel });
    }
  }
}
async function connect(key) {
  state.key = key.trim(); if (!state.key) throw new Error('请填写项目 Key');
  resetData(); state.loading = true; state.error = ''; $('refresh').disabled = true;
  const generation = state.generation;
  try {
    const filters = await api('/workbench/filters');
    state.uploadKeys = filters.upload_keys;
    $('upload-key-filter').replaceChildren(new Option('全部上传来源', ''), ...state.uploadKeys.map(item => new Option(`${item.label} · ${(item.harnesses || []).join(', ')} · ${(item.source_ids || []).join(', ')} · ${item.record_count} 条`, item.upload_key_id ?? '__unattributed__')));
    $('upload-key-filter').value = state.uploadKeyId;
    await Promise.all([loadSessions(), loadBatches()]);
    if (generation !== state.generation) return;
    state.loading = false; renderSidebar(); renderGraph();
    const first = state.wikis[0] || state.contexts[0] || state.batches[0]; if (first) await selectNode(first);
    $('connection-dialog').close(); $('refresh').disabled = false; $('connection-button').textContent = '已连接'; toast('已连接项目数据');
  } catch (e) {
    state.loading = false; state.error = e.message; resetData(); state.error = e.message; renderGraph(); renderReader();
    $('connection-error').textContent = e.message;
  }
}
function disconnect() { state.key = ''; state.uploadKeyId = ''; state.dateFrom = ''; state.dateTo = ''; $('upload-key-filter').value = ''; $('date-from').value = ''; $('date-to').value = ''; resetData(); state.error = ''; $('refresh').disabled = true; $('connection-button').textContent = '连接'; renderGraph(); renderReader(); }
$('connect-form').onsubmit = async e => { e.preventDefault(); try { await connect($('project-key').value); $('project-key').value = ''; } catch (err) { $('connection-error').textContent = err.message; } };
$('connection-button').onclick = () => { if (state.key) disconnect(); else { $('connection-dialog').showModal(); $('connection-error').textContent = ''; } };
$('cancel-connect').onclick = () => $('connection-dialog').close();
$('refresh').onclick = async () => { if (!state.key) return; state.loading = true; await connect(state.key); };
$('upload-key-filter').onchange = () => applyFilters();
$('date-from').onchange = () => applyFilters();
$('date-to').onchange = () => applyFilters();
$('clear-filters').onclick = () => { $('upload-key-filter').value = ''; $('date-from').value = ''; $('date-to').value = ''; applyFilters(); };
async function applyFilters() {
  state.uploadKeyId = $('upload-key-filter').value;
  state.dateFrom = $('date-from').value;
  state.dateTo = $('date-to').value;
  if (state.dateFrom && state.dateTo && state.dateFrom > state.dateTo) { toast('开始日期不能晚于结束日期'); return; }
  if (!state.key) return;
  state.generation++; state.abort?.abort(); state.abort = null;
  state.sessions = []; state.batches = []; state.contexts = []; state.wikis = []; state.selected = null;
  state.activeSession = null; state.sessionOffset = 0; state.batchOffset = 0; state.searchHits = null;
  $('search-results').replaceChildren(); $('search').value = '';
  try { await Promise.all([loadSessions(), loadBatches()]); renderSidebar(); renderGraph(); const first = state.wikis[0] || state.contexts[0] || state.batches[0]; if (first) await selectNode(first); }
  catch (e) { toast('筛选数据载入失败：' + e.message); }
}
$('more-sessions').onclick = async () => { try { await loadSessions(true); renderSidebar(); } catch (e) { toast(e.message); } };
$('more-runs').onclick = async () => { try { await loadBatches(true); renderSidebar(); renderGraph(); } catch (e) { toast(e.message); } };
$('search-form').onsubmit = async e => {
  e.preventDefault(); if (!state.key) { $('connection-dialog').showModal(); return; }
  const keywords = $('search').value.trim().split(/\s+/).filter(Boolean); if (!keywords.length) { state.searchHits = null; renderGraph(); $('search-results').replaceChildren(); return; }
  try {
    const result = await api('/memories/search', { method: 'POST', body: JSON.stringify({ keywords, operator: $('search-operator').value, limit: 10, ...(state.uploadKeyId ? { upload_key_id: state.uploadKeyId } : {}), ...(state.dateFrom ? { date_from: state.dateFrom } : {}), ...(state.dateTo ? { date_to: state.dateTo } : {}) }) });
    const details = await Promise.all(result.items.map(item => api('/memories/' + encodeURIComponent(item.memory_id))));
    state.searchHits = new Set(details.map(item => item.memory_id)); renderGraph();
    $('search-results').replaceChildren(...details.map(item => {
      const button = document.createElement('button'); button.textContent = item.markdown.split('\n').find(line => line.startsWith('# '))?.slice(2) || item.memory_id;
      button.onclick = async () => {
        let existing = state.wikis.find(w => w.memoryId === item.memory_id);
        if (!existing) {
          const document = details.find(d => d.memory_id === item.memory_id);
          const result = await api(`/workbench/runs/${encodeURIComponent(document.run_id)}/graph?limit=100`);
          const run = { ...result.run, sessions: result.run.sessions, task_count: result.total_tasks, published_memory_count: result.tasks.filter(t => t.episode?.memory_id).length };
          if (!state.batches.some(b => b.run_id === run.run_id)) state.batches.push(run);
          const task = result.tasks.find(t => t.thread_id === document.thread_id);
          if (!task) { toast('批次中找不到记忆对应的任务'); return; }
          const session = task.sessions[0] || run.sessions[0];
          const context = { id: `context:${run.run_id}:${task.thread_id}`, runId: run.run_id, threadId: task.thread_id, title: task.title, task, episode: task.episode, memoryId: item.memory_id, sessionKey: session?.session_key, sessionLabel: session?.session_id || session?.stream_id, runLabel: labelRun(run) };
          existing = { ...context, id: item.memory_id, kind: 'wiki', memoryId: item.memory_id, context, markdown: document.markdown };
          state.contexts.push(context); state.wikis.push(existing); renderSidebar();
        }
        await selectNode(existing);
      };
      return button;
    }));
    toast(`${details.length} 条去重命中${result.next_offset ? ' · 尚有后续' : ''}`);
  } catch (err) { toast('搜索失败：' + err.message); }
};
$('search').oninput = () => { if (!$('search').value) { state.searchHits = null; renderGraph(); $('search-results').replaceChildren(); } };
document.querySelectorAll('[data-view]').forEach(button => button.onclick = () => {
  if (!state.selected) return;
  if (button.dataset.view === 'wiki') { const wiki = state.wikis.find(w => w.runId === state.selected.runId && w.memoryId); if (wiki) selectNode(wiki); }
  if (button.dataset.view === 'context') { const context = state.contexts.find(c => c.runId === state.selected.runId); if (context) selectNode(context); }
  if (button.dataset.view === 'batch') { const batch = state.batches.find(b => b.run_id === state.selected.runId); if (batch) selectNode({ ...batch, id: batch.run_id, runId: batch.run_id, kind: 'batch', title: labelRun(batch) }); }
});
$('follow-source').onclick = () => {
  if (!state.selected) return;
  if (state.selected.kind === 'wiki' && state.selected.context) selectNode({ ...state.selected.context, kind: 'context' });
  else if (state.selected.kind === 'context') loadBatch(state.selected.runId);
  else { const context = state.contexts.find(c => c.runId === state.selected.runId); if (context) selectNode(context); }
};
$('reader-content').onscroll = async e => {
  const el = e.currentTarget, selected = state.selected;
  if (el.scrollTop + el.clientHeight < el.scrollHeight - 120 || !selected || selected.loadingMore) return;
  if ((selected.kind === 'batch' || selected.kind === 'context') && selected.nextOffset != null) {
    selected.loadingMore = true;
    try { const context = selected.kind === 'context' ? `&thread_id=${encodeURIComponent(selected.threadId)}&context=true` : ''; const result = await api(`/workbench/runs/${encodeURIComponent(selected.runId)}/events?offset=${selected.nextOffset}&limit=100${context}`); if (state.selected === selected) { selected.events.push(...result.items); selected.nextOffset = result.next_offset; renderReader(); } }
    catch (err) { toast('后续原文加载失败：' + err.message); } finally { selected.loadingMore = false; }
  } else if (selected.kind === 'batch' && selected.nextOffset == null) {
    const sessionKey = selected.sessions?.length === 1 ? selected.sessions[0].session_key : null;
    const runs = sessionKey ? state.batches.filter(run => run.run_id !== selected.run_id && run.sessions?.some(s => s.session_key === sessionKey)).sort((a, b) => a.created_at.localeCompare(b.created_at)) : [];
    const next = runs.find(run => run.created_at > selected.created_at);
    if (next) await loadBatch(next.run_id);
  }
};
renderGraph(); renderReader();
