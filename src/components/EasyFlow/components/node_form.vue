<template>
  <div class="flow-node-form">
    <div class="flow-node-form-header">节点信息</div>
    <div class="flow-node-form-body">
      <el-form :model="node" ref="dataForm" label-width="80px">
        <el-form-item label="类型">
          <el-input v-model="node.type" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="node.name"></el-input>
        </el-form-item>
        <el-form-item label="left坐标">
          <el-input v-model="node.left"></el-input>
        </el-form-item>
        <el-form-item label="top坐标">
          <el-input v-model="node.top"></el-input>
        </el-form-item>
        <el-form-item label="ico图标">
          <el-input v-model="node.ico" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item align="right">
          <el-button @click="reset" icon="el-icon-close" size="small">重置</el-button>
          <el-button type="primary" icon="el-icon-check" @click="save" size="small">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'

export default {
  data() {
    return {
      node: {},
      data: {}
    }
  },
  methods: {
    /**
     * 表单修改，这里可以根据传入的ID进行业务信息获取
     * @param data
     * @param id
     */
    init(data, id) {
      this.data = data
      data.nodeList.filter(node => {
        if (node.id === id) {
          this.node = cloneDeep(node)
        }
      })
    },
    reset() {
      this.data.nodeList.filter(node => {
        if (node.id === this.node.id) {
          this.node = cloneDeep(node)
        }
      })
    },
    resetNodeName({ name, type }) {
      this.node.name = name
      this.node.type = type === 'apply' ? '申请节点' : '审批节点'
    },
    save() {
      this.data.nodeList.filter(node => {
        if (node.id === this.node.id) {
          node.name = this.node.name
        }
      })

      this.$emit('saveSuccess')
    }
  }
}
</script>

<style>
.flow-node-form {
  /* background-color: #f7f9fb; */
  /*margin-left: 5px;*/
  border: 1px solid #eee;
}

.flow-node-form-header {
  height: 32px;
  border-top: 1px solid #dce3e8;
  border-bottom: 1px solid #dce3e8;
  /* background: #ebeef2; */
  color: #000;
  line-height: 32px;
  padding-left: 12px;
  font-size: 14px;
}

.flow-node-form-body {
  margin-top: 10px;
  padding-right: 10px;
  padding-bottom: 20px;
}
</style>
