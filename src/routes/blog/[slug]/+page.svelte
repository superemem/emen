<!-- File: src/routes/blog/[slug]/+page.svelte -->

<script>
	import { ArrowLeft } from '@lucide/svelte';
	import Seo from '$lib/components/Seo.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	const { content, meta } = data;

	function formatDate(dateString) {
		const options = { year: 'numeric', month: 'long', day: 'numeric' };
		return new Date(dateString).toLocaleDateString('id-ID', options);
	}
</script>

<Seo title={meta.title} description={meta.description} type="article" />

<div class="container mx-auto max-w-3xl px-4 py-12 md:py-20">
	<a
		href="/blog"
		class="mb-8 inline-flex items-center gap-2 text-slate-600 transition-colors hover:text-blue-600"
	>
		<ArrowLeft size={18} />
		<span>Kembali ke semua tulisan</span>
	</a>

	<article>
		<header class="mb-8">
			<h1 class="text-3xl font-extrabold text-slate-900 md:text-5xl">
				{meta.title}
			</h1>
			<p class="mt-4 text-slate-500">Diterbitkan pada {formatDate(meta.date)}</p>
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
