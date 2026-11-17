import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readAuthSessionResponse } from './auth-session.js';

test('backend errors and rate limiting do not masquerade as expired sessions', async () => {
	for (const status of [429, 500, 502, 503, 504]) {
		await assert.rejects(readAuthSessionResponse(new Response('unavailable', { status })));
	}
	await assert.rejects(readAuthSessionResponse(new Response('invalid json')));
	await assert.rejects(readAuthSessionResponse(Response.json({ success: true })));
});

test('only explicit auth rejection returns an invalid session', async () => {
	for (const status of [401, 403]) {
		assert.equal(await readAuthSessionResponse(new Response('', { status })), null);
	}
	assert.equal(await readAuthSessionResponse(Response.json({ success: false })), null);
	const session = { success: true, user: { id: 1 }, email_verified: true, balance: '123.45' };
	assert.deepEqual(await readAuthSessionResponse(Response.json(session)), session);
});
