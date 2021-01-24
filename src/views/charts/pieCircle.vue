<template>
  <base-chart
    :option="option"
    ref="barChartRef"
    id="barChart"
    height="240px"
    width="100%"
  ></base-chart>
</template>

<script>
import BaseChart from '@/components/Charts/BaseChart'
let formatNumber = function(num) {
  let reg = /(?=(\B)(\d{3})+$)/g
  return num.toString().replace(reg, ',')
}
let title = '总量'
let total = 1000

export default {
  name: 'ColumnChart',
  props: {
    chartSeries: Array
  },
  components: {
    BaseChart
  },
  data() {
    return {
      option: {
        title: {
          // text: '{a|' + title + '}\n{a|' + formatNumber(total) + '}',
          text: '{name|' + title + '}\n{val|' + formatNumber(total) + '}',
          top: 'center',
          left: 'center',
          textStyle: {
            rich: {
              name: {
                fontSize: 14,
                fontWeight: 'normal',
                color: '#666666'
              },
              val: {
                fontSize: 20,
                fontWeight: 'bold',
                color: '#333333'
              }
            }
          }
        },
        // tooltip: {
        //   trigger: 'item',
        //   formatter: '{a} <br/>{b}: {c} ({d}%)'
        // },
        tooltip: {
          trigger: 'item',
          borderColor: 'rgba(255,255,255,.3)',
          backgroundColor: 'rgba(13,5,30,.6)',
          formatter: function(parms) {
            var str = parms.marker + '' + parms.data.name + '</br>' +
              '数量：' + parms.data.value + '次</br>' +
              '占比：' + parms.percent + '%'
            return str
          }
        },
        legend: {
          show: false,
          orient: 'vertical',
          top: 0,
          right: 0,
          itemGap: 4,
          itemWidth: 10,
          itemHeight: 10
        },
        grid: {
          containLabel: true
        },
        series: [
          {
            name: 'Planned Visit Compeletion Status',
            type: 'pie',
            radius: ['40%', '55%'],
            avoidLabelOverlap: true,
            label: {
              show: true,
              // formatter: '{icon|●}{bigSize|{b}}\n{smallsize|{d}}%',
              // formatter: '{bigSize|{b}}\n{smallsize|{d}}%',
              formatter: (params) => {
                return (
                  '{bigSize|' + params.name + '}\n{smallsize|' +
                  params.percent.toFixed(0) + '}%'
                )
              },
              rich: {
                bigSize: {
                  fontWeight: 500
                },
                smallsize: {
                  fontSize: '14',
                  fontWeight: 500
                }
              }
            },
            labelLine: {
              show: true,
              length: 10,
              length2: 20,
              lineStyle: {
                color: '#e6e6e6'
              }
            },
            data: [
              // ...this.chartSeries
              {
                value: 60,
                name: 'Overdue',
                itemStyle: {
                  color: '#e5cf0d'
                }
              },
              {
                value: 17,
                name: 'Canceled',
                itemStyle: {
                  color: '#b6a2de'
                }
              },
              {
                value: 30,
                name: 'Auto closed',
                itemStyle: {
                  color: '#5ab1ef'
                }
              },
              {
                value: 60,
                name: 'Completed',
                itemStyle: {
                  color: '#2ec7c9'
                }
              }
            ]
          }
        ]
      }
    }
  },
  computed: {
    chartInstance() {
      return this.$refs.barChartRef.chart
    },
    showTitle() {
      return this.$store.getters.language === 'zh' ? '总量' : 'Total'
    }
  },
  watch: {
    chartSeries: {
      handler(newVal) {
        if (this.chartInstance != null) {
          this.option.series[0].data = this.addSeriesOption(newVal)
          this.chartInstance.setOption(this.option)
        }
      },
      deep: true
    },
    showTitle() {
      this.option.title.text = '{name|' + this.showTitle + '}\n{val|' + formatNumber(total) + '}'
      this.chartInstance.setOption(this.option)
    }
  },
  methods: {
    addSeriesOption(series) {
      if (!series.length) return false
      let colors = ['#e5cf0d', '#b6a2de', '#5ab1ef', '#2ec7c9']
      return series.map((ele, i) => {
        return {
          name: ele.name,
          value: ele.value,
          itemStyle: {
            color: colors[i]
          }
        }
      })
    }
  }
}
</script>
