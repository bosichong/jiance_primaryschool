<template>
  <div class="main">
    <div class="header">
      <Header>
          <div style="width: 50vw;">
            <n-progress
                v-if="currentIndex >= 0"
                type="line"
                :height="14"
                status="success"
                :percentage="percentage"
                :indicator-placement="'inside'"
            />
          </div>
      </Header>
    </div>
    <div class="container">
      <div class="content" v-if="qs_list">
        <GameStart
            :index="currentIndex"
            :title="qs_title"
            :description="qs_description"
            :count = "qs_list.length"
            @add-index="currentIndex++"/>

        <div class="qt" v-if="currentIndex >= 0 && currentIndex < qs_list.length">

          <div v-if="qs_list[currentIndex].type === '单选题'">
            <QsTitle :title="qs_list[currentIndex].question"/>
            <n-radio-group v-model:value="answers[currentIndex]">
              <n-space>
                <n-radio
                    v-for="q in qs_list[currentIndex].options"
                    :key="q"
                    :value="q"
                >
                  {{ q }}
                </n-radio>
              </n-space>
            </n-radio-group>
          </div>

          <div v-if="qs_list[currentIndex].type === '多选题'">
            <QsTitle :title="qs_list[currentIndex].question"/>
            <n-checkbox-group v-model:value="answers[currentIndex]">
              <n-space>
                <n-checkbox
                    v-for="q in qs_list[currentIndex].options"
                    :key="q"
                    :value="q"
                >
                  {{ q }}
                </n-checkbox>
              </n-space>
            </n-checkbox-group>
          </div>

          <div v-else-if="qs_list[currentIndex].type === '判断题'">
            <QsTitle :title="qs_list[currentIndex].question"/>
            <n-switch size="large" v-model:value="answers[currentIndex]" checked-value="正确" unchecked-value="错误">
              <template #checked>
                正确
              </template>
              <template #unchecked>
                错误
              </template>
            </n-switch>
          </div>

          <div v-else-if="qs_list[currentIndex].type === '简答题'">
            <n-space vertical>
              <QsTitle :title="qs_list[currentIndex].question"/>
              <n-input class="qt_textarea"
                       v-model:value="answers[currentIndex]"
                       type="textarea"
                       placeholder="请输入答案"
              />
            </n-space>
          </div>

        </div>

        <GameOver
            :index="currentIndex"
            :qt_list="qs_list"
            :answers="answers"
            :filename="filename"
        />
      </div>
    </div>
    <div class="footer">
      <Footer>
        <template v-if="currentIndex >= 0 && currentIndex < qs_list.length " v-slot:left>
          <n-button @click="handlePreviousQuestion" type="success" ghost>
            上一题
          </n-button>
        </template>

        <template v-if="currentIndex >= 0 && currentIndex < qs_list.length" v-slot:right>
          <n-button @click="handleNextQuestion" type="success" ghost>
            下一题
          </n-button>
        </template>
      </Footer>
    </div>
  </div>
</template>
<script setup>
import {ref, computed} from "vue";
import {useRoute} from "vue-router";
import axios from "axios";
import {useMessage} from 'naive-ui'
import {shuffleArray, percentToNumerator} from "@/utils";


import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import GameStart from "@/components/GameStart.vue";
import GameOver from "@/components/GameOver.vue";
import QsTitle from "@/components/QsTitle.vue";

const route = useRoute();
// 警告信息框
const message = useMessage();
const warning = () => {
  message.warning('请回答问题再按下一题！')
}

//题库
const qs_title = ref('')
const qs_description = ref('')
const qs_list = ref([])

const currentIndex = ref(-1); //当前问题索引，-1的时候为开始页面
const answers = ref([]); // 所有回答
const filename = ref(route.params.filename);

/**
 * 加载题库
 * @param filepath
 */
const loadJsonData = (filepath) => {
  let name = filepath+".json";
  axios
      .get(`/data/${name}`)
      .then((response) => {
        qs_title.value = response.data.title
        qs_description.value = response.data.description
        qs_list.value = shuffleArray(response.data.questions) //随机打乱题库和题库中所有的选择题中的项目
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
  if (currentIndex.value < qs_list.value.length && currentIndex.value >= 0) {
    if (answers.value[currentIndex.value] === undefined && qs_list.value[currentIndex.value].type === '判断题') {
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
  if (currentIndex.value > 0 && currentIndex.value < qs_list.value.length) {
    currentIndex.value--
  }
}

const percentage = computed(() => {
  return percentToNumerator(currentIndex.value, qs_list.value.length)
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
  max-width: 100%;
  text-align: center;
}

.header,
.footer {
  height: 36px;
  line-height: 36px;
  padding: 1vh;
}

.qt_textarea {
  text-align: left;
}


</style>
