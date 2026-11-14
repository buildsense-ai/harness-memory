import { expect, it } from 'vitest';
import { workbenchMetadata, sessionDisplay } from '../src/workbench-metadata.js';
import { projectRecord } from '../src/adapters/index.js';

it('derives display names from recorded query speakers, never assistant text or generated titles', () => {
  const raw = Buffer.from(JSON.stringify({ entry_type: 'turn', session_id: 'group1',
    agent_identity: { agent_id: 'bot1', display_name: 'Saturday' },
    user: { text: '[发言人: Alice（人）]\n问题\n[发言人: Bob（人）]\n补充' },
    assistant: { text: '[发言人: Invented]\n建议', tool_calls: [] } }));
  expect(workbenchMetadata(raw, projectRecord('xiaoba', raw))).toMatchObject({
    bot_id: 'bot1', bot_name: 'Saturday', session_name: null, participant_names: ['Alice', 'Bob'],
  });
});
it('uses explicit original names and leaves unavailable names absent', () => {
  const catalog = { bots: { b: { name: 'Saturday', sessions: { s: '原始会话名' } } } };
  expect(sessionDisplay(catalog, { bot_id: 'b', session_id: 's' })).toEqual({ bot_name: 'Saturday', session_name: '原始会话名' });
  expect(sessionDisplay(catalog, { bot_id: 'b', session_id: 'missing' }).session_name).toBeNull();
  expect(sessionDisplay(catalog, { bot_id: 'other', session_id: 's' }).session_name).toBeNull();
});
