/** Public password recovery requests never include an existing login session. */
export class PasswordRecoveryError extends Error {
	constructor(message, status, errors = {}, code = '') {
		super(message);
		this.name = 'PasswordRecoveryError';
		this.status = status;
		this.errors = errors;
		this.code = code;
	}
}

export async function postPasswordRecovery(apiUrl, action, payload, request = globalThis.fetch) {
	const response = await request(`${apiUrl.replace(/\/$/, '')}/auth/password/${action}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
		credentials: 'omit',
		cache: 'no-store',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify(payload)
	});

	const result = await response.json().catch(() => null);
	if (!response.ok || result?.success !== true) {
		throw new PasswordRecoveryError(
			response.status === 429
				? 'Слишком много попыток. Подождите несколько минут и попробуйте ещё раз.'
				: result?.message || 'Не удалось выполнить запрос. Попробуйте ещё раз.',
			response.status,
			result?.errors || {},
			result?.code || ''
		);
	}
	return result;
}

export function readPasswordResetLink(url) {
	const email = (url.searchParams.get('email') || '').trim().toLowerCase();
	const token = url.searchParams.get('token') || '';
	const valid =
		email.length <= 254 &&
		/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
		token.length > 0 &&
		token.length <= 255 &&
		!/\s/.test(token);
	return valid ? { email, token } : { email: '', token: '' };
}
