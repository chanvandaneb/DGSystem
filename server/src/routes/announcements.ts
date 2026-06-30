import { Router } from 'express'
import { announcements } from '../data/announcements.js'

export const announcementsRouter = Router()

announcementsRouter.get('/', (_req, res) => {
  res.json(
    [...announcements].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) || b.date.localeCompare(a.date)),
  )
})
