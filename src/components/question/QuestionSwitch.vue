<template>
  <div v-if="qs_type === '判断题'">
    <QsTitle :title="qs_title"/>
    <n-switch size="large" v-model:value="answers[index]" checked-value="正确" unchecked-value="错误">
      <template #checked>
        正确
      </template>
      <template #unchecked>
        错误
      </template>
    </n-switch>
  </div>
</template>

<script setup>
import QsTitle from "@/components/question/QsTitle.vue";
const props = defineProps(["qs_type","qs_title","answers","index"])

</script>

<style scoped>

</style>