<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      apptest: '8989'
    }
  },
  mounted() {
    // this.getConfigJson()
  }
}
</script>
