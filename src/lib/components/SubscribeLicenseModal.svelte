<script>
	import { getAuthToken } from '$lib/utils/auth-session.js';
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
	 *   selectTemplate - allow choosing a template before creating a license
	 *   onClose      - callback when modal is closed
	 *   onSuccess    - callback(licenseId) after successful subscription
	 */

	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { graphqlRequest } from '$lib/utils/graphql-client.js';
	import { formatDate } from '$lib/formatDate.js';

	let {
		open = false,
		templateId = null,
		templateName = 'шаблон',
		price = '150',
		period = 'день',
		selectTemplate = false,
		onClose = () => {},
		onSuccess = () => {}
	} = $props();

	const templates = [
		{ id: 1, name: 'Promo-1', description: 'Для мебели на заказ', price: '150' },
		{ id: 2, name: 'Promo-2', description: 'Для мебельных фабрик', price: '150' },
		{ id: 3, name: 'Promo-3', description: 'Для плитки и коллекций', price: '150' }
	];
	let selectedTemplateId = $state(1);
	const selectedTemplate = $derived(
		templates.find((template) => template.id === selectedTemplateId)
	);
	const subscriptionTemplateId = $derived(selectTemplate ? selectedTemplateId : templateId);
	const subscriptionTemplateName = $derived(selectTemplate ? selectedTemplate.name : templateName);
	const subscriptionPrice = $derived(selectTemplate ? selectedTemplate.price : price);

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
		mutation CreateLicense($templateId: Int!, $creationKey: String!) {
			createLicense(templateId: $templateId, creationKey: $creationKey) {
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
			const token = getAuthToken();
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
			const rawLicenses = data.myLicenses ?? [];
			licenses = [...rawLicenses].sort((a, b) => {
				const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
				const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
				return timeB - timeA;
			});
		} catch (err) {
			error = err.message || 'Не удалось загрузить список сайтов';
		} finally {
			isLoading = false;
		}
	}

	/** Create a brand-new license with this template and go to LK */
	async function createAndSubscribe() {
		if (isSaving || (selectTemplate && !selectedTemplate)) return;
		isSaving = true;
		error = null;
		try {
			const storageKey = `license-create:${subscriptionTemplateId}`;
			const creationKey = sessionStorage.getItem(storageKey) || crypto.randomUUID();
			sessionStorage.setItem(storageKey, creationKey);
			const data = await graphqlRequest(CREATE_LICENSE_MUTATION, {
				templateId: subscriptionTemplateId,
				creationKey
			});
			sessionStorage.removeItem(storageKey);
			const licenseId = data.createLicense.id;
			successLicenseId = licenseId;
			onSuccess(licenseId);
			// Redirect to site list
			goto('/lk/sites');
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

	function mountDialog(node) {
		const previousFocus = document.activeElement;
		const previousOverflow = document.body.style.overflow;
		// Keep the dialog above the layout's isolated content and header.
		document.body.appendChild(node);
		document.body.style.overflow = 'hidden';
		node.focus();
		function trapFocus(event) {
			if (event.key !== 'Tab') return;
			const controls = node.querySelectorAll('button:not([disabled]), select:not([disabled])');
			const first = controls[0];
			const last = controls[controls.length - 1];
			if (event.shiftKey && (document.activeElement === first || document.activeElement === node)) {
				event.preventDefault();
				last?.focus();
			} else if (
				!event.shiftKey &&
				(document.activeElement === last || document.activeElement === node)
			) {
				event.preventDefault();
				first?.focus();
			}
		}
		node.addEventListener('keydown', trapFocus);
		return {
			destroy() {
				node.removeEventListener('keydown', trapFocus);
				node.remove();
				document.body.style.overflow = previousOverflow;
				if (previousFocus instanceof HTMLElement && previousFocus.isConnected)
					previousFocus.focus();
			}
		};
	}
</script>

{#if open}
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<div
		role="dialog"
		aria-modal="true"
		aria-label={selectTemplate ? 'Добавить лицензию' : `Подписка на шаблон ${templateName}`}
		tabindex="-1"
		use:mountDialog
		class="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/75 px-4 backdrop-blur-sm"
		onclick={handleBackdropClick}
		onkeydown={handleKeydown}
	>
		<div class="flex max-h-[90vh] w-full max-w-lg flex-col rounded-3xl bg-white p-8 shadow-2xl">
			<!-- Header -->
			<div class="mb-6 flex shrink-0 items-start justify-between gap-4">
				<div>
					<h2 class="font-display text-xl font-semibold text-neutral-950">
						{#if selectTemplate}
							Добавить лицензию
						{:else}
							Шаблон «{templateName}» — {price} ₽/{period}
						{/if}
					</h2>
					<p class="mt-1 text-sm text-neutral-500">
						При создании нового сайта начинаются 72 часа без списаний. Первое списание запланировано
						на ближайшие 06:30 по Москве после завершения тестового периода, далее — ежедневно.
						Чтобы остановить будущие списания, отмените лицензию в настройках сайта.
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

			<!-- Content Area (Scrollable) -->
			<div class="min-h-0 flex-1 overflow-y-auto pr-1">
				{#if selectTemplate}
					<div class="mb-6">
						<label for="subscription-template" class="block text-sm font-medium text-neutral-950">
							Выберите шаблон
						</label>
						<select
							id="subscription-template"
							bind:value={selectedTemplateId}
							disabled={isSaving}
							aria-describedby="subscription-template-price"
							class="mt-2 w-full rounded-lg border border-neutral-300 bg-white py-2.5 pr-10 pl-3 text-sm text-neutral-950 focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/60 disabled:opacity-50"
						>
							{#each templates as template (template.id)}
								<option value={template.id}>
									{template.name} — {template.description}
								</option>
							{/each}
						</select>
						<p
							id="subscription-template-price"
							class="mt-3 text-sm text-neutral-600"
							aria-live="polite"
						>
							Шаблон «{subscriptionTemplateName}» —
							<span class="font-semibold text-neutral-950">{subscriptionPrice} ₽/{period}</span>
						</p>
					</div>
				{/if}
				{#if isLoading}
					<div class="flex items-center justify-center py-10">
						<svg class="h-7 w-7 animate-spin text-neutral-400" fill="none" viewBox="0 0 24 24">
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
						<span class="ml-3 text-sm text-neutral-500">Загрузка...</span>
					</div>
				{:else if error}
					<div
						role="alert"
						class="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-600"
					>
						{error}
						<button
							type="button"
							onclick={loadLicenses}
							class="mt-3 block rounded-sm font-semibold underline focus:ring-2 focus:ring-red-700 focus:ring-offset-2"
						>
							Попробовать снова
						</button>
					</div>
				{:else}
					<!-- Option to create a new license -->
					<div class="mb-6 border-b border-neutral-100 pb-6">
						<button
							onclick={createAndSubscribe}
							disabled={isSaving}
							class="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 disabled:opacity-50"
						>
							{isSaving ? 'Создаём...' : '+ Создать новый сайт с этим шаблоном'}
						</button>
					</div>

					{@const filteredLicenses = licenses.filter(
						(l) => l.templateId === subscriptionTemplateId && l.isActive && l.status === 'active'
					)}
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
											{license.name || 'Новый сайт'}
										</p>
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
							<p class="text-sm text-neutral-500">
								У вас пока нет сайтов, использующих этот шаблон.
							</p>
						</div>
					{/if}
				{/if}
			</div>

			<!-- Footer -->
			<div class="mt-6 flex shrink-0 justify-end">
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
