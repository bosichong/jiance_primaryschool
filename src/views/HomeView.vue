<template>
  <n-layout-content content-style="padding: 24px;">
    <n-list>
      <template #header> 题库列表 </template>
      <n-list-item>
        <router-link to="/question/test">
          <n-thing title="题目" description="description" />
        </router-link>
      </n-list-item>
    </n-list>
  </n-layout-content>
  <n-layout-footer>底部</n-layout-footer>
</template>
<script setup></script>
<style>
.n-layout-footer {
  background: none;
}
</style>
