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

import Print from 'vue-print-nb' // 窗口打印pdf

// import * as filters from './filters' // global filters

import _ from 'lodash'

// swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
// bim3d模型预览 cad预览
import wlBimViewer from 'wl-bim-viewer'
import 'wl-bim-viewer/lib/wl-bim-viewer.css'
Vue.use(wlBimViewer)

Vue.use(Element)
Vue.use(Print)
Vue.use(VueAwesomeSwiper)

Vue.prototype.$_ = _
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
