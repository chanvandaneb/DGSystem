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
    body: 'The office will be closed for the public holiday. Enjoy the long weekend — you deserve it!',
    author: 'James Carter',
    date: '2026-06-25',
    type: 'holiday',
    pinned: true,
  },
  {
    id: '2',
    title: 'New KPI cycle starts Monday',
    body: 'Please submit your Q3 KPI targets by Friday so reviewers can finalize scoring on time. Late submissions will be marked as zero.',
    author: 'James Carter',
    date: '2026-06-29',
    type: 'kpi',
  },
  {
    id: '3',
    title: 'Payroll system maintenance tonight',
    body: 'Payroll will be briefly unavailable from 11 PM to 1 AM for scheduled maintenance. No action needed from your side.',
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
  {
    id: '5',
    title: 'National Day Holiday — July 14',
    body: 'The office will be closed on July 14th for National Day. Work-from-home arrangements will be shared by department heads.',
    author: 'Emily Davis',
    date: '2026-07-07',
    type: 'holiday',
    pinned: true,
  },
  {
    id: '6',
    title: 'Q2 KPI Results Published',
    body: 'Q2 KPI results are now live in the KPI section. Top performers this quarter: Alex Morgan, Ryan Cooper, and Sarah Bennett. Congratulations!',
    author: 'James Carter',
    date: '2026-07-08',
    type: 'kpi',
  },
  {
    id: '7',
    title: 'New design asset library launched',
    body: 'The updated brand asset library is now available in the Knowledge section. All team members should use the new templates starting next sprint.',
    author: 'Alex Morgan',
    date: '2026-07-10',
    type: 'general',
  },
  {
    id: '8',
    title: 'Server downtime — urgent',
    body: 'We experienced a brief server outage from 2:00 AM to 3:15 AM. All systems are now restored. Please report any data issues to the dev team immediately.',
    author: 'Emily Davis',
    date: '2026-07-12',
    type: 'urgent',
  },
  {
    id: '9',
    title: 'Remote work policy update',
    body: 'Starting August 1st, all employees may work remotely up to 2 days per week. Please coordinate with your team lead and update your attendance accordingly.',
    author: 'James Carter',
    date: '2026-07-15',
    type: 'general',
  },
  {
    id: '10',
    title: 'Mid-year performance review schedule',
    body: 'Mid-year reviews will take place July 21–25. Managers will send calendar invites by end of this week. Please prepare your self-assessment form.',
    author: 'Emily Davis',
    date: '2026-07-16',
    type: 'kpi',
  },
  {
    id: '11',
    title: 'Office internet upgrade this weekend',
    body: 'IT will be upgrading our office internet infrastructure on Saturday July 19. The office will have intermittent connectivity from 9 AM to 3 PM.',
    author: 'Alex Morgan',
    date: '2026-07-17',
    type: 'urgent',
  },
  {
    id: '12',
    title: 'Team lunch — Friday July 25',
    body: 'Join us for the monthly team lunch this Friday at noon. Location: The Garden Bistro, 3rd floor. RSVP to admin by Thursday.',
    author: 'James Carter',
    date: '2026-07-20',
    type: 'general',
  },
]
