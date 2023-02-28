import { IPractice } from 'main/models/models';
import { Database, Statement } from 'better-sqlite3';
import db from '../models/db';

interface ISearchOpts {
  limit: number;
}

class PracticeService {
  private db: Database | undefined;

  private dbCreate: Statement | undefined;

  private dbRead: Statement | undefined;

  private dbUpdate: Statement | undefined;

  private dbList: Statement | undefined;

  private dbDelete: Statement | undefined;

  constructor() {
    this.db = db;

    this.dbCreate = this.db.prepare(`INSERT INTO practice
    (title, author_id, "text", deleted, created_at, updated_at, tags, "language", meta_data, created_origin)
      VALUES(@title, @authorId, @text, @deleted, @createdAt, @updatedAt, @tags, @language, @metaData, @createdOrigin);`);

    this.dbRead = this.db.prepare(`SELECT * FROM practice WHERE id = ?;`);

    this.dbUpdate = this.db.prepare(
      `UPDATE practice SET title = @title, "text" = @text,
       updated_at = @updatedAt, tags = @tags, "language" = @language, meta_data = @metaData
       WHERE id = @id;`
    );

    this.dbList = this.db.prepare(
      `SELECT * FROM practice WHERE deleted <> 1 LIMIT @limit;`
    );

    this.dbDelete = this.db.prepare(`DELETE FROM practice WHERE id = (@id);`);
  }

  async listPractice(opts: ISearchOpts) {
    const practices = await this.dbList?.all(opts);
    return practices;
  }

  async readPractice(id: number) {
    const practice = await this.dbRead?.get(id);
    return practice;
  }

  async createPractice(practice: IPractice) {
    const newPractice = {
      // TODO make the fields explicit
      ...practice,
      createdOrigin: 'APP',
      metaData: JSON.stringify(practice.metaData),
      authorId: 0, // TODO add authorID
      deleted: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const practiceId = await this.dbCreate?.run(newPractice);

    return practiceId;
  }

  async updatePractice(practice: IPractice) {
    const newPractice = {
      // TODO make the fields explicit
      ...practice,
      updatedAt: new Date().toISOString(),
    };

    await this.dbUpdate?.run(newPractice);
    const updatePractice = await this.dbRead?.get(newPractice.id);

    return {
      ...updatePractice,
    };
  }

  async deletePractice(id: number) {
    const practiceId = await this.dbDelete?.run(id);

    return practiceId;
  }
}

export default PracticeService;
