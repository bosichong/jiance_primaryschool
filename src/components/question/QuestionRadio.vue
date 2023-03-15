<template>
  <div v-if="qs_type === '单选题'">
    <QsTitle :title="qs_title"/>
    <n-radio-group v-model:value="answers[index]">
      <n-space vertical align="start">
        <n-radio
            v-for="q in options"
            :key="q"
            :value="q"
        >
          {{ q }}
        </n-radio>
      </n-space>
    </n-radio-group>
  </div>
</template>

<script setup>
import QsTitle from "@/components/question/QsTitle.vue";

const props = defineProps(["qs_type","qs_title","options","answers","index"])

</script>

<style scoped>

</style>