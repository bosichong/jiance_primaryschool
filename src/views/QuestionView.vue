<template>
  <div class="main">
    <div class="header">
      <Header>
        <n-space vertical style="width: 50vw; text-align: center">
          <n-progress
              v-if="currentIndex >= 0"
              type="line"
              :height="14"
              status="success"
              :percentage="percentage"
              :indicator-placement="'inside'"
          />
        </n-space>
      </Header>
    </div>
    <div class="container">
      <div class="content" v-if="qs_list" @keyup.ctrl.enter="handleNextQuestion">

        <GameStart
            :index="currentIndex"
            :title="qs_title"
            :description="qs_description"
            :count="qs_list.length"
            @add-index="currentIndex++"/>

        <n-space vertical v-if="currentIndex >= 0 && currentIndex < qs_list.length">


          <TypeTitle :type_title="qs_list[currentIndex].type" />

          <QuestionRadio
              :qs_type="qs_list[currentIndex].type"
              :qs_title="qs_list[currentIndex].question"
              :options="qs_list[currentIndex].options"
              :answers="answers"
              :index="currentIndex"
          />

          <QuestionCheckbox
              :qs_type="qs_list[currentIndex].type"
              :qs_title="qs_list[currentIndex].question"
              :options="qs_list[currentIndex].options"
              :answers="answers"
              :index="currentIndex"
          />

          <QuestionSwitch
              :qs_type="qs_list[currentIndex].type"
              :qs_title="qs_list[currentIndex].question"
              :answers="answers"
              :index="currentIndex"
              :key="textkey"
          />

          <QuestionInput
              :qs_type="qs_list[currentIndex].type"
              :qs_title="qs_list[currentIndex].question"
              :answers="answers"
              :index="currentIndex"
              :key="textkey"
          />



        </n-space>

        <GameOver
            :index="currentIndex"
            :qt_list="qs_list"
            :answers="answers"
            :filename="filename"
            :usetime="use_time"
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

        <template v-slot:center>



          <n-text type="success">
          <span style="font-variant-numeric: tabular-nums; white-space: nowrap"
                v-if="currentIndex >= 0 && currentIndex < qs_list.length ">
            <n-countdown :duration="qs_time * 1000" :precision="2" :active="countdown_active" :on-finish="gameOver"/>
          </span>
          </n-text>
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
import {ref, computed, watch} from "vue";
import {useRoute} from "vue-router";
import axios from "axios";
import {useMessage} from 'naive-ui'
import {shuffleArray, percentToNumerator, formattedTime} from "@/utils";


import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import GameStart from "@/components/question/GameStart.vue";
import GameOver from "@/components/question/GameOver.vue";
import QuestionRadio from "@/components/question/QuestionRadio.vue";
import QuestionCheckbox from "@/components/question/QuestionCheckbox.vue";
import QuestionSwitch from "@/components/question/QuestionSwitch.vue";
import QuestionInput from "@/components/question/QuestionInput.vue";
import TypeTitle from "@/components/question/TypeTitle.vue";


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
const qs_time = ref(0)

const start_time = ref(new Date())
const end_time = ref(new Date())
const use_time = ref("")

const countdown_active = ref(true)// 倒计时暂停
const currentIndex = ref(-1); //当前问题索引，-1的时候为开始页面
const answers = ref([]); // 所有回答
const filename = ref(route.params.filename);

const textkey = ref(0)

/**
 * 加载题库
 * @param filepath
 */
const loadJsonData = (filepath) => {
  let name = filepath + ".json";
  axios
      .get(`data/${name}`)
      .then((response) => {
        qs_title.value = response.data.title
        qs_description.value = response.data.description
        qs_time.value = response.data.time
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
  textkey.value++
};
const handlePreviousQuestion = () => {
  // 返回最大到0
  // console.log(currentIndex.value)
  if (currentIndex.value > 0 && currentIndex.value < qs_list.value.length) {
    currentIndex.value--
  }
}

/**
 * 答题进度
 * @type {ComputedRef<number>}
 */
const percentage = computed(() => {
  return percentToNumerator(currentIndex.value, qs_list.value.length)
})


/**
 * 答题侦听器，控制答题倒计时的暂停，答题计时时长
 */
watch(currentIndex, (index) => {
  if (index === 0) {
    start_time.value = new Date()
  } else if (index >= qs_list.value.length) {
    countdown_active.value = false//答题结束后，倒计时暂停
    // 计算答题用时
    end_time.value = new Date()
    use_time.value = formattedTime(start_time.value, end_time.value)

  }
})


const gameOver = () => {
  for (let i = currentIndex.value; i < qs_list.value.length; i++) {
    answers.value[i] = ""
  }
  currentIndex.value = qs_list.value.length

}

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
  padding: 12px;
}

.header,
.footer {
  padding: 1vh;

}


</style>
