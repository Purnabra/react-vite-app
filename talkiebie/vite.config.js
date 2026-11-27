import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import fs from 'fs'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,

    /* https: {
       key: fs.readFileSync('./mkcert/localhost+2-key.pem'),
       cert: fs.readFileSync('./mkcert/localhost+2.pem')
     }*/
    // https: false
  }
})
