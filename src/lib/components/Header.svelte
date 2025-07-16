<!-- File: src/lib/components/Header.svelte -->

<script>
	import { Menu, X } from '@lucide/svelte';
	import { slide, fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { page } from '$app/stores'; // Import page store untuk mendeteksi URL

	// State untuk menu mobile
	let isMobileMenuOpen = false;
	// State untuk mendeteksi scroll
	let isScrolled = false;

	function toggleMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
	}
	function closeMenu() {
		isMobileMenuOpen = false;
	}

	// Fungsi untuk menangani event scroll
	function handleScroll() {
		isScrolled = window.scrollY > 10; // Akan true jika sudah scroll lebih dari 10px
	}
</script>

<!-- svelte:window akan menambahkan event listener ke window -->
<svelte:window on:scroll={handleScroll} />

<!-- 
  Perubahan utama:
  - 'sticky top-0': Membuat header menempel di atas.
  - 'transition-all': Memberi animasi saat background dan shadow muncul.
  - class:bg-white={isScrolled}: Menambahkan background putih jika isScrolled true.
  - class:shadow-md={isScrolled}: Menambahkan bayangan jika isScrolled true.
-->
<header
	class="sticky top-0 z-30 transition-all duration-200"
	class:bg-white={isScrolled}
	class:shadow-md={isScrolled}
>
	<div class="container mx-auto">
		<nav class="flex items-center justify-between p-4 md:p-6">
			<a
				href="/"
				class="text-xl font-bold text-slate-900 transition-colors hover:text-blue-600"
				on:click={closeMenu}
			>
				Emen.
			</a>

			<!-- Menu untuk Desktop -->
			<div class="hidden items-center gap-8 text-slate-600 md:flex">
				<!-- 
          Class 'text-blue-600' akan ditambahkan jika URL saat ini cocok.
          Kita juga periksa turunan URL, misal /blog/post-1 akan mengaktifkan link /blog.
        -->
				<a
					href="/"
					class="font-semibold transition-colors hover:text-blue-600"
					class:text-blue-600={$page.url.pathname === '/'}
				>
					Home
				</a>
				<a
					href="/projects"
					class="font-semibold transition-colors hover:text-blue-600"
					class:text-blue-600={$page.url.pathname.startsWith('/projects')}
				>
					Project
				</a>
				<a
					href="/blog"
					class="font-semibold transition-colors hover:text-blue-600"
					class:text-blue-600={$page.url.pathname.startsWith('/blog')}
				>
					Blog
				</a>
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
		class="fixed top-0 right-0 z-20 flex h-screen w-4/5 max-w-xs flex-col bg-slate-50 p-6"
	>
		<nav class="mt-12 flex flex-col gap-6">
			<a href="/" class="py-2 text-2xl font-bold" on:click={closeMenu}>Home</a>
			<a href="/projects" class="py-2 text-2xl font-bold" on:click={closeMenu}>Project</a>
			<a href="/blog" class="py-2 text-2xl font-bold" on:click={closeMenu}>Blog</a>
		</nav>
	</div>
{/if}
