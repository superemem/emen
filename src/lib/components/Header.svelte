<!-- File: src/lib/components/Header.svelte -->

<script>
	// Import semua yang kita butuhkan
	import { Sun, Moon, Menu, X } from '@lucide/svelte';
	import { theme } from '$lib/stores/theme.js';
	import { slide, fade } from 'svelte/transition'; // Tambahkan fade untuk backdrop

	// State untuk mengontrol menu mobile
	let isMobileMenuOpen = false;

	// Fungsi untuk toggle menu
	function toggleMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
	}

	// Fungsi untuk menutup menu (dipakai saat link diklik atau backdrop diklik)
	function closeMenu() {
		isMobileMenuOpen = false;
	}
</script>

<!-- Naikkan z-index header agar selalu di atas -->
<header class="relative z-30 container mx-auto p-4 md:p-6">
	<nav class="flex items-center justify-between">
		<a
			href="/"
			class="text-xl font-bold text-slate-900 transition-colors hover:text-slate-600 dark:text-white dark:hover:text-slate-300"
			on:click={closeMenu}
		>
			Emen.
		</a>

		<!-- Menu untuk Desktop -->
		<div class="hidden items-center gap-6 text-slate-600 md:flex dark:text-slate-300">
			<a href="/" class="transition-colors hover:text-slate-900 dark:hover:text-white">Home</a>
			<a href="/projects" class="transition-colors hover:text-slate-900 dark:hover:text-white"
				>Project</a
			>
			<a href="/blog" class="transition-colors hover:text-slate-900 dark:hover:text-white">Blog</a>
		</div>

		<!-- Wrapper untuk tombol-tombol di kanan -->
		<div class="flex items-center gap-2">
			<!-- Tombol Dark Mode -->
			<button
				type="button"
				class="rounded-md p-2 text-slate-800 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
				aria-label="Toggle Light/Dark Mode"
				on:click={theme.toggle}
			>
				{#if $theme === 'light'}
					<Sun size={20} />
				{:else}
					<Moon size={20} />
				{/if}
			</button>

			<!-- Tombol Hamburger/Close yang bisa ditoggle -->
			<button
				type="button"
				class="rounded-md p-2 text-slate-800 transition-colors hover:bg-slate-100 md:hidden dark:text-slate-200 dark:hover:bg-slate-800"
				aria-label="Toggle menu"
				on:click={toggleMenu}
			>
				{#if isMobileMenuOpen}
					<X size={20} />
				{:else}
					<Menu size={20} />
				{/if}
			</button>
		</div>
	</nav>
</header>

<!-- Menu Overlay untuk Mobile -->
{#if isMobileMenuOpen}
	<!-- Backdrop yang bisa diklik untuk menutup menu -->
	<div
		transition:fade={{ duration: 200 }}
		on:click={closeMenu}
		class="fixed inset-0 z-10 bg-black/20 backdrop-blur-sm md:hidden"
		aria-hidden="true"
	></div>

	<!-- Konten Menu yang slide dari kanan -->
	<div
		transition:slide={{ duration: 300, axis: 'x' }}
		class="fixed top-0 right-0 z-20 flex h-screen w-4/5 max-w-xs flex-col bg-white p-6 md:hidden dark:bg-slate-900"
	>
		<nav class="mt-12 flex flex-col gap-6">
			<a href="/" class="py-2 text-2xl font-bold" on:click={closeMenu}>Home</a>
			<a href="/projects" class="py-2 text-2xl font-bold" on:click={closeMenu}>Project</a>
			<a href="/blog" class="py-2 text-2xl font-bold" on:click={closeMenu}>Blog</a>
		</nav>
	</div>
{/if}
