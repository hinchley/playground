import { Router } from 'express';
import * as tags from '../controllers/tags.js';

const router = Router();

router.get('/', tags.all);
router.get('/:id', tags.one);

export default router;
