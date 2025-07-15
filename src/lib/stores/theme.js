// $lib/stores/theme.js
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Create writable store dengan default value
export const theme = (() => {
	const { subscribe, set, update } = writable('light');

	return {
		subscribe,

		// Initialize theme dari localStorage atau system preference
		init: () => {
			if (!browser) return;

			const savedTheme = localStorage.getItem('theme');
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

			const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

			set(initialTheme);
			applyTheme(initialTheme);
		},

		// Toggle between light and dark
		toggle: () => {
			update((currentTheme) => {
				const newTheme = currentTheme === 'light' ? 'dark' : 'light';

				if (browser) {
					localStorage.setItem('theme', newTheme);
					applyTheme(newTheme);
				}

				return newTheme;
			});
		},

		// Set specific theme
		set: (newTheme) => {
			set(newTheme);

			if (browser) {
				localStorage.setItem('theme', newTheme);
				applyTheme(newTheme);
			}
		}
	};
})();

// Helper function untuk apply theme ke DOM
function applyTheme(themeName) {
	if (!browser) return;

	const html = document.documentElement;

	// Remove existing theme classes
	html.classList.remove('light', 'dark');

	// Add new theme class
	html.classList.add(themeName);

	console.log(`Theme applied: ${themeName}`);
	console.log('HTML classes:', html.className);
}
