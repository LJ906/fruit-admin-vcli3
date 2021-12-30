import html2Canvas from 'html2canvas'
// import JsPDF from 'jspdf'

export default {
  install(Vue, options) {
    Vue.prototype.html2Img = function(idStr, title) {
      return new Promise((resolve, reject) => {
        html2Canvas(document.querySelector('#' + idStr), {
          // allowTaint: true,
          useCORS: true,
          logging: false
          // scale: 2, // 提升画面质量，但是会增加文件大小
        }).then((canvas) => {
          // const contentWidth = canvas.width
          // const contentHeight = canvas.height
          // // 一页pdf显示html页面生成的canvas高度;
          // const pageHeight = contentWidth / 592.28 * 841.89
          // // 生成pdf的html页面高度
          // let leftHeight = contentHeight
          // // 页面偏移
          // let position = 0
          // // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
          // const imgWidth = 595.28
          // const imgHeight = 592.28 / contentWidth * contentHeight
          // // canvas.crossOrigin="anonymous";
          const pageData = canvas.toDataURL('image/jpeg', 1.0)

          // const PDF = new JsPDF('', 'pt', 'a4')
          // // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
          // // 当内容未超过pdf一页显示的范围，无需分页
          // if (leftHeight < pageHeight) {
          //   PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
          // } else {
          //   while (leftHeight > 0) {
          //     PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
          //     leftHeight -= pageHeight
          //     position -= 841.89
          //     if (leftHeight > 0) {
          //       // 避免添加空白页
          //       PDF.addPage()
          //     }
          //   }
          // }
          // PDF.save(title + '.pdf')

          resolve(pageData)
        })
      })
    }
  }
}
