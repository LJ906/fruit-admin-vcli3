<template>
  <common-card title="今日交易用户数" :value="orderUser | toThousandFilter">
    <template>
      <!-- echats 实现曲线图 -->
      <base-chart :option="getOptions()"></base-chart>
    </template>
    <!-- 插槽使用了v-slot:name  替换了slot="footer" 这个是vue2.6以后的 -->
    <template v-slot:footer>
      <span>退货率 </span>
      <span class="emphasis">{{ returnRate }}</span>
    </template>
  </common-card>
</template>
<script>
// import echarts from 'echarts'
// import CommonCardMixin from '@/mixins/commonCardMixin'
import CommonCard from '@/views/dashboard/components/commonCard'
import BaseChart from '@/components/Charts/BaseChart'
export default {
  components: {
    BaseChart,
    CommonCard
  },
  // mixins: [CommonCardMixin],
  data() {
    return {
      title: '销售数',
      orderUser: 3123,
      returnRate: '7%'
    }
  },
  methods: {
    getOptions() {
      return {
        color: ['#3398DB'],
        tooltip: {},
        series: [{
          name: '用户实时交易量',
          type: 'bar',
          // data: this.orderUserTrend,
          data: [1, 3, 4, 5, 10, 3, 9],
          barWidth: '60%'
        }],
        xAxis: {
          type: 'category',
          data: [1, 2, 3, 4, 5, 6, 7],
          // data: this.orderUserTrendAxis,
          show: false
        },
        yAxis: {
          show: false
        },
        grid: {
          top: 0,
          left: 0,
          bottom: 0,
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
