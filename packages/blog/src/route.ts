import { createRouter, createWebHistory } from 'vue-router'
import Eat from './views/Eat/index.vue'
import Tools from './views/tools/index.vue'
import Index from './views/Index.vue'

const routes = [
  { path: '/', component: Index },
  { path: '/eat', component: Eat },
  { path: '/tools', component: Tools },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
