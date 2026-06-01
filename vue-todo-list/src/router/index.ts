import TasksDetailsPage from '@/pages/tasks-details/TasksDetailsPage.vue'
import TasksPage from '@/pages/tasks/TasksPage.vue'
import TestPage from '@/pages/test/TestPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/tasks'
    },
    {
      path: '/tasks',
      component: TasksPage
    },
    {
      path: '/tasks/:id', // /:id => динамический роут
      component: TasksDetailsPage
    },
    {
      path: '/test',
      component: TestPage
    }
  ],
})

export default router
