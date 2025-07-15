// svelte.config.js

import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** * Konfigurasi khusus untuk MDsveX kita definisikan di sini.
 * @type {import('mdsvex').MdsvexOptions}
 */
const mdsvexOptions = {
	extensions: ['.md'] // Kita hanya pakai .md untuk sekarang
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Beritahu SvelteKit untuk mengenali .svelte dan ekstensi dari mdsvex (.md)
	extensions: ['.svelte', ...mdsvexOptions.extensions],

	// Terapkan preprocessor MDsveX
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],

	kit: {
		adapter: adapter()
	}
};

export default config;
