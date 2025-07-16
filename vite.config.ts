import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import typography from '@tailwindcss/typography';

export default defineConfig({
	plugins: [
		tailwindcss({
			config: {
				content: ['./src/**/*.{html,js,svelte,ts}'],
				theme: {
					// Blok fontFamily sudah dihapus, sehingga Tailwind akan
					// menggunakan font sistem default-nya.
					extend: {
						colors: {
							brand: {
								blue: '#0052cc'
							}
						}
					}
				},
				plugins: [typography()]
			}
		}),
		sveltekit()
	]
});
