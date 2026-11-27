import assert from 'node:assert/strict';
import { test } from 'node:test';
import { publicMediaUrl } from './public-media.js';

test('remote images rendered by the frontend use the shared public media route', () => {
	assert.equal(
		publicMediaUrl('https://storage.yandexcloud.net/leget-main/favicons/site/значок.ico'),
		'/media/leget-main/favicons/site/%D0%B7%D0%BD%D0%B0%D1%87%D0%BE%D0%BA.ico'
	);
	assert.equal(publicMediaUrl('https://zov.com.by/images/logo3.png'), '/media/partners/zov.png');
	const thumbnailId = 'ada48033e9cfa95f38d69fc9ae7b5bcc25b72f13-5037427-images-thumbs';
	assert.equal(
		publicMediaUrl(`https://avatars.mds.yandex.net/i?id=${thumbnailId}&n=13`),
		`/media/yandex-thumbs/${thumbnailId}`
	);
	for (const value of [
		'https://storage.yandexcloud.net/leget-main/private/card.png?X-Amz-Signature=signature',
		'https://example.test/image.png',
		'/images/projects/sample.webp',
		'data:image/png;base64,fixture'
	])
		assert.equal(publicMediaUrl(value), value);
});
