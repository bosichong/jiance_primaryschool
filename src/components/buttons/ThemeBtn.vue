<template>
  <n-button @click="changeTheme" text style="font-size: 24px" type="success">
    <template #icon>
      <n-icon size="24" v-if="theme === null">
        <Moon/>
      </n-icon>
      <n-icon size="24" v-if="theme !== null">
        <Sunny/>
      </n-icon>
    </template>
  </n-button>
</template>

<script setup>

import {Sunny, Moon} from '@vicons/ionicons5'
import {useUserStore} from "@/store/user";
import {storeToRefs} from "pinia";

const store = useUserStore()
const { theme } = storeToRefs(store)

const changeTheme = () => {
  store.toggleTheme()
};

</script>

<style scoped>

</style>