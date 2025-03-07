import { defineConfig } from 'vitest/config'
import { sveltekit } from '@sveltejs/kit/vite'

export default defineConfig({
	build: {
		modulePreload: false,
		reportCompressedSize: false
	},

	plugins: [sveltekit()],

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	optimizeDeps: {
		exclude: ['esm-env']
	}
})
