<template>

  <div v-for="item in navigation"  class="content">
    <n-h2><n-text type="primary">{{ item.title }}</n-text></n-h2>
    <n-grid :x-gap="8" :y-gap="14" cols="1 400:2 600:3 800:4 1000:5 1200:6">
      <n-grid-item v-for="it in item.items">
        <div class="qbl">
          <router-link :to="it.url">
            <n-card :title="it.title" hoverable>
              {{ it.description }}
            </n-card>
          </router-link>
        </div>
      </n-grid-item>
    </n-grid>
  </div>


</template>

<script setup>
import {ref} from "vue";
import axios from "axios";

const navigation = ref([])

axios.get("/data/navigation.json").then((response)=>{
  navigation.value = response.data
  // console.log(navigation.value)
})




</script>

<style scoped>

.qbl {
  height: 108px;
}
</style>