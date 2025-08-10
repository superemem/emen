<script>
	import { ArrowLeft, Clock } from '@lucide/svelte';
	import { base } from '$app/paths';
	import Seo from '$lib/components/Seo.svelte';
	import Reactions from '$lib/components/Reactions.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	const { content, meta } = data;
	const { readingTime, author, tags } = meta;

	// Format tanggal ID
	function formatDate(dateString) {
		const options = { year: 'numeric', month: 'long', day: 'numeric' };
		return new Date(dateString).toLocaleDateString('id-ID', options);
	}

	// Build src image yang aman (absolute http(s) ATAU /uploads/...)
	$: heroSrc = meta?.image
		? meta.image.startsWith('http')
			? meta.image
			: base + (meta.image.startsWith('/') ? meta.image : '/' + meta.image)
		: null;
</script>

<Seo title={meta.title} description={meta.description} type="article" image={heroSrc} />

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

			{#if heroSrc}
				<figure class="mt-6 overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
					<img
						src={heroSrc}
						alt={meta.title}
						loading="eager"
						decoding="async"
						fetchpriority="high"
						class="h-64 w-full object-cover md:h-96"
					/>
				</figure>
			{/if}
		</header>

		<div class="prose prose-lg mt-8 max-w-none">
			<svelte:component this={content} />
		</div>

		<hr class="my-12" />

		<div class="text-center">
			<h3 class="mb-4 text-xl font-bold text-slate-800 dark:text-slate-100">
				Bagaimana perasaanmu setelah membaca ini?
			</h3>
			<Reactions slug={data.slug} />
		</div>
	</article>
</div>
