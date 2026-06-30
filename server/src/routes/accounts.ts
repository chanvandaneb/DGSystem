import { Router } from 'express'
import { listAccounts, createAccount, updateAccount, deleteAccount, deleteAccounts } from '../repositories/accounts.js'

export const accountsRouter = Router()

accountsRouter.get('/', (_req, res) => {
  res.json(listAccounts())
})

accountsRouter.post('/', (req, res) => {
  res.status(201).json(createAccount(req.body))
})

accountsRouter.post('/bulk-delete', (req, res) => {
  const ids = (req.body?.ids as string[]) ?? []
  res.json({ deleted: deleteAccounts(ids) })
})

accountsRouter.put('/:id', (req, res) => {
  const updated = updateAccount(req.params.id, req.body)
  if (!updated) {
    res.status(404).json({ error: 'Account not found' })
    return
  }
  res.json(updated)
})

accountsRouter.delete('/:id', (req, res) => {
  if (!deleteAccount(req.params.id)) {
    res.status(404).json({ error: 'Account not found' })
    return
  }
  res.status(204).end()
})
