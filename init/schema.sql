PRAGMA foreign_keys = ON;
PRAGMA synchronous = OFF;

-- Main tables.

CREATE TABLE IF NOT EXISTS Notes (
  id INTEGER PRIMARY KEY,
  created INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
  updated INTEGER,
  content TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Tags (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS NotesTags (
  note INTEGER,
  tag INTEGER,
  FOREIGN KEY (note) REFERENCES Notes (id)
    ON DELETE CASCADE,
  FOREIGN KEY (tag) REFERENCES Tags (id)
    ON DELETE CASCADE,
  UNIQUE (note, tag)
);

-- Full text search virtual table.

CREATE VIRTUAL TABLE IF NOT EXISTS NotesSearch
  USING FTS5 (content, content = Notes);

-- Trigger for update timestamp.

CREATE TRIGGER IF NOT EXISTS NotesUpdated
  AFTER UPDATE OF content ON Notes
    FOR EACH ROW
BEGIN
  UPDATE Notes SET updated = (strftime('%s', 'now'))
    WHERE id = OLD.id;
END;

-- Triggers for full text search.

CREATE TRIGGER IF NOT EXISTS NotesSearchInsert
  AFTER INSERT ON Notes
BEGIN
  INSERT INTO NotesSearch (rowid, content)
    VALUES (NEW.id, NEW.content);
END;

CREATE TRIGGER IF NOT EXISTS NotesSearchDelete
  AFTER DELETE ON Notes
BEGIN
  INSERT INTO NotesSearch (NotesSearch, rowid, content)
    VALUES ('delete', OLD.id, OLD.content);
END;

CREATE TRIGGER IF NOT EXISTS NotesSearchUpdate
  AFTER UPDATE ON Notes
BEGIN
  INSERT INTO NotesSearch (NotesSearch, rowid, content)
    VALUES ('delete', OLD.id, OLD.content);
  INSERT INTO NotesSearch (rowid, content)
    VALUES (NEW.id, NEW.content);
END;

-- Indexes.

CREATE INDEX IF NOT EXISTS NotesNameCreated ON Notes (created);
CREATE INDEX IF NOT EXISTS NotesNameUpdated ON Notes (updated);

CREATE UNIQUE INDEX IF NOT EXISTS TagsName ON Tags (name);

INSERT INTO Notes (content)
  SELECT 'This is content'
  WHERE NOT EXISTS (SELECT * FROM Notes);