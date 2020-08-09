<template>
  <div>
    <h2>this.$loading.fullScreen('加载中...')</h2>
    <el-button type="primary" @click="showloading">显示loading</el-button>
  </div>
</template>

<script>
import Vue from 'vue'
import FullScreenLoading from './FullscreenLoading'
Vue.use(FullScreenLoading)

export default {
  methods: {
    showloading() {
      // 返回值hide是一个方法， 方法调用移除 loading
      const hide = this.$loading.fullScreen('加载中...')
      setTimeout((_) => {
        hide()
      }, 3000)
    }
  }
}
</script>
