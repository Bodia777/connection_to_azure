import express from 'express';
import cors from 'cors';
// import {router as redisRouter }  from './routes/redis.router.js';
import { router as dbRouter } from './routes/db.router.js';


export const app = express();

const allowList = process.env.ORIGIN_WHITE_LIST.split(',');
const corsOptionsDelegate = function (req, callback) {
    let corsOptions;
    let err;
    if (allowList && allowList.includes(req.headers.origin)) {
        corsOptions = {
            origin: req.headers.origin,
            methods: 'GET,PUT,POST,PATCH,DELETE,HEAD,OPTIONS',
            credentials: true,
            allowedHeaders: 'Referrer-Policy, Content-Type, ' +
                    'Access-Control-Allow-Headers, Authorization, X-Requested-With, ' +
                    'authorization, content-type',
            optionsSuccessStatus: 200,
        }
    } else {
        err = new Error('Cors options origin error');
        // Logger.error('Cors options origin error');
        corsOptions = { origin: false }
    }
    callback(err, corsOptions);
};

app.use(cors(
    corsOptionsDelegate
    ));

app.use(express.json({limit: 1024 * 1024 * 20}));

app.use(express.urlencoded({
    limit: '20mb',
    extended: true,
    parameterLimit: 50000
}));


// app.use('/redis', redisRouter);
app.use('/db', dbRouter);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

app.use((req, res, next) => {
    const wrongUrlArr = req.url.split('/');
    // Logger.debug(`WrgUrl!!:${wrongUrlArr.pop()}, previous: ${wrongUrlArr.pop()}`);
    const error = new Error('Not found');
    error.status = 404;
    error.message = 'wrong href';
    // Logger.error('message from error app wrong href', error);
    next(error);
});

app.use((err, req, res, next) => {
    console.log(err, 'error')
    res.status(err.status || 500).json({
        error: {message: 'system error'}
    });
});
