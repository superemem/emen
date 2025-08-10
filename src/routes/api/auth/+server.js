// src/routes/api/auth/+server.js
import { json } from '@sveltejs/kit';

const CLIENT_ID = 'Ov23liJGP9rgsb1jftEl';
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

export async function GET({ url }) {
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state') || '';
	const redirectUri = `${url.origin}/api/auth`;

	if (!code) {
		const authUrl =
			`https://github.com/login/oauth/authorize?` +
			new URLSearchParams({
				client_id: CLIENT_ID,
				redirect_uri: redirectUri,
				scope: 'repo',
				state: state || cryptoRandom()
			});
		return new Response(null, { status: 302, headers: { Location: authUrl } });
	}

	try {
		const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
			method: 'POST',
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
			body: JSON.stringify({
				client_id: CLIENT_ID,
				client_secret: CLIENT_SECRET,
				code,
				redirect_uri: redirectUri
			})
		});
		const tokenData = await tokenRes.json();
		if (tokenData.error) return json({ error: tokenData.error }, { status: 400 });

		const accessToken = tokenData.access_token || '';
		const tokenType = tokenData.token_type || 'bearer';

		const html = `<!doctype html><html><head><title>Authorization Success</title></head><body>
      <p>Authorization successful! Closing window...</p>
      <script>
        (function () {
          var token = ${JSON.stringify(accessToken)};
          var provider = 'github';
          var state = ${JSON.stringify(state)};
          var tokenType = ${JSON.stringify(tokenType)};
          
          console.log('Auth popup - Token received:', token ? 'YES' : 'NO');
          console.log('Auth popup - State:', state);
          console.log('Auth popup - Opener exists:', !!window.opener);
          
          function sendMessage() {
            if (!window.opener) {
              console.log('No opener window found');
              return;
            }

            // Try different target origins
            var origins = ['*', window.location.origin];
            if (document.referrer) {
              try {
                origins.unshift(new URL(document.referrer).origin);
              } catch (e) {}
            }

            origins.forEach(function(targetOrigin) {
              console.log('Sending to origin:', targetOrigin);
              
              // Format 1: Decap expected format
              try {
                window.opener.postMessage(
                  'authorization:' + provider + ':success:' + token,
                  targetOrigin
                );
                console.log('Sent legacy format to:', targetOrigin);
              } catch (e) {
                console.error('Legacy format failed:', e);
              }

              // Format 2: Object format
              try {
                window.opener.postMessage({
                  type: 'authorization:' + provider + ':success',
                  token: token,
                  token_type: tokenType,
                  provider: provider,
                  state: state
                }, targetOrigin);
                console.log('Sent object format to:', targetOrigin);
              } catch (e) {
                console.error('Object format failed:', e);
              }
            });
          }

          // Send messages with different timings
          sendMessage();
          setTimeout(sendMessage, 100);
          setTimeout(sendMessage, 500);

          // Close popup
          setTimeout(function() {
            console.log('Closing popup');
            window.close();
          }, 2000);
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

function cryptoRandom() {
	if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
		const arr = new Uint32Array(1);
		crypto.getRandomValues(arr);
		return String(arr[0]);
	}
	return String(Date.now());
}

export async function POST() {
	return json({ message: 'Auth endpoint active' });
}
