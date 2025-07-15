<script>
	import { ArrowLeft } from '@lucide/svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	const { content, meta } = data;

	// Fungsi untuk memformat tanggal
	function formatDate(dateString) {
		const options = { year: 'numeric', month: 'long', day: 'numeric' };
		return new Date(dateString).toLocaleDateString('id-ID', options);
	}
</script>

<svelte:head>
	<title>{meta.title}</title>
	<meta name="description" content={meta.description} />
</svelte:head>

<div class="container mx-auto max-w-3xl px-4 py-12 md:py-20">
	<a
		href="/blog"
		class="mb-8 inline-flex items-center gap-2 text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
	>
		<ArrowLeft size={18} />
		<span>Kembali ke semua tulisan</span>
	</a>

	<article>
		<h1 class="text-3xl font-extrabold text-slate-900 md:text-5xl dark:text-white">
			{meta.title}
		</h1>
		<p class="mt-4 text-slate-500">Diterbitkan pada {formatDate(meta.date)}</p>

		<div
			class="prose prose-lg dark:prose-invert mt-8 max-w-none text-slate-700 dark:text-slate-300"
		>
			<svelte:component this={content} />
		</div>
	</article>
</div>
