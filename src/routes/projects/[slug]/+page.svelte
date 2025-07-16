<!-- File: src/routes/projects/[slug]/+page.svelte -->

<script>
	import { ArrowLeft } from '@lucide/svelte';
	import Seo from '$lib/components/Seo.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	const { content, meta } = data;
</script>

<Seo
	title={`${meta.title} - Project`}
	description={meta.description || `Detail proyek ${meta.title}`}
/>

<div class="container mx-auto max-w-3xl px-4 py-12 md:py-20">
	<a
		href="/projects"
		class="mb-8 inline-flex items-center gap-2 text-slate-600 transition-colors hover:text-blue-600"
	>
		<ArrowLeft size={18} />
		<span>Kembali ke semua proyek</span>
	</a>

	<header class="mb-8">
		<h1 class="text-4xl font-bold text-slate-900 md:text-5xl">
			{meta.title}
		</h1>
		<p class="mt-2 text-lg text-slate-500">{meta.year}</p>

		{#if meta.tags && meta.tags.length > 0}
			<div class="mt-6 flex flex-wrap gap-2">
				{#each meta.tags as tag}
					<span class="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
						{tag}
					</span>
				{/each}
			</div>
		{/if}
	</header>

	<div class="mt-12 aspect-video overflow-hidden rounded-lg bg-slate-100">
		<img
			src="https://picsum.photos/seed/{meta.title}/800/450"
			alt="Gambar Proyek {meta.title}"
			class="h-full w-full object-cover"
			loading="lazy"
		/>
	</div>

	<div class="prose mt-12 max-w-none">
		<svelte:component this={content} />
	</div>
</div>
