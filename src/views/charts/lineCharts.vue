<template>
  <div class="linechart-wrp">
    <base-chart :option="option2" id="linecharts" height="100%" width="100%"></base-chart>
  </div>
</template>

<script>
import echarts from 'echarts'
import BaseChart from '@/components/Charts/BaseChart'

export default {
  name: 'lineChart',
  components: {
    BaseChart
  },
  props: {
    chartSeries: {
      type: Object
    }
  },
  data() {
    return {
      option: {
        // backgroundColor: '#394056',
        title: {
          top: 20,
          text: '2019年产出情况',
          textStyle: {
            fontWeight: 'normal',
            fontFamily: 'Source Han Sans CN',
            fontSize: 32,
            color: '#fff',
            textAlign: 'center'
          },
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#57617B'
            }
          }
        },
        legend: {
          // 图例的宽高样式
          top: 20,
          itemWidth: 30,
          itemHeight: 10,
          itemGap: 13,
          // data: ['U3O8', 'UO2', 'UF6'],
          right: '80px',
          textStyle: {
            fontSize: 20,
            color: '#fff'
          }
        },
        // charts位置
        grid: {
          top: 100,
          left: '2%',
          right: '4%',
          bottom: '50px',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            axisLine: {
              // x线
              lineStyle: {
                color: '#fff'
              }
            },
            axisLabel: {
              // x轴刻度标签字体颜色大小
              textStyle: {
                fontSize: 24,
                color: '#fff',
                fontFamily: 'Source Han Sans CN'
              }
            },
            data: [
              '一月',
              '二月',
              '三月',
              '四月',
              '五月',
              '六月',
              ' 七月',
              '八月',
              '九月',
              '十月',
              '十一月',
              '十二月'
            ]
          }
        ],
        yAxis: [
          {
            type: 'value',
            // name: '(吨)',
            axisTick: {
              show: true // 轴线梯度
            },
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            },
            axisLabel: {
              margin: 10,
              textStyle: {
                fontSize: 24, // x轴刻度标签字体颜色大小
                color: '#fff',
                fontFamily: 'Source Han Sans CN'
              }
            },
            splitLine: {
              // 图表内部梯度线隐藏
              show: false
            }
          }
        ],
        series: [
          {
            name: 'U3O8',
            type: 'line',
            smooth: false, // true 平滑过渡没有角度
            symbol: 'circle', // 标记图标样式
            symbolSize: 15, // 5
            showSymbol: true, // false 是否图标
            lineStyle: {
              normal: {
                width: 4
              }
            },
            // 面积图
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(137, 189, 27, 0.3)'
                    },
                    {
                      offset: 0.8,
                      color: 'rgba(137, 189, 27, 0)'
                    }
                  ],
                  false
                ),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: {
              // 图标样式
              normal: {
                color: 'rgba(60,255,0,1)', // rgb(137,189,27)
                borderColor: 'rgba(60,255,0,0.27)',
                borderWidth: 12
              }
            },
            data: [220, 182, 191, 134, 150, 120, 110, 125, 145, 122, 165, 122]
          },
          {
            name: 'UO2',
            type: 'line',
            smooth: false,
            symbol: 'diamond',
            symbolSize: 15, // 5
            showSymbol: true, // false
            lineStyle: {
              normal: {
                width: 4
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(0, 136, 212, 0.3)'
                    },
                    {
                      offset: 0.8,
                      color: 'rgba(0, 136, 212, 0)'
                    }
                  ],
                  false
                ),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: '#FF6A18',
                borderColor: 'rgba(0,136,212,0.2)',
                borderWidth: 12
              }
            },
            data: [120, 110, 125, 145, 122, 165, 122, 220, 182, 191, 134, 150]
          },
          {
            name: 'UF6',
            type: 'line',
            smooth: false, // 是平滑
            symbol: 'rect',
            symbolSize: 15,
            showSymbol: true,
            lineStyle: {
              normal: {
                width: 4
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(219, 50, 51, 0.3)'
                    },
                    {
                      offset: 0.8,
                      color: 'rgba(219, 50, 51, 0)'
                    }
                  ],
                  false
                ),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: 'rgba(0,153,255,1)', // rgb(219,50,51)
                borderColor: 'rgba(0,153,255,0.2)',
                borderWidth: 12
              }
            },
            data: [220, 182, 125, 145, 122, 191, 134, 150, 120, 110, 165, 122]
          }
        ]
      },
      option2: {
        backgroundColor: '#394056',
        title: {
          top: 20,
          text: 'Requests',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 16,
            color: '#F1F1F3'
          },
          left: '1%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#57617B'
            }
          }
        },
        legend: {
          top: 20,
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: ['CMCC', 'CTCC', 'CUCC'],
          right: '4%',
          textStyle: {
            fontSize: 12,
            color: '#F1F1F3'
          }
        },
        grid: {
          top: 100,
          left: '2%',
          right: '2%',
          bottom: '2%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: '#57617B'
              }
            },
            data: [
              '13:00',
              '13:05',
              '13:10',
              '13:15',
              '13:20',
              '13:25',
              '13:30',
              '13:35',
              '13:40',
              '13:45',
              '13:50',
              '13:55'
            ]
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '(%)',
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#57617B'
              }
            },
            axisLabel: {
              margin: 10,
              textStyle: {
                fontSize: 14
              }
            },
            splitLine: {
              lineStyle: {
                color: '#57617B'
              }
            }
          }
        ],
        series: [
          {
            name: 'CMCC',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 1
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(137, 189, 27, 0.3)'
                    },
                    {
                      offset: 0.8,
                      color: 'rgba(137, 189, 27, 0)'
                    }
                  ],
                  false
                ),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: 'rgb(137,189,27)',
                borderColor: 'rgba(137,189,2,0.27)',
                borderWidth: 12
              }
            },
            data: [220, 182, 191, 134, 150, 120, 110, 125, 145, 122, 165, 122]
          },
          {
            name: 'CTCC',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 1
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(0, 136, 212, 0.3)'
                    },
                    {
                      offset: 0.8,
                      color: 'rgba(0, 136, 212, 0)'
                    }
                  ],
                  false
                ),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: 'rgb(0,136,212)',
                borderColor: 'rgba(0,136,212,0.2)',
                borderWidth: 12
              }
            },
            data: [120, 110, 125, 145, 122, 165, 122, 220, 182, 191, 134, 150]
          },
          {
            name: 'CUCC',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 1
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(219, 50, 51, 0.3)'
                    },
                    {
                      offset: 0.8,
                      color: 'rgba(219, 50, 51, 0)'
                    }
                  ],
                  false
                ),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: 'rgb(219,50,51)',
                borderColor: 'rgba(219,50,51,0.2)',
                borderWidth: 12
              }
            },
            data: [220, 182, 125, 145, 122, 191, 134, 150, 120, 110, 165, 122]
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.linechart-wrp {
  width: 100%;
  height: 628px;
}
</style>
