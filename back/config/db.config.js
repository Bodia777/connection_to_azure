import * as m from 'dotenv';
m.config();
import {Pool} from 'pg';

let pool = null;

const config = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false
    },
    max: 1,
};

if (!pool) {
    pool = new Pool(config);
}

export const pgPool = {
    instance: function() {
        return pool;
    },
};
