import './waves.css'
const context = '@@wavesContext'
/**
 * 总结：
 * 添加波纹效果就是给元素添加一个设置好的类名 .waves-ripple
 * 波纹位置及颜色可以自定义，默认中心 颜色
 */
// 引入波纹样式
function handleClick(el, binding) {
  // 点击时触发的函数
  function handle(e) {
    // 自定义选项
    const customOpts = Object.assign({}, binding.value)
    // 默认设置项合并自定义选项
    const opts = Object.assign({
      ele: el, // 波纹作用元素
      type: 'hit', // 点击位置扩散center中心扩展
      color: 'rgba(0, 0, 0, 0.15)' // 波纹颜色
    }, customOpts)

    const target = opts.ele
    if (target) {
      // 添加波纹样式
      target.style.position = 'relative'
      target.style.overflow = 'hidden'
      const rect = target.getBoundingClientRect() // 获取元素的最终样式 {}
      // 判断是否已经有波纹样式
      let ripple = document.querySelector('.waves-ripple')
      if (!ripple) {
        console.log('没有')
        // 创建span并添加.waves-ripple类名
        ripple = document.createElement('span')
        ripple.className = 'waves-ripple'
        // 宽高 取按钮宽高中大的一个
        ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px'
        target.appendChild(ripple)
      } else {
        console.log('存在样式')
        ripple.className = 'waves-ripple'
      }

      // 设置波纹的位置 默认中心
      switch (opts.type) {
        case 'center':
          ripple.style.top = rect.height / 2 - ripple.offsetHeight / 2 + 'px'
          ripple.style.left = rect.width / 2 - ripple.offsetWidth / 2 + 'px'
          break
        default:
          // 自定义
          ripple.style.top =
            (e.pageY - rect.top - ripple.offsetHeight / 2 - document.documentElement.scrollTop ||
              document.body.scrollTop) + 'px'
          ripple.style.left =
            (e.pageX - rect.left - ripple.offsetWidth / 2 - document.documentElement.scrollLeft ||
              document.body.scrollLeft) + 'px'
      }
      // 波纹颜色
      ripple.style.backgroundColor = opts.color
      // 添加激活类名
      ripple.className = 'waves-ripple z-active'
      return false
    }
  }

  if (!el[context]) {
    el[context] = {
      removeHandle: handle
    }
  } else {
    el[context].removeHandle = handle
  }

  return handle
}
export default {
  bind(el, binding) {
    el.addEventListener('click', handleClick(el, binding), false)
  },
  update(el, binding) {
    // 先移除旧的再添加
    el.removeEventListener('click', el[context].removeEventListener, false)
    el.addEventListener('click', handleClick(el, binding), false)
  },
  unbind(el, binding) {
    el.removeEventListener('click', el[context].removeEventListener, false)
    el[context] = null
    delete el[context]
  }
}
