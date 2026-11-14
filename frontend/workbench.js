import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { createGraph } from './graph.js';
import { messageFormat } from './message-format.js';

marked.setOptions({ gfm: true, breaks: false });
const $ = id => document.getElementById(id);
const state = { key: '', sessions: [], batches: [], contexts: [], wikis: [], selected: null, loading: false, error: '', sessionOffset: 0, batchOffset: 0, searchHits: null, abort: null, generation: 0, uploadKeyId: '', dateFrom: '', dateTo: '', uploadKeys: [], botId: '', userName: '', bots: [] };
const graph = createGraph(selectNode);
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
function sessionLabel(session) {
  const recorded = state.sessions.find(item => item.session_key === session?.session_key);
  return recorded?.session_name || (recorded?.participant_names || []).join('、') || '';
}
function renderGraph() {
  for (const batch of state.batches) for (const session of batch.sessions) session.display_label = sessionLabel(session);
  for (const node of [...state.contexts, ...state.wikis]) node.sessionLabel = sessionLabel({ session_key: node.sessionKey || node.context?.sessionKey });
  graph.update({ sessions: state.sessions, batches: state.batches, contexts: state.contexts, wikis: state.wikis }, state.selected, state.searchHits);
  $('map-status').textContent = state.loading ? '加载中…' : state.error ? '读取失败' : `${state.batches.length} / ${state.totalBatches ?? state.batches.length} 批次已载入`;
  $('sample-count').textContent = `${state.wikis.length} 篇 Wiki · ${state.batches.length} 个批次`;
  $('selection-path').textContent = state.selected ? `${state.selected.sessionLabel || '会话'} / ${state.selected.runLabel || state.selected.title}` : '';
}
function renderSidebar() {
  $('session-count').textContent = String(state.sessions.length);
  $('sessions').replaceChildren(...state.sessions.map(session => {
    const group = document.createElement('section'); group.className = 'session-group';
    const title = document.createElement('button'); title.className = 'session-name';
    title.title = session.session_key;
    const labels = document.createElement('span'); labels.className = 'session-labels';
    if (session.session_name) { const name = document.createElement('span'); name.textContent = session.session_name; labels.append(name); }
    const people = document.createElement('span'); people.className = 'session-people';
    people.textContent = [session.bot_name, ...(session.participant_names || [])].filter(Boolean).join(' · ') || '会话'; labels.append(people); title.append(labels);
    title.onclick = async () => { try { state.activeSession = session; state.batches = []; state.contexts = []; state.wikis = []; state.batchOffset = 0; state.selected = null; await loadBatches(); renderSidebar(); renderGraph(); const first = state.batches[0]; if (first) await loadBatch(first.run_id); } catch (e) { toast('会话载入失败：' + e.message); } };
    const info = document.createElement('small'); info.textContent = `${state.batches.filter(b => b.sessions.some(s => s.session_key === session.session_key)).length}${state.batchNext ? '+' : ''} 批次`;
    title.append(info); group.append(title);
    const list = document.createElement('div'); list.className = 'batch-list';
    for (const batch of state.batches.filter(b => b.sessions.some(s => s.session_key === session.session_key)).sort((a, b) => a.created_at.localeCompare(b.created_at) || a.run_id.localeCompare(b.run_id))) {
      const button = document.createElement('button'); button.className = 'batch-button' + (state.selected?.runId === batch.run_id ? ' active' : '');
      button.textContent = new Date(batch.created_at).toLocaleString([], { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' });
      const count = document.createElement('small'); count.textContent = `${batch.published_memory_count} Wiki`; button.append(count); button.title = labelRun(batch); button.onclick = () => loadBatch(batch.run_id); list.append(button);
    }
    group.append(list); return group;
  }));
  $('more-sessions').hidden = !state.sessionNext;
  $('more-runs').hidden = !state.batchNext;
}
function renderMarkdown(target, markdown) { target.innerHTML = DOMPurify.sanitize(marked.parse(markdown), { USE_PROFILES: { html: true } }); }
function eventText(event) {
  return event.text ?? JSON.stringify(event.content, null, 2) ?? '';
}
function conversationMessage(event) {
  const text = eventText(event);
  const speaker = /^\[发言人\s*[:：]\s*([^\]\r\n]+)\][ \t]*(?:\r?\n)?/u.exec(text);
  const name = speaker?.[1].trim().replace(/[（(](?:人|用户|机器人|智能体|助手|bot|AI)[）)]$/iu, '').trim();
  return { name: name || (event.kind === 'query' ? '用户' : 'Bot'), text: speaker ? text.slice(speaker[0].length) : text };
}
function renderMessage(target, text) {
  const format = messageFormat(text);
  if (format.kind === 'json') {
    const pre = document.createElement('pre'); pre.textContent = format.text; target.append(pre);
  } else {
    renderMarkdown(target, format.text);
    if (format.kind === 'memory') {
      const details = document.createElement('details'); details.className = 'message-envelope';
      const summary = document.createElement('summary'); summary.textContent = '查看原始注入数据';
      const pre = document.createElement('pre'); pre.textContent = format.raw;
      details.append(summary, pre); target.append(details);
    }
  }
  return format.kind;
}
function renderSource(container, events) {
  const groups = new Map();
  for (const event of events) {
    const key = event.session_key + '\0' + (event.source_group || event.conversation_run_id || event.ref);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(event);
  }
  for (const group of groups.values()) {
    const section = document.createElement('section'); section.className = 'conversation-episode';
    const included = group.some(event => event.selected !== false);
    const divider = document.createElement('div'); divider.className = 'episode-divider';
    divider.textContent = included ? '对话段' : '对话段 · 未选'; section.append(divider);
    let toolStack = null;
    for (const event of group) {
      if (event.kind === 'tool_result' && group.some(call => call.kind === 'tool_call' && call.tool_call_id && call.tool_call_id === event.tool_call_id)) continue;
      const isTool = event.kind === 'tool_call' || event.kind === 'tool_result';
      const article = document.createElement(isTool ? 'details' : 'article');
      article.className = (isTool ? 'tool-pair' : `event ${event.kind === 'query' ? 'query' : 'msg'}`) + (event.selected === false ? ' unselected' : '');
      article.dataset.ref = event.ref; article.tabIndex = 0;
      if (isTool) {
        const paired = event.kind === 'tool_call' ? group.find(result => result.kind === 'tool_result' && result.tool_call_id === event.tool_call_id) : null;
        const summary = document.createElement('summary');
        summary.textContent = event.content?.name || '工具记录';
        summary.title = `${event.ref}${event.selected === false ? ' · 未选' : ''}`;
        const body = document.createElement('div'); body.className = 'tool-body';
        const addTool = record => {
          const pre = document.createElement('pre'); pre.textContent = eventText(record);
          if (record.selected === false) pre.className = 'unselected'; body.append(pre);
        };
        addTool(event); if (paired) addTool(paired);
        if (!paired && event.tool_pair_ref) {
          const button = document.createElement('button'); button.textContent = '加载配对记录';
          button.onclick = async () => {
            try {
              const response = await api('/read', { method: 'POST', body: JSON.stringify({ ref: event.tool_pair_ref }) });
              addTool({ ...response.event, selected: event.tool_pair_selected }); button.remove();
            } catch (error) { toast('工具记录读取失败：' + error.message); }
          };
          body.append(button);
        }
        article.append(summary, body);
      } else {
        const message = conversationMessage(event);
        const role = document.createElement('div'); role.className = 'event-heading'; role.textContent = message.name;
        const body = document.createElement('div'); body.className = 'message-body';
        if (event.kind === 'query') body.textContent = message.text;
        else if (renderMessage(body, message.text) === 'memory') role.textContent = '记忆注入';
        const meta = document.createElement('span'); meta.className = 'event-ref';
        meta.textContent = [event.timestamp, event.ref].filter(Boolean).join(' · ');
        meta.title = meta.textContent;
        article.append(role, body, meta);
      }
      if (isTool) {
        if (!toolStack) {
          const stack = document.createElement('details'); stack.className = 'tool-stack'; stack.dataset.ref = 'tools:' + event.ref;
          const summary = document.createElement('summary'); stack.append(summary);
          const body = document.createElement('div'); stack.append(body); section.append(stack);
          toolStack = { stack, summary, body, count: 0, selected: false };
        }
        toolStack.count++; toolStack.selected ||= event.selected !== false;
        toolStack.summary.textContent = `${toolStack.count} 条工具记录`;
        toolStack.stack.classList.toggle('unselected', !toolStack.selected);
        toolStack.body.append(article);
      } else { toolStack = null; section.append(article); }
    }
    container.append(section);
  }
}
function nextConversationBatch(selection) {
  const last = selection.pages?.at(-1)?.batch;
  if (!last || last.sessions?.length !== 1) return null;
  const session = last.sessions[0].session_key;
  return state.batches.filter(run => run.sessions?.some(item => item.session_key === session))
    .sort((a, b) => a.created_at.localeCompare(b.created_at) || a.run_id.localeCompare(b.run_id))
    .find(run => run.created_at > last.created_at || (run.created_at === last.created_at && run.run_id > last.run_id)) || null;
}
function renderConversation(selection) {
  const container = $('reader-content');
  for (const page of selection.pages) {
    const section = document.createElement('section'); section.className = 'batch-block'; section.dataset.runId = page.batch.run_id;
    const banner = document.createElement('div'); banner.className = 'batch-banner';
    banner.textContent = new Date(page.batch.created_at).toLocaleString();
    if (selection.focusWiki) {
      const label = document.createElement('span'); label.textContent = page.batch.run_id === selection.focusWiki.runId ? 'Wiki 来源批次' : '未选批次'; banner.append(label);
    }
    section.append(banner); renderSource(section, page.events);
    if (page.error) { const error = document.createElement('p'); error.className = 'reader-error'; error.textContent = page.error; section.append(error); }
    container.append(section);
  }
  const more = selection.pages.at(-1);
  const button = document.createElement('button'); button.className = 'load-conversation';
  button.textContent = selection.loadingMore ? '加载中…' : more.nextOffset != null ? '继续加载本批次' : nextConversationBatch(selection) ? '继续查看下一批次' : '已到本批次末尾';
  button.disabled = selection.loadingMore || (more.nextOffset == null && !nextConversationBatch(selection));
  button.onclick = () => loadMoreConversation(selection); container.append(button);
}
function renderReader(preservePosition = false) {
  const selection = state.selected, container = $('reader-content');
  const top = preservePosition ? container.scrollTop : 0;
  const openTools = new Set(preservePosition ? [...container.querySelectorAll('details[open]')].map(el => el.dataset.ref) : []);
  document.querySelectorAll('[data-view]').forEach(el => el.classList.toggle('active', Boolean(selection) && el.dataset.view === (selection?.kind === 'wiki' ? 'wiki' : 'context')));
  container.classList.toggle('conversation-view', Boolean(selection && selection.kind !== 'wiki'));
  container.replaceChildren(); $('reader-meta').replaceChildren();
  if (!selection) {
    $('reader-title').textContent = ''; $('reader-id').textContent = '';
    $('reader-label').textContent = state.key ? '未选择' : '未连接'; container.textContent = state.error || (state.key ? '当前筛选下暂无内容' : '使用项目 Key 连接记忆服务');
    $('reader-footnote').textContent = '未读取服务器内容'; $('follow-source').disabled = true; return;
  }
  $('reader-title').textContent = selection.title; $('reader-id').textContent = selection.id;
  $('follow-source').disabled = false;
  if (selection.kind === 'wiki') {
    $('reader-label').textContent = 'Wiki'; $('reader-footnote').textContent = '保存的 Markdown · 可回查会话原文';
    $('follow-source').textContent = '查看原文 ↗';
    renderMarkdown(container, selection.markdown || '加载记忆…');
  } else {
    $('reader-label').textContent = '会话原文';
    $('reader-footnote').textContent = selection.focusWiki ? '淡色为当前 Wiki 未选内容' : '完整批次 · 工具记录默认折叠';
    $('follow-source').textContent = '返回 Wiki';
    $('follow-source').disabled = !selection.focusWiki && !state.wikis.some(wiki => wiki.runId === selection.runId);
    renderConversation(selection);
  }
  for (const tool of container.querySelectorAll('details')) if (openTools.has(tool.dataset.ref)) tool.open = true;
  container.scrollTop = top;
}
async function loadBatch(runId, focusWiki = null) {
  const batch = state.batches.find(item => item.run_id === runId); if (!batch) return;
  const page = { batch, events: [], nextOffset: 0 };
  const selection = { id: runId, runId, kind: 'batch', title: focusWiki?.title || '会话原文', focusWiki, pages: [page], sessionLabel: sessionLabel(batch.sessions?.[0]), runLabel: new Date(batch.created_at).toLocaleString() };
  state.selected = selection; renderGraph(); renderSidebar(); renderReader();
  await loadMoreConversation(selection);
}
async function loadContext(node) {
  const wiki = state.wikis.find(item => item.memoryId === node.memoryId);
  await loadBatch(node.runId, wiki || null);
}
async function loadMoreConversation(selection) {
  if (selection !== state.selected || selection.loadingMore) return;
  let page = selection.pages.at(-1);
  if (page.nextOffset == null) {
    const batch = nextConversationBatch(selection); if (!batch) return;
    page = { batch, events: [], nextOffset: 0 }; selection.pages.push(page);
  }
  selection.loadingMore = true; page.error = null;
  try {
    const params = new URLSearchParams({ offset: String(page.nextOffset), limit: '100' });
    if (selection.focusWiki?.runId === page.batch.run_id) { params.set('thread_id', selection.focusWiki.threadId); params.set('context', 'true'); }
    const result = await api(`/workbench/runs/${encodeURIComponent(page.batch.run_id)}/events?${params}`);
    if (selection !== state.selected) return;
    page.events.push(...result.items.map(event => selection.focusWiki && selection.focusWiki.runId !== page.batch.run_id ? { ...event, selected: false } : event));
    page.nextOffset = result.next_offset;
  } catch (error) {
    page.error = '原文加载失败：' + error.message; toast(page.error);
  } finally {
    selection.loadingMore = false;
    if (selection === state.selected) renderReader(true);
  }
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
    else {
      const focusWiki = state.selected?.kind === 'wiki' ? state.selected : state.selected?.focusWiki;
      await loadBatch(node.runId, focusWiki?.runId === node.runId ? focusWiki : null);
    }
  } catch (e) { toast('读取失败：' + e.message); }
}
async function loadSessions(append = false) {
  const generation = state.generation;
  const params = new URLSearchParams({ limit: '50', offset: String(append ? state.sessionOffset : 0) });
  if (state.uploadKeyId) params.set('upload_key_id', state.uploadKeyId);
  if (state.botId) params.set('bot_id', state.botId);
  if (state.userName) params.set('user_name', state.userName);
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
  if (state.botId) params.set('bot_id', state.botId);
  if (state.userName) params.set('user_name', state.userName);
  if (state.dateFrom) params.set('date_from', state.dateFrom);
  if (state.dateTo) params.set('date_to', state.dateTo);
  const result = await api(`/workbench/runs?${params}`);
  if (generation !== state.generation) return;
  if (!append) state.batches = [];
  state.batches.push(...result.items); state.batchOffset = state.batches.length; state.batchNext = result.next_offset; state.totalBatches = result.total;
  const taskRuns = result.items.filter(run => run.task_count);
  const graphs = await Promise.all(taskRuns.map(run => api(`/workbench/runs/${encodeURIComponent(run.run_id)}/graph?limit=100`)));
  if (generation !== state.generation) return;
  for (let i = 0; i < taskRuns.length; i++) {
    for (const task of graphs[i].tasks) {
      const id = `${taskRuns[i].run_id}:${task.thread_id}`;
      const session = task.sessions.find(s => !state.activeSession || s.session_key === state.activeSession.session_key) || taskRuns[i].sessions[0];
      const context = { id: `context:${id}`, kind: 'context', runId: taskRuns[i].run_id, threadId: task.thread_id, title: task.title, task, episode: task.episode, memoryId: task.episode?.memory_id, sessionKey: session?.session_key, sessionLabel: sessionLabel(session), runLabel: labelRun(taskRuns[i]) };
      state.contexts.push(context);
      if (context.memoryId) state.wikis.push({ id: context.memoryId, kind: 'wiki', memoryId: context.memoryId, contextId: context.id, runId: context.runId, threadId: context.threadId, title: task.title, context, sessionLabel: context.sessionLabel, runLabel: context.runLabel });
    }
  }
}
async function loadFilterOptions() {
  const generation = state.generation;
  const params = new URLSearchParams();
  if (state.uploadKeyId) params.set('upload_key_id', state.uploadKeyId);
  const filters = await api(`/workbench/filters?${params}`);
  if (generation !== state.generation) return;
  state.uploadKeys = filters.upload_keys; state.bots = filters.bots;
  if (!state.bots.some(bot => bot.bot_id === state.botId)) state.botId = '';
  const users = state.botId ? state.bots.find(bot => bot.bot_id === state.botId).users : filters.users;
  if (!users.includes(state.userName)) state.userName = '';
  $('upload-key-filter').replaceChildren(new Option('全部上传来源', ''), ...state.uploadKeys.map(item => new Option(`${item.label} · ${item.record_count} 条`, item.upload_key_id ?? '__unattributed__')));
  $('bot-filter').replaceChildren(new Option('全部 Bot', ''), ...state.bots.map(bot => new Option(bot.bot_name || bot.bot_id, bot.bot_id)));
  $('user-filter').replaceChildren(new Option('全部用户', ''), ...users.map(user => new Option(user, user)));
  $('upload-key-filter').value = state.uploadKeyId; $('bot-filter').value = state.botId; $('user-filter').value = state.userName;
}
async function connect(key) {
  state.key = key.trim(); if (!state.key) throw new Error('请填写项目 Key');
  resetData(); state.loading = true; state.error = ''; $('refresh').disabled = true;
  const generation = state.generation;
  try {
    await loadFilterOptions();
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
function disconnect() { state.key = ''; state.botId = ''; state.userName = ''; $('bot-filter').value = ''; $('user-filter').value = ''; state.uploadKeyId = ''; state.dateFrom = ''; state.dateTo = ''; $('upload-key-filter').value = ''; $('bot-filter').value = ''; $('user-filter').value = ''; $('date-from').value = ''; $('date-to').value = ''; resetData(); state.error = ''; $('refresh').disabled = true; $('connection-button').textContent = '连接'; renderGraph(); renderReader(); }
$('connect-form').onsubmit = async e => { e.preventDefault(); try { await connect($('project-key').value); $('project-key').value = ''; } catch (err) { $('connection-error').textContent = err.message; } };
$('connection-button').onclick = () => { if (state.key) disconnect(); else { $('connection-dialog').showModal(); $('connection-error').textContent = ''; } };
$('cancel-connect').onclick = () => $('connection-dialog').close();
$('refresh').onclick = async () => { if (!state.key) return; state.loading = true; await connect(state.key); };
$('upload-key-filter').onchange = () => applyFilters();
$('bot-filter').onchange = () => { $('user-filter').value = ''; applyFilters(); };
$('user-filter').onchange = () => applyFilters();
$('date-from').onchange = () => applyFilters();
$('date-to').onchange = () => applyFilters();
$('clear-filters').onclick = () => { $('upload-key-filter').value = ''; $('bot-filter').value = ''; $('user-filter').value = ''; $('date-from').value = ''; $('date-to').value = ''; applyFilters(); };
async function applyFilters() {
  state.botId = $('bot-filter').value; state.userName = $('user-filter').value;
  state.uploadKeyId = $('upload-key-filter').value;
  state.dateFrom = $('date-from').value;
  state.dateTo = $('date-to').value;
  if (state.dateFrom && state.dateTo && state.dateFrom > state.dateTo) { toast('开始日期不能晚于结束日期'); return; }
  if (!state.key) return;
  state.generation++; state.abort?.abort(); state.abort = null;
  state.sessions = []; state.batches = []; state.contexts = []; state.wikis = []; state.selected = null;
  state.activeSession = null; state.sessionOffset = 0; state.batchOffset = 0; state.searchHits = null;
  $('search-results').replaceChildren(); $('search').value = '';
  const generation = state.generation;
  renderSidebar(); renderGraph(); renderReader();
  try { await loadFilterOptions(); if (generation !== state.generation) return; await Promise.all([loadSessions(), loadBatches()]); if (generation !== state.generation) return; renderSidebar(); renderGraph(); renderReader(); const first = state.wikis[0] || state.contexts[0] || state.batches[0]; if (first) await selectNode(first); }
  catch (e) { toast('筛选数据载入失败：' + e.message); }
}
$('more-sessions').onclick = async () => { try { await loadSessions(true); renderSidebar(); } catch (e) { toast(e.message); } };
$('more-runs').onclick = async () => { try { await loadBatches(true); renderSidebar(); renderGraph(); } catch (e) { toast(e.message); } };
$('search-form').onsubmit = async e => {
  e.preventDefault(); if (!state.key) { $('connection-dialog').showModal(); return; }
  const keywords = $('search').value.trim().split(/\s+/).filter(Boolean); if (!keywords.length) { state.searchHits = null; renderGraph(); $('search-results').replaceChildren(); return; }
  try {
    const result = await api('/memories/search', { method: 'POST', body: JSON.stringify({ keywords, operator: $('search-operator').value, limit: 10, ...(state.botId ? { bot_id: state.botId } : {}), ...(state.userName ? { user_name: state.userName } : {}), ...(state.uploadKeyId ? { upload_key_id: state.uploadKeyId } : {}), ...(state.dateFrom ? { date_from: state.dateFrom } : {}), ...(state.dateTo ? { date_to: state.dateTo } : {}) }) });
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
          const context = { id: `context:${run.run_id}:${task.thread_id}`, runId: run.run_id, threadId: task.thread_id, title: task.title, task, episode: task.episode, memoryId: item.memory_id, sessionKey: session?.session_key, sessionLabel: sessionLabel(session), runLabel: labelRun(run) };
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
  const selection = state.selected; if (!selection) return;
  if (button.dataset.view === 'wiki') {
    const wiki = selection.focusWiki || (selection.kind === 'wiki' ? selection : state.wikis.find(item => item.runId === selection.runId));
    if (wiki) selectNode(wiki);
  } else if (selection.kind === 'wiki') {
    loadBatch(selection.runId, selection);
  }
});
$('follow-source').onclick = () => {
  const selection = state.selected; if (!selection) return;
  if (selection.kind === 'wiki') loadBatch(selection.runId, selection);
  else {
    const wiki = selection.focusWiki || state.wikis.find(item => item.runId === selection.runId);
    if (wiki) selectNode(wiki);
  }
};
$('reader-content').onscroll = e => {
  const el = e.currentTarget, selection = state.selected;
  if (!selection || selection.kind === 'wiki') return;
  const bounds = el.getBoundingClientRect();
  const active = [...el.querySelectorAll('.batch-block')].find(section => section.getBoundingClientRect().bottom > bounds.top + 40);
  if (active && active.dataset.runId !== selection.runId) {
    selection.runId = active.dataset.runId; selection.id = selection.runId;
    const batch = selection.pages.find(page => page.batch.run_id === selection.runId)?.batch;
    if (batch) selection.runLabel = new Date(batch.created_at).toLocaleString();
    renderGraph(); renderSidebar();
  }
  if (el.scrollTop + el.clientHeight >= el.scrollHeight - 120) loadMoreConversation(selection);
};
renderGraph(); renderReader();
