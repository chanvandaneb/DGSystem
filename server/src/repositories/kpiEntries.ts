import db from '../db.js'
import { kpiEntries as seedEntries, type KpiEntry } from '../data/kpi.js'

const count = (db.prepare('SELECT COUNT(*) as count FROM kpi_entries').get() as { count: number }).count
if (count === 0) {
  const insert = db.prepare(
    'INSERT INTO kpi_entries (id, date, reporter, reporterPoint, reportee, reporteePoint, title, status) VALUES (@id, @date, @reporter, @reporterPoint, @reportee, @reporteePoint, @title, @status)',
  )
  const insertMany = db.transaction((rows: KpiEntry[]) => rows.forEach((r) => insert.run(r)))
  insertMany(seedEntries)
}

export function listKpiEntries(): KpiEntry[] {
  return db.prepare('SELECT * FROM kpi_entries ORDER BY date DESC').all() as KpiEntry[]
}

export function setKpiEntryStatus(id: string, status: KpiEntry['status']): KpiEntry | undefined {
  const existing = db.prepare('SELECT * FROM kpi_entries WHERE id = ?').get(id) as KpiEntry | undefined
  if (!existing) return undefined
  db.prepare('UPDATE kpi_entries SET status = ? WHERE id = ?').run(status, id)
  return { ...existing, status }
}
