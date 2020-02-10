import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/layout'

Vue.use(Router)

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/editor',
    redirect: '/editor/index',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/editor/index'),
        name: 'Editor',
        meta: { title: '富文本编辑器', icon: 'example', noCache: true }
      }
    ]
  },
  {
    path: '/drag',
    redirect: '/drag/index',
    meta: { title: 'drag', icon: 'drag' },
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/drag/drag-dialog'),
        name: 'drag-dialog',
        meta: { title: 'drag-dialog', noCache: true }
      },
      {
        path: 'drag-kanban',
        component: () => import('@/views/drag/drag-kanban'),
        name: 'drag-kanban',
        meta: { title: '拖拽看板', noCache: true }
      }
    ]
  },
  {
    path: '/transition',
    redirect: 'transition/index',
    component: Layout,
    meta: { title: '组件动画', icon: 'component' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/transition-demo/transition-button'),
        name: 'transition-btn',
        meta: { title: '按钮动画' }
      },
      {
        path: 'back-to-top',
        component: () => import('@/views/transition-demo/back-to-top'),
        name: 'ack-to-top',
        meta: { title: '返回顶部' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

router.addRoutes(asyncRoutes)
export default router
