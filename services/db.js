import Database from 'better-sqlite3';

const db = new Database('./data/db.sqlite', { fileMustExist: true });

export const run = (sql, params = []) => db.prepare(sql).run(params);
export const one = (sql, params = []) => db.prepare(sql).get(params);
export const all = (sql, params = []) => db.prepare(sql).all(params);
