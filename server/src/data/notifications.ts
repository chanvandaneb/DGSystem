export interface Notification {
  id: string
  title: string
  body: string
  time: string
  read: boolean
  type: 'comment' | 'mention' | 'system'
}

export const notifications: Notification[] = [
  { id: '1', title: 'New design uploaded', body: 'Someone commented on a task', time: '4 months ago', read: false, type: 'comment' },
  { id: '2', title: 'New avatar + cover requested', body: 'Someone commented on a task', time: '4 months ago', read: false, type: 'comment' },
  { id: '3', title: 'Lunar new year banners', body: 'Someone commented on a task', time: '4 months ago', read: true, type: 'comment' },
  { id: '4', title: 'New social frame requested', body: 'Someone commented on a task', time: '4 months ago', read: true, type: 'comment' },
  { id: '5', title: 'Banner for AD requested', body: 'Someone commented on a task', time: '4 months ago', read: true, type: 'comment' },
  { id: '6', title: 'You were mentioned in a task', body: 'KRIS mentioned you in a comment', time: '5 months ago', read: false, type: 'mention' },
]
