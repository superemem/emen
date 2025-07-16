<!-- File: src/routes/+layout.svelte -->

<script>
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { page } from '$app/stores';
	import { fly, fade } from 'svelte/transition';
</script>

<!-- Class bg-slate-50 dan text-slate-800 sudah dihapus dari sini -->
<div class="flex min-h-screen flex-col font-sans antialiased">
	<Header />

	<main class="flex-grow">
		{#key $page.url.pathname}
			<div in:fly={{ y: 15, delay: 300, duration: 300 }} out:fade={{ duration: 300 }}>
				<slot />
			</div>
		{/key}
	</main>

	<Footer />
</div>
