<template>
  <n-button @click="changeFull" text style="font-size: 24px" type="success">
    <template #icon>
      <n-icon size="24" v-if="changeScreen === true">
        <CloseFullscreenFilled/>
      </n-icon>
      <n-icon size="24" v-if="changeScreen === false">
        <OpenInFullFilled/>
      </n-icon>
    </template>
  </n-button>
</template>

<script setup>
import {ref} from "vue";
import screenfull from "screenfull";
import {CloseFullscreenFilled, OpenInFullFilled} from '@vicons/material'

const changeScreen = ref(false)
const changeFull = () => {
  if (!screenfull.isEnabled) {
    // console.log("不支持全屏");
    return false;
  }
  screenfull.toggle()
  // console.log("已全屏");
  changeScreen.value = !changeScreen.value
  // console.log(changeScreen.value)
}

</script>

<style scoped>

</style>