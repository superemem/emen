<!-- File: src/routes/blog/[slug]/+page.svelte -->

<script>
	import { ArrowLeft, Clock } from '@lucide/svelte';
	import Seo from '$lib/components/Seo.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	// Destrukturisasi langsung readingTime, author, dan tags dari meta
	const { content, meta } = data;
	const { readingTime, author, tags } = meta; // Waktu baca, penulis, dan tag sekarang datang dari server

	// Fungsi untuk memformat tanggal
	function formatDate(dateString) {
		const options = { year: 'numeric', month: 'long', day: 'numeric' };
		return new Date(dateString).toLocaleDateString('id-ID', options);
	}
</script>

<Seo title={meta.title} description={meta.description} type="article" />

<div class="container mx-auto max-w-3xl px-4 py-12 md:py-20">
	<a
		href="/blog"
		class="mb-8 inline-flex items-center gap-2 text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-200"
	>
		<ArrowLeft size={18} />
		<span>Kembali ke semua tulisan</span>
	</a>

	<article>
		<header class="mb-8">
			<h1 class="text-3xl font-extrabold text-slate-900 md:text-5xl dark:text-white">
				{meta.title}
			</h1>
			<div class="mt-4 flex flex-col gap-2 text-slate-500 sm:flex-row sm:items-center sm:gap-4">
				<p>Diterbitkan pada {formatDate(meta.date)}</p>
				{#if author}
					<p>Oleh: {author}</p>
				{/if}
				{#if readingTime > 0}
					<div class="flex items-center gap-1">
						<Clock size={16} />
						<span>{readingTime} menit baca</span>
					</div>
				{/if}
			</div>
			{#if tags && tags.length > 0}
				<div class="mt-4 flex flex-wrap gap-2">
					{#each tags as tag}
						<span
							class="inline-block rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300"
						>
							{tag}
						</span>
					{/each}
				</div>
			{/if}
		</header>

		<!--
      Class 'prose' akan mengambil styling otomatis dari app.css yang sudah kita atur.
      Tidak perlu 'dark:prose-invert' lagi.
    -->
		<div class="prose prose-lg mt-8 max-w-none">
			<svelte:component this={content} />
		</div>
	</article>
</div>
