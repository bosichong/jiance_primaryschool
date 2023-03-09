<template>
  <div class="main">
    <div class="header">
      <Header/>
    </div>
    <div class="container">
      <div class="content" v-if="qt_list">
        <div class="start" v-if="currentIndex < 0">
          准备开始
        </div>
        <div class="qt" v-if="currentIndex >= 0 && currentIndex < qt_list.length">
          <div v-if="qt_list[currentIndex].type === '单选题'">
            <p>{{ qt_list[currentIndex].question }}</p>
            <n-radio-group v-model:value="answers[currentIndex]">
              <n-space>
                <n-radio
                    v-for="q in qt_list[currentIndex].options"
                    :key="q"
                    :value="q"
                >
                  {{ q }}
                </n-radio>
              </n-space>
            </n-radio-group>
          </div>

          <div v-if="qt_list[currentIndex].type === '多选题'">
            <p>{{ qt_list[currentIndex].question }}</p>
            <n-checkbox-group v-model:value="answers[currentIndex]">
              <n-space>
                <n-checkbox
                    v-for="q in qt_list[currentIndex].options"
                    :key="q"
                    :value="q"
                >
                  {{ q }}
                </n-checkbox>
              </n-space>
            </n-checkbox-group>
          </div>

          <div v-else-if="qt_list[currentIndex].type === '判断题'">
            <p>{{ qt_list[currentIndex].question }}</p>
            <n-switch v-model:value="answers[currentIndex]" unchecked-value="错误">
              <template #checked>
                正确
              </template>
              <template #unchecked>
                错误
              </template>
            </n-switch>
          </div>

          <div v-else-if="qt_list[currentIndex].type === '简答题'">
            <p>{{ qt_list[currentIndex].question }}</p>
            <n-input
                v-model:value="answers[currentIndex]"
                placeholder="请输入答案"
            ></n-input>
          </div>
        </div>
        <div class="over" v-if="currentIndex >= qt_list.length">
          考完试了,你的得分为：{{ score }}
        </div>
      </div>
    </div>
    <div class="footer">
      <Footer>
        <template v-slot:left>
          <n-button @click="handlePreviousQuestion" type="success" ghost>
            上一题
          </n-button>
        </template>

        <template v-slot:right>
          <n-button @click="handleNextQuestion" type="success" ghost>
            下一题
          </n-button>
        </template>
      </Footer>
    </div>
  </div>
</template>
<script setup>
import {computed, ref} from "vue";
import {useRoute} from "vue-router";
import axios from "axios";
import {useMessage} from 'naive-ui'
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import {checkAnswer} from "@/utils";

const route = useRoute();
// 警告信息框
const message = useMessage();
const warning = () => {
  message.warning('请回答问题再按下一题！')
}

//题库
const qt_title = ref('')
const qt_description = ref('')
const qt_list = ref([])

const currentIndex = ref(0); //当前问题索引
const answers = ref([]); // 所有回答

const filename = ref(route.params.filename);
/**
 * 加载题库
 * @param fame data目录中的json文件名，注意这里不需要扩展名.json
 */
const loadJsonData = (fame) => {
  fame = fame.replace(/\.json$/, "");
  axios
      .get(`/data/${fame}.json`)
      .then((response) => {
        qt_title.value = response.data.title
        qt_description.value = response.data.description
        qt_list.value = response.data.questions
      })
      .catch(() => {
        console.warn("");
      });
};

loadJsonData(filename.value);

/**
 * 下一题，通过回车键、下一页按钮来控制
 */
const handleNextQuestion = () => {
  // 防止翻页冒油
  if (currentIndex.value < qt_list.value.length) {
    if (answers.value[currentIndex.value] === undefined && qt_list.value[currentIndex.value].type === '判断题') {
      //如果是判断题，不选择默认为选择错误。
      answers.value[currentIndex.value] = "错误"
      currentIndex.value++
    } else if (answers.value[currentIndex.value] === undefined) {
      // 如果是选择或是填空题，不选择或没有填空会弹出提示要求把题做完。
      warning()
    } else {
      //其他正常请跳到下一题，超出则停止。
      currentIndex.value++


    }
  }
};
const handlePreviousQuestion = () => {
  // 返回最大到0
  // console.log(currentIndex.value)
  if (currentIndex.value > 0 && currentIndex.value < qt_list.value.length) {
    currentIndex.value--
  }
}
//计算得分
const score = computed(() => {
  let correctCount = 0
  for (let i = 0; i < qt_list.value.length; i++) {
    if (qt_list.value[i].type === '多选题') {
      if (checkAnswer(answers.value[i], qt_list.value[i].answer)) {
        correctCount++
      }
    } else if (answers.value[i] === qt_list.value[i].answer) {
      correctCount++
    }
  }
  return correctCount / qt_list.value.length * 100
})
</script>
<style>
.main {
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: 0;
}

.container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  max-width: 90%;
  text-align: center;
}

.header,
.footer {
  height: 36px;
  line-height: 36px;
  padding: 1vh;
}
</style>
