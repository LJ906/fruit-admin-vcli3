export const easyFlowMixin = {
  data() {
    return {
      jsplumbSetting: {
        // 动态锚点、位置自适应
        Anchors: ['Top', 'TopCenter', 'TopRight', 'TopLeft', 'Right', 'RightMiddle', 'Bottom', 'BottomCenter', 'BottomRight', 'BottomLeft', 'Left', 'LeftMiddle'],
        Container: 'flowContainer',
        // 连线的样式 StateMachine、Flowchart，Bezier
        Connector: ['Flowchart', { cornerRadius: 5, joinstyle: 'round' }],
        // 鼠标不能拖动删除线
        ConnectionsDetachable: true,
        // 删除线的时候节点不删除(false节点删除， true 节点删除)
        DeleteEndpointsOnDetach: false, // 待定
        // 连线的端点：圆形(hover连接线时显示的样式)
        Endpoint: ['Dot', { radius: 3 }],
        // Endpoint: ['Rectangle', { height: 10, width: 10 }],
        // Endpoint: 'Blank',
        // 线端点的样式（静态）
        EndpointStyle: { fill: 'rgba(255,255,255,0)', outlineWidth: 1 },
        // 鼠标滑过线端点的效果
        EndpointHoverStyle: { fill: '#f76258' },
        // 是否打开jsPlumb的内部日志记录
        LogEnabled: true,
        // 绘制线 (虚线： dashstyle: '4' )
        PaintStyle: { stroke: '#E0E3E7', strokeWidth: 1 },
        // 鼠标滑过线的样式
        HoverPaintStyle: { stroke: '#1879FF' },
        // 绘制箭头
        Overlays: [
          ['Arrow', { width: 10, length: 8, location: 1, foldback: 0.8 }],
          ['Label', { location: 0.1, id: 'label', cssClass: 'aLabel' }]
        ],
        // 待定，线上的文字标识
        // ConnectionOverlays: [
        //   ['Label', {
        //     label: "${label}",
        //     id: 'label-1',
        //     cssClass: 'csslabel'
        //   }]
        // ],

        // 绘制图的模式 svg、canvas
        RenderMode: 'svg',
        // 没看到效果
        DragOptions: {
          cursor: 'pointer',
          zIndex: 2000,
          hoverClass: 'dropHover',
          activeClass: 'dragActive'
        },
        scope: 'green dot'
      },
      // jsplumb连接参数
      jsplumbConnectOptions: {
        isSource: true,
        isTarget: true,
        cornerRadius: 5,
        // 动态锚点、提供了4个方向 Continuous，AutoDefault
        anchor: 'Continuous'
      },
      jsplumbSourceOptions: {
        /* "span"表示标签，".className"表示类，"#id"表示元素id */
        filter: '.flow-node-drag', // 画线的选择器
        filterExclude: false,
        anchor: 'Continuous',
        allowLoopback: false // 不允许相反路线
      },
      jsplumbTargetOptions: {
        // "span"表示标签，".className"表示类，"#id"表示元素id
        filter: '.flow-node-drag',
        filterExclude: false,
        anchor: 'Continuous',
        allowLoopback: false
      }
    }
  }
}
