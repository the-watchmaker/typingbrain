export default `CREATE TABLE IF NOT EXISTS practice (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	title TEXT(256),
	author_id INTEGER,
	"text" TEXT,
	created_at TEXT(32),
	deleted_at TEXT(32),
	folder_id INTEGER,
	created_origin TEXT(3),
	deleted INTEGER,
	updated_at TEXT(32),
	tags TEXT,
	"language" TEXT(16),
	meta_data TEXT
);

CREATE INDEX IF NOT EXISTS practice_id_IDX ON practice (id);`;
