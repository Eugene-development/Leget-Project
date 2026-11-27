import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	server: {
		proxy: {
			'/media/': {
				target: process.env.LEGET_MEDIA_DEV_ORIGIN || 'http://127.0.0.1:5174'
			}
		}
	}
});
