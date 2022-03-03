<template>
  <div class="page-wrp">
    <h4>infiniteScroll</h4>
    <div class="scroll-wrp" v-infinite-scroll="initTable">
      <div class="scroll-item" v-for="item in list" :key="item">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      pageNo: 1,
      pageSize: 10
    }
  },
  mounted() {
    this.initTable()
  },
  methods: {
    initTable(e) {
      console.log('加载更多this.pageNo', this.pageNo)
      for (let i = (this.pageNo - 1) * this.pageSize + 1; i < (this.pageNo * this.pageSize + 1); i++) {
        this.list.push(i)
      }
      this.pageNo++
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll-wrp {
  width: 200px;
  height: 300px;
  overflow-y: auto;
  border: 1px solid #ccc;
  .scroll-item {
    padding: 20px;
    font-size: 14px;
    border-bottom: 1px solid #eee;
  }
}
</style>
