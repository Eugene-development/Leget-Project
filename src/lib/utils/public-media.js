const storageOrigin = 'https://storage.yandexcloud.net';
const thumbnailOrigin = 'https://avatars.mds.yandex.net';
const thumbnailId = /^[a-f0-9]{40}-[0-9]+-images-thumbs$/;
const storagePath = /^\/(leget-main|novostroy|zovrus|zovtop)\/.+/;
const imageExtension = /\.(?:avif|bmp|gif|ico|jpe?g|png|svg|webp)$/i;
const partnerImages = new Map([
	['https://zov.com.by/images/logo3.png', '/media/partners/zov.png'],
	['https://www.aristo.ru/include/logo_header.png', '/media/partners/aristo.png']
]);

/** @param {string | null | undefined} value */
export function publicMediaUrl(value) {
	if (!value) return value;
	const partner = partnerImages.get(value);
	if (partner) return partner;
	try {
		const url = new URL(value);
		const id = url.searchParams.get('id');
		if (
			url.origin === thumbnailOrigin &&
			url.pathname === '/i' &&
			!url.username &&
			!url.password &&
			!url.hash &&
			id &&
			thumbnailId.test(id) &&
			url.searchParams.size === 2 &&
			url.searchParams.get('n') === '13'
		)
			return `/media/yandex-thumbs/${id}`;
		if (
			url.origin === storageOrigin &&
			!url.username &&
			!url.password &&
			!url.search &&
			!url.hash &&
			storagePath.test(url.pathname) &&
			imageExtension.test(url.pathname)
		)
			return `/media${url.pathname}`;
	} catch {
		// Local paths and file previews are served as provided.
	}
	return value;
}
