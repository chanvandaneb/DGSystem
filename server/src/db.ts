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

  CREATE TABLE IF NOT EXISTS attendance (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    department TEXT DEFAULT '',
    eid TEXT DEFAULT '',
    name TEXT DEFAULT '',
    date TEXT NOT NULL,
    checkIn TEXT NOT NULL,
    checkOut TEXT
  );

  CREATE TABLE IF NOT EXISTS attendance_breaks (
    id TEXT PRIMARY KEY,
    attendanceId TEXT NOT NULL,
    date TEXT NOT NULL,
    breakIn TEXT NOT NULL,
    breakOut TEXT,
    type TEXT DEFAULT 'other',
    reason TEXT DEFAULT ''
  );

  CREATE TABLE IF NOT EXISTS announcements (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    body TEXT DEFAULT '',
    author TEXT DEFAULT '',
    date TEXT NOT NULL,
    type TEXT DEFAULT 'general',
    pinned INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS kpi_entries (
    id TEXT PRIMARY KEY,
    date TEXT NOT NULL,
    reporter TEXT DEFAULT '',
    reporterPoint INTEGER DEFAULT 0,
    reportee TEXT DEFAULT '',
    reporteePoint INTEGER DEFAULT 0,
    title TEXT DEFAULT '',
    status TEXT DEFAULT 'Pending'
  );

  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    passwordHash TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'employee'
  );

  CREATE TABLE IF NOT EXISTS profiles (
    userId TEXT PRIMARY KEY,
    avatar TEXT DEFAULT '',
    eid TEXT DEFAULT '',
    fullname TEXT DEFAULT '',
    birthday TEXT DEFAULT '',
    gender TEXT DEFAULT '',
    nationality TEXT DEFAULT '',
    passportExpiry TEXT DEFAULT '',
    visaExpiry TEXT DEFAULT '',
    personalEmail TEXT DEFAULT '',
    personalPhone TEXT DEFAULT '',
    telegram TEXT DEFAULT '',
    messenger TEXT DEFAULT '',
    workingPhone TEXT DEFAULT '',
    homeAddress TEXT DEFAULT '',
    abroadAddress TEXT DEFAULT '',
    status TEXT DEFAULT '',
    interviewDate TEXT DEFAULT '',
    contractDate TEXT DEFAULT '',
    onboardDate TEXT DEFAULT '',
    regularDate TEXT DEFAULT '',
    resignedDate TEXT DEFAULT '',
    notes TEXT DEFAULT ''
  );
`)

const userColumns = db.prepare('PRAGMA table_info(users)').all() as { name: string }[]
if (!userColumns.some((c) => c.name === 'role')) {
  db.exec(`ALTER TABLE users ADD COLUMN role TEXT NOT NULL DEFAULT 'employee'`)
}

const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get() as { count: number }
if (userCount.count === 0) {
  db.prepare('INSERT INTO users (id, username, passwordHash, name, role) VALUES (?, ?, ?, ?, ?)').run(
    '1',
    'user',
    bcrypt.hashSync('123456', 10),
    'Chan Vandanet',
    'employee',
  )
}

export default db
