<!-- File: src/routes/blog/[slug]/+page.svelte -->

<script>
	import { ArrowLeft } from '@lucide/svelte';
	import Seo from '$lib/components/Seo.svelte'; // 1. Import komponen Seo

	/** @type {import('./$types').PageData} */
	export let data;

	const { content, meta } = data;

	function formatDate(dateString) {
		const options = { year: 'numeric', month: 'long', day: 'numeric' };
		return new Date(dateString).toLocaleDateString('id-ID', options);
	}
</script>

<!-- 2. Ganti svelte:head yang lama dengan komponen Seo -->
<Seo title={meta.title} description={meta.description} type="article" />

<div class="container mx-auto max-w-3xl px-4 py-12 md:py-20">
	<a
		href="/blog"
		class="mb-8 inline-flex items-center gap-2 text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
	>
		<ArrowLeft size={18} />
		<span>Kembali ke semua tulisan</span>
	</a>

	<article>
		<header class="mb-8">
			<h1 class="text-3xl font-extrabold text-slate-900 md:text-5xl dark:text-white">
				{meta.title}
			</h1>
			<p class="mt-4 text-slate-500">Diterbitkan pada {formatDate(meta.date)}</p>
		</header>

		<div class="prose prose-lg dark:prose-invert mt-8 max-w-none text-slate-700">
			<svelte:component this={content} />
		</div>
	</article>
</div>
