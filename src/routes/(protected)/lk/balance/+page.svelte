<script>
	import PageIntro from '$lib/components/PageIntro.svelte';
	import Container from '$lib/components/Container.svelte';
	import FadeIn from '$lib/components/FadeIn.svelte';
	import FadeInStagger from '$lib/components/FadeInStagger.svelte';
	import Button from '$lib/components/Button.svelte';
	import TopUpModal from '$lib/components/TopUpModal.svelte';
	import { browser } from '$app/environment';
	import { graphqlRequest } from '$lib/utils/graphql-client.js';
	import { openInvoice } from '$lib/utils/invoice.js';

	const MY_WALLET_QUERY = `
		query MyWallet($first: Int!, $page: Int) {
			myWallet {
				balance
				transactions(first: $first, page: $page, orderBy: [{ column: "created_at", order: DESC }]) {
					data {
						id
						licenseId
						amount
						type
						description
						createdAt
					}
					paginatorInfo {
						currentPage
						lastPage
						hasMorePages
					}
				}
			}
		}
	`;

	const INVOICES_PER_PAGE = 10;

	const MY_INVOICES_QUERY = `
		query MyInvoices($first: Int!, $page: Int) {
			myInvoices(first: $first, page: $page) {
				data {
					id
					number
					amount
					status
					companyName
					inn
					createdAt
				}
				paginatorInfo {
					currentPage
					hasMorePages
				}
			}
		}
	`;

	let wallet = $state(null);
	let transactions = $state([]);
	let isLoading = $state(true);
	let isLoadingMore = $state(false);
	let error = $state(null);
	let isModalOpen = $state(false);
	let modalTab = $state('online'); // с какой вкладки открыть модалку: 'online' | 'bank'
	let filterType = $state('all');
	let dateFrom = $state('');
	let dateTo = $state('');
	let viewMode = $state('list'); // 'list' or 'calendar'
	let calendarMonth = $state(new Date().getMonth());
	let calendarYear = $state(new Date().getFullYear());
	let selectedDay = $state(null);
	let currentPage = $state(1);
	let hasMorePages = $state(false);

	// Счета на оплату (расчётный счёт)
	let invoices = $state([]);
	let isLoadingInvoices = $state(false);
	let isLoadingMoreInvoices = $state(false);
	let invoicesPage = $state(1);
	let hasMoreInvoices = $state(false);
	let downloadingId = $state(null); // ID счёта, который сейчас скачивается

	function changeMonth(delta) {
		const newDate = new Date(calendarYear, calendarMonth + delta, 1);
		calendarMonth = newDate.getMonth();
		calendarYear = newDate.getFullYear();
		selectedDay = null;
	}

	const calendarDays = $derived.by(() => {
		const firstDay = new Date(calendarYear, calendarMonth, 1);
		const lastDay = new Date(calendarYear, calendarMonth + 1, 0);

		const days = [];
		// Padding for start of month (RU: Monday is first day)
		const startPadding = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
		for (let i = 0; i < startPadding; i++) {
			days.push({ day: null });
		}

		for (let d = 1; d <= lastDay.getDate(); d++) {
			const dayTransactions = transactions
				? transactions.filter((tx) => {
						const txDate = new Date(tx.createdAt);
						return (
							txDate.getFullYear() === calendarYear &&
							txDate.getMonth() === calendarMonth &&
							txDate.getDate() === d
						);
					})
				: [];

			const deposit = dayTransactions
				.filter((t) => t.type === 'deposit')
				.reduce((sum, t) => sum + parseFloat(t.amount), 0);
			const withdraw = dayTransactions
				.filter((t) => t.type === 'withdraw')
				.reduce((sum, t) => sum + parseFloat(t.amount), 0);

			days.push({
				day: d,
				transactions: dayTransactions,
				deposit,
				withdraw
			});
		}
		return days;
	});

	const monthName = $derived.by(() => {
		const raw = new Date(calendarYear, calendarMonth).toLocaleDateString('ru-RU', {
			month: 'long',
			year: 'numeric'
		});
		return raw.charAt(0).toUpperCase() + raw.slice(1);
	});

	async function fetchWallet(page = 1, append = false) {
		if (append) {
			isLoadingMore = true;
		} else {
			isLoading = true;
		}
		error = null;
		try {
			// For calendar we fetch more, for list we fetch standard page
			const first = viewMode === 'calendar' ? 200 : 20;
			const data = await graphqlRequest(MY_WALLET_QUERY, { first, page });
			wallet = data.myWallet;
			
			const newTransactions = data.myWallet.transactions.data;
			if (append) {
				transactions = [...transactions, ...newTransactions];
			} else {
				transactions = newTransactions;
			}
			
			currentPage = data.myWallet.transactions.paginatorInfo.currentPage;
			hasMorePages = data.myWallet.transactions.paginatorInfo.hasMorePages;
		} catch (err) {
			console.error('Failed to fetch wallet:', err);
			error = err.message || 'Не удалось загрузить данные кошелька';
		} finally {
			isLoading = false;
			isLoadingMore = false;
		}
	}

	function loadMore() {
		if (hasMorePages && !isLoadingMore) {
			fetchWallet(currentPage + 1, true);
		}
	}

	$effect(() => {
		if (browser && viewMode) {
			fetchWallet(1, false);
		}
	});

	function handleTopUpSuccess(newBalance) {
		if (wallet) {
			wallet.balance = newBalance;
			// Re-fetch to get the new transaction in history
			fetchWallet();
		}
	}

	async function fetchInvoices(page = 1, append = false) {
		if (append) {
			isLoadingMoreInvoices = true;
		} else {
			isLoadingInvoices = true;
		}
		try {
			const data = await graphqlRequest(MY_INVOICES_QUERY, {
				first: INVOICES_PER_PAGE,
				page
			});
			const loaded = data.myInvoices?.data ?? [];
			invoices = append ? [...invoices, ...loaded] : loaded;
			invoicesPage = data.myInvoices?.paginatorInfo?.currentPage ?? page;
			hasMoreInvoices = data.myInvoices?.paginatorInfo?.hasMorePages ?? false;
		} catch (err) {
			console.error('Failed to fetch invoices:', err);
		} finally {
			isLoadingInvoices = false;
			isLoadingMoreInvoices = false;
		}
	}

	function loadMoreInvoices() {
		if (hasMoreInvoices && !isLoadingMoreInvoices) {
			fetchInvoices(invoicesPage + 1, true);
		}
	}

	function handleInvoiceCreated(invoice) {
		// Добавляем новый счёт в начало списка без полного перезапроса
		invoices = [invoice, ...invoices];
	}

	/** Открывает модалку пополнения на нужной вкладке: 'online' | 'bank'. */
	function openTopUp(tab) {
		modalTab = tab;
		isModalOpen = true;
	}

	async function downloadInvoice(invoiceId) {
		downloadingId = invoiceId;
		try {
			await openInvoice(invoiceId);
		} catch (err) {
			console.error('Invoice download error:', err);
			alert(err.message || 'Не удалось открыть счёт. Попробуйте позже.');
		} finally {
			downloadingId = null;
		}
	}

	$effect(() => {
		if (browser) fetchInvoices(1, false);
	});

	function groupTransactionsByDay(transactions) {
		if (!transactions) return [];
		const groups = {};
		transactions.forEach((tx) => {
			const date = new Date(tx.createdAt).toLocaleDateString('ru-RU', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			});
			if (!groups[date]) groups[date] = [];
			groups[date].push(tx);
		});
		return Object.entries(groups).map(([date, items]) => ({ date, items }));
	}

	const filteredTransactions = $derived(
		transactions
			? transactions.filter((tx) => {
					const typeMatch = filterType === 'all' || tx.type === filterType;
					const d = new Date(tx.createdAt);
					const txDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
					const dateFromMatch = !dateFrom || txDate >= dateFrom;
					const dateToMatch = !dateTo || txDate <= dateTo;
					return typeMatch && dateFromMatch && dateToMatch;
				})
			: []
	);

	const groupedTransactions = $derived(groupTransactionsByDay(filteredTransactions));

	function getLicenseId(description) {
		const match = description.match(/ID:\s*([0-9A-Z]{26})/i);
		return match ? match[1] : null;
	}
</script>

<svelte:head>
	<title>Баланс и платежи | LEGET</title>
	<meta name="description" content="Управление балансом и история транзакций" />
</svelte:head>

<PageIntro
	title="Баланс и платежи"
	breadcrumbs={[{ label: 'Личный кабинет', href: '/lk' }, { label: 'Баланс' }]}
>
	<!-- <p>Здесь вы можете пополнить баланс и просмотреть историю списаний за аренду сайтов.</p> -->
</PageIntro>

<Container class="mt-12 mb-24 sm:mt-20 lg:mt-24">
	<FadeInStagger class="flex flex-col gap-12">
		{#if isLoading && !wallet}
			<FadeIn>
				<div class="flex items-center justify-center py-16">
					<svg class="h-8 w-8 animate-spin text-neutral-400" fill="none" viewBox="0 0 24 24">
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
						></circle>
						<path
							class="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
						></path>
					</svg>
					<span class="ml-3 text-sm text-neutral-500">Загрузка данных...</span>
				</div>
			</FadeIn>
		{:else if error}
			<FadeIn>
				<div class="rounded-3xl border border-red-100 bg-red-50 p-8 text-center">
					<p class="text-sm text-red-600">{error}</p>
					<button
						onclick={() => fetchWallet(1, false)}
						class="mt-4 text-sm font-semibold text-red-700 underline hover:text-red-900"
					>
						Попробовать снова
					</button>
				</div>
			</FadeIn>
		{:else if wallet}
			<!-- Balance Card -->
			<FadeIn>
				<div
					class="rounded-3xl border border-neutral-100 bg-neutral-50 p-8 shadow-sm ring-1 ring-neutral-950/5"
				>
					<div class="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
						<div>
							<p class="text-sm font-medium text-neutral-500">Текущий баланс</p>
							<p class="font-display mt-1 text-4xl font-bold text-neutral-950">
								{parseFloat(wallet.balance).toLocaleString('ru-RU')} ₽
							</p>
						</div>
						<div class="flex gap-4">
							<Button onclick={() => openTopUp('online')}>Пополнить баланс</Button>
						</div>
					</div>
				</div>
			</FadeIn>

			<!-- Transactions History -->
			<div class="flex flex-col gap-8">
				<FadeIn>
					<div class="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
						<h2 class="font-display text-2xl font-semibold text-neutral-950">История операций</h2>
						<div class="flex rounded-2xl bg-neutral-100 p-1">
							<button
								onclick={() => (viewMode = 'list')}
								class="rounded-xl px-4 py-1.5 text-sm font-semibold transition {viewMode === 'list'
									? 'bg-white text-neutral-950 shadow-sm'
									: 'text-neutral-500 hover:text-neutral-700'}"
							>
								Список
							</button>
							<button
								onclick={() => (viewMode = 'calendar')}
								class="rounded-xl px-4 py-1.5 text-sm font-semibold transition {viewMode === 'calendar'
									? 'bg-white text-neutral-950 shadow-sm'
									: 'text-neutral-500 hover:text-neutral-700'}"
							>
								Календарь
							</button>
						</div>
					</div>
				</FadeIn>

				{#if viewMode === 'list'}
					<!-- Filters (Only for List View) -->
					<FadeIn>
						<div
							class="flex flex-wrap items-end gap-4 rounded-3xl border border-neutral-100 bg-neutral-50 p-6"
						>
							<div class="flex flex-col gap-1.5">
								<label for="filter-type" class="ml-1 text-xs font-semibold text-neutral-500"
									>Тип операции</label
								>
								<select
									id="filter-type"
									bind:value={filterType}
									class="w-full rounded-2xl border-neutral-200 bg-white pl-4 pr-8 py-2 text-sm transition focus:border-neutral-950 focus:ring-neutral-950/5 sm:w-48"
								>
									<option value="all">Все операции</option>
									<option value="deposit">Только пополнения</option>
									<option value="withdraw">Только списания</option>
								</select>
							</div>
							<div class="flex flex-col gap-1.5">
								<label for="date-from" class="ml-1 text-xs font-semibold text-neutral-500"
									>От</label
								>
								<input
									type="date"
									id="date-from"
									bind:value={dateFrom}
									class="w-full rounded-2xl border-neutral-200 bg-white pl-4 pr-3 py-2 text-sm transition focus:border-neutral-950 focus:ring-neutral-950/5 sm:w-40"
								/>
							</div>
							<div class="flex flex-col gap-1.5">
								<label for="date-to" class="ml-1 text-xs font-semibold text-neutral-500">До</label>
								<input
									type="date"
									id="date-to"
									bind:value={dateTo}
									class="w-full rounded-2xl border-neutral-200 bg-white pl-4 pr-3 py-2 text-sm transition focus:border-neutral-950 focus:ring-neutral-950/5 sm:w-40"
								/>
							</div>
							{#if filterType !== 'all' || dateFrom || dateTo}
								<button
									onclick={() => {
										filterType = 'all';
										dateFrom = '';
										dateTo = '';
									}}
									class="pb-3 text-xs font-semibold text-neutral-400 transition hover:text-neutral-950"
								>
									Сбросить
								</button>
							{/if}
						</div>
					</FadeIn>

					{#if groupedTransactions.length === 0}
						<FadeIn>
							<div
								class="rounded-3xl border border-neutral-100 bg-neutral-50 p-12 text-center"
							>
								<p class="text-sm text-neutral-500">
									{filterType !== 'all' || dateFrom || dateTo
										? 'Операций с выбранными фильтрами не найдено.'
										: 'У вас пока нет транзакций.'}
								</p>
							</div>
						</FadeIn>
					{:else}
						<div class="flex flex-col gap-10">
							{#each groupedTransactions as group (group.date)}
								<FadeIn>
									<div class="flex flex-col gap-4">
										<h3
											class="text-sm font-bold tracking-wider text-neutral-400 uppercase"
										>
											{group.date}
										</h3>
										<div
											class="overflow-hidden rounded-3xl border border-neutral-100 bg-white shadow-sm ring-1 ring-neutral-950/5"
										>
											<ul class="divide-y divide-neutral-100">
												{#each group.items as tx (tx.id)}
													<li class="flex items-center justify-between gap-4 p-5">
														<div class="min-w-0 flex-1">
															<p class="font-medium text-neutral-950">
																{#if tx.licenseId && tx.description.includes('(')}
																	{@const parts = tx.description.match(
																		/(.*)\((.*)\)(.*)/
																	)}
																	{#if parts}
																		{parts[1]}(<a
																			href="/lk/sites/{tx.licenseId}"
																			class="text-neutral-600 transition-colors hover:text-neutral-950 underline decoration-neutral-200 hover:decoration-neutral-400"
																			>{parts[2]}</a
																		>){parts[3]}
																	{:else}
																		{tx.description}
																	{/if}
																{:else}
																	{tx.description}
																{/if}
															</p>
															<div class="mt-1 flex items-center gap-2">
																<span
																	class="flex items-center gap-1 text-xs text-neutral-500"
																>
																	<svg
																		xmlns="http://www.w3.org/2000/svg"
																		fill="none"
																		viewBox="0 0 24 24"
																		stroke-width="2"
																		stroke="currentColor"
																		class="h-3 w-3 text-neutral-400"
																	>
																		<path
																			stroke-linecap="round"
																			stroke-linejoin="round"
																			d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
																		/>
																	</svg>
																	{new Date(tx.createdAt).toLocaleTimeString(
																		'ru-RU',
																		{
																			hour: '2-digit',
																			minute: '2-digit'
																		}
																	)}
																</span>
															</div>
														</div>
														<div class="shrink-0 text-right">
															<p
																class="font-display font-semibold {tx.type ===
																'withdraw'
																	? 'text-blue-600'
																	: 'text-green-600'}"
															>
																{tx.type === 'withdraw' ? '-' : '+'}{parseFloat(
																	tx.amount
																).toLocaleString('ru-RU')} ₽
															</p>
															<p
																class="text-[10px] tracking-tighter text-neutral-400 uppercase"
															>
																{tx.type === 'withdraw'
																	? 'Списание'
																	: 'Пополнение'}
															</p>
														</div>
													</li>
												{/each}
											</ul>
										</div>
									</div>
								</FadeIn>
							{/each}
						</div>

						{#if hasMorePages}
							<FadeIn>
								<div class="mt-8 flex justify-center">
									<Button onclick={loadMore} disabled={isLoadingMore} class="min-w-[160px]">
										{isLoadingMore ? 'Загрузка...' : 'Показать еще'}
									</Button>
								</div>
							</FadeIn>
						{/if}
					{/if}
				{:else}
					<!-- Calendar Mode -->
					<FadeIn>
						<div class="flex items-center justify-between rounded-3xl bg-neutral-50 p-6">
							<button
								onclick={() => changeMonth(-1)}
								aria-label="Предыдущий месяц"
								class="flex h-10 w-10 items-center justify-center rounded-2xl border border-neutral-200 bg-white text-neutral-600 transition hover:bg-neutral-50"
							>
								<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M15 19l-7-7 7-7"
									/>
								</svg>
							</button>
							<h3 class="font-display text-lg font-bold text-neutral-950">
								{monthName}
							</h3>
							<button
								onclick={() => changeMonth(1)}
								aria-label="Следующий месяц"
								class="flex h-10 w-10 items-center justify-center rounded-2xl border border-neutral-200 bg-white text-neutral-600 transition hover:bg-neutral-50"
							>
								<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 5l7 7-7 7"
									/>
								</svg>
							</button>
						</div>
					</FadeIn>

					<FadeInStagger>
						<div class="grid grid-cols-7 gap-px overflow-hidden rounded-3xl bg-neutral-200 border border-neutral-200 shadow-sm mt-8">
							{#each ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'] as dayName (dayName)}
								<div class="bg-neutral-50 py-3 text-center text-xs font-bold text-neutral-500 uppercase">
									{dayName}
								</div>
							{/each}
							{#each calendarDays as day, i (day.day ? 'day-' + day.day : 'pad-' + i)}
								{#if day.day}
									<button 
										onclick={() => selectedDay = selectedDay === day.day ? null : day.day}
										class="group relative flex min-h-[100px] flex-col bg-white p-3 transition hover:bg-neutral-50 text-left {selectedDay === day.day ? 'ring-2 ring-inset ring-neutral-950 z-10' : ''}"
									>
										<span class="text-xs font-bold {day.transactions.length > 0 ? 'text-neutral-950' : 'text-neutral-400'}">
											{day.day}
										</span>
										<div class="mt-auto flex flex-col gap-1">
											{#if day.deposit > 0}
												<div class="text-[10px] font-bold text-green-600">
													+{day.deposit.toLocaleString('ru-RU')}
												</div>
											{/if}
											{#if day.withdraw > 0}
												<div class="text-[10px] font-bold text-blue-600">
													-{day.withdraw.toLocaleString('ru-RU')}
												</div>
											{/if}
										</div>
										{#if day.transactions.length > 0}
											<div class="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-neutral-300 group-hover:bg-neutral-950"></div>
										{/if}
									</button>
								{:else}
									<div class="bg-neutral-50/50"></div>
								{/if}
							{/each}
						</div>

						{#if selectedDay}
							{@const dayInfo = calendarDays.find(d => d.day === selectedDay)}
							{#if dayInfo && dayInfo.transactions.length > 0}
								<FadeIn>
									<div class="mt-8 flex flex-col gap-4">
										<div class="flex items-center justify-between">
											<h3 class="font-display text-xl font-bold text-neutral-950">
												Операции за {selectedDay} {monthName}
											</h3>
											<button onclick={() => selectedDay = null} class="text-xs font-semibold text-neutral-500 hover:text-neutral-950">Закрыть</button>
										</div>
										<div class="overflow-hidden rounded-3xl border border-neutral-100 bg-white shadow-sm ring-1 ring-neutral-950/5">
											<ul class="divide-y divide-neutral-100">
												{#each dayInfo.transactions as tx (tx.id)}
													<li class="flex items-center justify-between gap-4 p-5">
														<div class="min-w-0 flex-1">
															<p class="font-medium text-neutral-950">
																{#if tx.licenseId && tx.description.includes('(')}
																	{@const parts = tx.description.match(/(.*)\((.*)\)(.*)/)}
																	{#if parts}
																		{parts[1]}(<a href="/lk/sites/{tx.licenseId}" class="text-neutral-600 transition-colors hover:text-neutral-950 underline decoration-neutral-200 hover:decoration-neutral-400">{parts[2]}</a>){parts[3]}
																	{:else}
																		{tx.description}
																	{/if}
																{:else}
																	{tx.description}
																{/if}
															</p>
															<p class="mt-1 text-xs text-neutral-500">
																{new Date(tx.createdAt).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
															</p>
														</div>
														<div class="text-right">
															<p class="font-display font-semibold {tx.type === 'withdraw' ? 'text-blue-600' : 'text-green-600'}">
																{tx.type === 'withdraw' ? '-' : '+'}{parseFloat(tx.amount).toLocaleString('ru-RU')} ₽
															</p>
														</div>
													</li>
												{/each}
											</ul>
										</div>
									</div>
								</FadeIn>
							{:else if dayInfo}
								<FadeIn>
									<div class="mt-8 rounded-3xl border border-neutral-100 bg-neutral-50 p-8 text-center">
										<p class="text-sm text-neutral-500">За {selectedDay} {monthName} операций не найдено.</p>
									</div>
								</FadeIn>
							{/if}
						{/if}
					</FadeInStagger>
				{/if}
			</div>
				<!-- Invoices Section -->
				<FadeIn>
					<div class="flex flex-col gap-6">
						<div class="flex items-center justify-between">
							<h2 class="font-display text-2xl font-semibold text-neutral-950">Счета на оплату</h2>
							<button
								onclick={() => openTopUp('bank')}
								class="flex items-center gap-1.5 text-sm font-semibold text-neutral-500 transition hover:text-neutral-950"
							>
								<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
								</svg>
								Выставить счёт
							</button>
						</div>

						{#if isLoadingInvoices}
							<div class="flex items-center gap-2 py-4 text-sm text-neutral-400">
								<svg class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
									<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
									<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
								</svg>
								Загрузка счетов...
							</div>
						{:else if invoices.length === 0}
							<div class="rounded-3xl border border-neutral-100 bg-neutral-50 p-10 text-center">
								<div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-100">
									<svg class="h-6 w-6 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
									</svg>
								</div>
								<p class="text-sm text-neutral-500">Счета ещё не выставлялись</p>
								<button
									onclick={() => openTopUp('bank')}
									class="mt-1 text-xs font-semibold text-neutral-500 underline decoration-neutral-300 transition hover:text-neutral-950"
								>
									Выставить счёт на оплату
								</button>
							</div>
						{:else}
							<div class="overflow-hidden rounded-3xl border border-neutral-100 bg-white shadow-sm ring-1 ring-neutral-950/5">
								<!-- Заголовок таблицы -->
								<div class="grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 border-b border-neutral-100 bg-neutral-50 px-5 py-3">
									<span class="text-xs font-bold uppercase tracking-wider text-neutral-400">Номер / Плательщик</span>
									<span class="text-xs font-bold uppercase tracking-wider text-neutral-400">Дата</span>
									<span class="text-xs font-bold uppercase tracking-wider text-neutral-400">Сумма</span>
									<span class="text-xs font-bold uppercase tracking-wider text-neutral-400">Статус</span>
								</div>
								<ul class="divide-y divide-neutral-100">
									{#each invoices as inv (inv.id)}
										<li class="grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 p-5">
											<!-- Номер и плательщик -->
											<div class="min-w-0">
												<p class="truncate font-medium text-neutral-950">№ {inv.number}</p>
												<p class="mt-0.5 truncate text-xs text-neutral-500">
													{inv.companyName}{inv.inn ? ', ИНН ' + inv.inn : ''}
												</p>
											</div>
											<!-- Дата -->
											<span class="whitespace-nowrap text-sm text-neutral-500">
												{new Date(inv.createdAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' })}
											</span>
											<!-- Сумма -->
											<span class="whitespace-nowrap font-semibold text-neutral-950">
												{parseFloat(inv.amount).toLocaleString('ru-RU')} ₽
											</span>
											<!-- Статус + кнопка -->
											<div class="flex items-center gap-3">
												<span class="rounded-full px-2.5 py-0.5 text-xs font-semibold
													{inv.status === 'paid'
														? 'bg-green-50 text-green-700'
														: inv.status === 'cancelled'
															? 'bg-red-50 text-red-600'
															: 'bg-amber-50 text-amber-700'}"
												>
													{inv.status === 'paid' ? 'Оплачен' : inv.status === 'cancelled' ? 'Отменён' : 'Ожидает оплаты'}
												</span>
												<button
													onclick={() => downloadInvoice(inv.id)}
													disabled={downloadingId === inv.id}
													class="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-neutral-200 text-neutral-500 transition hover:border-neutral-950 hover:text-neutral-950 disabled:opacity-40"
													title="Открыть счёт"
												>
													{#if downloadingId === inv.id}
														<svg class="h-3.5 w-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
															<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
															<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
														</svg>
													{:else}
														<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
															<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
														</svg>
													{/if}
												</button>
											</div>
										</li>
									{/each}
								</ul>
							</div>

							{#if hasMoreInvoices}
								<div class="flex justify-center">
									<button
										onclick={loadMoreInvoices}
										disabled={isLoadingMoreInvoices}
										class="rounded-2xl border border-neutral-200 px-6 py-2.5 text-sm font-semibold text-neutral-600 transition hover:border-neutral-950 hover:text-neutral-950 disabled:opacity-40"
									>
										{isLoadingMoreInvoices ? 'Загрузка...' : 'Показать ещё счета'}
									</button>
								</div>
							{/if}
						{/if}
					</div>
				</FadeIn>
			{/if}
		</FadeInStagger>
	</Container>

<TopUpModal
	open={isModalOpen}
	initialTab={modalTab}
	onClose={() => (isModalOpen = false)}
	onSuccess={handleTopUpSuccess}
	onInvoiceCreated={handleInvoiceCreated}
/>
