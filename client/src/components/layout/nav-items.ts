import {
  LayoutDashboard,
  Clock,
  Target,
  ListChecks,
  Users,
  BookOpen,
  Bookmark,
  type LucideIcon,
} from 'lucide-vue-next'

export interface NavChild {
  label: string
  to: string
}

export interface NavItem {
  label: string
  to?: string
  icon: LucideIcon
  children?: NavChild[]
}

export interface NavGroup {
  label: string
  items: NavItem[]
}

export const navGroups: NavGroup[] = [
  {
    label: 'Overview',
    items: [{ label: 'Dashboard', to: '/', icon: LayoutDashboard }],
  },
  {
    label: 'Workforce',
    items: [
      {
        label: 'Attendance',
        icon: Clock,
        children: [
          { label: 'Attendances', to: '/attendance' },
          { label: 'Report', to: '/attendance/report' },
          { label: 'Breaks', to: '/attendance/breaks' },
        ],
      },
      {
        label: 'Kpi',
        icon: Target,
        children: [
          { label: 'Kpi', to: '/kpi' },
          { label: 'KPI report', to: '/kpi/report' },
          { label: 'KPI rule', to: '/kpi/rule' },
          { label: 'Category', to: '/kpi/category' },
        ],
      },
      {
        label: 'Tasks',
        icon: ListChecks,
        children: [
          { label: 'Task', to: '/tasks' },
          { label: 'Scores', to: '/tasks/scores' },
        ],
      },
      {
        label: 'Accounts',
        icon: Users,
        children: [{ label: 'Account', to: '/accounts' }],
      },
    ],
  },
  {
    label: 'Resources',
    items: [
      {
        label: 'Knowledges',
        icon: BookOpen,
        children: [{ label: 'Knowledge', to: '/knowledge' }],
      },
      {
        label: 'Bookmarks',
        icon: Bookmark,
        children: [{ label: 'Bookmark', to: '/bookmarks' }],
      },
    ],
  },
]
