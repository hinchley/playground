import * as $notes from '../services/notes.js';
import * as $tags  from '../services/tags.js';
import config from '../config.js';

const NOTES_PATH = '/admin/notes';
const TAGS_PATH  = '/admin/tags';

// admin home page.
export const index = (req, res) => {
  res.redirect(NOTES_PATH);
};

export const notes = {
  // show all notes.
  all: (req, res) => {
    // need error checking.
    const page = parseInt(req.query.page || 1);

    const { notes, total } = $notes.all(page);

    const pages = Math.ceil(total / config.pagesize);

    const links = {};
    if (page > 1) { links.prev = page - 1; }
    if (page != pages) { links.next = page + 1; }

    res.render('admin/notes/index', { title: 'Notes', notes, page, links });
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
    const { content, tags } = req.body
    const id = $notes.add(content);
    $tags.assign(id, tags);
    res.redirect(NOTES_PATH);
  },

  // update a note.
  update: (req, res) => {
    const { content, tags } = req.body;
    const id = req.params.id;
    $notes.update(id, content);
    $tags.assign(id, tags);
    res.redirect(NOTES_PATH);
  },

  // delete a note.
  delete: (req, res) => {
    $notes.remove(req.params.id);
    res.redirect(NOTES_PATH);
  }
};

export const tags = {
  // show all tags.
  all: (req, res) => {
    const items = $tags.all();
    res.render('admin/tags/index', { title: 'Tags', tags: items });
  },

  // show form for adding a new tag.
  new: (req, res) => {
    res.render('admin/tags/new', { title: 'Add Tag' });
  },

  // show form for updating a note.
  edit: (req, res) => {
    const item = $tags.one(req.params.id);
    res.render('admin/tags/tag', { title: 'Edit Tag', tag: item });
  },

  // add a tag.
  add: (req, res) => {
    $tags.add(req.body);
    res.redirect(TAGS_PATH);
  },

  // update a tag.
  update: (req, res) => {
    $tags.update(req.params.id, req.body);
    res.redirect(TAGS_PATH);
  },

  // delete a tag.
  delete: (req, res) => {
    $tags.remove(req.params.id);
    res.redirect(TAGS_PATH);
  }
};