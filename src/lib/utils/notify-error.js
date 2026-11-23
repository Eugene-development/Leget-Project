import { toastState } from '$lib/state/toast.svelte.js';
import { isCancelled, userErrorMessage } from './user-error.js';

/** @param {unknown} error @param {string} [action] */
export function notifyError(error, action) {
	if (isCancelled(error)) return '';
	const message = userErrorMessage(error, action);
	if (typeof window !== 'undefined') toastState.error(message, 12000);
	return message;
}
