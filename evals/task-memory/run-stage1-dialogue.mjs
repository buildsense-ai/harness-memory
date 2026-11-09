import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { CompatibleChatModel } from '../../dist/src/extraction/model.js';
import { orderedDialogue } from './ordered-dialogue.mjs';

const root = path.resolve(process.env.EVAL_WORKSPACE);
const save = (p, value) => fs.writeFileSync(p, JSON.stringify(value, null, 2));
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const realFetch = globalThis.fetch;
const endpoint = process.env.MODEL_BASE_URL;
const model = process.env.MODEL_NAME;
if (!root || !endpoint || !model || !process.env.MODEL_API_KEY) throw Error('Missing configuration');
const immutable = path.join(root, 'experiment-provenance.json');
if (fs.existsSync(immutable)) throw Error('Use a fresh experiment directory');
const prepared = {};
for (const label of ['code','noncode']) {
  const context = fs.readFileSync(path.join(root, label + '.context.jsonl'));
  const snapshot = JSON.parse(fs.readFileSync(path.join(root, label + '.snapshot.json')));
  prepared[label] = orderedDialogue(context, snapshot);
  save(path.join(root, label + '.ordered-dialogue.json'), prepared[label]);
}
const templates = Object.fromEntries(['current','baseline'].map(version => [version, JSON.parse(fs.readFileSync(path.join(root, version + '.request-template.json')))]));
if (JSON.stringify(templates.current.tools) !== JSON.stringify(templates.baseline.tools)) throw Error('Output tool schemas differ');
save(immutable, {
  model, thinking: { type:'enabled' }, max_tokens:60000,
  run_order:['current/code','current/noncode','baseline/code','baseline/noncode'],
  current_prompt_commit:'fb3e6ba20826d08a2ce0f4067c062ad300eda0f0',
  baseline_tag:'memory-eval-20261108-baseline',
  run_stage2:false, format_normalization:false, production_write:false,
  script_sha256:sha(fs.readFileSync(new URL(import.meta.url))),
  builder_sha256:sha(fs.readFileSync(new URL('./ordered-dialogue.mjs', import.meta.url))),
  module_sha256:sha(fs.readFileSync(new URL('../../dist/src/extraction/model.js', import.meta.url))),
  prompts:Object.fromEntries(Object.entries(templates).map(([k,v])=>[k,sha(v.messages[0].content)])),
  inputs:Object.fromEntries(Object.entries(prepared).map(([k,v])=>[k,{context_sha256:v.source_context_sha256,original_snapshot_sha256:v.original_snapshot_sha256,dialogue_payload_sha256:sha(JSON.stringify(v.events.map(({ref,kind,text},source_index)=>({source_index,ref,kind,text}))))}])),
});

for (const version of ['current','baseline']) for (const label of ['code','noncode']) {
  const out = path.join(root,version,label); fs.mkdirSync(out,{recursive:true});
  const calls=[];
  // Keep the established parser, semantic ref validation, and format retry loop.
  // Replace only the system prompt with its frozen historical request template.
  globalThis.fetch = async(url, options) => {
    const request=JSON.parse(options.body);
    request.messages[0]=structuredClone(templates[version].messages[0]);
    const started=Date.now();
    const response=await realFetch(url,{...options,body:JSON.stringify(request),signal:AbortSignal.timeout(600000)});
    const data=await response.clone().json();
    calls.push({request,response:data,http_status:response.status,elapsed_ms:Date.now()-started});
    save(path.join(out,'calls.json'),calls);
    return response;
  };
  console.log(JSON.stringify({version,label,status:'started',query:prepared[label].events.filter(e=>e.kind==='query').length,message:prepared[label].events.filter(e=>e.kind==='message').length}));
  try {
    const result=await new CompatibleChatModel({baseUrl:endpoint,key:process.env.MODEL_API_KEY,model,maxOutputTokens:60000}).partition(prepared[label].events);
    save(path.join(out,'stage1-output.json'),result);
    save(path.join(out,'result.json'),{status:'completed',threads:result.task_threads.length,attempts:calls.length});
    console.log(JSON.stringify({version,label,status:'completed',threads:result.task_threads.length,attempts:calls.length}));
  } catch(e) {
    save(path.join(out,'result.json'),{status:'failed',error:e.message,attempts:calls.length});
    console.log(JSON.stringify({version,label,status:'failed',error:e.message,attempts:calls.length}));
  } finally {globalThis.fetch=realFetch;}
}
