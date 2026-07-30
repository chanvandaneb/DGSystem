export interface EmployeeStatus {
  id: string
  name: string
  status: 'Online' | 'Idle' | 'Offline'
  lastSeen: string
}

export const employeeStatuses: EmployeeStatus[] = [
  { id: '1', name: 'ALEX',   status: 'Online',  lastSeen: '2026-07-30 09:15:00' },
  { id: '2', name: 'ERIZ',   status: 'Online',  lastSeen: '2026-07-30 09:10:22' },
  { id: '3', name: 'KRIS',   status: 'Idle',    lastSeen: '2026-07-30 08:55:10' },
  { id: '4', name: 'CICI',   status: 'Online',  lastSeen: '2026-07-30 09:12:44' },
  { id: '5', name: 'ANISE',  status: 'Idle',    lastSeen: '2026-07-30 08:40:33' },
  { id: '6', name: 'KELKAY', status: 'Offline', lastSeen: '2026-07-29 18:04:19' },
  { id: '7', name: 'MAX',    status: 'Online',  lastSeen: '2026-07-30 09:08:05' },
  { id: '8', name: 'LIDAS',  status: 'Idle',    lastSeen: '2026-07-30 08:30:50' },
]

export interface RecentEarning {
  date: string
  salesCount: number
  earnings: number
  delta: number
}

export const recentEarnings: RecentEarning[] = [
  { date: '2026-02-01', salesCount: 26, earnings: 453.25, delta: -25.01 },
  { date: '2026-03-01', salesCount: 34, earnings: 653.12, delta: 18.40  },
  { date: '2026-04-01', salesCount: 45, earnings: 812.47, delta: 32.10  },
  { date: '2026-05-01', salesCount: 31, earnings: 592.72, delta: -10.60 },
  { date: '2026-06-01', salesCount: 52, earnings: 974.30, delta: 44.80  },
  { date: '2026-07-01', salesCount: 47, earnings: 883.15, delta: -9.10  },
]
