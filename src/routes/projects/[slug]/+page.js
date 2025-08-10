// src/routes/projects/[slug]/+page.js
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	try {
		const { slug } = params;
		const project = await import(`../../../lib/content/projects/${slug}.md`);

		return {
			slug,
			content: project.default,
			meta: project.metadata
		};
	} catch (e) {
		throw error(404, `Project tidak ditemukan: ${params.slug}`);
	}
}
