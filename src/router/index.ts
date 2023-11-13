import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import { isUserLoggedIn } from './utils'
import allUser from '@/pages/id/[id].vue'
import allUserTab from '@/pages/tab/[tab].vue'
import routes from '~pages'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'allUser-id',
      path: '/allUser/view/:id',
      component: allUser,

    },
    {
      name: 'allUser-tab',
      path: '/allUser/view/:selectedUsers*',
      component: allUserTab,

    },

    ...setupLayouts(routes),
  ],
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = isUserLoggedIn()

  if (!isLoggedIn && to.name !== 'login')
    next({ name: 'login', query: { to: to.name !== 'index' ? to.fullPath : undefined } })

  else if (isLoggedIn && from.query.to && to.fullPath !== from.query.to)
    next({ path: from.query.to as string })

  else if (to.name === 'login' && isLoggedIn)
    next({ name: 'index' })

  else
    next()
})

export default router
