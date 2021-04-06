<template>
  <div class="right-table-wrp custom-page">
    <ve-table
      class="nowrap-table"
      style="width: 100%"
      :columns="formedColumn"
      :table-data="tableData"
      :show-vertical-border="false"
      row-hover-color="#eee"
      row-click-color="#edf7ff"
      :min-height="240"
      :fixed-header="true"
      is-horizontal-resize
    ></ve-table>
    <!-- :height="240" -->
    <!-- <div class="m-t-10 map-page">
      <van-pagination
        v-model="page.pageNo"
        :total-items="total"
        :items-per-page="page.pageSize"
        mode="simple"
        prev-text="<"
        next-text=">"
        @change="onPageChange"
      >
        <template slot="prev-text">
          <van-icon name="arrow-left" />
        </template>
        <template slot="next-text">
          <van-icon name="arrow" />
        </template>
        <template slot-scope="{ text }">{{ text }}</template>
      </van-pagination>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'mapTable1',
  data() {
    return {
      tableData: [
        {
          dealerName: '恩施恒信众联汽车销售服务有限公司',
          visitUser: 'zhangsan  lisii wiwlisi  fasdf fasd  fasdk'
        },
        {
          dealerName: '巴彦淖尔市航海汽车销售服务有限公司',
          visitUser: 'zhangsan  lisii wiwlisi  fasdf fasd  fasdk'
        },
        {
          dealerName: '恩施恒信众联汽车销售服务有限公司',
          visitUser: 'zhangsan  lisii wiwlisi  fasdf fasd  fasdk'
        },
        {
          dealerName: '恩施恒信众联汽车销售服务有限公司',
          visitUser: 'zhangsan  lisii wiwlisi  fasdf fasd  fasdk'
        }
      ],
      query: {
        dealerName: ''
      },
      page: {
        pageNo: 1,
        pageSize: 5
      },
      total: 0,
      getRowHeight: 40
    }
  },
  methods: {
    onPageChange(page) {
      this.page.pageNo = page
      this.queryData()
    }
  },
  computed: {
    formedColumn() {
      let colZH = [
        {
          field: 'dealerName',
          key: 'dealerName',
          title: '经销商',
          'width': 250,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true,
          ellipsis: {
            lineClamp: 2
          }
        },
        {
          field: 'region',
          title: '大区',
          'width': 100,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true
        },
        {
          field: 'province',
          title: '省份',
          'width': 100,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true
        },
        {
          field: 'visitUser',
          title: '走访人',
          'width': 150,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true,
          ellipsis: {
            lineClamp: 2
          }
        },
        {
          field: 'avgMonthVisited',
          title: '月平均被拜访量',
          'width': 100,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true
        }
      ]

      return colZH
    }
  }
}
</script>

<style lang="scss" scoped>
.right-table-wrp {
  width: 100%;
  height: 100%;
  padding: 0 20px 20px 20px;
  box-sizing: border-box;
  // overflow-y: auto;

  .search {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
  }

  .search-key {
    flex-grow: 1;
    border: 1px solid #eeeeee;
    font-size: 12px;
    padding: 2px 6px;
    margin-right: 10px;
  }
  .map-page {
    display: flex;
    justify-content: flex-end;
  }
}

.v-table-class {
  border-color: #efefef;
}
</style>
<style >
.custom-page .van-pagination__item,
.custom-page .van-pagination__page-desc {
  height: 34px;
}

.custom-page .van-pagination__prev,
.custom-page .van-pagination__next {
  font-weight: 700;
}

.custom-page .v-table-title-cell,
.custom-page .v-table-body-cell {
  border-color: #efefef;
}
</style>
