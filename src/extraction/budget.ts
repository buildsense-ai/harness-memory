import { readFileSync } from 'node:fs';
import { Tokenizer } from '@huggingface/tokenizers';
import { assert } from '../contracts.js';

export interface RequestBudget {
  count(text: string): number;
  context: number;
  output: number;
  margin: number;
  stage1: number;
  stage2: number;
  method: string;
}
export function configuredBudget(): RequestBudget {
  const file = process.env.MODEL_TOKENIZER_FILE;
  const tokenizer = file ? new Tokenizer(JSON.parse(readFileSync(file, 'utf8')), {}) : undefined;
  const budget: RequestBudget = {
    count: text => {
      if (!tokenizer) return Buffer.byteLength(text); // Conservative byte bound; never a fixed Chinese character ratio.
      let total = 0;
      for (let i = 0; i < text.length; i += 65536) total += tokenizer.encode(text.slice(i, i + 65536), { add_special_tokens: false }).ids.length;
      return total;
    },
    context: Number(process.env.MODEL_CONTEXT_TOKENS ?? 1048576),
    output: Number(process.env.MODEL_MAX_OUTPUT_TOKENS ?? 131072),
    margin: Number(process.env.MODEL_CONTEXT_MARGIN ?? 37504),
    stage1: Number(process.env.MEMORY_STAGE1_TARGET_TOKENS ?? 200000),
    stage2: Number(process.env.MEMORY_STAGE2_TARGET_TOKENS ?? 880000),
    method: file ? 'model-tokenizer-64k-slices' : 'conservative-utf8-bytes',
  };
  assert([budget.context, budget.output, budget.margin, budget.stage1, budget.stage2].every(x => Number.isSafeInteger(x) && x > 0), 'invalid model token budget');
  assert(budget.context > budget.output + budget.margin, 'no model input budget');
  return budget;
}
export const hardInput = (b: RequestBudget) => b.context - b.output - b.margin;

/** Ordered packing with an optional two-batch tail rebalance. No item is ever split. */
export function pack<T>(items: T[], cost: (items: T[]) => number, target: number, tail = target / 4): T[][] {
  const batches: T[][] = [];
  for (const item of items) {
    const last = batches.at(-1);
    if (!last || cost([...last, item]) > target) batches.push([item]);
    else last.push(item);
  }
  if (batches.length < 2) return batches;
  const a = batches[batches.length - 2], b = batches[batches.length - 1];
  if (cost(b) >= tail || cost(a) > target) return batches;
  const together = [...a, ...b];
  let best = a.length, difference = Math.abs(cost(a) - cost(b));
  for (let i = 1; i < together.length; i++) {
    const left = cost(together.slice(0, i)), right = cost(together.slice(i));
    if (left <= target && right <= target && Math.abs(left - right) < difference) { best = i; difference = Math.abs(left - right); }
  }
  batches.splice(-2, 2, together.slice(0, best), together.slice(best));
  return batches;
}
export function logicalDay(timestamp?: string): string {
  const t = timestamp ? Date.parse(timestamp) : NaN;
  return Number.isFinite(t) ? new Date(t + 5 * 3600000).toISOString().slice(0, 10) : 'unknown_date';
}
