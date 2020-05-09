import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css/normalize.css' // CSS resets
import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css
import '@/assets/css/init.css'
import './icons' // icon

import Print from 'vue-print-nb' // 窗口打印pdf

// import * as filters from './filters' // global filters

import _ from 'lodash'

Vue.use(Element)
Vue.use(Print)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
