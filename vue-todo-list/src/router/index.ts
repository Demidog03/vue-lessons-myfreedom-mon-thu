import Page1 from '@/pages/Page1.vue'
import Page2 from '@/pages/Page2.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/page1',
    //   component: Page1
    // },
    // {
    //   path: '/page2',
    //   component: Page2
    // }
  ],
})

export default router
