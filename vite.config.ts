import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';

export default defineConfig({
    plugins: [
        tailwindcss({
            config: {
                content: ['./src/**/*.{html,js,svelte,ts}'],
                theme: {},
                plugins: [typography(), forms()]
            }
        }),
        sveltekit()
    ]
});
