import { Router } from 'express'
import { attendanceDevices } from '../data/attendance.js'
import {
  listAttendanceRecords,
  listAttendanceBreaks,
  getTodayState,
  checkIn,
  checkOut,
  breakIn,
  breakOut,
} from '../repositories/attendance.js'

export const attendanceRouter = Router()

const TIME_ZONE = 'Asia/Phnom_Penh'

function nowParts(): { date: string; time: string } {
  const now = new Date()
  const date = now.toLocaleDateString('en-CA', { timeZone: TIME_ZONE })
  const time = now.toLocaleTimeString('en-GB', { timeZone: TIME_ZONE, hour12: false })
  return { date, time }
}

attendanceRouter.get('/', (_req, res) => {
  res.json(listAttendanceRecords())
})

attendanceRouter.get('/devices', (_req, res) => {
  res.json(attendanceDevices)
})

attendanceRouter.get('/breaks', (_req, res) => {
  res.json(listAttendanceBreaks())
})

attendanceRouter.get('/today', (req, res) => {
  const { date } = nowParts()
  res.json(getTodayState(req.userId!, date))
})

attendanceRouter.post('/check-in', (req, res) => {
  const { date, time } = nowParts()
  res.json(checkIn(req.userId!, date, time))
})

attendanceRouter.post('/check-out', (req, res) => {
  const { date, time } = nowParts()
  res.json(checkOut(req.userId!, date, time))
})

attendanceRouter.post('/break-in', (req, res) => {
  const { date, time } = nowParts()
  const type = typeof req.body?.type === 'string' ? req.body.type : 'other'
  const reason = typeof req.body?.reason === 'string' ? req.body.reason : ''
  res.json(breakIn(req.userId!, date, time, type, reason))
})

attendanceRouter.post('/break-out', (req, res) => {
  const { date, time } = nowParts()
  res.json(breakOut(req.userId!, date, time))
})

attendanceRouter.get('/report', (_req, res) => {
  const records = listAttendanceRecords()
  const totalHoursSec = records.reduce((sum, r) => sum + parseDuration(r.workingHours), 0)
  const totalBreaksSec = records.reduce((sum, r) => sum + parseDuration(r.breakDuration), 0)
  const totalBreakCount = records.reduce((sum, r) => sum + r.breaks, 0)

  res.json([
    {
      department: 'VNMarket',
      eid: 'KH0120',
      name: 'CONNOR',
      breakCount: totalBreakCount,
      totalHours: formatDuration(totalHoursSec),
      totalBreaks: formatDuration(totalBreaksSec),
      totalWorks: formatDuration(totalHoursSec - totalBreaksSec),
    },
  ])
})

function parseDuration(s: string): number {
  const match = s.match(/(-?\d+) hr (-?\d+) min (-?\d+) sec/)
  if (!match) return 0
  const [, h, m, sec] = match
  return Number(h) * 3600 + Number(m) * 60 + Number(sec)
}

function formatDuration(totalSec: number): string {
  const sign = totalSec < 0 ? -1 : 1
  const abs = Math.abs(totalSec)
  const h = Math.floor(abs / 3600)
  const m = Math.floor((abs % 3600) / 60)
  const s = Math.floor(abs % 60)
  return `${sign * h} hr ${m} min ${s} sec`
}
