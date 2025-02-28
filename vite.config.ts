import {fileURLToPath,URL} from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'



export default defineConfig({
  plugins: [vue()],
  server:{
    port: 5174,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8111/',
        ws: true,
        secure: false, 
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
  },
  resolve: {
    // 设置文件./src路径为 @
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, './src')
      }
    ]
  }
})
