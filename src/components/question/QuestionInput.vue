<template>
  <div v-if="qs_type === '简答题'">
    <n-space vertical>
      <QsTitle :title="qs_title"/>
      <n-input class="qt_textarea"
               v-model:value="answers[index]"
               type="textarea"
               placeholder="请输入答案"
      />
    </n-space>
  </div>
</template>

<script setup>
import QsTitle from "@/components/question/QsTitle.vue";
import {ref,onMounted,nextTick} from "vue";

const props = defineProps(["qs_type", "qs_title", "answers", "index",])

</script>

<style scoped>
.qt_textarea{
  text-align: left;
}
</style>