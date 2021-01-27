<template>
  <div style="display: flex;">
    <!-- 占比水球图 -->
    <base-chart :option="option" width="300px" height="300px"></base-chart>
    <base-chart :option="option2" width="300px" height="300px"></base-chart>
  </div>
</template>

<script>
import BaseChart from '@/components/Charts/BaseChart'
// import 'echarts-liquidfill'
var uploadedDataURL = '/asset/get/s/data-1482222810548-H1myTvIEg.png'
var radius = 250

export default {
  components: {
    BaseChart
  },
  data() {
    return {
      option: {
        title: {
          text: '占比水球图',
          left: 'center',
          top: 10,
          textStyle: {
            color: '#555',
            fontWeight: 'bold',
            fontSize: 18
          }
        },
        series: [
          {
            name: '水球图', // 里面的文字
            type: 'liquidFill',
            radius: '80%',
            center: ['50%', '55%'],
            waveAnimation: 10, // 动画时长
            amplitude: 10, // 振幅
            animationDuration: 0,
            animationDurationUpdate: 4000,
            data: [{
              name: '占比',
              value: 0.6,
              itemStyle: {
                color: 'rgba(68, 197, 253,1)',
                opacity: 0.6
              },
              emphasis: { // 鼠标移入时的样式
                itemStyle: {
                  opacity: 0.9
                }
              }
            }, {
              value: 0.6,
              itemStyle: {
                color: 'rgba(68, 197, 253,1)',
                opacity: 0.9
              }
            }],
            // data: [0.6],
            // color: ['rgba(68, 197, 253,0.8)', 'rgba(68, 197, 253,0.6)'],
            label: {
              normal: {
                color: '#44C5FD',
                textStyle: {
                  fontSize: 16,
                  fontWeight: 'bold'
                }
              }
            },
            outline: { // 外边框的样式
              show: true,
              borderDistance: 5,
              itemStyle: {
                borderColor: 'rgba(68, 197, 253,1)',
                borderWidth: 2
              }
            },
            backgroundStyle: {
              color: 'rgba(68, 197, 253,.3)'
            }
          }
        ]
      },
      option2: {
        backgroundColor: '#0ca59c',
        series: [{
          amplitude: 10,
          // color: ['#eee', '#f3f3f3', '#fff'],
          color: ['rgba(238,238,238,.4)', 'rgba(243,243,243,.3)', 'rgba(255,255,255,.5)'],
          type: 'liquidFill',
          radius: radius,
          data: [0.3, 0.3, 0.3],
          animationDuration: 0,
          animationDurationUpdate: 4000,
          backgroundStyle: {
            color: 'transparent'
          },
          label: {
            normal: {
              color: '#44C5FD',
              textStyle: {
                fontSize: 16,
                fontWeight: 'bold'
              }
            }
          },
          outline: {
            borderDistance: 5,
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 5
            }
          }
        }],
        graphic: {
          elements: [{
            type: 'image',
            style: {
              image: uploadedDataURL,
              width: radius,
              height: radius
            },
            left: 'center',
            top: 'middle'
          }]
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
