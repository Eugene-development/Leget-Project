// This is the owner/editor bearer session; tenant client sessions use HttpOnly cookies.
const TOKEN_KEY = 'auth_token';
const VERIFIED_KEY = 'email_verified';

function claims(token) {
	try {
		const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
		return JSON.parse(atob(payload));
	} catch {
		return null;
	}
}

function clearStorage(storage) {
	storage.removeItem(TOKEN_KEY);
	storage.removeItem(VERIFIED_KEY);
}

export function clearAuthSession() {
	if (typeof window === 'undefined') return;
	clearStorage(window.sessionStorage);
	clearStorage(window.localStorage);
}

/** Persist only an explicit server-confirmed remember choice. */
export function saveAuthSession(result) {
	if (typeof window === 'undefined' || !result.token) return;
	clearAuthSession();
	const storage = result.remember === true ? window.localStorage : window.sessionStorage;
	storage.setItem(TOKEN_KEY, result.token);
	if (result.email_verified !== undefined) {
		storage.setItem(VERIFIED_KEY, result.email_verified ? '1' : '0');
	}
}

function activeStorage() {
	if (typeof window === 'undefined') return null;
	for (const storage of [window.sessionStorage, window.localStorage]) {
		const token = storage.getItem(TOKEN_KEY);
		if (!token) continue;
		const payload = claims(token);
		if (!payload || typeof payload.exp !== 'number' || payload.exp <= Date.now() / 1000) {
			clearStorage(storage);
			continue;
		}
		// Old releases stored every login persistently. Keep that login usable in this
		// tab, but do not treat it as an explicit choice to remember the account.
		if (storage === window.localStorage && payload.remember !== true) {
			const verified = storage.getItem(VERIFIED_KEY);
			window.sessionStorage.setItem(TOKEN_KEY, token);
			if (verified !== null) window.sessionStorage.setItem(VERIFIED_KEY, verified);
			clearStorage(storage);
			return window.sessionStorage;
		}
		return storage;
	}
	return null;
}

export function getAuthToken() {
	return activeStorage()?.getItem(TOKEN_KEY) ?? null;
}

export function getEmailVerified() {
	return activeStorage()?.getItem(VERIFIED_KEY) === '1';
}

export function setEmailVerified(verified) {
	activeStorage()?.setItem(VERIFIED_KEY, verified ? '1' : '0');
}
