import { Router } from 'express';
import * as auth from '../controllers/auth.js';
import * as notes from '../controllers/notes.js';
import { isAuth } from '../services/auth.js';

const router = Router();

router.get('/', notes.all);
router.get('/login', isAuth, auth.prompt);
router.post('/login', isAuth, auth.login);
router.get('/logout', auth.logout);

export default router;
