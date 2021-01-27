<template>
  <div class="page-wrp">
    <base-map :option="option" width="100%" height="800px"></base-map>
  </div>
</template>

<script>
import BaseMap from '@/components/Charts/BaseChart'
import mapRegion from './mapRegion'
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
        legend: {
          show: false,
          left: '40',
          bottom: '20',
          data: []
          // textStyle: {
          //   color: '#fff'
          // }
        },
        geo: {
          map: 'jilin', // 表示中国地图
          roam: true,
          scaleLimit: {
            min: 1,
            max: 2
          },
          // selectedMode: 'multiple', // 连续选择多个区域高亮
          zoom: 1,
          left: 20,
          top: 10,
          label: {
            normal: {
              show: true, // 是否显示对应地名
              textStyle: {
                color: 'rgba(255, 255, 255, 0.6)'
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: 'rgba(0, 0, 0, 0.2)'
            },
            emphasis: {
              areaColor: null, // 鼠标悬停在地图上省份高亮的颜色
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          // regions: mapRegion
        },
        // series: [
        //   {
        //     name: 'pm2.5',
        //     type: 'scatter',
        //     coordinateSystem: 'geo',
        //     data: mockData,
        //     symbolSize: function(val) {
        //       return val[2] / 10
        //     },
        //     encode: {
        //       value: 2
        //     },
        //     label: {
        //       formatter: '{b}',
        //       position: 'right',
        //       show: false
        //     },
        //     itemStyle: {
        //       color: 'purple'
        //     },
        //     // 鼠标悬停
        //     emphasis: {
        //       label: {
        //         show: true
        //       }
        //     }
        //   },
        //   {
        //     name: 'Top 10',
        //     type: 'effectScatter',
        //     coordinateSystem: 'geo',
        //     data: mockData.sort(function(a, b) {
        //       // 去值的10分之一
        //       return b.value[2] - a.value[2]
        //     }).slice(0, 10), // 取排名前十有涟漪效果
        //     symbolSize: (val) => {
        //       console.log('val', val)
        //       return val[2] / 10
        //     },
        //     encode: {
        //       value: 2
        //     },
        //     showEffectOn: 'render',
        //     rippleEffect: {
        //       brushType: 'stroke'
        //     },
        //     hoverAnimation: true,
        //     label: {
        //       formatter: '{b}',
        //       position: 'right',
        //       show: true
        //     },
        //     itemStyle: {
        //       color: 'purple',
        //       shadowBlur: 10,
        //       shadowColor: '#333'
        //     },
        //     zlevel: 1
        //   }
        // ]
      }
    }
  }
}
</script>

<style scoped>
</style>
