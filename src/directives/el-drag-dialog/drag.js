export default {
  bind(el, binding, vnode) {
    // 鼠标放到dialogHeader 时生效
    const dialogHeaderEl = el.querySelector('.el-dialog__header') // 拖动的元素
    const dragDom = el.querySelector('.el-dialog') // 要动的元素
    dialogHeaderEl.style.cssText += ';cursor:move;'
    dragDom.style.cssText += ';top:0px;'

    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const getStyle = (function() {
      if (window.document.currentStyle) {
        return (dom, attr) => dom.currentStyle[attr]
      } else {
        return (dom, attr) => getComputedStyle(dom, false)[attr]
      }
    })()
    // 鼠标事件 onmousedown （鼠标坐标 — 鼠标到盒子的坐标 = 盒子坐标）
    // 鼠标落下 获取到所有数据的值
    dialogHeaderEl.onmousedown = (e) => {
      console.log('e-onmousedown', e)
      // 鼠标到盒子的坐标
      const disX = e.clientX - dialogHeaderEl.offsetLeft
      const disY = e.clientY - dialogHeaderEl.offsetTop
      // dialog的宽度 高度
      const dragDomWidth = dragDom.offsetWidth
      const dragDomHeight = dragDom.offsetHeight
      // 屏幕的宽度 高度
      const screenWidth = document.body.clientWidth
      const screenHeight = document.body.clientHeight
      // dialog 可以移动的最大 最小宽度
      const minDragDomLeft = dragDom.offsetLeft
      const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth
      const minDragDomTop = dragDom.offsetTop
      const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomHeight

      // 获取移动元素的实际 left top
      let styL = getStyle(dragDom, 'left')
      let styT = getStyle(dragDom, 'top')
      // 获取到的值带px 正则匹配替换
      if (styL.includes('%')) {
        styL = +document.body.clientWidth * (styL.replace(/\%/g, '') / 100)
        styT = +document.body.clientTop * (styT.replace(/\%/g, '') / 100)
      } else {
        styL = +styL.replace(/\px/g, '')
        styT = +styT.replace(/\px/g, '')
      }
      // document 的 onmousemove 鼠标的坐标 - 鼠标在盒子的坐标 = 盒子的坐标
      document.onmousemove = (e) => {
        console.log('e-onmousemove', e)
        // 通过事件委托，计算移动的距离
        let left = e.clientX - disX
        let top = e.clientY - disY

        // 边界处理
        if (-(left) > minDragDomLeft) {
          left = -minDragDomLeft
        } else if (left > maxDragDomLeft) {
          left = maxDragDomLeft
        }
        if (-(top) > minDragDomTop) {
          top = -minDragDomTop
        } else if (top > maxDragDomTop) {
          top = maxDragDomTop
        }

        // 移动当前元素
        console.log('left,', left, 'top=', top)
        console.log('left,', left + styL, 'top=', top + styT)
        dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`

        // emit onDrag event
        vnode.child.$emit('dragDialog')
      }
      // onmouseup
      document.onmouseup = (e) => {
        console.log('e-onmouseup', e)
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
}
