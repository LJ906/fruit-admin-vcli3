<template>
  <div>
    <baidu-map
      :style="{ width: map.width, height: map.height }"
      class="map"
      ak="G1LFyjrNGIkns5OfpZnrCGAKxpycPLwb"
      :zoom="map.zoom"
      :center="{ lng: map.center.lng, lat: map.center.lat }"
      @ready="handler"
      :scroll-wheel-zoom="true"
    >
      <!--比例尺控件-->
      <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
      <!--缩放控件-->
      <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-navigation>
      <!--聚合动态添加的点坐标-->
      <bm-marker-clusterer :averageCenter="true">
        <bm-marker :position="startMark"></bm-marker>
        <bm-marker :position="endMark"></bm-marker>
      </bm-marker-clusterer>
      <!-- label -->
      <bm-label
        content="打卡点"
        :position="startMark"
        :labelStyle="{ color: 'red', fontSize: '12px' }"
        title="Hover me"
      />
      <bm-label
        content="目的地"
        :position="endMark"
        :labelStyle="{ color: 'red', fontSize: '14px' }"
        title="Hover me"
      />

      <bm-label
        content="500米"
        :position="showDistanceMark"
        :labelStyle="{ color: 'red', fontSize: '14px' }"
        title="Hover me"
      />

      <!-- 连线 -->
      <bm-polyline
        :path="[startMark, endMark]"
        stroke-color="red"
        :stroke-opacity="0.5"
        :stroke-weight="2"
        strokeStyle="dashed"
      ></bm-polyline>

      <!-- background: '#fff', border: 'none'  -->
      <!--信息窗体-->
      <!-- <bm-info-window
        :position="{ lng: infoWindow.info.lng, lat: infoWindow.info.lat }"
        :title="infoWindow.info.name"
        :show="infoWindow.show"
        @close="infoWindowClose"
        @open="infoWindowOpen"
      >
        <p>
          <span class="left">单位面积能耗：</span
          ><span class="right">2kWh/㎡</span>
        </p>
      </bm-info-window> -->
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
// import BmInfoWindow from 'vue-baidu-map/components/overlays/InfoWindow'
import BmPolyline from 'vue-baidu-map/components/overlays/Polyline'
import BmLabel from 'vue-baidu-map/components/overlays/Label'

export default {
  components: {
    BaiduMap,
    BmScale,
    BmNavigation,
    BmMarkerClusterer,
    BmMarker,
    BmLabel,
    BmPolyline
  },
  data() {
    return {
      map: {
        // center: { lng: 116.488855, lat: 39.993351 }, // 大众汽车金融
        center: { lng: 116.488261, lat: 39.992866 }, // = showDistanceMark
        zoom: 18,
        width: '700px',
        height: '600px'
      },
      startMark: { lng: 116.487297, lat: 39.992308 },
      endMark: { lng: 116.488855, lat: 39.993351 },
      showDistanceMark: { lng: 116.488261, lat: 39.992866 }
    }
  },
  mounted() {

  },
  methods: {
    // 地图初始化
    handler({ BMap, map }) {
      console.log(BMap, map)
      //   this.map.center.lng = 118.802422
      //   this.map.center.lat = 32.065631
      //   this.map.zoom = 12
      //   this.getProPositionMap()
    }

  }
}
</script>
<style scoped>
</style>
