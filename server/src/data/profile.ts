export interface ProfileDevice {
  id: string
  name: string
  lastActive: string
  location: string
}

export const profileDevices: ProfileDevice[] = [
  { id: '1', name: 'Chrome on macOS', lastActive: '2026-06-30 09:12', location: 'Phnom Penh, KH' },
  { id: '2', name: 'Safari on iPhone', lastActive: '2026-06-28 18:45', location: 'Phnom Penh, KH' },
]

export interface ProfileData {
  avatar: string
  eid: string
  fullname: string
  birthday: string
  gender: 'Male' | 'Female' | 'Other'
  nationality: string
  passportExpiry: string
  visaExpiry: string
  personalEmail: string
  personalPhone: string
  telegram: string
  messenger: string
  workingPhone: string
  homeAddress: string
  abroadAddress: string
  status: 'Regular' | 'Probation' | 'Resigned'
  interviewDate: string
  contractDate: string
  onboardDate: string
  regularDate: string
  resignedDate: string
  notes: string
}

export const profile: ProfileData = {
  avatar: '',
  eid: 'KH0120',
  fullname: 'Chan Vandanet',
  birthday: '2001-03-14',
  gender: 'Male',
  nationality: 'Cambodian',
  passportExpiry: '',
  visaExpiry: '',
  personalEmail: 'chanvandaofficail@gmail.com',
  personalPhone: '+85568485435',
  telegram: 'https://t.me/chanvanda',
  messenger: 'https://m.me/chanvanda2001',
  workingPhone: '',
  homeAddress: 'St138, Phsar Trapeang Chhuk, Sen Sok, Phnom Penh',
  abroadAddress: '',
  status: 'Regular',
  interviewDate: '',
  contractDate: '',
  onboardDate: '2025-04-24',
  regularDate: '2025-08-01',
  resignedDate: '',
  notes: '',
}
