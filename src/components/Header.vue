<template>
  <n-space justify="space-between">
    <n-space>
      <router-link to="/">
        <n-button text style="font-size: 24px" type="success">
          <n-icon size="24">
            <Home/>
          </n-icon>
        </n-button>
      </router-link>
    </n-space>
    <n-space>
      <slot></slot>
    </n-space>
    <n-space>
      <n-button @click="changeTheme" text style="font-size: 24px" type="success">
        <template #icon>
          <n-icon size="24">
            <Sunny/>
          </n-icon>
        </template>
      </n-button>
    </n-space>
  </n-space>
</template>
<script setup>
import {Home, Sunny} from '@vicons/ionicons5'
import {useUserStore} from "@/store/user";

const store = useUserStore()


const changeTheme = () => {
  store.toggleTheme()
};

</script>
<style>
</style>
