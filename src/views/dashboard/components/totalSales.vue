<template>
  <common-card title="销售数" :value="value | toThousandFilter">
    <template>
      <div class="compare-wrapper">
        <div class="compare">
          <span>日同比</span>
          <span class="emphasis">{{ salesGrowthLastDay }}</span>
          <div class="increase" />
        </div>
        <div class="compare">
          <span>月同比</span>
          <span class="emphasis">{{ salesGrowthLastMonth }}</span>
          <div class="decrease" />
        </div>
      </div>
    </template>
    <!-- 插槽使用了v-slot:name  替换了slot="footer" 这个是vue2.6以后的 -->
    <template v-slot:footer>
      <span>昨日销售额 </span>
      <span class="emphasis">{{salesLastDay | toThousandFilter}}</span>
    </template>
  </common-card>
</template>
<script>
import CommonCardMixin from '@/mixins/commonCardMixin'
export default {
  mixins: [CommonCardMixin],
  data() {
    return {
      title: '销售数',
      value: 3123,
      salesGrowthLastDay: '10%',
      salesGrowthLastMonth: '20%',
      salesLastDay: '23123'
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
