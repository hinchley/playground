import * as db from './db.js';

export const one = (id) => {
  const query = `SELECT * FROM Notes WHERE id = @id`;
  return db.one(query, { id });
};

export const all = () => {
  const query = `SELECT * FROM Notes`;
  return db.all(query);
};

export const update = (id, data) => {
  db.run(`
    UPDATE Notes
      SET content = @content
    WHERE id = @id
  `, { id, ...data });
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