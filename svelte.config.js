import vercel from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: vercel(), // ✅ Cambiado de adapter-static a vercel
    paths: {
      base: '' // 👈 se queda así
    }
  }
};

export default config;
