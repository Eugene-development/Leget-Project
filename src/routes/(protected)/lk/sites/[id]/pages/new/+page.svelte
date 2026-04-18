<script>
	import PageIntro from '$lib/components/PageIntro.svelte';
	import Container from '$lib/components/Container.svelte';
	import FadeIn from '$lib/components/FadeIn.svelte';
	import FadeInStagger from '$lib/components/FadeInStagger.svelte';
	import Button from '$lib/components/Button.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { graphqlRequest } from '$lib/utils/graphql-client.js';

	const CREATE_PAGE_MUTATION = `
		mutation CreatePage($licenseId: ID!, $slug: String!, $componentsData: JSON) {
			createPage(licenseId: $licenseId, slug: $slug, componentsData: $componentsData) {
				id
				slug
			}
		}
	`;

	let licenseId = $derived($page.params.id);

	// Form fields
	let formSlug = $state('');
	let formComponentsData = $state('');

	// Form state
	let isSaving = $state(false);
	let fieldErrors = $state({});

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
			await graphqlRequest(CREATE_PAGE_MUTATION, {
				licenseId,
				slug: formSlug.trim(),
				componentsData
			});

			await goto(`/lk/sites/${licenseId}/pages`);
		} catch (err) {
			console.error('Failed to create page:', err);

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
					fieldErrors = { _general: err.message || 'Не удалось создать страницу' };
				}
			} else {
				fieldErrors = { _general: err.message || 'Не удалось создать страницу' };
			}
		} finally {
			isSaving = false;
		}
	}
</script>

<svelte:head>
	<title>Новая страница | LEGET</title>
	<meta name="description" content="Создание новой страницы сайта на платформе LEGET" />
</svelte:head>

<PageIntro title="Новая страница" eyebrow="Создание страницы">
	<p>Заполните данные для создания новой страницы вашего сайта.</p>
</PageIntro>

<Container class="mt-12 mb-24 sm:mt-20 lg:mt-24">
	<FadeInStagger class="flex flex-col gap-y-12">
		<FadeIn>
			<div class="flex max-w-3xl flex-col gap-12">
				<form onsubmit={handleSubmit} class="space-y-8">
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
					</div>

					<div class="flex items-center gap-4 border-t border-neutral-100 pt-8">
						<Button disabled={isSaving}>
							{#if isSaving}
								Создание...
							{:else}
								Создать страницу
							{/if}
						</Button>
						<Button href="/lk/sites/{licenseId}/pages" invert>Отмена</Button>
					</div>
				</form>
			</div>
		</FadeIn>
	</FadeInStagger>
</Container>
