import { readPasswordResetLink } from '$lib/utils/password-recovery.js';

/** @type {import('./$types').PageServerLoad} */
export function load({ url, setHeaders }) {
	setHeaders({
		'cache-control': 'no-store',
		'referrer-policy': 'no-referrer',
		'x-robots-tag': 'noindex, nofollow'
	});
	return readPasswordResetLink(url);
}
