import { expect, it } from 'vitest';
import { messageFormat } from '../frontend/message-format.js';

it('renders the decoded memory summary while retaining the complete injection payload', () => {
  const summary = '## 历史背景\n\n- 路径 `frames/frame_01.png`\n- ~~已撤回的建议~~';
  const raw = JSON.stringify({ source: 'memory', summary, refs: ['episode:1'], timing: 'current_turn', extra: '保留' });
  expect(messageFormat(raw)).toEqual({ kind: 'memory', text: summary, raw });
});

it('keeps other structured messages as JSON so their punctuation cannot become Markdown', () => {
  const value = { source: 'runtime', text: '~~literal~~', summary: '不当作记忆' };
  expect(messageFormat(JSON.stringify(value))).toEqual({ kind: 'json', text: JSON.stringify(value, null, 2) });
  expect(messageFormat('[{"a":1}]').kind).toBe('json');
  expect(messageFormat('{"source":"memory","summary":null}').kind).toBe('json');
});

it('preserves normal Markdown, literal escapes, and incomplete JSON without guessing repairs', () => {
  for (const text of ['## 回复\n\n**完成**', '路径中的 \\n 不要替换', '{"source":"memory","summary":"未完']) {
    expect(messageFormat(text)).toEqual({ kind: 'markdown', text });
  }
});
