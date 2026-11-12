import { readFile, writeFile, rename, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { assert, ref, sha256, type Harness } from "../contracts.js";
export interface UploadConfig {
  url: string;
  key: string;
  harness: Harness;
  file: string;
  process?: boolean;
  leaf_id?: string;
  originPath?: string;
  startOffset?: number;
}
export interface UploadState {
  fingerprint: string;
  source_id: string;
  stream_id: string;
  file_offset: number;
  stream_offset: number;
  processed_offset?: number;
  run_id?: string;
}
export async function saveState(path: string, state: UploadState) {
  await mkdir(dirname(resolve(path)), { recursive: true });
  const tmp = path + ".tmp";
  await writeFile(tmp, JSON.stringify(state), { mode: 0o600 });
  await rename(tmp, path);
}
export async function loadState(
  config: UploadConfig,
  path: string,
): Promise<UploadState> {
  const identity = [config.url.replace(/\/$/, ""), sha256(config.key), config.harness, resolve(config.file)];
  const legacyFingerprint = sha256(JSON.stringify(identity));
  const fingerprint = sha256(JSON.stringify([...identity, config.originPath ?? null, config.startOffset ?? 0]));
  try {
    const s = JSON.parse(await readFile(path, "utf8"));
    assert(
      (s.fingerprint === fingerprint || (s.fingerprint === legacyFingerprint && !config.originPath && (config.startOffset ?? 0) === 0)) &&
        (Number.isSafeInteger(s.file_offset) && s.file_offset >= 0 || Number.isSafeInteger(s.offset) && s.offset >= 0) &&
        (s.stream_offset === undefined || Number.isSafeInteger(s.stream_offset) && s.stream_offset >= 0) &&
        typeof s.source_id === "string" &&
        typeof s.stream_id === "string",
      "state does not match configuration",
    );
    if (s.file_offset === undefined) {
      s.file_offset = s.offset;
      s.stream_offset = s.offset;
    } else if (s.stream_offset === undefined) {
      s.stream_offset = 0;
    }
    s.fingerprint = fingerprint;
    await saveState(path, s);
    return s;
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code !== "ENOENT") throw e;
    const state = {
      fingerprint,
      source_id: ref("src"),
      stream_id: ref("stream"),
      file_offset: config.startOffset ?? 0,
      stream_offset: 0,
    };
    await saveState(path, state);
    return state;
  }
}
