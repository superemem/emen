<script>
	import { Linkedin, Instagram } from '@lucide/svelte';
	import Accordion from '$lib/components/Accordion.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	// Data sekarang berasal dari 'data' prop yang di-supply oleh +page.js
	const { featuredProjects } = data;

	// Data ini bisa kita pindah ke +page.js juga nanti, tapi untuk sekarang biarkan di sini
	const experienceData = [
		{
			title: 'Nama Perusahaan A',
			jobTitle: 'Frontend Developer',
			period: '2022 - Sekarang',
			details: `<p>Membangun dan memelihara aplikasi web interaktif menggunakan SvelteKit dan Tailwind CSS...</p>`
		},
		{
			title: 'Nama Perusahaan B',
			jobTitle: 'Junior Web Developer',
			period: '2020 - 2022',
			details: `<p>Membantu tim dalam pengembangan fitur-fitur baru...</p>`
		}
	];

	const educationData = [
		{
			school: 'Universitas Keren Banget',
			degree: 'S1 - Teknik Informatika',
			period: '2016 - 2020'
		},
		{ school: 'SMA Negeri 1 Contoh', degree: 'IPA', period: '2013 - 2016' }
	];

	const skillsData = [
		'SEO',
		'Digital Marketing Strategist',
		'Looker Studio',
		'SvelteKit',
		'Tailwind CSS',
		'JavaScript (ES6+)',
		'TypeScript',
		'Node.js',
		'Git & GitHub'
	];
</script>

<div class="container mx-auto px-4 py-12 md:py-20">
	<section class="flex flex-col items-center text-center">
		<img
			src="https://i.pravatar.cc/128"
			alt="Foto Profil Azwary"
			class="h-32 w-32 rounded-full border-4 border-slate-200 object-cover shadow-md dark:border-slate-700"
		/>
		<h1 class="mt-6 text-4xl font-bold text-slate-900">Azwary</h1>
		<p class="mt-2 text-lg">Frontend Developer & Svelte Enthusiast</p>

		<div class="mt-6 flex items-center gap-4">
			<a
				href="https://linkedin.com/in/username-lo"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="LinkedIn"
				class="text-slate-500 transition-colors hover:text-slate-800"
			>
				<Linkedin size={24} />
			</a>
			<a
				href="https://instagram.com/username-lo"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Instagram"
				class="text-slate-500 transition-colors hover:text-slate-800"
			>
				<Instagram size={24} />
			</a>
		</div>
	</section>

	<section class="mx-auto mt-16 max-w-2xl text-center md:mt-10">
		<h2 class="text-3xl font-bold">About Me</h2>
		<div class="mt-6 space-y-4 text-left md:text-center">
			<p>
				Halo! Saya seorang developer yang bersemangat dalam membangun antarmuka pengguna yang
				bersih, cepat, dan intuitif. Dengan pengalaman di berbagai teknologi web modern, saya
				menemukan kecintaan khusus pada ekosistem Svelte karena kesederhanaan dan performanya yang
				luar biasa.
			</p>
			<p>
				Di luar coding, saya suka menjelajahi tren desain baru, berkontribusi pada proyek
				open-source, dan tentu saja, menulis di blog ini tentang perjalanan teknologi saya.
			</p>
		</div>
	</section>
	<section class="mx-auto mt-16 max-w-3xl md:mt-10">
		<h2 class="text-center text-3xl font-bold text-slate-900 dark:text-white">Work Experience</h2>
		<div class="mt-8">
			{#each experienceData as exp}
				<Accordion
					title={exp.title}
					jobTitle={exp.jobTitle}
					period={exp.period}
					details={exp.details}
				/>
			{/each}
		</div>
	</section>
	<section class="mx-auto mt-16 max-w-3xl md:mt-24">
		<h2 class="text-center text-3xl font-bold text-slate-900 dark:text-white">Education</h2>
		<div class="mt-8 grid gap-8 md:grid-cols-2">
			{#each educationData as edu}
				<div
					class="rounded-lg border border-slate-200 p-6 transition-shadow hover:shadow-lg dark:border-slate-700"
				>
					<h3 class="font-bold text-slate-800 dark:text-slate-100">{edu.school}</h3>
					<p class="mt-1 text-slate-600 dark:text-slate-400">{edu.degree}</p>
					<p class="mt-2 text-sm text-slate-500">{edu.period}</p>
				</div>
			{/each}
		</div>
	</section>
	<section class="mt-16 md:mt-24">
		<div class="mx-auto max-w-3xl text-center">
			<h2 class="text-3xl font-bold text-slate-900 dark:text-white">Featured Projects</h2>
			<p class="mt-4 text-slate-600 dark:text-slate-300">
				Berikut adalah beberapa proyek yang pernah saya kerjakan.
			</p>
		</div>

		<div class="mx-auto mt-8 grid max-w-5xl gap-8 md:grid-cols-2">
			{#each featuredProjects as project}
				<a
					href={`/projects/${project.slug}`}
					class="group block overflow-hidden rounded-lg border border-slate-200 transition-all hover:-translate-y-1 hover:shadow-xl dark:border-slate-700"
				>
					<div class="aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
						<img
							src="https://picsum.photos/seed/{project.slug}/400/225"
							alt="Preview untuk {project.title}"
							class="h-full w-full object-cover transition-transform group-hover:scale-105"
						/>
					</div>
					<div class="p-6">
						<h3 class="text-xl font-bold text-slate-800 dark:text-slate-100">{project.title}</h3>
						<p class="mt-2 text-sm text-slate-600 dark:text-slate-400">{project.description}</p>

						<div class="mt-4 flex flex-wrap gap-2">
							{#each project.tags as tag}
								<span
									class="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
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
			<a
				href="/projects"
				class="font-medium text-slate-700 transition-colors hover:text-slate-900 dark:text-slate-200 dark:hover:text-white"
			>
				Lihat semua proyek &rarr;
			</a>
		</div>
	</section>
	<section class="mx-auto mt-16 max-w-3xl md:mt-24">
		<h2 class="text-center text-3xl font-bold text-slate-900 dark:text-white">
			Skills & Expertise
		</h2>
		<div class="mt-8 flex flex-wrap justify-center gap-3">
			{#each skillsData as skill}
				<div
					class="rounded-lg bg-slate-100 px-4 py-2 font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200"
				>
					{skill}
				</div>
			{/each}
		</div>
	</section>
</div>
