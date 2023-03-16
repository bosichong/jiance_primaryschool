<template>

  <div v-if="qs_type === '多选题'">
    <QsTitle :title="qs_title"/>
    <n-checkbox-group v-model:value="answers[index]">
      <n-space vertical align="start">
        <n-checkbox
            v-for="q in options"
            :key="q"
            :value="q"
        >
          {{ q }}
        </n-checkbox>
      </n-space>
    </n-checkbox-group>
  </div>

</template>

<script setup>
import QsTitle from "@/components/question/QsTitle.vue";

const props = defineProps(["qs_type","qs_title","options","answers","index"])

</script>

<style scoped>
.n-checkbox{
  font-size: 1.1rem;
}

</style>