<template>
  <div>
    <el-button type="primary" size="mini" v-print="'#img-wrp'"
      >点击打印（window.print打印）</el-button
    >
    <el-button type="primary" size="mini" @click="print"
      >点击打印（canvas合成图片）</el-button
    >
    <br />
    <div class="img-wrp" id="img-wrp">
      <img id="img" :src="imgUrl" alt />
      <img class="signiture" :src="signitureBase64" alt="" />
    </div>

    <img id="avatar" style="width: 400px;" />
  </div>
</template>

<script>
let signitureBase64 = localStorage.getItem('lijinSigniture')

export default {
  data() {
    return {
      signitureBase64: signitureBase64,
      imgUrl: require('../../assets/401_images/401.gif'),
      printOption: {
        id: '#img',
        printTitle: '小妹妹图片'
      }
    }
  },
  mounted() {
  },
  methods: {
    print() {
      console.log('print')
      let _this = this
      var canvas = document.createElement('canvas')
      canvas.width = 700
      canvas.height = 700
      var context = canvas.getContext('2d')
      context.rect(0, 0, canvas.width, canvas.height)
      context.fillStyle = '#fff'
      context.fill()
      var myImage = new Image()
      myImage.src = _this.imgUrl // 背景图片 你自己本地的图片或者在线图片
      myImage.crossOrigin = 'Anonymous'
      myImage.onload = function() {
        context.drawImage(myImage, 0, 0, 700, 700)
        context.font = '60px Courier New'
        context.fillText('我是文字', 350, 450)
        var myImage2 = new Image()
        myImage2.src = _this.signitureBase64 // 你自己本地的图片或者在线图片
        myImage2.crossOrigin = 'Anonymous'
        myImage2.onload = function() {
          context.drawImage(myImage2, 175, 175, 225, 225)
          var base64 = canvas.toDataURL('image/png') // "image/png" 这里注意一下
          var img = document.getElementById('avatar')
          console.log('base64', base64)
          img.setAttribute('src', base64)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.img-wrp {
  position: relative;
  width: 400px;
  height: 100%;
  margin: 30px auto;
  padding-bottom: 100px;
  border: 1px solid #ccc;
  .signiture {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 150px;
    height: 150px;
  }
}
</style>
