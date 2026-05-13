<script>
	/**
	 * Modal for subscribing to a license with a chosen template.
	 *
	 * Flow:
	 *   - Not logged in → redirect to /login?redirect=...
	 *   - No licenses → offer to create a new one with this template
	 *   - Has licenses → let user pick which license to assign the template to
	 *
	 * Props:
	 *   open         - whether the modal is visible
	 *   templateId   - numeric template ID (1 = Promo-1, 2 = Promo-2)
	 *   templateName - human-readable template name shown in the modal
	 *   onClose      - callback when modal is closed
	 *   onSuccess    - callback(licenseId) after successful subscription
	 */

	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { graphqlRequest } from '$lib/utils/graphql-client.js';
	import { formatDate } from '$lib/formatDate.js';

	let {
		open = false,
		templateId,
		templateName = 'шаблон',
		price = '170',
		period = 'день',
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
				createdAt
			}
		}
	`;

	const CREATE_LICENSE_MUTATION = `
		mutation CreateLicense($templateId: Int!) {
			createLicense(templateId: $templateId) {
				id
				domain
				templateId
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

	/** Create a brand-new license with this template and go to LK */
	async function createAndSubscribe() {
		isSaving = true;
		error = null;
		try {
			const data = await graphqlRequest(CREATE_LICENSE_MUTATION, { templateId });
			const licenseId = data.createLicense.id;
			successLicenseId = licenseId;
			onSuccess(licenseId);
			// Redirect to site settings so user can set their domain
			goto(`/lk/sites/${licenseId}`);
		} catch (err) {
			error = err.message || 'Не удалось создать лицензию';
		} finally {
			isSaving = false;
		}
	}

	/** Assign this template to an existing license */
	async function subscribe(licenseId) {
		isSaving = true;
		error = null;
		try {
			await graphqlRequest(UPDATE_LICENSE_MUTATION, { id: licenseId, templateId });
			successLicenseId = licenseId;
			onSuccess(licenseId);
			goto(`/lk/sites/${licenseId}`);
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
	<div
		role="dialog"
		aria-modal="true"
		aria-label="Подписка на шаблон {templateName}"
		tabindex="-1"
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
		onclick={handleBackdropClick}
		onkeydown={handleKeydown}
	>
		<div class="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl">
			<!-- Header -->
			<div class="mb-6 flex items-start justify-between gap-4">
				<div>
					<h2 class="font-display text-xl font-semibold text-neutral-950">
						Шаблон «{templateName}» — {price} ₽/{period}
					</h2>
					<p class="mt-1 text-sm text-neutral-500">
						Средства начнут списываться с баланса по истечении 3-дневного тестового периода
					</p>
				</div>
				<button
					onclick={onClose}
					class="shrink-0 rounded-full p-1.5 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700"
					aria-label="Закрыть"
				>
					<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>

			<!-- Content -->
			{#if isLoading}
				<div class="flex items-center justify-center py-10">
					<svg class="h-7 w-7 animate-spin text-neutral-400" fill="none" viewBox="0 0 24 24">
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
						></circle>
						<path
							class="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
						></path>
					</svg>
					<span class="ml-3 text-sm text-neutral-500">Загрузка...</span>
				</div>
			{:else if error}
				<div class="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-600">
					{error}
				</div>
			{:else}
				{@const filteredLicenses = licenses.filter((l) => l.templateId === templateId)}
				{#if filteredLicenses.length > 0}
					<p class="mb-4 text-sm text-neutral-500">
						Ваши сайты, которые уже используют этот шаблон:
					</p>
					<ul class="flex flex-col gap-3">
						{#each filteredLicenses as license (license.id)}
							<li
								class="flex items-center justify-between gap-4 rounded-2xl border border-neutral-100 bg-neutral-50 px-5 py-4"
							>
								<div class="min-w-0">
									<p class="truncate font-medium text-neutral-950">
										{license.name || license.domain}
									</p>
									<p class="truncate text-xs text-neutral-500">{license.domain}</p>
									{#if license.createdAt}
										<p class="mt-1 text-xs text-neutral-500">
											Подписка активна с: {formatDate(license.createdAt)}
										</p>
									{/if}
								</div>
							</li>
						{/each}
					</ul>
				{:else}
					<div class="rounded-2xl border border-neutral-100 bg-neutral-50 p-6 text-center">
						<p class="text-sm text-neutral-500">У вас пока нет сайтов, использующих этот шаблон.</p>
					</div>
				{/if}

				<!-- Option to create a new license -->
				<div class="mt-4 border-t border-neutral-100 pt-4">
					<button
						onclick={createAndSubscribe}
						disabled={isSaving}
						class="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 disabled:opacity-50"
					>
						{isSaving ? 'Создаём...' : '+ Создать новый сайт с этим шаблоном'}
					</button>
				</div>
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
