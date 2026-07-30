import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@icons': fileURLToPath(
        new URL('./src/assets/icons', import.meta.url),
      ),
      '@components': fileURLToPath(
        new URL('./src/components', import.meta.url),
      ),
      '@containers': fileURLToPath(
        new URL('./src/containers', import.meta.url),
      ),
    },
  },
})