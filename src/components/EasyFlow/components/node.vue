<template>
  <div
    ref="node"
    :style="nodeContainerStyle"
    @mouseenter="mouseEnter=true"
    @mouseleave="mouseEnter=false"
    @click="clickNode"
    @mouseup="changeNodePosition"
    class="flow-node-container"
  >
    <div class="flow-node-left"></div>

    <div class="flow-node-left-ico flow-node-drag">
      <i :class="nodeIcoClass"></i>
    </div>

    <div class="flow-node-text" :show-overflow-tooltip="true">{{node.name}}</div>

    <div class="flow-node-right-ico" v-if="mouseEnter" >
      <i class="el-icon-edit" style="margin-bottom: 4px" @click="editNode"></i>
      <i class="el-icon-delete"  @click="deleteNode"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    node: Object
  },
  data() {
    return {
      // 控制节点操作显示
      mouseEnter: false
      // stateImg: require('../img/ok.png')
    }
  },
  computed: {
    // 节点容器样式
    nodeContainerStyle() {
      return {
        top: this.node.top,
        left: this.node.left
      }
    },
    nodeIcoClass() {
      var nodeIcoClass = {}
      nodeIcoClass[this.node.ico] = true
      // 添加该class可以推拽连线出来
      nodeIcoClass['flow-node-drag'] = true
      return nodeIcoClass
    }
  },
  methods: {
    // 删除节点
    deleteNode() {
      this.$emit('deleteNode', this.node.id)
    },
    // 点击节点
    clickNode() {
      this.$emit('clickNode', this.node.id)
    },
    // 鼠标移动后抬起
    changeNodePosition() {
      // 避免抖动
      if (
        this.node.left === this.$refs.node.style.left &&
        this.node.top === this.$refs.node.style.top
      ) {
        return
      }
      this.$emit('changeNodeSite', {
        nodeId: this.node.id,
        left: this.$refs.node.style.left,
        top: this.$refs.node.style.top
      })
    },
    editNode() {
      this.$emit('editNode', this.node.id, this.node)
    }
  }
}
</script>

<style>
.flow-node-header {
  background-color: #66a6e0;
  height: 25px;
  cursor: pointer;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}

.flow-node-header a {
  text-decoration: none;
  line-height: 25px;
  vertical-align: middle;
}

.flow-node-header a img {
  line-height: 25px;
  vertical-align: middle;
  margin-bottom: 5px;
}

.flow-node-body {
  /*background-color: beige;*/
  background-color: white;
  text-align: center;
  cursor: pointer;
  height: 25px;
  line-height: 25px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}

/* 修改、删除按钮样式*/
.flow-node-operate {
  position: absolute;
  top: 0px;
  right: 0px;
  line-height: 25px;
}

.flow-node-container {
  position: absolute;
  display: flex;
  width: 200px;
  height: 43px;
  border: 1px solid #e0e3e7;
  border-radius: 3px;
  background-color: #fff;
}

.flow-node-container:hover {
  /* 设置移动样式*/
  cursor: move;
  background-color: #f0f7ff;
  /*box-shadow: #1879FF 0px 0px 12px 0px;*/
  background-color: #f0f7ff;
  border: 1px solid #1879ff;
}

.flow-node-left {
  width: 4px;
  background-color: #1879ff;
  border-radius: 4px 0 0 4px;
}

.flow-node-left-ico {
  line-height: 35px;
  margin-left: 8px;
}

.flow-node-left-ico:hover {
  /* 设置拖拽的样式 */
  cursor: crosshair;
}

.flow-node-text {
  color: #565758;
  font-size: 12px;
  /* line-height: 35px; */
  margin-left: 8px;
  width: 140px;
  /* 设置超出宽度文本显示方式*/
  /* white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; */
  line-height: 1.2;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
}

.flow-node-right-ico {
  /* line-height: 35px; */
  position: absolute;
  right: 4px;
  color: #84cf65;
  cursor: default;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
