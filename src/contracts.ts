import { createHash, randomUUID } from "node:crypto";
export type Harness = "xiaoba" | "pi";
export type Kind = "query" | "message" | "tool_call" | "tool_result";
export interface Descriptor {
  kind: Kind;
  pointer: string;
  order: number;
  tool_call_id?: string;
  fields?: string[];
}
export interface ProjectedEvent extends Descriptor {
  content: unknown;
  text: string;
  fidelity: string;
}
export interface ProjectedRecord {
  events: ProjectedEvent[];
  native_id?: string;
  parent_id?: string | null;
  timestamp?: string;
}
export interface UploadRecord {
  offset: number;
  raw_base64: string;
  events: Descriptor[];
}
export interface UploadBatch {
  source_id: string;
  stream_id: string;
  harness: Harness;
  records: UploadRecord[];
}
export interface StoredEvent extends ProjectedEvent {
  ref: string;
  raw_ref: string;
  offset: number;
  native_id?: string;
  parent_id?: string | null;
  timestamp?: string;
}
export interface IngestAck {
  next_offset: number;
  records: { offset: number; raw_ref: string; event_refs: string[] }[];
}
export type QueryRole =
  | "origin"
  | "continuation"
  | "constraint"
  | "correction"
  | "status"
  | "authorization"
  | "retrospective"
  | "compound"
  | "unrelated"
  | "unresolved";
export interface TaskThread {
  thread_id: string;
  title: string;
  desired_outcome: string;
  include_topics: string[];
  exclude_topics: string[];
  boundary_note: string;
}
export interface QueryAssignment {
  query_ref: string;
  thread_ids: string[];
  role: QueryRole;
  reason?: string;
}
export type TaskRelationKind = "depends_on" | "continues" | "supersedes";
export interface TaskRelation {
  from_thread_id: string;
  relation: TaskRelationKind;
  to_thread_id: string;
  evidence_refs: string[];
  reason: string;
}
export interface TaskPartition {
  task_threads: TaskThread[];
  query_assignments: QueryAssignment[];
  relations: TaskRelation[];
}
export interface EvidenceCoverage {
  constraints_and_corrections: string[];
  diagnosis_and_failures: string[];
  decision: string[];
  implementation: string[];
  verification: string[];
  final_state: string[];
}
export interface EpisodeSelection {
  event_refs: string[];
  evidence_coverage: EvidenceCoverage;
}
export interface EpisodeDraft {
  thread: TaskThread;
  event_refs: string[];
  chunk_id: string;
  missing_pair_refs: string[];
  evidence_coverage: EvidenceCoverage;
}
export class HttpError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
  }
}
export const sha256 = (data: Buffer | string) =>
  createHash("sha256").update(data).digest("hex");
export const ref = (prefix: string) => `${prefix}_${randomUUID()}`;
export const textOf = (x: unknown): string =>
  typeof x === "string" ? x : JSON.stringify(x);
export function assert(ok: unknown, message: string, status = 400): asserts ok {
  if (!ok) throw new HttpError(status, message);
}
