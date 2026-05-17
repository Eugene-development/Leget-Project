<script>
	import PageIntro from '$lib/components/PageIntro.svelte';
	import Container from '$lib/components/Container.svelte';
	import FadeIn from '$lib/components/FadeIn.svelte';
	import FadeInStagger from '$lib/components/FadeInStagger.svelte';
	import Button from '$lib/components/Button.svelte';
	import TopUpModal from '$lib/components/TopUpModal.svelte';
	import { browser } from '$app/environment';
	import { graphqlRequest } from '$lib/utils/graphql-client.js';

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

	let wallet = $state(null);
	let transactions = $state([]);
	let isLoading = $state(true);
	let isLoadingMore = $state(false);
	let error = $state(null);
	let isModalOpen = $state(false);
	let filterType = $state('all');
	let dateFrom = $state('');
	let dateTo = $state('');
	let viewMode = $state('list'); // 'list' or 'calendar'
	let calendarMonth = $state(new Date().getMonth());
	let calendarYear = $state(new Date().getFullYear());
	let selectedDay = $state(null);
	let currentPage = $state(1);
	let hasMorePages = $state(false);

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
						onclick={fetchWallet}
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
							<Button onclick={() => (isModalOpen = true)}>Пополнить баланс</Button>
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
							{#each groupedTransactions as group}
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
							{#each ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'] as dayName}
								<div class="bg-neutral-50 py-3 text-center text-xs font-bold text-neutral-500 uppercase">
									{dayName}
								</div>
							{/each}
							{#each calendarDays as day}
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
		{/if}
	</FadeInStagger>
</Container>

<TopUpModal
	open={isModalOpen}
	onClose={() => (isModalOpen = false)}
	onSuccess={handleTopUpSuccess}
/>
