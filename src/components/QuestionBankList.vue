<template>

  <n-grid :x-gap="12" :y-gap="8" cols="2 600:3 800:4 1000:5 1200:6">
    <n-grid-item>
      <div class="qbl">
        <router-link to="/question/test">
            <n-card title="题库标题" hoverable>
              题库简介
            </n-card>
        </router-link>
      </div>
    </n-grid-item>
    <n-grid-item>
      <div class="qbl">
        <router-link to="/question/test">

          <n-card title="题库标题">
            题库简介
          </n-card>
        </router-link>
      </div>
    </n-grid-item>
    <n-grid-item>
      <div class="qbl">
        <router-link to="/question/test">

          <n-card title="题库标题">
            题库简介
          </n-card>
        </router-link>
      </div>
    </n-grid-item>
    <n-grid-item>
      <div class="qbl">
        <router-link to="/question/test">

          <n-card title="题库标题">
            题库简介
          </n-card>
        </router-link>
      </div>
    </n-grid-item>
    <n-grid-item>
      <div class="qbl">
        <router-link to="/question/test">

          <n-card title="题库标题">
            题库简介
          </n-card>
        </router-link>
      </div>
    </n-grid-item>
    <n-grid-item>
      <div class="qbl">
        <router-link to="/question/test">

          <n-card title="题库标题">
            题库简介
          </n-card>
        </router-link>
      </div>
    </n-grid-item>
  </n-grid>

</template>

<script setup>
</script>

<style scoped>

.qbl {
  height: 108px;
}
</style>