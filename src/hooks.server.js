/**
 * SvelteKit server hooks for LEGET Frontend
 *
 * Serves /config.js dynamically from environment variables injected
 * by entrypoint.sh at container startup. This avoids filesystem
 * permission issues with writing to build/client/ at runtime.
 */

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	// Serve runtime config for the browser
	if (event.url.pathname === '/config.js') {
		const apiBaseUrl = process.env.RUNTIME_API_BASE_URL || process.env.VITE_API_URL || 'http://localhost:8001/api';
		const authApiUrl = process.env.RUNTIME_AUTH_API_URL || process.env.VITE_AUTH_URL || 'http://localhost:8000';
		const frontendUrl = process.env.RUNTIME_FRONTEND_URL || process.env.VITE_FRONTEND_URL || 'http://localhost:5173';

		const body = `window.__APP_CONFIG__ = {
    API_BASE_URL: '${apiBaseUrl}',
    AUTH_API_URL: '${authApiUrl}',
    FRONTEND_URL: '${frontendUrl}'
};`;

		return new Response(body, {
			status: 200,
			headers: {
				'Content-Type': 'application/javascript',
				'Cache-Control': 'no-store, no-cache, must-revalidate'
			}
		});
	}

	return resolve(event);
}
