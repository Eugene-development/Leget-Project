<script>
	import Container from '$lib/components/Container.svelte';
	import FadeIn from '$lib/components/FadeIn.svelte';
	import PageIntro from '$lib/components/PageIntro.svelte';
	import Border from '$lib/components/Border.svelte';
	import ContactSection from '$lib/components/ContactSection.svelte';
	import { toastState } from '$lib/state/toast.svelte.js';

	// Requisites data
	const requisites = {
		name: 'ИП Челноков Евгений Викторович',
		inn: '524914233604',
		ogrnip: '325527500040146',
		address: 'Нижегородская область, городской округ город Дзержинск, город Дзержинск, проспект Свердлова, дом 24А',
		bankName: 'ООО "Банк Точка" г. Москва',
		bik: '044525104',
		account: '4080 2810 7200 0059 4999',
		corrAccount: '3010 1810 7453 7452 5104'
	};

	// Copy function helper
	async function copyToClipboard(text, label) {
		try {
			await navigator.clipboard.writeText(text);
			toastState.success(`${label} скопировано в буфер обмена`);
		} catch (err) {
			console.error('Failed to copy: ', err);
			toastState.error('Не удалось скопировать');
		}
	}

	// Full requisites formatted for quick copying
	const allRequisitesText = `Индивидуальный предприниматель Челноков Евгений Викторович
ИНН: ${requisites.inn}
ОГРНИП: ${requisites.ogrnip}
Адрес: ${requisites.address}

Банковские реквизиты:
Расчетный счет: ${requisites.account}
Название банка: ${requisites.bankName}
БИК: ${requisites.bik}
Корреспондентский счет: ${requisites.corrAccount}`;

	function copyAll() {
		copyToClipboard(allRequisitesText, 'Все реквизиты');
	}
</script>

<svelte:head>
	<title>Реквизиты компании — LEGET</title>
	<meta
		name="description"
		content="Карточка реквизитов ИП Челноков Евгений Викторович. Информация о расчетном счете, банке, ИНН и ОГРНИП компании LEGET."
	/>
</svelte:head>

<PageIntro eyebrow="Информация о компании" title="Реквизиты">
	<p>
		Здесь представлены актуальные юридические и банковские реквизиты нашей компании. Вы можете скопировать отдельные поля или всю карточку целиком.
	</p>
</PageIntro>

<Container class="mt-16 sm:mt-24 lg:mt-32">
	<FadeIn>
		<div class="max-w-4xl mx-auto">
			<!-- Top bar with Quick Copy -->
			<div class="flex justify-end mb-8">
				<button
					type="button"
					onclick={copyAll}
					class="inline-flex items-center gap-2 rounded-2xl bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 focus:outline-hidden focus:ring-2 focus:ring-neutral-950/20"
				>
					<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
					</svg>
					Скопировать все реквизиты
				</button>
			</div>

			<!-- Requisites Details -->
			<div class="flex flex-col gap-8">
				<!-- Snippet to reuse for table rows -->
				{#snippet RequisiteRow(label, value, copyText = value)}
					<div class="py-4 border-b border-neutral-950/5 last:border-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2 group/row transition duration-200">
						<div class="text-sm font-medium text-neutral-500">{label}</div>
						<div class="flex items-center gap-2 max-w-full">
							<span class="text-sm text-neutral-950 font-mono break-all text-right select-all">{value}</span>
							<button
								type="button"
								onclick={() => copyToClipboard(copyText.replace(/\s/g, ''), label)}
								class="shrink-0 p-1.5 rounded-lg text-neutral-400 hover:text-neutral-950 hover:bg-neutral-100 transition-all duration-200 opacity-100 sm:opacity-0 group-hover/row:opacity-100 focus:opacity-100"
								title="Скопировать"
							>
								<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
								</svg>
							</button>
						</div>
					</div>
				{/snippet}

				<!-- Card 1: General Info -->
				<section class="rounded-3xl p-6 md:p-8 border border-neutral-950/5 bg-neutral-50/50 hover:bg-neutral-50 hover:border-neutral-950/10 transition-all duration-300">
					<h2 class="font-display text-xl font-semibold text-neutral-950 mb-6">
						Основная информация
					</h2>
					<div class="divide-y divide-neutral-950/5">
						{@render RequisiteRow('Индивидуальный предприниматель', requisites.name, requisites.name)}
						{@render RequisiteRow('ИНН', requisites.inn)}
						{@render RequisiteRow('ОГРНИП', requisites.ogrnip)}
						<div class="py-4 border-b border-neutral-950/5 last:border-0 flex flex-col gap-2 group/row transition duration-200">
							<div class="text-sm font-medium text-neutral-500">Юридический адрес</div>
							<div class="flex items-start justify-between gap-2">
								<span class="text-sm text-neutral-950 leading-relaxed select-all">{requisites.address}</span>
								<button
									type="button"
									onclick={() => copyToClipboard(requisites.address, 'Юридический адрес')}
									class="shrink-0 p-1.5 rounded-lg text-neutral-400 hover:text-neutral-950 hover:bg-neutral-100 transition-all duration-200 opacity-100 sm:opacity-0 group-hover/row:opacity-100 focus:opacity-100"
									title="Скопировать"
								>
									<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
									</svg>
								</button>
							</div>
						</div>
					</div>
				</section>

				<!-- Card 2: Bank Info -->
				<section class="rounded-3xl p-6 md:p-8 border border-neutral-950/5 bg-neutral-50/50 hover:bg-neutral-50 hover:border-neutral-950/10 transition-all duration-300">
					<h2 class="font-display text-xl font-semibold text-neutral-950 mb-6">
						Банковские реквизиты
					</h2>
					<div class="divide-y divide-neutral-950/5">
						{@render RequisiteRow('Название банка', requisites.bankName, requisites.bankName)}
						{@render RequisiteRow('Расчетный счет', requisites.account)}
						{@render RequisiteRow('БИК', requisites.bik)}
						{@render RequisiteRow('Корр. счет', requisites.corrAccount)}
					</div>
				</section>
			</div>

			<!-- Notice / Information -->
			<div class="mt-12 rounded-3xl p-6 md:p-8 border border-amber-950/5 bg-amber-50/20 text-neutral-700 text-sm leading-relaxed">
				<p>
					<strong>Примечание:</strong> При расчетах в безналичном порядке просим вас внимательно сверять указанные реквизиты. В случае возникновения вопросов или необходимости получения счета-договора, пожалуйста, свяжитесь со службой поддержки по электронной почте <a href="mailto:info@leget.ru" class="font-semibold text-neutral-950 hover:underline">info@leget.ru</a>.
				</p>
			</div>
		</div>
	</FadeIn>
</Container>

<ContactSection class="mt-24 sm:mt-32 lg:mt-40" />
