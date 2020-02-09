<template>
  <div :id="id" :ref="id" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    option: {
      type: Object,
      required: true
    }
  },
  data () {
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
