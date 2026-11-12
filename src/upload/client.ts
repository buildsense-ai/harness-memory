import { stat } from "node:fs/promises";
import {
  assert,
  HttpError,
  type UploadBatch,
  type IngestAck,
} from "../contracts.js";
import { loadState, saveState, type UploadConfig } from "./state.js";
import { readCompleteRecords } from "./records.js";
export async function uploadOnce(
  config: UploadConfig,
  statePath: string,
  send: typeof fetch = fetch,
) {
  assert(
    (config.startOffset ?? 0) === 0 || Boolean(config.originPath),
    "origin path required for non-zero start offset",
  );
  const state = await loadState(config, statePath);
  assert(
    (await stat(config.file)).size >= state.file_offset,
    "source file shortened",
  );
  let count = 0;
  let batch: UploadBatch = {
    source_id: state.source_id,
    stream_id: state.stream_id,
    harness: config.harness,
    records: [],
  };
  const flush = async () => {
    if (!batch.records.length) return;
    const body = JSON.stringify(batch);
    const r = await send(config.url.replace(/\/$/, "") + "/v1/ingest/batches", {
      method: "POST",
      headers: {
        authorization: "Bearer " + config.key,
        "content-type": "application/json",
      },
      body,
      signal: AbortSignal.timeout(30000),
    });
    if (!r.ok)
      throw new HttpError(r.status, "upload rejected: HTTP " + r.status);
    const ack = (await r.json()) as IngestAck;
    const last = batch.records.at(-1)!;
    const rawLength = Buffer.from(last.raw_base64, "base64").length;
    const streamEnd = last.offset + rawLength;
    assert(ack.next_offset === streamEnd, "invalid upload ACK");
    state.stream_offset = streamEnd;
    state.file_offset = (last.origin?.offset ?? last.offset) + rawLength;
    await saveState(statePath, state);
    count += batch.records.length;
    batch = { ...batch, records: [] };
  };
  try {
    for await (const { offset, raw } of readCompleteRecords(
      config.file,
      state.file_offset,
    )) {
      const record = {
        offset: state.stream_offset + batch.records.reduce((n, item) => n + Buffer.from(item.raw_base64, "base64").length, 0),
        raw_base64: raw.toString("base64"),
        ...(config.originPath ? { origin: { path: config.originPath, offset } } : {}),
      };
      if (
        Buffer.byteLength(
          JSON.stringify({ ...batch, records: [...batch.records, record] }),
        ) >
        4 * 1024 * 1024
      ) {
        await flush();
        assert(
          Buffer.byteLength(JSON.stringify({ ...batch, records: [record] })) <=
            4 * 1024 * 1024,
          "record too large",
        );
      }
      batch.records.push(record);
      if (batch.records.length >= 100) await flush();
    }
  } catch (e) {
    if (e instanceof HttpError && e.message === "record too large")
      await flush();
    throw e;
  }
  await flush();
  const pending = (await stat(config.file)).size - state.file_offset;
  if (config.process && state.stream_offset > 0 && pending === 0 && state.processed_offset !== state.stream_offset) {
    const startOffset = state.processed_offset ?? 0;
    const response = await send(config.url.replace(/\/$/, "") + "/v1/ingest/complete", {
      method: "POST", headers: { authorization: "Bearer " + config.key, "content-type": "application/json" },
      body: JSON.stringify({ source_id: state.source_id, stream_id: state.stream_id, start_offset: startOffset, end_offset: state.stream_offset, ...(config.leaf_id ? { leaf_id: config.leaf_id } : {}) }),
      signal: AbortSignal.timeout(30000),
    });
    if (!response.ok) throw new HttpError(response.status, "processing submission rejected: HTTP " + response.status);
    const result = await response.json() as { run_id?: string; status: string; reason?: string };
    assert(result.status === "skipped" ? result.reason === "no_normalized_events" : typeof result.run_id === "string", "invalid processing ACK");
    state.processed_offset = state.stream_offset;
    if (result.run_id) state.run_id = result.run_id;
    await saveState(statePath, state);
  }
  return {
    ...(state.run_id ? { run_id: state.run_id } : {}),
    ...(state.processed_offset !== undefined ? { processed_offset: state.processed_offset } : {}),
    source_id: state.source_id,
    stream_id: state.stream_id,
    file_offset: state.file_offset,
    next_offset: state.stream_offset,
    uploaded_records: count,
    pending_bytes: (await stat(config.file)).size - state.file_offset,
  };
}
