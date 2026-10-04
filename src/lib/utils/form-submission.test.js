import assert from 'node:assert/strict';
import test from 'node:test';
import { createFormSender, formSourceUrl } from './form-submission.ts';

test('recovery URL attribution never retains token, email, or fragment', () => {
	const resetUrl =
		'https://leget.ru/reset-password?token=private-token&email=private%40example.test#secret';
	assert.equal(formSourceUrl(resetUrl), 'https://leget.ru/reset-password');
	assert.equal(
		formSourceUrl('/reset-password?token=private-token', 'https://leget.ru/contact'),
		'https://leget.ru/reset-password'
	);
	assert.equal(
		formSourceUrl('https://other.example/?token=private-token', resetUrl),
		'https://leget.ru/reset-password'
	);
	assert.equal(
		formSourceUrl('https://leget.ru/contact?campaign=summer#form'),
		'https://leget.ru/contact?campaign=summer#form'
	);
});

test('all source_url values are redacted before submission and retries keep a key after URL cleanup', async () => {
	const previousWindow = globalThis.window;
	const previousFetch = globalThis.fetch;
	const calls = [];
	let fail = true;
	globalThis.window = {
		location: {
			href: 'https://leget.ru/reset-password?token=private-token&email=private%40example.test',
			pathname: '/reset-password'
		}
	};
	globalThis.fetch = async (_url, options) => {
		calls.push({ source: options.body.get('source_url'), key: options.body.get('submission_key') });
		if (fail) throw new Error('network unavailable');
		return new Response(
			JSON.stringify({ success: true, id: 'test-receipt', status: 'new', mail_status: 'pending' })
		);
	};
	try {
		const send = createFormSender('recovery-attribution-regression');
		await assert.rejects(send({ service_type: 'subscription', email: 'subscriber@example.test' }));
		globalThis.window.location.href = 'https://leget.ru/reset-password';
		fail = false;
		await send({ service_type: 'subscription', email: 'subscriber@example.test' });
		assert.equal(calls[0].source, 'https://leget.ru/reset-password');
		assert.equal(calls[1].source, 'https://leget.ru/reset-password');
		assert.equal(calls[0].key, calls[1].key);
		await send({
			source_url: 'https://leget.ru/reset-password?token=private-token&email=private%40example.test'
		});
		assert.equal(calls[2].source, 'https://leget.ru/reset-password');
		globalThis.window.location.href = 'https://leget.ru/reset-password?token=private-token';
		const body = new FormData();
		body.set('source_url', 'https://other.example/?token=private-token');
		await send(body);
		assert.equal(calls[3].source, 'https://leget.ru/reset-password');
	} finally {
		globalThis.window = previousWindow;
		globalThis.fetch = previousFetch;
	}
});
