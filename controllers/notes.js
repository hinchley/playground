import * as $notes from '../services/notes.js';
import config from '../config.js';

// show all notes.
export const all = (req, res) => {
  const q = req.query.q;
  // need error checking.
  const page = parseInt(req.query.page || 1);

  const { notes, total } = q ? $notes.find(q, page) : $notes.all(page);
  const pages = Math.ceil(total / config.pagesize);

  const links = {};
  if (page > 1) { links.prev = page - 1; }
  if (page != pages) { links.next = page + 1; }

  res.render('notes/index', { title: 'Notes', notes, q, page, links });
};

// show specific note.
export const one = (req, res) => {
  const note = $notes.one(req.params.id);
  res.render('notes/note', { title: 'Note', note });
};