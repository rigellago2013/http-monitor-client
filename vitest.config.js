import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: [path.resolve(__dirname, './src/tests/setup/vitest.setup.js')],
    css: true,
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    coverage: {
      reporter: ['text', 'lcov'], // Ensure 'lcov' is included here
      include: ['src/**/*.js'], // Adjust based on your source files
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})