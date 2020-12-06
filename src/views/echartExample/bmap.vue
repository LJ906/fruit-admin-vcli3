<template>
  <div class="page-wrp">
    <base-map :option="option" width="100%" height="800px"></base-map>
  </div>
</template>

<script>
// 使用v-charts 中的v-map
import BaseMap from '@/components/Charts/BaseChart'
import { mockData } from './mock'
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
      option: {
        tooltip: {
          trigger: 'item'
        },
        // bmap: {
        //   center: [104.114129, 37.550339],
        //   zoom: 5,
        //   roam: true,
        //   mapStyle: {
        //     styleJson: [{
        //       'featureType': 'water',
        //       'elementType': 'all',
        //       'stylers': {
        //         'color': '#d1d1d1'
        //       }
        //     }, {
        //       'featureType': 'land',
        //       'elementType': 'all',
        //       'stylers': {
        //         'color': '#f3f3f3'
        //       }
        //     }, {
        //       'featureType': 'railway',
        //       'elementType': 'all',
        //       'stylers': {
        //         'visibility': 'off'
        //       }
        //     }, {
        //       'featureType': 'highway',
        //       'elementType': 'all',
        //       'stylers': {
        //         'color': '#fdfdfd'
        //       }
        //     }, {
        //       'featureType': 'highway',
        //       'elementType': 'labels',
        //       'stylers': {
        //         'visibility': 'off'
        //       }
        //     }, {
        //       'featureType': 'arterial',
        //       'elementType': 'geometry',
        //       'stylers': {
        //         'color': '#fefefe'
        //       }
        //     }, {
        //       'featureType': 'arterial',
        //       'elementType': 'geometry.fill',
        //       'stylers': {
        //         'color': '#fefefe'
        //       }
        //     }, {
        //       'featureType': 'poi',
        //       'elementType': 'all',
        //       'stylers': {
        //         'visibility': 'off'
        //       }
        //     }, {
        //       'featureType': 'green',
        //       'elementType': 'all',
        //       'stylers': {
        //         'visibility': 'off'
        //       }
        //     }, {
        //       'featureType': 'subway',
        //       'elementType': 'all',
        //       'stylers': {
        //         'visibility': 'off'
        //       }
        //     }, {
        //       'featureType': 'manmade',
        //       'elementType': 'all',
        //       'stylers': {
        //         'color': '#d1d1d1'
        //       }
        //     }, {
        //       'featureType': 'local',
        //       'elementType': 'all',
        //       'stylers': {
        //         'color': '#d1d1d1'
        //       }
        //     }, {
        //       'featureType': 'arterial',
        //       'elementType': 'labels',
        //       'stylers': {
        //         'visibility': 'off'
        //       }
        //     }, {
        //       'featureType': 'boundary',
        //       'elementType': 'all',
        //       'stylers': {
        //         'color': '#fefefe'
        //       }
        //     }, {
        //       'featureType': 'building',
        //       'elementType': 'all',
        //       'stylers': {
        //         'color': '#d1d1d1'
        //       }
        //     }, {
        //       'featureType': 'label',
        //       'elementType': 'labels.text.fill',
        //       'stylers': {
        //         'color': '#999999'
        //       }
        //     }]
        //   }
        // },
        series: [
          {
            name: 'pm2.5',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: mockData,
            symbolSize: function (val) {
              return val[2] / 10
            },
            encode: {
              value: 2
            },
            label: {
              formatter: '{b}',
              position: 'right',
              show: false
            },
            itemStyle: {
              color: 'purple'
            },
            // 鼠标悬停
            emphasis: {
              label: {
                show: true
              }
            }
          },
          {
            name: 'Top 10',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: mockData.sort(function (a, b) {
              // 去值的10分之一
              return b.value[2] - a.value[2]
            }).slice(0, 10), // 取排名前十有涟漪效果
            symbolSize: (val) => {
              console.log('val', val)
              return val[2] / 10
            },
            encode: {
              value: 2
            },
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
              formatter: '{b}',
              position: 'right',
              show: true
            },
            itemStyle: {
              color: 'purple',
              shadowBlur: 10,
              shadowColor: '#333'
            },
            zlevel: 1
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
</style>
