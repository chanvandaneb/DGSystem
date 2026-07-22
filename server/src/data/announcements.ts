export type AnnouncementType = 'holiday' | 'kpi' | 'general' | 'urgent'

export interface Announcement {
  id: string
  title: string
  body: string
  author: string
  date: string
  type: AnnouncementType
  pinned?: boolean
}

export const announcements: Announcement[] = [
  {
    id: '1',
    title: 'Office closed July 4th',
    body: 'The office will be closed for the public holiday. Enjoy the long weekend!',
    author: 'James Carter',
    date: '2026-06-25',
    type: 'holiday',
    pinned: true,
  },
  {
    id: '2',
    title: 'New KPI cycle starts Monday',
    body: 'Please submit your Q3 KPI targets by Friday so reviewers can finalize scoring on time.',
    author: 'James Carter',
    date: '2026-06-29',
    type: 'kpi',
  },
  {
    id: '3',
    title: 'Payroll system maintenance tonight',
    body: 'Payroll will be briefly unavailable from 11 PM to 1 AM for scheduled maintenance. No action needed.',
    author: 'Emily Davis',
    date: '2026-06-30',
    type: 'urgent',
  },
  {
    id: '4',
    title: 'Welcome our newest teammates!',
    body: 'Please give a warm welcome to Ryan Cooper and Sarah Bennett, joining the Support and Sales teams this week.',
    author: 'James Carter',
    date: '2026-07-01',
    type: 'general',
  },
]
