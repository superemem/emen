<!-- File: src/routes/+page.svelte -->
<script>
	import { Linkedin, Instagram, Mail, Download } from '@lucide/svelte';
	import { base } from '$app/paths';
	import Accordion from '$lib/components/Accordion.svelte';
	import Seo from '$lib/components/Seo.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	const { featuredProjects, experiences, education, skills } = data;

	// Helper: bangun URL gambar aman (http(s) absolut atau /uploads/...)
	function projectImageSrc(p) {
		const img = p && p.image ? String(p.image) : null;
		if (img) {
			if (img.startsWith('http')) return img;
			return base + (img.startsWith('/') ? img : '/' + img);
		}
		return `https://picsum.photos/seed/${encodeURIComponent(p?.slug || 'placeholder')}/800/450`;
	}

	// Helper: asset di /static root (opsional, biar aman di subpath)
	const avatarSrc = base + '/emen-ala-pejabat.webp';
	const resumeHref = base + '/resume.pdf';
</script>

<Seo />

<div class="container mx-auto px-4 py-12 md:py-20">
	<!-- SECTION: HERO -->
	<section class="flex flex-col items-center text-center">
		<img
			src={avatarSrc}
			alt="Foto Profil Emen"
			class="h-32 w-32 rounded-full border-4 border-yellow-200 object-cover shadow-md hover:border-brand-navy"
			width="128"
			height="128"
			loading="lazy"
			decoding="async"
		/>
		<h1 class="mt-6 text-5xl font-bold leading-tight tracking-tight text-slate-900 md:text-6xl dark:text-white">
			Irfan Mursyidin a.k.a Emen
		</h1>
		<p class="mt-3 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl dark:text-slate-400">
			Looker Studio Expert • Dashboard Designer
		</p>
		<div class="mt-6 flex items-center gap-4">
			<a
				href="https://linkedin.com/in/emenn"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="LinkedIn"
				class="text-slate-500 transition-colors hover:text-brand-navy"
			>
				<Linkedin size={24} />
			</a>
			<a
				href="https://instagram.com/super.emen"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Instagram"
				class="text-slate-500 transition-colors hover:text-brand-navy"
			>
				<Instagram size={24} />
			</a>
		</div>
		<div class="mt-8 flex flex-col items-center gap-4 sm:flex-row">
			<a
				href={resumeHref}
				target="_blank"
				class="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-1 hover:bg-brand-navy sm:w-auto"
			>
				<Download size={18} />
				<span>Resume</span>
			</a>
			<a
				href="mailto:halo@emen.web.id"
				class="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-slate-700 shadow-md transition-all hover:-translate-y-1 hover:text-brand-navy hover:shadow-lg sm:w-auto"
			>
				<Mail size={18} />
				<span>Contact Me</span>
			</a>
		</div>
	</section>

	<!-- SECTION: ABOUT -->
	<section class="mx-auto mt-16 max-w-2xl text-center md:mt-10">
		<h2 class="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">About Me</h2>
		<div class="mt-6 space-y-4 text-left text-slate-700 md:text-center dark:text-slate-200">
			<p>
				I turn messy marketing and operational data into fast, decision-ready dashboards. With 8+
				years in SEO & digital marketing, I know which KPIs matter. GA4 + BigQuery, Google/Meta Ads,
				marketplaces, and spreadsheets—end-to-end from data modeling to clean, usable designs.
			</p>
		</div>
	</section>

	<!-- SECTION: EXPERIENCE -->
	<section class="mx-auto mt-16 max-w-3xl md:mt-10">
		<h2 class="text-center text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Work Experience</h2>
		<div class="mt-8">
			{#each experiences as exp}
				<Accordion
					title={exp.title}
					jobTitle={exp.jobTitle}
					period={exp.period}
					details={exp.details}
				/>
			{/each}
		</div>
	</section>

	<!-- SECTION: EDUCATION -->
	<section class="mx-auto mt-16 max-w-3xl md:mt-10">
		<h2 class="text-center text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Education</h2>
		<div class="mt-8 grid gap-8 md:grid-cols-2">
			{#each education as edu}
				<div
					class="rounded-xl bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg dark:bg-gray-800 dark:shadow-xl"
				>
					<h3 class="font-bold text-slate-800 dark:text-slate-200">{edu.school}</h3>
					<p class="mt-1 leading-7 text-slate-600 dark:text-slate-400">{edu.degree}</p>
					<p class="mt-2 text-sm text-slate-500 dark:text-slate-400">{edu.period}</p>
				</div>
			{/each}
		</div>
	</section>

	<!-- SECTION: PROJECTS PREVIEW -->
	<section class="mt-16 md:mt-10">
		<div class="mx-auto max-w-3xl text-center">
			<h2 class="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Featured Projects</h2>
			<p class="mt-4 text-slate-600 dark:text-slate-300">
				Berikut adalah beberapa proyek yang pernah saya kerjakan.
			</p>
		</div>

		<div class="mx-auto mt-8 grid max-w-5xl gap-8 md:grid-cols-2">
			{#each featuredProjects as project}
				<a href={`/projects/${project.slug}`} class="group card-lift">
					<div class="aspect-video overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
						<img
							src={projectImageSrc(project)}
							alt={`Preview untuk ${project.title}`}
							class="h-full w-full object-cover transition-transform group-hover:scale-105"
							loading="lazy"
							decoding="async"
						/>
					</div>
					<div class="p-6">
						<h3 class="text-xl font-bold text-slate-800 dark:text-slate-300">{project.title}</h3>
						{#if project.description}
							<p class="mt-2 text-sm text-slate-600 dark:text-slate-400">{project.description}</p>
						{/if}
						{#if project.tags?.length}
							<div class="mt-4 flex flex-wrap gap-2">
								{#each project.tags as tag}
									<span
									class="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300"
									>
										{tag}
									</span>
								{/each}
							</div>
						{/if}
					</div>
				</a>
			{/each}
		</div>

		<div class="mt-12 text-center">
			<a href="/projects" class="font-medium text-blue-600 transition-colors hover:text-brand-navy">
				Lihat semua proyek &rarr;
			</a>
		</div>
	</section>

	<!-- SECTION: SKILLS -->
	<section class="mx-auto mt-16 max-w-3xl md:mt-24">
		<h2 class="text-center text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
			Skills & Expertise
		</h2>
		<div class="mt-8 flex flex-wrap justify-center gap-3">
			{#each skills as skill}
				<div
					class="rounded-lg bg-slate-100 px-4 py-2 font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200"
				>
					{skill}
				</div>
			{/each}
		</div>
	</section>
</div>
