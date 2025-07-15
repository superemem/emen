<!-- File: src/routes/+layout.svelte -->

<script>
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { theme } from '$lib/stores/theme.js';
	import { onMount } from 'svelte';
	import { page } from '$app/stores'; // 1. Import page store untuk mendapatkan URL
	import { fade, fly } from 'svelte/transition'; // 2. Import transisi fade dan fly

	onMount(() => {
		theme.init();
	});
</script>

<div class="flex min-h-screen flex-col font-sans antialiased transition-colors duration-300">
	<Header />

	<main class="flex-grow">
		<!-- 
      {#key} block akan me-mount ulang isinya setiap kali nilainya berubah.
      Dengan menggunakan URL pathname sebagai key, kita memaksa Svelte untuk
      menghancurkan komponen halaman lama dan membuat yang baru saat navigasi.
      Ini memungkinkan kita untuk menerapkan transisi masuk dan keluar.
    -->
		{#key $page.url.pathname}
			<div in:fly={{ y: 15, duration: 700 }}>
				<slot />
			</div>
		{/key}
	</main>

	<Footer />
</div>
