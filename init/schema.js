import Database from 'better-sqlite3';
import { readFileSync } from 'fs';

const db = new Database('./data/db.sqlite');
const schema = readFileSync('./init/schema.sql', { encoding: 'utf-8' });

db.exec(schema);