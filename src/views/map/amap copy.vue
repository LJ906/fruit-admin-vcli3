<template>
  <div class="page-wrp">
    <h2>amap</h2>
    <div id="amapContainer"></div>
  </div>
</template>

<script>
// scipt引入方式
// import AMap from 'AMap'
// import amapApi from '@/views/map/amapApi'
// let startIcon = require('./img/location-A.png')
// let endIcon = require('./img/location-B.png')
// let position5 = { lng: 116.488848, lat: 39.993007 } // 司法局
// let position2 = { lng: 116.484778, lat: 39.993204 } // 龙门瑜伽
// let p1 = { lng: 117.200688, lat: 39.087398 } // 天津

// export default {
//   mounted() {
//     this.initMap(position5, p1)
//   },
//   methods: {
//     initMap(startPoint, endPoint) {
//       let that = this
//       // 初始化地图对象，加载地图
//       var map = new AMap.Map('amapContainer', {
//         // resizeEnable: false,
//         zoom: 10
//       })

//       // // 同时引入工具条插件，比例尺插件和鹰眼插件
//       // AMap.plugin([
//       //   'AMap.ToolBar',
//       //   'AMap.Scale'
//       // ], function() {
//       //   // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
//       //   map.addControl(new AMap.ToolBar())

//       //   // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
//       //   map.addControl(new AMap.Scale())
//       // })

//       var m1 = new AMap.Marker({
//         map: map,
//         title: '起点',
//         position: new AMap.LngLat(startPoint.lng, startPoint.lat),
//         offset: new AMap.Pixel(-20, -40),
//         icon: new AMap.Icon({
//           size: new AMap.Size(40, 40),
//           image: startIcon,
//           imageSize: new AMap.Size(40, 40)
//         })
//       })
//       var m2 = new AMap.Marker({
//         map: map,
//         title: '终点',
//         position: new AMap.LngLat(endPoint.lng, endPoint.lat),
//         offset: new AMap.Pixel(-20, -40),
//         icon: new AMap.Icon({
//           size: new AMap.Size(40, 40),
//           image: endIcon,
//           imageSize: new AMap.Size(40, 40)
//         })
//       })
//       map.setFitView()

//       var line = new AMap.Polyline({
//         strokeColor: '#d81e06',
//         isOutline: true,
//         outlineColor: 'white'
//       })
//       line.setMap(map)
//       var text = new AMap.Text({
//         text: '',
//         style: {
//           'background-color': '#d81e06',
//           'border-color': '#e1f5fe',
//           'font-size': '12px',
//           color: '#fff'
//         }
//       })
//       text.setMap(map)

//       function computeDis() {
//         var p1 = m1.getPosition()
//         var p2 = m2.getPosition()
//         var textPos = p1.divideBy(2).add(p2.divideBy(2))
//         console.log('textPos', textPos)
//         var distance = Math.round(p1.distance(p2)) // 2坐标点之间的距离
//         var path = [p1, p2]
//         line.setPath(path)
//         text.setText('距离' + distance + '米')
//         text.setPosition(textPos)
//       }
//       computeDis()

//       map.on('click', function (e) {
//         let startPoint = [position5.lng, position5.lat]
//         let clickedPoint = [e.lnglat.getLng(), e.lnglat.getLat()]
//         console.log('点击了[ ' + e.lnglat.getLng() + ',' + e.lnglat.getLat() + ' ]')
//         that.calcDistance(startPoint, clickedPoint)
//       })
//     },
//     /**
//      * 计算 2点之间的距离
//      * params  {p1 | p2} 格式 为[116.434027, 39.941037]
//      */
//     calcDistance(p1, p2) {
//       // let distance = Math.round(AMap.GeometryUtil.distance(p1, p2))
//       let distance = amapApi.calcDistance(p1, p2)
//       console.log('distance=', distance)
//     },
//     converFrom(array, type) {
//       AMap.convertFrom(array, type, function(status, result) {

//       })
//     }
//   }
// }
</script>

<style lang="scss" scoped>
#amapContainer {
  width: 100%;
  height: 600px;
  /deep/.amap-logo,
  /deep/.amap-copyright {
    display: none !important;
  }
}
</style>
