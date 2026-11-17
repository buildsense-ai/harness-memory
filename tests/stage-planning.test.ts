import { it, expect } from 'vitest';
import { logicalDay, pack } from '../src/extraction/budget.js';
it('balances a small tail only at whole Episode boundaries without changing coverage', () => {
  const input = [100, 90, 20], sum = (items: number[]) => items.reduce((a, b) => a + b, 0);
  const result = pack(input, sum, 200, 50);
  expect(result).toEqual([[100], [90,20]]);
  expect(result.flat()).toEqual(input);
  expect(result.every(b => sum(b) <= 200)).toBe(true);
  expect(pack([190,20], sum, 200, 50)).toEqual([[190],[20]]);
  expect(pack([210,20], sum, 200, 50)).toEqual([[210],[20]]);
});
it('uses Beijing 03:00 logical dates and preserves unknown dates', () => {
  expect(logicalDay('2026-11-17T02:50:00+08:00')).toBe('2026-11-16');
  expect(logicalDay('2026-11-17T03:30:00+08:00')).toBe('2026-11-17');
  expect(logicalDay()).toBe('unknown_date');
});
