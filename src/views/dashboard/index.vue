<template>
  <div>
    <span >dashboard</span>
    <br>
    <el-button @click="testmock" >点我</el-button>
    <div v-for="item in userlist" :key="item.name">{{item.name}}</div>
    <!-- <iframe
      id="iframe"
      ref="iframe"
      scrolling="no"
      src="http://localhost:9528/#/print/index"
      frameborder="0"
      width="100%"
      height="100%"
      class="iframe"
    ></iframe>-->
  </div>
</template>

<script>
import { mockdata } from '@/api/mock'
export default {
  data() {
    return {
      userlist: []
    }
  },
  mounted() {
    // 接收消息
    function receiveMsg(e) {
      // console.log('fruit-dashbord收到消息e.data=', e.data)
    }

    if (window.attachEvent) {
      window.attachEvent('message', receiveMsg)
    } else {
      window.addEventListener('message', receiveMsg)
    }

    // 子向父传递参数
    window.parent.postMessage({
      FunctionName: 'sonFun',
      Message: 'sonFun'
    })
    // console.log('parentwind', window.parent)

    // 父向子传递
    // var frameWin = document.getElementById('iframe').contentWindow
    // frameWin.postMessage(
    //   {
    //     data: 'fatherFn',
    //     method: 'fatherFn'
    //   },
    //   '*'
    // )
    this.testmock()
  },
  methods: {
    testmock() {
      mockdata().then(res => {
        this.userlist = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
