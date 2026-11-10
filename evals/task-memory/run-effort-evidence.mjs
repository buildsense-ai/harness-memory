import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { appendOutputRetry, outputFeedback, readToolOutput, schemaIssues, requireValid } from '../../dist/src/extraction/output.js';
import { memoryTool, validateMemoryDocument } from '../../dist/src/extraction/memory-output.js';
import { createEvidenceScaffold } from './evidence-scaffold.mjs';
const { evidenceTool, validateEvidenceDocument } = createEvidenceScaffold({ schemaIssues, requireValid, memoryTool, validateMemoryDocument });

const { EVAL_BASELINE, EVAL_WORKSPACE, MODEL_BASE_URL, MODEL_API_KEY, MODEL_NAME } = process.env;
if (!EVAL_BASELINE || !EVAL_WORKSPACE || !MODEL_BASE_URL || !MODEL_API_KEY || MODEL_NAME !== 'deepseek-flash')
  throw Error('Set EVAL_BASELINE, fresh EVAL_WORKSPACE and the established deepseek-flash model environment');
const root = path.resolve(EVAL_WORKSPACE), baseline = path.resolve(EVAL_BASELINE);
if (root === baseline || fs.existsSync(root)) throw Error('Use a fresh output directory separate from the baseline');
const hash = x => createHash('sha256').update(x).digest('hex');
const read = p => JSON.parse(fs.readFileSync(p));
const save = (p, value) => fs.writeFileSync(p, typeof value === 'string' ? value : JSON.stringify(value, null, 2));
const frozenSystem = read(new URL('./versions/hybrid-allmsg-v1/hybrid.memory-system.json', import.meta.url));
const frozenTool = read(new URL('./versions/hybrid-allmsg-v1/hybrid.memory-tool.json', import.meta.url));
if (JSON.stringify(frozenTool) !== JSON.stringify(memoryTool)) throw Error('Baseline schema changed');
const delta = fs.readFileSync(new URL('./evidence-scaffold-v1.txt', import.meta.url), 'utf8').replace(/\r\n/g, '\n');
const variants = [
  { name: 'hybrid-high', effort: 'high', system: frozenSystem, tool: memoryTool, evidence: false },
  { name: 'hybrid-max', effort: 'max', system: frozenSystem, tool: memoryTool, evidence: false },
  { name: 'hybrid-max-evidence', effort: 'max', system: { role: 'system', content: frozenSystem.content + '\n\n' + delta }, tool: evidenceTool, evidence: true },
];
const cases = [];
for (const label of ['code', 'noncode']) {
  for (const thread of read(path.join(baseline, 'hybrid', label, 'metrics.json')).threads) {
    if (thread.status !== 'completed') throw Error('Baseline must be complete');
    const source = path.join(baseline, thread.directory);
    const inputBytes = fs.readFileSync(path.join(source, 'generation-input.json'));
    const payload = JSON.parse(inputBytes), first = read(path.join(source, 'generation-calls.json'))[0].request;
    const user = first.messages[1], episode = read(path.join(source, 'episode.json'));
    if (JSON.stringify(first.messages[0]) !== JSON.stringify(frozenSystem) || user.content !== JSON.stringify(payload)) throw Error('Original prompt or candidate changed');
    if (JSON.stringify(first.tools) !== JSON.stringify([memoryTool])) throw Error('Original schema changed');
    if (JSON.stringify(episode.event_refs) !== JSON.stringify(payload.candidate_events.map(e => e.ref))) throw Error('Episode membership changed');
    cases.push({ label, thread_id: thread.thread_id, title: thread.title, inputBytes, payload, user, episode,
      input_sha256: hash(inputBytes), user_content_sha256: hash(user.content), baseline_markdown_sha256: hash(fs.readFileSync(path.join(source, 'memory.md'))) });
  }
}
fs.mkdirSync(root, { recursive: true });
for (const v of variants) save(path.join(root, v.name + '.template.json'), { system: v.system, tool: v.tool, reasoning_effort: v.effort });
save(path.join(root, 'provenance.json'), {
  revision: execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(),
  model: MODEL_NAME, thinking: { type: 'enabled' }, max_tokens: 60000, max_attempts: 3, concurrency: 3,
  stage1_rerun: false, extra_model_review: false, event_pruning: false, production_write: false,
  comparison: 'fresh high vs max with identical hybrid-v1 prompt; max vs max+temporary source excerpts',
  runner_sha256: hash(fs.readFileSync(new URL(import.meta.url))),
  scaffold_sha256: hash(fs.readFileSync(new URL('./evidence-scaffold.mjs', import.meta.url))),
  modules: Object.fromEntries(['output', 'memory-output'].map(n => [n, hash(fs.readFileSync(new URL('../../dist/src/extraction/' + n + '.js', import.meta.url)))])),
  variants: variants.map(v => ({ name: v.name, reasoning_effort: v.effort, auxiliary_evidence: v.evidence, system_sha256: hash(v.system.content), tool_sha256: hash(JSON.stringify(v.tool)) })),
  cases: cases.map(({ label, thread_id, title, input_sha256, user_content_sha256, baseline_markdown_sha256 }) => ({ label, thread_id, title, input_sha256, user_content_sha256, baseline_markdown_sha256 })),
});
// Interleave variants for each fixed candidate; avoid running an entire variant hours apart.
const jobs = cases.flatMap(c => variants.map(v => ({ c, v }))), metrics = [];
const persist = () => save(path.join(root, 'metrics.json'), metrics);
async function generate({ c, v }) {
  const dir = path.join(root, v.name, c.label, c.thread_id);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'generation-input.json'), c.inputBytes);
  save(path.join(dir, 'episode.json'), c.episode);
  const result = { variant: v.name, label: c.label, thread_id: c.thread_id, title: c.title, reasoning_effort: v.effort,
    candidate_episode_count: 1, candidate_events: c.episode.event_refs.length, directory: path.relative(root, dir), status: 'started' };
  metrics.push(result); persist(); console.log(JSON.stringify(result));
  const messages = [structuredClone(v.system), structuredClone(c.user)], calls = [];
  try {
    for (let attempt = 0; attempt < 3; attempt++) {
      const request = { model: MODEL_NAME, thinking: { type: 'enabled' }, reasoning_effort: v.effort,
        messages: structuredClone(messages), tools: [v.tool], max_tokens: 60000 };
      const started = Date.now();
      const response = await fetch(MODEL_BASE_URL.replace(/\/$/, '') + '/chat/completions', {
        method: 'POST', headers: { authorization: 'Bearer ' + MODEL_API_KEY, 'content-type': 'application/json' },
        body: JSON.stringify(request), signal: AbortSignal.timeout(900000),
      });
      const data = await response.json();
      const trace = { request, response: data, http_status: response.status, elapsed_ms: Date.now() - started };
      calls.push(trace); save(path.join(dir, 'generation-calls.json'), calls);
      if (!response.ok) throw Error('HTTP ' + response.status + ': ' + JSON.stringify(data.error ?? {}));
      try {
        const value = readToolOutput(data, v.tool.function.name);
        const output = v.evidence ? validateEvidenceDocument(value, c.payload.candidate_events) : validateMemoryDocument(value);
        save(path.join(dir, 'model-output.json'), value);
        if (v.evidence) save(path.join(dir, 'support-notes.json'), output.support_notes);
        save(path.join(dir, 'memory.md'), output.markdown.trim() + '\n\n## source_refs\n- episode_id: `' + c.episode.episode_id + '`\n');
        Object.assign(result, { status: 'completed', attempts: calls.length, characters: output.markdown.length,
          support_notes: output.support_notes?.length ?? 0, elapsed_ms: calls.reduce((n, call) => n + call.elapsed_ms, 0),
          usage: data.usage, response_model: data.model, finish_reason: data.choices?.[0]?.finish_reason });
        break;
      } catch (error) {
        trace.validation_error = error.message; trace.validation_feedback = outputFeedback(error, v.tool.function.name);
        save(path.join(dir, 'generation-calls.json'), calls);
        if (attempt === 2) throw error;
        appendOutputRetry(messages, data.choices?.[0]?.message, error, v.tool.function.name);
      }
    }
  } catch (error) { Object.assign(result, { status: 'failed', attempts: calls.length, error: error.message }); }
  persist(); console.log(JSON.stringify(result));
}
let next = 0;
await Promise.all(Array.from({ length: 3 }, async () => { while (next < jobs.length) await generate(jobs[next++]); }));
save(path.join(root, 'completion.json'), { completed: metrics.filter(m => m.status === 'completed').length, failed: metrics.filter(m => m.status === 'failed').length, finished_at: new Date().toISOString() });
