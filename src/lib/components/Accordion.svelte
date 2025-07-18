<!-- File: src/lib/components/Accordion.svelte -->

<script>
	import { ChevronDown } from '@lucide/svelte';
	import { slide } from 'svelte/transition';

	let { title, jobTitle, period, details } = $props();
	let isOpen = $state(false);

	function toggle() {
		isOpen = !isOpen;
	}
</script>

<!--
    Perbaikan: Tambahkan kelas dark: untuk background dan shadow pada container Accordion.
    Juga tambahkan kelas warna teks default untuk mode terang.
-->
<div class="mb-4 overflow-hidden rounded-xl bg-white shadow-md dark:bg-gray-800 dark:shadow-xl">
	<button
		onclick={toggle}
		class="flex w-full items-start justify-between p-4 text-left transition-colors hover:bg-slate-50 dark:hover:bg-gray-700"
		aria-expanded={isOpen}
	>
		<!-- Bagian Kiri: Judul dan Jabatan -->
		<div class="flex flex-col">
			<!-- Perbaikan: Tambahkan kelas dark: untuk warna teks judul -->
			<h3 class="font-bold text-slate-900 dark:text-white">{title}</h3>
			<!-- Perbaikan: Tambahkan kelas dark: untuk warna teks jabatan -->
			<p class="text-sm text-slate-600 dark:text-gray-300">{jobTitle}</p>
			<!-- PERUBAHAN DI SINI: Tampilkan periode di mobile -->
			<!-- Perbaikan: Tambahkan kelas dark: untuk warna teks periode mobile -->
			<p class="mt-2 text-xs text-slate-500 md:hidden dark:text-gray-400">{period}</p>
		</div>

		<!-- Bagian Kanan: Periode (desktop) dan Panah -->
		<div class="flex flex-shrink-0 items-center gap-4 pl-4">
			<!-- Sembunyikan periode di mobile, tampilkan di desktop -->
			<!-- Perbaikan: Tambahkan kelas dark: untuk warna teks periode desktop -->
			<span class="hidden text-sm text-slate-500 md:inline dark:text-gray-400">{period}</span>
			<!-- Perbaikan: Tambahkan kelas dark: untuk warna ikon panah -->
			<ChevronDown
				class="text-slate-500 transition-transform duration-300 {isOpen
					? 'rotate-180'
					: ''} dark:text-gray-400"
				size={20}
			/>
		</div>
	</button>

	{#if isOpen}
		<!--
            Perbaikan: Tambahkan kelas dark: untuk border dan background pada konten yang terbuka.
            Kelas 'prose' di dalamnya sudah diatur di app.css untuk dark mode.
        -->
		<div
			transition:slide={{ duration: 300 }}
			class="border-t border-slate-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
		>
			<div class="prose prose-sm max-w-none">
				{@html details}
			</div>
		</div>
	{/if}
</div>
