import assert from 'node:assert/strict';
import { afterEach, beforeEach, test } from 'node:test';
import {
	clearAuthSession,
	getAuthToken,
	getEmailVerified,
	saveAuthSession,
	setEmailVerified
} from './auth-session.js';

function storage() {
	const data = new Map();
	return {
		getItem: (key) => data.get(key) ?? null,
		setItem: (key, value) => data.set(key, String(value)),
		removeItem: (key) => data.delete(key)
	};
}

function token(payload = {}) {
	return `header.${Buffer.from(JSON.stringify({ exp: Date.now() / 1000 + 3600, ...payload })).toString('base64url')}.signature`;
}

beforeEach(() => {
	globalThis.window = { localStorage: storage(), sessionStorage: storage() };
});
afterEach(() => delete globalThis.window);

test('ordinary login survives a reload but does not survive a new browser session', () => {
	const jwt = token({ remember: false });
	saveAuthSession({ token: jwt, remember: false, email_verified: true });
	assert.equal(getAuthToken(), jwt);
	assert.equal(getEmailVerified(), true);
	assert.equal(window.localStorage.getItem('auth_token'), null);
	window.sessionStorage = storage();
	assert.equal(getAuthToken(), null);
	assert.equal(getEmailVerified(), false);
});

test('remembered login survives a new session only until the JWT expires', () => {
	const jwt = token({ remember: true });
	saveAuthSession({ token: jwt, remember: true, email_verified: true });
	window.sessionStorage = storage();
	assert.equal(getAuthToken(), jwt);
	assert.equal(getEmailVerified(), true);
	window.localStorage.setItem('auth_token', token({ exp: 1, remember: true }));
	assert.equal(getAuthToken(), null);
	assert.equal(window.localStorage.getItem('email_verified'), null);
});

test('a subsequent unchecked login removes the previously remembered account', () => {
	saveAuthSession({ token: token({ remember: true }), remember: true, email_verified: true });
	const jwt = token({ sub: 'another-user', remember: false });
	saveAuthSession({ token: jwt, remember: false, email_verified: false });
	assert.equal(getAuthToken(), jwt);
	assert.equal(window.localStorage.getItem('auth_token'), null);
	assert.equal(window.localStorage.getItem('email_verified'), null);
	assert.equal(getEmailVerified(), false);
});

test('remembering after a session login clears the old session token and metadata', () => {
	saveAuthSession({ token: token(), email_verified: false });
	const jwt = token({ remember: true });
	saveAuthSession({ token: jwt, remember: true, email_verified: true });
	assert.equal(getAuthToken(), jwt);
	assert.equal(window.sessionStorage.getItem('auth_token'), null);
	assert.equal(window.sessionStorage.getItem('email_verified'), null);
});

test('legacy persistent tokens migrate to a session without silently remembering the account', () => {
	const jwt = token();
	window.localStorage.setItem('auth_token', jwt);
	window.localStorage.setItem('email_verified', '1');
	assert.equal(getAuthToken(), jwt);
	assert.equal(getEmailVerified(), true);
	assert.equal(window.sessionStorage.getItem('auth_token'), jwt);
	assert.equal(window.localStorage.getItem('auth_token'), null);
	window.sessionStorage = storage();
	assert.equal(getAuthToken(), null);
});

test('server reissue retains its explicit persistence decision', () => {
	for (const remember of [false, true]) {
		const jwt = token({ remember });
		saveAuthSession({ token: jwt, remember });
		setEmailVerified(true);
		const target = remember ? window.localStorage : window.sessionStorage;
		assert.equal(target.getItem('auth_token'), jwt);
		assert.equal(target.getItem('email_verified'), '1');
		assert.equal(getEmailVerified(), true);
	}
});

test('registration and old backend responses do not create persistent logins', () => {
	saveAuthSession({ token: token(), email_verified: false });
	assert.equal(window.localStorage.getItem('auth_token'), null);
	assert.ok(window.sessionStorage.getItem('auth_token'));
});

test('logout clears token and metadata from both stores', () => {
	for (const target of [window.sessionStorage, window.localStorage]) {
		target.setItem('auth_token', token({ remember: true }));
		target.setItem('email_verified', '1');
	}
	clearAuthSession();
	for (const target of [window.sessionStorage, window.localStorage]) {
		assert.equal(target.getItem('auth_token'), null);
		assert.equal(target.getItem('email_verified'), null);
	}
});

test('malformed tokens and tokens without an expiration are removed', () => {
	for (const jwt of ['broken', token({ exp: undefined })]) {
		saveAuthSession({ token: jwt, email_verified: true });
		assert.equal(getAuthToken(), null);
		assert.equal(getEmailVerified(), false);
	}
});

test('session access is safe during SSR', () => {
	delete globalThis.window;
	assert.equal(getAuthToken(), null);
	assert.equal(getEmailVerified(), false);
	setEmailVerified(true);
	clearAuthSession();
	saveAuthSession({ token: token() });
});
