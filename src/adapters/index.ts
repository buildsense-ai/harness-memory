import {TextDecoder} from 'node:util';
import {assert,type Harness,type ProjectedRecord} from '../contracts.js';
import {projectXiaoba} from './xiaoba.js';import {projectPi} from './pi.js';
export {selectPiPath} from './pi.js';
export function projectRecord(harness:Harness,raw:Buffer):ProjectedRecord{
 assert(harness==='xiaoba'||harness==='pi','unsupported harness');
 let r:any;try{r=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(raw))}catch{throw new Error('invalid UTF-8 JSON record')}
 assert(r&&typeof r==='object'&&!Array.isArray(r),'invalid record');
 return harness==='xiaoba'?projectXiaoba(r):projectPi(r);
}
