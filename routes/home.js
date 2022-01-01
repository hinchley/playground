import { Router } from 'express';
import * as home from '../controllers/home.js';

const router = Router();

router.get('/', home.index);

export default router;
