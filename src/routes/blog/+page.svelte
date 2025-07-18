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

<!-- Kontainer utama:
     - mx-auto dikembalikan untuk meratakan tengah seluruh blok konten (header dan daftar artikel).
     - max-w-4xl (diperlebar sedikit) untuk memberikan lebih banyak ruang pada konten.
     - px-4, md:px-6, lg:px-8 ditambahkan untuk padding responsif.
-->
<div class="container mx-auto max-w-4xl px-4 py-12 md:py-20">
	<!-- Header halaman:
         - text-center di header dihapus.
         - text-left ditambahkan ke h1 dan p untuk perataan kiri.
    -->
	<header class="mb-16">
		<h1 class="text-left text-5xl font-bold text-slate-900">Blog.</h1>
		<p class="mt-4 text-left text-lg text-slate-600">
			Kumpulan berbagai tulisan dan pemikiran dari berbagai topik untuk sekedar mengeluarkan
			pendapat atau isi kepala. Saya tidak berjanji ini akan aktif, tapi setiap ada pemikiran akan
			saya usahakan tulis di sini.
		</p>
	</header>

	<!-- Daftar artikel:
         - space-y-10 tetap untuk jarak vertikal antar kartu.
    -->
	<div class="space-y-10">
		{#each data.posts as post, i (post.slug)}
			<!-- Kartu blog:
                 - text-center dihapus dari kartu (penting agar teks di dalamnya bisa rata kiri).
                 - p-8 tetap untuk padding internal.
                 - shadow-md dan hover efek tetap dipertahankan.
            -->
			<a
				href={`/blog/${post.slug}`}
				class="group block rounded-xl bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
				in:fly={{ y: 20, duration: 600 }}
			>
				<article>
					<!-- Tanggal: text-left ditambahkan -->
					<p class="text-left text-sm text-slate-500">{formatDate(post.date)}</p>
					<!-- Judul: text-left ditambahkan -->
					<h2
						class="mt-2 text-left text-3xl font-bold text-slate-900 transition-colors group-hover:text-blue-600"
					>
						{post.title}
					</h2>
					<!-- Deskripsi: mx-auto dihapus, text-left ditambahkan -->
					<p class="mt-4 max-w-2xl text-left text-lg leading-relaxed text-slate-700">
						{post.description}
					</p>
					<!-- Tautan "Baca selengkapnya":
                         - inline-flex items-center gap-2 tetap untuk layout ikon.
                         - text-left ditambahkan untuk perataan teks.
                    -->
					<div
						class="mt-6 inline-flex items-center gap-2 text-left font-medium text-blue-600"
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
