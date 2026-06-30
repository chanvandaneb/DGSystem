export interface EmployeeStatus {
  id: string
  name: string
  status: 'Online' | 'Idle' | 'Offline'
  lastSeen: string
}

export const employeeStatuses: EmployeeStatus[] = [
  { id: '1', name: 'SIMON', status: 'Offline', lastSeen: '2026-04-29 06:20:25' },
  { id: '2', name: 'DAN', status: 'Idle', lastSeen: '2025-09-11 06:23:35' },
  { id: '3', name: 'ALI', status: 'Idle', lastSeen: '2025-11-05 23:05:55' },
  { id: '4', name: 'GRACY', status: 'Offline', lastSeen: '2026-01-08 11:21:30' },
  { id: '5', name: 'SOPHIE', status: 'Idle', lastSeen: '2025-11-06 01:45:22' },
  { id: '6', name: 'AIDEN', status: 'Offline', lastSeen: '2026-04-04 06:16:50' },
  { id: '7', name: 'SKY', status: 'Online', lastSeen: '2025-09-07 10:56:56' },
  { id: '8', name: 'HALI', status: 'Offline', lastSeen: '2026-02-18 09:12:04' },
]

export interface RecentEarning {
  date: string
  salesCount: number
  earnings: number
  delta: number
}

export const recentEarnings: RecentEarning[] = [
  { date: '2026-01-05', salesCount: 34, earnings: 658.2, delta: -24.22 },
  { date: '2026-02-06', salesCount: 26, earnings: 453.25, delta: -25.01 },
  { date: '2026-03-07', salesCount: 34, earnings: 653.12, delta: 18.4 },
  { date: '2026-04-08', salesCount: 45, earnings: 546.47, delta: 32.1 },
  { date: '2026-05-09', salesCount: 31, earnings: 425.72, delta: -10.6 },
]
