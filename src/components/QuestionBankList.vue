<template>

  <div v-for="item in navigation"  class="content">
    <n-h2><n-text type="primary">{{ item.title }}</n-text></n-h2>
    <n-grid :x-gap="8" :y-gap="14" cols="1 500:2 750:3 1000:4 1200:5">
      <n-grid-item v-for="it in item.items">
          <router-link :to="it.url">
            <n-card :title="it.title" hoverable>
              {{ it.description }}
            </n-card>
          </router-link>
      </n-grid-item>
    </n-grid>
  </div>


</template>

<script setup>
import {ref} from "vue";
import axios from "axios";

const navigation = ref([])

axios.get("/data/math/nav.json").then((response)=>{
  navigation.value = response.data
  // console.log(navigation.value)
})




</script>

<style scoped>

</style>