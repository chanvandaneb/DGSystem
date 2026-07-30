import { Router } from 'express'
import { listAnnouncements } from '../repositories/announcements.js'
import { employeeStatuses, recentEarnings } from '../data/employees.js'
import { listAttendanceRecords, listAttendanceBreaks } from '../repositories/attendance.js'
import { listTasks } from '../repositories/tasks.js'
import { listKpiEntries } from '../repositories/kpiEntries.js'

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
  const doneCount = tasks.filter((t) => t.progress === 'Done').length

  const sortedRecords = [...listAttendanceRecords()].sort((a, b) => a.date.localeCompare(b.date))
  const lateCount = sortedRecords.filter((r) => checkInMinutes(r.checkIn) > SHIFT_START_MINUTES).length
  const completed = sortedRecords.filter((r) => r.checkOut)
  const totalHours = completed.reduce((sum, r) => sum + workedHours(r.workingHours), 0)
  const avgHours = completed.length ? totalHours / completed.length : 0

  const attendanceTrend = sortedRecords.slice(-10).map((r) => ({
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

  // Build recent activity feed from tasks + kpi + announcements
  const kpiEntries = listKpiEntries()
  const announcements = listAnnouncements()

  const taskActivities = tasks.slice(0, 8).map((t) => ({
    id: `task-${t.id}`,
    type: 'task' as const,
    title: t.subject,
    meta: `${t.progress} · ${t.priority}`,
    date: t.start || new Date().toISOString().slice(0, 10),
    badge: t.progress,
    badgeColor: t.progress === 'Done' ? 'green' : t.progress === 'Doing' ? 'blue' : 'gray',
  }))

  const kpiActivities = kpiEntries.slice(0, 5).map((k) => ({
    id: `kpi-${k.id}`,
    type: 'kpi' as const,
    title: k.title,
    meta: `${k.reporter} → ${k.reportee}`,
    date: k.date,
    badge: k.status,
    badgeColor: k.status === 'Approved' ? 'green' : k.status === 'Rejected' ? 'red' : 'yellow',
  }))

  const announcementActivities = announcements.slice(0, 4).map((a) => ({
    id: `ann-${a.id}`,
    type: 'announcement' as const,
    title: a.title,
    meta: `By ${a.author}`,
    date: a.date,
    badge: a.type,
    badgeColor: 'blue',
  }))

  const recentActivity = [...taskActivities, ...kpiActivities, ...announcementActivities]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 12)

  // KPI leaderboard - compute scores per person from kpi entries
  const scoreMap: Record<string, { name: string; approved: number; total: number; points: number }> = {}
  for (const entry of kpiEntries) {
    if (!scoreMap[entry.reportee]) scoreMap[entry.reportee] = { name: entry.reportee, approved: 0, total: 0, points: 0 }
    scoreMap[entry.reportee].total++
    if (entry.status === 'Approved') {
      scoreMap[entry.reportee].approved++
      scoreMap[entry.reportee].points += entry.reporteePoint
    }
  }
  const leaderboard = Object.values(scoreMap).sort((a, b) => b.points - a.points).slice(0, 5)

  res.json({
    kpis: [
      { label: 'Monthly Tasks', value: String(tasks.length), accent: 'blue', sub: `Todo: ${todoCount} · Doing: ${doingCount} · Done: ${doneCount}`, delta: doingCount ? `${doingCount} active` : 'All clear', sparkline: [todoCount, doingCount, doneCount, tasks.length] },
      { label: 'Avg Working Hours', value: `${avgHours.toFixed(1)} h`, accent: 'green', sub: `${completed.length} completed days`, delta: `${lateCount} late`, sparkline: attendanceTrend.slice(-5).map(t => t.hours) },
    ],
    taskBreakdown: { todo: todoCount, doing: doingCount, done: doneCount, total: tasks.length },
    attendanceTrend,
    presence,
    userStatuses: employeeStatuses,
    recentBreaks: listAttendanceBreaks().slice(0, 5),
    recentAnnouncements: announcements.slice(0, 4),
    recentEarnings,
    recentActivity,
    leaderboard,
  })
})
