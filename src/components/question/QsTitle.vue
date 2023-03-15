<template>
  <p class="qstitle">{{ title }}</p>
</template>

<script setup>
const props = defineProps(["title"])
</script>

<style scoped>
.qstitle{
  font-size: 18px;
}

</style>