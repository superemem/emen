/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: 'var(--color-primary)',
				muted: 'var(--color-muted)',
				tertiary: 'var(--color-tertiary)'
			}
		}
	},
	plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
	darkMode: 'class' // Use the 'class' strategy
};
