export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Urgent'
export type TaskProgress = 'Todo' | 'Doing' | 'Done'

export interface Task {
  id: string
  subject: string
  priority: TaskPriority
  category: string
  progress: TaskProgress
  start: string
  end: string
  viewable: string
  author: string
  assignee: string
}

export const tasks: Task[] = [
  { id: '494', subject: '[Fi88 & KGVN] WORLD CUP 2026 PROMO BANNER', priority: 'High', category: 'Fi88', progress: 'Todo', start: '2026-05-27', end: '2026-06-07', viewable: 'TEAM: DES', author: 'LIDAS', assignee: '' },
  { id: '493', subject: 'ADV - DNL - BANNER 20260522', priority: 'Urgent', category: 'MKT', progress: 'Todo', start: '2026-05-22', end: '2026-05-25', viewable: 'TEAM: DES', author: 'KRIS', assignee: '' },
  { id: '492', subject: 'ADV - DNL - BANNER 20260522', priority: 'Urgent', category: 'MKT', progress: 'Todo', start: '2026-05-22', end: '2026-05-25', viewable: 'TEAM: DES', author: 'KRIS', assignee: '' },
  { id: '491', subject: 'ADV - FI88 - BANNER 20260522', priority: 'Urgent', category: 'MKT', progress: 'Todo', start: '2026-05-22', end: '2026-05-25', viewable: 'TEAM: DES', author: 'KRIS', assignee: '' },
  { id: '490', subject: 'SSM Request Mascot MV World Cup', priority: 'High', category: 'Demnay', progress: 'Todo', start: '2026-05-21', end: '2026-06-06', viewable: 'TEAM: DES', author: 'CICI', assignee: '' },
  { id: '489', subject: '[SEO REQUEST] IMAGE FOR WEB SEO', priority: 'High', category: 'Fi88', progress: 'Done', start: '2026-05-20', end: '2026-05-31', viewable: 'TEAM: DES', author: 'MAX', assignee: 'KELKAY' },
  { id: '488', subject: 'NAME BAR 2 COMMENTATOR (05.18.2026)', priority: 'Medium', category: 'Demnay', progress: 'Doing', start: '2026-05-09', end: '2026-05-09', viewable: 'TEAM: DES', author: 'ANISE', assignee: '' },
  { id: '487', subject: '[MINIGAME REMAKE] LUCKY SPIN', priority: 'High', category: 'Fi88', progress: 'Todo', start: '2026-05-18', end: '2026-05-31', viewable: 'TEAM: DES', author: 'LIDAS', assignee: '' },
  { id: '486', subject: 'SSM REQUEST INTRO & OUTRO FOR MV DE', priority: 'High', category: 'Demnay', progress: 'Done', start: '2026-05-18', end: '2026-05-21', viewable: 'TEAM: DES', author: 'CICI', assignee: '' },
  { id: '485', subject: '[SEO REQUEST] IMAGE FOR WEB SEO', priority: 'High', category: 'Demnay', progress: 'Done', start: '2026-05-15', end: '2026-05-31', viewable: 'TEAM: DES', author: 'MAX', assignee: 'KELKAY' },
  { id: '484', subject: 'ADV - FI88 - BANNER 20260514', priority: 'Urgent', category: 'MKT', progress: 'Todo', start: '2026-05-14', end: '2026-05-16', viewable: 'TEAM: DES', author: 'KRIS', assignee: '' },
  { id: '483', subject: 'SSM REQUEST TEMPLATE BIOLINK PAGE', priority: 'High', category: 'MKT', progress: 'Todo', start: '2026-05-11', end: '2026-05-14', viewable: 'TEAM: DES', author: 'CICI', assignee: '' },
  { id: '482', subject: 'NAME BAR 1 COMMENTATOR (05.09.2026)', priority: 'Medium', category: 'Demnay', progress: 'Doing', start: '2026-05-09', end: '2026-05-09', viewable: 'TEAM: DES', author: 'ANISE', assignee: '' },
  { id: '481', subject: 'ADV - DNL - BANNER 20260508', priority: 'High', category: 'MKT', progress: 'Todo', start: '2026-05-08', end: '2026-05-12', viewable: 'TEAM: DES', author: 'KRIS', assignee: '' },
  { id: '480', subject: '[KGVN] BANNER REMAKE - USDT ADD-ON', priority: 'Medium', category: 'KingGroup', progress: 'Todo', start: '2026-05-06', end: '2026-05-12', viewable: 'TEAM: DES', author: 'LIDAS', assignee: '' },
  { id: '469', subject: 'SSM REQUEST BANNER SPONSOR', priority: 'Medium', category: 'Demnay', progress: 'Todo', start: '2026-04-20', end: '2026-04-25', viewable: 'TEAM: DES', author: 'CICI', assignee: '' },
  { id: '467', subject: '[KGVN] BANNER REMAKE - PROMO', priority: 'Medium', category: 'KingGroup', progress: 'Todo', start: '2026-04-18', end: '2026-04-22', viewable: 'TEAM: DES', author: 'LIDAS', assignee: '' },
  { id: '465', subject: 'REQUEST DESIGN FOR DEMNAY APP', priority: 'High', category: 'Demnay', progress: 'Doing', start: '2026-04-15', end: '2026-04-20', viewable: 'TEAM: DES', author: 'CICI', assignee: '' },
  { id: '463', subject: '[SEO REQUEST] 4 THUMBNAIL SETS', priority: 'Medium', category: 'MKT', progress: 'Todo', start: '2026-04-12', end: '2026-04-16', viewable: 'TEAM: DES', author: 'MAX', assignee: '' },
  { id: '462', subject: '[KGVN] NEW PROMOTION BANNER', priority: 'High', category: 'KingGroup', progress: 'Todo', start: '2026-04-10', end: '2026-04-14', viewable: 'TEAM: DES', author: 'LIDAS', assignee: '' },
  { id: '461', subject: 'ADV - KG - BANNER 20260408', priority: 'High', category: 'MKT', progress: 'Done', start: '2026-04-08', end: '2026-04-10', viewable: 'TEAM: DES', author: 'KRIS', assignee: 'ERIZ' },
  { id: '459', subject: 'Logo & Icon for Demnay App', priority: 'Low', category: 'Demnay', progress: 'Doing', start: '2026-04-05', end: '2026-04-15', viewable: 'TEAM: DES', author: '', assignee: '' },
]

export interface TaskScore {
  id: string
  taskId: string
  subject: string
  assignee: string
  category: string
  month: string
  authorScore: number | null
  leaderScore: number | null
  average: number | null
}

export const taskScores: TaskScore[] = tasks.map((t) => ({
  id: t.id,
  taskId: t.id,
  subject: t.subject,
  assignee: t.assignee,
  category: t.category,
  month: `${Number(t.start.slice(5, 7))}/${t.start.slice(0, 4)}`,
  authorScore: null,
  leaderScore: null,
  average: null,
}))
