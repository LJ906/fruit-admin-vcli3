<template>
  <div>
    <baidu-map
      ref="myBaidumap"
      :style="{ width: map.width, height: map.height, margin: '0 auto' }"
      class="map"
      ak="G1LFyjrNGIkns5OfpZnrCGAKxpycPLwb"
      :zoom="map.zoom"
      :center="{ lng: map.center.lng, lat: map.center.lat }"
      @ready="handler"
      :scroll-wheel-zoom="true"
      @zoomstart="onZoomStart"
      @zoomend="onZoomEnd"
      @click="onClickMap"
      :auto-resize="true"
    >
      <!--比例尺控件-->
      <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
      <!--缩放控件-->
      <bm-navigation
        anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
        showZoomInfo
      ></bm-navigation>
      <!--聚合动态添加的点坐标-->
      <bm-marker-clusterer :averageCenter="true">
        <bm-marker :position="startMark" :top="true" @click="onClickStartPoint">
          <bm-label content="起" :label-style="labelStyle" />
        </bm-marker>
        <bm-marker :position="endMark" :top="true" @click="onClickEndPoint">
          <bm-label content="终" :label-style="labelStyle" />
        </bm-marker>
      </bm-marker-clusterer>
      <!-- 连线 -->
      <bm-polyline
        :path="[startMark, endMark]"
        stroke-color="red"
        :stroke-opacity="0.5"
        :stroke-weight="2"
        strokeStyle="dashed"
      >
      </bm-polyline>
      <!-- 标签 -->
      <bm-label
        ref="myBmlabel"
        :position="showDistanceMark"
        :content="distance + '米'"
        :label-style="distanceLabel"
      />
      <!--信息窗体-->
      <bm-info-window
        :position="{ lng: infoWindow.info.lng, lat: infoWindow.info.lat }"
        :title="infoWindow.info.name"
        :show="infoWindow.show"
      >
        <p>
          <!-- @close="infoWindowClose"
          @open="infoWindowOpen" -->
          <span class="left">{{ infoWindow.name }}</span>
          <span class="right">{{ infoWindow.address }}</span>
        </p>
      </bm-info-window>
    </baidu-map>
  </div>
</template>
<script>
// 百度地图
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import BmScale from 'vue-baidu-map/components/controls/Scale'
import BmNavigation from 'vue-baidu-map/components/controls/Navigation'
import BmMarkerClusterer from 'vue-baidu-map/components/extra/MarkerClusterer'
import BmMarker from 'vue-baidu-map/components/overlays/Marker'
import BmInfoWindow from 'vue-baidu-map/components/overlays/InfoWindow'
import BmPolyline from 'vue-baidu-map/components/overlays/Polyline'
import BmLabel from 'vue-baidu-map/components/overlays/Label'
let startIcon = require('./img/start_icon.png')
let endIcon = require('./img/end_icon.png')

let position1 = { lng: 116.489195, lat: 39.993592 } // 大众
let position2 = { lng: 116.488297, lat: 39.992348 } // 龙门瑜伽
let position3 = { lng: 116.486051, lat: 39.993958 } // 国际竹藤中心
let position4 = { lng: 116.488557, lat: 39.990403 } // 望京南地铁站

export default {
  components: {
    BaiduMap,
    BmScale,
    BmNavigation,
    BmMarkerClusterer,
    BmMarker,
    BmLabel,
    BmPolyline,
    BmInfoWindow
  },
  data() {
    return {
      labelStyle: {
        color: '#fff',
        fontSize: '12px',
        background: 'transparent',
        border: 'none',
        paddingLeft: '3px'
      },

      distanceLabel: {
        color: 'red', fontSize: '14px', border: 'none'
      },
      distance: '500',
      map: {
        center: { lng: 116.488261, lat: 39.992866 }, // = showDistanceMark 后续可以使用2个经纬度 的中间值
        zoom: 18,
        minZoom: 20,
        maxZoom: 40,
        width: '80%',
        height: '600px'
      },
      startMark: { lng: 116.489195, lat: 39.993592 }, // 大众
      endMark: { lng: 116.488297, lat: 39.992348 }, // 龙门瑜伽

      showDistanceMark: { lng: 116.488261, lat: 39.992866 },
      startIcon: startIcon,
      endIcon: endIcon,
      infoWindow: {
        info: {
          lng: '0',
          lat: '0',
          name: '起点地址'
        },
        show: false,
        address: ''
      }
    }
  },
  mounted() {

  },
  methods: {
    // 地图初始化
    handler({ BMap, map }) {
      // BMap为 实例， 调用handler以后就可以用 new BMap()等方法了
      // 获取 起始点坐标
      this.startMark = position1
      this.endMark = position3 // 国际竹藤中心

      let centerLng = (Number(this.startMark.lng) + Number(this.endMark.lng)) / 2
      let centerlat = (Number(this.startMark.lat) + Number(this.endMark.lat)) / 2

      this.map.center.lng = Number(centerLng.toFixed(6))
      this.map.center.lat = Number(centerlat.toFixed(6))

      // this.map.zoom = 20

      this.showDistanceMark.lng = this.map.center.lng
      this.showDistanceMark.lat = this.map.center.lat
      this.distance = '1000'

      // this.$refs.myBmlabel && this.$refs.myBmlabel.load()
    },
    onClickMap({ type, target, point, pixel, overlay }) {
      // console.log('onClickMap-type', type)
      console.log('onClickMap-target', target)
      // console.log('onClickMap-point', point)
      // console.log('onClickMap-pixel', pixel)
      // console.log('onClickMap-overlay', overlay)
    },
    onZoomStart({ type, target }) {
      // console.log('type', type)
      // console.log('target', target)
    },
    onZoomEnd({ type, target }) {
      // console.log('type-end', type)
      // console.log('target-end', target)
      // console.log('myBaidumap', this.$refs.myBaidumap)
    },
    // 点击地图点
    onClickStartPoint(e) {
      /* 创建地址解析器的实例 */
      let geocoder = new BMap.Geocoder()
      /* 利用坐标获取地址的详细信息 */
      geocoder.getLocation(e.point, res => {
        this.infoWindow.info.lng = e.point.lng
        this.infoWindow.info.lat = e.point.lat
        this.infoWindow.info.name = '起点:'
        this.infoWindow.show = true
        this.infoWindow.address = res.address
      })
    },
    onClickEndPoint(e) {
      /* 创建地址解析器的实例 */
      let geocoder = new BMap.Geocoder()
      /* 利用坐标获取地址的详细信息 */
      geocoder.getLocation(e.point, res => {
        this.infoWindow.info.lng = e.point.lng
        this.infoWindow.info.lat = e.point.lat
        this.infoWindow.info.name = '终点:'
        this.infoWindow.show = true
        this.infoWindow.address = res.address
      })
    }
  }
}
</script>
<style scoped>
</style>
