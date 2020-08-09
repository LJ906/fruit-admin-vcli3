
import './fullscreenLoading.css'
const loadingPlugin = {
  install(vm) {
    if (vm) {
      // 创建一个vue子类
      const LoadingComponent = vm.extend({
        template: '<div id="loading-wrapper">{{msg}}</div>',
        props: {
          msg: {
            type: String,
            default: 'loading'
          }
        }
      })
      /* eslint-disable */
      function FullScreenLoading(msg) {
        let loadingWrap = document.getElementById('loading-wrapper')
        if (!loadingWrap) {
          const div = document.createElement('div')
          div.setAttribute('id', 'loading-wrapper')
          document.body.append(div)
        }
        new LoadingComponent({
          props: {
            msg: {
              type: String,
              default: msg
            },
          },
        }).$mount('#loading-wrapper')
        return () => {
          document.body.removeChild(document.getElementById('loading-wrapper'))
        }
      }

      // Loading 挂载到vue原型上
      vm.prototype.$loading.fullScreen = FullScreenLoading
    }
  },
}

export default loadingPlugin