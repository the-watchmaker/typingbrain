import Database from 'better-sqlite3';
import path from 'path';
import { app } from 'electron';
import initSql from './init-sql';

const createDb = () => {
  const dbPath = path.join(app.getPath('userData'), 'db.sqlite3');
  const database = new Database(dbPath, {});
  database.pragma('journal_mode = WAL');

  // init Database
  database.exec(initSql);

  return database;
};

export default createDb();
