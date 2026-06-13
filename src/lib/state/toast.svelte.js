export class ToastState {
	toasts = $state([]);

	add(message, type = 'success', duration = 4000) {
		const id = Math.random().toString(36).substring(2, 9);
		const toast = { id, message, type };
		this.toasts.push(toast);

		setTimeout(() => {
			this.remove(id);
		}, duration);
	}

	success(message, duration) {
		this.add(message, 'success', duration);
	}

	error(message, duration) {
		this.add(message, 'error', duration);
	}

	remove(id) {
		this.toasts = this.toasts.filter((t) => t.id !== id);
	}
}

export const toastState = new ToastState();
