<template>
  <div class="over" v-if="index >= qt_list.length">
    <n-space vertical>
      <n-h2>考完了,您的得分为：{{ score }}</n-h2>
      <n-text>本次答题用时：{{ usetime }}</n-text>
      <n-space justify="center">
        <n-button @click="refresh" type="primary">重新答题</n-button>
        <router-link to="/">
          <n-button type="tertiary">返回首页</n-button>
        </router-link>
      </n-space>
      <n-table :bordered="false" :single-line="false">
        <thead>
        <tr>
          <th>出错问题</th>
          <th>你的答案</th>
          <th>正确答案</th>
        </tr>
        </thead>
        <tbody v-for="tr in error_answers">
        <tr>
          <td>{{ tr[0] }}</td>
          <td>{{ tr[1] }}</td>
          <td>{{ tr[2] }}</td>
        </tr>
        </tbody>
      </n-table>

    </n-space>

  </div>
</template>

<script setup>
import {computed, ref} from "vue";
import {checkAnswer} from "@/utils";

const props = defineProps(["index", "qt_list", "answers", "filename","usetime"])
const error_answers = ref([])

const refresh = () => {
  location.reload();
}

/**
 * 计算最终的得分结果
 * @type {ComputedRef<unknown>}
 */
const score = computed(() => {
  let correctCount = 0
  for (let i = 0; i < props.qt_list.length; i++) {
    // console.log(props.answers[i],props.qt_list[i].answer)
    // 多选题的对错判断
    if (props.qt_list[i].type === '多选题') {
      if (checkAnswer(props.answers[i], props.qt_list[i].answer)) {
        correctCount++
      } else {
        let array = [props.qt_list[i].question, props.answers[i], props.qt_list[i].answer]
        error_answers.value.push(array)
      }
    } else if (props.answers[i] === props.qt_list[i].answer) {
      correctCount++
    } else {

      let array = [props.qt_list[i].question,props.answers[i], props.qt_list[i].answer]
      error_answers.value.push(array)
    }
  }
  return Math.round(correctCount / props.qt_list.length * 100)
})
</script>

<style scoped>
.n-table{
  font-size: 1rem;
}
</style>