import { Router } from 'express'
import { attendanceRecords, attendanceDevices, attendanceBreaks } from '../data/attendance.js'

export const attendanceRouter = Router()

attendanceRouter.get('/', (_req, res) => {
  res.json(attendanceRecords)
})

attendanceRouter.get('/devices', (_req, res) => {
  res.json(attendanceDevices)
})

attendanceRouter.get('/breaks', (_req, res) => {
  res.json(attendanceBreaks)
})

attendanceRouter.get('/report', (_req, res) => {
  const totalHoursSec = attendanceRecords.reduce((sum, r) => sum + parseDuration(r.workingHours), 0)
  const totalBreaksSec = attendanceRecords.reduce((sum, r) => sum + parseDuration(r.breakDuration), 0)
  const totalBreakCount = attendanceRecords.reduce((sum, r) => sum + r.breaks, 0)

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
