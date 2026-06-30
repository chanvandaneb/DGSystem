export interface Announcement {
  id: string
  title: string
  body: string
  author: string
  date: string
}

export const announcements: Announcement[] = [
  { id: '1', title: 'Office closed July 4th', body: 'The office will be closed for the public holiday.', author: 'Pich Sovann', date: '2026-06-25' },
  { id: '2', title: 'New KPI cycle starts Monday', body: 'Please submit your Q3 KPI targets by Friday.', author: 'Pich Sovann', date: '2026-06-29' },
]
