<!-- File: src/routes/blog/+page.svelte -->

<script>
	import { ArrowRight } from '@lucide/svelte';
	import { fly } from 'svelte/transition';

	/** @type {import('./$types').PageData} */
	export let data;

	// Fungsi untuk memformat tanggal
	function formatDate(dateString) {
		const options = { year: 'numeric', month: 'long', day: 'numeric' };
		return new Date(dateString).toLocaleDateString('id-ID', options);
	}
</script>

<svelte:head>
	<title>Blog - Emen</title>
	<meta name="description" content="Kumpulan tulisan dan pemikiran dari Emen." />
</svelte:head>

<div class="container mx-auto max-w-3xl px-4 py-12 md:py-20">
	<!-- Header halaman yang lebih megah -->
	<header class="mb-16 text-center">
		<h1 class="text-5xl font-bold text-slate-900">Blog</h1>
		<p class="mt-4 text-lg text-slate-600">
			Di sini saya berbagi pemikiran, tutorial, dan cerita tentang perjalanan saya di dunia
			teknologi dan desain.
		</p>
	</header>

	<!-- Daftar artikel dengan banyak ruang kosong -->
	<div class="space-y-10">
		{#each data.posts as post, i (post.slug)}
			<a
				href={`/blog/${post.slug}`}
				class="group block rounded-xl bg-white p-8 text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
				in:fly={{ y: 20, duration: 400, delay: 200 + i * 100 }}
			>
				<article>
					<p class="text-sm text-slate-500">{formatDate(post.date)}</p>
					<h2
						class="mt-2 text-3xl font-bold text-slate-900 transition-colors group-hover:text-blue-600"
					>
						{post.title}
					</h2>
					<p class="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-700">
						{post.description}
					</p>
					<div
						class="mt-6 inline-flex items-center gap-2 font-medium text-blue-600"
						aria-hidden="true"
					>
						<span>Baca selengkapnya</span>
						<ArrowRight class="transition-transform group-hover:translate-x-1" size={18} />
					</div>
				</article>
			</a>
		{/each}
	</div>
</div>
