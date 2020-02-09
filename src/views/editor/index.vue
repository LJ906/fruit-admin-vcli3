<template>
  <div class="editor-wrp">
    <div>
      <tinymce v-model="content" :height="300" />
    </div>
    <h3>输入的内容预览</h3>
    <div class="editor-content" v-html="content" />
  </div>
</template>

<script>
import Tinymce from '@/components/TinyMce/index'
export default {
  name: 'Editor',
  components: {
    Tinymce
  },
  data() {
    return {
      content: '内容' // 双向绑定输入的内容 content 为html标签
    }
  }
}
</script>

<style lang="scss" scoped>
.editor-content {
  margin-top: 20px;
}
</style>
