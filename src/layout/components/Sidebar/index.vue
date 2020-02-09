<template>
  <div :class="{'has-logo':showLogo}">
    <!-- <logo v-if="showLogo" :collapse="isCollapse" /> -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem },
  data() {
    return {
      menuList: [
        {
          path: '/charts',
          // component: Layout,
          redirect: 'noRedirect',
          name: 'Charts',
          meta: {
            title: 'Charts',
            icon: 'chart'
          },
          children: [
            {
              path: 'keyboard',
              // component: () => import('@/views/charts/keyboard'),
              name: 'KeyboardChart',
              meta: { title: 'Keyboard Chart', noCache: true }
            },
            {
              path: 'line',
              // component: () => import('@/views/charts/line'),
              name: 'LineChart',
              meta: { title: 'Line Chart', noCache: true }
            },
            {
              path: 'mix-chart',
              // component: () => import('@/views/charts/mix-chart'),
              name: 'MixChart',
              meta: { title: 'Mix Chart', noCache: true }
            }
          ]
        },
        {
          path: '/charts2',
          // component: Layout,
          redirect: 'noRedirect',
          name: 'Charts',
          meta: {
            title: 'Charts2',
            icon: 'chart'
          },
          children: [
            {
              path: 'keyboard',
              // component: () => import('@/views/charts/keyboard'),
              name: 'KeyboardChart',
              meta: { title: 'Keyboard Chart', noCache: true }
            },
            {
              path: 'line',
              // component: () => import('@/views/charts/line'),
              name: 'LineChart',
              meta: { title: 'Line Chart', noCache: true }
            },
            {
              path: 'mix-chart',
              // component: () => import('@/views/charts/mix-chart'),
              name: 'MixChart',
              meta: { title: 'Mix Chart', noCache: true }
            }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar' // 记录在vuex的侧边栏的状态
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  mounted() {
    this.$store.dispatch('permission/generateRoutes', ['admin'], { root: true })
  }
}
</script>
