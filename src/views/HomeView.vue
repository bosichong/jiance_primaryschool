<template>

  <div class="main">
    <div class="header">
      <Header></Header>
    </div>
    <div class="container">
      <n-layout-content content-style="padding: 24px;" class="content">
        <n-h2><n-text type="primary">题库列表</n-text></n-h2>
        <question-bank-list/>
      </n-layout-content>
    </div>
    <div class="footer">
      <Footer></Footer>
    </div>
  </div>


</template>
<script setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import QuestionBankList from "@/components/QuestionBankList.vue";
</script>
<style>
a {
  text-decoration: none;
}


</style>
