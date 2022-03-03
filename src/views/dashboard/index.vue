<template>
  <div class="page-wrp">
    <top-view />
    <!-- 这个组件需要有，不然都显示不出来 -->
    <h2>自定义Svg图标，封装svg图标组件</h2>
    <custom-svg></custom-svg>

    <svg width="30" height="30" style="color: red">
      <use href="#more"></use>
    </svg>
    <!-- 填充的箭头 播放箭头-->
    <svg width="30" height="30" style="color: green">
      <use href="#filledArrowRight"></use>
    </svg>
    <!-- 箭头 -->
    <svg width="30" height="30" style="color: green">
      <use href="#arrowRight"></use>
    </svg>
    <br />
    <!--推荐： 使用封装的icon -->
    <icon
      name="filledArrowRight"
      :style="{ width: '30px', height: '30px', color: 'red' }"
    ></icon>
    <icon name="arrowRight" class="arrow-right"></icon>
    <icon name="car123" class="arrow-right"></icon>

    <h3>svg animation</h3>
    <!-- <SvgAnimation></SvgAnimation> -->
  </div>
</template>
<script>
import TopView from './topView.vue'

// 暂时放这里，后续移走
import CustomSvg from '@/components/customSvg/svg.vue'
// import SvgAnimation from '@/components/SvgAnimation/svgAnimation.vue'

export default {
  name: 'Home',
  components: {
    TopView,
    CustomSvg
    // SvgAnimation
  },
  data() {
    return {
      reportData: null,
      wordcloud: null,
      mapData: null
    }
  },
  mounted() {
    // screenData().then(data => { this.reportData = data })
    // wordcloud().then(data => { this.wordCloud = data })
    // mapScatter().then(data => { this.mapData = data })
  },
  methods: {
    getReportData() {
      return this.reportData
    },
    getWordCloud() {
      return this.wordCloud
    },
    getMapData() {
      return this.mapData
    }
  },
  provide() {
    return {
      getReportData: this.getReportData,
      getWordCloud: this.getWordCloud,
      getMapData: this.getMapData
    }
  }
}
</script>
<style scoped lang="scss">
.home {
  width: 100%;
  padding: 20px;
  background: #eee;
  box-sizing: border-box;
}
.arrow-right {
  width: 30px;
  height: 30px;
  color: red;
}
</style>
