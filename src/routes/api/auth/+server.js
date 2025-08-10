// src/routes/api/auth/+server.js
import { json } from '@sveltejs/kit';

const CLIENT_ID = 'Ov23liJGP9rgsb1jftEl';
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

export async function GET({ url }) {
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state') || ''; // <-- tangkap state dari GitHub
	const redirectUri = `${url.origin}/api/auth`; // <-- dinamis (dev/prod)

	if (!code) {
		// pass state yang diset Decap (Decap akan set & pakai ini)
		const nextState = String(Date.now());
		const authUrl =
			`https://github.com/login/oauth/authorize?` +
			new URLSearchParams({
				client_id: CLIENT_ID,
				redirect_uri: redirectUri,
				scope: 'repo', // atau 'public_repo' kalau repo publik
				state: nextState
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

		// Kirim ke origin tab admin (bukan '*') biar aman dan pasti diterima
		const targetOrigin = (() => {
			try {
				// document.referrer akan mengarah ke /admin (tab opener)
				const r = document?.referrer || '';
				return r ? new URL(r).origin : url.origin;
			} catch {
				return url.origin;
			}
		})();

		const html = `<!doctype html><html><body>
      <p>Authorization successful! You can close this window.</p>
      <script>
        (function () {
          var token = ${JSON.stringify(accessToken)};
          var state = ${JSON.stringify(state)};
          var provider = 'github';
          var tokenType = ${JSON.stringify(tokenType)};
          var origin = ${JSON.stringify(targetOrigin)};

          // Legacy format (Decap lama)
          try { window.opener && window.opener.postMessage('authorization:' + provider + ':success:' + token, origin); } catch (e) {}

          // Modern format (Decap baru) — sertakan state
          try {
            window.opener && window.opener.postMessage({
              type: 'authorization:' + provider + ':success',
              token: token,
              token_type: tokenType,
              provider: provider,
              state: state
            }, origin);
          } catch (e) {}

          // Tutup popup / fallback redirect
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

export async function POST() {
	return json({ message: 'Auth endpoint active' });
}
