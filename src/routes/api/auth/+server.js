// src/routes/api/auth/+server.js
import { error } from '@sveltejs/kit';
// PERBAIKAN: Pastikan ini diimpor dengan benar untuk mengakses environment variables
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';

// PERBAIKAN: Tidak perlu lagi pengecekan if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) di sini
// karena $env/static/private akan memastikan variabel ini ada saat build
// dan akan throw error lebih awal jika tidak ada.

/**
 * @type {import('./$types').RequestHandler}
 */
export async function GET({ url }) {
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');
	const provider = url.searchParams.get('provider'); // Decap CMS mengirimkan ini
	const scope = url.searchParams.get('scope'); // Decap CMS mengirimkan ini

	console.log('Received OAuth request:');
	console.log('- Code:', code ? 'present' : 'missing');
	console.log('- State:', state);
	console.log('- Provider:', provider);
	console.log('- Scope:', scope);
	console.log('- Full query:', url.searchParams.toString());

	// Jika tidak ada 'code', berarti ini adalah permintaan awal dari Decap CMS untuk memulai login
	if (!code) {
		if (provider !== 'github') {
			throw error(400, 'Invalid OAuth provider.');
		}
		// Redirect ke GitHub untuk otorisasi
		// redirect_uri di sini HARUS sama persis dengan Authorization callback URL di GitHub OAuth App
		// dan itu adalah URL endpoint ini sendiri: ${url.origin}/api/auth
		const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=${scope}&redirect_uri=${url.origin}/api/auth&state=${state}`;
		console.log('Redirecting to GitHub for authorization:', githubAuthUrl);
		return new Response(null, {
			status: 302,
			headers: {
				Location: githubAuthUrl
			}
		});
	}

	// Jika ada 'code', berarti ini adalah callback dari GitHub
	try {
		console.log('Exchanging code for access token...');

		// Tukar kode dengan access token dari GitHub
		const response = await fetch('https://github.com/login/oauth/access_token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				client_id: GITHUB_CLIENT_ID,
				client_secret: GITHUB_CLIENT_SECRET,
				code: code,
				redirect_uri: `${url.origin}/api/auth` // Ini harus sama dengan redirect_uri di atas
			})
		});

		const data = await response.json();

		if (data.error) {
			console.error('GitHub OAuth Error:', data.error_description || data.error);
			throw error(500, `GitHub OAuth Error: ${data.error_description || data.error}`);
		}

		if (!data.access_token) {
			console.error('No access token received:', data);
			throw error(500, 'No access token received from GitHub.');
		}

		console.log('Access token received, redirecting to CMS...');

		// Redirect kembali ke Decap CMS dengan access token di hash
		// URL ini HARUS sama persis dengan URL di mana Decap CMS dimuat
		const redirectUrl = `${url.origin}/admin/#access_token=${data.access_token}&token_type=bearer&state=${state}`;

		return new Response(null, {
			status: 302,
			headers: {
				Location: redirectUrl
			}
		});
	} catch (err) {
		console.error('Error during OAuth flow:', err);
		throw error(500, `Authentication failed: ${err.message}`);
	}
}
