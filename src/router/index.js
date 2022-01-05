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
    meta: { title: '编辑器', icon: 'edit' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/editor/index'),
        name: 'Editor',
        meta: { title: '富文本编辑器', noCache: false }
      },
      {
        path: 'g6-flow-demo1',
        component: () => import('@/views/vue-editor-flow/index'),
        name: 'g6-flow-demo1',
        meta: { title: '流程图G6-1', noCache: false }
      },
      {
        path: 'g6-flow-demo2',
        component: () => import('@/views/vue-editor-flow/dagre1'),
        name: 'g6-flow-demo2',
        meta: { title: '流程图G6-2', noCache: false }
      },
      {
        path: 'jsplumb-demo1',
        component: () => import('@/views/easy-flow/index'),
        name: '流程图jsPlumb-1',
        meta: { title: '流程图jsPlumb-1', noCache: false }
      },
      {
        path: 'jsplumb-demo2',
        component: () => import('@/views/easy-flow/panel'),
        name: '流程图jsPlumb-2',
        meta: { title: '流程图-自定义节点', noCache: false }
      },
      {
        path: 'jsplumb-demo3',
        component: () => import('@/views/easy-flow/demo3'),
        name: '流程图jsPlumb-3',
        meta: { title: '树结构选节点', noCache: false }
      },
      {
        path: 'jsplumb-beta',
        component: () => import('@/views/easy-flow/demo4'),
        name: '原型版-beta',
        meta: { title: '两侧节点拖动流程图', noCache: false }
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
        meta: { title: 'drag-dialog', noCache: false }
      },
      {
        path: 'drag-kanban',
        component: () => import('@/views/drag/drag-kanban'),
        name: 'drag-kanban',
        meta: { title: '拖拽看板', noCache: false }
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
    component: Layout,
    meta: { title: '打印', icon: 'print' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/print'),
        name: 'print',
        meta: { title: '打印pdf' }
      },
      {
        path: 'signiture',
        component: () => import('@/views/print/signiture'),
        name: 'signiture',
        meta: { title: '手写签名' }
      },
      {
        path: 'print-pdf',
        component: () => import('@/views/print/pdf'),
        name: 'print-pdf',
        meta: { title: '预览文件&下载base64' }
      },
      {
        path: 'preview-pdf',
        component: () => import('@/views/print/detail'),
        name: 'preview-pdf',
        meta: { title: '预览PDF&下载' }
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
      },
      {
        path: '/easyTable',
        component: () => import('@/views/table/easyTable'),
        name: 'easyTable',
        meta: { title: 'easyTable' }
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
        path: '/bim',
        component: () => import('@/views/bim/index'),
        name: 'bim',
        meta: { title: 'bim预览' }
      }
      // {
      //   path: '/leaflet-static',
      //   component: () => import('@/views/leaflet/indexStatic'),
      //   name: 'leaflet',
      //   meta: { title: 'leaflet静态图片缩放标记' }
      // },
      // {
      //   path: '/leaflet-demo',
      //   component: () => import('@/views/leafletDemo/index'),
      //   name: 'leaflet',
      //   meta: { title: 'leaflet动态' }
      // },
      // {
      //   path: '/leaflet-map',
      //   component: () => import('@/views/leaflet/mapshow'),
      //   name: 'leaflet',
      //   meta: { title: 'leafletmap' }
      // }
    ]
  },
  {
    path: '/scroll',
    component: Layout,
    meta: { title: 'scroll', icon: 'example' },
    children: [
      {
        path: '',
        component: () => import('@/views/scroll'),
        name: 'scroll',
        meta: { title: 'better-scroll' }
      }
    ]
  },
  {
    path: '/map',
    component: Layout,
    meta: { title: '地图', icon: 'nested' },
    children: [
      {
        path: 'amap',
        component: () => import('@/views/map/amap'),
        name: 'amap',
        meta: { title: '高德地图Icon' }
      },
      {
        path: 'vue-baidumap',
        component: () => import('@/views/echartExample/vue-baidumap'),
        name: 'vue-baidu-map',
        meta: { title: 'vue-baidu-map' }
      }
    ]
  },
  {
    path: '/custom-components',
    component: Layout,
    meta: { title: '自定义组件', icon: 'component' },
    children: [
      {
        path: 'loading',
        component: () => import('@/views/customComponents/loading'),
        name: 'loading',
        meta: { title: '自定义loading' }
      }
    ]
  },
  {
    path: '/echartExample',
    component: Layout,
    meta: { title: 'echarts', icon: 'chart' },
    children: [
      {
        path: '/customPie',
        component: () => import('@/views/charts/index'),
        name: '样例',
        meta: { title: '样例' }
      },
      {
        path: '/echart-liquid',
        component: () => import('@/views/echarts-liquid'),
        name: '水球图',
        meta: { title: '水球图' }
      },
      {
        path: 'chinaMap',
        component: () => import('@/views/echartExample/chinaMap'),
        name: '中国地图',
        meta: { title: '中国地图' }
      },
      // {
      //   path: '/datascreen',
      //   component: () => import('@/views/dataScreen'),
      //   name: '大屏可视化',
      //   meta: { title: '大屏可视化' }
      // },
      {
        path: '/pieCircle',
        component: () => import('@/views/charts/pieCircle'),
        name: '圆环饼图',
        meta: { title: '圆环饼图' }
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
