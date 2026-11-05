<script>
	import ContentLoading from '$lib/components/ContentLoading.svelte';
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
				dailyPrice
				billingStartedAt
				createdAt
			}
		}
	`;

	let licenses = $state([]);
	let showCancelled = $state(false);
	let cancelledCount = $derived(licenses.filter((license) => license.status === 'cancelled').length);
	let visibleLicenses = $derived(licenses.filter((license) => showCancelled || license.status !== 'cancelled'));
	let isLoading = $state(true);
	let error = $state(null);


	/** Map templateId to a human-readable template name */
	const TEMPLATE_NAMES = {
		1: 'Promo-1',
		2: 'Promo-2'
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
			const rawLicenses = data.myLicenses ?? [];
			licenses = [...rawLicenses].sort((a, b) => {
				const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
				const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
				return timeB - timeA;
			});

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
	breadcrumbs={[{ label: 'Личный кабинет', href: '/lk' }, { label: 'Мои сайты' }]}
>
	<!-- <p>Список ваших сайтов на платформе. Выберите сайт для управления настройками и страницами.</p> -->
</PageIntro>

<Container class="mt-12 mb-24 sm:mt-20 lg:mt-24">
	<FadeInStagger class="flex flex-col gap-y-12">
		{#if !isLoading && !error && cancelledCount > 0}
			<label class="flex items-center gap-3 text-sm font-medium text-neutral-700">
				<input type="checkbox" bind:checked={showCancelled} class="rounded border-neutral-300 text-neutral-950 focus:ring-neutral-950" />
				Показать отменённые ({cancelledCount})
			</label>
		{/if}
		{#if isLoading}
			<ContentLoading />
		{:else if error}
			<FadeIn>
				<div class="rounded-3xl border border-red-100 bg-red-50 p-8 text-center">
					<p class="text-sm text-red-600">{error}</p>
					<button
						onclick={fetchLicenses}
						class="mt-4 text-sm font-semibold text-red-700 underline hover:text-red-900"
					>
						Попробовать снова
					</button>
				</div>
			</FadeIn>
		{:else if visibleLicenses.length === 0}
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
								d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
							/>
						</svg>
					</div>
					<h3 class="font-display text-xl font-semibold text-neutral-950">{cancelledCount ? 'Нет активных сайтов' : 'У вас пока нет сайтов'}</h3>
					<p class="mt-2 text-sm text-neutral-600">{cancelledCount ? 'Включите «Показать отменённые», чтобы восстановить лицензию, или создайте новый сайт.' : 'Выберите шаблон и создайте свой первый сайт.'}</p>
					<div class="mt-6">
						<Button href="/catalog">Выбрать шаблон</Button>
					</div>
				</div>
			</FadeIn>
		{:else}
			<FadeIn>
				<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:max-w-5xl">
					{#each visibleLicenses as license (license.id)}
						<div
							class="group rounded-3xl border border-neutral-100 bg-neutral-50 p-6 shadow-sm ring-1 ring-neutral-950/5 transition hover:bg-white hover:shadow-md"
						>
							<div class="flex flex-col gap-6">
								<div class="flex items-start justify-between gap-4">
									<div class="min-w-0 flex-1">
										<h3
											class="font-display text-lg font-semibold text-neutral-950 break-words"
										>
											{license.name || 'Новый сайт'}
										</h3>
										{#if getTemplateName(license.templateId)}
											<p class="mt-1 text-xs text-neutral-400">
												Шаблон:
												<span class="font-medium text-neutral-600">
													{getTemplateName(license.templateId)}
												</span>
											</p>
										{/if}
										{#if license.dailyPrice > 0}
											<div class="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
												<div class="text-xs text-neutral-500">
													Стоимость: <span class="font-semibold text-neutral-950"
														>{license.dailyPrice}₽/день</span
													>
												</div>
												{#if new Date(license.billingStartedAt) > new Date()}
													<div class="text-xs text-neutral-500">
														<span
															class="rounded-full bg-blue-50 px-2 py-0.5 font-medium text-blue-700"
														>
															Тестовый период до {new Date(
																license.billingStartedAt
															).toLocaleDateString()}
														</span>
													</div>
												{/if}
											</div>
										{/if}
									</div>
									<div class="flex shrink-0 items-start">
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
									</div>
								</div>

								<div class="flex flex-col gap-4 border-t border-neutral-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
									<p class="min-w-0 break-words text-sm text-neutral-600">
										{license.domain && !license.domain.includes('pending-') ? license.domain : 'Домен не назначен'}
									</p>
									<Button href="/lk/sites/{license.id}" class="w-full sm:w-auto px-5 py-2 text-sm font-semibold shrink-0 justify-center">
										Настройки
									</Button>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</FadeIn>
		{/if}
	</FadeInStagger>
</Container>
