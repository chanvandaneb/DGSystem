import db from '../db.js'
import { accounts as seedAccounts, type Account } from '../data/accounts.js'

const count = (db.prepare('SELECT COUNT(*) as count FROM accounts').get() as { count: number }).count
if (count === 0) {
  const insert = db.prepare(
    `INSERT INTO accounts (id, name, link, email, username, password, pin, expired, notes, category, viewable, team, author)
     VALUES (@id, @name, @link, @email, @username, @password, @pin, @expired, @notes, @category, @viewable, @team, @author)`,
  )
  const insertMany = db.transaction((rows: Account[]) => rows.forEach((r) => insert.run(r)))
  insertMany(seedAccounts)
}

export function listAccounts(): Account[] {
  return db.prepare('SELECT * FROM accounts ORDER BY rowid DESC').all() as Account[]
}

export function createAccount(input: Partial<Account>): Account {
  const account: Account = {
    id: String(Date.now()),
    name: input.name ?? '',
    link: input.link ?? '',
    email: input.email ?? '',
    username: input.username ?? '',
    password: input.password ?? '',
    pin: input.pin ?? '',
    expired: input.expired ?? '',
    notes: input.notes ?? '',
    category: input.category ?? '',
    viewable: input.viewable ?? '',
    team: input.team ?? '',
    author: input.author ?? '',
  }
  db.prepare(
    `INSERT INTO accounts (id, name, link, email, username, password, pin, expired, notes, category, viewable, team, author)
     VALUES (@id, @name, @link, @email, @username, @password, @pin, @expired, @notes, @category, @viewable, @team, @author)`,
  ).run(account)
  return account
}

export function updateAccount(id: string, input: Partial<Account>): Account | undefined {
  const existing = db.prepare('SELECT * FROM accounts WHERE id = ?').get(id) as Account | undefined
  if (!existing) return undefined
  const updated: Account = { ...existing, ...input, id }
  db.prepare(
    `UPDATE accounts SET name=@name, link=@link, email=@email, username=@username, password=@password, pin=@pin,
     expired=@expired, notes=@notes, category=@category, viewable=@viewable, team=@team, author=@author WHERE id=@id`,
  ).run(updated)
  return updated
}

export function deleteAccount(id: string): boolean {
  return db.prepare('DELETE FROM accounts WHERE id = ?').run(id).changes > 0
}

export function deleteAccounts(ids: string[]): number {
  const del = db.prepare('DELETE FROM accounts WHERE id = ?')
  const delMany = db.transaction((list: string[]) => list.reduce((n, id) => n + del.run(id).changes, 0))
  return delMany(ids)
}
