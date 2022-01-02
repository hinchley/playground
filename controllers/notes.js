import * as $notes from '../services/notes.js';

// show all notes.
export const all = (req, res) => {
  const q = req.query.q;
  const notes = q ? $notes.find(q) : $notes.all();
  res.render('notes/index', { title: 'Notes', notes, q });
};

// show specific note.
export const one = (req, res) => {
  const note = $notes.one(req.params.id);
  res.render('notes/note', { title: 'Note', note });
};