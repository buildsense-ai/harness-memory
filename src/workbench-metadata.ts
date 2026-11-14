import type { ProjectedRecord } from './contracts.js';
import type { Pool } from 'pg';

function object(value: unknown): Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value) ? Object.fromEntries(Object.entries(value)) : {};
}
function name(value: unknown): string | null {
  return typeof value === 'string' && value.trim() && value.length <= 512 ? value.trim() : null;
}

// Display metadata only. It never changes the recorded text or extraction input.
export function workbenchMetadata(raw: Buffer, record: ProjectedRecord) {
  const value = object(JSON.parse(raw.toString('utf8')));
  const identity = object(value.agent_identity);
  const participants = new Set<string>();
  for (const event of record.events) {
    if (event.kind !== 'query') continue;
    for (const match of event.text.matchAll(/^\[发言人\s*[:：]\s*([^\]\r\n]+)\]/gmu)) {
      const speaker = match[1].trim().replace(/[（(](?:人|用户|机器人|智能体|助手|bot|AI)[）)]$/iu, '').trim();
      if (speaker && speaker.length <= 512) participants.add(speaker);
    }
  }
  return {
    workbench_metadata_version: 1,
    bot_id: name(identity.agent_id),
    bot_name: name(identity.display_name),
    session_name: name(value.session_name) ?? name(value.group_name),
    participant_names: [...participants].sort(),
  };
}

export interface WorkbenchCatalog {
  bots: Record<string, { name: string; sessions: Record<string, string> }>;
}
export async function workbenchCatalog(pool: Pool, project: string): Promise<WorkbenchCatalog> {
  return (await pool.query('select data from workbench_catalog where project_id=$1', [project])).rows[0]?.data ?? { bots: {} };
}

export function sessionDisplay(catalog: WorkbenchCatalog, session: { bot_id?: string; session_id?: string; bot_name?: string; session_name?: string }) {
  const bot = session.bot_id ? catalog.bots[session.bot_id] : undefined;
  return { bot_name: bot?.name || session.bot_name || null,
    session_name: (session.session_id ? bot?.sessions[session.session_id] : undefined) || session.session_name || null };
}
