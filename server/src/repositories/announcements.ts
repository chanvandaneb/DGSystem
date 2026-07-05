import { randomUUID } from 'node:crypto'
import db from '../db.js'
import { announcements as seedAnnouncements, type Announcement, type AnnouncementType } from '../data/announcements.js'

const count = (db.prepare('SELECT COUNT(*) as count FROM announcements').get() as { count: number }).count
if (count === 0) {
  const insert = db.prepare(
    'INSERT INTO announcements (id, title, body, author, date, type, pinned) VALUES (@id, @title, @body, @author, @date, @type, @pinned)',
  )
  const insertMany = db.transaction((rows: Announcement[]) =>
    rows.forEach((r) => insert.run({ ...r, pinned: r.pinned ? 1 : 0 })),
  )
  insertMany(seedAnnouncements)
}

function mapRow(row: any): Announcement {
  return { ...row, pinned: !!row.pinned }
}

export function listAnnouncements(): Announcement[] {
  const rows = (db.prepare('SELECT * FROM announcements').all() as any[]).map(mapRow)
  return rows.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) || b.date.localeCompare(a.date))
}

export interface CreateAnnouncementInput {
  title: string
  body: string
  author: string
  type: AnnouncementType
  pinned: boolean
}

export function createAnnouncement(input: CreateAnnouncementInput): Announcement {
  const announcement: Announcement = {
    id: randomUUID(),
    title: input.title,
    body: input.body,
    author: input.author,
    date: new Date().toISOString().slice(0, 10),
    type: input.type,
    pinned: input.pinned,
  }
  db.prepare('INSERT INTO announcements (id, title, body, author, date, type, pinned) VALUES (?, ?, ?, ?, ?, ?, ?)').run(
    announcement.id,
    announcement.title,
    announcement.body,
    announcement.author,
    announcement.date,
    announcement.type,
    announcement.pinned ? 1 : 0,
  )
  return announcement
}

export function deleteAnnouncement(id: string): boolean {
  return db.prepare('DELETE FROM announcements WHERE id = ?').run(id).changes > 0
}

export function setAnnouncementPinned(id: string, pinned: boolean): Announcement | undefined {
  const existing = db.prepare('SELECT * FROM announcements WHERE id = ?').get(id) as any
  if (!existing) return undefined
  db.prepare('UPDATE announcements SET pinned = ? WHERE id = ?').run(pinned ? 1 : 0, id)
  return mapRow({ ...existing, pinned: pinned ? 1 : 0 })
}
