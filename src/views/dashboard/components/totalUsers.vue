<template>
  <common-card title="累计用户数" :value="userToday | toThousandFilter">
    <template>
      <!-- echats 实现曲线图 -->
      <base-chart :option="getOptions()"></base-chart>
    </template>
    <!-- 插槽使用了v-slot:name  替换了slot="footer" 这个是vue2.6以后的 -->
    <template v-slot:footer>
      <div class="total-users-footer">
        <span>日同比</span>
        <span class="emphasis">{{ userGrowthLastDay }}</span>
        <div class="increase" />
        <span class="month">月同比</span>
        <span class="emphasis">{{ userGrowthLastMonth }}</span>
        <div class="decrease" />
      </div>
    </template>
  </common-card>
</template>
<script>
// import echarts from 'echarts'
import BaseChart from '@/components/Charts/BaseChart'

import CommonCardMixin from '@/mixins/commonCardMixin'
export default {
  mixins: [CommonCardMixin],
  components: {
    BaseChart
  },
  data() {
    return {
      title: '销售数',
      userToday: 312923,
      userGrowthLastDay: '4.98%',
      userGrowthLastMonth: '1.32%',
      userLastMonth: 10000,
      userTodayNumber: 2000
    }
  },
  methods: {
    getOptions() {
      return {
        grid: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        },
        xAxis: {
          type: 'value',
          show: false
        },
        yAxis: {
          type: 'category',
          show: false
        },
        series: [{
          name: '今日平台用户数',
          type: 'bar',
          stack: '总量',
          data: [this.userTodayNumber],
          itemStyle: {
            color: '#45c946'
          }
        },
        {
          name: '上月平台用户数',
          type: 'bar',
          stack: '总量',
          data: [this.userLastMonth],
          barWidth: 10,
          itemStyle: {
            color: '#eee'
          }
        },
        {
          type: 'custom',
          stack: '总量',
          data: [this.userTodayNumber],
          renderItem: (params, api) => {
            const value = api.value(0)
            const endPoint = api.coord([value, 0])

            return {
              type: 'group',
              position: endPoint,
              children: [{
                type: 'path',
                shape: {
                  d: 'M1024 255.996 511.971 767.909 0 255.996 1024 255.996z',
                  x: -5,
                  y: -20,
                  width: 10,
                  height: 10,
                  layout: 'cover'
                },
                style: {
                  fill: '#45c946'
                }
              }, {
                type: 'path',
                shape: {
                  d: 'M0 767.909l512.029-511.913L1024 767.909 0 767.909z',
                  x: -5,
                  y: 10,
                  width: 10,
                  height: 10,
                  layout: 'cover'
                },
                style: {
                  fill: '#45c946'
                }
              }]
            }
          }
        }
        ]
      }
    }
  }
}
</script>

<style scoped lang="scss">
.total-users-footer {
  display: flex;
  align-items: center;

  .month {
    margin-left: 10px;
  }
}
</style>
