<script>
	import { ArrowUpRight } from '@lucide/svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>Projects - Azwary</title>
	<meta name="description" content="Kumpulan proyek yang pernah dikerjakan oleh Azwary." />
</svelte:head>

<div class="container mx-auto max-w-3xl px-4 py-12 md:py-20">
	<h1 class="text-4xl font-bold text-slate-900 dark:text-white">All Projects</h1>
	<p class="mt-4 text-slate-600 dark:text-slate-300">
		Berikut adalah daftar proyek yang telah saya dokumentasikan. Setiap proyek memiliki cerita dan
		tantangannya tersendiri.
	</p>

	<div class="mt-12 flex flex-col gap-4">
		{#each data.projects as project (project.slug)}
			<a
				href={`/projects/${project.slug}`}
				class="-mx-4 block border-b border-transparent p-4 transition-all hover:rounded-lg hover:border-b-slate-200 hover:bg-slate-50 dark:hover:border-b-slate-700 dark:hover:bg-slate-800/50"
			>
				<div class="flex items-center justify-between">
					<div>
						<h2 class="text-xl font-bold text-slate-800 dark:text-slate-100">{project.title}</h2>
					</div>
					<div class="flex items-center gap-4 text-slate-500">
						<span>{project.year}</span>
						<ArrowUpRight size={20} />
					</div>
				</div>
			</a>
		{/each}
	</div>
</div>
