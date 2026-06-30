import { PartyPopper, Target, Megaphone, AlertTriangle, type LucideIcon } from 'lucide-vue-next'

export type AnnouncementType = 'holiday' | 'kpi' | 'general' | 'urgent'

interface AnnouncementTypeMeta {
  label: string
  icon: LucideIcon
  badgeClass: string
  iconWrapClass: string
}

export const announcementTypeMeta: Record<AnnouncementType, AnnouncementTypeMeta> = {
  holiday: {
    label: 'Holiday',
    icon: PartyPopper,
    badgeClass: 'bg-violet-500/15 text-violet-500',
    iconWrapClass: 'bg-violet-500/15 text-violet-500',
  },
  kpi: {
    label: 'KPI',
    icon: Target,
    badgeClass: 'bg-blue-500/15 text-blue-500',
    iconWrapClass: 'bg-blue-500/15 text-blue-500',
  },
  general: {
    label: 'General',
    icon: Megaphone,
    badgeClass: 'bg-emerald-500/15 text-emerald-500',
    iconWrapClass: 'bg-emerald-500/15 text-emerald-500',
  },
  urgent: {
    label: 'Urgent',
    icon: AlertTriangle,
    badgeClass: 'bg-red-500/15 text-red-500',
    iconWrapClass: 'bg-red-500/15 text-red-500',
  },
}

export function relativeTime(dateStr: string): string {
  const date = new Date(`${dateStr}T00:00:00`)
  const diffDays = Math.round((date.getTime() - new Date().setHours(0, 0, 0, 0)) / 86_400_000)
  if (diffDays === 0) return 'Today'
  if (diffDays === -1) return 'Yesterday'
  if (diffDays === 1) return 'Tomorrow'
  if (diffDays < 0) return `${Math.abs(diffDays)} days ago`
  return `In ${diffDays} days`
}
