<template>

  <div class="main">
    <div class="header">
      <Header></Header>
    </div>
    <div class="container">
      <n-layout-content class="content">
        <question-bank-list/>
      </n-layout-content>
    </div>
    <div class="footer">
      <Footer>
        <template v-slot:center>

            <GithubBtn/>

        </template>
      </Footer>
    </div>
  </div>


</template>
<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import QuestionBankList from "@/components/QuestionBankList.vue";
import GithubBtn from "@/components/buttons/GithubBtn.vue";
</script>
<style>
a {
  text-decoration: none;
}


</style>
