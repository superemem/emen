<!-- File: src/lib/components/Seo.svelte -->

<script>
	import { page } from '$app/stores';

	// Menggunakan Svelte 5 Runes ($props) untuk handle props, ini lebih modern dan stabil.
	let {
		title = 'Emen - Remote Worker Indonesia',
		description = 'Portofolio dan blog pribadi Emen, Remote Worker di Indonesia. Membahas Digital Marketing, SEO dan Teknologi',
		type = 'website',
		imageUrl = 'https://via.placeholder.com/1200x630.png?text=emen',
		robots = 'index, follow'
	} = $props();

	// Membuat URL absolut dari URL saat ini
	const url = $page.url.href;
</script>

<svelte:head>
	<!-- SEO Dasar -->
	<title>{title}</title>
	<meta name="description" content={description} />

	<!-- Tambahan: Canonical URL untuk menghindari duplikasi konten -->
	<link rel="canonical" href={url} />

	<!-- Tambahan: Robots Meta Tag untuk instruksi ke crawler -->
	<meta name="robots" content={robots} />

	<!-- Open Graph (untuk Facebook, LinkedIn, dll.) -->
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:site_name" content="Emen" />
	<meta property="og:type" content={type} />
	<meta property="og:image" content={imageUrl} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />

	<!-- Twitter Cards -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={imageUrl} />
</svelte:head>
