<template>
  <div class="page-wrp">
    <base-map :option="option" width="100%" height="800px"></base-map>
  </div>
</template>

<script>
// 使用v-charts 中的v-map
// import BMapCoordSys from 'echarts/extension/bmap/BMapCoordSys.js'
import BaseMap from '@/components/Charts/BaseChart'
// import { mockData } from './mock'

import BMap from 'echarts/extension/bmap/bmap.js'
import { MP } from '@/components/Charts/baidu-map.js'
MP('G1LFyjrNGIkns5OfpZnrCGAKxpycPLwb')
export default {
  components: {
    BaseMap
  },
  props: {
    seriesData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      option: {}
      // option: {
      //   tooltip: {
      //     trigger: 'item'
      //   },
      //   bmap: {
      //     center: [104.114129, 37.550339],
      //     zoom: 5,
      //     roam: true
      //     // mapStyle: {
      //     //   styleJson: [{
      //     //     'featureType': 'water',
      //     //     'elementType': 'all',
      //     //     'stylers': {
      //     //       'color': '#d1d1d1'
      //     //     }
      //     //   }, {
      //     //     'featureType': 'land',
      //     //     'elementType': 'all',
      //     //     'stylers': {
      //     //       'color': '#f3f3f3'
      //     //     }
      //     //   }, {
      //     //     'featureType': 'railway',
      //     //     'elementType': 'all',
      //     //     'stylers': {
      //     //       'visibility': 'off'
      //     //     }
      //     //   }, {
      //     //     'featureType': 'highway',
      //     //     'elementType': 'all',
      //     //     'stylers': {
      //     //       'color': '#fdfdfd'
      //     //     }
      //     //   }, {
      //     //     'featureType': 'highway',
      //     //     'elementType': 'labels',
      //     //     'stylers': {
      //     //       'visibility': 'off'
      //     //     }
      //     //   }, {
      //     //     'featureType': 'arterial',
      //     //     'elementType': 'geometry',
      //     //     'stylers': {
      //     //       'color': '#fefefe'
      //     //     }
      //     //   }, {
      //     //     'featureType': 'arterial',
      //     //     'elementType': 'geometry.fill',
      //     //     'stylers': {
      //     //       'color': '#fefefe'
      //     //     }
      //     //   }, {
      //     //     'featureType': 'poi',
      //     //     'elementType': 'all',
      //     //     'stylers': {
      //     //       'visibility': 'off'
      //     //     }
      //     //   }, {
      //     //     'featureType': 'green',
      //     //     'elementType': 'all',
      //     //     'stylers': {
      //     //       'visibility': 'off'
      //     //     }
      //     //   }, {
      //     //     'featureType': 'subway',
      //     //     'elementType': 'all',
      //     //     'stylers': {
      //     //       'visibility': 'off'
      //     //     }
      //     //   }, {
      //     //     'featureType': 'manmade',
      //     //     'elementType': 'all',
      //     //     'stylers': {
      //     //       'color': '#d1d1d1'
      //     //     }
      //     //   }, {
      //     //     'featureType': 'local',
      //     //     'elementType': 'all',
      //     //     'stylers': {
      //     //       'color': '#d1d1d1'
      //     //     }
      //     //   }, {
      //     //     'featureType': 'arterial',
      //     //     'elementType': 'labels',
      //     //     'stylers': {
      //     //       'visibility': 'off'
      //     //     }
      //     //   }, {
      //     //     'featureType': 'boundary',
      //     //     'elementType': 'all',
      //     //     'stylers': {
      //     //       'color': '#fefefe'
      //     //     }
      //     //   }, {
      //     //     'featureType': 'building',
      //     //     'elementType': 'all',
      //     //     'stylers': {
      //     //       'color': '#d1d1d1'
      //     //     }
      //     //   }, {
      //     //     'featureType': 'label',
      //     //     'elementType': 'labels.text.fill',
      //     //     'stylers': {
      //     //       'color': '#999999'
      //     //     }
      //     //   }]
      //     // }
      //   }
      // }
    }
  },
  methods: {
    initMap() {
      this.option = {
        tooltip: {
          trigger: 'item'
        },
        bmap: {
          center: [104.114129, 37.550339],
          zoom: 5,
          roam: true
          // mapStyle: {
          //   styleJson: [{
          //     'featureType': 'water',
          //     'elementType': 'all',
          //     'stylers': {
          //       'color': '#d1d1d1'
          //     }
          //   }, {
          //     'featureType': 'land',
          //     'elementType': 'all',
          //     'stylers': {
          //       'color': '#f3f3f3'
          //     }
          //   }, {
          //     'featureType': 'railway',
          //     'elementType': 'all',
          //     'stylers': {
          //       'visibility': 'off'
          //     }
          //   }, {
          //     'featureType': 'highway',
          //     'elementType': 'all',
          //     'stylers': {
          //       'color': '#fdfdfd'
          //     }
          //   }, {
          //     'featureType': 'highway',
          //     'elementType': 'labels',
          //     'stylers': {
          //       'visibility': 'off'
          //     }
          //   }, {
          //     'featureType': 'arterial',
          //     'elementType': 'geometry',
          //     'stylers': {
          //       'color': '#fefefe'
          //     }
          //   }, {
          //     'featureType': 'arterial',
          //     'elementType': 'geometry.fill',
          //     'stylers': {
          //       'color': '#fefefe'
          //     }
          //   }, {
          //     'featureType': 'poi',
          //     'elementType': 'all',
          //     'stylers': {
          //       'visibility': 'off'
          //     }
          //   }, {
          //     'featureType': 'green',
          //     'elementType': 'all',
          //     'stylers': {
          //       'visibility': 'off'
          //     }
          //   }, {
          //     'featureType': 'subway',
          //     'elementType': 'all',
          //     'stylers': {
          //       'visibility': 'off'
          //     }
          //   }, {
          //     'featureType': 'manmade',
          //     'elementType': 'all',
          //     'stylers': {
          //       'color': '#d1d1d1'
          //     }
          //   }, {
          //     'featureType': 'local',
          //     'elementType': 'all',
          //     'stylers': {
          //       'color': '#d1d1d1'
          //     }
          //   }, {
          //     'featureType': 'arterial',
          //     'elementType': 'labels',
          //     'stylers': {
          //       'visibility': 'off'
          //     }
          //   }, {
          //     'featureType': 'boundary',
          //     'elementType': 'all',
          //     'stylers': {
          //       'color': '#fefefe'
          //     }
          //   }, {
          //     'featureType': 'building',
          //     'elementType': 'all',
          //     'stylers': {
          //       'color': '#d1d1d1'
          //     }
          //   }, {
          //     'featureType': 'label',
          //     'elementType': 'labels.text.fill',
          //     'stylers': {
          //       'color': '#999999'
          //     }
          //   }]
          // }
        }
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      MP('G1LFyjrNGIkns5OfpZnrCGAKxpycPLwb').then(() => {
        this.initMap()
      })
    })
  }
}
</script>

<style scoped>
</style>
