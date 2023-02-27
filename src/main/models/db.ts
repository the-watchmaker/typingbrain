import Database from 'better-sqlite3';
import path from 'path';
import { App } from 'electron';
import fs from 'fs';

const initSql = fs.readFileSync(path.join(__dirname, 'init.sql'), 'utf8');

const createDb = (app: App) => {
  const dbPath = path.join(app.getPath('userData'), 'db.sqlite3');

  const database = new Database(dbPath, {});

  database.pragma('journal_mode = WAL');

  database.exec(initSql);

  return database;
};

export default createDb;
