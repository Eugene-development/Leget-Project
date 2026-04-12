<script>
	import PageIntro from '$lib/components/PageIntro.svelte';
	import Container from '$lib/components/Container.svelte';
	import FadeIn from '$lib/components/FadeIn.svelte';
	import FadeInStagger from '$lib/components/FadeInStagger.svelte';
	import Button from '$lib/components/Button.svelte';

	let account = $state({
		name: 'Евгений Целноков',
		email: 'evgenij.celnokov@example.com',
		phone: '+7 (999) 123-45-67',
		balance: 15400
	});

	let siteSettings = $state({
		logo: '',
		name: 'LEGET Development',
		phones: ['+7 (999) 000-00-01'],
		emails: ['info@leget.ru'],
		addresses: ['г. Москва, ул. Пушкина, д. Колотушкина']
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
	<title>Личный кабинет | LEGET</title>
	<meta name="description" content="Управление аккаунтом и настройками сайта LEGET" />
</svelte:head>

<PageIntro title="Личный кабинет" eyebrow="Профиль и настройки">
	<p>Управляйте своими персональными данными и глобальными параметрами вашего сайта в одном месте.</p>
</PageIntro>

<Container class="mt-24 sm:mt-32 lg:mt-40 mb-24">
	<FadeInStagger class="grid grid-cols-1 gap-x-12 gap-y-24 lg:grid-cols-2">
		<!-- Account Info -->
		<FadeIn>
			<div class="flex flex-col gap-12">
				<div>
					<h2 class="font-display text-3xl font-semibold text-neutral-950">Аккаунт</h2>
					<p class="mt-4 text-base text-neutral-600">Ваша персональная информация и текущий баланс для оплаты услуг.</p>
				</div>

				<div class="space-y-8">
					<div class="group relative">
						<label for="owner-name" class="block text-sm font-semibold text-neutral-950">Имя владельца</label>
						<input
							type="text"
							id="owner-name"
							bind:value={account.name}
							class="mt-2 block w-full rounded-2xl border-neutral-200 bg-transparent px-4 py-3 text-base text-neutral-950 placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-neutral-950/5 transition"
						/>
					</div>

					<div class="group relative">
						<label for="owner-email" class="block text-sm font-semibold text-neutral-950">Почта</label>
						<input
							type="email"
							id="owner-email"
							bind:value={account.email}
							class="mt-2 block w-full rounded-2xl border-neutral-200 bg-transparent px-4 py-3 text-base text-neutral-950 placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-neutral-950/5 transition"
						/>
					</div>

					<div class="group relative">
						<label for="owner-phone" class="block text-sm font-semibold text-neutral-950">Телефон</label>
						<input
							type="tel"
							id="owner-phone"
							bind:value={account.phone}
							class="mt-2 block w-full rounded-2xl border-neutral-200 bg-transparent px-4 py-3 text-base text-neutral-950 placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-neutral-950/5 transition"
						/>
					</div>

					<div class="rounded-3xl bg-neutral-50 p-8 shadow-sm ring-1 ring-neutral-950/5 border border-white/50">
						<div class="flex flex-wrap items-center justify-between gap-6">
							<div>
								<p class="text-sm font-semibold text-neutral-600">Баланс на счёте</p>
								<p class="mt-2 text-4xl font-semibold text-neutral-950">{account.balance.toLocaleString('ru-RU')} ₽</p>
							</div>
							<Button>
								Пополнить
							</Button>
						</div>
					</div>
				</div>
			</div>
		</FadeIn>

		<!-- Site Settings -->
		<FadeIn>
			<div class="flex flex-col gap-12">
				<div>
					<h2 class="font-display text-3xl font-semibold text-neutral-950">Настройки сайта</h2>
					<p class="mt-4 text-base text-neutral-600">Глобальные параметры отображения и контактные данные вашего проекта.</p>
				</div>

				<div class="space-y-8">
					<!-- Logo Section -->
					<div class="group relative">
						<label class="block text-sm font-semibold text-neutral-950">Логотип</label>
						<div class="mt-4 flex items-center gap-8">
							<div class="flex size-24 items-center justify-center rounded-2xl bg-neutral-100 ring-1 ring-neutral-950/5 overflow-hidden shadow-inner">
								{#if siteSettings.logo}
									<img src={siteSettings.logo} alt="Logo" class="size-full object-contain" />
								{:else}
									<svg class="size-8 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
									</svg>
								{/if}
							</div>
							<div class="flex flex-col gap-2">
								<Button invert={true} class="text-xs">
									Загрузить новый
								</Button>
								<p class="text-xs text-neutral-500">SVG, PNG или JPG. Минимум 200x200px.</p>
							</div>
						</div>
					</div>

					<div class="group relative">
						<label for="site-name" class="block text-sm font-semibold text-neutral-950">Название</label>
						<input
							type="text"
							id="site-name"
							bind:value={siteSettings.name}
							class="mt-2 block w-full rounded-2xl border-neutral-200 bg-transparent px-4 py-3 text-base text-neutral-950 placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-neutral-950/5 transition"
						/>
					</div>

					<!-- Array: Phones -->
					<div class="group relative">
						<div class="flex items-center justify-between mb-2">
							<label class="block text-sm font-semibold text-neutral-950">Телефоны</label>
							<button type="button" onclick={addPhone} class="text-xs font-semibold text-neutral-950 hover:text-neutral-600 transition flex items-center gap-1">
								<svg xmlns="http://www.w3.org/2000/svg" class="size-3" viewBox="0 0 20 20" fill="currentColor">
									<path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
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
										class="block w-full rounded-2xl border-neutral-200 bg-transparent px-4 py-3 text-base text-neutral-950 placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-neutral-950/5 transition"
									/>
									<button 
										type="button" 
										onclick={() => removePhone(i)} 
										class="p-2 text-neutral-400 hover:text-red-500 transition rounded-full hover:bg-red-50"
										title="Удалить"
									>
										<svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 20 20" fill="currentColor">
											<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
										</svg>
									</button>
								</div>
							{/each}
						</div>
					</div>

					<!-- Array: Emails -->
					<div class="group relative">
						<div class="flex items-center justify-between mb-2">
							<label class="block text-sm font-semibold text-neutral-950">Почта (Email)</label>
							<button type="button" onclick={addEmail} class="text-xs font-semibold text-neutral-950 hover:text-neutral-600 transition flex items-center gap-1">
								<svg xmlns="http://www.w3.org/2000/svg" class="size-3" viewBox="0 0 20 20" fill="currentColor">
									<path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
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
										class="block w-full rounded-2xl border-neutral-200 bg-transparent px-4 py-3 text-base text-neutral-950 placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-neutral-950/5 transition"
									/>
									<button 
										type="button" 
										onclick={() => removeEmail(i)} 
										class="p-2 text-neutral-400 hover:text-red-500 transition rounded-full hover:bg-red-50"
										title="Удалить"
									>
										<svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 20 20" fill="currentColor">
											<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
										</svg>
									</button>
								</div>
							{/each}
						</div>
					</div>

					<!-- Array: Addresses -->
					<div class="group relative">
						<div class="flex items-center justify-between mb-2">
							<label class="block text-sm font-semibold text-neutral-950">Адреса</label>
							<button type="button" onclick={addAddress} class="text-xs font-semibold text-neutral-950 hover:text-neutral-600 transition flex items-center gap-1">
								<svg xmlns="http://www.w3.org/2000/svg" class="size-3" viewBox="0 0 20 20" fill="currentColor">
									<path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
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
										class="block w-full rounded-2xl border-neutral-200 bg-transparent px-4 py-3 text-base text-neutral-950 placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-neutral-950/5 transition resize-none"
									></textarea>
									<button 
										type="button" 
										onclick={() => removeAddress(i)} 
										class="mt-3 p-2 text-neutral-400 hover:text-red-500 transition rounded-full hover:bg-red-50"
										title="Удалить"
									>
										<svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 20 20" fill="currentColor">
											<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
										</svg>
									</button>
								</div>
							{/each}
						</div>
					</div>
				</div>

				<div class="pt-12 border-t border-neutral-100">
					<Button class="w-full sm:w-auto">
						Сохранить изменения
					</Button>
				</div>
			</div>
		</FadeIn>
	</FadeInStagger>
</Container>
