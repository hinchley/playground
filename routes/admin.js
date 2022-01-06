import { Router } from 'express';
import { notes, tags } from '../controllers/admin.js';

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

// show all tags.
router.get('/tags', tags.all);

// show form for adding a new tag.
router.get('/tags/new', tags.new);

// show form for updating a tag.
router.get('/tags/:id', tags.edit);

// add a tag.
router.post('/tags', tags.add);

// update a tag.
router.put('/tags/:id', tags.update);

// delete a tag.
router.delete('/tags/:id', tags.delete);

export default router;