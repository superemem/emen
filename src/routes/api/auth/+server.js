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

		// Return the token to DecapCMS
		const script = `
            <script>
                (function() {
                    function receiveMessage(e) {
                        console.log("receiveMessage %o", e);
                        if (e.origin !== "${url.origin}") {
                            console.log("origin mismatch");
                            return;
                        }
                        
                        if (e.data === "authorizing:github") {
                            window.postMessage('authorization:github:success:${JSON.stringify(tokenData)}', e.origin);
                        }
                    }
                    
                    window.addEventListener("message", receiveMessage, false);
                    
                    // Send message to parent
                    window.opener && window.opener.postMessage('authorization:github:success:${JSON.stringify(tokenData)}', "${url.origin}");
                    window.close();
                })();
            </script>
        `;

		return new Response(script, {
			headers: {
				'Content-Type': 'text/html'
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
