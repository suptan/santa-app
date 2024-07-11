import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { config } from 'dotenv'

config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    host: '0.0.0.0',
    port: 9001,
    proxy: {
      '/api': {
        target: `http://localhost:${process.env.SERVER_PORT}`,
        changeOrigin: true,
        secure: false
      }
    }
  }
})
