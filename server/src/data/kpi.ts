export interface KpiCategory {
  id: string
  name: string
  description: string
  ruleCount: number
}

export const kpiCategories: KpiCategory[] = [
  { id: '1', name: 'Sales', description: 'Sales count and order targets', ruleCount: 4 },
  { id: '2', name: 'Engineering', description: 'Code quality and delivery', ruleCount: 6 },
  { id: '3', name: 'Support', description: 'Response time and resolution', ruleCount: 3 },
]

export interface KpiScore {
  id: string
  reporter: string
  reportee: string
  totalReporterPts: number
  totalReporteePts: number
  avgScore: number
}

export const kpiScores: KpiScore[] = [
  { id: '1', reporter: 'Pich Sovann', reportee: 'Chan Vandanet', totalReporterPts: 92, totalReporteePts: 88, avgScore: 90 },
  { id: '2', reporter: 'Pich Sovann', reportee: 'Sok Dara', totalReporterPts: 85, totalReporteePts: 90, avgScore: 87.5 },
  { id: '3', reporter: 'Pich Sovann', reportee: 'Nguyen Anh', totalReporterPts: 78, totalReporteePts: 80, avgScore: 79 },
]

export interface KpiEntry {
  id: string
  date: string
  reporter: string
  reporterPoint: number
  reportee: string
  reporteePoint: number
  title: string
  status: 'Pending' | 'Approved' | 'Rejected'
}

export const kpiEntries: KpiEntry[] = [
  { id: '1', date: '2026-05-01', reporter: 'Pich Sovann', reporterPoint: 9, reportee: 'Chan Vandanet', reporteePoint: 8, title: 'Sprint delivery quality', status: 'Approved' },
  { id: '2', date: '2026-05-08', reporter: 'Pich Sovann', reporterPoint: 7, reportee: 'Sok Dara', reporteePoint: 8, title: 'Design handoff turnaround', status: 'Pending' },
  { id: '3', date: '2026-05-15', reporter: 'Pich Sovann', reporterPoint: 6, reportee: 'Nguyen Anh', reporteePoint: 7, title: 'Payroll accuracy', status: 'Approved' },
  { id: '4', date: '2026-05-22', reporter: 'Pich Sovann', reporterPoint: 5, reportee: 'Chan Vandanet', reporteePoint: 6, title: 'Code review responsiveness', status: 'Rejected' },
]

export interface KpiRule {
  id: string
  name: string
  category: string
  points: number
  description: string
}

export const kpiRules: KpiRule[] = [
  { id: '1', name: 'On-time sprint delivery', category: 'Engineering', points: 10, description: 'Deliver committed sprint scope on time' },
  { id: '2', name: 'Code review SLA', category: 'Engineering', points: 5, description: 'Review PRs within 24 hours' },
  { id: '3', name: 'Monthly sales target', category: 'Sales', points: 15, description: 'Meet or exceed monthly sales target' },
  { id: '4', name: 'Response time SLA', category: 'Support', points: 8, description: 'Respond to tickets within SLA window' },
]
