import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createContentLoadingTracker } from './content-loading.js';

test('the progress line stays active until overlapping content loads have both finished', () => {
	const changes = [];
	const tracker = createContentLoadingTracker((count) => changes.push(count));
	const finishAuth = tracker.start();
	const finishPage = tracker.start();
	finishAuth();
	assert.equal(changes.at(-1), 1);
	finishPage();
	assert.deepEqual(changes, [1, 2, 1, 0]);
});

test('unmount cleanup cannot clear a newer loader or run twice', () => {
	const changes = [];
	const tracker = createContentLoadingTracker((count) => changes.push(count));
	const finishOldPage = tracker.start();
	finishOldPage();
	const finishNewPage = tracker.start();
	finishOldPage();
	assert.equal(changes.at(-1), 1);
	finishNewPage();
	assert.deepEqual(changes, [1, 0, 1, 0]);
});
