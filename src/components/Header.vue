<template>
  <n-space justify="space-between" align="center">
    <n-space>
      <HomeBtn />
    </n-space>
    <n-space>
      <slot></slot>
    </n-space>
    <n-space>

      <ChangeScreenBtn />
      <Theme-btn/>
      <Github/>

    </n-space>
  </n-space>
</template>
<script setup>

import HomeBtn from "@/components/buttons/HomeBtn.vue"
import Github from "@/components/buttons/GithubBtn.vue";
import ThemeBtn from "@/components/buttons/ThemeBtn.vue"
import ChangeScreenBtn from "@/components/buttons/ChangeScreenBtn.vue"





</script>
<style>
</style>
