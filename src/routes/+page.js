// File: src/routes/+page.js

import { experienceData, educationData, skillsData } from '$lib/data/profile.js';

/** @type {import('./$types').PageLoad} */
export async function load() {
	// Memuat data proyek (kode ini sudah ada dan benar)
	const modules = import.meta.glob('/src/lib/content/projects/*.md', { eager: true });
	const projects = Object.entries(modules).map(([path, project]) => {
		const slug = path.split('/').pop()?.slice(0, -3);
		return { ...project.metadata, slug };
	});
	const sortedProjects = projects.sort((a, b) => b.year - a.year);

	// Kirim semua data yang dibutuhkan oleh halaman utama
	return {
		featuredProjects: sortedProjects.slice(0, 2),
		experiences: experienceData,
		education: educationData,
		skills: skillsData
	};
}
