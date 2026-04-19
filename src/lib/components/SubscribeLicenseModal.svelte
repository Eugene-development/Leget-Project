<script>
	/**
	 * Modal for subscribing a license to a template.
	 *
	 * Props:
	 *   open        - whether the modal is visible
	 *   templateId  - numeric template ID (2 = promo-1, 3 = promo-2)
	 *   templateName - human-readable template name shown in the modal
	 *   onClose     - callback when modal is closed
	 *   onSuccess   - callback(licenseId) after successful subscription
	 */

	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { graphqlRequest } from '$lib/utils/graphql-client.js';

	let {
		open = false,
		templateId,
		templateName = 'шаблон',
		onClose = () => {},
		onSuccess = () => {}
	} = $props();

	const MY_LICENSES_QUERY = `
		query MyLicenses {
			myLicenses {
				id
				domain
				name
				templateId
				isActive
				status
			}
		}
	`;

	const UPDATE_LICENSE_MUTATION = `
		mutation UpdateLicense($id: ID!, $templateId: Int!) {
			updateLicense(id: $id, templateId: $templateId) {
				id
				templateId
			}
		}
	`;

	let licenses = $state([]);
	let isLoading = $state(false);
	let isSaving = $state(false);
	let error = $state(null);
	let successLicenseId = $state(null);

	// Fetch licenses when modal opens
	$effect(() => {
		if (open && browser) {
			const token = localStorage.getItem('auth_token');
			if (!token) {
				// Not logged in — redirect to login with return URL
				const returnUrl = encodeURIComponent(window.location.pathname);
				goto(`/login?redirect=${returnUrl}`);
				onClose();
				return;
			}
			loadLicenses();
		}
	});

	async function loadLicenses() {
		isLoading = true;
		error = null;
		successLicenseId = null;
		try {
			const data = await graphqlRequest(MY_LICENSES_QUERY);
			licenses = data.myLicenses ?? [];
		} catch (err) {
			error = err.message || 'Не удалось загрузить список сайтов';
		} finally {
			isLoading = false;
		}
	}

	async function subscribe(licenseId) {
		isSaving = true;
		error = null;
		try {
			await graphqlRequest(UPDATE_LICENSE_MUTATION, { id: licenseId, templateId });
			successLicenseId = licenseId;
			onSuccess(licenseId);
		} catch (err) {
			error = err.message || 'Не удалось применить шаблон';
		} finally {
			isSaving = false;
		}
	}

	function handleBackdropClick(e) {
		if (e.target === e.currentTarget) onClose();
	}

	function handleKeydown(e) {
		if (e.key === 'Escape') onClose();
	}
</script>

{#if open}
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<!-- Backdrop -->
	<div
		role="dialog"
		aria-modal="true"
		aria-label="Выбор лицензии для подписки"
		tabindex="-1"
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
		onclick={handleBackdropClick}
		onkeydown={handleKeydown}
	>
		<!-- Modal panel -->
		<div class="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl">
			<!-- Header -->
			<div class="mb-6 flex items-start justify-between gap-4">
				<div>
					<h2 class="font-display text-xl font-semibold text-neutral-950">
						Подписаться на лицензию
					</h2>
					<p class="mt-1 text-sm text-neutral-500">
						Выберите сайт, которому хотите назначить шаблон «{templateName}»
					</p>
				</div>
				<button
					onclick={onClose}
					class="shrink-0 rounded-full p-1.5 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700"
					aria-label="Закрыть"
				>
					<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			<!-- Content -->
			{#if isLoading}
				<div class="flex items-center justify-center py-10">
					<svg class="h-7 w-7 animate-spin text-neutral-400" fill="none" viewBox="0 0 24 24">
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
						<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
					</svg>
					<span class="ml-3 text-sm text-neutral-500">Загрузка сайтов...</span>
				</div>

			{:else if error}
				<div class="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-600">
					{error}
				</div>

			{:else if licenses.length === 0}
				<div class="rounded-2xl border border-neutral-100 bg-neutral-50 p-6 text-center">
					<p class="text-sm text-neutral-600">У вас пока нет сайтов.</p>
					<a
						href="/lk/sites"
						class="mt-3 inline-block text-sm font-semibold text-neutral-950 underline hover:text-neutral-700"
					>
						Перейти в личный кабинет
					</a>
				</div>

			{:else}
				<ul class="flex flex-col gap-3">
					{#each licenses as license (license.id)}
						<li class="flex items-center justify-between gap-4 rounded-2xl border border-neutral-100 bg-neutral-50 px-5 py-4">
							<div class="min-w-0">
								<p class="truncate font-medium text-neutral-950">
									{license.name || license.domain}
								</p>
								<p class="truncate text-xs text-neutral-500">{license.domain}</p>
								{#if license.templateId === templateId}
									<span class="mt-1 inline-block text-xs font-medium text-green-600">
										✓ Уже использует этот шаблон
									</span>
								{/if}
							</div>
							{#if successLicenseId === license.id}
								<span class="shrink-0 text-sm font-semibold text-green-600">Применено ✓</span>
							{:else}
								<button
									onclick={() => subscribe(license.id)}
									disabled={isSaving || license.templateId === templateId}
									class="shrink-0 rounded-lg bg-neutral-950 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-50"
								>
									{license.templateId === templateId ? 'Выбран' : 'Выбрать'}
								</button>
							{/if}
						</li>
					{/each}
				</ul>
			{/if}

			<!-- Footer -->
			<div class="mt-6 flex justify-end">
				<button
					onclick={onClose}
					class="rounded-lg border border-neutral-200 px-5 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
				>
					Закрыть
				</button>
			</div>
		</div>
	</div>
{/if}
