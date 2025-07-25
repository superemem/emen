import { error } from '@sveltejs/kit';

// Fungsi untuk menghitung waktu baca
function calculateReadingTime(text) {
	const wordsPerMinute = 220;
	const words = text
		.trim()
		.split(/\s+/)
		.filter((word) => word.length > 0);
	const wordCount = words.length;
	const minutes = Math.ceil(wordCount / wordsPerMinute);
	return Math.max(1, minutes);
}

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	try {
		const post = await import(`../../../lib/content/blog/${params.slug}.md`);
		const articleText = post.rawContent || '';
		const readingTime = calculateReadingTime(articleText);

		return {
			slug: params.slug, // ========== INI PALING PENTING ==========
			content: post.default,
			meta: {
				...post.metadata,
				readingTime: readingTime
				// Optional: slug: params.slug (kalau mau slug di meta juga)
			}
		};
	} catch (e) {
		throw error(404, `Tulisan dengan slug ${params.slug} tidak ditemukan`);
	}
}
