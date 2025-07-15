// src/routes/projects/+page.js

/** @type {import('./$types').PageLoad} */
export async function load() {
	const modules = import.meta.glob('/src/lib/content/projects/*.md', { eager: true });

	const projects = Object.entries(modules).map(([path, project]) => {
		const slug = path.split('/').pop()?.slice(0, -3);
		return { ...project.metadata, slug };
	});

	const sortedProjects = projects.sort((a, b) => b.year - a.year);

	return {
		projects: sortedProjects
	};
}
