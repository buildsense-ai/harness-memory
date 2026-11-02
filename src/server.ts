import {createPool} from './db/pool.js';import {migrate} from './db/migrate.js';import {buildApp} from './app.js';
const pool=createPool();await migrate(pool);const app=await buildApp({pool});await app.listen({host:process.env.HOST??'127.0.0.1',port:Number(process.env.PORT??8460)});console.log('Harness Memory listening');
for(const signal of ['SIGTERM','SIGINT'])process.once(signal,async()=>{await app.close();await pool.end();process.exit(0)});
