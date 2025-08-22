<!-- File: src/lib/components/Seo.svelte -->

<script>
	import { page } from '$app/stores';
	import { base } from '$app/paths';

	// Menggunakan Svelte 5 Runes ($props) untuk handle props, ini lebih modern dan stabil.
	let {
		title = 'Emen - Looker Studio Expert & Dashboard Designer',
		description = 'Portfolio Irfan Mursyidin (Emen) - Expert Looker Studio, Dashboard Designer, dan Digital Marketing Strategist dengan 8+ tahun pengalaman SEO dan data visualization.',
		type = 'website',
		imageUrl = base + '/emen-og-image.webp',
		robots = 'index, follow',
		author = 'Irfan Mursyidin (Emen)',
		publishedTime = null,
		modifiedTime = null,
		tags = [],
		canonicalUrl = null
	} = $props();

	// Membuat URL absolut dari URL saat ini
	const url = canonicalUrl || $page.url.href;
	
	// Fallback untuk image jika tidak ada
	const ogImage = imageUrl.startsWith('http') 
		? imageUrl 
		: `https://emen.web.id${imageUrl}`;

	// Structured data untuk Person/Organization
	const personSchema = {
		"@context": "https://schema.org",
		"@type": "Person",
		"name": "Irfan Mursyidin",
		"alternateName": "Emen",
		"jobTitle": "Looker Studio Expert & Dashboard Designer",
		"description": "Digital Marketing Strategist dengan expertise di SEO, dashboard design, dan data visualization menggunakan Looker Studio, Google Analytics, dan BigQuery.",
		"url": "https://emen.web.id",
		"image": ogImage,
		"email": "halo@emen.web.id",
		"sameAs": [
			"https://linkedin.com/in/emenn",
			"https://instagram.com/super.emen"
		],
		"knowsAbout": [
			"SEO",
			"Digital Marketing",
			"Looker Studio",
			"Google Analytics",
			"Dashboard Design",
			"Data Visualization",
			"BigQuery",
			"WordPress"
		],
		"worksFor": {
			"@type": "Organization",
			"name": "PT Azzwars Wangi Abadi",
			"jobTitle": "Head of Creative Marketing"
		}
	};

	// Article schema untuk blog posts
	const articleSchema = type === 'article' && publishedTime ? {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		"headline": title,
		"description": description,
		"image": ogImage,
		"author": {
			"@type": "Person",
			"name": author
		},
		"publisher": {
			"@type": "Person",
			"name": "Emen",
			"logo": {
				"@type": "ImageObject",
				"url": `https://emen.web.id${base}/emen-avatar.PNG`
			}
		},
		"datePublished": publishedTime,
		"dateModified": modifiedTime || publishedTime,
		"mainEntityOfPage": {
			"@type": "WebPage",
			"@id": url
		},
		"keywords": tags.join(', ')
	} : null;
</script>

<svelte:head>
	<!-- SEO Dasar -->
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="author" content={author} />
	<meta name="generator" content="SvelteKit" />
	<meta name="theme-color" content="#0052cc" />
	
	<!-- Locale dan Language -->
	<meta property="og:locale" content="id_ID" />
	<meta name="language" content="Indonesian" />

	<!-- Canonical URL untuk menghindari duplikasi konten -->
	<link rel="canonical" href={url} />

	<!-- Robots Meta Tag untuk instruksi ke crawler -->
	<meta name="robots" content={robots} />

	<!-- Open Graph (untuk Facebook, LinkedIn, dll.) -->
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:site_name" content="Emen - Dashboard Designer & SEO Expert" />
	<meta property="og:type" content={type} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={title} />
	
	<!-- Article specific meta tags -->
	{#if type === 'article' && publishedTime}
		<meta property="article:author" content={author} />
		<meta property="article:published_time" content={publishedTime} />
		{#if modifiedTime}
			<meta property="article:modified_time" content={modifiedTime} />
		{/if}
		{#each tags as tag}
			<meta property="article:tag" content={tag} />
		{/each}
	{/if}

	<!-- Twitter Cards -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImage} />
	<meta name="twitter:image:alt" content={title} />
	<meta name="twitter:creator" content="@emen" />
	<meta name="twitter:site" content="@emen" />

	<!-- Additional SEO Meta Tags -->
	<meta name="rating" content="general" />
	<meta name="revisit-after" content="7 days" />
	<meta name="distribution" content="global" />
	
	<!-- Structured Data - Person Schema -->
	<script type="application/ld+json">
		{JSON.stringify(personSchema)}
	</script>
	
	<!-- Structured Data - Article Schema untuk blog posts -->
	{#if articleSchema}
		<script type="application/ld+json">
			{JSON.stringify(articleSchema)}
		</script>
	{/if}
</svelte:head>
