import { Router } from 'express';
import { notes } from '../controllers/admin.js';

const router = Router();

// admin home page.
router.get('/', notes.all);

// show all notes.
router.get('/notes', notes.all);

// show form for adding a new note.
router.get('/notes/new', notes.new);

// show form for updating a note.
router.get('/notes/:id', notes.edit);

// add a note.
router.post('/notes', notes.add);

// update a note.
router.put('/notes/:id', notes.update);

// delete a note.
router.delete('/notes/:id', notes.delete);

export default router;