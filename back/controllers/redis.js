// import { redisClient } from '../config/redis.config.js';
//
// export const func = {
//     get: async(req, res, next) => {
//         try {
//             const data = await redisClient.instance().get('wordsArr');
//             if (data) {
//                 console.log(data, 'data', typeof data);
//                 return res.status(200).json(JSON.parse(data));
//             }
//             return res.status(200).json([]);
//         } catch(err) {
//             next(err);
//         }
//     },
//     post: async(req, res, next) => {
//         try {
//             const data = JSON.parse((await redisClient.instance().get('wordsArr')) || '[]');
//             console.log(data, 'data', typeof data);
//             data.push(req.body.data);
//             await redisClient.instance().set('wordsArr', JSON.stringify(data));
//             return res.status(200).json(data);
//         } catch(err) {
//             next(err);
//         }
//     }
// }
