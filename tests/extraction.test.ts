import { it, expect } from "vitest";
import {
  extractEpisodes,
  ContextTooLong,
  type ChatModel,
} from "../src/extraction/model.js";
import type { StoredEvent } from "../src/contracts.js";
const ev = (n: number, extra = {}): StoredEvent => ({
  ref: "evt_" + n,
  raw_ref: "raw_" + n,
  offset: n,
  kind: "message",
  pointer: "/x",
  order: 0,
  content: "text " + n,
  text: "text " + n,
  fidelity: "recorded",
  ...extra,
});
const model: ChatModel = {
  discover: async () => [{ description: "goal" }],
  select: async (_g, es) => es.map((e) => e.ref),
};
it("selects source refs in original order and completes tool pairs", async () => {
  const es = [
    ev(1, { kind: "tool_call", tool_call_id: "c" }),
    ev(2, { kind: "tool_result", tool_call_id: "c" }),
  ];
  const result = await extractEpisodes(
    es,
    { ...model, select: async () => ["evt_2", "evt_2"] },
    65536,
  );
  expect(result[0].event_refs).toEqual(["evt_1", "evt_2"]);
});
it("rejects hallucinated references and invalid goal output", async () => {
  await expect(
    extractEpisodes(
      [ev(1)],
      { ...model, select: async () => ["evt_unknown"] },
      65536,
    ),
  ).rejects.toThrow(/reference/);
  await expect(
    extractEpisodes(
      [ev(1)],
      { ...model, discover: async () => [{ description: "" }] },
      65536,
    ),
  ).rejects.toThrow(/goal/);
});
it("handles both halves without overlap or losing events", async () => {
  const es = [ev(1), ev(2), ev(3), ev(4)];
  let calls = 0;
  const m = {
    ...model,
    discover: async (e: StoredEvent[]) => {
      calls++;
      if (e.length > 2) throw new ContextTooLong();
      return [{ description: "goal" }];
    },
  };
  const r = await extractEpisodes(es, m, 65536);
  expect(r.flatMap((x) => x.event_refs)).toEqual(es.map((e) => e.ref));
  expect(r).toHaveLength(2);
  expect(calls).toBe(3);
});
it("does not bisect a tool group and fails for an indivisible oversized input", async () => {
  const es = [
    ev(1, { kind: "tool_call", tool_call_id: "c" }),
    ev(2, { kind: "tool_result", tool_call_id: "c" }),
  ];
  await expect(
    extractEpisodes(
      es,
      {
        ...model,
        discover: async () => {
          throw new ContextTooLong();
        },
      },
      65536,
    ),
  ).rejects.toThrow(/indivisible/);
  await expect(
    extractEpisodes([ev(1, { text: "x".repeat(1000) })], model, 10),
  ).rejects.toThrow(/indivisible/);
});
it("does not split ordinary provider failures", async () => {
  let calls = 0;
  await expect(
    extractEpisodes(
      [ev(1), ev(2)],
      {
        ...model,
        discover: async () => {
          calls++;
          throw Error("provider failure");
        },
      },
      65536,
    ),
  ).rejects.toThrow("provider failure");
  expect(calls).toBe(1);
});

it("marks an absent tool counterpart without inventing evidence", async () => {
  const es = [ev(1, { kind: "tool_result", tool_call_id: "missing" })];
  const drafts = await extractEpisodes(es, model, 65536);
  expect(drafts[0]).toHaveProperty("missing_pair_refs", ["evt_1"]);
  expect(drafts[0].event_refs).toEqual(["evt_1"]);
});
