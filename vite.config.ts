import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	server: {
		port: 5000
	},
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern' // or "modern"
			}
		}
	},
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
})
