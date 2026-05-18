<script>
	/**
	 * Modal for topping up the user's wallet balance.
	 *
	 * Props:
	 *   open      - whether the modal is visible
	 *   onClose   - callback when modal is closed
	 *   onSuccess - callback(newBalance) after successful online top-up
	 *   onInvoiceCreated - callback(invoice) after bank invoice is created
	 */
	import { graphqlRequest } from '$lib/utils/graphql-client.js';
	import { getApiUrl } from '$lib/utils/config.js';

	let {
		open = false,
		onClose = () => {},
		onSuccess = () => {},
		onInvoiceCreated = () => {}
	} = $props();

	// Активная вкладка: 'online' | 'bank'
	let activeTab = $state('online');

	// ── Онлайн-пополнение ────────────────────────────────────────────────────
	let onlineAmount = $state('');
	let isSubmittingOnline = $state(false);
	let onlineError = $state('');

	// ── Расчётный счёт ────────────────────────────────────────────────────────
	let bankAmount = $state('');
	let companyName = $state('');
	let inn = $state('');
	let isSubmittingBank = $state(false);
	let bankError = $state('');
	let createdInvoice = $state(null); // Invoice после успешного создания

	const TOP_UP_MUTATION = `
		mutation TopUpBalance($amount: String!) {
			topUpBalance(amount: $amount) {
				success
				newBalance
			}
		}
	`;

	const CREATE_INVOICE_MUTATION = `
		mutation CreateInvoice($amount: String!, $companyName: String!, $inn: String) {
			createInvoice(amount: $amount, companyName: $companyName, inn: $inn) {
				success
				invoice {
					id
					number
					amount
					status
					companyName
					inn
					createdAt
				}
			}
		}
	`;

	// ── Handlers ─────────────────────────────────────────────────────────────

	async function handleOnlineSubmit(e) {
		e.preventDefault();
		if (!onlineAmount || isNaN(onlineAmount) || parseFloat(onlineAmount) <= 0) {
			onlineError = 'Введите корректную сумму больше нуля';
			return;
		}
		isSubmittingOnline = true;
		onlineError = '';
		try {
			const data = await graphqlRequest(TOP_UP_MUTATION, { amount: onlineAmount.toString() });
			if (data.topUpBalance.success) {
				onSuccess(data.topUpBalance.newBalance);
				handleClose();
			} else {
				onlineError = 'Не удалось пополнить баланс';
			}
		} catch (err) {
			onlineError = err.message || 'Ошибка при пополнении баланса';
		} finally {
			isSubmittingOnline = false;
		}
	}

	async function handleBankSubmit(e) {
		e.preventDefault();
		if (!bankAmount || isNaN(bankAmount) || parseFloat(bankAmount) <= 0) {
			bankError = 'Введите корректную сумму больше нуля';
			return;
		}
		if (!companyName.trim()) {
			bankError = 'Укажите наименование организации или ФИО';
			return;
		}
		isSubmittingBank = true;
		bankError = '';
		try {
			const data = await graphqlRequest(CREATE_INVOICE_MUTATION, {
				amount: bankAmount.toString(),
				companyName: companyName.trim(),
				inn: inn.trim() || null
			});
			if (data.createInvoice.success) {
				createdInvoice = data.createInvoice.invoice;
				onInvoiceCreated(createdInvoice);
			} else {
				bankError = 'Не удалось сформировать счёт';
			}
		} catch (err) {
			bankError = err.message || 'Ошибка при формировании счёта';
		} finally {
			isSubmittingBank = false;
		}
	}

	async function downloadInvoice(invoiceId) {
		const base = getApiUrl().replace(/\/api\/?$/, '');
		const token = localStorage.getItem('auth_token');
		try {
			const response = await fetch(`${base}/invoices/${invoiceId}/download`, {
				headers: token ? { Authorization: `Bearer ${token}` } : {}
			});
			if (!response.ok) throw new Error('Ошибка загрузки счёта');
			const html = await response.text();
			const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
			const url = URL.createObjectURL(blob);
			const win = window.open(url, '_blank');
			// Освобождаем URL через секунду после открытия
			setTimeout(() => URL.revokeObjectURL(url), 1000);
			if (!win) alert('Разрешите всплывающие окна для скачивания счёта');
		} catch (err) {
			bankError = err.message || 'Не удалось открыть счёт';
		}
	}

	function handleClose() {
		onClose();
		// Сбрасываем состояние с небольшой задержкой (чтобы анимация закрытия прошла)
		setTimeout(() => {
			activeTab = 'online';
			onlineAmount = '';
			onlineError = '';
			bankAmount = '';
			companyName = '';
			inn = '';
			bankError = '';
			createdInvoice = null;
		}, 300);
	}

	function handleBackdropClick(e) {
		if (e.target === e.currentTarget) handleClose();
	}

	function handleKeydown(e) {
		if (e.key === 'Escape') handleClose();
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
			<!-- Заголовок -->
			<div class="mb-6 flex items-center justify-between">
				<h2 class="font-display text-xl font-semibold text-neutral-950">Пополнение баланса</h2>
				<button
					onclick={handleClose}
					class="shrink-0 rounded-full p-1.5 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700"
					aria-label="Закрыть"
				>
					<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			<!-- Вкладки -->
			<div class="mb-6 flex rounded-2xl bg-neutral-100 p-1">
				<button
					onclick={() => { activeTab = 'online'; createdInvoice = null; }}
					class="flex-1 rounded-xl px-4 py-2 text-sm font-semibold transition {activeTab === 'online'
						? 'bg-white text-neutral-950 shadow-sm'
						: 'text-neutral-500 hover:text-neutral-700'}"
				>
					Онлайн
				</button>
				<button
					onclick={() => { activeTab = 'bank'; createdInvoice = null; }}
					class="flex-1 rounded-xl px-4 py-2 text-sm font-semibold transition {activeTab === 'bank'
						? 'bg-white text-neutral-950 shadow-sm'
						: 'text-neutral-500 hover:text-neutral-700'}"
				>
					Расчётный счёт
				</button>
			</div>

			<!-- ── Вкладка: Онлайн ─────────────────────────────────────────────── -->
			{#if activeTab === 'online'}
				<form onsubmit={handleOnlineSubmit} class="space-y-4">
					<div>
						<label for="online-amount" class="block text-sm font-medium text-neutral-700 mb-1">
							Сумма пополнения (₽)
						</label>
						<input
							id="online-amount"
							type="number"
							step="0.01"
							min="1"
							bind:value={onlineAmount}
							placeholder="Например, 1000"
							class="block w-full rounded-2xl border border-neutral-200 bg-transparent px-4 py-3 text-sm text-neutral-950 transition focus:border-neutral-950 focus:outline-none"
							required
						/>
					</div>

					{#if onlineError}
						<p class="text-sm text-red-600 bg-red-50 p-3 rounded-xl border border-red-100">
							{onlineError}
						</p>
					{/if}

					<div class="pt-2">
						<button
							type="submit"
							disabled={isSubmittingOnline || !onlineAmount}
							class="w-full rounded-2xl bg-neutral-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:opacity-50"
						>
							{isSubmittingOnline ? 'Обработка...' : 'Пополнить баланс'}
						</button>
					</div>
				</form>

			<!-- ── Вкладка: Расчётный счёт ────────────────────────────────────────── -->
			{:else if activeTab === 'bank'}
				{#if createdInvoice}
					<!-- Счёт успешно создан -->
					<div class="flex flex-col items-center gap-5 py-2 text-center">
						<div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50">
							<svg class="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
						</div>
						<div>
							<p class="font-semibold text-neutral-950">Счёт сформирован</p>
							<p class="mt-1 text-sm text-neutral-500">
								№ {createdInvoice.number} на сумму {parseFloat(createdInvoice.amount).toLocaleString('ru-RU')} ₽
							</p>
						</div>
						<p class="text-xs text-neutral-400 leading-relaxed">
							Откройте счёт и распечатайте его или сохраните как PDF.<br>
							После оплаты баланс будет зачислен в течение 1–3 рабочих дней.
						</p>
						<button
							onclick={() => downloadInvoice(createdInvoice.id)}
							class="flex w-full items-center justify-center gap-2 rounded-2xl bg-neutral-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
						>
							<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
							</svg>
							Открыть счёт на оплату
						</button>
						<button
							onclick={() => { createdInvoice = null; bankAmount = ''; companyName = ''; inn = ''; }}
							class="text-sm text-neutral-400 transition hover:text-neutral-700"
						>
							Выставить ещё один счёт
						</button>
					</div>
				{:else}
					<!-- Форма выставления счёта -->
					<form onsubmit={handleBankSubmit} class="space-y-4">
						<p class="text-sm text-neutral-500 leading-relaxed -mt-1">
							Мы сформируем счёт с реквизитами. После оплаты баланс будет зачислен вручную в течение 1–3 рабочих дней.
						</p>

						<div>
							<label for="bank-amount" class="block text-sm font-medium text-neutral-700 mb-1">
								Сумма пополнения (₽)
							</label>
							<input
								id="bank-amount"
								type="number"
								step="1"
								min="1"
								bind:value={bankAmount}
								placeholder="Например, 5000"
								class="block w-full rounded-2xl border border-neutral-200 bg-transparent px-4 py-3 text-sm text-neutral-950 transition focus:border-neutral-950 focus:outline-none"
								required
							/>
						</div>

						<div>
							<label for="company-name" class="block text-sm font-medium text-neutral-700 mb-1">
								Организация или ФИО плательщика
							</label>
							<input
								id="company-name"
								type="text"
								bind:value={companyName}
								placeholder="ООО «Ромашка» или Иванов Иван Иванович"
								class="block w-full rounded-2xl border border-neutral-200 bg-transparent px-4 py-3 text-sm text-neutral-950 transition focus:border-neutral-950 focus:outline-none"
								required
							/>
						</div>

						<div>
							<label for="inn" class="block text-sm font-medium text-neutral-700 mb-1">
								ИНН <span class="font-normal text-neutral-400">(необязательно)</span>
							</label>
							<input
								id="inn"
								type="text"
								bind:value={inn}
								placeholder="000000000000"
								maxlength="12"
								class="block w-full rounded-2xl border border-neutral-200 bg-transparent px-4 py-3 text-sm text-neutral-950 transition focus:border-neutral-950 focus:outline-none"
							/>
						</div>

						{#if bankError}
							<p class="text-sm text-red-600 bg-red-50 p-3 rounded-xl border border-red-100">
								{bankError}
							</p>
						{/if}

						<div class="pt-2">
							<button
								type="submit"
								disabled={isSubmittingBank || !bankAmount || !companyName}
								class="w-full rounded-2xl bg-neutral-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:opacity-50"
							>
								{isSubmittingBank ? 'Формируем счёт...' : 'Сформировать счёт'}
							</button>
						</div>
					</form>
				{/if}
			{/if}
		</div>
	</div>
{/if}
