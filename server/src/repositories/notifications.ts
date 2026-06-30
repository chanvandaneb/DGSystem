import db from '../db.js'
import { notifications as seedNotifications, type Notification } from '../data/notifications.js'

const count = (db.prepare('SELECT COUNT(*) as count FROM notifications').get() as { count: number }).count
if (count === 0) {
  const insert = db.prepare('INSERT INTO notifications (id, title, body, time, read, type) VALUES (@id, @title, @body, @time, @read, @type)')
  const insertMany = db.transaction((rows: Notification[]) =>
    rows.forEach((r) => insert.run({ ...r, read: r.read ? 1 : 0 })),
  )
  insertMany(seedNotifications)
}

function mapRow(row: any): Notification {
  return { ...row, read: !!row.read }
}

export function listNotifications(): Notification[] {
  return (db.prepare('SELECT * FROM notifications ORDER BY rowid DESC').all() as any[]).map(mapRow)
}

export function markNotificationRead(id: string, read: boolean): Notification | undefined {
  const existing = db.prepare('SELECT * FROM notifications WHERE id = ?').get(id) as any
  if (!existing) return undefined
  db.prepare('UPDATE notifications SET read = ? WHERE id = ?').run(read ? 1 : 0, id)
  return mapRow({ ...existing, read: read ? 1 : 0 })
}

export function markAllNotificationsRead(): void {
  db.prepare('UPDATE notifications SET read = 1').run()
}
