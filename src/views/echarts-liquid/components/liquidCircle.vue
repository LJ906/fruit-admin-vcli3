<template>
  <base-chart
    :option="option"
    :ref="id"
    :id="id"
    width="300px" height="300px"
  ></base-chart>
</template>

<script>
// import echarts from 'echarts'
import 'echarts-liquidfill'
import BaseChart from '@/components/Charts/BaseChart'

let total = 100
let actual = 60
let finishRate = 0.6
export default {
  components: {
    BaseChart
  },
  props: {
    chartSeries: {
      type: Object,
      default: () => {
        return {
          targetVal: 0,
          actualValue: 0,
          rate: 0
        }
      },
      required: false
    },
    id: {
      type: String,
      default: 'liquidCircle'
    },
    color0: {
      type: String,
      // default: '#7ec2e0'
      default: '#63daed'
    },
    color1: {
      type: String,
      default: '#1372ed'
      // default: '#086790'
    }
  },
  data() {
    return {
      option: {
        series: [
          {
            type: 'liquidFill',
            itemStyle: {
              opacity: 0.8, // 波浪的透明度
              shadowBlur: 10, // 波浪的阴影范围
              shadowColor: this.color0 // 阴影颜色

            },
            // backgroundStyle: {
            //   color: 'rgb(255,0,255,0.1)'
            // },
            radius: '70%',
            // 水波
            color: [new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: this.color0
            },
            {
              offset: 1,
              color: this.color1
            }
            ])],
            data: [{
              // value: this.chartSeries.rate,
              value: finishRate,
              emphasis: { // 鼠标移入时的样式
                itemStyle: {
                  opacity: 0.6
                }
              }
            }],
            center: ['50%', '50%'],
            label: {
              show: false
            },
            // 外缘线
            outline: {
              itemStyle: {
                borderColor: '#f4f4f4',
                borderWidth: 5
              },
              borderDistance: 0
            }
          },
          // 外环线
          {
            color: [this.color0, 'transparent'],
            // color: ['#63daed', 'transparent'],
            type: 'pie',
            center: ['50%', '50%'],
            radius: ['70%', '73.5%'],
            hoverAnimation: false,
            data: [
              {
                name: '',
                // value: this.chartSeries.actualValue,
                value: actual,
                label: {
                  show: false,
                  position: 'center',
                  color: '#33b9ff',
                  fontSize: 38,
                  fontWeight: 'bold'
                }
              },
              { // 画剩余的刻度圆环
                name: '',
                // value: this.chartSeries.targetVal - this.chartSeries.actualValue,
                value: total - actual,
                label: { show: false },
                labelLine: { show: false }
              }
            ]
          }
        ]
      }
    }
  },
  computed: {
    chartInstance() {
      let ref = this.id
      return this.$refs[ref].chart
    }
  },
  watch: {
    chartSeries: {
      handler(newVal) {
        if (this.chartInstance != null) {
          this.option.series = this.addSeriesOption(newVal)
          this.chartInstance.setOption(this.option)
        }
      },
      deep: true
    }
  },
  methods: {
    addSeriesOption(series) {
      let { targetVal, actualValue, rate } = series
      let originSeries = this.option.series
      originSeries[0].data[0].value = rate
      originSeries[1].data[0].value = actualValue
      originSeries[1].data[1].value = targetVal - actualValue
      return originSeries
    }
  }
}
</script>
