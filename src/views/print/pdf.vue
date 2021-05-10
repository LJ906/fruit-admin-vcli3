<template>
  <div class="p-30">
    <el-form ref="form" :model="form" label-width="80px" :inline="true">
      <el-form-item label="姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
    </el-form>
    <p>这是一个文案</p>
    <p>这是一个文案</p>
    <p>这是一个文案</p>
    <p>这是一个文案</p>
    <p>这是一个文案</p>
    <p>这是一个文案</p>
    <p>这是一个文案</p>
    <p>这是一个文案</p>

    <el-button @click="previewDOC">预览文件</el-button>
    <el-dialog title="预览" :visible.sync="dialogVisible" width="70%">
      <div id="downpdf" class="pdfwrp border-wrp">
        <p>姓名: {{ form.name }}</p>
        <p>地址：{{ form.address }}</p>
        <p>这是一个文案</p>
        <p>这是一个文案</p>
        <p>这是一个文案</p>
        <p>这是一个文案</p>
        <p>这是一个文案</p>
        <p>这是一个文案</p>
        <p>这是一个文案</p>
        <p>这是一个文案</p>

        <div align="right">
          <img :src="signImg" class="sign" alt="" />
        </div>
      </div>
      <!-- <img class="doc-img" :src="imgurl" alt="" /> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="downloadPDF">下载文件</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        address: ''
      },
      dialogVisible: false,
      imgurl: '',
      signImg: '',
      showSignature: false
    }
  },
  mounted() {
    this.signImg = localStorage.getItem('lijinSigniture')
  },
  methods: {
    async previewDOC() {
      this.dialogVisible = true
      // setTimeout(async () => {
      //   let imgurl = await this.html2PDF('downpdf', 'name')
      //   this.imgurl = imgurl
      //   this.showSignature = true
      // }, 1000)
    },
    async downloadPDF() {
      let imgurl = await this.html2PDF('downpdf', 'name')
      this.imgurl = imgurl
    }
  }
}
</script>

<style lang="scss" scoped>
.p-30 {
  padding: 30px;
}
.border-wrp {
  border: 1px solid #ccc;
}
.pdfwrp {
  padding: 50px;
  margin: 30px;
  width: 592.28px;
  height: 841.89px;
  margin: 0 auto;
  position: relative;
  .sign {
    position: absolute;
    width: 120px;
    height: 120px;
    right: 30px;
    bottom: 30px;
  }
}
.preview-wrp {
  width: 592.28px;
  height: 841.89px;
  border: 1px solid #e6dfdf;
  position: relative;
  .doc-img {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
  .sign-img {
    position: absolute;
    right: 20px;
    bottom: 20px;
    width: 120px;
  }
}
</style>
