<script>
	import PageIntro from '$lib/components/PageIntro.svelte';
	import Container from '$lib/components/Container.svelte';
	import FadeIn from '$lib/components/FadeIn.svelte';
	import FadeInStagger from '$lib/components/FadeInStagger.svelte';
	import Button from '$lib/components/Button.svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { graphqlRequest } from '$lib/utils/graphql-client.js';

	const GET_LICENSE_QUERY = `
		query GetLicense($id: ID!) {
			license(id: $id) {
				id
				name
				domain
				templateId
				isActive
				status
				headerData
				footerData
				faviconUrl
			}
		}
	`;

	const UPDATE_LICENSE_MUTATION = `
		mutation UpdateLicense(
			$id: ID!
			$name: String
			$headerData: JSON
			$footerData: JSON
			$faviconUrl: String
		) {
			updateLicense(
				id: $id
				name: $name
				headerData: $headerData
				footerData: $footerData
				faviconUrl: $faviconUrl
			) {
				id
				name
				headerData
				footerData
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
	let formName = $state('');
	let formFaviconUrl = $state('');

	// ── Contact / site info (stored in header_data & footer_data) ─
	let formCity = $state('');
	let formYandexMetrica = $state('');
	let formGoogleAnalytics = $state('');

	// ── Form state ────────────────────────────────────────────────
	let isSaving = $state(false);
	let successMessage = $state('');
	let fieldErrors = $state({});

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
			catalogError = err.message || 'Не удалось загрузить каталог';
		} finally {
			isCatalogLoading = false;
		}
	}

	async function handleToggleCategory(categoryId, currentEnabled) {
		if (togglingCategoryIds.has(categoryId)) return;

		const newEnabled = !currentEnabled;
		
		// Optimistic update
		rubrics = rubrics.map(rubric => ({
			...rubric,
			categories: rubric.categories.map(cat => 
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
			rubrics = rubrics.map(rubric => ({
				...rubric,
				categories: rubric.categories.map(cat => 
					cat.id === categoryId ? { ...cat, is_enabled: currentEnabled } : cat
				)
			}));
			alert('Не удалось изменить статус категории: ' + (err.message || 'неизвестная ошибка'));
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

			formName = license.name ?? '';
			formFaviconUrl = license.faviconUrl ?? '';

			// Hydrate contact fields from header_data
			const h = license.headerData ?? {};
			formCity             = h.city             ?? '';
			formYandexMetrica    = h.yandexMetrica    ?? '';
			formGoogleAnalytics  = h.googleAnalytics  ?? '';
		} catch (err) {
			console.error('Failed to fetch license:', err);
			error = err.message || 'Не удалось загрузить настройки сайта';
		} finally {
			isLoading = false;
		}
	}

	/** Build header_data / footer_data from form fields */
	function buildJsonData() {
		const existing = license?.headerData ?? {};

		const headerData = {
			...existing,
			city:             formCity             || null,
			yandexMetrica:    formYandexMetrica    || null,
			googleAnalytics:  formGoogleAnalytics  || null,
		};

		const existingFooter = license?.footerData ?? {};
		const footerData = {
			...existingFooter,
		};

		return { headerData, footerData };
	}

	async function handleSubmit(e) {
		e.preventDefault();
		isSaving = true;
		successMessage = '';
		fieldErrors = {};

		const { headerData, footerData } = buildJsonData();

		try {
			const data = await graphqlRequest(UPDATE_LICENSE_MUTATION, {
				id: licenseId,
				name: formName,
				headerData,
				footerData,
				faviconUrl: formFaviconUrl
			});

			license = { ...license, ...data.updateLicense };
			successMessage = 'Настройки сайта успешно сохранены';
			setTimeout(() => { successMessage = ''; }, 4000);
		} catch (err) {
			console.error('Failed to update license:', err);
			if (err.graphqlErrors?.length) {
				const errors = {};
				for (const gqlErr of err.graphqlErrors) {
					const field = gqlErr.extensions?.field;
					if (field) errors[field] = gqlErr.message;
				}
				fieldErrors = Object.keys(errors).length ? errors : { _general: err.message };
			} else {
				fieldErrors = { _general: err.message || 'Не удалось сохранить настройки' };
			}
		} finally {
			isSaving = false;
		}
	}
	// ── Favicon Upload ───────────────────────────────────────────
	let isUploadingFavicon = $state(false);

	async function handleFaviconUpload(e) {
		const file = e.target.files?.[0];
		if (!file) return;

		isUploadingFavicon = true;
		error = null;

		try {
			// 1. Get pre-signed URL
			const { generateUploadUrl: uploadData } = await graphqlRequest(GENERATE_UPLOAD_URL_MUTATION, {
				filename: file.name,
				mimeType: file.type,
				folder: 'favicons'
			});

			// 2. Upload to S3
			const uploadResponse = await fetch(uploadData.uploadUrl, {
				method: 'PUT',
				body: file,
				headers: { 'Content-Type': file.type }
			});

			if (!uploadResponse.ok) throw new Error('Ошибка при загрузке файла в хранилище');

			// 3. Set URL in form
			formFaviconUrl = uploadData.objectUrl;
		} catch (err) {
			console.error('Favicon upload failed:', err);
			error = 'Не удалось загрузить фавиконку: ' + (err.message || 'неизвестная ошибка');
		} finally {
			isUploadingFavicon = false;
		}
	}


	// ── Cancel license ────────────────────────────────────────────
	const CANCEL_LICENSE_MUTATION = `
		mutation CancelLicense($id: ID!) {
			cancelLicense(id: $id) {
				id
				isActive
				status
			}
		}
	`;

	let showCancelConfirm = $state(false);
	let isCancelling = $state(false);
	let cancelError = $state('');

	async function handleCancelLicense() {
		isCancelling = true;
		cancelError = '';

		try {
			const data = await graphqlRequest(CANCEL_LICENSE_MUTATION, { id: licenseId });
			license = { ...license, ...data.cancelLicense };
			showCancelConfirm = false;
		} catch (err) {
			console.error('Failed to cancel license:', err);
			cancelError = err.message || 'Не удалось отменить лицензию';
		} finally {
			isCancelling = false;
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
>
	<p>Редактируйте основные параметры вашего сайта.</p>
</PageIntro>

<Container class="mt-12 mb-24 sm:mt-20 lg:mt-24">
	<FadeInStagger class="flex flex-col gap-y-12">
		{#if isLoading}
			<FadeIn>
				<div class="flex items-center justify-center py-16">
					<svg class="h-8 w-8 animate-spin text-neutral-400" fill="none" viewBox="0 0 24 24">
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
						<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
					</svg>
					<span class="ml-3 text-sm text-neutral-500">Загрузка настроек...</span>
				</div>
			</FadeIn>

		{:else if error}
			<FadeIn>
				<div class="rounded-3xl border border-red-100 bg-red-50 p-8 text-center">
					<p class="text-sm text-red-600">{error}</p>
					<button onclick={fetchLicense} class="mt-4 text-sm font-semibold text-red-700 underline hover:text-red-900">
						Попробовать снова
					</button>
				</div>
			</FadeIn>

		{:else if license}
			<FadeIn>
				<div class="flex max-w-3xl flex-col gap-12">

					<!-- ── Site header ── -->
					<div class="flex items-center justify-between gap-4">
						<div>
							<h2 class="font-display text-3xl font-semibold text-neutral-950">
								{license.name || license.domain}
							</h2>
							<p class="mt-1 text-sm text-neutral-500">{license.domain}</p>
							{#if license.templateId}
								<p class="mt-1 text-xs text-neutral-400">
									Шаблон: <span class="font-medium text-neutral-600">{TEMPLATE_NAMES[license.templateId] ?? `#${license.templateId}`}</span>
								</p>
							{/if}
						</div>
						<div class="flex items-center gap-3">
							{#if license.isActive && license.status === 'active'}
								<span class="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
									<span class="h-1.5 w-1.5 rounded-full bg-green-500"></span>Активен
								</span>
							{:else if license.status === 'cancelled'}
								<span class="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
									<span class="h-1.5 w-1.5 rounded-full bg-neutral-400"></span>Отменён
								</span>
							{:else}
								<span class="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700">
									<span class="h-1.5 w-1.5 rounded-full bg-red-500"></span>Приостановлен
								</span>
							{/if}
						</div>
					</div>

					<!-- ── Navigation ── -->
					<div>
						<Button href="/lk/sites/{licenseId}/pages" invert>Страницы сайта</Button>
					</div>

					<!-- ── Settings form ── -->
					<form onsubmit={handleSubmit} class="space-y-10">

						{#if successMessage}
							<div class="rounded-2xl border border-green-200 bg-green-50 px-6 py-4 text-sm text-green-700">
								{successMessage}
							</div>
						{/if}
						{#if fieldErrors._general}
							<div class="rounded-2xl border border-red-200 bg-red-50 px-6 py-4 text-sm text-red-600">
								{fieldErrors._general}
							</div>
						{/if}

						<!-- ── Section: Основное ── -->
						<section class="space-y-6">
							<h3 class="font-display text-lg font-semibold text-neutral-950">Основное</h3>

							<div class="group relative">
								<label for="site-name" class="block text-sm font-semibold text-neutral-950">Название проекта</label>
								<input
									type="text"
									id="site-name"
									bind:value={formName}
									placeholder="Введите название проекта"
									class="mt-2 block w-full rounded-2xl border border-neutral-200 bg-transparent px-4 py-3 text-base text-neutral-950 transition placeholder:text-neutral-400 focus:border-neutral-950 focus:outline-none"
								/>
								{#if fieldErrors.name}
									<p class="mt-2 text-sm text-red-600">{fieldErrors.name}</p>
								{/if}
							</div>

							<div class="group relative">
								<label for="favicon-upload" class="block text-sm font-semibold text-neutral-950">Фавиконка</label>
								<div class="mt-2 flex items-center gap-6">
									<div class="flex h-16 w-16 items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50 overflow-hidden">
										{#if formFaviconUrl}
											<img src={formFaviconUrl} alt="Favicon" class="h-8 w-8 object-contain" />
										{:else}
											<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
											</svg>
										{/if}
									</div>
									<div class="flex flex-col gap-2">
										<label class="cursor-pointer rounded-2xl border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50">
											{isUploadingFavicon ? 'Загрузка...' : 'Выбрать файл'}
											<input type="file" id="favicon-upload" accept="image/*" class="hidden" onchange={handleFaviconUpload} disabled={isUploadingFavicon} />
										</label>
										{#if formFaviconUrl}
											<button 
												type="button" 
												onclick={() => formFaviconUrl = ''} 
												class="text-left text-xs font-semibold text-red-600 hover:text-red-700"
											>
												Удалить
											</button>
										{/if}
										<p class="text-[10px] text-neutral-400">PNG, ICO или SVG, до 1 МБ</p>
									</div>
								</div>
							</div>

							<div class="group relative">
								<div class="flex items-center gap-2">
									<label for="site-city" class="block text-sm font-semibold text-neutral-950">Город</label>
									<div class="group/tooltip relative">
										<svg xmlns="http://www.w3.org/2000/svg" class="size-4 cursor-help text-neutral-400 hover:text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
										</svg>
										<div class="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 hidden w-52 -translate-x-1/2 rounded-xl bg-neutral-900 p-3 text-center text-[11px] leading-snug text-white shadow-2xl group-hover/tooltip:block">
											На каждый город мы даём только одну подписку на сайт
											<div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-neutral-900"></div>
										</div>
									</div>
								</div>
								<input
									type="text"
									id="site-city"
									bind:value={formCity}
									placeholder="Напр. Москва"
									class="mt-2 block w-full rounded-2xl border border-neutral-200 bg-transparent px-4 py-3 text-base text-neutral-950 transition placeholder:text-neutral-400 focus:border-neutral-950 focus:outline-none"
								/>
							</div>
						</section>


						<!-- ── Section: Аналитика ── -->
						<section class="space-y-6">
							<h3 class="font-display text-lg font-semibold text-neutral-950">Аналитика</h3>
							<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
								<div class="group relative">
									<label for="yandex-metrica" class="block text-sm font-semibold text-neutral-950">Яндекс Метрика</label>
									<input
										type="text"
										id="yandex-metrica"
										bind:value={formYandexMetrica}
										placeholder="ID счётчика (напр. 12345678)"
										class="mt-2 block w-full rounded-2xl border border-neutral-200 bg-transparent px-4 py-3 text-base text-neutral-950 transition placeholder:text-neutral-400 focus:border-neutral-950 focus:outline-none"
									/>
								</div>
								<div class="group relative">
									<label for="google-analytics" class="block text-sm font-semibold text-neutral-950">Google Analytics</label>
									<input
										type="text"
										id="google-analytics"
										bind:value={formGoogleAnalytics}
										placeholder="ID отслеживания (напр. G-XXXXXXXXXX)"
										class="mt-2 block w-full rounded-2xl border border-neutral-200 bg-transparent px-4 py-3 text-base text-neutral-950 transition placeholder:text-neutral-400 focus:border-neutral-950 focus:outline-none"
									/>
								</div>
							</div>
						</section>

						<!-- ── Section: Каталог (Рубрики и категории) ── -->
						<section class="space-y-6 border-t border-neutral-100 pt-8">
							<div>
								<h3 class="font-display text-lg font-semibold text-neutral-950">Рубрики и категории в каталоге</h3>
								<p class="mt-1 text-sm text-neutral-500">
									Включайте и отключайте разделы каталога. Отключенные категории не будут отображаться на публичном сайте, но все связанные данные сохранятся.
								</p>
							</div>

							{#if isCatalogLoading}
								<div class="flex items-center gap-3 py-4">
									<svg class="h-5 w-5 animate-spin text-neutral-400" fill="none" viewBox="0 0 24 24">
										<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
										<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
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
										<div class="rounded-3xl border border-neutral-100 bg-neutral-50/50 p-6 shadow-sm ring-1 ring-neutral-950/5">
											<h4 class="font-display text-base font-semibold text-neutral-900 mb-4 flex items-center justify-between">
												<span>{rubric.value}</span>
												<span class="text-[10px] font-normal text-neutral-400 uppercase tracking-wider">{rubric.slug}</span>
											</h4>

											{#if !rubric.categories || rubric.categories.length === 0}
												<p class="text-xs text-neutral-400">В этой рубрике нет категорий.</p>
											{:else}
												<div class="divide-y divide-neutral-100/80">
													{#each rubric.categories as category (category.id)}
														<div class="flex items-center justify-between py-3 first:pt-0 last:pb-0">
															<div class="pr-4">
																<p class="text-sm font-semibold text-neutral-900">
																	{category.value}
																</p>
																<p class="text-[10px] text-neutral-400 mt-0.5">
																	slug: {category.slug}
																</p>
															</div>

															<!-- Switch Toggle Component -->
															<button
																type="button"
																class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 {category.is_enabled ? 'bg-neutral-900' : 'bg-neutral-200'}"
																role="switch"
																aria-checked={category.is_enabled}
																disabled={togglingCategoryIds.has(category.id)}
																onclick={() => handleToggleCategory(category.id, category.is_enabled)}
															>
																<span class="sr-only">Toggle category enabled state</span>
																<span
																	class="pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out {category.is_enabled ? 'translate-x-5' : 'translate-x-0'}"
																>
																	{#if togglingCategoryIds.has(category.id)}
																		<span class="absolute inset-0 flex items-center justify-center">
																			<svg class="h-3 w-3 animate-spin text-neutral-400" fill="none" viewBox="0 0 24 24">
																				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
																				<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
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
						</section>

						<!-- ── Submit ── -->
						<div class="border-t border-neutral-100 pt-8">
							<Button disabled={isSaving}>
								{isSaving ? 'Сохранение...' : 'Сохранить настройки'}
							</Button>
						</div>
					</form>

					<!-- ── Danger zone ── -->
					{#if license.status !== 'cancelled'}
						<div class="rounded-3xl border border-red-100 bg-red-50/50 p-6">
							<h3 class="font-display text-lg font-semibold text-red-900">Опасная зона</h3>
							<p class="mt-2 text-sm text-red-700">
								Отказ от лицензии деактивирует сайт и остановит ежедневное списание средств.
								Это действие необратимо.
							</p>
							<div class="mt-4">
								<button
									type="button"
									onclick={() => { showCancelConfirm = true; cancelError = ''; }}
									class="inline-flex items-center gap-2 rounded-2xl border border-red-300 bg-white px-4 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-50 hover:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
								>
									<svg xmlns="http://www.w3.org/2000/svg" class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
									</svg>
									Отказаться от лицензии
								</button>
							</div>
						</div>
					{/if}
				</div>
			</FadeIn>
		{/if}
	</FadeInStagger>
</Container>

<!-- ── Cancel confirmation dialog ── -->
{#if showCancelConfirm}
	<!-- svelte-ignore -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/50 p-4 backdrop-blur-sm"
		role="dialog"
		aria-modal="true"
		aria-labelledby="cancel-dialog-title"
	>
		<div class="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
			<div class="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
				<svg xmlns="http://www.w3.org/2000/svg" class="size-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
				</svg>
			</div>

			<h2 id="cancel-dialog-title" class="font-display text-xl font-semibold text-neutral-950">
				Отказаться от лицензии?
			</h2>
			<p class="mt-3 text-sm text-neutral-600">
				Сайт <span class="font-semibold text-neutral-950">{license?.domain}</span> будет деактивирован,
				а ежедневное списание средств — остановлено. Восстановить лицензию самостоятельно будет невозможно.
			</p>

			{#if cancelError}
				<div class="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
					{cancelError}
				</div>
			{/if}

			<div class="mt-6 flex gap-3">
				<button
					type="button"
					onclick={handleCancelLicense}
					disabled={isCancelling}
					class="flex-1 rounded-2xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
				>
					{isCancelling ? 'Отмена лицензии...' : 'Да, отказаться'}
				</button>
				<button
					type="button"
					onclick={() => { showCancelConfirm = false; cancelError = ''; }}
					disabled={isCancelling}
					class="flex-1 rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2"
				>
					Отмена
				</button>
			</div>
		</div>
	</div>
{/if}
