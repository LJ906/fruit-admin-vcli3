<template>
  <div>
    <el-button type="primary" size="mini" v-print="'#img'">借助window.print打印</el-button>
    <br />
    <img id="img" src="../../assets/401_images/401.gif" alt />
  </div>
</template>

<script>
export default {
  data() {
    return {
      printOption: {
        id: '#img',
        printTitle: '小妹妹图片'
      }
    }
  },
  mounted() {
    window.addEventListener('message', this.receiveMsg)
  },
  methods: {
    receiveMsg(e) {
      console.log('print-e.data', e.data)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
