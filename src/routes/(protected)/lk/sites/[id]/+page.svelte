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
				isActive
				status
			}
		}
	`;

	const UPDATE_LICENSE_MUTATION = `
		mutation UpdateLicense($id: ID!, $name: String, $metaDescription: String) {
			updateLicense(id: $id, name: $name, metaDescription: $metaDescription) {
				id
				name
				metaDescription
			}
		}
	`;

	let licenseId = $derived($page.params.id);

	let isLoading = $state(true);
	let error = $state(null);
	let license = $state(null);

	// Form fields
	let formName = $state('');
	let formMetaDescription = $state('');

	// Form state
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
		} catch (err) {
			console.error('Failed to fetch license:', err);
			error = err.message || 'Не удалось загрузить настройки сайта';
		} finally {
			isLoading = false;
		}
	}

	async function handleSubmit(e) {
		e.preventDefault();
		isSaving = true;
		successMessage = '';
		fieldErrors = {};

		try {
			const data = await graphqlRequest(UPDATE_LICENSE_MUTATION, {
				id: licenseId,
				name: formName,
				metaDescription: formMetaDescription
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
					if (field) {
						errors[field] = gqlErr.message;
					}
				}
				if (Object.keys(errors).length > 0) {
					fieldErrors = errors;
				} else {
					fieldErrors = { _general: err.message || 'Не удалось сохранить настройки' };
				}
			} else {
				fieldErrors = { _general: err.message || 'Не удалось сохранить настройки' };
			}
		} finally {
			isSaving = false;
		}
	}
</script>

<svelte:head>
	<title>Настройки сайта | LEGET</title>
	<meta name="description" content="Управление настройками сайта на платформе LEGET" />
</svelte:head>

<PageIntro title="Настройки сайта" eyebrow="Управление сайтом">
	<p>Редактируйте основные параметры вашего сайта.</p>
</PageIntro>

<Container class="mt-12 mb-24 sm:mt-20 lg:mt-24">
	<FadeInStagger class="flex flex-col gap-y-12">
		{#if isLoading}
			<FadeIn>
				<div class="flex items-center justify-center py-16">
					<svg
						class="h-8 w-8 animate-spin text-neutral-400"
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
					<span class="ml-3 text-sm text-neutral-500">Загрузка настроек...</span>
				</div>
			</FadeIn>
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
					<div class="flex items-center justify-between gap-4">
						<div>
							<h2 class="font-display text-3xl font-semibold text-neutral-950">
								{license.name || license.domain}
							</h2>
							<p class="mt-2 text-sm text-neutral-500">{license.domain}</p>
						</div>
						<div class="flex items-center gap-3">
							{#if license.isActive && license.status === 'active'}
								<span
									class="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700"
								>
									<span class="h-1.5 w-1.5 rounded-full bg-green-500"></span>
									Активен
								</span>
							{:else}
								<span
									class="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700"
								>
									<span class="h-1.5 w-1.5 rounded-full bg-red-500"></span>
									Приостановлен
								</span>
							{/if}
						</div>
					</div>

					<!-- Navigation -->
					<div>
						<Button href="/lk/sites/{licenseId}/pages" invert>Страницы сайта</Button>
					</div>

					<!-- Settings Form -->
					<form onsubmit={handleSubmit} class="space-y-8">
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

						<div class="space-y-8">
							<div class="group relative">
								<label for="site-name" class="block text-sm font-semibold text-neutral-950">
									Название сайта
								</label>
								<input
									type="text"
									id="site-name"
									bind:value={formName}
									placeholder="Введите название сайта"
									class="mt-2 block w-full rounded-2xl border-neutral-200 bg-transparent px-4 py-3 text-base text-neutral-950 transition placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-neutral-950/5"
								/>
								{#if fieldErrors.name}
									<p class="mt-2 text-sm text-red-600">{fieldErrors.name}</p>
								{/if}
							</div>

							<div class="group relative">
								<label
									for="site-meta-description"
									class="block text-sm font-semibold text-neutral-950"
								>
									Мета-описание
								</label>
								<textarea
									id="site-meta-description"
									bind:value={formMetaDescription}
									placeholder="Краткое описание сайта для поисковых систем"
									rows="4"
									class="mt-2 block w-full rounded-2xl border-neutral-200 bg-transparent px-4 py-3 text-base text-neutral-950 transition placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-neutral-950/5"
								></textarea>
								{#if fieldErrors.metaDescription || fieldErrors.meta_description}
									<p class="mt-2 text-sm text-red-600">
										{fieldErrors.metaDescription || fieldErrors.meta_description}
									</p>
								{/if}
							</div>
						</div>

						<div class="border-t border-neutral-100 pt-8">
							<Button disabled={isSaving}>
								{#if isSaving}
									Сохранение...
								{:else}
									Сохранить настройки
								{/if}
							</Button>
						</div>
					</form>
				</div>
			</FadeIn>
		{/if}
	</FadeInStagger>
</Container>
