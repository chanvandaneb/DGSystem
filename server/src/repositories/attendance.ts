import { randomUUID } from 'node:crypto'
import db from '../db.js'
import {
  attendanceRecords as seedRecords,
  attendanceBreaks as seedBreaks,
  type AttendanceRecord,
  type AttendanceBreak,
} from '../data/attendance.js'
import { findUserById } from './users.js'
import { getProfile } from './profile.js'

const DEPARTMENT = 'VNMarket'
const TZ_LABEL = ' (GMT+7)'

interface SessionRow {
  id: string
  userId: string
  department: string
  eid: string
  name: string
  date: string
  checkIn: string
  checkOut: string | null
}

interface BreakRow {
  id: string
  attendanceId: string
  date: string
  breakIn: string
  breakOut: string | null
  type: string
  reason: string
}

function timeToSeconds(t: string): number {
  const [h = 0, m = 0, s = 0] = t.split(':').map(Number)
  return h * 3600 + m * 60 + s
}

function formatDuration(totalSec: number): string {
  const sign = totalSec < 0 ? -1 : 1
  const abs = Math.abs(totalSec)
  const h = Math.floor(abs / 3600)
  const m = Math.floor((abs % 3600) / 60)
  const s = Math.floor(abs % 60)
  return `${sign * h} hr ${m} min ${s} sec`
}

function sessionBreaks(sessionId: string): BreakRow[] {
  return db.prepare('SELECT * FROM attendance_breaks WHERE attendanceId = ? ORDER BY breakIn').all(sessionId) as BreakRow[]
}

function breakSeconds(rows: BreakRow[]): number {
  return rows.reduce((sum, b) => {
    if (!b.breakOut) return sum
    return sum + Math.max(0, timeToSeconds(b.breakOut) - timeToSeconds(b.breakIn))
  }, 0)
}

function toRecord(row: SessionRow): AttendanceRecord {
  const rows = sessionBreaks(row.id)
  const breakSec = breakSeconds(rows)
  const workingSec = row.checkOut ? timeToSeconds(row.checkOut) - timeToSeconds(row.checkIn) : 0
  return {
    id: row.id,
    department: row.department || DEPARTMENT,
    eid: row.eid,
    name: row.name,
    date: row.date,
    checkIn: `${row.checkIn}${TZ_LABEL}`,
    checkOut: row.checkOut,
    breaks: rows.length,
    workingDuration: formatDuration(row.checkOut ? workingSec : 0),
    breakDuration: formatDuration(breakSec),
    workingHours: formatDuration(row.checkOut ? workingSec - breakSec : -breakSec),
  }
}

function toBreak(row: BreakRow, session: SessionRow): AttendanceBreak {
  return {
    id: row.id,
    date: row.date,
    department: session.department || DEPARTMENT,
    eid: session.eid,
    name: session.name,
    checkIn: `${session.checkIn}${TZ_LABEL}`,
    breakIn: row.breakIn,
    breakOut: row.breakOut ?? '-',
    checkOut: session.checkOut,
    durationBreak: row.breakOut ? formatDuration(timeToSeconds(row.breakOut) - timeToSeconds(row.breakIn)) : '-',
    type: row.type as AttendanceBreak['type'],
    reason: row.reason,
    notes: '',
  }
}

export function listAttendanceRecords(): AttendanceRecord[] {
  const rows = db.prepare('SELECT * FROM attendance ORDER BY date DESC, checkIn DESC').all() as SessionRow[]
  return [...rows.map(toRecord), ...seedRecords]
}

export function listAttendanceBreaks(): AttendanceBreak[] {
  const rows = db
    .prepare(
      'SELECT b.*, a.department as s_department, a.eid as s_eid, a.name as s_name, a.checkIn as s_checkIn, a.checkOut as s_checkOut FROM attendance_breaks b JOIN attendance a ON a.id = b.attendanceId ORDER BY b.date DESC, b.breakIn DESC',
    )
    .all() as (BreakRow & { s_department: string; s_eid: string; s_name: string; s_checkIn: string; s_checkOut: string | null })[]
  const mapped = rows.map((r) =>
    toBreak(r, {
      id: r.attendanceId,
      userId: '',
      department: r.s_department,
      eid: r.s_eid,
      name: r.s_name,
      date: r.date,
      checkIn: r.s_checkIn,
      checkOut: r.s_checkOut,
    }),
  )
  return [...mapped, ...seedBreaks]
}

export interface TodayState {
  session: { id: string; date: string; checkIn: string; checkOut: string | null } | null
  activeBreak: { id: string; breakIn: string; type: string } | null
}

export function getTodayState(userId: string, date: string): TodayState {
  const session = db
    .prepare('SELECT * FROM attendance WHERE userId = ? AND date = ? ORDER BY checkIn DESC LIMIT 1')
    .get(userId, date) as SessionRow | undefined
  if (!session) return { session: null, activeBreak: null }
  const activeBreak = db
    .prepare('SELECT * FROM attendance_breaks WHERE attendanceId = ? AND breakOut IS NULL LIMIT 1')
    .get(session.id) as BreakRow | undefined
  return {
    session: { id: session.id, date: session.date, checkIn: session.checkIn, checkOut: session.checkOut },
    activeBreak: activeBreak ? { id: activeBreak.id, breakIn: activeBreak.breakIn, type: activeBreak.type } : null,
  }
}

export function checkIn(userId: string, date: string, time: string): TodayState {
  const existing = getTodayState(userId, date)
  if (existing.session && !existing.session.checkOut) return existing
  const user = findUserById(userId)
  const profile = getProfile(userId)
  const id = randomUUID()
  db.prepare('INSERT INTO attendance (id, userId, department, eid, name, date, checkIn) VALUES (?, ?, ?, ?, ?, ?, ?)').run(
    id,
    userId,
    DEPARTMENT,
    profile.eid ?? '',
    (user?.name ?? '').toUpperCase(),
    date,
    time,
  )
  return getTodayState(userId, date)
}

export function checkOut(userId: string, date: string, time: string): TodayState {
  const state = getTodayState(userId, date)
  if (!state.session || state.session.checkOut) return state
  if (state.activeBreak) {
    db.prepare('UPDATE attendance_breaks SET breakOut = ? WHERE id = ?').run(time, state.activeBreak.id)
  }
  db.prepare('UPDATE attendance SET checkOut = ? WHERE id = ?').run(time, state.session.id)
  return getTodayState(userId, date)
}

export function breakIn(userId: string, date: string, time: string, type: string, reason = ''): TodayState {
  const state = getTodayState(userId, date)
  if (!state.session || state.session.checkOut || state.activeBreak) return state
  db.prepare('INSERT INTO attendance_breaks (id, attendanceId, date, breakIn, type, reason) VALUES (?, ?, ?, ?, ?, ?)').run(
    randomUUID(),
    state.session.id,
    date,
    time,
    type,
    reason,
  )
  return getTodayState(userId, date)
}

export function breakOut(userId: string, date: string, time: string): TodayState {
  const state = getTodayState(userId, date)
  if (!state.activeBreak) return state
  db.prepare('UPDATE attendance_breaks SET breakOut = ? WHERE id = ?').run(time, state.activeBreak.id)
  return getTodayState(userId, date)
}
