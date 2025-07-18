import { error } from '@sveltejs/kit';

// Fungsi untuk menghitung waktu baca (dipindahkan dari +page.svelte)
function calculateReadingTime(text) {
	// Rata-rata kecepatan membaca dalam bahasa Indonesia: 200-250 kata per menit
	// Kita gunakan 220 kata per menit sebagai rata-rata
	const wordsPerMinute = 220;

	// Menghitung jumlah kata (split berdasarkan spasi dan filter yang kosong)
	const words = text
		.trim()
		.split(/\s+/)
		.filter((word) => word.length > 0);
	const wordCount = words.length;

	// Menghitung waktu baca dalam menit
	const minutes = Math.ceil(wordCount / wordsPerMinute);

	return Math.max(1, minutes); // Minimum 1 menit
}

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	try {
		// Impor file markdown secara dinamis berdasarkan slug dari URL
		// Asumsi: post objek memiliki properti 'rawContent' yang berisi teks mentah markdown.
		// Jika tidak, kamu mungkin perlu menyesuaikan markdown loader kamu.
		const post = await import(`../../../lib/content/blog/${params.slug}.md`);

		// Hitung waktu baca di sisi server
		const articleText = post.rawContent || ''; // Pastikan ada fallback jika rawContent tidak tersedia
		const readingTime = calculateReadingTime(articleText);

		return {
			content: post.default, // Komponen Svelte dari markdown
			meta: {
				...post.metadata, // Metadata yang sudah ada (title, date, dll.)
				readingTime: readingTime // Tambahkan waktu baca ke metadata
			}
		};
	} catch (e) {
		// Jika file .md tidak ditemukan, tampilkan halaman error 404
		throw error(404, `Tulisan dengan slug ${params.slug} tidak ditemukan`);
	}
}
