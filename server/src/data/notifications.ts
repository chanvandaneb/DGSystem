export interface Notification {
  id: string
  title: string
  body: string
  time: string
  read: boolean
  type: 'comment' | 'mention' | 'system'
}

export const notifications: Notification[] = [
  { id: '1',  title: 'World Cup 2026 banner approved',        body: 'James Carter approved your submission',              time: '2 hours ago',   read: false, type: 'system' },
  { id: '2',  title: 'You were mentioned in a task',          body: 'KRIS mentioned you in BANNER 20260522',              time: '3 hours ago',   read: false, type: 'mention' },
  { id: '3',  title: 'Lucky Spin design needs revision',      body: 'LIDAS left a comment on MINIGAME REMAKE',           time: '5 hours ago',   read: false, type: 'comment' },
  { id: '4',  title: 'KPI score updated',                     body: 'Your Q2 KPI score has been finalized: 88 pts',      time: 'Yesterday',     read: false, type: 'system' },
  { id: '5',  title: 'New task assigned to you',              body: 'SEO IMAGE FOR WEB SEO assigned by MAX',             time: 'Yesterday',     read: true,  type: 'system' },
  { id: '6',  title: 'Biolink template feedback',             body: 'CICI commented on SSM REQUEST TEMPLATE BIOLINK',   time: '2 days ago',    read: true,  type: 'comment' },
  { id: '7',  title: 'New design uploaded',                   body: 'Someone uploaded assets for WORLD CUP PROMO',      time: '2 days ago',    read: true,  type: 'comment' },
  { id: '8',  title: 'You were mentioned in KPI review',      body: 'James Carter mentioned you in the Q2 review',       time: '3 days ago',    read: true,  type: 'mention' },
  { id: '9',  title: 'Attendance reminder',                   body: 'You have not checked out for July 21',              time: '3 days ago',    read: true,  type: 'system' },
  { id: '10', title: 'New announcement posted',               body: 'James Carter posted: "Remote work policy update"',  time: '4 days ago',    read: true,  type: 'system' },
  { id: '11', title: 'Task deadline approaching',             body: 'LUCKY SPIN is due in 2 days',                       time: '4 days ago',    read: true,  type: 'system' },
  { id: '12', title: 'Banner for AD requested',               body: 'KRIS submitted a new banner request for review',    time: '5 days ago',    read: true,  type: 'comment' },
]
