import { createRouter, createWebHistory } from 'vue-router'
import {routes} from './routes.js'

const router = createRouter({
  mode: 'history',
  history: createWebHistory(),
  routes,
  linkActiveClass: "route-active",
  scrollBehavior(to) {
    if (to.hash) {
        return { el: to.hash }
    }else{
      window.scrollTo(0, 0);
    }
  },
})

export default router
