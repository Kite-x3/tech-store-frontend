import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        // Проксирование всех запросов, начинающихся с "/api"
        target: 'https://localhost:7048', // URL бэкенда ASP.NET
        changeOrigin: true,
        secure: false,
        headers: {
          Connection: 'keep-alive',
        },
      },
      '/images': {
        target: 'https://localhost:7048',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
