import { Router } from 'express'
import { listTasks, listTaskScores, createTask, updateTask, deleteTask, deleteTasks } from '../repositories/tasks.js'

export const tasksRouter = Router()

tasksRouter.get('/', (_req, res) => {
  res.json(listTasks())
})

tasksRouter.get('/scores', (_req, res) => {
  res.json(listTaskScores())
})

tasksRouter.post('/', (req, res) => {
  res.status(201).json(createTask(req.body))
})

tasksRouter.post('/bulk-delete', (req, res) => {
  const ids = (req.body?.ids as string[]) ?? []
  res.json({ deleted: deleteTasks(ids) })
})

tasksRouter.put('/:id', (req, res) => {
  const updated = updateTask(req.params.id, req.body)
  if (!updated) {
    res.status(404).json({ error: 'Task not found' })
    return
  }
  res.json(updated)
})

tasksRouter.delete('/:id', (req, res) => {
  if (!deleteTask(req.params.id)) {
    res.status(404).json({ error: 'Task not found' })
    return
  }
  res.status(204).end()
})
