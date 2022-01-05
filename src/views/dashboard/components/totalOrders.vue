<template>
  <common-card title="累计订单量" :value="orderToday | toThousandFilter">
    <template>
      <!-- echats 实现曲线图 -->
      <base-chart :option="getOptions()"></base-chart>
    </template>
    <!-- 插槽使用了v-slot:name  替换了slot="footer" 这个是vue2.6以后的 -->
    <template v-slot:footer>
      <span>昨日订单量 </span>
      <span class="emphasis">{{ orderLastDay | toThousandFilter }}</span>
    </template>
  </common-card>
</template>
<script>
import echarts from 'echarts'
import CommonCardMixin from '@/mixins/commonCardMixin'
import BaseChart from '@/components/Charts/BaseChart'

export default {
  components: {
    BaseChart
  },
  mixins: [CommonCardMixin],
  data() {
    return {
      title: '销售数',
      orderToday: 3123,
      orderLastDay: '23123'
    }
  },
  methods: {
    getOptions() {
      return {
        xAxis: {
          type: 'category',
          show: false,
          boundaryGap: false
        },
        yAxis: {
          show: false
        },
        series: [{
          type: 'line',
          // data: this.orderTrend,
          data: [140, 232, 101, 264, 90, 340, 250],
          areaStyle: {
            // color: 'purple', // 一个颜色
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(128, 255, 165)'
              },
              {
                offset: 1,
                color: 'rgb(1, 191, 236)'
              }
            ])
          },
          lineStyle: { // 线样式
            width: 0
          },
          itemStyle: { // 线上点样式隐藏
            opacity: 0
          },
          smooth: true
        }],
        grid: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.compare-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .compare {
    display: flex;
    align-items: center;
    font-size: 12px;
    margin-top: 3px;
    color: #666;
  }
}
</style>
