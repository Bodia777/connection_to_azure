import express from 'express';
import { func } from '../controllers/pg.js';

export const router = express.Router();
router.get('', func.get);
router.post('', func.post);
