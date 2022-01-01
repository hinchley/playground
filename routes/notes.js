import { Router } from 'express';
import * as notes from '../controllers/notes.js';

const router = Router();

router.get('/', notes.all);
router.get('/:id', notes.one);

export default router;
