import http from 'http';

import { app } from '../app.js';
import { pgPool } from '../config/db.config.js';
import { redisClient } from '../config/redis.config.js';
import { migration } from '../migrations/migration.js';


export const server = http.createServer(app);

process.on("SIGINT", async () => {
    console.log("Shutting down...");
    if (redisClient.instance()) {
        await redisClient.instance().quit();
        await redisClient.instance().destroy();
    }
    if (pgPool.instance()) {
        await pgPool.instance().end();
        await pgPool.instance().quit();
    }
    process.exit(0);
});


server.listen(process.env.SERVER_PORT, async() => {
    console.log(`
    ================Server=================
      host : ${process.env.SERVER_HOST}
      port : ${process.env.SERVER_PORT}
    =======================================
    `);

    try{
        pgPool.instance();
        console.log('Pool started')
    } catch(e) {
        console.log(e, 'ERROR<<<<<<DB<<<CONNECTION<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
    }

    try{
        redisClient.instance();
    } catch(e) {
        console.log(e, 'ERROR<<<<<<REDIS<<<CONNECTION<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
    }

    try {
        await waitForPostgres();
        await migration.start();
    } catch(e) {
        console.log(e, 'MIGRATION ERROR');
    }
});


async function waitForPostgres(retries = 10, delay = 3000) {
    for (let i = 0; i < retries; i++) {
        try {
            await pgPool.instance().query('SELECT 1'); // test query
            console.log('Postgres is ready!');
            return;
        } catch (err) {
            console.log('Waiting for Postgres...', err.message);
            await new Promise(r => setTimeout(r, delay));
        }
    }
    throw new Error('Postgres not available after multiple retries');
}
