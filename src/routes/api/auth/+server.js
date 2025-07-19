// src/routes/api/auth/+server.js
import { json } from '@sveltejs/kit';

const CLIENT_ID = 'Ov23liJGP9rgsb1jftEl';
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

export async function GET({ url, request }) {
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');

	// Debug log
	console.log('Auth endpoint called with:', {
		code: code,
		state: state,
		fullUrl: url.toString(),
		searchParams: Array.from(url.searchParams.entries())
	});

	if (!code) {
		// Redirect to GitHub OAuth if no code
		const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent('https://www.emen.web.id/api/auth')}&scope=repo&state=${Date.now()}`;

		return new Response(null, {
			status: 302,
			headers: {
				Location: githubAuthUrl
			}
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

		// Return the token to DecapCMS with proper postMessage
		const tokenString = JSON.stringify(tokenData).replace(/"/g, '\\"');

		const script = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Authorization Success</title>
            </head>
            <body>
                <p>Authorization successful! Redirecting...</p>
                <script>
                    (function() {
                        const token = ${JSON.stringify(tokenData)};
                        const message = {
                            type: 'authorization:github:success',
                            token: token.access_token,
                            provider: 'github'
                        };
                        
                        // Send to opener (popup parent)
                        if (window.opener) {
                            window.opener.postMessage(message, '*');
                            window.close();
                        } else {
                            // Fallback: redirect to admin
                            window.location.href = '${url.origin}/admin#/';
                        }
                    })();
                </script>
            </body>
            </html>
        `;

		return new Response(script, {
			headers: {
				'Content-Type': 'text/html',
				'Cache-Control': 'no-cache'
			}
		});
	} catch (error) {
		console.error('Auth error:', error);
		return json({ error: 'Authentication failed' }, { status: 500 });
	}
}

export async function POST({ request }) {
	// Handle preflight and other POST requests
	return json({ message: 'Auth endpoint active' });
}
