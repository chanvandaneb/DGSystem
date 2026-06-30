import Database from 'better-sqlite3'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import bcrypt from 'bcryptjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const db = new Database(path.resolve(__dirname, '../data.sqlite'))
db.pragma('journal_mode = WAL')

db.exec(`
  CREATE TABLE IF NOT EXISTS accounts (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    link TEXT DEFAULT '',
    email TEXT DEFAULT '',
    username TEXT DEFAULT '',
    password TEXT DEFAULT '',
    pin TEXT DEFAULT '',
    expired TEXT DEFAULT '',
    notes TEXT DEFAULT '',
    category TEXT DEFAULT '',
    viewable TEXT DEFAULT '',
    team TEXT DEFAULT '',
    author TEXT DEFAULT ''
  );

  CREATE TABLE IF NOT EXISTS tasks (
    id TEXT PRIMARY KEY,
    subject TEXT NOT NULL,
    priority TEXT NOT NULL,
    category TEXT DEFAULT '',
    progress TEXT NOT NULL,
    start TEXT DEFAULT '',
    end TEXT DEFAULT '',
    viewable TEXT DEFAULT '',
    author TEXT DEFAULT '',
    assignee TEXT DEFAULT ''
  );

  CREATE TABLE IF NOT EXISTS kpi_rules (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT DEFAULT '',
    points INTEGER DEFAULT 0,
    description TEXT DEFAULT ''
  );

  CREATE TABLE IF NOT EXISTS bookmarks (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    categorySlug TEXT NOT NULL,
    category TEXT DEFAULT ''
  );

  CREATE TABLE IF NOT EXISTS notifications (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    body TEXT DEFAULT '',
    time TEXT DEFAULT '',
    read INTEGER DEFAULT 0,
    type TEXT DEFAULT 'system'
  );

  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    passwordHash TEXT NOT NULL,
    name TEXT NOT NULL
  );
`)

const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get() as { count: number }
if (userCount.count === 0) {
  db.prepare('INSERT INTO users (id, username, passwordHash, name) VALUES (?, ?, ?, ?)').run(
    '1',
    'chanvandaneb',
    bcrypt.hashSync('dgsystem123', 10),
    'Chan Vandanet',
  )
}

export default db
