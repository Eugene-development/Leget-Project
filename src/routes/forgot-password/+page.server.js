/** @type {import('./$types').PageServerLoad} */
export function load({ setHeaders }) {
	setHeaders({
		'cache-control': 'no-store',
		'referrer-policy': 'no-referrer',
		'x-robots-tag': 'noindex, nofollow'
	});
}
