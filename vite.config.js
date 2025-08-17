
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@entities': path.resolve(__dirname, './src/entities'),
      '@integrations': path.resolve(__dirname, './src/integrations'),
    },
  },
  server: { port: 5173 }
})
