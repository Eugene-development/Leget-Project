<script>
	import PageIntro from '$lib/components/PageIntro.svelte';
	import Container from '$lib/components/Container.svelte';
	import FadeIn from '$lib/components/FadeIn.svelte';
	import FadeInStagger from '$lib/components/FadeInStagger.svelte';
	import Button from '$lib/components/Button.svelte';
	import { browser } from '$app/environment';
	import { graphqlRequest } from '$lib/utils/graphql-client.js';

	const MY_LICENSES_QUERY = `
		query MyLicenses {
			myLicenses {
				id
				domain
				name
				templateId
				isActive
				status
				createdAt
			}
		}
	`;

	let licenses = $state([]);
	let isLoading = $state(true);
	let error = $state(null);

	/** Map templateId to a human-readable template name */
	const TEMPLATE_NAMES = {
		2: 'Promo-1',
		3: 'Promo-2'
	};

	function getTemplateName(templateId) {
		return templateId ? (TEMPLATE_NAMES[templateId] ?? `Шаблон #${templateId}`) : null;
	}

	$effect(() => {
		if (browser) {
			fetchLicenses();
		}
	});

	async function fetchLicenses() {
		isLoading = true;
		error = null;

		try {
			const data = await graphqlRequest(MY_LICENSES_QUERY);
			licenses = data.myLicenses ?? [];
		} catch (err) {
			console.error('Failed to fetch licenses:', err);
			error = err.message || 'Не удалось загрузить список сайтов';
		} finally {
			isLoading = false;
		}
	}
</script>

<svelte:head>
	<title>Мои сайты | LEGET</title>
	<meta name="description" content="Управление вашими сайтами на платформе LEGET" />
</svelte:head>

<PageIntro
	title="Мои сайты"
	breadcrumbs={[
		{ label: 'Личный кабинет', href: '/lk' },
		{ label: 'Мои сайты' }
	]}
>
	<p>Список ваших сайтов на платформе. Выберите сайт для управления настройками и страницами.</p>
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
					<span class="ml-3 text-sm text-neutral-500">Загрузка сайтов...</span>
				</div>
			</FadeIn>
		{:else if error}
			<FadeIn>
				<div
					class="rounded-3xl border border-red-100 bg-red-50 p-8 text-center"
				>
					<p class="text-sm text-red-600">{error}</p>
					<button
						onclick={fetchLicenses}
						class="mt-4 text-sm font-semibold text-red-700 underline hover:text-red-900"
					>
						Попробовать снова
					</button>
				</div>
			</FadeIn>
		{:else if licenses.length === 0}
			<FadeIn>
				<div
					class="rounded-3xl border border-neutral-100 bg-neutral-50 p-12 text-center"
				>
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
								d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
							/>
						</svg>
					</div>
					<h3 class="font-display text-xl font-semibold text-neutral-950">
						У вас пока нет сайтов
					</h3>
					<p class="mt-2 text-sm text-neutral-600">
						Создайте свой первый сайт, чтобы начать работу с платформой.
					</p>
				</div>
			</FadeIn>
		{:else}
			<FadeIn>
				<div class="flex max-w-3xl flex-col gap-6">
					{#each licenses as license (license.id)}
						<a
							href="/lk/sites/{license.id}"
							class="group rounded-3xl border border-neutral-100 bg-neutral-50 p-6 shadow-sm ring-1 ring-neutral-950/5 transition hover:bg-white hover:shadow-md"
						>
							<div class="flex items-center justify-between gap-4">
								<div class="min-w-0 flex-1">
									<h3
										class="font-display text-lg font-semibold text-neutral-950 group-hover:text-neutral-700"
									>
										{license.name || license.domain}
									</h3>
									<p class="mt-1 truncate text-sm text-neutral-500">
										{license.domain}
									</p>
									{#if getTemplateName(license.templateId)}
										<p class="mt-1 text-xs text-neutral-400">
											Шаблон:
											<span class="font-medium text-neutral-600">
												{getTemplateName(license.templateId)}
											</span>
										</p>
									{/if}
								</div>
								<div class="flex shrink-0 items-center gap-3">
									{#if license.isActive && license.status === 'active'}
										<span
											class="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700"
										>
											<span class="h-1.5 w-1.5 rounded-full bg-green-500"></span>
											Активен
										</span>
									{:else if license.status === 'cancelled'}
										<span
											class="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600"
										>
											<span class="h-1.5 w-1.5 rounded-full bg-neutral-400"></span>
											Отменён
										</span>
									{:else}
										<span
											class="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700"
										>
											<span class="h-1.5 w-1.5 rounded-full bg-red-500"></span>
											Приостановлен
										</span>
									{/if}
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
