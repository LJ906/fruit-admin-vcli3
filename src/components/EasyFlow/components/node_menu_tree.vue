<template>
  <div class="flow-menu" ref="tool">
    <h4 style="text-align:left">{{treeType === 'apply'? '申请部门' : '审批部门'}}</h4>
    <el-tree
      :data="treeData"
      default-expand-all
      :props="defaultProps"
      :expand-on-click-node="false"
      @node-click="handleNodeClick"
    ></el-tree>

    <el-collapse v-model="activeNames" class="overauto">
      <el-collapse-item v-for="menu  in  menuList" :key="menu.id" :name="menu.id" >
        <template slot="title">{{menu.name}}</template>
        <div
          v-for="son in menu.children"
          :type="son.type"
          :key="son.id"
          class="flow-node-menu"
          :style="son.style"
          @click="typeMenuClick(son)"
        >
          <div class="flow-node-menu-left"></div>
          <div class="flow-node-menu-left-ico">
            <i :class="son.ico"></i>
          </div>
          <div class="flow-node-menu-text">{{son.name}}</div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
var mousePosition = {
  left: -1,
  top: -1
}

export default {
  props: {
    treeType: String
  },
  data() {
    return {
      activeNames: '1',
      // draggable配置参数参考 https://www.cnblogs.com/weixin186/p/10108679.html
      draggableOptions: {
        preventOnFilter: false,
        sort: false,
        disabled: false,
        ghostClass: 'tt',
        // 不使用H5原生的配置
        forceFallback: true,
        // 拖拽的时候样式
        fallbackClass: 'flow-node-draggable'
      },
      // 默认打开的左侧菜单的id
      defaultOpeneds: ['1', '2'],
      menuList1: [
        {
          id: '1',
          type: 'group',
          name: '申请节点',
          ico: 'el-icon-video-play',
          children: [
            {
              id: '11',
              type: 'timer',
              name: '辐射安全分析报告申请',
              ico: 'el-icon-user-solid'
            },
            {
              id: '12',
              type: 'task',
              name: '安全分析报告书(军工)申请',
              ico: 'el-icon-user-solid'
            },
            {
              id: '123',
              type: 'task',
              name: '容器设计/制造/使用申请',
              ico: 'el-icon-user-solid'
            },
            {
              id: '121',
              type: 'timer',
              name: '辐射安全分析报告申请',
              ico: 'el-icon-user-solid'
            },
            {
              id: '142',
              type: 'task',
              name: '安全分析报告书(军工)申请',
              ico: 'el-icon-user-solid'
            },
            {
              id: '113',
              type: 'task',
              name: '容器设计/制造/使用申请',
              ico: 'el-icon-user-solid'
            },
            {
              id: '131',
              type: 'timer',
              name: '辐射安全分析2报告申请',
              ico: 'el-icon-user-solid'
            },
            {
              id: '132',
              type: 'task',
              name: '安全分析报4告书(军工)申请',
              ico: 'el-icon-user-solid'
            },
            {
              id: '133',
              type: 'task',
              name: '2容器设计/制造/使用申请',
              ico: 'el-icon-user-solid'
            }
          ]
        }
      ],
      menuList2: [
        {
          id: '2',
          type: 'group',
          name: '批复节点',
          ico: 'el-icon-video-pause',
          children: [
            {
              id: '21',
              type: 'end',
              name: '报告审批',
              ico: 'el-icon-document-checked'
            },
            {
              id: '22',
              type: 'over',
              name: '报告审查',
              ico: 'el-icon-document-checked'
            },
            {
              id: '241',
              type: 'end',
              name: '报告审批',
              ico: 'el-icon-document-checked'
            },
            {
              id: '252',
              type: 'over',
              name: '报告审查',
              ico: 'el-icon-document-checked'
            }
          ]
        }
      ],
      nodeMenu: {},

      // 新增添加tree 组件
      treeData: [
        {
          label: '部门1',
          id: 1,
          children: [
            {
              label: '部门21-1',
              id: '11',
              children: [
                {
                  id: '12',
                  label: '部门3 1-1-1'
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  computed: {
    menuList() {
      return this.treeType === 'apply' ? this.menuList1 : this.menuList2
    }
  },
  components: {
    // draggable
  },
  created() {
    /**
     * 以下是为了解决在火狐浏览器上推拽时弹出tab页到搜索问题
     * @param event
     */
    if (this.isFirefox()) {
      document.body.ondrop = function(event) {
        // 解决火狐浏览器无法获取鼠标拖拽结束的坐标问题
        mousePosition.left = event.layerX
        mousePosition.top = event.clientY - 50
        event.preventDefault()
        event.stopPropagation()
      }
    }
  },
  methods: {
    // 根据类型获取左侧菜单对象
    getMenu(type) {
      for (let i = 0; i < this.menuList.length; i++) {
        let children = this.menuList[i].children
        for (let j = 0; j < children.length; j++) {
          if (children[j].type === type) {
            return children[j]
          }
        }
      }
    },
    // 拖拽开始时触发 移动开始时拿到要添加的node
    move(evt, a, b, c) {
      var type = evt.item.attributes.type.nodeValue
      this.nodeMenu = this.getMenu(type)
    },
    // 拖拽结束时触发
    end(evt, e) {
      this.$emit('addNode', evt, this.nodeMenu, mousePosition)
    },
    // 是否是火狐浏览器
    isFirefox() {
      var userAgent = navigator.userAgent
      if (userAgent.indexOf('Firefox') > -1) {
        return true
      }
      return false
    },
    handleNodeClick(data) {
      this.$emit('treeNodeClick', data, this.treeType)
    },
    typeMenuClick(nodeType) {
      this.$emit('typeMenuClick', nodeType, this.treeType)
    }
  }
}
</script>
<style>
.flow-menu {
  text-align: center;
}

.flow-tool-menu {
  background-color: #eeeeee;
  cursor: pointer;
  padding-left: 5px;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #979797;
}

.flow-tool-submenu {
  background-color: white;
  padding-left: 20px;
  cursor: pointer;
  height: 50px;
  line-height: 50px;
  vertical-align: middle;
  border-bottom: 1px solid #d3d3d3;
}

.flow-node-draggable {
  border: 1px solid #1879ff;
  height: 35px !important;
  width: 170px !important;
  line-height: 35px;
}

.flow-node-menu {
  margin: 10px;
  display: flex;
  width: 200px;
  height: 30px;
  border: 1px solid #e0e3e7;
  border-radius: 5px;
  background-color: #fff;
}

.flow-node-menu:hover {
  /* 设置移动样式*/
  cursor: move;
  /* box-shadow: #1879FF 0px 0px 4px 0px; */
  background-color: #f0f7ff;
  border: 1px solid #1879ff;
}

.flow-node-menu-left {
  width: 4px;
  background-color: #1879ff;
  border-radius: 3px 0 0 3px;
}

.flow-node-menu-left-ico {
  line-height: 30px;
  margin-left: 4px;
  color: 'red';
}

.flow-node-menu-text {
  margin-left: 4px;
  color: #565758;
  font-size: 12px;
  width: 140px;
  line-height: 1.2;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
}

.overauto .el-collapse-item__content {
  height: 400px;
  overflow-y: auto;
}
</style>
