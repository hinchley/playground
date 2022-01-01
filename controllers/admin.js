import * as $notes from '../services/notes.js';

const NOTES_PATH = '/admin/notes';

// admin home page.
export const index = (req, res) => {
  res.redirect(NOTES_PATH);
};

export const notes = {
  // show all notes.
  all: (req, res) => {
    const items = $notes.all();
    res.render('admin/notes/index', { title: 'Notes', notes: items });
  },

  // show form for adding a new note.
  new: (req, res) => {
    res.render('admin/notes/new', { title: 'Add Note' });
  },

  // show form for updating a note.
  edit: (req, res) => {
    const item = $notes.one(req.params.id);
    res.render('admin/notes/note', { title: 'Edit Note', note: item });
  },

  // add a note.
  add: (req, res) => {
    $notes.add(req.body);
    res.redirect(NOTES_PATH);
  },

  // update a note.
  update: (req, res) => {
    $notes.update(req.params.id, req.body);
    res.redirect(NOTES_PATH);
  },

  // delete a note.
  delete: (req, res) => {
    $notes.remove(req.params.id);
    res.redirect(NOTES_PATH);
  }
};