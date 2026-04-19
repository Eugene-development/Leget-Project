<script>
	import PageIntro from '$lib/components/PageIntro.svelte';
	import Container from '$lib/components/Container.svelte';
	import FadeIn from '$lib/components/FadeIn.svelte';
	import FadeInStagger from '$lib/components/FadeInStagger.svelte';
	import Button from '$lib/components/Button.svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { graphqlRequest } from '$lib/utils/graphql-client.js';

	const GET_PAGES_QUERY = `
		query GetPages($licenseId: ID!) {
			pages(licenseId: $licenseId) {
				id
				slug
				componentsData
				createdAt
				updatedAt
			}
		}
	`;

	let licenseId = $derived($page.params.id);

	let pages = $state([]);
	let isLoading = $state(true);
	let error = $state(null);

	$effect(() => {
		if (browser && licenseId) {
			fetchPages();
		}
	});

	async function fetchPages() {
		isLoading = true;
		error = null;

		try {
			const data = await graphqlRequest(GET_PAGES_QUERY, { licenseId });
			pages = data.pages ?? [];
		} catch (err) {
			console.error('Failed to fetch pages:', err);
			error = err.message || 'Не удалось загрузить список страниц';
		} finally {
			isLoading = false;
		}
	}

	function formatDate(dateString) {
		if (!dateString) return '';
		const date = new Date(dateString);
		return date.toLocaleDateString('ru-RU', {
			day: 'numeric',
			month: 'short',
			year: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>Страницы сайта | LEGET</title>
	<meta name="description" content="Управление страницами сайта на платформе LEGET" />
</svelte:head>

<PageIntro
	title="Страницы сайта"
	breadcrumbs={[
		{ label: 'Личный кабинет', href: '/lk' },
		{ label: 'Мои сайты', href: '/lk/sites' },
		{ label: 'Настройки сайта', href: `/lk/sites/${licenseId}` },
		{ label: 'Страницы сайта' }
	]}
>
	<p>Список страниц вашего сайта. Создавайте новые страницы и редактируйте существующие.</p>
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
					<span class="ml-3 text-sm text-neutral-500">Загрузка страниц...</span>
				</div>
			</FadeIn>
		{:else if error}
			<FadeIn>
				<div class="rounded-3xl border border-red-100 bg-red-50 p-8 text-center">
					<p class="text-sm text-red-600">{error}</p>
					<button
						onclick={fetchPages}
						class="mt-4 text-sm font-semibold text-red-700 underline hover:text-red-900"
					>
						Попробовать снова
					</button>
				</div>
			</FadeIn>
		{:else if pages.length === 0}
			<FadeIn>
				<div class="rounded-3xl border border-neutral-100 bg-neutral-50 p-12 text-center">
					<div
						class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100"
					>
						<svg
							class="h-8 w-8 text-neutral-400"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="1.5"
								d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
							/>
						</svg>
					</div>
					<h3 class="font-display text-xl font-semibold text-neutral-950">
						У вас пока нет страниц
					</h3>
					<p class="mt-2 text-sm text-neutral-600">
						Создайте первую страницу для вашего сайта.
					</p>
					<div class="mt-6">
						<Button href="/lk/sites/{licenseId}/pages/new">Создать страницу</Button>
					</div>
				</div>
			</FadeIn>
		{:else}
			<FadeIn>
				<div class="flex max-w-3xl flex-col gap-6">
					<div class="flex items-center justify-between">
						<p class="text-sm text-neutral-500">
							{pages.length} {pages.length === 1 ? 'страница' : pages.length < 5 ? 'страницы' : 'страниц'}
						</p>
						<Button href="/lk/sites/{licenseId}/pages/new" invert>Создать страницу</Button>
					</div>

					{#each pages as pageItem (pageItem.id)}
						<a
							href="/lk/sites/{licenseId}/pages/{pageItem.id}"
							class="group rounded-3xl border border-neutral-100 bg-neutral-50 p-6 shadow-sm ring-1 ring-neutral-950/5 transition hover:bg-white hover:shadow-md"
						>
							<div class="flex items-center justify-between gap-4">
								<div class="min-w-0 flex-1">
									<h3
										class="font-display text-lg font-semibold text-neutral-950 group-hover:text-neutral-700"
									>
										{pageItem.slug}
									</h3>
									{#if pageItem.updatedAt}
										<p class="mt-1 text-sm text-neutral-500">
											Обновлено {formatDate(pageItem.updatedAt)}
										</p>
									{/if}
								</div>
								<div class="flex shrink-0 items-center gap-3">
									<svg
										class="h-5 w-5 text-neutral-400 transition group-hover:text-neutral-600"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M9 5l7 7-7 7"
										/>
									</svg>
								</div>
							</div>
						</a>
					{/each}
				</div>
			</FadeIn>
		{/if}
	</FadeInStagger>
</Container>
