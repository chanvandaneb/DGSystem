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
  { id: '1', reporter: 'James Carter', reportee: 'Alex Morgan', totalReporterPts: 92, totalReporteePts: 88, avgScore: 90 },
  { id: '2', reporter: 'James Carter', reportee: 'Sarah Bennett', totalReporterPts: 85, totalReporteePts: 90, avgScore: 87.5 },
  { id: '3', reporter: 'James Carter', reportee: 'Ryan Cooper', totalReporterPts: 78, totalReporteePts: 80, avgScore: 79 },
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
  { id: '1', date: '2026-03-04', reporter: 'James Carter', reporterPoint: 8, reportee: 'Alex Morgan', reporteePoint: 7, title: 'Sprint planning accuracy', status: 'Approved' },
  { id: '2', date: '2026-03-12', reporter: 'James Carter', reporterPoint: 6, reportee: 'Sarah Bennett', reporteePoint: 7, title: 'Client follow-up turnaround', status: 'Approved' },
  { id: '3', date: '2026-03-20', reporter: 'Emily Davis', reporterPoint: 5, reportee: 'Ryan Cooper', reporteePoint: 6, title: 'Ticket resolution time', status: 'Pending' },
  { id: '4', date: '2026-04-02', reporter: 'James Carter', reporterPoint: 9, reportee: 'Alex Morgan', reporteePoint: 8, title: 'Bug triage thoroughness', status: 'Approved' },
  { id: '5', date: '2026-04-10', reporter: 'Emily Davis', reporterPoint: 4, reportee: 'Sarah Bennett', reporteePoint: 5, title: 'Lead qualification quality', status: 'Rejected' },
  { id: '6', date: '2026-04-18', reporter: 'James Carter', reporterPoint: 7, reportee: 'Ryan Cooper', reporteePoint: 8, title: 'Payroll accuracy', status: 'Approved' },
  { id: '7', date: '2026-05-01', reporter: 'James Carter', reporterPoint: 9, reportee: 'Alex Morgan', reporteePoint: 8, title: 'Sprint delivery quality', status: 'Approved' },
  { id: '8', date: '2026-05-08', reporter: 'James Carter', reporterPoint: 7, reportee: 'Sarah Bennett', reporteePoint: 8, title: 'Design handoff turnaround', status: 'Pending' },
  { id: '9', date: '2026-05-15', reporter: 'Emily Davis', reporterPoint: 6, reportee: 'Ryan Cooper', reporteePoint: 7, title: 'Support SLA compliance', status: 'Approved' },
  { id: '10', date: '2026-05-22', reporter: 'James Carter', reporterPoint: 5, reportee: 'Alex Morgan', reporteePoint: 6, title: 'Code review responsiveness', status: 'Rejected' },
  { id: '11', date: '2026-06-05', reporter: 'James Carter', reporterPoint: 8, reportee: 'Sarah Bennett', reporteePoint: 8, title: 'Monthly sales target', status: 'Approved' },
  { id: '12', date: '2026-06-14', reporter: 'Emily Davis', reporterPoint: 7, reportee: 'Alex Morgan', reporteePoint: 7, title: 'Documentation quality', status: 'Pending' },
  { id: '13', date: '2026-06-21', reporter: 'James Carter', reporterPoint: 6, reportee: 'Ryan Cooper', reporteePoint: 6, title: 'Response time SLA', status: 'Approved' },
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
