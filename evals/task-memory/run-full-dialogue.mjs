import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { CompatibleChatModel } from '../../dist/src/extraction/model.js';
import { appendOutputRetry, outputFeedback, readToolOutput } from '../../dist/src/extraction/output.js';
import { memoryTool, validateMemoryDocument } from '../../dist/src/extraction/memory-output.js';
import { orderedContext } from './ordered-dialogue.mjs';

if (!process.env.EVAL_WORKSPACE) throw Error('Missing EVAL_WORKSPACE');
const root=path.resolve(process.env.EVAL_WORKSPACE);
const save=(p,x)=>fs.writeFileSync(p,typeof x==='string'?x:JSON.stringify(x,null,2));
const hash=x=>createHash('sha256').update(x).digest('hex');
const config={baseUrl:process.env.MODEL_BASE_URL,key:process.env.MODEL_API_KEY,model:process.env.MODEL_NAME,maxOutputTokens:60000};
if(!config.baseUrl||!config.key||!config.model) throw Error('Missing model configuration');
const realFetch=globalThis.fetch;
const versions=(process.env.EVAL_VARIANTS ?? 'baseline,current').split(',');
if(!versions.length||new Set(versions).size!==versions.length||versions.some(v=>! /^[a-z][a-z0-9-]*$/.test(v)))
  throw Error('EVAL_VARIANTS must contain unique simple variant names');
const labels=['code','noncode'];
const prepared={}, templates={}, prompts={};
const provenance=path.join(root,'full-run-provenance.json');
if(fs.existsSync(provenance)) throw Error('Use a fresh experiment directory');
for(const label of labels){
  const bytes=fs.readFileSync(path.join(root,label+'.context.jsonl'));
  const snapshot=JSON.parse(fs.readFileSync(path.join(root,label+'.snapshot.json')));
  prepared[label]=orderedContext(bytes,snapshot);
  save(path.join(root,label+'.full-context.json'),prepared[label]);
}
for(const version of versions){
  templates[version]=JSON.parse(fs.readFileSync(path.join(root,version+'.request-template.json')));
  prompts[version]=JSON.parse(fs.readFileSync(path.join(root,version+'.memory-system.json')));
  if(prompts[version].role!=='system'||typeof prompts[version].content!=='string') throw Error('Invalid frozen memory system');
}
if(versions.some(v=>JSON.stringify(templates[v].tools)!==JSON.stringify(templates[versions[0]].tools))) throw Error('Stage 1 schemas differ');
save(provenance,{
  revision:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),
  model:config.model,thinking:{type:'enabled'},reasoning_effort:'max',max_tokens:60000,max_attempts:3,
  all_public_messages:true,stage2_tools:true,candidate_unit:'union of complete original aggregate turns',
  extra_model_review:false,format_normalization:false,production_write:false,
  script_sha256:hash(fs.readFileSync(new URL(import.meta.url))),
  builder_sha256:hash(fs.readFileSync(new URL('./ordered-dialogue.mjs',import.meta.url))),
  modules:Object.fromEntries(['model','output','memory-output'].map(n=>[n,hash(fs.readFileSync(new URL('../../dist/src/extraction/'+n+'.js',import.meta.url)))])),
  prompts:Object.fromEntries(versions.map(v=>[v,{stage1:hash(templates[v].messages[0].content),stage2:hash(prompts[v].content)}])),
  sources:Object.fromEntries(labels.map(l=>[l,{native:prepared[l].source_context_sha256,snapshot:prepared[l].original_snapshot_sha256,events:prepared[l].events.length}])),
});
const jobs=[];
const view=events=>events.map(({ref,kind,timestamp,tool_call_id,text})=>({ref,kind,timestamp,tool_call_id,text}));
for(const version of versions) for(const label of labels){
  const out=path.join(root,version,label);fs.mkdirSync(out,{recursive:true});
  const calls=[],context=prepared[label];
  globalThis.fetch=async(url,options)=>{
    const request=JSON.parse(options.body);request.messages[0]=structuredClone(templates[version].messages[0]);
    const start=Date.now();
    const response=await realFetch(url,{...options,body:JSON.stringify(request),signal:AbortSignal.timeout(600000)});
    const data=await response.clone().json();calls.push({request,response:data,http_status:response.status,elapsed_ms:Date.now()-start});
    save(path.join(out,'stage1-calls.json'),calls);return response;
  };
  console.log(JSON.stringify({version,label,stage:'partition',status:'started'}));
  let partition;
  try{partition=await new CompatibleChatModel(config).partition(context.events);}
  catch(e){save(path.join(out,'error.json'),{error:e.message,attempts:calls.length});console.log(JSON.stringify({version,label,status:'failed',error:e.message}));continue;}
  finally{globalThis.fetch=realFetch;}
  save(path.join(out,'stage1-output.json'),partition);
  const candidates=partition.task_threads.map(thread=>{
    const assignments=partition.query_assignments.filter(a=>a.thread_ids.includes(thread.thread_id));
    const refs=new Set(assignments.map(a=>a.query_ref));
    const turns=new Set(context.events.filter(e=>refs.has(e.ref)).map(e=>e.original_turn));
    const events=context.events.filter(e=>turns.has(e.original_turn));
    for(const ref of refs)if(!events.some(e=>e.ref===ref&&e.kind==='query'))throw Error('Candidate lost an assigned query');
    const episode_id='ep_allmsg_'+hash(context.source_context_sha256+thread.thread_id+events.map(e=>e.ref).join('|')).slice(0,24);
    return {task_thread:thread,query_assignments:assignments,events,episode_id,turns:[...turns]};
  });
  const counts=new Map();for(const c of candidates)for(const e of c.events)counts.set(e.ref,(counts.get(e.ref)||0)+1);
  const metrics={version,label,stage1_attempts:calls.length,source_events:context.events.length,
    stage1_queries:context.events.filter(e=>e.kind==='query').length,stage1_messages:context.events.filter(e=>e.kind==='message').length,
    unique_candidate_events:counts.size,uncovered_refs:context.events.filter(e=>!counts.has(e.ref)).map(e=>e.ref),
    shared_unique_events:[...counts.values()].filter(n=>n>1).length,
    extra_memberships:[...counts.values()].reduce((s,n)=>s+n-1,0),threads:[]};
  for(const c of candidates){
    const dir=path.join(out,'threads',String(metrics.threads.length+1));fs.mkdirSync(dir,{recursive:true});
    save(path.join(dir,'episode.json'),{episode_id:c.episode_id,source_snapshot_sha256:context.original_snapshot_sha256,
      source_context_sha256:context.source_context_sha256,server_registered:false,task_thread:c.task_thread,
      original_turns:c.turns,event_refs:c.events.map(e=>e.ref)});
    const metric={thread_id:c.task_thread.thread_id,title:c.task_thread.title,original_turns:c.turns,
      candidate_episode_count:1,candidate_events:c.events.length,candidate_bytes:Buffer.byteLength(JSON.stringify(view(c.events))),
      directory:path.relative(root,dir),status:'pending'};
    metrics.threads.push(metric);jobs.push({version,label,c,dir,metric,metrics,out});
  }
  save(path.join(out,'metrics.json'),metrics);
  console.log(JSON.stringify({version,label,stage:'partition',status:'completed',threads:candidates.length,attempts:calls.length}));
}
async function generate(job){
  const {version,label,c,dir,metric,metrics,out}=job;
  const payload={task_thread:c.task_thread,query_assignments:c.query_assignments,candidate_events:view(c.events)};
  save(path.join(dir,'generation-input.json'),payload);
  const messages=[structuredClone(prompts[version]),{role:'user',content:JSON.stringify(payload)}],calls=[];
  console.log(JSON.stringify({version,label,thread:metric.thread_id,stage:'memory',status:'started',events:c.events.length}));
  try{
    for(let attempt=0;attempt<3;attempt++){
      const request={model:config.model,thinking:{type:'enabled'},reasoning_effort:'max',messages:structuredClone(messages),tools:[memoryTool],max_tokens:60000};
      const start=Date.now();
      const response=await realFetch(config.baseUrl.replace(/\/$/,'')+'/chat/completions',{
        method:'POST',headers:{authorization:'Bearer '+config.key,'content-type':'application/json'},
        body:JSON.stringify(request),signal:AbortSignal.timeout(600000)});
      const data=await response.json(),trace={request,response:data,http_status:response.status,elapsed_ms:Date.now()-start};calls.push(trace);
      save(path.join(dir,'generation-calls.json'),calls);
      if(!response.ok)throw Error('Generation HTTP '+response.status);
      try{
        const submitted=readToolOutput(data,memoryTool.function.name);
        const result=validateMemoryDocument(submitted);
        save(path.join(dir,'model-output.json'),{markdown:result.markdown});
        save(path.join(dir,'memory.md'),result.markdown.trim()+'\n\n## source_refs\n- episode_id: `'+c.episode_id+'`\n');
        Object.assign(metric,{status:'completed',attempts:calls.length,characters:result.markdown.length,headings:result.headings});break;
      }catch(e){
        trace.validation_error=e.message;trace.validation_feedback=outputFeedback(e,memoryTool.function.name);
        save(path.join(dir,'generation-calls.json'),calls);
        if(attempt===2)throw e;
        appendOutputRetry(messages,data.choices?.[0]?.message,e,memoryTool.function.name);
      }
    }
  }catch(e){Object.assign(metric,{status:'failed',error:e.message,attempts:calls.length});}
  save(path.join(out,'metrics.json'),metrics);
  console.log(JSON.stringify({version,label,stage:'memory',...metric}));
}
// Stage 1 interception is finished before independent Stage 2 requests start.
let next=0;
await Promise.all(Array.from({length:2},async()=>{while(next<jobs.length){const job=jobs[next++];await generate(job);}}));
save(path.join(root,'completion.json'),{completed:jobs.filter(j=>j.metric.status==='completed').length,failed:jobs.filter(j=>j.metric.status==='failed').length,
  partitions:versions.flatMap(v=>labels.map(l=>({version:v,label:l,failed:fs.existsSync(path.join(root,v,l,'error.json'))}))),finished_at:new Date().toISOString()});
