import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        { path: '', name: 'dashboard', component: () => import('@/pages/Dashboard.vue'), meta: { breadcrumb: ['Home'] } },
        {
          path: 'attendance',
          name: 'attendance',
          component: () => import('@/pages/attendance/Attendances.vue'),
          meta: { breadcrumb: ['Home', 'Attendances'] },
        },
        {
          path: 'attendance/report',
          name: 'attendance-report',
          component: () => import('@/pages/attendance/Report.vue'),
          meta: { breadcrumb: ['Home', 'Attendances', 'Report'] },
        },
        {
          path: 'attendance/breaks',
          name: 'attendance-breaks',
          component: () => import('@/pages/attendance/Breaks.vue'),
          meta: { breadcrumb: ['Home', 'Attendances', 'Breaks'] },
        },
        { path: 'kpi', name: 'kpi', component: () => import('@/pages/Kpi.vue'), meta: { breadcrumb: ['Home', 'Kpis'] } },
        { path: 'kpi/rule', name: 'kpi-rule', component: () => import('@/pages/kpi/Rule.vue'), meta: { breadcrumb: ['Home', 'Kpis', 'Rule'] } },
        { path: 'clock', name: 'clock', component: () => import('@/pages/Clock.vue'), meta: { breadcrumb: ['Home', 'Clock'] } },
        { path: 'tasks', name: 'tasks', component: () => import('@/pages/Tasks.vue'), meta: { breadcrumb: ['Home', 'Tasks'] } },
        {
          path: 'tasks/scores',
          name: 'tasks-scores',
          component: () => import('@/pages/TaskScores.vue'),
          meta: { breadcrumb: ['Home', 'Tasks', 'Reports'] },
        },
        { path: 'accounts', name: 'accounts', component: () => import('@/pages/Accounts.vue'), meta: { breadcrumb: ['Home', 'Accounts'] } },
        { path: 'knowledge', name: 'knowledge', component: () => import('@/pages/Knowledge.vue'), meta: { breadcrumb: ['Home', 'Knowledges'] } },
        {
          path: 'knowledge/archive/:category',
          name: 'knowledge-archive',
          component: () => import('@/pages/KnowledgeArchive.vue'),
          meta: { breadcrumb: ['Home', 'Knowledges', 'Archive'] },
        },
        { path: 'bookmarks', name: 'bookmarks', component: () => import('@/pages/Bookmarks.vue'), meta: { breadcrumb: ['Home', 'Bookmarks'] } },
        { path: 'announcements', name: 'announcements', component: () => import('@/pages/Announcements.vue'), meta: { breadcrumb: ['Home', 'Announcements'] } },
        { path: 'profile', name: 'profile', component: () => import('@/pages/Profile.vue'), meta: { breadcrumb: ['Home', 'Profile'] } },
      ],
    },
    { path: '/login', name: 'login', component: () => import('@/pages/Login.vue') },
    { path: '/casestudy', name: 'casestudy', component: () => import('@/pages/CaseStudy.vue') },
  ],
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.name !== 'login' && to.name !== 'casestudy' && !auth.isAuthenticated) {
    return { name: 'login' }
  }
  if (to.name === 'login' && auth.isAuthenticated) {
    return { path: '/' }
  }
})

export default router
