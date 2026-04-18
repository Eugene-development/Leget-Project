<script>
	import PageIntro from '$lib/components/PageIntro.svelte';
	import Container from '$lib/components/Container.svelte';
	import FadeIn from '$lib/components/FadeIn.svelte';
	import FadeInStagger from '$lib/components/FadeInStagger.svelte';
	import Button from '$lib/components/Button.svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { graphqlRequest } from '$lib/utils/graphql-client.js';
	import { uploadFileToS3 } from '$lib/utils/s3-upload.js';

	const GET_PAGE_QUERY = `
		query GetPage($licenseId: ID!, $id: ID!) {
			page(licenseId: $licenseId, id: $id) {
				id
				slug
				componentsData
			}
		}
	`;

	const UPDATE_PAGE_MUTATION = `
		mutation UpdatePage($id: ID!, $licenseId: ID!, $slug: String, $componentsData: JSON) {
			updatePage(id: $id, licenseId: $licenseId, slug: $slug, componentsData: $componentsData) {
				id
				slug
				componentsData
			}
		}
	`;

	const DELETE_PAGE_MUTATION = `
		mutation DeletePage($id: ID!, $licenseId: ID!) {
			deletePage(id: $id, licenseId: $licenseId) {
				id
			}
		}
	`;

	let licenseId = $derived($page.params.id);
	let pageId = $derived($page.params.pageId);

	// Page data
	let pageData = $state(null);
	let isLoading = $state(true);
	let loadError = $state(null);

	// Form fields
	let formSlug = $state('');
	let formComponentsData = $state('');

	// Form state
	let isSaving = $state(false);
	let isDeleting = $state(false);
	let successMessage = $state('');
	let fieldErrors = $state({});
	let showDeleteConfirm = $state(false);

	// S3 upload state
	let isUploading = $state(false);
	let uploadError = $state('');
	let uploadedUrl = $state('');

	/** @type {HTMLInputElement|null} */
	let fileInput = $state(null);

	$effect(() => {
		if (browser && licenseId && pageId) {
			fetchPage();
		}
	});

	async function fetchPage() {
		isLoading = true;
		loadError = null;

		try {
			const data = await graphqlRequest(GET_PAGE_QUERY, { licenseId, id: pageId });
			pageData = data.page;
			formSlug = pageData.slug ?? '';
			formComponentsData = pageData.componentsData
				? JSON.stringify(pageData.componentsData, null, 2)
				: '';
		} catch (err) {
			console.error('Failed to fetch page:', err);
			loadError = err.message || 'Не удалось загрузить данные страницы';
		} finally {
			isLoading = false;
		}
	}

	function validateComponentsData(value) {
		if (!value.trim()) {
			return null;
		}

		try {
			JSON.parse(value);
			return null;
		} catch {
			return 'Некорректный JSON. Проверьте формат данных.';
		}
	}

	async function handleSubmit(e) {
		e.preventDefault();
		isSaving = true;
		successMessage = '';
		fieldErrors = {};

		// Validate slug
		if (!formSlug.trim()) {
			fieldErrors = { slug: 'Slug обязателен для заполнения' };
			isSaving = false;
			return;
		}

		// Validate components_data JSON
		const jsonError = validateComponentsData(formComponentsData);
		if (jsonError) {
			fieldErrors = { componentsData: jsonError };
			isSaving = false;
			return;
		}

		// Parse components_data if provided
		let componentsData = null;
		if (formComponentsData.trim()) {
			componentsData = JSON.parse(formComponentsData);
		}

		try {
			const data = await graphqlRequest(UPDATE_PAGE_MUTATION, {
				id: pageId,
				licenseId,
				slug: formSlug.trim(),
				componentsData
			});

			pageData = { ...pageData, ...data.updatePage };
			successMessage = 'Страница успешно сохранена';

			setTimeout(() => {
				successMessage = '';
			}, 4000);
		} catch (err) {
			console.error('Failed to update page:', err);

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
					fieldErrors = { _general: err.message || 'Не удалось сохранить страницу' };
				}
			} else {
				fieldErrors = { _general: err.message || 'Не удалось сохранить страницу' };
			}
		} finally {
			isSaving = false;
		}
	}

	async function handleDelete() {
		isDeleting = true;
		fieldErrors = {};

		try {
			await graphqlRequest(DELETE_PAGE_MUTATION, {
				id: pageId,
				licenseId
			});

			await goto(`/lk/sites/${licenseId}/pages`);
		} catch (err) {
			console.error('Failed to delete page:', err);
			fieldErrors = { _general: err.message || 'Не удалось удалить страницу' };
			showDeleteConfirm = false;
		} finally {
			isDeleting = false;
		}
	}

	function openFileDialog() {
		fileInput?.click();
	}

	async function handleFileSelect(e) {
		const file = e.target.files?.[0];
		if (!file) return;

		isUploading = true;
		uploadError = '';
		uploadedUrl = '';

		try {
			const url = await uploadFileToS3(file);
			uploadedUrl = url;

			// Insert the URL into the components_data textarea
			if (formComponentsData.trim()) {
				formComponentsData = formComponentsData.trimEnd() + '\n' + url;
			} else {
				formComponentsData = url;
			}
		} catch (err) {
			console.error('Failed to upload file:', err);
			uploadError = err.message || 'Не удалось загрузить файл';
		} finally {
			isUploading = false;
			// Reset file input so the same file can be selected again
			if (fileInput) fileInput.value = '';
		}
	}
</script>

<svelte:head>
	<title>Редактирование страницы | LEGET</title>
	<meta name="description" content="Редактирование страницы сайта на платформе LEGET" />
</svelte:head>

<PageIntro title="Редактирование страницы" eyebrow="Управление контентом">
	<p>Измените данные страницы вашего сайта.</p>
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
					<span class="ml-3 text-sm text-neutral-500">Загрузка страницы...</span>
				</div>
			</FadeIn>
		{:else if loadError}
			<FadeIn>
				<div class="rounded-3xl border border-red-100 bg-red-50 p-8 text-center">
					<p class="text-sm text-red-600">{loadError}</p>
					<button
						onclick={fetchPage}
						class="mt-4 text-sm font-semibold text-red-700 underline hover:text-red-900"
					>
						Попробовать снова
					</button>
				</div>
			</FadeIn>
		{:else if pageData}
			<FadeIn>
				<div class="flex max-w-3xl flex-col gap-12">
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
								<label for="page-slug" class="block text-sm font-semibold text-neutral-950">
									Slug страницы
								</label>
								<input
									type="text"
									id="page-slug"
									bind:value={formSlug}
									placeholder="Например: / или /about"
									class="mt-2 block w-full rounded-2xl border-neutral-200 bg-transparent px-4 py-3 text-base text-neutral-950 transition placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-neutral-950/5"
								/>
								{#if fieldErrors.slug}
									<p class="mt-2 text-sm text-red-600">{fieldErrors.slug}</p>
								{/if}
							</div>

							<div class="group relative">
								<label
									for="page-components-data"
									class="block text-sm font-semibold text-neutral-950"
								>
									Данные компонентов (JSON)
								</label>
								<textarea
									id="page-components-data"
									bind:value={formComponentsData}
									placeholder={'[\n  { "type": "Hero", "data": { "title": "Заголовок" } },\n  { "type": "Text", "data": { "content": "<p>Текст</p>" } }\n]'}
									rows="12"
									class="mt-2 block w-full rounded-2xl border-neutral-200 bg-transparent px-4 py-3 font-mono text-sm text-neutral-950 transition placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-neutral-950/5"
								></textarea>
								{#if fieldErrors.componentsData || fieldErrors.components_data}
									<p class="mt-2 text-sm text-red-600">
										{fieldErrors.componentsData || fieldErrors.components_data}
									</p>
								{/if}
							</div>

							<!-- S3 Image Upload -->
							<div class="group relative">
								<label for="page-image-upload" class="block text-sm font-semibold text-neutral-950">
									Загрузка изображения
								</label>
								<p class="mt-1 text-sm text-neutral-500">
									Загрузите изображение в S3. URL будет вставлен в поле данных компонентов.
								</p>
								<input
									type="file"
									id="page-image-upload"
									accept="image/*"
									bind:this={fileInput}
									onchange={handleFileSelect}
									class="hidden"
								/>
								<div class="mt-3 flex items-center gap-4">
									<button
										type="button"
										onclick={openFileDialog}
										disabled={isUploading}
										class="inline-flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
									>
										{#if isUploading}
											<svg
												class="h-4 w-4 animate-spin text-neutral-400"
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
											Загрузка...
										{:else}
											<svg
												class="h-4 w-4 text-neutral-500"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
												/>
											</svg>
											Выбрать изображение
										{/if}
									</button>
								</div>
								{#if uploadError}
									<p class="mt-2 text-sm text-red-600">{uploadError}</p>
								{/if}
								{#if uploadedUrl}
									<div
										class="mt-3 rounded-2xl border border-green-200 bg-green-50 px-4 py-3"
									>
										<p class="text-xs font-medium text-green-700">
											Файл загружен. URL вставлен в поле данных компонентов:
										</p>
										<p class="mt-1 break-all font-mono text-xs text-green-600">
											{uploadedUrl}
										</p>
									</div>
								{/if}
							</div>
						</div>

						<div class="flex items-center gap-4 border-t border-neutral-100 pt-8">
							<Button disabled={isSaving}>
								{#if isSaving}
									Сохранение...
								{:else}
									Сохранить страницу
								{/if}
							</Button>
							<Button href="/lk/sites/{licenseId}/pages" invert>Отмена</Button>
						</div>
					</form>

					<!-- Delete Section -->
					<div class="border-t border-neutral-100 pt-8">
						<h3 class="text-sm font-semibold text-red-600">Удаление страницы</h3>
						<p class="mt-2 text-sm text-neutral-500">
							Это действие необратимо. Страница будет удалена навсегда.
						</p>
						{#if showDeleteConfirm}
							<div
								class="mt-4 rounded-2xl border border-red-200 bg-red-50 px-6 py-4"
							>
								<p class="text-sm text-red-700">
									Вы уверены, что хотите удалить эту страницу?
								</p>
								<div class="mt-4 flex items-center gap-3">
									<button
										type="button"
										onclick={handleDelete}
										disabled={isDeleting}
										class="inline-flex items-center rounded-2xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
									>
										{#if isDeleting}
											Удаление...
										{:else}
											Да, удалить
										{/if}
									</button>
									<button
										type="button"
										onclick={() => (showDeleteConfirm = false)}
										class="inline-flex items-center rounded-2xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-50"
									>
										Отмена
									</button>
								</div>
							</div>
						{:else}
							<button
								type="button"
								onclick={() => (showDeleteConfirm = true)}
								class="mt-4 inline-flex items-center rounded-2xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
							>
								Удалить страницу
							</button>
						{/if}
					</div>
				</div>
			</FadeIn>
		{/if}
	</FadeInStagger>
</Container>
