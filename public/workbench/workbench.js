(() => {
  const state = {
    key: "", streams: [], runs: [], selectedStream: null, selectedRun: null,
    graph: null, runOffset: 0, streamOffset: 0, streamTotal: 0,
    eventOffset: 0, eventLimit: 50, searchOffset: 0, searchQuery: null,
    searchResults: [], selectedMemory: null, focusThreadId: null,
  };
  const $ = (id) => document.getElementById(id);
  const api = async (path, options = {}) => {
    const response = await fetch(path, {
      ...options,
      headers: {
        ...(options.headers || {}),
        authorization: "Bearer " + state.key,
        ...(options.body ? { "content-type": "application/json" } : {}),
      },
    });
    if (!response.ok) {
      let message = response.status + " " + response.statusText;
      try { message = (await response.json()).error || message; } catch {}
      throw Error(message);
    }
    return response;
  };
  const json = async (path, options) => (await api(path, options)).json();
  const el = (tag, cls = "", text = "") => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined && text !== null) node.textContent = String(text);
    return node;
  };
  let noticeTimer;
  const notice = (message, error = false) => {
    const node = $("notice");
    node.textContent = message;
    node.className = "notice show" + (error ? " error" : "");
    clearTimeout(noticeTimer);
    noticeTimer = setTimeout(() => { node.className = "notice"; }, 2800);
  };
  const humanBytes = (value) => {
    let n = Number(value);
    if (!n) return "0 B";
    const units = ["B", "KB", "MB", "GB"];
    let i = 0;
    while (n >= 1024 && i < units.length - 1) { n /= 1024; i++; }
    return (i ? n.toFixed(1) : n) + " " + units[i];
  };
  const date = (value) => value
    ? new Date(value).toLocaleString("zh-CN", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })
    : "接收时间未知";
  const statusName = (value) => ({
    completed: "已完成", partial: "部分成功", failed: "失败", queued: "排队中",
    running: "处理中", interrupted: "已中断",
  }[value] || value || "未处理");
  const loading = (target, label = "读取中…") => target.replaceChildren(el("div", "loading", label));
  const fail = (target, error) => target.replaceChildren(el("div", "error-box", error.message));

  const renderStreams = () => {
    const root = $("streams");
    root.replaceChildren();
    $("stream-meta").textContent = state.streamTotal ? "日志流 " + state.streamTotal + " 条" : "当前项目暂无上传记录";
    if (!state.streams.length) { root.append(el("div", "empty-state", "尚未上传日志。")); return; }
    for (const stream of state.streams) {
      const button = el("button", "stream-item" + (state.selectedStream?.stream_id === stream.stream_id && state.selectedStream?.source_id === stream.source_id ? " active" : ""));
      button.type = "button";
      const top = el("span", "item-top"), name = el("span", "item-name", stream.harness);
      name.title = stream.harness;
      top.append(name, el("span", "item-count", humanBytes(stream.acknowledged_bytes)));
      button.append(top,
        el("div", "item-meta", stream.source_id + " / " + stream.stream_id),
        el("div", "item-meta", Number(stream.raw_record_count) + " 条原始记录 · " + Number(stream.event_count) + " 个事件"),
        el("div", "item-meta", date(stream.last_received_at)));
      button.addEventListener("click", () => selectStream(stream));
      root.append(button);
    }
    if (state.streamNext !== null) {
      const more = el("button", "text-button", "加载更多日志流");
      more.type = "button";
      more.addEventListener("click", () => loadStreams(false));
      root.append(more);
    }
  };

  const loadStreams = async (reset = true) => {
    if (!state.key) return;
    if (reset) { state.streamOffset = 0; state.streams = []; }
    loading($("streams"));
    try {
      const data = await json("/v1/workbench/streams?limit=50&offset=" + state.streamOffset);
      state.streams = reset ? data.items : [...state.streams, ...data.items];
      state.streamTotal = data.total;
      state.streamNext = data.next_offset;
      state.streamOffset = data.next_offset ?? state.streamOffset;
      renderStreams();
      if (state.selectedStream) {
        const current = state.streams.find((item) => item.stream_id === state.selectedStream.stream_id && item.source_id === state.selectedStream.source_id);
        if (current) await selectStream(current, false);
      }
    } catch (error) { fail($("streams"), error); }
  };

  const renderRuns = () => {
    const root = $("runs");
    root.replaceChildren();
    if (!state.runs.length) {
      root.append(el("div", "empty-state small", "这个日志流还没有处理批次。"));
      $("more-runs").classList.add("hidden");
      return;
    }
    for (const run of state.runs) {
      const button = el("button", "run-item" + (state.selectedRun === run.run_id ? " active" : ""));
      button.type = "button";
      const top = el("span", "item-top");
      top.append(el("span", "status " + run.status, statusName(run.status)), el("span", "item-count", date(run.created_at)));
      button.append(top, el("div", "item-meta", Number(run.task_count) + " 个任务 · " + Number(run.published_memory_count) + " 篇记忆 · " + Number(run.input_event_count) + " 个输入事件"));
      button.addEventListener("click", () => selectRun(run.run_id));
      root.append(button);
    }
    $("more-runs").classList.toggle("hidden", state.runNext === null);
  };

  const loadRuns = async (reset = true) => {
    if (!state.key) return;
    if (reset) { state.runOffset = 0; state.runs = []; }
    loading($("runs"));
    try {
      const query = new URLSearchParams({ limit: "30", offset: String(state.runOffset) });
      if (state.selectedStream) {
        query.set("source_id", state.selectedStream.source_id);
        query.set("stream_id", state.selectedStream.stream_id);
      }
      const data = await json("/v1/workbench/runs?" + query);
      state.runs = reset ? data.items : [...state.runs, ...data.items];
      state.runNext = data.next_offset;
      state.runOffset = data.next_offset ?? state.runOffset;
      renderRuns();
    } catch (error) { fail($("runs"), error); }
  };

  const resetDetails = () => {
    $("memory-heading").textContent = "记忆文档";
    $("memory-kind").textContent = "待选择";
    $("memory-content").replaceChildren(el("div", "empty-state", "选择图中的记忆节点，查看完整 Markdown。"));
    $("source-heading").textContent = "对应上下文";
    $("source-kind").textContent = "待选择";
    $("source-content").replaceChildren(el("div", "empty-state", "选择记忆或 Episode 节点，原始消息会显示在这里。"));
  };

  const selectStream = async (stream, load = true) => {
    state.selectedStream = stream;
    state.selectedRun = null;
    state.graph = null;
    state.selectedMemory = null;
    renderStreams();
    $("map-title").textContent = stream.harness + " · " + stream.stream_id;
    $("run-summary").classList.add("hidden");
    $("graph").replaceChildren(el("div", "empty-state", "选择一个处理批次查看固定输入及其任务来源。"));
    resetDetails();
    if (load) await loadRuns();
  };

  const chip = (label, value) => {
    const node = el("span", "summary-chip"), bold = el("b", "", label + " ");
    node.append(bold, document.createTextNode(value));
    return node;
  };
  const nodeButton = (type, title, id, selected, onClick, extra = "") => {
    const button = el("button", "graph-node " + type + (selected ? " selected" : ""));
    button.type = "button";
    button.setAttribute("aria-pressed", String(Boolean(selected)));
    button.append(el("span", "node-type", type === "task-node" ? "TASK" : type === "episode-node" ? "EPISODE" : "MEMORY"),
      el("span", "node-title", title),
      el("span", "node-id", id || extra));
    button.addEventListener("click", onClick);
    return button;
  };

  const renderGraph = () => {
    const graph = state.graph, root = $("graph");
    root.replaceChildren();
    const summary = $("run-summary");
    summary.classList.remove("hidden");
    summary.replaceChildren(chip("状态", statusName(graph.run.status)),
      chip("固定输入", graph.run.input_event_count + " events"),
      chip("任务", graph.total_tasks + ""),
      chip("已发布", graph.tasks.filter((task) => task.episode?.memory_id).length + " 篇"));
    if (graph.run.error) summary.append(el("div", "error-box", graph.run.error));

    const source = el("div", "source-node");
    const sourceName = graph.run.sources.length
      ? graph.run.sources.map((item) => item.harness + " · " + item.stream_id).join("，")
      : "处理输入快照";
    source.append(el("strong", "", "固定输入快照 · " + sourceName),
      el("small", "", graph.run.input_event_count + " 个事件 · " + (graph.run.sources.length || graph.run.source_count) + " 个来源"));
    root.append(source);
    if (!graph.run.partition_ready) { root.append(el("div", "empty-state", "任务划分尚未保存。固定输入快照仍可在处理批次中查看。")); return; }
    if (!graph.tasks.length) { root.append(el("div", "empty-state", "本次处理未生成任务。")); return; }

    const lanes = el("div", "task-grid");
    const columns = el("div", "graph-layers");
    for (const label of ["任务", "Episode", "Markdown 记忆"]) columns.append(el("span", "", label));
    lanes.append(columns);
    for (const task of graph.tasks) {
      const lane = el("div", "task-lane");
      const taskNode = nodeButton("task-node", task.title || task.desired_outcome || "未命名任务", task.thread_id, state.focusThreadId === task.thread_id, () => showTask(task));
      const episodeNode = task.episode
        ? nodeButton("episode-node", task.episode.goal?.description || task.desired_outcome || "Goal Episode", task.episode.episode_id, state.selectedEpisode === task.episode.episode_id, () => showEpisode(task.episode.episode_id))
        : el("div", "graph-node episode-node unavailable", "EPISODE 尚未生成");
      if (!task.episode) episodeNode.append(el("span", "node-state", "当前批次没有已持久化 Episode"));
      const memoryNode = task.episode?.memory_id
        ? nodeButton("memory-node", "查看这次任务生成的 Markdown 记忆", task.episode.memory_id, state.selectedMemory?.memory_id === task.episode.memory_id, () => selectMemory(task.episode.memory_id))
        : el("div", "graph-node memory-node unavailable", "MEMORY 尚未发布");
      if (!task.episode?.memory_id) memoryNode.append(el("span", "node-state", "此任务暂无已发布文档"));
      lane.append(taskNode, episodeNode, memoryNode);
      const meta = el("div", "lane-meta", task.query_refs.length + " 个归属 Query · " + (task.selected_event_count ?? "未保存") + " 个候选事件" + (task.shared_event_count ? " · " + task.shared_event_count + " 个共享事件" : ""));
      lane.append(meta);
      lanes.append(lane);
    }
    root.append(lanes);
    if (graph.next_offset !== null) {
      const more = el("button", "text-button", "加载更多任务");
      more.type = "button";
      more.addEventListener("click", loadMoreTasks);
      root.append(more);
    }
  };

  const showRunDetails = () => {
    $("memory-kind").textContent = "处理批次";
    $("memory-heading").textContent = "固定输入快照";
    const target = $("memory-content");
    target.replaceChildren(el("div", "detail-title", state.graph.run.run_id));
    for (const [label, value] of [
      ["处理状态", statusName(state.graph.run.status)],
      ["输入事件", state.graph.run.input_event_count],
      ["来源", state.graph.run.sources.map((item) => item.harness + " / " + item.source_id + " / " + item.stream_id).join("\n") || "无法从现有引用确定"],
      ["Stage 1", state.graph.run.partition_ready ? "任务划分已保存" : "尚无任务划分"],
    ]) target.append(metaLine(label, value));
    if (state.graph.run.error) target.append(el("div", "error-box", state.graph.run.error));
    const button = el("button", "text-button", "查看固定输入原文");
    button.type = "button";
    button.addEventListener("click", () => showRunEvents());
    target.append(button);
  };
  const metaLine = (label, value) => {
    const row = el("div", "detail-meta");
    row.append(el("b", "", label), document.createTextNode(String(value)));
    return row;
  };

  const selectRun = async (id) => {
    state.selectedRun = id;
    state.selectedEpisode = null;
    state.focusThreadId = null;
    state.selectedMemory = null;
    renderRuns();
    $("map-title").textContent = "处理批次 " + id;
    loading($("graph"), "加载来源节点…");
    loading($("memory-content"), "读取处理状态…");
    $("source-content").replaceChildren(el("div", "empty-state", "选择一个 Episode 或记忆节点查看对应上下文。"));
    try {
      state.graph = await json("/v1/workbench/runs/" + encodeURIComponent(id) + "/graph?limit=50&offset=0");
      renderGraph();
      showRunDetails();
    } catch (error) { fail($("graph"), error); fail($("memory-content"), error); }
  };

  const loadMoreTasks = async () => {
    if (state.graph?.next_offset == null) return;
    try {
      const next = await json("/v1/workbench/runs/" + encodeURIComponent(state.selectedRun) + "/graph?limit=50&offset=" + state.graph.next_offset);
      state.graph.tasks.push(...next.tasks);
      state.graph.next_offset = next.next_offset;
      renderGraph();
    } catch (error) { notice(error.message, true); }
  };

  const appendInline = (parent, text) => {
    const pattern = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*|\[[^\]]+\]\(https?:\/\/[^\s)]+\))/g;
    let last = 0;
    for (const match of text.matchAll(pattern)) {
      if (match.index > last) parent.append(document.createTextNode(text.slice(last, match.index)));
      const token = match[0];
      if (token.startsWith("**")) parent.append(el("strong", "", token.slice(2, -2)));
      else if (token.startsWith("`")) parent.append(el("code", "", token.slice(1, -1)));
      else if (token.startsWith("*")) parent.append(el("em", "", token.slice(1, -1)));
      else {
        const label = token.slice(1, token.indexOf("]("));
        const href = token.slice(token.indexOf("](") + 2, -1);
        const link = el("a", "", label);
        link.href = href;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        parent.append(link);
      }
      last = match.index + token.length;
    }
    if (last < text.length) parent.append(document.createTextNode(text.slice(last)));
  };

  const renderMarkdown = (markdown) => {
    const root = el("article", "md-content"), lines = String(markdown || "").replace(/\r\n/g, "\n").split("\n");
    let index = 0;
    while (index < lines.length) {
      const line = lines[index];
      if (!line.trim()) { index++; continue; }
      if (line.startsWith("```")) {
        const codeLines = [];
        index++;
        while (index < lines.length && !lines[index].startsWith("```")) codeLines.push(lines[index++]);
        if (index < lines.length) index++;
        const pre = el("pre"), code = el("code", "", codeLines.join("\n"));
        pre.append(code); root.append(pre); continue;
      }
      const heading = /^(#{1,4})\s+(.+)$/.exec(line);
      if (heading) { const node = el("h" + heading[1].length); appendInline(node, heading[2]); root.append(node); index++; continue; }
      if (/^\s*([-*_])\1\1+\s*$/.test(line)) { root.append(document.createElement("hr")); index++; continue; }
      if (/^\s*>/.test(line)) {
        const quote = el("blockquote");
        while (index < lines.length && /^\s*>/.test(lines[index])) {
          const p = el("p"); appendInline(p, lines[index++].replace(/^\s*>\s?/, "")); quote.append(p);
        }
        root.append(quote); continue;
      }
      if (/^\s*[-*+]\s+/.test(line) || /^\s*\d+\.\s+/.test(line)) {
        const ordered = /^\s*\d+\.\s+/.test(line), list = document.createElement(ordered ? "ol" : "ul");
        const pattern = ordered ? /^\s*\d+\.\s+/ : /^\s*[-*+]\s+/;
        while (index < lines.length && pattern.test(lines[index])) {
          const item = document.createElement("li"); appendInline(item, lines[index++].replace(pattern, "")); list.append(item);
        }
        root.append(list); continue;
      }
      const paragraph = el("p"), chunks = [line.trim()]; index++;
      while (index < lines.length && lines[index].trim() && !/^(#{1,4}\s|```|\s*>|\s*[-*+]\s|\s*\d+\.\s)/.test(lines[index])) chunks.push(lines[index++].trim());
      appendInline(paragraph, chunks.join(" ")); root.append(paragraph);
    }
    return root;
  };

  const eventCard = (event) => {
    const card = el("article", "event-card"), head = el("div", "event-head");
    head.append(el("span", "", event.kind + (event.timestamp ? " · " + date(event.timestamp) : "")), el("code", "", event.ref));
    card.append(head, el("pre", "event-text", event.text || JSON.stringify(event.content, null, 2)));
    const raw = el("button", "text-button", "查看原始记录");
    raw.type = "button";
    raw.addEventListener("click", () => showRaw(event.raw_ref));
    card.append(raw);
    return card;
  };

  const appendGroupedEvents = (list, events) => {
    const resultByCall = new Map();
    const consumed = new Set();
    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      if (event.kind !== "tool_result" || !event.tool_call_id) continue;
      for (let j = i - 1; j >= 0; j--) {
        const call = events[j];
        if (call.kind === "tool_call" && call.tool_call_id === event.tool_call_id && !consumed.has(j)) {
          resultByCall.set(j, i); consumed.add(i); break;
        }
      }
    }
    for (let i = 0; i < events.length; i++) {
      if (consumed.has(i)) continue;
      const event = events[i];
      if (event.kind === "tool_result") {
        const details = el("details", "tool-pair orphan-result"), summary = document.createElement("summary");
        summary.textContent = "工具结果 · 调用记录不在当前页";
        details.append(summary, eventCard(event));
        list.append(details);
        continue;
      }
      if (event.kind !== "tool_call") { list.append(eventCard(event)); continue; }
      const details = el("details", "tool-pair"), summary = document.createElement("summary");
      const payload = event.content && typeof event.content === "object" ? event.content : {};
      const toolName = payload.name || payload.function?.name || event.tool_call_id || "工具";
      summary.textContent = "工具调用 ↔ 结果 · " + toolName;
      details.append(summary, eventCard(event));
      const resultIndex = resultByCall.get(i);
      if (resultIndex !== undefined) details.append(eventCard(events[resultIndex]));
      list.append(details);
    }
  };

  const renderEventPage = (data, title, kind, loadPage) => {
    const target = $("source-content");
    target.replaceChildren();
    const toolbar = el("div", "source-toolbar");
    toolbar.append(el("span", "", title + " · " + data.total + " 条"));
    const list = el("div", "event-list");
    appendGroupedEvents(list, data.items);
    if (!data.items.length) list.append(el("div", "empty-state", "此范围没有原始事件。"));
    const start = data.total ? state.eventOffset + 1 : 0;
    const end = Math.min(state.eventOffset + data.items.length, data.total);
    const pager = el("div", "pager"), previous = el("button", "", "上一页"), label = el("span", "", start + "–" + end + " / " + data.total), next = el("button", "", "下一页");
    previous.type = next.type = "button";
    previous.disabled = state.eventOffset === 0;
    next.disabled = data.next_offset === null;
    previous.addEventListener("click", () => { state.eventOffset = Math.max(0, state.eventOffset - state.eventLimit); loadPage(); });
    next.addEventListener("click", () => { state.eventOffset = data.next_offset; loadPage(); });
    pager.append(previous, label, next);
    target.append(toolbar, list, pager);
    $("source-heading").textContent = kind === "Episode" ? "Goal Episode 原上下文" : title;
    $("source-kind").textContent = kind;
  };

  const showEpisode = async (id, offset = 0) => {
    state.selectedEpisode = id;
    state.eventOffset = offset;
    state.eventLimit = 50;
    if (state.graph) renderGraph();
    loading($("source-content"), "读取 Episode 原文…");
    const load = async () => {
      loading($("source-content"), "读取 Episode 原文…");
      try {
        const data = await json("/v1/read", { method: "POST", body: JSON.stringify({ ref: id, offset: state.eventOffset, limit: state.eventLimit }) });
        renderEventPage({ items: data.events, total: data.total_events, next_offset: data.next_offset }, "Episode " + id, "Episode", load);
      } catch (error) { fail($("source-content"), error); }
    };
    await load();
  };

  const showTask = (task) => {
    state.focusThreadId = task.thread_id;
    renderGraph();
    $("memory-heading").textContent = task.title || task.thread_id;
    $("memory-kind").textContent = "任务范围";
    const target = $("memory-content");
    target.replaceChildren(el("div", "detail-title", task.desired_outcome || task.title || task.thread_id));
    for (const [label, value] of [
      ["Task ID", task.thread_id], ["包含主题", (task.include_topics || []).join("、") || "未填写"],
      ["排除主题", (task.exclude_topics || []).join("、") || "未填写"], ["边界说明", task.boundary_note || "未填写"],
      ["候选事件", task.selected_event_count ?? "尚未生成 Episode"],
    ]) target.append(metaLine(label, value));
    const title = el("h3", "eyebrow", "Query 归属与理由"); target.append(title);
    for (const assignment of task.query_assignments) {
      const row = el("div", "event-card");
      row.append(el("div", "event-head", "query · " + assignment.role), el("pre", "event-text", assignment.reason || "未提供归属理由"));
      target.append(row);
    }
    if (task.episode) showEpisode(task.episode.episode_id);
    else $("source-content").replaceChildren(el("div", "empty-state", "这个任务还没有已保存的 Episode 原文范围。"));
  };

  const selectMemory = async (id) => {
    state.selectedMemory = { memory_id: id };
    renderGraph();
    loading($("memory-content"), "读取 Markdown 记忆…");
    try {
      const documentData = await json("/v1/memories/" + encodeURIComponent(id));
      state.selectedMemory = documentData;
      $("memory-heading").textContent = "Markdown 记忆";
      $("memory-kind").textContent = "已发布";
      const target = $("memory-content");
      target.replaceChildren(el("div", "detail-title", documentData.memory_id));
      target.append(metaLine("来源任务", documentData.thread_id), metaLine("处理批次", documentData.run_id));
      target.append(renderMarkdown(documentData.markdown));
      const references = el("div", "references");
      references.append(el("span", "eyebrow", "原文引用"));
      for (const reference of documentData.source_refs) {
        const button = el("button", "text-button", "打开 Episode · " + reference);
        button.type = "button";
        button.addEventListener("click", () => showEpisode(reference));
        references.append(button);
      }
      target.append(references);
      const task = state.graph?.tasks.find((item) => item.thread_id === documentData.thread_id);
      const episodeId = task?.episode?.episode_id || documentData.source_refs[0];
      if (episodeId) await showEpisode(episodeId);
    } catch (error) { fail($("memory-content"), error); }
  };

  const showRaw = async (id) => {
    $("source-heading").textContent = "原始 JSONL 记录";
    $("source-kind").textContent = "原始字节";
    loading($("source-content"));
    try {
      const response = await api("/v1/raw/" + encodeURIComponent(id));
      const bytes = await response.arrayBuffer(), target = $("source-content");
      target.replaceChildren(el("div", "detail-title", id), metaLine("SHA-256", response.headers.get("x-content-sha256")), metaLine("字节数", bytes.byteLength));
      target.append(el("pre", "raw-text", new TextDecoder().decode(bytes)));
    } catch (error) { fail($("source-content"), error); }
  };

  const showTaskEvents = async (task) => {
    state.eventOffset = 0;
    const load = async () => {
      loading($("source-content"), "读取预选原文…");
      try {
        const data = await json("/v1/workbench/runs/" + encodeURIComponent(state.selectedRun) + "/events?thread_id=" + encodeURIComponent(task.thread_id) + "&offset=" + state.eventOffset + "&limit=" + state.eventLimit);
        renderEventPage(data, task.title || task.thread_id, "预选上下文", load);
      } catch (error) { fail($("source-content"), error); }
    };
    await load();
  };
  const showRunEvents = async () => {
    state.eventOffset = 0;
    const load = async () => {
      loading($("source-content"), "读取固定快照…");
      try {
        const data = await json("/v1/workbench/runs/" + encodeURIComponent(state.selectedRun) + "/events?offset=" + state.eventOffset + "&limit=" + state.eventLimit);
        renderEventPage(data, "处理输入快照", "固定输入", load);
      } catch (error) { fail($("source-content"), error); }
    };
    await load();
  };

  const renderSearchResults = (nextOffset) => {
    $("map-title").textContent = "记忆搜索结果";
    $("run-summary").classList.add("hidden");
    const root = $("graph"); root.replaceChildren();
    if (!state.searchResults.length) { root.append(el("div", "empty-state", "没有找到匹配的已发布记忆。")); return; }
    const list = el("div", "result-list");
    for (const item of state.searchResults) {
      const card = el("button", "result"); card.type = "button";
      const title = (item.markdown.match(/^#\s+(.+)$/m) || [])[1] || item.memory_id;
      card.append(el("div", "result-title", title), el("div", "result-meta", item.memory_id));
      const preview = item.markdown.replace(/^## source_refs[\s\S]*$/m, "").replace(/^#.*$/gm, "").trim();
      card.append(el("div", "result-preview", preview.slice(0, 260) + (preview.length > 260 ? "…" : "")));
      card.addEventListener("click", () => selectMemory(item.memory_id));
      list.append(card);
    }
    root.append(list);
    if (nextOffset !== null) {
      const more = el("button", "text-button", "加载更多结果"); more.type = "button";
      more.addEventListener("click", () => runSearch(false, nextOffset)); root.append(more);
    }
  };
  const runSearch = async (reset = true, nextOffset = 0) => {
    if (!state.key) return notice("请先连接项目 Key", true);
    const words = $("keywords").value.trim().split(/\s+/).filter(Boolean);
    if (!words.length && reset) return notice("请输入至少一个关键词", true);
    if (reset) {
      state.searchOffset = 0; state.searchResults = [];
      state.searchQuery = { keywords: words, operator: $("operator").value };
    } else state.searchOffset = nextOffset;
    loading($("graph"), "搜索项目内记忆…");
    try {
      const data = await json("/v1/memories/search", { method: "POST", body: JSON.stringify({ ...state.searchQuery, offset: state.searchOffset, limit: 10 }) });
      state.searchResults.push(...data.items);
      renderSearchResults(data.next_offset);
      $("memory-heading").textContent = "搜索命中";
      $("memory-kind").textContent = state.searchResults.length + " 篇";
      $("memory-content").replaceChildren(el("div", "empty-state", "点击搜索结果，查看 Markdown 和记忆对应的原上下文。"));
      $("source-content").replaceChildren(el("div", "empty-state", "选中命中文档后，在这里显示其引用的原始上下文。"));
    } catch (error) { fail($("graph"), error); }
  };

  const connect = async (key) => {
    state.key = key.trim();
    if (!state.key) throw Error("请输入项目 Key");
    await json("/v1/workbench/streams?limit=1");
    $("connection-dot").classList.add("connected");
    $("connection-label").textContent = "项目已连接";
    $("scope-label").textContent = "搜索范围：此项目的所有已发布记忆";
    await loadStreams();
    notice("项目连接成功");
  };

  $("key-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    try { await connect($("project-key").value); }
    catch (error) { $("connection-dot").classList.remove("connected"); $("connection-label").textContent = "连接失败"; notice(error.message, true); }
  });
  $("disconnect").addEventListener("click", () => {
    state.key = ""; state.streams = []; state.streamTotal = 0; state.runs = [];
    state.selectedStream = null; state.selectedRun = null; state.selectedMemory = null;
    $("project-key").value = ""; $("connection-dot").classList.remove("connected");
    $("connection-label").textContent = "未连接";
    $("scope-label").textContent = "连接项目后，可搜索该项目已发布的所有记忆";
    $("stream-meta").textContent = "等待连接";
    $("streams").replaceChildren(el("div", "empty-state", "连接项目 Key 后读取上传记录。"));
    $("runs").replaceChildren(el("div", "empty-state small", "选择一个日志流"));
    $("graph").replaceChildren(el("div", "welcome-map", "选择一个处理批次"));
    $("run-summary").classList.add("hidden");
    resetDetails();
  });
  $("refresh").addEventListener("click", () => loadStreams());
  $("more-runs").addEventListener("click", () => loadRuns(false));
  $("search-form").addEventListener("submit", (event) => { event.preventDefault(); runSearch(true); });
})();
