<template>
  <div :id="id" :ref="id" :style="{height:height,width:width}" />
</template>

<script>
// import echarts from 'echarts'
// 引入基本模板
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/effectScatter'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/radar'
// 引入提示框和title组件，图例
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/legendScroll' // 图例翻译滚动

import 'echarts/map/js/china.js'
import 'echarts/map/js/province/jilin.js' // 各省份地图js
import 'echarts/map/js/province/shandong.js' // 各省份地图js
import resize from './mixins/resize'

import 'echarts/extension/bmap/BMapCoordSys.js'
// import BMap from 'echarts/extension/bmap/bmap.js'
// import { MP } from './baidu-map.js'
export default {
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    option: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    option: {
      handler(val) {
        this.chart.setOption(val)
      },
      deep: true
    }
  },
  mounted() {
    this.renderChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    renderChart() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(this.$refs[this.id])
      this.chart.setOption(this.option)

      // 事件
      this.chart.on('click', params => {
        console.log('click', params)
        this.$emit('click', params)
      })
      // 切换图例
      this.chart.on('legendselectchanged', params => {
        this.$emit('legendselectchanged', params)
      })
    }
  }
}
</script>
