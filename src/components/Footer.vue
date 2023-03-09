<template>
  <n-space justify="space-between">
    <n-space>
      <slot name="left"></slot>
    </n-space>
    <n-space>
        <n-button text style="font-size: 24px" type="success">
          <n-icon size="24">
            <LogoGithub/>
          </n-icon>
        </n-button>
    </n-space>
    <n-space>
      <slot name="right"></slot>
    </n-space>
  </n-space>
</template>
<script setup>

import {LogoGithub} from '@vicons/ionicons5'
</script>
<style>
</style>
