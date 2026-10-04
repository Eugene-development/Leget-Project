import assert from 'node:assert/strict';
import test from 'node:test';
import { postPasswordRecovery, readPasswordResetLink } from './password-recovery.js';

test('reset link requires both a valid email and a bounded opaque token', () => {
	assert.deepEqual(
		readPasswordResetLink(
			new URL('https://leget.ru/reset-password?email=User%40Example.com&token=opaque-token')
		),
		{ email: 'user@example.com', token: 'opaque-token' }
	);
	assert.deepEqual(
		readPasswordResetLink(new URL('https://leget.ru/reset-password?email=user%40example.com')),
		{ email: '', token: '' }
	);
	assert.deepEqual(
		readPasswordResetLink(
			new URL('https://leget.ru/reset-password?email=invalid&token=opaque-token')
		),
		{ email: '', token: '' }
	);
	assert.deepEqual(
		readPasswordResetLink(
			new URL('https://leget.ru/reset-password?email=user%40example.com&token=with%20space')
		),
		{ email: '', token: '' }
	);
	assert.deepEqual(
		readPasswordResetLink(
			new URL(`https://leget.ru/reset-password?email=user%40example.com&token=${'x'.repeat(256)}`)
		),
		{ email: '', token: '' }
	);
});

test('password recovery sends a single public POST without login credentials or referrer', async () => {
	const payload = { email: 'user@example.com', captcha_token: 'captcha-token' };
	let calls = 0;
	const result = await postPasswordRecovery(
		'https://auth.leget.ru/api/',
		'forgot',
		payload,
		async (url, options) => {
			calls++;
			assert.equal(url, 'https://auth.leget.ru/api/auth/password/forgot');
			assert.equal(options.method, 'POST');
			assert.equal(options.credentials, 'omit');
			assert.equal(options.cache, 'no-store');
			assert.equal(options.referrerPolicy, 'no-referrer');
			assert.deepEqual(JSON.parse(options.body), payload);
			return new Response(JSON.stringify({ success: true }), { status: 200 });
		}
	);
	assert.equal(calls, 1);
	assert.equal(result.success, true);
});

test('HTTP success alone never reports a completed password reset', async () => {
	await assert.rejects(
		postPasswordRecovery(
			'https://auth.leget.ru/api',
			'reset',
			{},
			async () => new Response('{}', { status: 200 })
		),
		(error) => error.name === 'PasswordRecoveryError' && error.status === 200
	);
});

test('expired token response preserves its code and field error for the recovery state', async () => {
	await assert.rejects(
		postPasswordRecovery(
			'https://auth.leget.ru/api',
			'reset',
			{},
			async () =>
				new Response(
					JSON.stringify({
						success: false,
						code: 'invalid_reset_token',
						message: 'Ссылка недействительна',
						errors: { token: ['Запросите новую ссылку'] }
					}),
					{ status: 422 }
				)
		),
		(error) =>
			error.code === 'invalid_reset_token' && error.errors.token[0] === 'Запросите новую ссылку'
	);
});

test('rate limit and non-JSON failure produce retry messages', async () => {
	await assert.rejects(
		postPasswordRecovery(
			'https://auth.leget.ru/api',
			'forgot',
			{},
			async () => new Response('', { status: 429 })
		),
		(error) => error.status === 429 && error.message.includes('Подождите')
	);
	await assert.rejects(
		postPasswordRecovery(
			'https://auth.leget.ru/api',
			'reset',
			{},
			async () => new Response('<html>Unavailable</html>', { status: 503 })
		),
		(error) => error.status === 503 && error.message.includes('Попробуйте ещё раз')
	);
});
