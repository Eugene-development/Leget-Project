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

	// ─── Queries & Mutations ────────────────────────────────────────────────────

	const GET_PAGE_QUERY = `
		query GetPage($licenseId: ID!, $id: ID!) {
			page(licenseId: $licenseId, id: $id) {
				id
				slug
				license { templateId }
			}
		}
	`;

	const GET_PAGE_COMPONENTS_QUERY = `
		query GetPageComponents($licenseId: ID!, $pageId: ID!) {
			pageComponents(licenseId: $licenseId, pageId: $pageId) {
				id
				type
				data
				isActive
				sortOrder
			}
		}
	`;

	const TEMPLATE_COMPONENTS_QUERY = `
		query TemplateComponents($templateId: Int!, $slug: String!) {
			templateComponents(templateId: $templateId, slug: $slug) {
				type
				label
			}
		}
	`;

	const UPSERT_COMPONENT_MUTATION = `
		mutation UpsertPageComponent($pageId: ID!, $licenseId: ID!, $type: String!, $data: JSON!) {
			upsertPageComponent(pageId: $pageId, licenseId: $licenseId, type: $type, data: $data) {
				id
				type
				data
				isActive
				sortOrder
			}
		}
	`;

	const TOGGLE_COMPONENT_MUTATION = `
		mutation TogglePageComponent($id: ID!, $isActive: Boolean!) {
			togglePageComponent(id: $id, isActive: $isActive) {
				id
				isActive
			}
		}
	`;

	const DELETE_COMPONENT_MUTATION = `
		mutation DeletePageComponent($id: ID!, $licenseId: ID!) {
			deletePageComponent(id: $id, licenseId: $licenseId) {
				id
			}
		}
	`;

	const UPDATE_PAGE_MUTATION = `
		mutation UpdatePage($id: ID!, $licenseId: ID!, $slug: String) {
			updatePage(id: $id, licenseId: $licenseId, slug: $slug) {
				id
				slug
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

	// ─── State ──────────────────────────────────────────────────────────────────

	let licenseId = $derived($page.params.id);
	let pageId = $derived($page.params.pageId);

	let pageData = $state(null);
	let components = $state([]);
	let availableComponents = $state([]);
	let isLoading = $state(true);
	let loadError = $state(null);

	let formSlug = $state('');
	let isSavingSlug = $state(false);
	let slugSuccess = $state('');
	let slugError = $state('');

	let isDeleting = $state(false);
	let showDeleteConfirm = $state(false);
	let deleteError = $state('');

	// Component editor state
	/** @type {string|null} */
	let editingType = $state(null);
	let editingJson = $state('');
	let editingJsonError = $state('');
	let isSavingComponent = $state(false);
	let componentSaveError = $state('');

	// S3 upload
	let isUploading = $state(false);
	let uploadError = $state('');
	let uploadedUrl = $state('');
	/** @type {HTMLInputElement|null} */
	let fileInput = $state(null);

	// ─── Init ───────────────────────────────────────────────────────────────────

	$effect(() => {
		if (browser && licenseId && pageId) {
			loadAll();
		}
	});

	async function loadAll() {
		isLoading = true;
		loadError = null;

		try {
			// Load page + components in parallel
			const [pageResult, componentsResult] = await Promise.all([
				graphqlRequest(GET_PAGE_QUERY, { licenseId, id: pageId }),
				graphqlRequest(GET_PAGE_COMPONENTS_QUERY, { licenseId, pageId })
			]);

			pageData = pageResult.page;
			formSlug = pageData.slug ?? '';
			components = componentsResult.pageComponents ?? [];

			// Load available components for this template + slug
			const templateId = pageData.license?.templateId;
			if (templateId) {
				const tmplResult = await graphqlRequest(TEMPLATE_COMPONENTS_QUERY, {
					templateId,
					slug: formSlug
				});
				availableComponents = tmplResult.templateComponents ?? [];
			}
		} catch (err) {
			console.error('Failed to load page:', err);
			loadError = err.message || 'Не удалось загрузить данные страницы';
		} finally {
			isLoading = false;
		}
	}

	// ─── Slug ───────────────────────────────────────────────────────────────────

	async function handleSaveSlug(e) {
		e.preventDefault();
		if (!formSlug.trim()) {
			slugError = 'Slug обязателен';
			return;
		}
		isSavingSlug = true;
		slugError = '';
		slugSuccess = '';

		try {
			await graphqlRequest(UPDATE_PAGE_MUTATION, {
				id: pageId,
				licenseId,
				slug: formSlug.trim()
			});
			slugSuccess = 'Slug сохранён';
			setTimeout(() => (slugSuccess = ''), 3000);
		} catch (err) {
			slugError = err.message || 'Не удалось сохранить slug';
		} finally {
			isSavingSlug = false;
		}
	}

	// ─── Component editor ───────────────────────────────────────────────────────

	function openEditor(type) {
		const existing = components.find((c) => c.type === type);
		editingType = type;
		editingJson = existing?.data ? JSON.stringify(existing.data, null, 2) : '{}';
		editingJsonError = '';
		componentSaveError = '';
		uploadedUrl = '';
		uploadError = '';
	}

	function closeEditor() {
		editingType = null;
	}

	async function handleSaveComponent(e) {
		e.preventDefault();
		editingJsonError = '';
		componentSaveError = '';

		let data;
		try {
			data = JSON.parse(editingJson);
		} catch {
			editingJsonError = 'Некорректный JSON';
			return;
		}

		isSavingComponent = true;
		try {
			const result = await graphqlRequest(UPSERT_COMPONENT_MUTATION, {
				pageId,
				licenseId,
				type: editingType,
				data
			});

			// Update local list
			const updated = result.upsertPageComponent;
			const idx = components.findIndex((c) => c.type === updated.type);
			if (idx >= 0) {
				components[idx] = updated;
			} else {
				components = [...components, updated];
			}

			closeEditor();
		} catch (err) {
			componentSaveError = err.message || 'Не удалось сохранить компонент';
		} finally {
			isSavingComponent = false;
		}
	}

	async function handleToggle(component) {
		try {
			const result = await graphqlRequest(TOGGLE_COMPONENT_MUTATION, {
				id: component.id,
				isActive: !component.isActive
			});
			const idx = components.findIndex((c) => c.id === component.id);
			if (idx >= 0) {
				components[idx] = { ...components[idx], isActive: result.togglePageComponent.isActive };
			}
		} catch (err) {
			console.error('Toggle failed:', err);
		}
	}

	async function handleDeleteComponent(component) {
		try {
			await graphqlRequest(DELETE_COMPONENT_MUTATION, {
				id: component.id,
				licenseId
			});
			components = components.filter((c) => c.id !== component.id);
		} catch (err) {
			console.error('Delete component failed:', err);
		}
	}

	// ─── Page delete ────────────────────────────────────────────────────────────

	async function handleDeletePage() {
		isDeleting = true;
		deleteError = '';

		try {
			await graphqlRequest(DELETE_PAGE_MUTATION, { id: pageId, licenseId });
			await goto(`/lk/sites/${licenseId}/pages`);
		} catch (err) {
			deleteError = err.message || 'Не удалось удалить страницу';
			showDeleteConfirm = false;
		} finally {
			isDeleting = false;
		}
	}

	// ─── S3 upload ──────────────────────────────────────────────────────────────

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
			// Insert URL into the JSON editor
			try {
				const parsed = JSON.parse(editingJson);
				parsed._uploadedUrl = url;
				editingJson = JSON.stringify(parsed, null, 2);
			} catch {
				editingJson = editingJson.trimEnd() + '\n// ' + url;
			}
		} catch (err) {
			uploadError = err.message || 'Не удалось загрузить файл';
		} finally {
			isUploading = false;
			if (fileInput) fileInput.value = '';
		}
	}

	// ─── Helpers ────────────────────────────────────────────────────────────────

	function isAdded(type) {
		return components.some((c) => c.type === type);
	}

	function componentFor(type) {
		return components.find((c) => c.type === type) ?? null;
	}
</script>

<svelte:head>
	<title>Редактирование страницы | LEGET</title>
	<meta name="description" content="Редактирование страницы сайта на платформе LEGET" />
</svelte:head>

<PageIntro
	title="Редактирование страницы"
	breadcrumbs={[
		{ label: 'Личный кабинет', href: '/lk' },
		{ label: 'Мои сайты', href: '/lk/sites' },
		{ label: 'Настройки сайта', href: `/lk/sites/${licenseId}` },
		{ label: 'Страницы сайта', href: `/lk/sites/${licenseId}/pages` },
		{ label: 'Редактирование страницы' }
	]}
>
	<p>Настройте компоненты страницы вашего сайта.</p>
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
					<span class="ml-3 text-sm text-neutral-500">Загрузка страницы...</span>
				</div>
			</FadeIn>

		{:else if loadError}
			<FadeIn>
				<div class="rounded-3xl border border-red-100 bg-red-50 p-8 text-center">
					<p class="text-sm text-red-600">{loadError}</p>
					<button onclick={loadAll} class="mt-4 text-sm font-semibold text-red-700 underline hover:text-red-900">
						Попробовать снова
					</button>
				</div>
			</FadeIn>

		{:else if pageData}
			<FadeIn>
				<div class="flex max-w-3xl flex-col gap-12">

					<!-- Slug -->
					<form onsubmit={handleSaveSlug} class="space-y-4">
						<h2 class="font-display text-xl font-semibold text-neutral-950">Slug страницы</h2>
						{#if slugSuccess}
							<div class="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">{slugSuccess}</div>
						{/if}
						{#if slugError}
							<div class="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{slugError}</div>
						{/if}
						<div class="flex items-center gap-3">
							<input
								type="text"
								bind:value={formSlug}
								placeholder="Например: / или /about"
								class="block w-full rounded-2xl border-neutral-200 bg-transparent px-4 py-3 text-base text-neutral-950 transition placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-neutral-950/5"
							/>
							<Button disabled={isSavingSlug}>
								{isSavingSlug ? 'Сохранение...' : 'Сохранить'}
							</Button>
						</div>
					</form>

					<!-- Components -->
					<div class="space-y-6">
						<h2 class="font-display text-xl font-semibold text-neutral-950">Компоненты</h2>

						{#if availableComponents.length === 0}
							<p class="text-sm text-neutral-500">
								Для этого шаблона и страницы компоненты не определены.
							</p>
						{:else}
							<div class="flex flex-col gap-3">
								{#each availableComponents as avail (avail.type)}
									{@const comp = componentFor(avail.type)}
									<div class="flex items-center justify-between rounded-2xl border border-neutral-100 bg-neutral-50 px-5 py-4">
										<div class="flex items-center gap-3">
											<!-- Active indicator -->
											{#if comp}
												<span class="h-2 w-2 rounded-full {comp.isActive ? 'bg-green-500' : 'bg-neutral-300'}"></span>
											{:else}
												<span class="h-2 w-2 rounded-full bg-neutral-200"></span>
											{/if}
											<div>
												<p class="text-sm font-semibold text-neutral-950">{avail.label}</p>
												<p class="text-xs text-neutral-400">{avail.type}</p>
											</div>
										</div>

										<div class="flex items-center gap-2">
											<!-- Toggle active (only if added) -->
											{#if comp}
												<button
													type="button"
													onclick={() => handleToggle(comp)}
													class="rounded-xl border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-600 transition hover:bg-neutral-50"
												>
													{comp.isActive ? 'Скрыть' : 'Показать'}
												</button>
											{/if}

											<!-- Edit -->
											<button
												type="button"
												onclick={() => openEditor(avail.type)}
												class="rounded-xl border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-600 transition hover:bg-neutral-50"
											>
												{isAdded(avail.type) ? 'Редактировать' : 'Добавить'}
											</button>

											<!-- Delete (only if added) -->
											{#if comp}
												<button
													type="button"
													onclick={() => handleDeleteComponent(comp)}
													class="rounded-xl border border-red-100 bg-white px-3 py-1.5 text-xs font-medium text-red-500 transition hover:bg-red-50"
												>
													Удалить
												</button>
											{/if}
										</div>
									</div>
								{/each}
							</div>
						{/if}
					</div>

					<!-- Component JSON editor (inline panel) -->
					{#if editingType}
						<div class="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
							<div class="mb-4 flex items-center justify-between">
								<h3 class="font-display text-lg font-semibold text-neutral-950">
									Редактирование: {editingType}
								</h3>
								<button
									type="button"
									onclick={closeEditor}
									class="text-sm text-neutral-400 hover:text-neutral-600"
								>
									✕ Закрыть
								</button>
							</div>

							<form onsubmit={handleSaveComponent} class="space-y-4">
								{#if componentSaveError}
									<div class="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{componentSaveError}</div>
								{/if}

								<div>
									<label for="component-json" class="block text-sm font-semibold text-neutral-950">
										Данные компонента (JSON)
									</label>
									<textarea
										id="component-json"
										bind:value={editingJson}
										rows="10"
										class="mt-2 block w-full rounded-2xl border-neutral-200 bg-transparent px-4 py-3 font-mono text-sm text-neutral-950 transition placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-neutral-950/5"
									></textarea>
									{#if editingJsonError}
										<p class="mt-1 text-sm text-red-600">{editingJsonError}</p>
									{/if}
								</div>

								<!-- S3 upload -->
								<div>
									<p class="text-sm font-semibold text-neutral-950">Загрузка изображения</p>
									<input
										type="file"
										accept="image/*"
										bind:this={fileInput}
										onchange={handleFileSelect}
										class="hidden"
									/>
									<div class="mt-2 flex items-center gap-3">
										<button
											type="button"
											onclick={openFileDialog}
											disabled={isUploading}
											class="inline-flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 disabled:opacity-50"
										>
											{isUploading ? 'Загрузка...' : 'Выбрать изображение'}
										</button>
									</div>
									{#if uploadError}
										<p class="mt-1 text-sm text-red-600">{uploadError}</p>
									{/if}
									{#if uploadedUrl}
										<p class="mt-1 break-all font-mono text-xs text-green-600">{uploadedUrl}</p>
									{/if}
								</div>

								<div class="flex items-center gap-3 border-t border-neutral-100 pt-4">
									<Button disabled={isSavingComponent}>
										{isSavingComponent ? 'Сохранение...' : 'Сохранить компонент'}
									</Button>
									<button
										type="button"
										onclick={closeEditor}
										class="text-sm text-neutral-500 hover:text-neutral-700"
									>
										Отмена
									</button>
								</div>
							</form>
						</div>
					{/if}

					<!-- Delete page -->
					<div class="border-t border-neutral-100 pt-8">
						<h3 class="text-sm font-semibold text-red-600">Удаление страницы</h3>
						<p class="mt-2 text-sm text-neutral-500">Это действие необратимо.</p>
						{#if deleteError}
							<p class="mt-2 text-sm text-red-600">{deleteError}</p>
						{/if}
						{#if showDeleteConfirm}
							<div class="mt-4 rounded-2xl border border-red-200 bg-red-50 px-6 py-4">
								<p class="text-sm text-red-700">Вы уверены, что хотите удалить эту страницу?</p>
								<div class="mt-4 flex items-center gap-3">
									<button
										type="button"
										onclick={handleDeletePage}
										disabled={isDeleting}
										class="inline-flex items-center rounded-2xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
									>
										{isDeleting ? 'Удаление...' : 'Да, удалить'}
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

					<div class="border-t border-neutral-100 pt-4">
						<Button href="/lk/sites/{licenseId}/pages" invert>← Назад к страницам</Button>
					</div>

				</div>
			</FadeIn>
		{/if}

	</FadeInStagger>
</Container>
