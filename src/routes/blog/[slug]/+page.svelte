<script>
    import { ArrowLeft, Clock, ChevronDown } from '@lucide/svelte';
	import { base } from '$app/paths';
	import Seo from '$lib/components/Seo.svelte';
	import Reactions from '$lib/components/Reactions.svelte';
    import { onMount, onDestroy, tick } from 'svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	const { content, meta } = data;
	const { readingTime, author, tags } = meta;

    let toc = [];
    let contentRef;
    let activeId = '';
    let showTocMobile = false;
    let headingNodes = [];

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

    onMount(async () => {
        await tick();
        if (!contentRef) return;
        // tunggu sekali lagi untuk memastikan konten mdsvex ter-render
        await tick();
        const headings = contentRef.querySelectorAll('h2, h3, h4, h5');
        headingNodes = Array.from(headings);
        toc = headingNodes.map((h) => {
            let id = h.id;
            if (!id) {
                id = (h.textContent || '')
                    .toLowerCase()
                    .replace(/[^a-z0-9\s-]/g, '')
                    .trim()
                    .replace(/\s+/g, '-');
                h.id = id;
            }
            const level = h.tagName === 'H2' ? 2 : h.tagName === 'H3' ? 3 : h.tagName === 'H4' ? 4 : 5;
            return { id, text: (h.textContent || '').trim(), level };
        });

        const updateActive = () => {
            const offset = 120;
            let current = toc[0]?.id || '';
            for (const h of headingNodes) {
                const top = h.getBoundingClientRect().top;
                if (top - offset <= 0) current = h.id;
            }
            activeId = current;
        };

        updateActive();
        window.addEventListener('scroll', updateActive, { passive: true });
        window.addEventListener('resize', updateActive);
        onDestroy(() => {
            window.removeEventListener('scroll', updateActive);
            window.removeEventListener('resize', updateActive);
        });
    });

    function indentCls(level) {
        return level === 3 ? 'pl-4' : level === 4 ? 'pl-8' : level === 5 ? 'pl-12' : '';
    }
</script>

<Seo 
	title={meta.title} 
	description={meta.description} 
	type="article" 
	imageUrl={heroSrc || '/emen-og-image.webp'}
	author={author || 'Irfan Mursyidin (Emen)'}
	publishedTime={meta.date}
	tags={tags || []}
/>


<div class="container mx-auto max-w-3xl px-4 py-12 md:py-20">
	<a
		href="/blog"
		class="mb-8 inline-flex items-center gap-2 text-slate-600 transition-colors hover:text-brand-navy dark:text-slate-200"
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
						class="inline-block rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
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

		<div class="lg:grid lg:grid-cols-12 lg:gap-8">
			{#if toc.length > 0}
				<!-- Mobile TOC toggle -->
				<div class="mb-4 lg:hidden">
					<button
						class="flex w-full items-center justify-between rounded-lg border border-slate-200 px-4 py-2 text-left text-sm font-semibold text-slate-800 dark:border-gray-800 dark:text-slate-100"
						on:click={() => (showTocMobile = !showTocMobile)}
						aria-expanded={showTocMobile}
					>
						<span>Daftar Isi</span>
						<ChevronDown class={showTocMobile ? 'rotate-180 transition-transform' : 'transition-transform'} size={18} />
					</button>
					{#if showTocMobile}
						<nav class="mt-2 rounded-lg border border-slate-200 p-4 text-sm dark:border-gray-800">
							<ul class="space-y-1">
								{#each toc as item}
									<li>
										<a
											href={`#${item.id}`}
											class={`block text-slate-600 transition-colors hover:text-brand-navy dark:text-slate-300 ${indentCls(item.level)} ${activeId === item.id ? 'text-brand-navy font-semibold' : ''}`}
											on:click={() => (showTocMobile = false)}
										>
											{item.text}
										</a>
									</li>
								{/each}
							</ul>
						</nav>
					{/if}
				</div>

				<!-- Desktop TOC -->
				<aside class="hidden lg:col-span-4 lg:mb-0 lg:block">
					<nav class="sticky top-24 rounded-lg border border-slate-200 p-4 text-sm dark:border-gray-800">
						<p class="mb-2 font-semibold text-slate-800 dark:text-slate-100">Daftar Isi</p>
						<ul class="space-y-1">
							{#each toc as item}
								<li>
									<a
										href={`#${item.id}`}
										class={`block text-slate-600 transition-colors hover:text-brand-navy dark:text-slate-300 ${indentCls(item.level)} ${activeId === item.id ? 'text-brand-navy font-semibold' : ''}`}
									>
										{item.text}
									</a>
								</li>
							{/each}
						</ul>
					</nav>
				</aside>
			{/if}

			<div class="lg:col-span-8">
				<div class="prose prose-lg mt-8 max-w-none" bind:this={contentRef}>
					<svelte:component this={content} />
				</div>

				<hr class="my-12" />

				<div class="text-center">
					<h3 class="mb-4 text-xl font-bold text-slate-800 dark:text-slate-100">
						Bagaimana perasaanmu setelah membaca ini?
					</h3>
					<Reactions slug={data.slug} />
				</div>
			</div>
		</div>
	</article>
</div>
