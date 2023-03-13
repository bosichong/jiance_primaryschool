<template>
  <div class="start" v-if="index < 0">
    <n-space vertical>

      <n-h2>
        <n-text type="primary">{{ title }}</n-text>
      </n-h2>
      <n-text>本次检测共有{{ count }}道题</n-text>
      <n-text>{{ description }}</n-text>
      <n-button type="success" @click="$emit('add-index')">开始答题</n-button>
    </n-space>

  </div>
</template>

<script setup>
defineProps(["index", "title", "description","count"])
defineEmits(['add-index'])


</script>

<style scoped>

</style>