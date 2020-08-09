// 已自定义插件的形式 模拟vuex的实现原理
function registerPlugin(Vue) {
  const vuex = {}
  vuex._vm = new Vue({
    data: {
      message: 'hello'
    }
  })

  vuex.state = vuex._vm
  vuex.mutations = {
    setMessage(val) {
      vuex.state.message = val
    }
  }

  function init() {
    this.$store = vuex
  }

  Vue.mixin({
    beforeCreate: init
  })
}

export default registerPlugin
