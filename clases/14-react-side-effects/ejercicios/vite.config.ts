import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Puertos fijos: ejemplos/ y ejercicios/ se pueden levantar a la vez.
  server: { port: 5174, strictPort: true },
  preview: { port: 4174 },
})
