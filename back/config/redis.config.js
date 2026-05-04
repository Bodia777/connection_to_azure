import { createClient } from 'redis';
    let client;
try{
    client = await getRedisClient();
} catch(err){
    console.log(err, 'getRedisClient error');
}


export async function getRedisClient() {
    if (client?.isOpen) {
        return client;
    }

    client = createClient({
        socket: {
            host: process.env.REDIS_HOST || '127.0.0.1',
            port: Number(process.env.REDIS_PORT) || 6379,
        },
    });

    client.on('error', (err) => {
        console.error('Redis error:', err);
    });

    try {
        await client.connect();
        console.log('✅ Redis connected');
    } catch (err) {
        console.error('❌ Redis connection failed', err);
    }
    return client;
}

export const redisClient = {
    instance: function() {
        return client;
    },
};
