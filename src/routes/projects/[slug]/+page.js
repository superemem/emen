// src/routes/projects/[slug]/+page.js

import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	try {
		// Ambil slug dari parameter URL
		const { slug } = params;

		// Import file markdown berdasarkan slug
		const project = await import(`../../../lib/content/projects/${slug}.md`);

		// Return content dan metadata
		return {
			content: project.default,
			meta: project.metadata
		};
	} catch (e) {
		// Jika file tidak ditemukan, throw 404
		throw error(404, `Project tidak ditemukan: ${params.slug}`);
	}
}
