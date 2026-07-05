import { Router } from 'express'
import { listAnnouncements, createAnnouncement, deleteAnnouncement, setAnnouncementPinned } from '../repositories/announcements.js'
import { requireRole } from '../auth.js'
import { findUserById } from '../repositories/users.js'
import type { AnnouncementType } from '../data/announcements.js'

const VALID_TYPES: AnnouncementType[] = ['holiday', 'kpi', 'general', 'urgent']

export const announcementsRouter = Router()

announcementsRouter.get('/', (_req, res) => {
  res.json(listAnnouncements())
})

announcementsRouter.post('/', requireRole('admin'), (req, res) => {
  const { title, body, type, pinned } = req.body ?? {}
  if (typeof title !== 'string' || !title.trim()) {
    res.status(400).json({ error: 'Title is required' })
    return
  }
  if (!VALID_TYPES.includes(type)) {
    res.status(400).json({ error: 'Invalid type' })
    return
  }
  const user = req.userId ? findUserById(req.userId) : undefined
  const created = createAnnouncement({
    title: title.trim(),
    body: typeof body === 'string' ? body.trim() : '',
    author: user?.name ?? 'System',
    type,
    pinned: !!pinned,
  })
  res.status(201).json(created)
})

announcementsRouter.put('/:id/pin', requireRole('admin'), (req, res) => {
  const updated = setAnnouncementPinned(req.params.id, !!req.body?.pinned)
  if (!updated) {
    res.status(404).json({ error: 'Announcement not found' })
    return
  }
  res.json(updated)
})

announcementsRouter.delete('/:id', requireRole('admin'), (req, res) => {
  if (!deleteAnnouncement(req.params.id)) {
    res.status(404).json({ error: 'Announcement not found' })
    return
  }
  res.status(204).end()
})
