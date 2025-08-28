<!-- File: src/routes/+layout.svelte -->

<script>
    import '../app.css';
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import { page } from '$app/stores';
    import { fly, fade } from 'svelte/transition';

	// Import theme store dari file yang sudah kita buat
	// Ini penting agar seluruh layout bisa merespons perubahan tema
    import { theme } from '$lib/stores/themeStore';
    import * as publicEnv from '$env/static/public';
    const PUBLIC_GA_ID = publicEnv.PUBLIC_GA_ID;

	// Karena tombol toggle sudah di Header.svelte, kita tidak perlu
	// fungsi toggleTheme di sini lagi.
	// Namun, kita tetap perlu mengimpor theme store agar kelas di <div> utama bisa bereaksi.
</script>

<svelte:head>
    {#if PUBLIC_GA_ID}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${PUBLIC_GA_ID}`}></script>
        {@html `<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${PUBLIC_GA_ID}');</script>`}
    {/if}
</svelte:head>

<!--
    Tambahkan kelas dasar warna di sini untuk seluruh halaman.
    bg-white text-gray-900 adalah default (mode terang),
    dark:bg-gray-900 dark:text-white adalah untuk mode gelap.
    transition-colors duration-300 untuk animasi transisi warna yang halus.
    Pastikan ini adalah div pembungkus terluar untuk konten utama.
-->
<div
    class="flex min-h-screen flex-col bg-white font-sans text-gray-900 antialiased transition-colors duration-300 dark:bg-gray-900 dark:text-white"
>
	<Header />

	<!--
        Tombol Toggle Tema yang sebelumnya ada di sini di +layout.svelte
        sudah dipindahkan ke Header.svelte. Jadi, bagian ini tidak perlu ada lagi.
    -->

	<main class="flex-grow text-gray-900 dark:text-white">
		<!-- Tambahkan kelas teks di sini -->
		{#key $page.url.pathname}
			<div in:fly={{ y: 15, duration: 600 }}>
				<slot />
			</div>
		{/key}
	</main>

	<Footer class="text-gray-900 dark:text-white" />
	<!-- Tambahkan kelas teks di sini juga -->
</div>
