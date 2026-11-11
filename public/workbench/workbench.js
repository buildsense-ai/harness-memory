(() => {
  const state = { key: "", streams: [], runs: [], selectedStream: null, selectedRun: null, graph: null, runOffset: 0, streamOffset: 0, streamTotal: 0, eventOffset: 0, eventLimit: 12, searchOffset: 0, searchQuery: null, searchResults: [], selectedMemory: null, focusThreadId: null };
  const $ = (id) => document.getElementById(id);
  const api = async (path, options = {}) => {
    const response = await fetch(path, { ...options, headers: { ...(options.headers || {}), authorization: "Bearer " + state.key, ...(options.body ? { "content-type": "application/json" } : {}) } });
    if (!response.ok) { let message = response.status + " " + response.statusText; try { message = (await response.json()).error || message; } catch {} throw Error(message); }
    return response;
  };
  const json = async (path, options) => (await api(path, options)).json();
  const el = (tag, cls = "", text = "") => { const node = document.createElement(tag); if (cls) node.className = cls; if (text !== undefined && text !== null) node.textContent = String(text); return node; };
  let noticeTimer;
  const notice = (message, error = false) => { const n = $("notice"); n.textContent = message; n.className = "notice show" + (error ? " error" : ""); clearTimeout(noticeTimer); noticeTimer = setTimeout(() => { n.className = "notice"; }, 2800); };
  const humanBytes = (value) => { let n = Number(value); if (!n) return "0 B"; const units = ["B", "KB", "MB", "GB"]; let i = 0; while (n >= 1024 && i < units.length - 1) { n /= 1024; i++; } return (i ? n.toFixed(1) : n) + " " + units[i]; };
  const date = (value) => value ? new Date(value).toLocaleString("zh-CN", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }) : "接收时间未知";
  const statusName = (s) => ({ completed: "已完成", partial: "部分成功", failed: "失败", queued: "排队中", running: "处理中", interrupted: "已中断" }[s] || s || "未处理");
  const loading = (target, label = "读取中…") => { target.replaceChildren(el("div", "loading", label)); };
  const fail = (target, error) => { const box = el("div", "error-box", error.message); target.replaceChildren(box); };
  const renderStreams = () => {
    const root = $("streams"); root.replaceChildren();
    $("stream-meta").textContent = state.streamTotal ? "日志流 " + state.streamTotal + " 条" : "当前项目暂无上传记录";
    if (!state.streams.length) { root.append(el("div", "empty-state", "尚未上传日志。")); return; }
    for (const s of state.streams) {
      const button = el("button", "stream-item" + (state.selectedStream && state.selectedStream.source_id === s.source_id && state.selectedStream.stream_id === s.stream_id ? " active" : "")); button.type = "button";
      const top = el("span", "item-top"), name = el("span", "item-name", s.harness); name.title = s.harness; top.append(name, el("span", "item-count", humanBytes(s.acknowledged_bytes)));
      button.append(top, el("div", "item-meta", s.source_id + " / " + s.stream_id), el("div", "item-meta", Number(s.raw_record_count) + " 条记录 · " + Number(s.event_count) + " 个事件"), el("div", "item-meta", date(s.last_received_at)));
      button.addEventListener("click", () => selectStream(s)); root.append(button);
    }
  };
  const loadStreams = async (reset=true) => { if (!state.key) return; if(reset){state.streamOffset=0;state.streams=[];} loading($("streams")); try { const data = await json("/v1/workbench/streams?limit=50&offset="+state.streamOffset); state.streams = reset ? data.items : [...state.streams,...data.items];state.streamTotal=data.total;state.streamNext=data.next_offset;state.streamOffset=data.next_offset??state.streamOffset; renderStreams();if(state.streamNext!==null){const more=el("button","text-button","加载更多日志流");more.type="button";more.addEventListener("click",()=>loadStreams(false));$("streams").append(more);} if (state.selectedStream) { const current = state.streams.find(s => s.source_id === state.selectedStream.source_id && s.stream_id === state.selectedStream.stream_id); if (current) await selectStream(current, false); } } catch (e) { fail($("streams"), e); } };
  const renderRuns = () => {
    const root = $("runs"); root.replaceChildren();
    if (!state.runs.length) { root.append(el("div", "empty-state small", "这个日志流还没有处理批次。")); $("more-runs").classList.add("hidden"); return; }
    for (const r of state.runs) {
      const button = el("button", "run-item" + (state.selectedRun === r.run_id ? " active" : "")); button.type = "button";
      const top = el("span", "item-top"); top.append(el("span", "status " + r.status, statusName(r.status)), el("span", "item-count", date(r.created_at)));
      button.append(top, el("div", "item-meta", Number(r.task_count) + " 个任务 · " + Number(r.published_memory_count) + " 篇记忆 · " + Number(r.input_event_count) + " 个输入事件")); button.addEventListener("click", () => selectRun(r.run_id)); root.append(button);
    }
    $("more-runs").classList.toggle("hidden", !state.runNext);
  };
  const loadRuns = async (reset = true) => { if (!state.key) return; if (reset) { state.runOffset = 0; state.runs = []; } loading($("runs")); try { const q = new URLSearchParams({ limit: "30", offset: String(state.runOffset) }); if (state.selectedStream) { q.set("source_id", state.selectedStream.source_id); q.set("stream_id", state.selectedStream.stream_id); } const data = await json("/v1/workbench/runs?" + q); state.runs = reset ? data.items : [...state.runs, ...data.items]; state.runNext = data.next_offset; state.runOffset = data.next_offset ?? state.runOffset; renderRuns(); } catch (e) { fail($("runs"), e); } };
  const selectStream = async (stream, load = true) => { state.selectedStream = stream; state.selectedRun = null; state.graph = null; state.selectedMemory = null; renderStreams(); $("map-title").textContent = stream.harness + " · " + stream.stream_id; $("run-summary").classList.add("hidden"); $("graph").replaceChildren(el("div", "empty-state", "选择一个处理批次查看该次固定输入快照。")); $("inspector-title").textContent = "内容检查"; $("inspector-kind").textContent = "日志流"; $("inspector").replaceChildren(); $("inspector").append(el("div", "detail-title", stream.harness + " 日志流"), el("div", "detail-meta", "source_id: " + stream.source_id), el("div", "detail-meta", "stream_id: " + stream.stream_id), el("div", "detail-meta", "服务器已确认字节: " + humanBytes(stream.acknowledged_bytes)), el("div", "detail-meta", "原始记录 / 事件: " + stream.raw_record_count + " / " + stream.event_count), el("div", "detail-meta", "服务器接收时间: " + (stream.first_received_at ? date(stream.first_received_at) + " 至 " + date(stream.last_received_at) : "历史记录时间未知"))); if (load) await loadRuns(); };
  const chip = (label, value) => { const n = el("span", "summary-chip"); n.append(el("b", "", label + " "), document.createTextNode(value)); return n; };
  const selectRun = async (id) => { state.selectedRun = id;state.graphOffset=0; state.selectedMemory = null; renderRuns(); $("map-title").textContent = "处理批次 " + id; loading($("graph"), "加载任务映射…"); loading($("inspector"), "读取处理状态…"); try { state.graph = await json("/v1/workbench/runs/" + encodeURIComponent(id) + "/graph?limit=50&offset=0"); renderGraph(); showRunDetails(); } catch (e) { fail($("graph"), e); fail($("inspector"), e); } };
  const renderGraph = () => {
    const g = state.graph, root = $("graph"); root.replaceChildren(); const summary = $("run-summary"); summary.classList.remove("hidden"); summary.replaceChildren(chip("状态", statusName(g.run.status)), chip("输入事件", String(g.run.input_event_count)), chip("任务", String(g.total_tasks)), chip("已发布记忆", String(g.tasks.filter(t => t.episode?.memory_id).length)));
    if (g.run.error) { const err = el("div", "error-box", g.run.error); summary.append(err); }
    const source = el("div", "source-node"); source.append(el("strong", "", g.run.sources.length ? g.run.sources.map(s => s.harness + " · " + s.stream_id).join("，") : "处理输入快照"), el("small", "", g.run.input_event_count + " 个事件 · " + (g.run.sources.length || g.run.source_count) + " 个来源" + (g.run.sources.length === 1 ? "，处理输入已固定" : ""))); root.append(source, el("div", "stem"));
    if (!g.run.partition_ready) { root.append(el("div", "empty-state", "任务划分尚未保存。原始输入已固定，可在右侧查看状态。")); return; }
    if (!g.tasks.length) { root.append(el("div", "empty-state", "本次处理未生成任务。")); return; }
    const grid = el("div", "task-grid");
    for (const t of g.tasks) {
      const card = el("article", "task-card" + (state.focusThreadId===t.thread_id ? " focused" : "")), head = el("button", "task-head"); head.type = "button"; const tid = el("span", "task-id"); tid.append(el("span", "", t.thread_id), el("span", "", t.episode ? "Episode 已保存" : "尚无 Episode")); head.append(tid, el("span", "task-title", t.title || "未命名任务")); head.addEventListener("click", () => showTaskDetails(t)); card.append(head, el("div", "task-outcome", t.desired_outcome || "未提供任务目标")); const stats = el("div", "task-stats"); stats.append(el("span", "", t.query_refs.length + " 个归属轮次"), el("span", "", (t.selected_event_count ?? "尚未持久化") + " 个预选事件"), el("span", "", (t.shared_event_count ?? "共享未统计") + " 个共享事件")); card.append(stats);
      const eventLabel=t.selected_event_count===null?"候选事件数未持久化":t.selected_event_count+" 个预选事件";const sharedLabel=t.shared_event_count===null?"共享数未持久化":t.shared_event_count+" 个共享事件";const statRows=card.querySelector(".task-stats");statRows.replaceChildren(el("span","",t.query_refs.length+" 个归属轮次"),el("span","",eventLabel),el("span","",sharedLabel));
      const actions = el("div", "task-actions"), view = el("button", "", "查看任务上下文"), assignments = el("button", "", "轮次归属理由"); view.type = assignments.type = "button"; view.addEventListener("click", () => showTaskEvents(t)); assignments.addEventListener("click", () => showTaskDetails(t, true)); actions.append(view, assignments); card.append(actions);
      if (t.episode) { const stem = el("div", "link-stem"); card.append(stem); const epButton = el("button", "memory-node episode-node"); epButton.type = "button"; epButton.append(el("strong", "", "Goal Episode · " + t.episode.event_count + " 个事件"), el("small", "", t.episode.episode_id)); epButton.addEventListener("click", () => showEpisode(t.episode.episode_id)); card.append(epButton); if (t.episode.memory_id) { const memoryStem=el("div","link-stem");card.append(memoryStem);const memoryButton=el("button","memory-node");memoryButton.type="button";memoryButton.append(el("strong","","Markdown 记忆"),el("small","",t.episode.memory_id));memoryButton.addEventListener("click",()=>showMemory(t.episode.memory_id));card.append(memoryButton);} }
      grid.append(card);
    }
    root.append(grid);
    if (state.graph.next_offset !== null) { const more=el("button","text-button","加载更多任务");more.type="button";more.addEventListener("click",loadMoreTasks);root.append(more); }
  };
  const loadMoreTasks = async () => { if(!state.graph?.next_offset)return;const offset=state.graph.next_offset;try{const next=await json("/v1/workbench/runs/"+encodeURIComponent(state.selectedRun)+"/graph?limit=50&offset="+offset);state.graph.tasks.push(...next.tasks);state.graph.next_offset=next.next_offset;renderGraph();}catch(e){notice(e.message,true);} };
  const showRunDetails = () => { const r = state.graph.run, target = $("inspector"); $("inspector-title").textContent = "处理批次"; $("inspector-kind").textContent = statusName(r.status); target.replaceChildren(); const title = el("h2", "detail-title", r.run_id); target.append(title); const meta = el("div", "detail-meta"); for (const [k,v] of [["创建时间", date(r.created_at)],["处理状态",statusName(r.status)],["固定输入事件",r.input_event_count],["来源",r.sources.map(s => s.harness + " / " + s.source_id + " / " + s.stream_id).join("\n") || "无法从现有引用确定"],["Stage1",r.partition_ready ? "任务划分已保存" : "尚无任务划分"]]) { const line = el("div"); line.append(el("b","",k + "："),document.createTextNode(String(v))); meta.append(line); } target.append(meta); if (r.error) target.append(el("div", "detail-section"), el("div", "error-box", r.error)); const all = el("button", "text-button", "查看固定输入原文"); all.type="button"; all.addEventListener("click",()=>showRunEvents()); target.append(all); };
  const showTaskDetails = (task, assignmentOnly = false) => { $("inspector-title").textContent = task.title || task.thread_id; $("inspector-kind").textContent = assignmentOnly ? "轮次归属" : "任务"; const target = $("inspector"); target.replaceChildren(); target.append(el("div", "detail-title", task.desired_outcome || task.title)); const meta = el("div", "detail-meta"); for (const [k,v] of [["任务 ID",task.thread_id],["包含主题",(task.include_topics||[]).join("、")||"未填写"],["排除主题",(task.exclude_topics||[]).join("、")||"未填写"],["边界说明",task.boundary_note||"未填写"],["预选事件",task.selected_event_count ?? "尚无已生成 Episode"]]) { const line=el("div"); line.append(el("b","",k+"："),document.createTextNode(String(v))); meta.append(line); } target.append(meta); const h=el("h3","detail-section",assignmentOnly?"Query 归属及理由":"任务范围"); target.append(h); const list=el("div","event-list"); for(const a of task.query_assignments) { const item=el("div","event-card"); item.append(el("div","event-head","query · "+a.role),el("pre","event-text",a.reason||"未提供归属理由"),el("div","event-tools","ref: "+a.query_ref)); list.append(item); } target.append(list); if (!assignmentOnly) { const b=el("button","text-button","查看该任务的完整预选上下文"); b.type="button"; b.addEventListener("click",()=>showTaskEvents(task)); target.append(b); } };
  const eventCard = (event) => { const card=el("article","event-card"),head=el("div","event-head"); head.append(el("span","",event.kind+(event.timestamp?" · "+date(event.timestamp):"")),el("code","",event.ref)); card.append(head,el("pre","event-text",event.text||JSON.stringify(event.content,null,2))); const tools=el("div","event-tools"),raw=el("button","","查看不可变原始记录"); raw.type="button"; raw.addEventListener("click",()=>showRaw(event.raw_ref)); tools.append(raw); card.append(tools); return card; };
  const renderEventPage = (data, title, kind, loadPage) => { const target=$("inspector"); target.replaceChildren(); const heading=el("div","detail-title",title); target.append(heading); const list=el("div","event-list"); for(const ev of data.items) list.append(eventCard(ev)); if(!data.items.length) list.append(el("div","empty-state","此范围没有原始事件。")); target.append(list); const pager=el("div","pager"),prev=el("button","","上一页"),label=el("span","",(data.total?state.eventOffset+1:0)+"–"+Math.min(state.eventOffset+data.items.length,data.total)+" / "+data.total),next=el("button","","下一页"); prev.type=next.type="button"; prev.disabled=state.eventOffset===0; next.disabled=data.next_offset===null; prev.addEventListener("click",()=>{state.eventOffset=Math.max(0,state.eventOffset-state.eventLimit);loadPage();}); next.addEventListener("click",()=>{state.eventOffset=data.next_offset;loadPage();}); pager.append(prev,label,next); target.append(pager); $("inspector-title").textContent=title; $("inspector-kind").textContent=kind; };
  const showTaskEvents = async (task) => { state.eventOffset=0; const load=async()=>{ loading($("inspector"),"读取任务候选事件…"); try { const d=await json("/v1/workbench/runs/"+encodeURIComponent(state.selectedRun)+"/events?thread_id="+encodeURIComponent(task.thread_id)+"&offset="+state.eventOffset+"&limit="+state.eventLimit); renderEventPage(d,task.title||task.thread_id,"任务原文",load); } catch(e){fail($("inspector"),e);} }; await load(); };
  const showRunEvents = async () => { state.eventOffset=0; const load=async()=>{loading($("inspector"),"读取固定快照…");try{const d=await json("/v1/workbench/runs/"+encodeURIComponent(state.selectedRun)+"/events?offset="+state.eventOffset+"&limit="+state.eventLimit);renderEventPage(d,"处理快照原文","固定输入",load);}catch(e){fail($("inspector"),e);}};await load(); };
  const showEpisode = async (id, offset=0) => { state.eventOffset=offset;state.eventLimit=50;$("inspector-title").textContent="Episode 原文";$("inspector-kind").textContent="Episode";loading($("inspector"));try{const d=await json("/v1/read",{method:"POST",body:JSON.stringify({ref:id,offset,limit:50})});renderEventPage({items:d.events,total:d.total_events,next_offset:d.next_offset},"Episode "+id,"Episode",()=>showEpisode(id,state.eventOffset));}catch(e){fail($("inspector"),e);} };
  const showMemory = async (id) => { $("inspector-title").textContent="Markdown 记忆";$("inspector-kind").textContent="记忆";loading($("inspector"));try{const d=await json("/v1/memories/"+encodeURIComponent(id));state.selectedMemory=d;const target=$("inspector");target.replaceChildren(el("div","detail-title",d.memory_id));target.append(el("div","detail-meta","来源任务："+d.thread_id+" · 处理批次："+d.run_id));target.append(el("pre","memory-text",d.markdown));const refs=el("div","detail-section"),h=el("h3","","原文引用");refs.append(h);for(const ref of d.source_refs){const b=el("button","text-button","查看 Episode 原文 · "+ref);b.type="button";b.addEventListener("click",()=>showEpisode(ref));refs.append(b);}target.append(refs);$("inspector-title").textContent="Markdown 记忆";$("inspector-kind").textContent="记忆";}catch(e){fail($("inspector"),e);} };
  const showRaw = async (id) => { $("inspector-title").textContent="不可变原始记录";$("inspector-kind").textContent="原始字节";loading($("inspector"));try{const response=await api("/v1/raw/"+encodeURIComponent(id));const bytes=await response.arrayBuffer();const target=$("inspector");target.replaceChildren(el("div","detail-title",id));target.append(el("div","detail-meta","服务器 SHA-256："+response.headers.get("x-content-sha256")),el("div","detail-meta","字节数："+bytes.byteLength));const pre=el("pre","raw-text",new TextDecoder().decode(bytes));target.append(pre);$("inspector-title").textContent="不可变原始记录";$("inspector-kind").textContent="原始字节";}catch(e){fail($("inspector"),e);} };
  const runSearch = async (reset = true) => {
    if (!state.key) return notice("请先连接项目 Key", true);
    const words = $("keywords").value.trim().split(/\s+/).filter(Boolean);
    if (!words.length) return notice("请输入至少一个关键词", true);
    if (reset) {
      state.searchOffset = 0;
      state.searchResults = [];
      state.searchQuery = { keywords: words, operator: $("operator").value };
    }
    loading($("graph"), "搜索项目内已发布记忆…");
    try {
      const data = await json("/v1/memories/search", {
        method: "POST",
        body: JSON.stringify({ ...state.searchQuery, offset: state.searchOffset, limit: 10 }),
      });
      state.searchResults.push(...data.items);
      $("map-title").textContent = "搜索结果";
      $("run-summary").classList.add("hidden");
      const root = $("graph");
      root.replaceChildren();
      if (!state.searchResults.length) {
        root.append(el("div", "empty-state", "没有找到匹配的已发布记忆。"));
      } else {
        const list = el("div", "result-list");
        for (const item of state.searchResults) {
          const card = el("article", "result");
          const title = (item.markdown.match(/^#\s+(.+)$/m) || [])[1] || item.memory_id;
          card.append(el("div", "result-title", title), el("div", "result-meta", "memory_id: " + item.memory_id));
          const text = item.markdown.replace(/^## source_refs[\s\S]*$/m, "").replace(/^#.*$/gm, "").trim();
          card.append(el("div", "result-preview", text.slice(0, 360) + (text.length > 360 ? "…" : "")));
          card.addEventListener("click", async () => {
            try {
              const detail = await json("/v1/memories/" + encodeURIComponent(item.memory_id));
              state.focusThreadId = detail.thread_id;
              await selectRun(detail.run_id);
              await showMemory(item.memory_id);
            } catch (error) { notice(error.message, true); }
          });
          list.append(card);
        }
        root.append(list);
      }
      if (data.next_offset !== null) {
        const more = el("button", "text-button", "加载更多搜索结果");
        more.type = "button";
        more.addEventListener("click", async () => {
          state.searchOffset = data.next_offset;
          await runSearch(false);
        });
        root.append(more);
      }
      $("inspector").replaceChildren(el("div", "empty-state", "搜索结果直接包含完整 Markdown。点击文档可查看内容和来源。"));
      $("inspector-title").textContent = "搜索结果";
      $("inspector-kind").textContent = state.searchResults.length + " 篇";
    } catch (error) { fail($("graph"), error); }
  };
  const connect = async (key) => { state.key=key.trim();if(!state.key)throw Error("请输入项目 Key");await json("/v1/workbench/streams?limit=1");$("connection-dot").classList.add("connected");$("connection-label").textContent="项目已连接";$("scope-label").textContent="搜索范围：此项目全部已发布记忆";await loadStreams();notice("项目连接成功"); };
  $("key-form").addEventListener("submit",async(e)=>{e.preventDefault();try{await connect($("project-key").value);}catch(err){$("connection-dot").classList.remove("connected");$("connection-label").textContent="连接失败";notice(err.message,true);}});
  $("disconnect").addEventListener("click",()=>{state.key="";state.streams=[];state.streamTotal=0;state.runs=[];state.selectedStream=null;state.selectedRun=null;state.selectedMemory=null;$("project-key").value="";$("connection-dot").classList.remove("connected");$("connection-label").textContent="未连接";$("scope-label").textContent="连接项目后可搜索全部已发布记忆";$("stream-meta").textContent="等待连接";$("streams").replaceChildren(el("div","empty-state","连接项目 Key 后读取真实上传记录。"));$("runs").replaceChildren(el("div","empty-state small","选择一个日志流"));$("graph").replaceChildren(el("div","welcome-map","选择一个处理批次"));$("inspector").replaceChildren(el("div","empty-state","点击图中的任务、Episode 或记忆，查看对应内容。"));});
  $("refresh").addEventListener("click",loadStreams);$("more-runs").addEventListener("click",()=>loadRuns(false));$("search-form").addEventListener("submit",(e)=>{e.preventDefault();runSearch(true);});
})();
