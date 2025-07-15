import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	try {
		// Impor file markdown secara dinamis berdasarkan slug dari URL
		const post = await import(`../../../lib/content/blog/${params.slug}.md`);

		return {
			content: post.default,
			meta: post.metadata
		};
	} catch (e) {
		// Jika file .md tidak ditemukan, tampilkan halaman error 404
		throw error(404, `Tulisan dengan slug ${params.slug} tidak ditemukan`);
	}
}
