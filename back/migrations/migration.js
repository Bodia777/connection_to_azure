import { pgPool } from '../config/db.config.js';

export const migration = {
    start: async() => {
        await pgPool.instance().query(`
            CREATE TABLE IF NOT EXISTS wordsarr (
            id SERIAL PRIMARY KEY,
            word TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT NOW()
        );`);
    }
}
