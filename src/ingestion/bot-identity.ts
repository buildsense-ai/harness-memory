import { assert } from '../contracts.js';

export interface UploadBot { uid: string; name?: string }
export function botUid(value: unknown): string {
  assert(typeof value === 'string' && /^(?:usr)?[1-9][0-9]{0,18}$/.test(value), 'invalid bot uid');
  return value.replace(/^usr/, '');
}
