import { Router } from 'express'
import { announcements } from '../data/announcements.js'
import { employeeStatuses, recentEarnings } from '../data/employees.js'
import { attendanceBreaks, attendanceRecords } from '../data/attendance.js'
import { listTasks } from '../repositories/tasks.js'

export const dashboardRouter = Router()

const SHIFT_START_MINUTES = 8 * 60

function checkInMinutes(checkIn: string): number {
  const [h = 0, m = 0] = checkIn.split(':').map((v) => parseInt(v, 10))
  return h * 60 + m
}

function workedHours(workingHours: string): number {
  const match = workingHours.match(/(-?\d+)\s*hr\s*(-?\d+)\s*min/)
  if (!match) return 0
  const hours = parseInt(match[1], 10) + parseInt(match[2], 10) / 60
  return hours > 0 ? Math.round(hours * 10) / 10 : 0
}

dashboardRouter.get('/summary', (_req, res) => {
  const tasks = listTasks()
  const todoCount = tasks.filter((t) => t.progress === 'Todo').length
  const doingCount = tasks.filter((t) => t.progress === 'Doing').length

  const sortedRecords = [...attendanceRecords].sort((a, b) => a.date.localeCompare(b.date))
  const lateCount = sortedRecords.filter((r) => checkInMinutes(r.checkIn) > SHIFT_START_MINUTES).length
  const completed = sortedRecords.filter((r) => r.checkOut)
  const totalHours = completed.reduce((sum, r) => sum + workedHours(r.workingHours), 0)
  const avgHours = completed.length ? totalHours / completed.length : 0

  const attendanceTrend = sortedRecords.slice(-7).map((r) => ({
    date: r.date,
    hours: workedHours(r.workingHours),
    late: checkInMinutes(r.checkIn) > SHIFT_START_MINUTES,
  }))

  const presence = {
    online: employeeStatuses.filter((u) => u.status === 'Online').length,
    idle: employeeStatuses.filter((u) => u.status === 'Idle').length,
    offline: employeeStatuses.filter((u) => u.status === 'Offline').length,
  }

  const totalEarnings = recentEarnings.reduce((sum, e) => sum + e.earnings, 0)
  const lastDelta = recentEarnings[recentEarnings.length - 1]?.delta ?? 0

  res.json({
    kpis: [
      { label: 'Monthly Tasks', value: String(tasks.length), accent: 'blue', sub: `Todo: ${todoCount} · Doing: ${doingCount}`, delta: doingCount ? `${doingCount} active` : 'All clear' },
      { label: 'Avg Working Hours', value: `${avgHours.toFixed(1)} h`, accent: 'green', sub: `${completed.length} completed days`, delta: `${lateCount} late` },
      { label: 'Total Earnings', value: `$${totalEarnings.toFixed(2)}`, accent: 'orange', sub: 'Last 5 periods', delta: `${lastDelta >= 0 ? '+' : ''}$${lastDelta.toFixed(2)}` },
    ],
    attendanceTrend,
    presence,
    userStatuses: employeeStatuses,
    recentBreaks: attendanceBreaks.slice(0, 5),
    recentAnnouncements: [...announcements]
      .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) || b.date.localeCompare(a.date))
      .slice(0, 3),
    recentEarnings,
  })
})
