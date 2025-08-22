<!-- File: src/lib/components/Header.svelte -->

<script>
	import { Menu, X, Sun, Moon } from '@lucide/svelte';
	import { slide, fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	import { theme } from '$lib/stores/themeStore';

	let isMobileMenuOpen = false;
	let isScrolled = false;

	function toggleMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
	}
	function closeMenu() {
		isMobileMenuOpen = false;
	}

	function handleScroll() {
		isScrolled = window.scrollY > 10;
	}

	function toggleTheme() {
		theme.update((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
	}

	$: headerBgClass = '';
	$: {
		if ($theme === 'light') {
			headerBgClass = 'bg-white';
		} else {
			headerBgClass = isScrolled ? 'dark:bg-gray-800' : 'dark:bg-gray-900';
		}
	}

	$: headerShadowClass = '';
	$: {
		if (isScrolled) {
			headerShadowClass = $theme === 'light' ? 'shadow-md' : 'dark:shadow-none';
		} else {
			headerShadowClass = '';
		}
	}
</script>

<svelte:window on:scroll={handleScroll} />

<header class="sticky top-0 z-30 transition-all duration-200 {headerBgClass} {headerShadowClass}">
	<div class="container mx-auto">
		<nav class="flex items-center justify-between p-4 md:p-6">
			<a
				href="/"
				class="text-xl font-bold text-slate-900 transition-colors hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
				on:click={closeMenu}
			>
				Emen.
			</a>

			<!-- Menu untuk Desktop -->
			<div class="hidden items-center gap-8 md:flex">
				<!-- Perbaikan: Pastikan ada kelas warna default untuk mode terang -->
				<a
					href="/"
					class="font-semibold text-slate-600 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
					class:text-blue-600={$page.url.pathname === '/'}
					class:dark:text-blue-400={$page.url.pathname === '/'}
				>
					Home
				</a>
				<a
					href="/services"
					class="font-semibold text-slate-600 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
					class:text-blue-600={$page.url.pathname.startsWith('/services')}
					class:dark:text-blue-400={$page.url.pathname.startsWith('/services')}
				>
					Services
				</a>
				<a
					href="/projects"
					class="font-semibold text-slate-600 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
					class:text-blue-600={$page.url.pathname.startsWith('/projects')}
					class:dark:text-blue-400={$page.url.pathname.startsWith('/projects')}
				>
					Project
				</a>
				<a
					href="/blog"
					class="font-semibold text-slate-600 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
					class:text-blue-600={$page.url.pathname.startsWith('/blog')}
					class:dark:text-blue-400={$page.url.pathname.startsWith('/blog')}
				>
					Blog
				</a>

				<button
					on:click={toggleTheme}
					class="rounded-full bg-gray-100 p-2 text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
					aria-label="Toggle dark mode"
				>
					{#if $theme === 'dark'}
						<Sun size={20} />
					{:else}
						<Moon size={20} />
					{/if}
				</button>
			</div>

			<!-- Tombol Hamburger/Close yang bisa ditoggle (untuk Mobile) -->
			<div class="flex items-center md:hidden">
				<button
					on:click={toggleTheme}
					class="mr-2 rounded-full bg-gray-100 p-2 text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
					aria-label="Toggle dark mode"
				>
					{#if $theme === 'dark'}
						<Sun size={20} />
					{:else}
						<Moon size={20} />
					{/if}
				</button>

				<button
					type="button"
					class="rounded-md p-2 text-slate-800 transition-colors hover:bg-slate-100 dark:text-gray-300 dark:hover:bg-gray-700"
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
	</div>
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
		class="fixed top-0 right-0 z-20 flex h-screen w-4/5 max-w-xs flex-col bg-slate-50 p-6 dark:bg-gray-800 dark:text-white"
	>
		<nav class="mt-12 flex flex-col gap-6">
			<!-- Perbaikan: Pastikan ada kelas warna default untuk mode terang -->
			<a
				href="/"
				class="py-2 text-2xl font-bold text-slate-900 dark:text-white"
				on:click={closeMenu}>Home</a
			>
			<a
				href="/services"
				class="py-2 text-2xl font-bold text-slate-900 dark:text-white"
				on:click={closeMenu}>Services</a
			>
			<a
				href="/projects"
				class="py-2 text-2xl font-bold text-slate-900 dark:text-white"
				on:click={closeMenu}>Project</a
			>
			<a
				href="/blog"
				class="py-2 text-2xl font-bold text-slate-900 dark:text-white"
				on:click={closeMenu}>Blog</a
			>
			<button
				on:click={toggleTheme}
				class="mt-4 self-start rounded-full bg-gray-100 p-2 text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
				aria-label="Toggle dark mode"
			>
				{#if $theme === 'dark'}
					<Sun size={20} />
				{:else}
					<Moon size={20} />
				{/if}
			</button>
		</nav>
	</div>
{/if}
