import { assert, type StoredEvent } from "../contracts.js";
/** Select complete query-to-query segments, keeping each run's messages and tool pairs together. */
export function candidateGroups(events: StoredEvent[]) {
  const groups = new Map<string, StoredEvent[]>(), owner = new Map<string, string>();
  let current: string | undefined, queryRaw: string | undefined, currentRun: string | undefined;
  for (const event of events) {
    if (event.kind === "query") {
      if (event.conversation_run_id) {
        current = event.ref;
        currentRun = event.conversation_run_id;
        queryRaw = undefined;
        groups.set(current, []);
      } else if (queryRaw !== event.raw_ref) {
        current = event.ref;
        currentRun = undefined;
        queryRaw = event.raw_ref;
        groups.set(current, []);
      }
      owner.set(event.ref, current!);
    }
    if (current && (!event.conversation_run_id || event.conversation_run_id === currentRun))
      groups.get(current)!.push(event);
  }
  return { groups, owner };
}

export function candidateEvents(events: StoredEvent[], queryRefs: string[]): StoredEvent[] {
  const { groups, owner } = candidateGroups(events);
  const selected = new Set(queryRefs.map(q => { assert(owner.has(q), "unknown candidate query"); return owner.get(q)!; }));
  const refs = new Set([...selected].flatMap(q => groups.get(q)!.map(e => e.ref)));
  return events.filter(e => refs.has(e.ref));
}

