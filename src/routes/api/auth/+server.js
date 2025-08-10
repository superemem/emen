// src/routes/api/auth/+server.js
import { json } from '@sveltejs/kit';

const CLIENT_ID = 'Ov23liJGP9rgsb1jftEl';
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

export async function GET({ url }) {
	const code = url.searchParams.get('code');
	// Ambil state dari Decap (saat !code) atau dari callback GitHub (saat ada code)
	const state = url.searchParams.get('state') || '';
	const redirectUri = `${url.origin}/api/auth`;

	if (!code) {
		// >>> KUNCI: teruskan state dari Decap ke GitHub, JANGAN bikin baru
		const authUrl =
			`https://github.com/login/oauth/authorize?` +
			new URLSearchParams({
				client_id: CLIENT_ID,
				redirect_uri: redirectUri,
				scope: 'repo', // pakai 'public_repo' jika repo publik
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

		const html = `<!doctype html><html><body>
      <p>Authorization successful! You can close this window.</p>
      <script>
        (function () {
          var token = ${JSON.stringify(accessToken)};
          var provider = 'github';
          var state = ${JSON.stringify(state)};
          var tokenType = ${JSON.stringify(tokenType)};
          // Kirim tepat ke origin opener
          var origin = (function () {
            try { return new URL(document.referrer).origin; } catch (e) { return window.location.origin; }
          })();

          // Legacy string (Decap lama)
          try { window.opener && window.opener.postMessage('authorization:' + provider + ':success:' + token, origin); } catch (e) {}

          // Modern object (Decap baru) - WAJIB sertakan state
          try {
            window.opener && window.opener.postMessage({
              type: 'authorization:' + provider + ':success',
              token: token,
              token_type: tokenType,
              provider: provider,
              state: state
            }, origin);
          } catch (e) {}

          try { if (window.opener) window.close(); else window.location.href = origin + '/admin/index.html'; } catch (e) { window.location.href = origin + '/admin/index.html'; }
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
