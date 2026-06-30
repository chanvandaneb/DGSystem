import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { findUserById } from './repositories/users.js'

export const JWT_SECRET = process.env.JWT_SECRET ?? 'dgsystem-dev-secret-change-me'

declare module 'express-serve-static-core' {
  interface Request {
    userId?: string
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization
  const token = header?.startsWith('Bearer ') ? header.slice(7) : undefined
  if (!token) {
    res.status(401).json({ error: 'Not authenticated' })
    return
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { sub: string }
    req.userId = payload.sub
    next()
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' })
  }
}

export function requireRole(...roles: Array<'admin' | 'employee'>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.userId ? findUserById(req.userId) : undefined
    if (!user || !roles.includes(user.role)) {
      res.status(403).json({ error: 'Insufficient permissions' })
      return
    }
    next()
  }
}
