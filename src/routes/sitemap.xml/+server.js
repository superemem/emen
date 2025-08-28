// File: src/routes/sitemap.xml/+server.js

const siteURL = 'https://emen.web.id'; // Ganti dengan URL asli lo nanti

// Fungsi untuk membuat sitemap
export async function GET() {
	const projectFiles = import.meta.glob('/src/lib/content/projects/*.md', { eager: true });
	const blogFiles = import.meta.glob('/src/lib/content/blog/*.md', { eager: true });

	const projectURLs = Object.keys(projectFiles).map((path) => {
		const slug = path.split('/').pop()?.slice(0, -3);
		return `<url><loc>${siteURL}/projects/${slug}</loc><changefreq>weekly</changefreq></url>`;
	});

	const blogURLs = Object.keys(blogFiles).map((path) => {
		const slug = path.split('/').pop()?.slice(0, -3);
		return `<url><loc>${siteURL}/blog/${slug}</loc><changefreq>weekly</changefreq></url>`;
	});

	const staticPages = `
		<url><loc>${siteURL}/</loc><changefreq>daily</changefreq></url>
		<url><loc>${siteURL}/projects</loc><changefreq>weekly</changefreq></url>
		<url><loc>${siteURL}/blog</loc><changefreq>monthly</changefreq></url>
		<url><loc>${siteURL}/services</loc><changefreq>weekly</changefreq></url>
	`;

	const body = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	${staticPages}
	${projectURLs.join('')}
	${blogURLs.join('')}
</urlset>`;

	const headers = {
		'Cache-Control': 'max-age=0, s-maxage=3600',
		'Content-Type': 'application/xml'
	};

	return new Response(body, { headers });
}
