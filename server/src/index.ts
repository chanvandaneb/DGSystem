import express from 'express'
import cors from 'cors'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { dashboardRouter } from './routes/dashboard.js'
import { attendanceRouter } from './routes/attendance.js'
import { kpiRouter } from './routes/kpi.js'
import { tasksRouter } from './routes/tasks.js'
import { accountsRouter } from './routes/accounts.js'
import { knowledgeRouter } from './routes/knowledge.js'
import { bookmarksRouter } from './routes/bookmarks.js'
import { announcementsRouter } from './routes/announcements.js'
import { profileRouter } from './routes/profile.js'
import { notificationsRouter } from './routes/notifications.js'
import { authRouter } from './routes/auth.js'
import { requireAuth } from './auth.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()
const PORT = process.env.SERVER_PORT ?? 4000

app.use(cors())
app.use(express.json({ limit: '5mb' }))

app.use('/api/auth', authRouter)

app.use('/api/dashboard', requireAuth, dashboardRouter)
app.use('/api/attendance', requireAuth, attendanceRouter)
app.use('/api/kpi', requireAuth, kpiRouter)
app.use('/api/tasks', requireAuth, tasksRouter)
app.use('/api/accounts', requireAuth, accountsRouter)
app.use('/api/knowledge', requireAuth, knowledgeRouter)
app.use('/api/bookmarks', requireAuth, bookmarksRouter)
app.use('/api/announcements', requireAuth, announcementsRouter)
app.use('/api/profile', requireAuth, profileRouter)
app.use('/api/notifications', requireAuth, notificationsRouter)

if (process.env.NODE_ENV === 'production') {
  const clientDist = path.resolve(__dirname, '../../client/dist')
  app.use(express.static(clientDist))
  app.get('*', (_req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`DGSystem API listening on http://localhost:${PORT}`)
})
