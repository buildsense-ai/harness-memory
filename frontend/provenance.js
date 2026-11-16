const key = (...parts) => JSON.stringify(parts);

// Keep a shared session together, even when different batches record different participants.
export function graphSources(wikis, sessions, batches) {
  const records = new Map();
  for (const session of [...sessions, ...batches.flatMap(batch => batch.sessions)]) {
    const prior = records.get(session.session_key);
    records.set(session.session_key, { ...session, ...prior,
      participant_names: [...new Set([...(prior?.participant_names || []), ...(session.participant_names || [])])].sort() });
  }
  const runs = new Map(batches.map(batch => [batch.run_id, batch]));
  return wikis.map(wiki => {
    const run = runs.get(wiki.runId);
    const references = wiki.context?.task?.sessions?.length ? wiki.context.task.sessions
      : [{ session_key: wiki.sessionKey || wiki.context?.sessionKey }];
    const sessionKeys = [...new Set(references.map(item => item.session_key).filter(Boolean))].sort();
    if (!sessionKeys.length) sessionKeys.push(...(run?.sessions || []).map(item => item.session_key).sort());
    const sources = sessionKeys.map(id => records.get(id)).filter(Boolean);
    const users = [...new Set(sources.flatMap(item => item.participant_names || []))].sort();
    const bots = [...new Set(sources.map(item => item.bot_id || ''))].sort();
    const sessionId = key('sessions', sessionKeys.length ? sessionKeys : [wiki.runId]);
    return { ...wiki, layoutSource: {
      userId: key('users', bots, users), userLabel: users.join('、') || '未记录用户',
      sessionId, sessionLabel: sources.map(item => item.session_name).filter(Boolean).join(' / ') || (sessionKeys.length > 1 ? '跨会话' : '会话'),
      batchId: key('batch', sessionId, wiki.runId),
      batchLabel: run?.created_at ? new Date(run.created_at).toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }) : '处理批次',
      batchOrder: run?.created_at || wiki.runId,
    } };
  });
}

export function buildProvenance(sessions, batches, bots = []) {
  const bySession = new Map(sessions.map(session => [session.session_key, session]));
  for (const batch of batches) for (const session of batch.sessions) {
    if (!bySession.has(session.session_key)) bySession.set(session.session_key, session);
  }
  const roots = new Map();
  for (const session of bySession.values()) {
    const botId = session.bot_id || '';
    if (!roots.has(botId)) roots.set(botId, { kind: 'bot', id: key('bot', botId), botId,
      label: session.bot_name || bots.find(bot => bot.bot_id === botId)?.bot_name || botId || '未记录 Bot', children: [] });
    const bot = roots.get(botId);
    const sessionBatches = batches.filter(batch => batch.sessions.some(item => item.session_key === session.session_key));
    const users = [...new Set([...(session.participant_names || []), ...sessionBatches.flatMap(batch => batch.sessions
      .filter(item => item.session_key === session.session_key).flatMap(item => item.participant_names || []))])].sort();
    if (sessionBatches.some(batch => !batch.sessions.find(item => item.session_key === session.session_key)?.participant_names?.length) && !users.includes('')) users.push('');
    for (const userName of users.length ? users : ['']) {
      let user = bot.children.find(item => item.userName === userName);
      if (!user) { user = { kind: 'user', id: key('user', botId, userName), botId, userName, label: userName || '未记录用户', children: [] }; bot.children.push(user); }
      const branch = { kind: 'session', id: key('session', botId, userName, session.session_key), botId, userName,
        sessionKey: session.session_key, label: session.session_name || '', session, children: [] };
      for (const batch of [...sessionBatches].sort((a, b) => a.created_at.localeCompare(b.created_at) || a.run_id.localeCompare(b.run_id))) {
        const recorded = batch.sessions.find(item => item.session_key === session.session_key);
        const participants = recorded.participant_names || [];
        if (participants.length ? !participants.includes(userName) : userName !== '') continue;
        branch.children.push({ kind: 'batch', id: key('batch', botId, userName, session.session_key, batch.run_id), botId, userName,
          sessionKey: session.session_key, runId: batch.run_id, batch, children: [] });
      }
      user.children.push(branch);
    }
  }
  return [...roots.values()].sort((a, b) => a.label.localeCompare(b.label));
}

export function flattenTree(roots) {
  return roots.flatMap(root => [root, ...flattenTree(root.children)]);
}

export function scopedRunIds(roots, scope) {
  const branch = scope ? flattenTree(roots).find(node => node.id === scope.id) : null;
  if (scope && !branch) return new Set();
  return new Set(flattenTree(branch ? [branch] : roots).filter(node => node.kind === 'batch').map(node => node.runId));
}

export function sourcePaths(roots, runId) {
  const paths = [];
  function visit(nodes, parents) {
    for (const node of nodes) {
      const path = [...parents, node];
      if (node.kind === 'batch' && node.runId === runId) paths.push(path);
      else visit(node.children, path);
    }
  }
  visit(roots, []);
  return paths;
}
