// File: src/routes/+page.js
import { experienceData, educationData, skillsData } from '$lib/data/profile.js';

/** @type {import('./$types').PageLoad} */
export async function load() {
	// Ambil semua file markdown project beserta metadata-nya
	const modules = import.meta.glob('/src/lib/content/projects/*.md', { eager: true });

	const projects = Object.entries(modules).map(([path, mod]) => {
		const m = mod?.metadata ?? {};
		const slug = path.split('/').pop()?.slice(0, -3);
		return { ...m, slug };
	});

	// Sort by year (aman walau year = string)
	const sortedProjects = projects.sort((a, b) => (parseInt(b.year) || 0) - (parseInt(a.year) || 0));

	return {
		featuredProjects: sortedProjects.slice(0, 2), // tampilkan 2 di homepage
		experiences: experienceData,
		education: educationData,
		skills: skillsData
	};
}
