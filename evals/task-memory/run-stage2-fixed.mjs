import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { appendOutputRetry, outputFeedback, readToolOutput } from '../../dist/src/extraction/output.js';
import { memoryTool, validateMemoryDocument } from '../../dist/src/extraction/memory-output.js';

const { EVAL_BASELINE, EVAL_WORKSPACE, MODEL_BASE_URL, MODEL_API_KEY, MODEL_NAME } = process.env;
if (!EVAL_BASELINE || !EVAL_WORKSPACE || !MODEL_BASE_URL || !MODEL_API_KEY || MODEL_NAME !== 'deepseek-flash')
  throw Error('Set EVAL_BASELINE, fresh EVAL_WORKSPACE and the established deepseek-flash model environment');
const root=path.resolve(EVAL_WORKSPACE), baseline=path.resolve(EVAL_BASELINE);
if (root===baseline || fs.existsSync(root)) throw Error('Use a fresh output directory separate from the baseline');
const hash=x=>createHash('sha256').update(x).digest('hex');
const read=p=>JSON.parse(fs.readFileSync(p));
const save=(p,x)=>fs.writeFileSync(p,typeof x==='string'?x:JSON.stringify(x,null,2));
const prompt=fs.readFileSync(new URL('./faithful-record-v1-prompt.txt',import.meta.url),'utf8').replace(/\r\n/g,'\n');
const system={role:'system',content:prompt};
const frozenTool=read(new URL('./versions/hybrid-allmsg-v1/hybrid.memory-tool.json',import.meta.url));
if(JSON.stringify(frozenTool)!==JSON.stringify(memoryTool)) throw Error('Stage 2 tool schema differs from frozen baseline');
const jobs=[];
for(const label of ['code','noncode']){
  const metrics=read(path.join(baseline,'hybrid',label,'metrics.json'));
  for(const thread of metrics.threads){
    if(thread.status!=='completed')throw Error('Baseline must contain all completed documents');
    const source=path.join(baseline,thread.directory);
    const inputBytes=fs.readFileSync(path.join(source,'generation-input.json'));
    const payload=JSON.parse(inputBytes), oldCalls=read(path.join(source,'generation-calls.json'));
    const user=oldCalls[0].request.messages[1];
    if(user.role!=='user'||user.content!==JSON.stringify(payload))throw Error('Input differs from original request');
    if(JSON.stringify(oldCalls[0].request.tools)!==JSON.stringify([memoryTool]))throw Error('Original schema differs');
    const episode=read(path.join(source,'episode.json'));
    if(JSON.stringify(episode.event_refs)!==JSON.stringify(payload.candidate_events.map(e=>e.ref)))throw Error('Episode refs differ');
    jobs.push({label,thread,source,inputBytes,user,episode,input_sha256:hash(inputBytes),user_content_sha256:hash(user.content),baseline_markdown_sha256:hash(fs.readFileSync(path.join(source,'memory.md')))});
  }
}
fs.mkdirSync(root,{recursive:true});
save(path.join(root,'system.json'),system);
const provenance={variant:'faithful-record-v1',revision:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),model:MODEL_NAME,thinking:{type:'enabled'},max_tokens:60000,max_attempts:3,stage1_rerun:false,fixed_stage1:'hybrid-allmsg-v1 actual 2026-11-09 outputs',extra_model_review:false,auxiliary_evidence:false,production_write:false,prompt_sha256:hash(prompt),runner_sha256:hash(fs.readFileSync(new URL(import.meta.url))),modules:Object.fromEntries(['output','memory-output'].map(n=>[n,hash(fs.readFileSync(new URL('../../dist/src/extraction/'+n+'.js',import.meta.url)))])),jobs:jobs.map(({label,thread,input_sha256,user_content_sha256,baseline_markdown_sha256})=>({label,thread_id:thread.thread_id,title:thread.title,input_sha256,user_content_sha256,baseline_markdown_sha256}))};
provenance.reasoning_effort='max';
save(path.join(root,'provenance.json'),provenance);
const metrics=[];
async function generate(job){
  const {label,thread,inputBytes,user,episode}=job;
  const directory=path.join(label,'threads',thread.thread_id);
  const dir=path.join(root,directory);fs.mkdirSync(dir,{recursive:true});
  fs.writeFileSync(path.join(dir,'generation-input.json'),inputBytes);
  save(path.join(dir,'episode.json'),episode);
  const result={label,thread_id:thread.thread_id,title:thread.title,directory,status:'started',candidate_events:episode.event_refs.length};
  metrics.push(result);save(path.join(root,'metrics.json'),metrics);
  console.log(JSON.stringify(result));
  const messages=[structuredClone(system),structuredClone(user)],calls=[];
  try{
    for(let attempt=0;attempt<3;attempt++){
      const request={model:MODEL_NAME,thinking:{type:'enabled'},reasoning_effort:'max',messages:structuredClone(messages),tools:[memoryTool],max_tokens:60000};
      const started=Date.now();
      const response=await fetch(MODEL_BASE_URL.replace(/\/$/,'')+'/chat/completions',{
        method:'POST',headers:{authorization:'Bearer '+MODEL_API_KEY,'content-type':'application/json'},
        body:JSON.stringify(request),signal:AbortSignal.timeout(900000)});
      const data=await response.json();
      const trace={request,response:data,http_status:response.status,elapsed_ms:Date.now()-started};calls.push(trace);
      save(path.join(dir,'generation-calls.json'),calls);
      if(!response.ok)throw Error('HTTP '+response.status);
      try{
        const output=validateMemoryDocument(readToolOutput(data,memoryTool.function.name));
        save(path.join(dir,'model-output.json'),{markdown:output.markdown});
        save(path.join(dir,'memory.md'),output.markdown.trim()+'\n\n## source_refs\n- episode_id: `'+episode.episode_id+'`\n');
        Object.assign(result,{status:'completed',attempts:calls.length,characters:output.markdown.length});break;
      }catch(error){
        trace.validation_error=error.message;trace.validation_feedback=outputFeedback(error,memoryTool.function.name);
        save(path.join(dir,'generation-calls.json'),calls);
        if(attempt===2)throw error;
        appendOutputRetry(messages,data.choices?.[0]?.message,error,memoryTool.function.name);
      }
    }
  }catch(error){Object.assign(result,{status:'failed',attempts:calls.length,error:error.message});}
  save(path.join(root,'metrics.json'),metrics);console.log(JSON.stringify(result));
}
let next=0;
await Promise.all(Array.from({length:2},async()=>{while(next<jobs.length)await generate(jobs[next++]);}));
save(path.join(root,'completion.json'),{completed:metrics.filter(m=>m.status==='completed').length,failed:metrics.filter(m=>m.status==='failed').length,finished_at:new Date().toISOString()});
