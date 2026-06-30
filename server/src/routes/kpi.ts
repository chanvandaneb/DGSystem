import { Router } from 'express'
import { kpiCategories, kpiScores, kpiEntries } from '../data/kpi.js'
import { listKpiRules, createKpiRule, updateKpiRule, deleteKpiRule } from '../repositories/kpiRules.js'
import { requireRole } from '../auth.js'
import { findUserById } from '../repositories/users.js'

export const kpiRouter = Router()

kpiRouter.get('/', (req, res) => {
  const user = req.userId ? findUserById(req.userId) : undefined
  if (user?.role === 'admin') {
    res.json(kpiEntries)
    return
  }
  res.json(kpiEntries.filter((e) => e.reportee === user?.name))
})

kpiRouter.get('/categories', (_req, res) => {
  res.json(kpiCategories)
})

kpiRouter.get('/scores', (req, res) => {
  const user = req.userId ? findUserById(req.userId) : undefined
  if (user?.role === 'admin') {
    res.json(kpiScores)
    return
  }
  res.json(kpiScores.filter((s) => s.reportee === user?.name))
})

kpiRouter.get('/rules', (_req, res) => {
  res.json(listKpiRules())
})

kpiRouter.post('/rules', requireRole('admin'), (req, res) => {
  res.status(201).json(createKpiRule(req.body))
})

kpiRouter.put('/rules/:id', requireRole('admin'), (req, res) => {
  const updated = updateKpiRule(req.params.id, req.body)
  if (!updated) {
    res.status(404).json({ error: 'Rule not found' })
    return
  }
  res.json(updated)
})

kpiRouter.delete('/rules/:id', requireRole('admin'), (req, res) => {
  if (!deleteKpiRule(req.params.id)) {
    res.status(404).json({ error: 'Rule not found' })
    return
  }
  res.status(204).end()
})
