import { stat } from "node:fs/promises";
import {
  assert,
  HttpError,
  type UploadBatch,
  type IngestAck,
} from "../contracts.js";
import { projectRecord } from "../adapters/index.js";
import { loadState, saveState, type UploadConfig } from "./state.js";
import { readCompleteRecords } from "./records.js";
export async function uploadOnce(
  config: UploadConfig,
  statePath: string,
  send: typeof fetch = fetch,
) {
  const state = await loadState(config, statePath);
  assert(
    (await stat(config.file)).size >= state.offset,
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
    const end = last.offset + Buffer.from(last.raw_base64, "base64").length;
    assert(ack.next_offset === end, "invalid upload ACK");
    state.offset = end;
    await saveState(statePath, state);
    count += batch.records.length;
    batch = { ...batch, records: [] };
  };
  try {
    for await (const { offset, raw } of readCompleteRecords(
      config.file,
      state.offset,
    )) {
      const events = projectRecord(config.harness, raw).events.map(
        ({ content, text, fidelity, ...d }) => d,
      );
      const record = { offset, raw_base64: raw.toString("base64"), events };
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
  const pending = (await stat(config.file)).size - state.offset;
  if (config.process && state.offset > 0 && pending === 0 && state.processed_offset !== state.offset) {
    const response = await send(config.url.replace(/\/$/, "") + "/v1/ingest/complete", {
      method: "POST", headers: { authorization: "Bearer " + config.key, "content-type": "application/json" },
      body: JSON.stringify({ source_id: state.source_id, stream_id: state.stream_id, end_offset: state.offset, ...(config.leaf_id ? { leaf_id: config.leaf_id } : {}) }),
      signal: AbortSignal.timeout(30000),
    });
    if (!response.ok) throw new HttpError(response.status, "processing submission rejected: HTTP " + response.status);
    const result = await response.json() as { run_id: string };
    assert(typeof result.run_id === "string", "invalid processing ACK");
    state.processed_offset = state.offset; state.run_id = result.run_id; await saveState(statePath, state);
  }
  return {
    ...(state.run_id ? { run_id: state.run_id } : {}),
    source_id: state.source_id,
    stream_id: state.stream_id,
    next_offset: state.offset,
    uploaded_records: count,
    pending_bytes: (await stat(config.file)).size - state.offset,
  };
}
