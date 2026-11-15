const key = (...parts) => JSON.stringify(parts);

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
