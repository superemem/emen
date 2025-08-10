import { error } from '@sveltejs/kit';

// Hitung waktu baca ~220 kata/menit
function calculateReadingTime(text) {
	const wordsPerMinute = 220;
	const words = (text || '')
		.trim()
		.split(/\s+/)
		.filter((w) => w.length > 0);
	const minutes = Math.ceil(words.length / wordsPerMinute);
	return Math.max(1, minutes);
}

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	try {
		const post = await import(`../../../lib/content/blog/${params.slug}.md`);
		const articleText = post.rawContent || '';

		return {
			slug: params.slug,
			content: post.default,
			meta: {
				...post.metadata,
				readingTime: calculateReadingTime(articleText)
			}
		};
	} catch (e) {
		throw error(404, `Tulisan dengan slug ${params.slug} tidak ditemukan`);
	}
}
