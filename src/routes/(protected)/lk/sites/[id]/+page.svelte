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
				metaDescription
				domain
				templateId
				isActive
				status
				headerData
				footerData
			}
		}
	`;

	const UPDATE_LICENSE_MUTATION = `
		mutation UpdateLicense(
			$id: ID!
			$name: String
			$metaDescription: String
			$headerData: JSON
			$footerData: JSON
		) {
			updateLicense(
				id: $id
				name: $name
				metaDescription: $metaDescription
				headerData: $headerData
				footerData: $footerData
			) {
				id
				name
				metaDescription
				headerData
				footerData
			}
		}
	`;

	/** Map templateId to human-readable name */
	const TEMPLATE_NAMES = { 2: 'Promo-1', 3: 'Promo-2' };

	let licenseId = $derived($page.params.id);

	let isLoading = $state(true);
	let error = $state(null);
	let license = $state(null);

	// ── Basic fields ──────────────────────────────────────────────
	let formName = $state('');
	let formMetaDescription = $state('');

	// ── Contact / site info (stored in header_data & footer_data) ─
	let formCity = $state('');
	let formPhones = $state(['']);
	let formEmails = $state(['']);
	let formAddresses = $state(['']);
	let formYandexMetrica = $state('');
	let formGoogleAnalytics = $state('');

	// ── Form state ────────────────────────────────────────────────
	let isSaving = $state(false);
	let successMessage = $state('');
	let fieldErrors = $state({});

	$effect(() => {
		if (browser && licenseId) {
			fetchLicense();
		}
	});

	async function fetchLicense() {
		isLoading = true;
		error = null;

		try {
			const data = await graphqlRequest(GET_LICENSE_QUERY, { id: licenseId });
			license = data.license;

			formName = license.name ?? '';
			formMetaDescription = license.metaDescription ?? '';

			// Hydrate contact fields from header_data
			const h = license.headerData ?? {};
			formCity             = h.city             ?? '';
			formPhones           = h.phones?.length   ? [...h.phones]    : [''];
			formEmails           = h.emails?.length   ? [...h.emails]    : [''];
			formAddresses        = h.addresses?.length ? [...h.addresses] : [''];
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
		const phones    = formPhones.filter(Boolean);
		const emails    = formEmails.filter(Boolean);
		const addresses = formAddresses.filter(Boolean);

		const existing = license?.headerData ?? {};

		const headerData = {
			...existing,
			city:             formCity             || null,
			phones:           phones.length   ? phones    : null,
			emails:           emails.length   ? emails    : null,
			addresses:        addresses.length ? addresses : null,
			yandexMetrica:    formYandexMetrica    || null,
			googleAnalytics:  formGoogleAnalytics  || null,
		};

		const existingFooter = license?.footerData ?? {};
		const footerData = {
			...existingFooter,
			phones:    phones.length   ? phones    : null,
			emails:    emails.length   ? emails    : null,
			addresses: addresses.length ? addresses : null,
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
				metaDescription: formMetaDescription,
				headerData,
				footerData,
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

	// ── Array field helpers ───────────────────────────────────────
	function addItem(arr) { arr.push(''); }
	function removeItem(arr, i) { arr.splice(i, 1); if (arr.length === 0) arr.push(''); }

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
								<label for="site-name" class="block text-sm font-semibold text-neutral-950">Название сайта</label>
								<input
									type="text"
									id="site-name"
									bind:value={formName}
									placeholder="Введите название сайта"
									class="mt-2 block w-full rounded-2xl border border-neutral-200 bg-transparent px-4 py-3 text-base text-neutral-950 transition placeholder:text-neutral-400 focus:border-neutral-950 focus:outline-none"
								/>
								{#if fieldErrors.name}
									<p class="mt-2 text-sm text-red-600">{fieldErrors.name}</p>
								{/if}
							</div>

							<div class="group relative">
								<label for="site-meta-description" class="block text-sm font-semibold text-neutral-950">Мета-описание</label>
								<textarea
									id="site-meta-description"
									bind:value={formMetaDescription}
									placeholder="Краткое описание сайта для поисковых систем"
									rows="3"
									class="mt-2 block w-full rounded-2xl border border-neutral-200 bg-transparent px-4 py-3 text-base text-neutral-950 transition placeholder:text-neutral-400 focus:border-neutral-950 focus:outline-none"
								></textarea>
								{#if fieldErrors.metaDescription || fieldErrors.meta_description}
									<p class="mt-2 text-sm text-red-600">{fieldErrors.metaDescription || fieldErrors.meta_description}</p>
								{/if}
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

						<!-- ── Section: Контакты ── -->
						<section class="space-y-6">
							<h3 class="font-display text-lg font-semibold text-neutral-950">Контакты</h3>

							<!-- Phones -->
							<div class="group relative">
								<div class="mb-3 flex items-center justify-between">
									<span class="text-sm font-semibold text-neutral-950">Телефоны</span>
									<button type="button" onclick={() => addItem(formPhones)} class="flex items-center gap-1 text-xs font-semibold text-neutral-950 hover:text-neutral-600">
										<svg xmlns="http://www.w3.org/2000/svg" class="size-3" viewBox="0 0 20 20" fill="currentColor">
											<path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
										</svg>
										Добавить
									</button>
								</div>
								<div class="space-y-3">
									{#each formPhones as _, i}
										<div class="flex items-center gap-3">
											<input
												type="tel"
												bind:value={formPhones[i]}
												placeholder="+7 (___) ___-__-__"
												aria-label="Номер телефона {i + 1}"
												class="block w-full rounded-2xl border border-neutral-200 bg-transparent px-4 py-3 text-base text-neutral-950 transition placeholder:text-neutral-400 focus:border-neutral-950 focus:outline-none"
											/>
											<button type="button" onclick={() => removeItem(formPhones, i)} class="rounded-full p-2 text-neutral-400 transition hover:bg-red-50 hover:text-red-500" title="Удалить">
												<svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 20 20" fill="currentColor">
													<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
												</svg>
											</button>
										</div>
									{/each}
								</div>
							</div>

							<!-- Emails -->
							<div class="group relative">
								<div class="mb-3 flex items-center justify-between">
									<span class="text-sm font-semibold text-neutral-950">Почта на сайт</span>
									<button type="button" onclick={() => addItem(formEmails)} class="flex items-center gap-1 text-xs font-semibold text-neutral-950 hover:text-neutral-600">
										<svg xmlns="http://www.w3.org/2000/svg" class="size-3" viewBox="0 0 20 20" fill="currentColor">
											<path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
										</svg>
										Добавить
									</button>
								</div>
								<div class="space-y-3">
									{#each formEmails as _, i}
										<div class="flex items-center gap-3">
											<input
												type="email"
												bind:value={formEmails[i]}
												placeholder="example@mail.com"
												aria-label="Электронная почта {i + 1}"
												class="block w-full rounded-2xl border border-neutral-200 bg-transparent px-4 py-3 text-base text-neutral-950 transition placeholder:text-neutral-400 focus:border-neutral-950 focus:outline-none"
											/>
											<button type="button" onclick={() => removeItem(formEmails, i)} class="rounded-full p-2 text-neutral-400 transition hover:bg-red-50 hover:text-red-500" title="Удалить">
												<svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 20 20" fill="currentColor">
													<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
												</svg>
											</button>
										</div>
									{/each}
								</div>
							</div>

							<!-- Addresses -->
							<div class="group relative">
								<div class="mb-3 flex items-center justify-between">
									<span class="text-sm font-semibold text-neutral-950">Адреса</span>
									<button type="button" onclick={() => addItem(formAddresses)} class="flex items-center gap-1 text-xs font-semibold text-neutral-950 hover:text-neutral-600">
										<svg xmlns="http://www.w3.org/2000/svg" class="size-3" viewBox="0 0 20 20" fill="currentColor">
											<path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
										</svg>
										Добавить
									</button>
								</div>
								<div class="space-y-3">
									{#each formAddresses as _, i}
										<div class="flex items-start gap-3">
											<textarea
												bind:value={formAddresses[i]}
												placeholder="Введите адрес..."
												rows="2"
												aria-label="Адрес {i + 1}"
												class="block w-full resize-none rounded-2xl border border-neutral-200 bg-transparent px-4 py-3 text-base text-neutral-950 transition placeholder:text-neutral-400 focus:border-neutral-950 focus:outline-none"
											></textarea>
											<button type="button" onclick={() => removeItem(formAddresses, i)} class="mt-3 rounded-full p-2 text-neutral-400 transition hover:bg-red-50 hover:text-red-500" title="Удалить">
												<svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 20 20" fill="currentColor">
													<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
												</svg>
											</button>
										</div>
									{/each}
								</div>
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
