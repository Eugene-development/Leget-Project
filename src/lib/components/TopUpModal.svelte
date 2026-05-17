<script>
	/**
	 * Modal for topping up the user's wallet balance.
	 *
	 * Props:
	 *   open      - whether the modal is visible
	 *   onClose   - callback when modal is closed
	 *   onSuccess - callback(newBalance) after successful top-up
	 */
	import { graphqlRequest } from '$lib/utils/graphql-client.js';

	let { open = false, onClose = () => {}, onSuccess = () => {} } = $props();

	let amount = $state('');
	let isSubmitting = $state(false);
	let error = $state('');

	const TOP_UP_MUTATION = `
		mutation TopUpBalance($amount: String!) {
			topUpBalance(amount: $amount) {
				success
				newBalance
			}
		}
	`;

	async function handleSubmit(e) {
		e.preventDefault();
		if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
			error = 'Введите корректную сумму больше нуля';
			return;
		}

		isSubmitting = true;
		error = '';
		try {
			const data = await graphqlRequest(TOP_UP_MUTATION, { amount: amount.toString() });
			if (data.topUpBalance.success) {
				onSuccess(data.topUpBalance.newBalance);
				onClose();
				amount = ''; // Reset for next time
			} else {
				error = 'Не удалось пополнить баланс';
			}
		} catch (err) {
			error = err.message || 'Ошибка при пополнении баланса';
		} finally {
			isSubmitting = false;
		}
	}

	function handleBackdropClick(e) {
		if (e.target === e.currentTarget) onClose();
	}

	function handleKeydown(e) {
		if (e.key === 'Escape') onClose();
	}
</script>

{#if open}
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<div
		role="dialog"
		aria-modal="true"
		aria-label="Пополнение баланса"
		tabindex="-1"
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
		onclick={handleBackdropClick}
		onkeydown={handleKeydown}
	>
		<div class="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
			<div class="mb-6 flex items-center justify-between">
				<h2 class="font-display text-xl font-semibold text-neutral-950">Пополнение баланса</h2>
				<button
					onclick={onClose}
					class="shrink-0 rounded-full p-1.5 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700"
					aria-label="Закрыть"
				>
					<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>

			<form onsubmit={handleSubmit} class="space-y-4">
				<div>
					<label for="amount" class="block text-sm font-medium text-neutral-700 mb-1">
						Сумма пополнения (₽)
					</label>
					<input
						id="amount"
						type="number"
						step="0.01"
						min="1"
						bind:value={amount}
						placeholder="Например, 1000"
						class="block w-full rounded-2xl border border-neutral-200 bg-transparent px-4 py-3 text-sm text-neutral-950 transition focus:border-neutral-950 focus:outline-none"
						required
						autofocus
					/>
				</div>

				{#if error}
					<p class="text-sm text-red-600 bg-red-50 p-3 rounded-xl border border-red-100">
						{error}
					</p>
				{/if}

				<div class="pt-2">
					<button
						type="submit"
						disabled={isSubmitting || !amount}
						class="w-full rounded-2xl bg-neutral-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:opacity-50"
					>
						{isSubmitting ? 'Обработка...' : 'Пополнить баланс'}
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}
