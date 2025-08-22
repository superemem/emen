<!-- File: src/routes/projects/[slug]/+page.svelte -->
<script>
	import { ArrowLeft } from '@lucide/svelte';
	import { base } from '$app/paths';
	import Seo from '$lib/components/Seo.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	const { content, meta } = data;

	// Build src image aman (absolute http(s) ATAU /uploads/...)
	$: heroSrc = meta?.image
		? meta.image.startsWith('http')
			? meta.image
			: base + (meta.image.startsWith('/') ? meta.image : '/' + meta.image)
		: null;
</script>

<Seo
	title={`${meta.title} - Project Portfolio`}
	description={meta.description || `Detail proyek dashboard dan data visualization: ${meta.title} - Portfolio Emen sebagai Looker Studio Expert.`}
	type="website"
	imageUrl={heroSrc || '/emen-og-image.webp'}
	tags={meta.tags || []}
/>

<div class="container mx-auto max-w-3xl px-4 py-12 md:py-20">
	<a
		href="/projects"
		class="mb-8 inline-flex items-center gap-2 text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-200"
	>
		<ArrowLeft size={18} />
		<span>Kembali ke semua proyek</span>
	</a>

	<header class="mb-8">
		<h1 class="text-4xl font-bold text-slate-900 md:text-5xl dark:text-white">
			{meta.title}
		</h1>

		{#if meta.year}
			<p class="mt-2 text-lg text-slate-500">{meta.year}</p>
		{/if}

		{#if meta.tags && meta.tags.length > 0}
			<div class="mt-6 flex flex-wrap gap-2">
				{#each meta.tags as tag}
					<span
						class="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
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

	<div class="prose prose-img:rounded-xl dark:prose-invert mt-12 max-w-none">
		<svelte:component this={content} />
	</div>
</div>
