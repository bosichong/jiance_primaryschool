<template>
  <n-button text style="font-size: 24px" type="success" @click="handleClick">
    <n-icon size="24">
      <LogoGithub/>
    </n-icon>
  </n-button>
</template>

<script setup>
import {LogoGithub} from '@vicons/ionicons5'
const handleClick = () =>{
  window.open("https://github.com/bosichong/JianCe");
}
</script>

<style scoped>

</style>