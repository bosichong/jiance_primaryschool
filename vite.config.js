import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base:"./",
  server:{
    host:'192.168.0.88',
    port:'8888'
  },
  build: {
    outDir: 'docs' // 打包文件的输出目录
  }


})
