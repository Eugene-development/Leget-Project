<script>
	import PageIntro from '$lib/components/PageIntro.svelte';
	import Container from '$lib/components/Container.svelte';
	import FadeIn from '$lib/components/FadeIn.svelte';
	import FadeInStagger from '$lib/components/FadeInStagger.svelte';
	import Button from '$lib/components/Button.svelte';

	let siteSettings = $state({
		logo: '',
		name: 'LEGET Development',
		city: 'Москва',
		domain: 'leget.ru',
		phones: ['+7 (999) 000-00-01'],
		emails: ['info@leget.ru'],
		addresses: ['г. Москва, ул. Пушкина, д. Колотушкина'],
		yandex_metrica: '',
		google_analytics: ''
	});

	function addPhone() {
		siteSettings.phones.push('');
	}

	function removePhone(index) {
		siteSettings.phones = siteSettings.phones.filter((_, i) => i !== index);
	}

	function addEmail() {
		siteSettings.emails.push('');
	}

	function removeEmail(index) {
		siteSettings.emails = siteSettings.emails.filter((_, i) => i !== index);
	}

	function addAddress() {
		siteSettings.addresses.push('');
	}

	function removeAddress(index) {
		siteSettings.addresses = siteSettings.addresses.filter((_, i) => i !== index);
	}
</script>

<svelte:head>
	<title>Настройки сайта | LEGET</title>
	<meta name="description" content="Управление глобальными параметрами вашего сайта на LEGET" />
</svelte:head>

<PageIntro title="Настройки сайтов" eyebrow="Конфигурация">
	<!-- <p>Управляйте логотипом, контактными данными и другими параметрами отображения вашего проекта.</p> -->
</PageIntro>

<Container class="mt-12 mb-24 sm:mt-20 lg:mt-24">
	<FadeInStagger>
		<FadeIn>
			<div class="flex max-w-3xl flex-col gap-12">
				<div class="space-y-8">
					<!-- Logo Section -->
					<div class="group relative">
						<span class="block text-sm font-semibold text-neutral-950">Логотип</span>
						<div class="mt-4 flex items-center gap-8">
							<div
								class="flex size-24 items-center justify-center overflow-hidden rounded-2xl bg-neutral-100 shadow-inner ring-1 ring-neutral-950/5"
							>
								{#if siteSettings.logo}
									<img src={siteSettings.logo} alt="Logo" class="size-full object-contain" />
								{:else}
									<svg
										class="size-8 text-neutral-300"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="1.5"
											d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
										/>
									</svg>
								{/if}
							</div>
							<div class="flex flex-col gap-2">
								<Button invert={true} class="text-xs">Загрузить новый</Button>
								<p class="text-xs text-neutral-500">SVG, PNG или JPG. Минимум 200x200px.</p>
							</div>
						</div>
					</div>

					<div class="group relative">
						<label for="site-name" class="block text-sm font-semibold text-neutral-950"
							>Название</label
						>
						<input
							type="text"
							id="site-name"
							bind:value={siteSettings.name}
							class="mt-2 block w-full rounded-2xl border-neutral-200 bg-transparent px-4 py-3 text-base text-neutral-950 transition placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-neutral-950/5"
						/>
					</div>

					<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
						<div class="group relative">
							<div class="flex items-center gap-2">
								<label for="site-city" class="block text-sm font-semibold text-neutral-950"
									>Город</label
								>
								<div class="group/tooltip relative">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="size-4 cursor-help text-neutral-400 transition hover:text-neutral-600"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
									<div
										class="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 hidden w-48 -translate-x-1/2 rounded-xl bg-neutral-900 p-3 text-center text-[11px] leading-snug text-white shadow-2xl group-hover/tooltip:block"
									>
										На каждый город мы даём только одну подписку на сайт
										<div
											class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-neutral-900"
										></div>
									</div>
								</div>
							</div>
							<input
								type="text"
								id="site-city"
								bind:value={siteSettings.city}
								placeholder="Напр. Москва"
								class="mt-2 block w-full rounded-2xl border-neutral-200 bg-transparent px-4 py-3 text-base text-neutral-950 transition placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-neutral-950/5"
							/>
						</div>

						<div class="group relative">
							<label for="site-domain" class="block text-sm font-semibold text-neutral-950"
								>Домен сайта</label
							>
							<input
								type="text"
								id="site-domain"
								bind:value={siteSettings.domain}
								placeholder="example.ru"
								class="mt-2 block w-full rounded-2xl border-neutral-200 bg-transparent px-4 py-3 text-base text-neutral-950 transition placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-neutral-950/5"
							/>
						</div>
					</div>

					<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
						<div class="group relative">
							<label for="yandex-metrica" class="block text-sm font-semibold text-neutral-950"
								>Яндекс Метрика</label
							>
							<input
								type="text"
								id="yandex-metrica"
								bind:value={siteSettings.yandex_metrica}
								placeholder="ID счётчика (напр. 12345678)"
								class="mt-2 block w-full rounded-2xl border-neutral-200 bg-transparent px-4 py-3 text-base text-neutral-950 transition placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-neutral-950/5"
							/>
						</div>

						<div class="group relative">
							<label for="google-analytics" class="block text-sm font-semibold text-neutral-950"
								>Google Analytics</label
							>
							<input
								type="text"
								id="google-analytics"
								bind:value={siteSettings.google_analytics}
								placeholder="ID отслеживания (напр. G-XXXXXXXXXX)"
								class="mt-2 block w-full rounded-2xl border-neutral-200 bg-transparent px-4 py-3 text-base text-neutral-950 transition placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-neutral-950/5"
							/>
						</div>
					</div>

					<!-- Array: Phones -->
					<div class="group relative">
						<div class="mb-2 flex items-center justify-between">
							<span class="block text-sm font-semibold text-neutral-950">Телефоны</span>
							<button
								type="button"
								onclick={addPhone}
								class="flex items-center gap-1 text-xs font-semibold text-neutral-950 transition hover:text-neutral-600"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="size-3"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fill-rule="evenodd"
										d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
										clip-rule="evenodd"
									/>
								</svg>
								Добавить
							</button>
						</div>
						<div class="space-y-3">
							{#each siteSettings.phones as _, i}
								<div class="flex items-center gap-3">
									<input
										type="tel"
										bind:value={siteSettings.phones[i]}
										placeholder="+7 (___) ___-__-__"
										aria-label="Номер телефона {i + 1}"
										class="block w-full rounded-2xl border-neutral-200 bg-transparent px-4 py-3 text-base text-neutral-950 transition placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-neutral-950/5"
									/>
									<button
										type="button"
										onclick={() => removePhone(i)}
										class="rounded-full p-2 text-neutral-400 transition hover:bg-red-50 hover:text-red-500"
										title="Удалить"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="size-5"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fill-rule="evenodd"
												d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
												clip-rule="evenodd"
											/>
										</svg>
									</button>
								</div>
							{/each}
						</div>
					</div>

					<!-- Array: Emails -->
					<div class="group relative">
						<div class="mb-2 flex items-center justify-between">
							<span class="block text-sm font-semibold text-neutral-950">Почта на сайт</span>
							<button
								type="button"
								onclick={addEmail}
								class="flex items-center gap-1 text-xs font-semibold text-neutral-950 transition hover:text-neutral-600"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="size-3"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fill-rule="evenodd"
										d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
										clip-rule="evenodd"
									/>
								</svg>
								Добавить
							</button>
						</div>
						<div class="space-y-3">
							{#each siteSettings.emails as _, i}
								<div class="flex items-center gap-3">
									<input
										type="email"
										bind:value={siteSettings.emails[i]}
										placeholder="example@mail.com"
										aria-label="Электронная почта {i + 1}"
										class="block w-full rounded-2xl border-neutral-200 bg-transparent px-4 py-3 text-base text-neutral-950 transition placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-neutral-950/5"
									/>
									<button
										type="button"
										onclick={() => removeEmail(i)}
										class="rounded-full p-2 text-neutral-400 transition hover:bg-red-50 hover:text-red-500"
										title="Удалить"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="size-5"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fill-rule="evenodd"
												d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
												clip-rule="evenodd"
											/>
										</svg>
									</button>
								</div>
							{/each}
						</div>
					</div>

					<!-- Array: Addresses -->
					<div class="group relative">
						<div class="mb-2 flex items-center justify-between">
							<span class="block text-sm font-semibold text-neutral-950">Адреса</span>
							<button
								type="button"
								onclick={addAddress}
								class="flex items-center gap-1 text-xs font-semibold text-neutral-950 transition hover:text-neutral-600"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="size-3"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fill-rule="evenodd"
										d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
										clip-rule="evenodd"
									/>
								</svg>
								Добавить
							</button>
						</div>
						<div class="space-y-4">
							{#each siteSettings.addresses as _, i}
								<div class="flex items-start gap-3">
									<textarea
										bind:value={siteSettings.addresses[i]}
										placeholder="Введите адрес..."
										rows="2"
										aria-label="Адрес {i + 1}"
										class="block w-full resize-none rounded-2xl border-neutral-200 bg-transparent px-4 py-3 text-base text-neutral-950 transition placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-neutral-950/5"
									></textarea>
									<button
										type="button"
										onclick={() => removeAddress(i)}
										class="mt-3 rounded-full p-2 text-neutral-400 transition hover:bg-red-50 hover:text-red-500"
										title="Удалить"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="size-5"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fill-rule="evenodd"
												d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
												clip-rule="evenodd"
											/>
										</svg>
									</button>
								</div>
							{/each}
						</div>
					</div>
				</div>

				<div class="border-t border-neutral-100 pt-12">
					<Button class="w-full sm:w-auto">Сохранить изменения</Button>
				</div>
			</div>
		</FadeIn>
	</FadeInStagger>
</Container>
