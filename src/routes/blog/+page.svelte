<!-- File: src/routes/blog/+page.svelte -->

<script>
	import { ArrowRight } from '@lucide/svelte';
	import { fly } from 'svelte/transition'; // 1. Import transisi 'fly'

	/** @type {import('./$types').PageData} */
	export let data;

	// Fungsi untuk memformat tanggal
	function formatDate(dateString) {
		const options = { year: 'numeric', month: 'long', day: 'numeric' };
		return new Date(dateString).toLocaleDateString('id-ID', options);
	}
</script>

<svelte:head>
	<title>Blog - Azwary</title>
	<meta name="description" content="Kumpulan tulisan dan pemikiran dari Azwary." />
</svelte:head>

<div class="container mx-auto max-w-3xl px-4 py-12 md:py-20">
	<h1 class="text-4xl font-bold">Blog</h1>
	<p class="mt-4">
		Di sini saya berbagi pemikiran, tutorial, dan cerita tentang perjalanan saya di dunia teknologi
		dan desain.
	</p>

	<div class="mt-12 flex flex-col gap-8">
		<!-- 2. Tambahkan index 'i' untuk menghitung delay -->
		{#each data.posts as post, i (post.slug)}
			<!-- 3. Tambahkan transisi 'in:fly' ke setiap kartu -->
			<a
				href={`/blog/${post.slug}`}
				class="group block"
				in:fly={{ x: -20, duration: 400, delay: i * 100 }}
			>
				<article>
					<p class="text-sm text-slate-500">{formatDate(post.date)}</p>
					<h2
						class="mt-2 text-2xl font-bold transition-colors group-hover:text-slate-900 dark:group-hover:text-white"
					>
						{post.title}
					</h2>
					<p class="mt-3 text-slate-600 dark:text-slate-400">{post.description}</p>
					<div
						class="mt-4 inline-flex items-center gap-2 font-medium text-slate-700 transition-colors group-hover:text-slate-900 dark:text-slate-200 dark:group-hover:text-white"
					>
						<span>Baca selengkapnya</span>
						<ArrowRight size={18} />
					</div>
				</article>
			</a>
		{/each}
	</div>
</div>
