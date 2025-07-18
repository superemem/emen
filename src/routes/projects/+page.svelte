<!-- File: src/routes/projects/+page.svelte -->

<script>
	import { ArrowUpRight } from '@lucide/svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>Projects - Emen</title>
	<meta name="description" content="Kumpulan proyek yang pernah dikerjakan oleh Emen." />
</svelte:head>

<div class="container mx-auto max-w-3xl px-4 py-12 md:py-20">
	<header class="mb-16">
		<h1 class="text-5xl font-bold text-slate-900 dark:text-white">Projects.</h1>
		<p class="mt-4 text-lg text-slate-600 dark:text-slate-300">
			Berikut adalah daftar proyek yang telah saya dokumentasikan. Setiap proyek memiliki cerita dan
			tantangannya tersendiri.
		</p>
	</header>

	<div class="flex flex-col gap-4">
		{#each data.projects as project (project.slug)}
			<a
				href={`/projects/${project.slug}`}
				class="group flex items-center justify-between rounded-lg border border-transparent p-4 transition-all hover:bg-white hover:shadow-md dark:bg-gray-800 dark:shadow-xl"
			>
				<h2
					class="text-xl font-bold text-slate-800 transition-colors group-hover:text-blue-600 dark:text-white"
				>
					{project.title}
				</h2>
				<div class="flex items-center gap-4 text-slate-500">
					<span>{project.year}</span>
					<ArrowUpRight
						class="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
						size={20}
					/>
				</div>
			</a>
		{/each}
	</div>
</div>
