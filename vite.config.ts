import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000
  },
  plugins: [
    svelte({
      compilerOptions: {
        hydratable: true
      }
    })
  ],
  resolve: {
    alias: {
      $lib: resolve(__dirname, 'src/lib')
    }
  }
})
