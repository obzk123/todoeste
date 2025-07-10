import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'index.html' // 👈 Esto permite soportar rutas dinámicas como [id]
		}),
		paths: {
			base: '/todoeste' // Reemplazalo si tu repo se llama diferente
		}
	}
};

export default config;
