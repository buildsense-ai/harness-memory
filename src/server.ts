import {createPool} from './db/pool.js';import {migrate} from './db/migrate.js';import {buildApp} from './app.js';
import {configuredModel} from './extraction/model.js';
const pool=createPool();await migrate(pool);await pool.query("update extraction_runs set status='interrupted',error='service restarted; rerun manually' where status='running'");const app=await buildApp({pool,model:configuredModel(),budget:Number(process.env.MODEL_INPUT_BUDGET??65536)});await app.listen({host:process.env.HOST??'127.0.0.1',port:Number(process.env.PORT??8460)});console.log('Harness Memory listening');
for(const signal of ['SIGTERM','SIGINT'])process.once(signal,async()=>{await app.close();await pool.end();process.exit(0)});
