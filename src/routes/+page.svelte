<!-- File: src/routes/+page.svelte -->

<script>
	import { Linkedin, Instagram, Mail, Download } from '@lucide/svelte';
	import Accordion from '$lib/components/Accordion.svelte';
	import Seo from '$lib/components/Seo.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	const { featuredProjects, experiences, education, skills } = data;
</script>

<Seo />

<div class="container mx-auto px-4 py-12 md:py-20">
	<!-- ... (SECTION: HERO / AVATAR & ABOUT tidak berubah) ... -->
	<section class="flex flex-col items-center text-center">
		<img
			src="/emen-ala-pejabat.webp"
			alt="Foto Profil Emen"
			class="h-32 w-32 rounded-full border-4 border-yellow-200 object-cover shadow-md hover:border-blue-400"
			loading="lazy"
		/>
		<h1 class="mt-6 text-4xl font-bold text-slate-900 dark:text-white">
			Irfan Mursyidin a.k.a Emen
		</h1>
		<p class="mt-2 text-lg text-slate-600 dark:text-slate-400">
			Digital Marketing & SEO Specialist
		</p>
		<div class="mt-6 flex items-center gap-4">
			<a
				href="https://linkedin.com/in/emenn"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="LinkedIn"
				class="text-slate-500 transition-colors hover:text-blue-600"
			>
				<Linkedin size={24} />
			</a>
			<a
				href="https://instagram.com/super.emen"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Instagram"
				class="text-slate-500 transition-colors hover:text-blue-600"
			>
				<Instagram size={24} />
			</a>
		</div>
		<div class="mt-8 flex flex-col items-center gap-4 sm:flex-row">
			<a
				href="/resume.pdf"
				target="_blank"
				class="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-1 hover:bg-blue-700 sm:w-auto"
			>
				<Download size={18} />
				<span>Resume</span>
			</a>
			<a
				href="mailto:halo@emen.web.id"
				class="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-slate-700 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg sm:w-auto"
			>
				<Mail size={18} />
				<span>Contact Me</span>
			</a>
		</div>
	</section>
	<section class="mx-auto mt-16 max-w-2xl text-center md:mt-10">
		<h2 class="text-3xl font-bold text-slate-900 dark:text-white">About Me</h2>
		<div class="mt-6 space-y-4 text-left text-slate-700 md:text-center dark:text-slate-200">
			<p>
				Digital Marketing and SEO Specialist with 8 years of experience, specializing in driving
				online visibility and business growth through strategic SEO implementation and comprehensive
				digital marketing campaigns. Expert in optimizing digital presence and delivering measurable
				results.
			</p>
		</div>
	</section>

	<!-- SECTION: EXPERIENCE -->
	<section class="mx-auto mt-16 max-w-3xl md:mt-10">
		<h2 class="text-center text-3xl font-bold text-slate-900 dark:text-white">Work Experience</h2>
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
		<h2 class="text-center text-3xl font-bold text-slate-900 dark:text-white">Education</h2>
		<div class="mt-8 grid gap-8 md:grid-cols-2">
			{#each education as edu}
				<!-- PERUBAHAN DI SINI: tambahkan bg-white, shadow-md, dan efek hover -->
				<div
					class="rounded-xl bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg dark:bg-gray-800 dark:shadow-xl"
				>
					<h3 class="font-bold text-slate-800 dark:text-slate-200">{edu.school}</h3>
					<p class="mt-1 text-slate-600 dark:text-slate-400">{edu.degree}</p>
					<p class="dark:text-slate-400text-sm mt-2 text-slate-500">{edu.period}</p>
				</div>
			{/each}
		</div>
	</section>

	<!-- ... (SECTION: PROJECTS PREVIEW & SKILLS tidak berubah) ... -->
	<section class="mt-16 md:mt-10">
		<div class="mx-auto max-w-3xl text-center">
			<h2 class="text-3xl font-bold text-slate-900 dark:text-white">Featured Projects</h2>
			<p class="mt-4 text-slate-600 dark:text-slate-300">
				Berikut adalah beberapa proyek yang pernah saya kerjakan.
			</p>
		</div>
		<div class="mx-auto mt-8 grid max-w-5xl gap-8 md:grid-cols-2">
			{#each featuredProjects as project}
				<a href={`/projects/${project.slug}`} class="card-lift">
					<div class="aspect-video overflow-hidden bg-slate-100">
						<img
							src="https://picsum.photos/seed/{project.slug}/400/225"
							alt="Preview untuk {project.title}"
							class="h-full w-full object-cover transition-transform group-hover:scale-105"
							loading="lazy"
						/>
					</div>
					<div class="p-6">
						<h3 class="text-xl font-bold text-slate-800 dark:text-slate-300">{project.title}</h3>
						<p class="mt-2 text-sm text-slate-600 dark:text-slate-400">{project.description}</p>
						<div class="mt-4 flex flex-wrap gap-2">
							{#each project.tags as tag}
								<span
									class="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600"
								>
									{tag}
								</span>
							{/each}
						</div>
					</div>
				</a>
			{/each}
		</div>
		<div class="mt-12 text-center">
			<a href="/projects" class="font-medium text-blue-600 transition-colors hover:text-blue-700">
				Lihat semua proyek &rarr;
			</a>
		</div>
	</section>
	<section class="mx-auto mt-16 max-w-3xl md:mt-24">
		<h2 class="text-center text-3xl font-bold text-slate-900 dark:text-white">
			Skills & Expertise
		</h2>
		<div class="mt-8 flex flex-wrap justify-center gap-3">
			{#each skills as skill}
				<div class="rounded-lg bg-slate-100 px-4 py-2 font-medium text-slate-700">
					{skill}
				</div>
			{/each}
		</div>
	</section>
</div>
