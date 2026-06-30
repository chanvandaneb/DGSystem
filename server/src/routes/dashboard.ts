import { Router } from 'express'
import { announcements } from '../data/announcements.js'
import { employeeStatuses, recentEarnings } from '../data/employees.js'
import { attendanceBreaks } from '../data/attendance.js'
import { listTasks } from '../repositories/tasks.js'

export const dashboardRouter = Router()

dashboardRouter.get('/summary', (_req, res) => {
  const tasks = listTasks()
  const todoCount = tasks.filter((t) => t.progress === 'Todo').length
  const doingCount = tasks.filter((t) => t.progress === 'Doing').length

  res.json({
    kpis: [
      { label: 'Monthly Tasks', value: String(tasks.length), accent: 'blue', sub: `Todo: ${todoCount}; Doing: ${doingCount}`, delta: '+ 0' },
      { label: 'Today Orders', value: '$5,74.12', accent: 'orange', sub: 'Compared to last week', delta: '+427' },
      { label: 'Today Orders', value: '$5,74.12', accent: 'green', sub: 'Compared to last week', delta: '+427' },
    ],
    userStatuses: employeeStatuses,
    recentBreaks: attendanceBreaks.slice(0, 5),
    recentAnnouncements: [...announcements]
      .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) || b.date.localeCompare(a.date))
      .slice(0, 3),
    recentEarnings,
  })
})
