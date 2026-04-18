/**
 * Runtime configuration helper for LEGET Frontend
 *
 * In Docker production: reads from window.__APP_CONFIG__ (injected by entrypoint.sh)
 * In development / build-time: falls back to import.meta.env.VITE_* variables
 */

/**
 * @returns {string} Auth API base URL (e.g. https://auth.leget.ru/api)
 */
export function getAuthApiUrl() {
	if (typeof window !== 'undefined' && window.__APP_CONFIG__?.AUTH_API_URL) {
		return window.__APP_CONFIG__.AUTH_API_URL + '/api';
	}
	return import.meta.env.VITE_AUTH_API_URL || 'http://localhost:8000/api';
}

/**
 * @returns {string} Leget API base URL (e.g. https://api.leget.ru)
 */
export function getApiUrl() {
	if (typeof window !== 'undefined' && window.__APP_CONFIG__?.API_URL) {
		return window.__APP_CONFIG__.API_URL;
	}
	return import.meta.env.VITE_API_URL || 'http://localhost:8080';
}
