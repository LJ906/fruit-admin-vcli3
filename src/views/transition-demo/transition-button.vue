<template>
  <div class="mixin-components-container">
    <!-- button动画 -->
    <el-row>
      <el-card class="box-card">
        <div slot="header">Buttons hover动画</div>
        <div style="margin-bottom: 50px">
          <el-col :span="4">
            <router-link class="pan-btn pink-btn" to="/drag/index">button</router-link>
          </el-col>
          <el-col :span="4">
            <router-link class="pan-btn light-blue-btn" to="/drag/index">drag</router-link>
          </el-col>
          <el-col :span="4">
            <router-link class="pan-btn red-btn" to="/drag/index">drag</router-link>
          </el-col>

          <el-col :span="4">
            <router-link class="pan-btn blue-btn" to="/drag/index">drag</router-link>
            <router-link class="pan-btn yellow-btn" to="/drag/index">drag</router-link>
          </el-col>
          <el-col :span="4">
            <router-link class="pan-btn green-btn" to="/drag/index">drag</router-link>
            <router-link class="pan-btn tiffany-btn" to="/drag/index">drag</router-link>
          </el-col>
        </div>
      </el-card>
    </el-row>
    <!-- hover 动画  -->
    <el-row :gutter="20" style="margin-top: 30px;">
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>水波纹 waves v-directive</span>
          </div>
          <div class="component-item">
            <el-button v-waves type="primary">水波纹v-waves</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import waves from '@/directives/waves'
export default {
  name: 'TransitionDemo',
  directives: {
    waves
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.mixin-components-container {
  background-color: #f0f2f5;
  padding: 30px;
  min-height: calc(100vh - 84px);
}
.component-item {
  min-height: 100px;
}
</style>

