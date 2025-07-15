// File: src/routes/blog/+page.js

/** @type {import('./$types').PageLoad} */
export async function load() {
	// Impor semua file markdown dari folder blog
	const modules = import.meta.glob('/src/lib/content/blog/*.md', { eager: true });

	const posts = Object.entries(modules).map(([path, post]) => {
		const slug = path.split('/').pop()?.slice(0, -3);
		return { ...post.metadata, slug };
	});

	// Urutkan postingan berdasarkan tanggal, dari yang terbaru
	const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));

	return {
		posts: sortedPosts
	};
}
