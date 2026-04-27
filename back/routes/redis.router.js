import express from 'express';
import { func } from '../controllers/redis.js';

export const router = express.Router();
router.get('', func.get);
router.post('', func.post);
