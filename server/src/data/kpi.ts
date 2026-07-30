export interface KpiCategory {
  id: string
  name: string
  description: string
  ruleCount: number
}

export const kpiCategories: KpiCategory[] = [
  { id: '1', name: 'Design', description: 'Design quality and delivery speed', ruleCount: 5 },
  { id: '2', name: 'Marketing', description: 'Campaign performance and reach', ruleCount: 4 },
  { id: '3', name: 'Engineering', description: 'Code quality and delivery', ruleCount: 6 },
  { id: '4', name: 'Support', description: 'Response time and resolution', ruleCount: 3 },
  { id: '5', name: 'Sales', description: 'Sales count and order targets', ruleCount: 4 },
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
  { id: '4', reporter: 'Emily Davis', reportee: 'Mia Thompson', totalReporterPts: 88, totalReporteePts: 85, avgScore: 86.5 },
  { id: '5', reporter: 'Emily Davis', reportee: 'Lucas Wright', totalReporterPts: 74, totalReporteePts: 76, avgScore: 75 },
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
  { id: '1',  date: '2026-03-04', reporter: 'James Carter', reporterPoint: 8,  reportee: 'Alex Morgan',   reporteePoint: 7,  title: 'Sprint planning accuracy',        status: 'Approved' },
  { id: '2',  date: '2026-03-12', reporter: 'James Carter', reporterPoint: 6,  reportee: 'Sarah Bennett',  reporteePoint: 7,  title: 'Client follow-up turnaround',     status: 'Approved' },
  { id: '3',  date: '2026-03-20', reporter: 'Emily Davis',  reporterPoint: 5,  reportee: 'Ryan Cooper',    reporteePoint: 6,  title: 'Ticket resolution time',          status: 'Approved' },
  { id: '4',  date: '2026-04-02', reporter: 'James Carter', reporterPoint: 9,  reportee: 'Alex Morgan',    reporteePoint: 8,  title: 'Bug triage thoroughness',         status: 'Approved' },
  { id: '5',  date: '2026-04-10', reporter: 'Emily Davis',  reporterPoint: 4,  reportee: 'Sarah Bennett',  reporteePoint: 5,  title: 'Lead qualification quality',      status: 'Rejected' },
  { id: '6',  date: '2026-04-18', reporter: 'James Carter', reporterPoint: 7,  reportee: 'Ryan Cooper',    reporteePoint: 8,  title: 'Payroll accuracy',                status: 'Approved' },
  { id: '7',  date: '2026-05-01', reporter: 'James Carter', reporterPoint: 9,  reportee: 'Alex Morgan',    reporteePoint: 8,  title: 'Sprint delivery quality',         status: 'Approved' },
  { id: '8',  date: '2026-05-08', reporter: 'James Carter', reporterPoint: 7,  reportee: 'Sarah Bennett',  reporteePoint: 8,  title: 'Design handoff turnaround',      status: 'Approved' },
  { id: '9',  date: '2026-05-15', reporter: 'Emily Davis',  reporterPoint: 6,  reportee: 'Ryan Cooper',    reporteePoint: 7,  title: 'Support SLA compliance',         status: 'Approved' },
  { id: '10', date: '2026-05-22', reporter: 'James Carter', reporterPoint: 5,  reportee: 'Alex Morgan',    reporteePoint: 6,  title: 'Code review responsiveness',      status: 'Rejected' },
  { id: '11', date: '2026-06-05', reporter: 'James Carter', reporterPoint: 8,  reportee: 'Sarah Bennett',  reporteePoint: 8,  title: 'Monthly sales target',           status: 'Approved' },
  { id: '12', date: '2026-06-14', reporter: 'Emily Davis',  reporterPoint: 7,  reportee: 'Alex Morgan',    reporteePoint: 7,  title: 'Documentation quality',          status: 'Approved' },
  { id: '13', date: '2026-06-21', reporter: 'James Carter', reporterPoint: 6,  reportee: 'Ryan Cooper',    reporteePoint: 6,  title: 'Response time SLA',              status: 'Approved' },
  { id: '14', date: '2026-06-25', reporter: 'Emily Davis',  reporterPoint: 8,  reportee: 'Mia Thompson',   reporteePoint: 9,  title: 'Campaign reach Q2',              status: 'Approved' },
  { id: '15', date: '2026-06-28', reporter: 'James Carter', reporterPoint: 7,  reportee: 'Lucas Wright',   reporteePoint: 6,  title: 'Onboarding completion rate',     status: 'Approved' },
  { id: '16', date: '2026-07-03', reporter: 'Emily Davis',  reporterPoint: 9,  reportee: 'Mia Thompson',   reporteePoint: 8,  title: 'Social media engagement rate',   status: 'Approved' },
  { id: '17', date: '2026-07-07', reporter: 'James Carter', reporterPoint: 8,  reportee: 'Alex Morgan',    reporteePoint: 9,  title: 'Feature release on schedule',    status: 'Approved' },
  { id: '18', date: '2026-07-10', reporter: 'James Carter', reporterPoint: 6,  reportee: 'Sarah Bennett',  reporteePoint: 7,  title: 'Customer satisfaction score',    status: 'Pending' },
  { id: '19', date: '2026-07-14', reporter: 'Emily Davis',  reporterPoint: 5,  reportee: 'Lucas Wright',   reporteePoint: 5,  title: 'Training session delivery',      status: 'Pending' },
  { id: '20', date: '2026-07-18', reporter: 'James Carter', reporterPoint: 9,  reportee: 'Ryan Cooper',    reporteePoint: 9,  title: 'Q2 revenue target achievement',  status: 'Pending' },
  { id: '21', date: '2026-07-22', reporter: 'Emily Davis',  reporterPoint: 7,  reportee: 'Mia Thompson',   reporteePoint: 8,  title: 'Content calendar adherence',     status: 'Pending' },
  { id: '22', date: '2026-07-25', reporter: 'James Carter', reporterPoint: 8,  reportee: 'Alex Morgan',    reporteePoint: 8,  title: 'Mid-year review self-assessment', status: 'Pending' },
]

export interface KpiRule {
  id: string
  name: string
  category: string
  points: number
  description: string
}

export const kpiRules: KpiRule[] = [
  { id: '1',  name: 'On-time sprint delivery',       category: 'Engineering', points: 10, description: 'Deliver committed sprint scope on time without rollover' },
  { id: '2',  name: 'Code review SLA',               category: 'Engineering', points: 5,  description: 'Review assigned PRs within 24 hours of assignment' },
  { id: '3',  name: 'Zero critical bugs in release', category: 'Engineering', points: 8,  description: 'Ship a release with no critical bugs reported within 48 hrs' },
  { id: '4',  name: 'Monthly sales target',          category: 'Sales',       points: 15, description: 'Meet or exceed the monthly sales quota set by management' },
  { id: '5',  name: 'New client acquisition',        category: 'Sales',       points: 12, description: 'Successfully onboard a net-new client this month' },
  { id: '6',  name: 'Response time SLA',             category: 'Support',     points: 8,  description: 'Respond to all tickets within the agreed SLA window' },
  { id: '7',  name: 'First-contact resolution rate', category: 'Support',     points: 10, description: 'Resolve >80% of support tickets on first contact' },
  { id: '8',  name: 'Campaign click-through rate',   category: 'Marketing',   points: 10, description: 'Achieve target CTR on all paid campaigns this month' },
  { id: '9',  name: 'Content calendar adherence',    category: 'Marketing',   points: 6,  description: 'Publish all planned content on schedule with no delays' },
  { id: '10', name: 'Design task on-time delivery',  category: 'Design',      points: 8,  description: 'Complete all assigned design tasks by their due date' },
  { id: '11', name: 'Design revision rounds ≤ 2',   category: 'Design',      points: 6,  description: 'Deliver final assets with no more than 2 revision rounds' },
]
