import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css/normalize.css' // CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

// import axios from 'axios'
import '@/styles/index.scss' // global css
import '@/assets/css/init.css'
import './icons' // icon

// import $ from 'jquery'
// 引入vue-easytable
import 'vue-easytable/libs/theme-default/index.css'
import VueEasytable from 'vue-easytable'

// 窗口打印pdf
import Print from 'vue-print-nb'

// import * as filters from './filters'
import _ from 'lodash'

import VCharts from 'v-charts'
import VueCountTo from './components/VueCountTo/vue-countTo'
// swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

// bim3d模型预览 cad预览
import wlBimViewer from 'wl-bim-viewer'
import 'wl-bim-viewer/lib/wl-bim-viewer.css'

// html 转PDF
import htmlToPdf from '@/components/htmlToPdf.js'

// 手写签名
import SignCanvas from 'sign-canvas'

// 引入高德地图vue-amap
// import VueAMap from 'vue-amap'

Vue.component('CountTo', VueCountTo)
Vue.use(SignCanvas)
Vue.use(htmlToPdf)
Vue.use(wlBimViewer)
Vue.use(VCharts)
Vue.use(Element)
Vue.use(Print)
Vue.use(VueAwesomeSwiper)
Vue.use(VueEasytable)

// 高德地图
// Vue.use(VueAMap)
// // 初始化vue-amap
// VueAMap.initAMapApiLoader({
//   key: 'Y7f82cd2bbf4e3762d4e9e8610beae464',
//   plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
//   v: '1.4.4',
//   uiVersion: '1.0.11'
// })

Vue.prototype.$_ = _
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
