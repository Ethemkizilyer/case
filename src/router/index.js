import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Favorites from '../views/Favorites.vue'
import { useFavorites } from '../stores/counter'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: Favorites
    },
    {
      path: '/movies/:id',
      component: () => import('../views/Detail.vue')
    }
  ]
})

router.beforeEach(() => {
  useFavorites().handleStorage()
  window.scrollTo(0, 0)
})

export default router
