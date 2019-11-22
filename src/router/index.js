import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout'

/**
 * // 默认 路径写到跟菜单上， 子菜单沿用根菜单上的路径地址故不用以/开头
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/charts/barchart'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/charts',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Charts',
    meta: {
      title: 'Charts',
      icon: 'chart'
    },
    children: [
      {
        path: 'bar-chart',
        component: () => import(/* webpackChunkName: "charts" */ '@/views/charts/barchart'),
        name: 'MixCbarCharthart',
        meta: { title: '柱状图', noCache: true }
      },
      {
        path: 'col-chart',
        component: () => import('@/views/charts/columnChart'),
        name: 'columnChart',
        meta: { title: 'columnChart', noCache: true }
      },
      {
        path: 'line-chart',
        component: () => import('@/views/charts/lineCharts'),
        name: 'lineCharts',
        meta: { title: 'lineCharts', noCache: true }
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '*',
    redirect: '/404'
  }
]

Vue.use(VueRouter)
const router = new VueRouter({
  routes
})

export default router
