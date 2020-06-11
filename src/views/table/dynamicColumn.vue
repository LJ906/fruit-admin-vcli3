<template>
  <div class="page-wrp">
    <div class="page-inner">
      <div class="filter-wrp">
        <div class="filter-head">
          <span class="head-name">常用选项</span>
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          >全选</el-checkbox>

          <div class="filter-head-more" @click="showMore = !showMore">
            {{showMore ? '收起' : '更多'}}
            <i
              :class="showMore ? 'el-icon-arrow-up': 'el-icon-arrow-down'"
            ></i>
          </div>
        </div>

        <div class="filter-container" :class="{'show-more': showMore}">
          <el-checkbox-group v-model="checkboxVal">
            <el-checkbox v-for="item in formTheadOptions" :key="item" :label="item">{{item}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>

      <el-table :key="key" :data="tableData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="name" label="fruitName" width="180" />
        <el-table-column v-for="fruit in formThead" :key="fruit" :label="fruit">
          <template slot-scope="scope">{{ scope.row[fruit] }}</template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
const defaultFormThead = ['apple', 'banana']
export default {
  data() {
    return {
      formTheadOptions: ['apple', 'banana', 'orange'],
      tableData: [
        {
          name: 'fruit-1',
          apple: 'apple-10',
          banana: 'banana-10',
          orange: 'orange-10'
        },
        {
          name: 'fruit-2',
          apple: 'apple-20',
          banana: 'banana-20',
          orange: 'orange-20'
        }
      ],
      key: 0,
      checkboxVal: defaultFormThead,
      formThead: defaultFormThead,

      showMore: false,
      checkAll: false,
      // 改版
      isIndeterminate: true // 是否未全选
    }
  },
  mounted() {},
  methods: {
    handleCheckAllChange(val) {
      this.checkboxVal = val ? this.formTheadOptions : []
      this.isIndeterminate = false
      this.formThead = val ? this.formTheadOptions : []
      this.key = this.key + 1
    }
  },
  watch: {
    checkboxVal(valArr) {
      let checkedCount = valArr.length
      this.checkAll = checkedCount === this.formTheadOptions.length
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.formTheadOptions.length
      this.formThead = this.formTheadOptions.filter(i => valArr.indexOf(i) >= 0)
      this.key = this.key + 1 // 为了保证table 每次都会重渲 In order to ensure the table will be re-rendered each time
    }
  }
}
</script>
<style scoped lang="scss">
.filter-container {
  position: relative;
  height: 40px;
  line-height: 40px;
  overflow: hidden;
  &.show-more {
    height: auto;
  }
}
.filter-wrp {
  position: relative;
  width: 100%;
  padding: 0 10px;
  margin: 20px 0;
  box-shadow: 0px 0px 4px 0px rgba(42, 49, 66, 0.08);
  .filter-head {
    line-height: 40px;
    border-bottom: 1px solid #eeeeee94;
  }
  .head-name {
    margin-right: 20px;
  }
  .filter-head-more {
    float: right;
    width: 70px;
    text-align: center;
    line-height: 40px;
    color: #806f66;
    font-size: 14px;
    vertical-align: middle;
    cursor: pointer;
  }
}
</style>
