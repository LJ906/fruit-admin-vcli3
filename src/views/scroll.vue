<template>
  <div>
    <div class="horizontal-container">
      <div class="scroll-wrapper" ref="scroll">
        <div class="scroll-content">
          <div class="scroll-item" v-for="(item, index) in emojis" :key="index">{{item}}</div>
        </div>
      </div>
    </div>

    <div class="menu-container">
      <div class="logo">logo</div>
      <div class="scroll-wrapper" ref="menuScroll">
        <div class="scroll-content">
          <el-menu :default-active="'1'" class="el-menu-demo" mode="horizontal">
            <el-menu-item index="1" class>处理中心</el-menu-item>
            <el-submenu index="2" class>
              <template slot="title">我的工作台</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
              <el-menu-item index="2-3">选项3</el-menu-item>
              <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项1</el-menu-item>
                <el-menu-item index="2-4-2">选项2</el-menu-item>
                <el-menu-item index="2-4-3">选项3</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="3" class>消息中心</el-menu-item>
            <el-menu-item index="32">消息中心</el-menu-item>
            <el-menu-item index="31">消息中心</el-menu-item>
            <el-menu-item index="11">消息中心</el-menu-item>
            <el-menu-item index="33">消息中心</el-menu-item>
            <el-menu-item index="313">消息中心</el-menu-item>
            <el-menu-item index="323">消息中心</el-menu-item>
            <el-menu-item index="333">消息中心</el-menu-item>
            <el-menu-item index="353">消息中心</el-menu-item>
            <el-menu-item index="363">消息中心</el-menu-item>
            <el-menu-item index="383">消息中心</el-menu-item>
            <el-menu-item index="4">
              <a href="https://www.ele.me" target="_blank">订单管理</a>
            </el-menu-item>
          </el-menu>
        </div>
      </div>
    </div>

    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide>Slide 1</swiper-slide>
      <swiper-slide>Slide 2</swiper-slide>
      <swiper-slide>Slide 3</swiper-slide>
      <swiper-slide>Slide 4</swiper-slide>
      <swiper-slide>Slide 5</swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'

export default {
  data() {
    return {
      emojis: [
        '👉🏼 😁 😂 🤣 👈🏼',
        '😄 😅 😆 😉 😊',
        '😫 😴 😌 😛 😜',
        '👆🏻 😒 😓 😔 👇🏻',
        '😑 😶 🙄 😏 😣',
        '😞 😟 😤 😢 😭',
        '🤑 😲 ☹️ 🙁 😖',
        '👍 👎 👊 ✊ 🤛',
        '☝️ ✋ 🤚 🖐 🖖',
        '👍🏼 👎🏼 👊🏼 ✊🏼 🤛🏼',
        '☝🏽 ✋🏽 🤚🏽 🖐🏽 🖖🏽',
      ],
      list: [1, 3],
      swiperOptions: {
        direction: 'horizontal',
        slidesPerView: 'auto',
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    },
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.bs.destroy()
  },
  methods: {
    init() {
      this.bs = new BScroll(this.$refs.scroll, {
        scrollX: true,
        mouseWheel: true,
        probeType: 2, // pc端设置
      })
      this._registerHooks(['scroll', 'scrollEnd'], (pos) => {
        console.log('scroll')
      })

      this.bs2 = new BScroll(this.$refs.menuScroll, {
        scrollX: true,
        mouseWheel: true,
        probeType: 2, // pc端设置
      })
    },
    _registerHooks(hookNames, handler) {
      hookNames.forEach((name) => {
        this.bs.on(name, handler)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.horizontal-container {
  margin: 40px auto;
  .scroll-wrapper {
    width: 90%;
    margin: 80px auto;
    white-space: nowrap;
    border: 3px solid #42b983;
    border-radius: 5px;
    overflow: hidden;
    .scroll-content {
      display: inline-block;
    }
    .scroll-item {
      height: 50px;
      line-height: 50px;
      font-size: 24px;
      display: inline-block;
      text-align: center;
      padding: 0 10px;
    }
  }
}

.menu-container {
  margin: 40px auto;
  width: 100%;
  display: flex;
  .logo {
    width: 300px;
    border: 1px solid #eee;
  }
  .scroll-wrapper {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    border: 3px solid #42b983;
    border-radius: 5px;
  }
  .scroll-content {
    display: inline-block;
  }
  .el-menu-demo {
    display: inline-flex;
  }
}
.swiper-container {
  --swiper-theme-color: #ff6600; /* 设置Swiper风格 */
  --swiper-navigation-color: #00ff33; /* 单独设置按钮颜色 */
  --swiper-navigation-size: 30px; /* 设置按钮大小 */
}
.swiper-container {
  width: 700px;
  background-color: goldenrod;
  .swiper-slide {
    width: 200px;
    line-height: 70px;
    background-color: red;
  }
}
</style>
