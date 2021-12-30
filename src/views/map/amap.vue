<template>
  <div class="page-wrp">
    <h2>amap</h2>
    <div id="amapContainer"></div>
    <div style="width: 300px">
      A-经度:<el-input v-model="Alng" placeholder=""></el-input>
      A-纬度:<el-input v-model="Alat" placeholder=""></el-input>
      B-经度:
      <el-input v-model="Blng" placeholder=""></el-input>
      B-纬度:
      <el-input v-model="Blat" placeholder=""></el-input>

      <el-button type="primary" @click="search">查询</el-button>
    </div>
  </div>
</template>

<script>
// module引入 方式
import { getAMapInstance, AMapCalcDistance } from './amapApi'
let startIcon = require('./img/location-A.png')
let endIcon = require('./img/location-B.png')
let pB = [113.675957, 34.867080] // 7356
let pA = [113.675957, 34.867080]

export default {
  data() {
    return {
      Alng: '',
      Alat: '',
      Blng: '',
      Blat: ''
    }
  },
  mounted() {
    this.initMap(pA, pB)
  },
  methods: {
    initMap(startPoint, endPoint) {
      let that = this
      getAMapInstance().then((AMap) => {
        // 初始化地图对象，加载地图
        var map = new AMap.Map('amapContainer', {
          // resizeEnable: false,
          zoom: 10
        })

        // 同时引入工具条插件，比例尺插件和鹰眼插件
        // AMap.plugin([
        //   'AMap.ToolBar',
        //   'AMap.Scale'
        // ], function() {
        //   // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
        //   map.addControl(new AMap.ToolBar())

        //   // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
        //   map.addControl(new AMap.Scale())
        // })

        var m1 = new AMap.Marker({
          map: map,
          title: '起点',
          position: new AMap.LngLat(startPoint[0], startPoint[1]),
          offset: new AMap.Pixel(-20, -40),
          icon: new AMap.Icon({
            size: new AMap.Size(40, 40),
            image: startIcon,
            imageSize: new AMap.Size(40, 40)
          })
        })
        var m2 = new AMap.Marker({
          map: map,
          title: '终点',
          position: new AMap.LngLat(endPoint[0], endPoint[1]),
          offset: new AMap.Pixel(-20, -40),
          icon: new AMap.Icon({
            size: new AMap.Size(40, 40),
            image: endIcon,
            imageSize: new AMap.Size(40, 40)
          })
        })
        map.setFitView()

        var line = new AMap.Polyline({
          strokeColor: '#d81e06',
          isOutline: true,
          outlineColor: 'white'
        })
        line.setMap(map)
        var text = new AMap.Text({
          text: '',
          style: {
            'background-color': '#d81e06',
            'border-color': '#e1f5fe',
            'font-size': '12px',
            color: '#fff'
          }
        })
        text.setMap(map)

        function computeDis() {
          var p1 = m1.getPosition()
          var p2 = m2.getPosition()
          var textPos = p1.divideBy(2).add(p2.divideBy(2))
          console.log('textPos', textPos)
          var distance = Math.round(p1.distance(p2)) // 2坐标点之间的距离
          var path = [p1, p2]
          line.setPath(path)
          text.setText('距离' + distance + '米')
          text.setPosition(textPos)
        }
        computeDis()

        /** ********************************* */

        map.on('click', async(e) => {
          let dealerPoint = startPoint
          let clickedPoint = [e.lnglat.getLng(), e.lnglat.getLat()]

          // let distance = Math.round(AMap.GeometryUtil.distance(dealerPoint, clickedPoint))
          var distance = that.distance ? that.distance : await AMapCalcDistance(dealerPoint, clickedPoint)
          console.log('点击了[ ' + e.lnglat.getLng() + ',' + e.lnglat.getLat() + ' ]')
          console.log('distance=', distance)
        })
      }).catch(e => {
        console.log(e)
      })
    },
    search() {
      let A = [Number(this.Alng), Number(this.Alat)]
      let B = [Number(this.Blng), Number(this.Blat)]

      console.log('A', A, Number(this.Alng))
      console.log('B', B)
      this.initMap(A, B)
    }
  }
}
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
