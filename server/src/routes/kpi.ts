import { Router } from 'express'
import { kpiCategories, kpiScores, kpiEntries } from '../data/kpi.js'
import { listKpiRules, createKpiRule, updateKpiRule, deleteKpiRule } from '../repositories/kpiRules.js'

export const kpiRouter = Router()

kpiRouter.get('/', (_req, res) => {
  res.json(kpiEntries)
})

kpiRouter.get('/categories', (_req, res) => {
  res.json(kpiCategories)
})

kpiRouter.get('/scores', (_req, res) => {
  res.json(kpiScores)
})

kpiRouter.get('/rules', (_req, res) => {
  res.json(listKpiRules())
})

kpiRouter.post('/rules', (req, res) => {
  res.status(201).json(createKpiRule(req.body))
})

kpiRouter.put('/rules/:id', (req, res) => {
  const updated = updateKpiRule(req.params.id, req.body)
  if (!updated) {
    res.status(404).json({ error: 'Rule not found' })
    return
  }
  res.json(updated)
})

kpiRouter.delete('/rules/:id', (req, res) => {
  if (!deleteKpiRule(req.params.id)) {
    res.status(404).json({ error: 'Rule not found' })
    return
  }
  res.status(204).end()
})
