import db from '../db.js'

export interface User {
  id: string
  username: string
  passwordHash: string
  name: string
  role: 'admin' | 'employee'
}

export function findUserByUsername(username: string): User | undefined {
  return db.prepare('SELECT * FROM users WHERE username = ?').get(username) as User | undefined
}

export function findUserById(id: string): User | undefined {
  return db.prepare('SELECT * FROM users WHERE id = ?').get(id) as User | undefined
}
