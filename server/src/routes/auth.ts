import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { findUserByUsername, findUserById } from '../repositories/users.js'
import { JWT_SECRET } from '../auth.js'

export const authRouter = Router()

authRouter.post('/login', (req, res) => {
  const { username, password } = req.body as { username?: string; password?: string }
  if (!username || !password) {
    res.status(400).json({ error: 'Username and password are required' })
    return
  }

  const user = findUserByUsername(username)
  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    res.status(401).json({ error: 'Invalid username or password' })
    return
  }

  const token = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: '7d' })
  res.json({ token, user: { id: user.id, username: user.username, name: user.name } })
})

authRouter.get('/me', (req, res) => {
  const header = req.headers.authorization
  const token = header?.startsWith('Bearer ') ? header.slice(7) : undefined
  if (!token) {
    res.status(401).json({ error: 'Not authenticated' })
    return
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { sub: string }
    const user = findUserById(payload.sub)
    if (!user) {
      res.status(401).json({ error: 'Not authenticated' })
      return
    }
    res.json({ id: user.id, username: user.username, name: user.name })
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' })
  }
})
