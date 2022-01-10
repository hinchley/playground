import * as $tags from '../../services/tags.js';

const TAGS_PATH  = '/admin/tags';

// show all tags.
export const all = (req, res) => {
  const items = $tags.all();
  res.render('admin/tags/index', { title: 'Tags', tags: items });
};

// show form for adding a new tag.
export const start = (req, res) => {
  res.render('admin/tags/start', { title: 'Add Tag' });
};

// show form for updating a note.
export const edit = (req, res) => {
  const item = $tags.one(req.params.id);
  res.render('admin/tags/tag', { title: 'Edit Tag', tag: item });
};

// add a tag.
export const add = (req, res) => {
  $tags.add(req.body);
  res.redirect(TAGS_PATH);
};

// update a tag.
export const update = (req, res) => {
  $tags.update(req.params.id, req.body);
  res.redirect(TAGS_PATH);
};

// delete a tag.
export const del = (req, res) => {
  $tags.remove(req.params.id);
  res.redirect(TAGS_PATH);
};