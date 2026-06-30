import { Router } from 'express'
import { profileDevices } from '../data/profile.js'
import { getProfile, updateProfile } from '../repositories/profile.js'

export const profileRouter = Router()

profileRouter.get('/', (req, res) => {
  res.json(getProfile(req.userId!))
})

profileRouter.put('/', (req, res) => {
  const { avatar: _avatar, ...input } = req.body ?? {}
  res.json(updateProfile(req.userId!, input))
})

profileRouter.put('/avatar', (req, res) => {
  const { avatar } = req.body as { avatar?: string }
  if (!avatar || !avatar.startsWith('data:image/')) {
    res.status(400).json({ error: 'A valid image data URL is required' })
    return
  }
  res.json(updateProfile(req.userId!, { avatar }))
})

profileRouter.get('/devices', (_req, res) => {
  res.json(profileDevices)
})
