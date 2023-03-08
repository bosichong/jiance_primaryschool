<template>
  <div class="main">
    <div class="header">
      <Header/>
    </div>
    <div class="container">
      <div class="content" v-if="questions.questions">
        <!-- {{ questions.questions[currentIndex].options }} -->
        <div class="qt">
          <div v-if="questions.questions[currentIndex].type === '选择题'">
            <p>{{ questions.questions[currentIndex].question }}</p>
            <n-radio-group v-model:value="answers[currentIndex]">
              <n-space>
                <n-radio
                    v-for="q in questions.questions[currentIndex].options"
                    :key="q"
                    :value="q"
                >
                  {{ q }}
                </n-radio>
              </n-space>
            </n-radio-group>
          </div>

          <div v-else-if="questions[currentIndex].type === '判断题'">
            <p>{{ questions[currentIndex].question }}</p>
            <n-switch
                v-model:value="answers[currentIndex]"
                :on-text="'是'"
                :off-text="'否'"
            ></n-switch>
          </div>

          <div v-else-if="questions[currentIndex].type === '简答题'">
            <p>{{ questions[currentIndex].question }}</p>
            <n-input
                v-model:value="answers[currentIndex]"
                placeholder="请输入答案"
            ></n-input>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <Footer>
        <template v-slot:left>
            <n-button type="success" ghost>
              上一题
            </n-button>
        </template>

        <template v-slot:right>
          <n-button type="success" ghost>
            下一题
          </n-button>
        </template>
      </Footer>
    </div>
  </div>
</template>
<script setup>
import {ref} from "vue";
import {useRoute} from "vue-router";
import axios from "axios";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";




const route = useRoute();
const questions = ref([]);
const currentIndex = ref(0);
const answers = ref([]);
const correctCount = ref(0);

const filename = ref(route.params.filename);

const loadJsonData = (fame) => {
  fame = fame.replace(/\.json$/, "");
  axios
      .get(`/data/${fame}.json`)
      .then((response) => {
        questions.value = response.data;
        console.log(questions.value);
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
  currentIndex.value++;
};
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
  height: 50px;
  line-height: 50px;
  padding: 1vh;
}
</style>
