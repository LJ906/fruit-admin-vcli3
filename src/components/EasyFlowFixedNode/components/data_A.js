var dataA = {
  name: '流程a',
  nodeList: [
    {
      id: '1-1',
      name: '核辐射安全分析报告',
      type: '申请',
      left: '20px',
      backgroundColor: '#E65D6E',
      top: '70px',
      ico: 'el-icon-user-solid',
      show: true
    },
    {
      id: '1-2',
      name: '核辐射安全技术审查',
      backgroundColor: '#30B08F',
      type: '申请',
      left: '20px',
      top: '160px',
      ico: 'el-icon-user-solid',
      show: true
    },
    {
      id: '1-3',
      name: '乏燃料运输事故运输应急预案申请',
      type: '申请',
      left: '20px',
      top: '250px',
      ico: 'el-icon-present',
      show: true
    }, {
      id: '1-4',
      name: '乏燃料运输事故运输应急预案申请批复',
      type: '申请',
      left: '20px',
      top: '340px',
      ico: 'el-icon-present',
      show: true
    },
    {
      id: '1-5',
      name: '乏燃料启运申请',
      type: '申请',
      left: '20px',
      top: '430px',
      ico: 'el-icon-present',
      show: true
    },
    {
      id: '1-6',
      name: '乏燃料启运申请审批',
      type: '申请',
      left: '20px',
      top: '540px',
      ico: 'el-icon-present',
      show: true
    },
    {
      id: '1-7',
      name: '启运地环保厅备案申请',
      type: '申请',
      left: '310px',
      top: '540px',
      ico: 'el-icon-present',
      show: true
    },
    {
      id: '1-8',
      name: '启运地环保厅辐射处审批',
      type: '申请',
      left: '600px',
      top: '540px',
      ico: 'el-icon-present',
      show: true
    },
    {
      id: '2-2',
      type: '申请',
      name: '辐射安全分析报告申请批复',
      left: '320px',
      top: '160px',
      ico: 'el-icon-time',
      show: true
    },
    {
      id: '2-3',
      type: '申请',
      name: '甘肃审环保厅辐射处审批',
      left: '320px',
      top: '250px',
      ico: 'el-icon-time',
      show: true
    },
    {
      id: '3-1',
      type: '申请',
      name: '安全分析报告书(军工)申请',
      left: '640px',
      top: '70px',
      ico: 'el-icon-time',
      show: true
    },
    {
      id: '3-2',
      type: '申请',
      name: '核安全技术审评',
      left: '640px',
      top: '160px',
      ico: 'el-icon-time',
      show: true
    },
    {
      id: '3-3',
      type: '申请',
      name: '国防科工局应安司审批',
      left: '310px',
      top: '438px',
      ico: 'el-icon-time',
      show: true
    }
  ],
  lineList: [{
    from: '1-1',
    to: '1-2'
  }, {
    from: '1-2',
    to: '1-3'
  }, {
    from: '1-3',
    to: '1-4'
  },
  {
    from: '1-4',
    to: '1-5'
  },
  {
    from: '1-5',
    to: '1-6'
  },
  {
    from: '1-6',
    to: '1-7'
  },
  {
    from: '1-7',
    to: '1-8'
  },
  {
    from: '1-1',
    to: '2-2'
  },
  {
    from: '2-2',
    to: '2-3'
  },
  {
    from: '2-3',
    to: '1-5'
  },
  {
    from: '3-1',
    to: '3-2'
  },
  {
    from: '3-2',
    to: '3-3'
  },
  {
    from: '3-3',
    to: '1-5'
  }
  ]
}

export function getDataA() {
  return dataA
}
