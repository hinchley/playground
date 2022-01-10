import Database from 'better-sqlite3';
import { readFileSync } from 'fs';

const db = new Database('./data/db.sqlite', { fileMustExist: true });
const data = readFileSync('./init/seed.sql', { encoding: 'utf-8' });

db.exec(data);