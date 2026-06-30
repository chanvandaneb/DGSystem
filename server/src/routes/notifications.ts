import { Router } from 'express'
import { listNotifications, markNotificationRead, markAllNotificationsRead } from '../repositories/notifications.js'

export const notificationsRouter = Router()

notificationsRouter.get('/', (_req, res) => {
  res.json(listNotifications())
})

notificationsRouter.put('/:id/read', (req, res) => {
  const read = req.body?.read ?? true
  const updated = markNotificationRead(req.params.id, read)
  if (!updated) {
    res.status(404).json({ error: 'Notification not found' })
    return
  }
  res.json(updated)
})

notificationsRouter.post('/mark-all-read', (_req, res) => {
  markAllNotificationsRead()
  res.json({ ok: true })
})
