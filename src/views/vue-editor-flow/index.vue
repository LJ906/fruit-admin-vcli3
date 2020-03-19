<template>
  <div id="container"></div>
</template>

<script>
import G6 from '@antv/g6'

export default {
  data() {
    return {
      // 点集
      opt: {
        nodes: [
          {
            id: '1-1', // String，该节点存在则必须，节点的唯一标识
            label: 'node1' // 标签文字
            // x: 100, // Number，可选，节点位置的 x 值
            // y: 200 // Number，可选，节点位置的 y 值
          },
          {
            id: '1-2',
            label: 'node3'
          },
          {
            id: '1-3',
            label: 'Circle2'
          },
          {
            id: '1-4',
            label: 'node4'
          },
          {
            id: '1-5',
            label: 'node5'
          },
          {
            id: '2-2',
            label: 'node6'
          },
          {
            id: '2-3',
            label: 'node7'
          },
          {
            id: '3-1',
            label: 'node8'
          },
          {
            id: '3-2',
            label: 'node9'
          }
        ],
        // 边集 连线
        edges: [
          {
            source: '1-1', // String，必须，起始点 id
            target: '1-2'
          },
          {
            source: '1-2', // String，必须，起始点 id
            target: '1-3'
          },
          {
            source: '1-3', // String，必须，起始点 id
            target: '1-4'
          },
          {
            source: '1-4', // String，必须，起始点 id
            target: '1-5'
          },
          {
            source: '1-1', // String，必须，起始点 id
            target: '2-2'
          },
          {
            source: '2-2', // String，必须，起始点 id
            target: '2-3'
          }
        ]
      }
    }
  },
  mounted() {
    G6.registerNode(
      'sql',
      {
        drawShape(cfg, group) {
          const rect = group.addShape('rect', {
            attrs: {
              x: -75,
              y: -25,
              width: 150,
              height: 50,
              radius: 10,
              stroke: '#5B8FF9',
              fill: '#C6E5FF',
              lineWidth: 3
            },
            name: 'rect-shape'
          })
          if (cfg.name) {
            group.addShape('text', {
              attrs: {
                text: cfg.name,
                x: 0,
                y: 0,
                fill: '#00287E',
                fontSize: 14,
                textAlign: 'center',
                textBaseline: 'middle',
                fontWeight: 'bold'
              },
              name: 'text-shape'
            })
          }
          return rect
        }
      },
      'single-node'
    )
    G6.Global.nodeStateStyle.selected = {
      stroke: '#d9d9d9',
      fill: '#5394ef'
    }

    const graph = new G6.Graph({
      container: 'container',
      width: document.getElementById('container').scrollWidth || 1000,
      height: document.getElementById('container').scrollHeight || 500,
      layout: {
        type: 'dagre',
        nodesepFunc: d => {
          if (d.id === '3') {
            return 500
          }
          return 50
        },
        ranksep: 70
      },
      fitView: true,
      fitViewPadding: [20, 40, 50, 20],
      startArrow: true,
      defaultNode: {
        // 节点属性
        shape: 'rect',
        startArrow: true,
        size: [267, 44], // 节点长宽的大小
        color: '#5B8FF9', // 节点描边的颜色
        style: {
          // 节点其他样式
          fill: '#ccc', // 节点的填充色 背景色
          stroke: '#5B8FF9', // 描边
          lineWidth: 3, // 描边色
          radius: 3,
          cursor: true
        },
        labelCfg: {
          // 节点标签属性
          style: {
            fill: '#182024', // 标签的填充色 文字颜色
            fontSize: 20,
            overflow: 'hidden',
            position: 'center' // 标签居中方式
          }
        }
      },
      // 边在默认状态下的样式配置（style）和其他配置
      defaultEdge: {
        shape: 'polyline', // 曲线连接
        style: {
          radius: 20,
          offset: 45,
          endArrow: true,
          lineWidth: 2,
          stroke: '#C2C8D5'
        }
      },
      mode: {}
    })

    graph.data(this.opt)
    graph.render()
  }
}
</script>

<style lang="scss" scoped>
</style>
