import { Router } from 'express'
import { profile, profileDevices } from '../data/profile.js'

export const profileRouter = Router()

profileRouter.get('/', (_req, res) => {
  res.json(profile)
})

profileRouter.get('/devices', (_req, res) => {
  res.json(profileDevices)
})
