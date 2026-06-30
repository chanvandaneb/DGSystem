import db from '../db.js'
import { profile as seedProfile, type ProfileData } from '../data/profile.js'

const COLUMNS = [
  'avatar', 'eid', 'fullname', 'birthday', 'gender', 'nationality', 'passportExpiry', 'visaExpiry',
  'personalEmail', 'personalPhone', 'telegram', 'messenger', 'workingPhone', 'homeAddress', 'abroadAddress',
  'status', 'interviewDate', 'contractDate', 'onboardDate', 'regularDate', 'resignedDate', 'notes',
] as const

export function getProfile(userId: string): ProfileData {
  const row = db.prepare('SELECT * FROM profiles WHERE userId = ?').get(userId) as (ProfileData & { userId: string }) | undefined
  if (row) {
    const { userId: _userId, ...data } = row
    return data
  }
  db.prepare(
    `INSERT INTO profiles (userId, ${COLUMNS.join(', ')}) VALUES (@userId, ${COLUMNS.map((c) => `@${c}`).join(', ')})`,
  ).run({ userId, ...seedProfile })
  return { ...seedProfile }
}

export function updateProfile(userId: string, input: Partial<ProfileData>): ProfileData {
  const existing = getProfile(userId)
  const updated: ProfileData = { ...existing, ...input }
  db.prepare(
    `UPDATE profiles SET ${COLUMNS.map((c) => `${c}=@${c}`).join(', ')} WHERE userId=@userId`,
  ).run({ userId, ...updated })
  return updated
}
