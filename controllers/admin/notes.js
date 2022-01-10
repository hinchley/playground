import * as $notes from '../../services/notes.js';
import * as $tags  from '../../services/tags.js';
import config from '../../config.js';

const NOTES_PATH = '/admin/notes';

// admin home page.
export const index = (req, res) => {
  res.redirect(NOTES_PATH);
};

// show all notes.
export const all = (req, res) => {
  // need error checking.
  const page = parseInt(req.query.page || 1);

  const { notes, total } = $notes.all(page);

  const pages = Math.ceil(total / config.pagination.pagesize);

  const links = {};
  if (page > 1) { links.prev = page - 1; }
  if (page != pages) { links.next = page + 1; }

  res.render('admin/notes/index', { title: 'Notes', notes, page, links });
};

// show form for adding a new note.
export const start = (req, res) => {
  res.render('admin/notes/start', { title: 'Add Note' });
};

// show form for updating a note.
export const edit = (req, res) => {
  const item = $notes.one(req.params.id);
  res.render('admin/notes/note', { title: 'Edit Note', note: item });
};

// add a note.
export const add = (req, res) => {
  const { content, tags } = req.body
  const id = $notes.add(content);
  $tags.assign(id, tags);
  res.redirect(NOTES_PATH);
};

// update a note.
export const update = (req, res) => {
  const { content, tags } = req.body;
  const id = req.params.id;
  $notes.update(id, content);
  $tags.assign(id, tags);
  res.redirect(NOTES_PATH);
};

// delete a note.
export const del = (req, res) => {
  $notes.remove(req.params.id);
  res.redirect(NOTES_PATH);
};