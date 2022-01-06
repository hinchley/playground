import * as db from './db.js';

export const one = (id) => {
  const query = `SELECT * FROM Tags WHERE id = @id`;
  return db.one(query, { id });
};

export const all = () => {
  const query = `SELECT * FROM Tags`;
  return db.all(query);
};

export const update = (id, data) => {
  db.run(`
    UPDATE Tags
      SET name = @name
    WHERE id = @id
  `, { id, ...data });
};

export const add = (data) => {
  const result = db.run(`
    INSERT INTO Tags (name)
      VALUES (@name)
  `, data);

  return result.lastInsertRowid;
};

export const remove = (id) => {
  db.run(`
    DELETE FROM Tags
      WHERE id = @id
  `, { id });
};

export const assign = (id, tagList = '') => {
  const tags = tagList.split(',').map(x => x.trim());

  db.run(`
    DELETE FROM NotesTags
      WHERE note = @id
    `, { id }
  );

  const mask = Array(tags.length).fill('?').join();

  const tagIds = db.all(`
    SELECT id FROM Tags
      WHERE name IN (${mask})
    `, tags);

  tagIds.forEach(t => {
    db.run(`
      INSERT into NotesTags (note, tag)
        VALUES (@note, @tag)
      `, { note: id, tag: t.id }
    );
  });
};