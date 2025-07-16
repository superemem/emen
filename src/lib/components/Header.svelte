<!-- File: src/lib/components/Header.svelte -->

<script>
	// Import ikon yang dibutuhkan
	import { Menu, X } from '@lucide/svelte';
	import { slide } from 'svelte/transition';
	import { fade } from 'svelte/transition';

	// State untuk mengontrol menu mobile
	let isMobileMenuOpen = false;

	function toggleMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
	}

	function closeMenu() {
		isMobileMenuOpen = false;
	}
</script>

<header class="relative z-30 container mx-auto p-4 md:p-6">
	<nav class="flex items-center justify-between">
		<a
			href="/"
			class="hover:text-brand-blue text-xl font-bold text-slate-900 transition-colors"
			on:click={closeMenu}
		>
			Emen.
		</a>

		<!-- Menu untuk Desktop -->
		<div class="hidden items-center gap-6 text-slate-600 md:flex">
			<a href="/" class="hover:text-brand-blue transition-colors">Home</a>
			<a href="/projects" class="hover:text-brand-blue transition-colors">Project</a>
			<a href="/blog" class="hover:text-brand-blue transition-colors">Blog</a>
		</div>

		<!-- Tombol Hamburger/Close yang bisa ditoggle -->
		<button
			type="button"
			class="rounded-md p-2 text-slate-800 transition-colors hover:bg-slate-100 md:hidden"
			aria-label="Toggle menu"
			on:click={toggleMenu}
		>
			{#if isMobileMenuOpen}
				<X size={20} />
			{:else}
				<Menu size={20} />
			{/if}
		</button>
	</nav>
</header>

<!-- Menu Overlay untuk Mobile -->
{#if isMobileMenuOpen}
	<!-- Backdrop -->
	<div
		transition:fade={{ duration: 200 }}
		on:click={closeMenu}
		class="fixed inset-0 z-10 bg-black/20 backdrop-blur-sm md:hidden"
		aria-hidden="true"
	></div>

	<!-- Konten Menu -->
	<div
		transition:slide={{ duration: 300, axis: 'x' }}
		class="fixed top-0 right-0 z-20 flex h-screen w-4/5 max-w-xs flex-col bg-slate-50 p-6 md:hidden"
	>
		<nav class="mt-12 flex flex-col gap-6">
			<a href="/" class="py-2 text-2xl font-bold" on:click={closeMenu}>Home</a>
			<a href="/projects" class="py-2 text-2xl font-bold" on:click={closeMenu}>Project</a>
			<a href="/blog" class="py-2 text-2xl font-bold" on:click={closeMenu}>Blog</a>
		</nav>
	</div>
{/if}
