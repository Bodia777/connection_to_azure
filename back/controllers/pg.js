import { pgPool } from '../config/db.config.js';

export const func = {
    get: async(req, res, next) => {
        try {
            const sql = 'SELECT * FROM wordsarr';
            const { rows } = await pgPool.instance().query(sql);
            if (rows) {
                console.log(rows, 'data', typeof rows);
                return res.status(200).json(rows.map((item) => item.word));
            }
            return res.status(200).json([]);
        } catch(err) {
            next(err);
        }
    },
    post: async(req, res, next) => {
        try {
            const sql = 'INSERT INTO wordsarr(word) VALUES($1) RETURNING *';
            const result = await pgPool.instance().query(sql, [req.body.data]);

            return res.status(200).json(result.rows[0]);
        } catch(err) {
            next(err);
        }
    }
}
