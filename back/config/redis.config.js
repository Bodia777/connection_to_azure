import { createClient } from 'redis';

let client = null;

if (!client) {
    client = await createClient({
        socket: {
            host: process.env.REDIS_HOST || "127.0.0.1",
            port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
            tls: true
        },
        password: process.env.REDIS_PASSWORD,
    })
        .on("error", (err) => console.log("Redis Client Error", err))
        .connect();
}

export const redisClient = {
    instance: function() {
        return client;
    },
};

