<template>
  <svg>
    <use :href="iconName"></use>
  </svg>
</template>
<script>
export default {
  props: {
    name: String
    // style: Object
  },
  computed: {
    iconName() {
      return `#${this.name}`
    }
  }
}
</script>
<style scoped>
</style>
