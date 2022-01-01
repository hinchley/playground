import * as $notes from '../services/notes.js';

// show all notes.
export const all = (req, res) => {
  const notes = $notes.all();
  res.render('notes/index', { title: 'Notes', notes });
};

// show specific note.
export const one = (req, res) => {
  const note = $notes.one(req.params.id);
  res.render('notes/note', { title: 'Note', note });
};