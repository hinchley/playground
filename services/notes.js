import * as db from './db.js';
import config from '../config.js';

const limit = config.pagesize;

export const one = (id) => {
  const query = `
    SELECT Notes.*, GROUP_CONCAT(Tags.name, ', ') As tags FROM Notes
      INNER JOIN NotesTags ON Notes.id = NotesTags.Note
      INNER JOIN Tags ON Tags.id = NotesTags.Tag
      WHERE Notes.id = @id
    `;
  return db.one(query, { id });
};

export const all = (page = 1) => {
  const total = db.one(`SELECT count(*) AS total FROM Notes`).total;
  const query = `SELECT * FROM Notes LIMIT @offset, @limit`;
  const notes = db.all(query, { limit, offset: (page - 1) * limit });
  return { notes, total };
};

export const update = (id, content) => {
  db.run(`
    UPDATE Notes
      SET content = @content
    WHERE id = @id
  `, { id, content });
};

export const add = (content) => {
  const result = db.run(`
    INSERT INTO Notes (content)
      VALUES (@content)
  `, { content });

  return result.lastInsertRowid;
};

export const remove = (id) => {
  db.run(`
    DELETE FROM Notes
      WHERE id = @id
  `, { id });
};

export const find = (q, page = 1) => {
  const total = db.one(`
    SELECT count(*) as total FROM NotesSearch
      WHERE content MATCH @q
    `, { q }).total;

  const query = `
    SELECT * FROM NotesSearch
      WHERE content MATCH @q
      LIMIT @offset, @limit`;

  const notes = db.all(query, { q, limit, offset: (page - 1) * limit });

  return { notes, total };
};