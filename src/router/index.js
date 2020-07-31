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
    meta: { title: '编辑器', icon: 'example' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/editor/index'),
        name: 'Editor',
        meta: { title: '富文本编辑器', noCache: true }
      },
      {
        path: 'g6-flow-demo1',
        component: () => import('@/views/vue-editor-flow/index'),
        name: 'g6-flow-demo1',
        meta: { title: '流程图G6-1', noCache: true }
      },
      {
        path: 'g6-flow-demo2',
        component: () => import('@/views/vue-editor-flow/dagre1'),
        name: 'g6-flow-demo2',
        meta: { title: '流程图G6-2', noCache: true }
      },
      {
        path: 'jsplumb-demo1',
        component: () => import('@/views/easy-flow/index'),
        name: '流程图jsPlumb-1',
        meta: { title: '流程图jsPlumb-1', noCache: true }
      },
      {
        path: 'jsplumb-demo2',
        component: () => import('@/views/easy-flow/panel'),
        name: '流程图jsPlumb-2',
        meta: { title: '流程图-自定义节点', noCache: true }
      },
      {
        path: 'jsplumb-demo3',
        component: () => import('@/views/easy-flow/demo3'),
        name: '流程图jsPlumb-3',
        meta: { title: '树结构选节点', noCache: true }
      },
      {
        path: 'jsplumb-beta',
        component: () => import('@/views/easy-flow/demo4'),
        name: '原型版-beta',
        meta: { title: '两侧节点拖动流程图', noCache: true }
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
        hidden: true,
        component: () => import('@/views/transition-demo/transition-button'),
        name: 'transition-btn',
        meta: { title: '按钮动画' }
      },
      {
        path: 'back-to-top',
        hidden: true,
        component: () => import('@/views/transition-demo/back-to-top'),
        name: 'ack-to-top',
        meta: { title: '返回顶部' }
      }
    ]
  },
  {
    path: '/print',
    // redirect: 'transition/index',
    component: Layout,
    meta: { title: '打印', icon: 'print' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/print'),
        name: 'print',
        meta: { title: '打印pdf' }
      }
    ]
  },
  {
    path: '/table',
    component: Layout,
    meta: { title: '表格', icon: 'table' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/table/dynamicColumn'),
        name: 'dynamicColumn',
        meta: { title: '动态列表格' }
      }
    ]
  },
  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    alwaysShow: true,
    name: 'Zip',
    meta: { title: 'Zip', icon: 'zip' },
    children: [
      {
        path: 'download',
        component: () => import('@/views/zip/index'),
        name: 'ExportZip',
        meta: { title: 'Export Zip' }
      },
      {
        path: 'excel',
        component: () => import('@/views/excel/export-excel'),
        name: 'ExportExcel',
        meta: { title: 'ExportExcel' }
      }
    ]
  },
  {
    path: '/scale',
    component: Layout,
    alwaysShow: true,
    name: 'Zip',
    meta: { title: '图片缩放', icon: 'drag' },
    children: [
      {
        path: '',
        component: () => import('@/views/suofang/index'),
        name: 'scale',
        meta: { title: '图片缩放' }
      },
      {
        path: '/bim',
        component: () => import('@/views/bim/index'),
        name: 'bim',
        meta: { title: 'bim预览' }
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
