// src/routes/api/auth/+server.js
import { json } from '@sveltejs/kit';

const CLIENT_ID = 'Ov23liJGP9rgsb1jftEl';
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

export async function GET({ url }) {
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');

	// bikin redirect_uri dinamis (works on localhost & prod)
	const redirectUri = `${url.origin}/api/auth`;

	if (!code) {
		const githubAuthUrl =
			`https://github.com/login/oauth/authorize?` +
			new URLSearchParams({
				client_id: CLIENT_ID,
				redirect_uri: redirectUri,
				scope: 'repo', // pakai "public_repo" kalau repo publik
				state: String(Date.now())
			});
		return new Response(null, { status: 302, headers: { Location: githubAuthUrl } });
	}

	try {
		const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				client_id: CLIENT_ID,
				client_secret: CLIENT_SECRET,
				code,
				redirect_uri: redirectUri
			})
		});

		const tokenData = await tokenResponse.json();
		if (tokenData.error) return json({ error: tokenData.error }, { status: 400 });

		const html = `<!doctype html><html><body>
      <script>
        (function() {
          const message = {
            type: 'authorization:github:success',
            token: ${JSON.stringify(tokenData.access_token)},
            provider: 'github'
          };
          if (window.opener) { window.opener.postMessage(message, '*'); window.close(); }
          else { window.location.href = '${url.origin}/admin'; }
        })();
      </script>
    </body></html>`;

		return new Response(html, {
			headers: { 'Content-Type': 'text/html', 'Cache-Control': 'no-cache' }
		});
	} catch (e) {
		console.error('Auth error:', e);
		return json({ error: 'Authentication failed' }, { status: 500 });
	}
}

export async function POST() {
	return json({ message: 'Auth endpoint active' });
}
