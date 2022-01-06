import * as db from './db.js';

export const one = (id) => {
  const query = `
    SELECT Notes.*, GROUP_CONCAT(Tags.name, ', ') As tags FROM Notes
      INNER JOIN NotesTags ON Notes.id = NotesTags.Note
      INNER JOIN Tags ON Tags.id = NotesTags.Tag
      WHERE Notes.id = @id
    `;
  return db.one(query, { id });
};

export const all = () => {
  const query = `SELECT * FROM Notes`;
  return db.all(query);
};

export const update = (id, content) => {
  db.run(`
    UPDATE Notes
      SET content = @content
    WHERE id = @id
  `, { id, content });
};

export const add = (data) => {
  const result = db.run(`
    INSERT INTO Notes (content)
      VALUES (@content)
  `, data);

  return result.lastInsertRowid;
};

export const remove = (id) => {
  db.run(`
    DELETE FROM Notes
      WHERE id = @id
  `, { id });
};

export const find = (q) => {
  return db.all(`
    SELECT * FROM NotesSearch
      WHERE content MATCH @q
  `, { q });
};