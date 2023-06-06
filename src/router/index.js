import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/records',
    name: 'records',
    component: () => import(/* webpackChunkName: "about" */ '../views/RecordsView.vue')
  },
  {
    path: '/calculator',
    name: 'calculator',
    component: () => import(/* webpackChunkName: "about" */ '../views/CalculatorView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !store.getters.getIsAuthenticated() ) next({ name: 'login' })
  else next()
})

export default router
