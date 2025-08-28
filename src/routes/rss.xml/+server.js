// File: src/routes/rss.xml/+server.js

const siteURL = 'https://emen.web.id';

export async function GET() {
  const modules = import.meta.glob('/src/lib/content/blog/*.md', { eager: true });
  const posts = Object.entries(modules).map(([path, mod]) => {
    const slug = path.split('/').pop()?.slice(0, -3);
    const meta = mod?.metadata ?? {};
    return { slug, ...meta };
  });

  // Sort newest first
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  const items = posts
    .map((p) => {
      const url = `${siteURL}/blog/${p.slug}`;
      const title = escapeXML(p.title || p.slug);
      const description = escapeXML(p.description || '');
      const pubDate = p.date ? new Date(p.date).toUTCString() : new Date().toUTCString();
      return `
      <item>
        <title>${title}</title>
        <link>${url}</link>
        <guid>${url}</guid>
        <pubDate>${pubDate}</pubDate>
        <description><![CDATA[${description}]]></description>
      </item>`;
    })
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Emen Blog</title>
    <link>${siteURL}</link>
    <description>RSS feed tulisan terbaru</description>
    <language>id</language>
    ${items}
  </channel>
</rss>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'max-age=0, s-maxage=3600'
    }
  });
}

function escapeXML(str = '') {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

