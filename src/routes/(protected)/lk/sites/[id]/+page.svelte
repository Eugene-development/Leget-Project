<script>
	import ContentLoading from '$lib/components/ContentLoading.svelte';
	import CollapsibleSection from '$lib/components/CollapsibleSection.svelte';
	import PageIntro from '$lib/components/PageIntro.svelte';
	import Container from '$lib/components/Container.svelte';
	import FadeIn from '$lib/components/FadeIn.svelte';
	import FadeInStagger from '$lib/components/FadeInStagger.svelte';
	import Button from '$lib/components/Button.svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { notifyError } from '$lib/utils/notify-error.js';
	import { graphqlRequest } from '$lib/utils/graphql-client.js';
	import { validateDomain } from '$lib/utils/domain-validator.js';

	const UPDATE_LICENSE_DOMAIN_MUTATION = `
		mutation UpdateLicense($id: ID!, $domain: String!) {
			updateLicense(id: $id, domain: $domain) {
				id
				domain
			}
		}
	`;

	const GET_LICENSE_QUERY = `
		query GetLicense($id: ID!) {
			license(id: $id) {
				id
				name
				domain
				templateId
				isActive
				status
				dailyPrice
				headerData
			}
		}
	`;

	const UPDATE_LICENSE_MUTATION = `
		mutation UpdateLicense(
			$id: ID!
			$name: String
			$headerDataPatch: JSON
		) {
			updateLicense(
				id: $id
				name: $name
				headerDataPatch: $headerDataPatch
			) {
				id
				name
				headerData
			}
		}
	`;

	const GET_CATALOG_QUERY = `
		query GetCatalog {
			rubrics {
				id
				value
				slug
				categories {
					id
					value
					slug
					is_enabled
				}
			}
		}
	`;

	const TOGGLE_CATEGORY_MUTATION = `
		mutation ToggleCategory($id: ID!, $isEnabled: Boolean!) {
			toggleCategory(id: $id, isEnabled: $isEnabled) {
				id
				is_enabled
			}
		}
	`;

	/** Map templateId to human-readable name */
	const TEMPLATE_NAMES = { 1: 'Promo-1', 2: 'Promo-2' };

	let licenseId = $derived($page.params.id);

	let isLoading = $state(true);
	let error = $state(null);
	let license = $state(null);

	// ── Basic fields ──────────────────────────────────────────────
	let formDomain = $state('');
	let isUpdatingDomain = $state(false);
	let domainError = $state('');
	let domainSuccess = $state('');
	let formName = $state('');

	// ── Contact / site info (stored in header_data & footer_data) ─
	let formCity = $state('');
	let formYandexMetrica = $state('');
	let formGoogleAnalytics = $state('');

	// ── Form state ────────────────────────────────────────────────
	let isSaving = $state(false);
	let successMessage = $state('');
	let fieldErrors = $state({});
	let isBasicOpen = $state(false);

	// ── Catalog categories management ─────────────────────────────
	let rubrics = $state([]);
	let isCatalogLoading = $state(true);
	let catalogError = $state(null);
	let togglingCategoryIds = $state(new Set());

	$effect(() => {
		if (browser && licenseId) {
			fetchLicense();
			fetchCatalog();
		}
	});

	async function fetchCatalog() {
		isCatalogLoading = true;
		catalogError = null;
		try {
			const data = await graphqlRequest(GET_CATALOG_QUERY);
			rubrics = data.rubrics ?? [];
		} catch (err) {
			console.error('Failed to fetch catalog:', err);
			catalogError = notifyError(err, 'Не удалось загрузить каталог');
		} finally {
			isCatalogLoading = false;
		}
	}

	async function handleToggleCategory(categoryId, currentEnabled) {
		if (togglingCategoryIds.has(categoryId)) return;

		const newEnabled = !currentEnabled;

		// Optimistic update
		rubrics = rubrics.map((rubric) => ({
			...rubric,
			categories: rubric.categories.map((cat) =>
				cat.id === categoryId ? { ...cat, is_enabled: newEnabled } : cat
			)
		}));

		// Set toggling state
		const newToggling = new Set(togglingCategoryIds);
		newToggling.add(categoryId);
		togglingCategoryIds = newToggling;

		try {
			await graphqlRequest(TOGGLE_CATEGORY_MUTATION, {
				id: categoryId,
				isEnabled: newEnabled
			});
		} catch (err) {
			console.error('Failed to toggle category:', err);
			// Revert state if failed
			rubrics = rubrics.map((rubric) => ({
				...rubric,
				categories: rubric.categories.map((cat) =>
					cat.id === categoryId ? { ...cat, is_enabled: currentEnabled } : cat
				)
			}));
			notifyError(err, 'Не удалось изменить статус категории.');
		} finally {
			const finalToggling = new Set(togglingCategoryIds);
			finalToggling.delete(categoryId);
			togglingCategoryIds = finalToggling;
		}
	}

	async function fetchLicense() {
		isLoading = true;
		error = null;

		try {
			const data = await graphqlRequest(GET_LICENSE_QUERY, { id: licenseId });
			license = data.license;

			formDomain = license.domain && !license.domain.includes('pending-') ? license.domain : '';
			formName = license.name ?? '';

			// Hydrate contact fields from header_data
			const h = license.headerData ?? {};
			formCity = h.city ?? '';
			formYandexMetrica = h.yandexMetrica ?? '';
			formGoogleAnalytics = h.googleAnalytics ?? '';
		} catch (err) {
			console.error('Failed to fetch license:', err);
			error = notifyError(err, 'Не удалось загрузить настройки сайта');
		} finally {
			isLoading = false;
		}
	}

	async function handleUpdateDomain(event) {
		event.preventDefault();
		if (isUpdatingDomain) return;
		domainError = '';
		domainSuccess = '';
		const validation = validateDomain(formDomain);
		if (!validation.valid) {
			domainError = validation.error;
			return;
		}
		formDomain = validation.normalized;
		isUpdatingDomain = true;
		try {
			const data = await graphqlRequest(UPDATE_LICENSE_DOMAIN_MUTATION, {
				id: licenseId,
				domain: validation.normalized
			});
			if (data.updateLicense?.id !== licenseId || !data.updateLicense.domain) {
				throw new Error('Сервер не подтвердил сохранение домена. Попробуйте снова.');
			}
			license = { ...license, domain: data.updateLicense.domain };
			formDomain = data.updateLicense.domain;
			domainSuccess = 'Доменное имя сохранено';
		} catch (err) {
			domainError = notifyError(err, 'Не удалось сохранить домен. Попробуйте снова.');
		} finally {
			isUpdatingDomain = false;
		}
	}

	async function handleSubmit(e) {
		e.preventDefault();
		isSaving = true;
		successMessage = '';
		fieldErrors = {};

		// Валидация названия проекта
		if (formName) {
			if (formName.length > 40) {
				isBasicOpen = true;
				fieldErrors.name = 'Название проекта не может превышать 40 символов';
				isSaving = false;
				return;
			}
			const hasLongWord = formName.split(/\s+/).some((word) => word.length > 20);
			if (hasLongWord) {
				isBasicOpen = true;
				fieldErrors.name = 'Одно слово в названии не может превышать 20 символов';
				isSaving = false;
				return;
			}
		}

		const headerDataPatch = {
			city: formCity || null,
			yandexMetrika: formYandexMetrika || null,
			googleAnalytics: formGoogleAnalytics || null
		};

		try {
			const data = await graphqlRequest(UPDATE_LICENSE_MUTATION, {
				id: licenseId,
				name: formName,
				headerDataPatch
			});

			license = { ...license, ...data.updateLicense };
			successMessage = 'Настройки сайта успешно сохранены';
			setTimeout(() => {
				successMessage = '';
			}, 4000);
		} catch (err) {
			console.error('Failed to update license:', err);
			if (err.graphqlErrors?.length) {
				const errors = {};
				for (const gqlErr of err.graphqlErrors) {
					const field = gqlErr.extensions?.field;
					if (field) errors[field] = gqlErr.message;
				}
				fieldErrors = Object.keys(errors).length ? errors : { _general: notifyError(err, 'Не удалось сохранить настройки.') };
				if (errors.name) isBasicOpen = true;
			} else {
				fieldErrors = { _general: notifyError(err, 'Не удалось сохранить настройки') };
			}
		} finally {
			isSaving = false;
		}
	}
	const LICENSE_ACTIONS = {
		freeze: {
			title: 'Заморозка лицензии', confirm: 'Заморозить лицензию',
			field: 'cancelLicense', status: 'cancelled',
			query: `mutation FreezeLicense($id: ID!) { cancelLicense(id: $id) { id isActive status } }`
		},
		unfreeze: {
			title: 'Разморозка лицензии', confirm: 'Разморозить лицензию',
			field: 'restoreLicense', status: 'active',
			query: `mutation UnfreezeLicense($id: ID!) { restoreLicense(id: $id) { id isActive status } }`
		},
		delete: {
			title: 'Удаление лицензии', confirm: 'Удалить лицензию',
			field: 'deleteLicense',
			query: `mutation DeleteLicense($id: ID!) { deleteLicense(id: $id) { id deleted } }`
		}
	};
	let licenseAction = $state(null);
	let isChangingLicense = $state(false);
	let licenseActionError = $state('');

	function selectLicenseAction(action) {
		licenseActionError = '';
		licenseAction = action;
	}

	function openLicenseDialog(node) {
		node.showModal();
		node.querySelector('[data-cancel-license]')?.focus();
	}

	function closeLicenseDialog() {
		if (isChangingLicense) return;
		licenseAction = null;
		licenseActionError = '';
	}

	async function handleLicenseAction() {
		if (isChangingLicense || !licenseAction) return;
		const action = licenseAction;
		const operation = LICENSE_ACTIONS[action];
		isChangingLicense = true;
		licenseActionError = '';
		try {
			const data = await graphqlRequest(operation.query, { id: licenseId });
			const result = data[operation.field];
			const confirmed = action === 'delete'
				? result?.deleted === true
				: result?.status === operation.status && result?.isActive === (action === 'unfreeze');
			if (result?.id !== licenseId || !confirmed) {
				throw new Error('Сервер не подтвердил действие. Попробуйте снова.');
			}
			if (action === 'delete') {
				await goto('/lk/sites');
			} else {
				license = { ...license, ...result };
				successMessage = action === 'freeze'
					? 'Лицензия заморожена. Сайт отключён, будущие списания остановлены.'
					: 'Лицензия разморожена. Сайт включён, списания возобновлены по расписанию.';
			}
			licenseAction = null;
		} catch (err) {
			licenseActionError = notifyError(err, 'Не удалось выполнить действие. Попробуйте снова.');
		} finally {
			isChangingLicense = false;
		}
	}

</script>

<svelte:head>
	<title>Настройки сайта | LEGET</title>
	<meta name="description" content="Управление настройками сайта на платформе LEGET" />
</svelte:head>

<PageIntro
	title="Настройки сайта"
	breadcrumbs={[
		{ label: 'Личный кабинет', href: '/lk' },
		{ label: 'Мои сайты', href: '/lk/sites' },
		{ label: 'Настройки сайта' }
	]}
></PageIntro>

<Container class="mt-12 mb-24 sm:mt-20 lg:mt-24">
	<FadeInStagger class="flex flex-col gap-y-12">
		{#if isLoading}
			<ContentLoading />
		{:else if error}
			<FadeIn>
				<div class="rounded-3xl border border-red-100 bg-red-50 p-8 text-center">
					<p class="text-sm text-red-600">{error}</p>
					<button
						onclick={fetchLicense}
						class="mt-4 text-sm font-semibold text-red-700 underline hover:text-red-900"
					>
						Попробовать снова
					</button>
				</div>
			</FadeIn>
		{:else if license}
			<FadeIn>
				<div class="flex max-w-3xl flex-col gap-12">
					<!-- ── Site header ── -->
					<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
						<div class="min-w-0 flex-1">
							<h2 class="font-display text-3xl font-semibold break-words text-neutral-950">
								{license.name || 'Новый сайт'}
							</h2>
							{#if license.templateId}
								<p class="mt-1 text-xs text-neutral-400">
									Шаблон: <span class="font-medium text-neutral-600"
										>{TEMPLATE_NAMES[license.templateId] ?? `#${license.templateId}`}</span
									>
								</p>
							{/if}
							{#if license.domain && !license.domain.includes('pending-')}
								<p class="mt-1 text-xs text-neutral-400">
									Домен: <span class="font-medium text-neutral-600">{license.domain}</span>
								</p>
							{/if}
						</div>
						<div class="flex shrink-0 flex-col items-start gap-3 sm:items-end">
							{#if license.isActive && license.status === 'active'}
								<span
									class="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700"
								>
									<span class="h-1.5 w-1.5 rounded-full bg-green-500"></span>Активен
								</span>
							{:else if license.status === 'cancelled'}
								<span
									class="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600"
								>
									<span class="h-1.5 w-1.5 rounded-full bg-neutral-400"></span>Заморожена
								</span>
							{:else}
								<span
									class="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700"
								>
									<span class="h-1.5 w-1.5 rounded-full bg-red-500"></span>Приостановлен
								</span>
							{/if}
							<Button type="submit" form="site-settings-form" disabled={isSaving}
								data-goal-ignore="Настройки сайта: сохранение параметров"
								class="justify-center focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 focus:outline-none disabled:opacity-60">
								{isSaving ? 'Сохранение...' : 'Сохранить настройки'}
							</Button>
						</div>
					</div>

					<form onsubmit={handleUpdateDomain}
						class="space-y-4 rounded-3xl border border-neutral-100 bg-neutral-50/50 p-6 shadow-sm ring-1 ring-neutral-950/5 sm:p-8">
						<label for="site-domain" class="block font-display text-lg font-semibold text-neutral-950">Назначить домен</label>
						<div class="flex flex-col gap-3 sm:flex-row sm:items-start">
							<input id="site-domain" type="text" placeholder="example.com"
								bind:value={formDomain} disabled={isUpdatingDomain}
								autocapitalize="none" spellcheck={false}
								aria-invalid={!!domainError} aria-describedby={domainError ? 'site-domain-error' : undefined}
								class="block min-w-0 flex-1 rounded-2xl border border-neutral-200 bg-transparent px-4 py-3 text-base text-neutral-950 focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/60 focus:outline-none disabled:opacity-60" />
							<Button type="submit" data-goal-ignore="Настройки сайта: назначение домена"
								disabled={isUpdatingDomain || !formDomain || formDomain === license.domain}
								class="justify-center px-5 py-3 disabled:opacity-60">
								{isUpdatingDomain ? 'Сохранение...' : 'Сохранить домен'}
							</Button>
						</div>
						{#if domainError}<p id="site-domain-error" role="alert" class="text-sm text-red-700">{domainError}</p>{/if}
						{#if domainSuccess}<p role="status" class="text-sm text-green-700">{domainSuccess}</p>{/if}
					</form>

					<!-- ── Settings form ── -->
					<form id="site-settings-form" onsubmit={handleSubmit} class="space-y-10">
						{#if successMessage}
							<div
								class="rounded-2xl border border-green-200 bg-green-50 px-6 py-4 text-sm text-green-700"
							>
								{successMessage}
							</div>
						{/if}
						{#if fieldErrors._general}
							<div
								class="rounded-2xl border border-red-200 bg-red-50 px-6 py-4 text-sm text-red-600"
							>
								{fieldErrors._general}
							</div>
						{/if}

						<!-- ── Section: Основное ── -->
						<CollapsibleSection id="site-settings-basic" title="Основное" bind:open={isBasicOpen}>
							<div class="group relative">
								<label for="site-name" class="block text-sm font-semibold text-neutral-950"
									>Название проекта</label
								>
								<input
									type="text"
									id="site-name"
									bind:value={formName}
									maxlength="40"
									placeholder="Введите название проекта"
									class="mt-2 block w-full rounded-2xl border border-neutral-200 bg-transparent px-4 py-3 text-base text-neutral-950 transition placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/60 focus:outline-none"
								/>
								{#if fieldErrors.name}
									<p class="mt-2 text-sm text-red-600">{fieldErrors.name}</p>
								{/if}
							</div>

							<div class="group relative">
								<div class="flex items-center gap-2">
									<label for="site-city" class="block text-sm font-semibold text-neutral-950"
										>Город</label
									>
									<div class="group/tooltip relative">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="size-4 cursor-help text-neutral-400 hover:text-neutral-600"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
											/>
										</svg>
										<div
											class="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 hidden w-52 -translate-x-1/2 rounded-xl bg-neutral-900 p-3 text-center text-[11px] leading-snug text-white shadow-2xl group-hover/tooltip:block"
										>
											Определяет региональность сайта
											<div
												class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-neutral-900"
											></div>
										</div>
									</div>
								</div>
								<input
									type="text"
									id="site-city"
									bind:value={formCity}
									placeholder="Напр. Москва"
									class="mt-2 block w-full rounded-2xl border border-neutral-200 bg-transparent px-4 py-3 text-base text-neutral-950 transition placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/60 focus:outline-none"
								/>
							</div>
						</CollapsibleSection>

						<!-- ── Section: Аналитика ── -->
						<CollapsibleSection id="site-settings-analytics" title="Аналитика">
							<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
								<div class="group relative">
									<label for="yandex-metrica" class="block text-sm font-semibold text-neutral-950"
										>Яндекс Метрика</label
									>
									<input
										type="text"
										id="yandex-metrica"
										bind:value={formYandexMetrica}
										placeholder="ID счётчика (напр. 12345678)"
										class="mt-2 block w-full rounded-2xl border border-neutral-200 bg-transparent px-4 py-3 text-base text-neutral-950 transition placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/60 focus:outline-none"
									/>
								</div>
								<div class="group relative">
									<label for="google-analytics" class="block text-sm font-semibold text-neutral-950"
										>Google Analytics</label
									>
									<input
										type="text"
										id="google-analytics"
										bind:value={formGoogleAnalytics}
										placeholder="ID отслеживания (напр. G-XXXXXXXXXX)"
										class="mt-2 block w-full rounded-2xl border border-neutral-200 bg-transparent px-4 py-3 text-base text-neutral-950 transition placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/60 focus:outline-none"
									/>
								</div>
							</div>
						</CollapsibleSection>

						<!-- ── Section: Каталог (Рубрики и категории) ── -->
						<CollapsibleSection id="site-settings-catalog" title="Рубрики и категории в каталоге">
							<p class="text-sm text-neutral-500">
								Включайте и отключайте разделы каталога. Отключенные категории не будут
								отображаться на публичном сайте, но все связанные данные сохранятся.
							</p>

							{#if isCatalogLoading}
								<div class="flex items-center gap-3 py-4">
									<svg
										class="h-5 w-5 animate-spin text-neutral-400"
										fill="none"
										viewBox="0 0 24 24"
									>
										<circle
											class="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											stroke-width="4"
										></circle>
										<path
											class="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
										></path>
									</svg>
									<span class="text-sm text-neutral-500">Загрузка категорий каталога...</span>
								</div>
							{:else if catalogError}
								<p class="text-sm text-red-600">{catalogError}</p>
							{:else if rubrics.length === 0}
								<p class="text-sm text-neutral-500">Разделы каталога не найдены.</p>
							{:else}
								<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
									{#each rubrics as rubric (rubric.id)}
										<div
											class="rounded-3xl border border-neutral-100 bg-white p-6 shadow-sm ring-1 ring-neutral-950/5"
										>
											<h4
												class="font-display mb-4 flex items-center justify-between text-base font-semibold text-neutral-900"
											>
												<span>{rubric.value}</span>
											</h4>

											{#if !rubric.categories || rubric.categories.length === 0}
												<p class="text-xs text-neutral-400">В этой рубрике нет категорий.</p>
											{:else}
												<div class="divide-y divide-neutral-100/80">
													{#each rubric.categories as category (category.id)}
														<div
															class="flex items-center justify-between py-3 first:pt-0 last:pb-0"
														>
															<div class="pr-4">
																<p class="text-sm font-semibold text-neutral-900">
																	{category.value}
																</p>
															</div>

															<!-- Switch Toggle Component -->
															<button
																type="button"
																class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 focus:outline-none {category.is_enabled
																	? 'bg-neutral-900'
																	: 'bg-neutral-200'}"
																role="switch"
																aria-checked={category.is_enabled}
																disabled={togglingCategoryIds.has(category.id)}
																onclick={() =>
																	handleToggleCategory(category.id, category.is_enabled)}
															>
																<span class="sr-only">Toggle category enabled state</span>
																<span
																	class="pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out {category.is_enabled
																		? 'translate-x-5'
																		: 'translate-x-0'}"
																>
																	{#if togglingCategoryIds.has(category.id)}
																		<span class="absolute inset-0 flex items-center justify-center">
																			<svg
																				class="h-3 w-3 animate-spin text-neutral-400"
																				fill="none"
																				viewBox="0 0 24 24"
																			>
																				<circle
																					class="opacity-25"
																					cx="12"
																					cy="12"
																					r="10"
																					stroke="currentColor"
																					stroke-width="4"
																				></circle>
																				<path
																					class="opacity-75"
																					fill="currentColor"
																					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
																				></path>
																			</svg>
																		</span>
																	{/if}
																</span>
															</button>
														</div>
													{/each}
												</div>
											{/if}
										</div>
									{/each}
								</div>
							{/if}
						</CollapsibleSection>

					</form>

					<section class="space-y-6 rounded-3xl border border-red-100 bg-red-50/50 p-6" aria-labelledby="danger-zone-title">
						<h3 id="danger-zone-title" class="font-display text-lg font-semibold text-red-900">Опасная зона</h3>
						<div>
							<p class="mb-3 text-sm text-neutral-700">
								{license.status === 'cancelled'
									? 'Лицензия заморожена. Разморозка включит сайт и возобновит ежедневные списания.'
									: 'Заморозка отключит сайт и остановит будущие списания. Лицензия останется в списке, её можно разморозить самостоятельно.'}
							</p>
							<button type="button" data-goal-ignore="Управление лицензией: заморозка или разморозка"
								disabled={license.status !== 'cancelled' && (!license.isActive || license.status !== 'active')}
								onclick={() => selectLicenseAction(license.status === 'cancelled' ? 'unfreeze' : 'freeze')}
								class="rounded-2xl border border-neutral-300 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-950 focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 focus:outline-none disabled:opacity-60">
								{license.status === 'cancelled' ? 'Разморозка лицензии' : 'Заморозка лицензии'}
							</button>
						</div>
						<div class="border-t border-red-100 pt-6">
							<p class="mb-3 text-sm text-red-700">Удаление отключит сайт, остановит списания и уберёт лицензию из списка. Данные сохранятся; восстановление возможно только через поддержку проекта.</p>
							<button type="button" data-goal-ignore="Управление лицензией: подтверждение мягкого удаления"
								onclick={() => selectLicenseAction('delete')}
								class="rounded-2xl border border-red-300 bg-white px-4 py-2.5 text-sm font-semibold text-red-700 hover:bg-red-50 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none">
								Удаление лицензии
							</button>
						</div>
					</section>
				</div>
			</FadeIn>
		{/if}
	</FadeInStagger>
</Container>

<!-- Confirmation shared by freeze, unfreeze and soft deletion. -->
{#if licenseAction}
	<dialog use:openLicenseDialog
		oncancel={(event) => { event.preventDefault(); closeLicenseDialog(); }}
		aria-labelledby="license-dialog-title" aria-describedby="license-dialog-description" aria-busy={isChangingLicense}
		class="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-3xl border-0 bg-white p-6 sm:p-8 backdrop:bg-neutral-950/50">
		<h2 id="license-dialog-title" class="font-display text-xl font-semibold text-neutral-950">{LICENSE_ACTIONS[licenseAction].title}</h2>
		<p class="mt-3 break-words text-sm font-semibold text-neutral-950">{license?.name || 'Новый сайт'}</p>
		<p id="license-dialog-description" class="mt-3 text-sm text-neutral-700">
			{#if licenseAction === 'unfreeze'}
				Сайт снова заработает. Ежедневная оплата — {license?.dailyPrice ?? 0} ₽.
				Списания возобновятся в ближайшие 06:30 по Москве после разморозки или окончания оставшегося пробного периода.
				За период заморозки начислений не будет. Новый пробный период не предоставляется.
			{:else if licenseAction === 'freeze'}
				Сайт будет отключён, будущие списания остановятся. Уже наступившие дни аренды будут учтены.
				Лицензия останется в списке. Вы сможете разморозить её в любое время.
			{:else}
				Сайт будет отключён, списания остановятся, лицензия исчезнет из списка.
				Уже наступившие дни аренды будут учтены. Данные и история расчётов сохранятся.
				Восстановить лицензию сможет только поддержка проекта.
			{/if}
		</p>
		{#if licenseActionError}<p role="alert" class="mt-4 text-sm text-red-700">{licenseActionError}</p>{/if}
		<div class="mt-6 flex flex-col gap-3 sm:flex-row">
			<button type="button" onclick={handleLicenseAction} disabled={isChangingLicense}
				data-goal-ignore="Управление лицензией: изменение состояния подписки"
				class="flex-1 rounded-2xl bg-neutral-950 px-4 py-3 text-sm font-semibold text-white focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 focus:outline-none disabled:opacity-60">
				{isChangingLicense ? 'Выполняется...' : LICENSE_ACTIONS[licenseAction].confirm}
			</button>
			<button type="button" data-cancel-license onclick={closeLicenseDialog} disabled={isChangingLicense}
				data-goal-ignore="Управление лицензией: закрытие подтверждения"
				class="rounded-2xl border border-neutral-300 px-4 py-3 text-sm font-semibold text-neutral-700 focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 focus:outline-none disabled:opacity-60">Отмена</button>
		</div>
	</dialog>
{/if}
