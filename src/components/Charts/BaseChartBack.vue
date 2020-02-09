<template>
  <div :id="id" :ref="id" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts/lib/echarts'

import debounce from 'lodash/debounce'
import { addListener, removeListener } from 'resize-detector'

export default {
  props: {
    option: {
      type: Object,
      default: () => {}
    },
    id: {
      type: String,
      default: 'basechart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data () {
    const xData = (function() {
      const data = []
      for (let i = 1; i < 13; i++) {
        data.push(i + 'month')
      }
      return data
    })()

    return {
      chart: null
    }
  },
  watch: {
    option (val) {
      console.log('optinsbianhua  ', option)
        this.chart.setOption(val)
    }
    // option: {
    //   handler(val) {
    //     this.chart.setOption(val)
    //   },
    //   deep: true
    // }
  },
  created () {
    this.resize = debounce(this.resize, 300)
  },
  mounted () {
    this.renderChart()
    addListener(this.$refs[this.id], this.resize)
  },
  beforeDestroy () {
    removeListener(this.$refs[this.id], this.resize)
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    resize () {
      this.chart.resize()
    },
    renderChart () {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(this.$refs[this.id])
      this.chart.setOption(this.option)

      // 事件
      this.chart.on('click', params => {
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

<style>
</style>
