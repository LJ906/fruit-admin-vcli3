<template>
  <div class="pagewrp">
    <easy-flow @saveData="saveData"></easy-flow>
    <json-mirror :data="jsonData" ref="flowInfo"></json-mirror>
  </div>
</template>

<script>
import EasyFlow from '@/components/EasyFlow/panel'
import JsonMirror from '@/components/JsonMirror'
export default {
  components: {
    EasyFlow,
    JsonMirror
  },
  data() {
    return {
      jsonData: {}
    }
  },
  methods: {
    saveData(data) {
      this.jsonData = data
      this.$nextTick(function() {
        this.$refs.flowInfo.init()
      })
    }
  }
}
</script>

<style >
</style>
