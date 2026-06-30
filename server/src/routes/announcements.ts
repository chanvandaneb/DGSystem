import { Router } from 'express'
import { announcements } from '../data/announcements.js'

export const announcementsRouter = Router()

announcementsRouter.get('/', (_req, res) => {
  res.json(announcements)
})
