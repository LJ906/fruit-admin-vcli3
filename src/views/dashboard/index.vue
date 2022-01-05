<template>
  <div class="home">
    <top-view />
  </div>
</template>
<script>
import TopView from './topView.vue'

import { wordcloud, screenData, mapScatter } from '@/api/dashboard.js'

export default {
  name: 'Home',
  components: {
    TopView
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
</style>
