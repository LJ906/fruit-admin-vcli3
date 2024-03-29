<template>
  <div v-if="easyFlowVisible">
    <el-row>
      <el-col :span="24" align="right">
        <el-dropdown @command="beforeAdd" style="margin-right: 10px">
          <el-button type="primary" size="mini">
            添加节点
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="apply">申请节点</el-dropdown-item>
            <el-dropdown-item command="approve">审批节点</el-dropdown-item>
            <el-dropdown-item command="check">批复节点</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <!-- <el-button type="primary" size="mini" icon="el-icon-plus" @click="addNode($event)">添加节点</el-button> -->
        <el-button type="primary" size="mini" @click="saveAll($event)" icon="el-icon-check">保存</el-button>
        <!-- <el-button type="primary" size="mini" v-print>打印页面</el-button> -->
        <el-button
          type="primary"
          size="mini"
          v-print="{ id: '#flowContainer', popTitle: '流程图' }"
        >打印流程图</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div id="flowContainer" ref="flowContainer" class="container">
          <template v-for="node in data.nodeList">
            <flow-node
              :key="node.id"
              v-show="node.show"
              :id="node.id"
              :node="node"
              @deleteNode="deleteNode"
              @changeNodeSite="changeNodeSite"
              @nodeRightMenu="nodeRightMenu"
              @clickNode="clickNode"
              @editNode="editNode"
            ></flow-node>
          </template>
        </div>
      </el-col>
    </el-row>

    <!-- 编辑弹框 -->
    <el-dialog title=" " :visible.sync="dialogEdit">
      <flow-node-form ref="nodeForm" @saveSuccess="dialogEdit = false"></flow-node-form>
    </el-dialog>
  </div>
</template>

<script>
// import draggable from 'vuedraggable'
import { jsPlumb } from 'jsplumb'
import { easyFlowMixin } from './easy_flow_mixin'
import flowNode from './components/node'
import FlowNodeForm from './components/node_form'
import lodash from 'lodash'
import { getDataA } from './components/data_A'

export default {
  data() {
    return {
      // jsPlumb 实例
      jsPlumb: null,
      // 控制画布销毁
      easyFlowVisible: true,
      // 控制流程数据form表单显示与隐藏
      flowInfoVisible: false,
      // 是否加载完毕标志位
      loadEasyFlowFinish: false,
      // 数据
      data: {},
      dialogEdit: false
    }
  },
  // 一些基础配置移动该文件中
  mixins: [easyFlowMixin],
  components: {
    flowNode,
    FlowNodeForm
  },
  mounted() {
    this.jsPlumb = jsPlumb.getInstance()
    this.$nextTick(() => {
      // 默认加载流程A的数据、在这里可以根据具体的业务返回符合流程数据格式的数据即可
      this.dataReload(getDataA())
    })
  },
  methods: {
    dataReloadA() {
      this.dataReload(getDataA())
    },
    // 返回唯一标识
    getUUID() {
      return Math.random()
        .toString(36)
        .substr(3, 10)
    },
    jsPlumbInit() {
      this.jsPlumb.ready(() => {
        // 导入默认配置
        this.jsPlumb.importDefaults(this.jsplumbSetting)
        // 会使整个jsPlumb立即重绘。
        this.jsPlumb.setSuspendDrawing(false, true)
        // 初始化节点
        this.loadEasyFlow()
        // 单点击了连接线, 单击click
        this.jsPlumb.bind('dblclick', (conn, originalEvent) => {
          this.$confirm('要删除所点击的线吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              this.jsPlumb.deleteConnection(conn)
            })
            .catch(() => {})
        })

        // 连线 成功前 beforeDrop 返回false 不能连线
        this.jsPlumb.bind('beforeDrop', evt => {
          let from = evt.sourceId
          let to = evt.targetId
          if (from === to) {
            this.$message.error('节点不支持连接自己')
            return false
          }
          if (this.hasLine(from, to)) {
            this.$message.error('该关系已存在,不允许重复创建')
            return false
          }
          if (this.hashOppositeLine(from, to)) {
            this.$message.error('不支持两个节点之间连线回环')
            return false
          }
          this.$message.success('连接成功')
          return true
        })
        // 连线成功的回调
        this.jsPlumb.bind('connection', evt => {
          let from = evt.source.id
          let to = evt.target.id
          if (this.loadEasyFlowFinish) {
            this.data.lineList.push({ from: from, to: to })
          }
        })
        // 删除连线前
        this.jsPlumb.bind('beforeDetach', evt => {})
        // 删除连线成功后的回调
        this.jsPlumb.bind('connectionDetached', evt => {
          this.deleteLine(evt.sourceId, evt.targetId)
        })

        // 改变线的连接节点
        this.jsPlumb.bind('connectionMoved', evt => {
          console.log('改变线的连接节点')
          this.changeLine(evt.originalSourceId, evt.originalTargetId)
        })

        // 连线右击
        this.jsPlumb.bind('contextmenu', evt => {
          console.log('连线右击contextmenu =', evt)
        })
      })
    },
    // 初始化流程图
    loadEasyFlow() {
      // 初始化节点
      for (var i = 0; i < this.data.nodeList.length; i++) {
        let node = this.data.nodeList[i]
        // 设置源点，可以拖出线连接其他节点
        this.jsPlumb.makeSource(node.id, this.jsplumbSourceOptions)
        // // 设置目标点，其他源点拖出的线可以连接该节点
        this.jsPlumb.makeTarget(node.id, this.jsplumbTargetOptions)
        this.jsPlumb.draggable(node.id, { containment: 'parent' })
      }
      // 初始化连线
      for (let i = 0; i < this.data.lineList.length; i++) {
        let line = this.data.lineList[i]
        this.jsPlumb.connect(
          { source: line.from, target: line.to },
          this.jsplumbConnectOptions
        )
      }
      this.$nextTick(function() {
        this.loadEasyFlowFinish = true
      })
    },
    // 删除线
    deleteLine(from, to) {
      this.data.lineList = this.data.lineList.filter(function(line) {
        if (line.from === from && line.to === to) {
          return false
        }
        return true
      })
    },
    // 改变连线
    changeLine(oldFrom, oldTo) {
      this.deleteLine(oldFrom, oldTo)
    },
    /**
     * 改变节点的位置
     * 1. 从nodeList中找到对应节点
     * 2. 改变list对应节点的left top
     */
    changeNodeSite(data) {
      for (var i = 0; i < this.data.nodeList.length; i++) {
        let node = this.data.nodeList[i]
        if (node.id === data.nodeId) {
          node.left = data.left
          node.top = data.top
        }
      }
    },
    beforeAdd(command) {
      let typeObj = {
        apply: {
          type: '申请节点',
          ico: 'el-icon-user-solid'
        },
        approve: {
          type: '审批节点',
          ico: 'el-icon-time'
        },
        check: {
          type: '批复节点',
          ico: 'el-icon-s-promotion'
        }
      }

      this.addNode({}, typeObj[command])
    },
    /**
     * 拖拽结束后添加新的节点
     * @param evt
     * @param nodeMenu 被添加的节点对象
     * @param mousePosition 鼠标拖拽结束的坐标
     */
    addNode(evt, nodeMenu) {
      let mousePosition = { left: -1, top: -1 } // 暂定添加的新节点的坐标
      let nodeId = this.getUUID()
      let left = mousePosition.left
      let top = mousePosition.top

      var node = {
        id: nodeId,
        name: '新建节点',
        type: nodeMenu.type,
        left: left + 'px',
        top: top + 'px',
        ico: nodeMenu.ico,
        show: true
      }
      /**
       * 这里可以进行业务判断、是否能够添加该节点
       */
      this.data.nodeList.push(node)
      this.$nextTick(function() {
        this.jsPlumb.makeSource(nodeId, this.jsplumbSourceOptions)
        this.jsPlumb.makeTarget(nodeId, this.jsplumbTargetOptions)
        this.jsPlumb.draggable(nodeId, {
          containment: 'parent'
        })
      })
    },
    /**
     * 删除节点
     * @param nodeId 被删除节点的ID
     */
    deleteNode(nodeId) {
      this.$confirm('确定要删除节点' + nodeId + '?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      })
        .then(() => {
          /**
           * 这里需要进行业务判断，是否可以删除
           */
          this.data.nodeList = this.data.nodeList.filter(function(node) {
            if (node.id === nodeId) {
              // 伪删除，将节点隐藏，否则会导致位置错位
              node.show = false
            }
            return true
          })
          this.$nextTick(function() {
            this.jsPlumb.removeAllEndpoints(nodeId)
          })
        })
        .catch(() => {})
      return true
    },
    clickNode(node) {
      console.log('点击节点', node)
      // this.$emit('clickNode')
      // this.$refs.nodeForm.init(this.data, nodeId)
    },
    editNode(nodeId) {
      this.dialogEdit = true
      this.$nextTick(_ => {
        this.$refs.nodeForm && this.$refs.nodeForm.init(this.data, nodeId)
      })
    },
    // 是否具有该线
    hasLine(from, to) {
      for (var i = 0; i < this.data.lineList.length; i++) {
        var line = this.data.lineList[i]
        if (line.from === from && line.to === to) {
          return true
        }
      }
      return false
    },
    // 是否含有相反的线
    hashOppositeLine(from, to) {
      return this.hasLine(to, from)
    },
    nodeRightMenu(nodeId, evt) {
      this.menu.show = true
      this.menu.curNodeId = nodeId
      this.menu.left = evt.x + 'px'
      this.menu.top = evt.y + 'px'
    },
    // 流程数据信息
    dataInfo() {
      this.flowInfoVisible = true
      this.$nextTick(function() {
        this.$refs.flowInfo.init()
      })
    },
    // 加载流程图
    dataReload(data) {
      this.easyFlowVisible = false
      this.data.nodeList = []
      this.data.lineList = []
      this.$nextTick(() => {
        data = lodash.cloneDeep(data)
        this.easyFlowVisible = true
        this.data = data
        this.$nextTick(() => {
          this.jsPlumb = jsPlumb.getInstance()
          this.$nextTick(() => {
            this.jsPlumbInit()
          })
        })
      })
    },

    changeLabel() {
      var lines = this.jsPlumb.getConnections({
        source: 'nodeA',
        target: 'nodeB'
      })
      lines[0].setLabel({
        label: '',
        cssClass: 'labelClass a b'
      })
    },
    saveAll() {
      console.log('this.data', this.data)
      this.$emit('saveData', this.data)
    }
  }
}
</script>

<style>
#flowContainer {
  /* background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.15) 10%, rgba(0, 0, 0, 0) 10%), linear-gradient(rgba(0, 0, 0, 0.15) 10%, rgba(0, 0, 0, 0) 10%); */
  /* background-size: 10px 10px; */
  height: 700px;
  background-color: rgb(251, 251, 251);
  position: relative;
}

.labelClass {
  background-color: white;
  padding: 5px;
  opacity: 0.7;
  border: 1px solid #346789;
  /*border-radius: 10px;*/
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.flow-tooltar {
  padding-left: 10px;
  box-sizing: border-box;
  border: 1px solid #e9e9e9;
  height: 42px;
  line-height: 42px;
  z-index: 3;
  -webkit-box-shadow: 0 8px 12px 0 rgba(0, 52, 107, 0.04);
  box-shadow: 0 8px 12px 0 rgba(0, 52, 107, 0.04);
}
</style>
