<template>
  <n-config-provider :theme="theme">
    <n-message-provider>
    <RouterView />
    </n-message-provider>
    <n-global-style />
  </n-config-provider>

</template>

<script setup>
import {useUserStore} from "@/store/user";
import { storeToRefs } from 'pinia'

const store = useUserStore()
const { theme } = storeToRefs(store)


</script>

<style>



</style>
