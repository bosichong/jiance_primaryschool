<template>
  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import { h } from "vue";

const menuOptions = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "home",
          },
        },
        { default: () => "首页" }
      ),
    key: "go-back-home",
  },
];
</script>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
}

.main {
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: 0;
}
</style>
