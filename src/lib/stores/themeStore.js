// src/lib/stores/themeStore.js
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Fungsi untuk mendapatkan tema awal dari localStorage atau preferensi sistem
function getInitialTheme() {
	if (!browser) {
		return 'light'; // Default untuk SSR
	}
	const savedTheme = localStorage.getItem('theme');
	if (savedTheme) {
		return savedTheme;
	}
	// Deteksi preferensi sistem
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Buat writable store untuk tema
export const theme = writable(getInitialTheme());

// Subscribe ke store untuk menyimpan preferensi di localStorage
// dan menerapkan kelas 'dark' ke elemen <html>
if (browser) {
	theme.subscribe((currentTheme) => {
		localStorage.setItem('theme', currentTheme);
		if (currentTheme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	});
}
