<template>
  <div  style="display: flex;">
    <custom-pie></custom-pie>
    <word-cloud></word-cloud>
  </div>
</template>

<script>
import WordCloud from './wordCloud'
import CustomPie from './customPie'
export default {
  components: {
    WordCloud,
    CustomPie
  }
}
</script>
