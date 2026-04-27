import { createClient } from 'redis';

let client = null;

if (!client) {
    try {
        client = createClient({
            socket: {
                host: process.env.REDIS_HOST,
                port: Number(process.env.REDIS_PORT)
            },
        });

        client.on('error', (err) => {
            console.error('Redis error:', err);
        });

        await client.connect();

        console.log('✅ Redis connected');
    } catch (err) {
        console.error('❌ Redis failed, app will continue without it', err);
    }
}

export const redisClient = {
    instance: function() {
        return client;
    },
};
