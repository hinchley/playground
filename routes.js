import { Router } from 'express';

import * as auth   from './controllers/auth.js';
import * as notes  from './controllers/notes.js';
import * as tags   from './controllers/tags.js';

import * as _notes from './controllers/admin/notes.js';
import * as _tags  from './controllers/admin/tags.js';

import { isAuth, isNotAuth } from './services/auth.js';

const router = Router();

// home page.
router.get('/', notes.all);
router.get('/login', isAuth, auth.prompt);
router.post('/login', isAuth, auth.login);
router.get('/logout', auth.logout);

// public notes.
router.get('/notes', notes.all);
router.get('/notes/:id', notes.one);

// public tags.
router.get('/tags', tags.all);
router.get('/tags/:id', tags.one);

// admin routes.
router.use('/admin', isNotAuth);

// admin home page.
router.get('/admin', _notes.all);

// show all notes.
router.get('/admin/notes', _notes.all);

// show form for adding a new note.
router.get('/admin/notes/start', _notes.start);

// show form for updating a note.
router.get('/admin/notes/:id', _notes.edit);

// add a note.
router.post('/admin/notes', _notes.add);

// update a note.
router.put('/admin/notes/:id', _notes.update);

// delete a note.
router.delete('/admin/notes/:id', _notes.del);

// show all tags.
router.get('/admin/tags', _tags.all);

// show form for adding a new tag.
router.get('/admin/tags/start', _tags.start);

// show form for updating a tag.
router.get('/admin/tags/:id', _tags.edit);

// add a tag.
router.post('/admin/tags', _tags.add);

// update a tag.
router.put('/admin/tags/:id', _tags.update);

// delete a tag.
router.delete('/admin/tags/:id', _tags.del);

export default router;