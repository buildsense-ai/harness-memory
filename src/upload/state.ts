import {readFile,writeFile,rename,mkdir} from 'node:fs/promises';import {dirname,resolve} from 'node:path';import {assert,ref,sha256,type Harness} from '../contracts.js';
export interface UploadConfig{url:string;key:string;harness:Harness;file:string}
export interface UploadState{fingerprint:string;source_id:string;stream_id:string;offset:number}
export async function saveState(path:string,state:UploadState){await mkdir(dirname(resolve(path)),{recursive:true});const tmp=path+'.tmp';await writeFile(tmp,JSON.stringify(state),{mode:0o600});await rename(tmp,path)}
export async function loadState(config:UploadConfig,path:string):Promise<UploadState>{
 const fingerprint=sha256(JSON.stringify([config.url.replace(/\/$/,''),sha256(config.key),config.harness,resolve(config.file)]));
 try{const s=JSON.parse(await readFile(path,'utf8'));assert(s.fingerprint===fingerprint&&Number.isSafeInteger(s.offset)&&s.offset>=0&&typeof s.source_id==='string'&&typeof s.stream_id==='string','state does not match configuration');return s}catch(e){if((e as NodeJS.ErrnoException).code!=='ENOENT')throw e;const state={fingerprint,source_id:ref('src'),stream_id:ref('stream'),offset:0};await saveState(path,state);return state}
}
