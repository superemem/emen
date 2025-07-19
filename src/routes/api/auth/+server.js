// src/routes/api/auth/+server.js - Simple version
import { json } from '@sveltejs/kit';

const CLIENT_ID = 'Ov23liJGP9rgsb1jftEl';
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

export async function GET({ url, request }) {
	const code = url.searchParams.get('code');

	if (!code) {
		const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent('https://www.emen.web.id/api/auth')}&scope=repo&state=${Date.now()}`;

		return new Response(null, {
			status: 302,
			headers: { Location: githubAuthUrl }
		});
	}

	try {
		// Exchange code for access token
		const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				client_id: CLIENT_ID,
				client_secret: CLIENT_SECRET,
				code: code
			})
		});

		const tokenData = await tokenResponse.json();

		if (tokenData.error) {
			return json({ error: tokenData.error }, { status: 400 });
		}

		// Simple HTML that just redirects with fragment
		const html = `
            <!DOCTYPE html>
            <html>
            <head><title>Auth Success</title></head>
            <body>
                <script>
                    // Store token temporarily
                    sessionStorage.setItem('decap_auth_token', '${tokenData.access_token}');
                    
                    // Redirect to admin
                    window.location.href = '/admin#access_token=${tokenData.access_token}&provider=github&token_type=bearer';
                </script>
            </body>
            </html>
        `;

		return new Response(html, {
			headers: { 'Content-Type': 'text/html' }
		});
	} catch (error) {
		console.error('Auth error:', error);
		return json({ error: 'Authentication failed' }, { status: 500 });
	}
}
