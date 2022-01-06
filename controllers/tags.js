import * as $tags from '../services/tags.js';

// show all tags.
export const all = (req, res) => {
  const q = req.query.q;
  const notes = q ? $tags.find(q) : $tags.all();
  res.render('tags/index', { title: 'Tags', tags, q });
};

// show specific tag.
export const one = (req, res) => {
  const tag = $tags.one(req.params.id);
  res.render('tags/tag', { title: 'Tag', tag });
};