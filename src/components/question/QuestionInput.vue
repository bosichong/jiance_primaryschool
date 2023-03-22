<template>
  <div v-if="qs_type === '简答题'">
    <n-space vertical>
      <QsTitle :title="qs_title"/>
      <n-input class="qt_textarea"
               v-model:value="answers[index]"
               type="textarea"
               placeholder="请输入答案"
               ref="myInput"
               :key="key"
      />
    </n-space>
  </div>
</template>

<script setup>
import QsTitle from "@/components/question/QsTitle.vue";
import {ref, onMounted, nextTick} from "vue";

const props = defineProps(["qs_type", "qs_title", "answers", "index","key"])
const myInput = ref(null);
onMounted(()=>{
  if(myInput.value != null){
    myInput.value.focus();
  }

})

</script>

<style scoped>
.qt_textarea {
  text-align: left;
}
</style>