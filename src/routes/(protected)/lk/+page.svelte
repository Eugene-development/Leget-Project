<script>
	import PageIntro from '$lib/components/PageIntro.svelte';
	import Container from '$lib/components/Container.svelte';
	import FadeIn from '$lib/components/FadeIn.svelte';
	import FadeInStagger from '$lib/components/FadeInStagger.svelte';
	import Button from '$lib/components/Button.svelte';
	import { goto } from '$app/navigation';

	let account = $state({
		name: 'Евгений Целноков',
		email: 'evgenij.celnokov@example.com',
		phone: '+7 (999) 123-45-67',
		messenger: '@evgenij_celnokov',
		balance: 15400
	});

	function handleLogout() {
		// Remove authentication data
		localStorage.removeItem('auth_token');
		localStorage.removeItem('email_verified');

		// Redirect to login page
		goto('/login');
	}
</script>

<svelte:head>
	<title>Личный кабинет | LEGET</title>
	<meta name="description" content="Управление аккаунтом и настройками сайта LEGET" />
</svelte:head>

<PageIntro title="Личный кабинет" eyebrow="Профиль и настройки">
	<!-- <p>
		Управляйте своими персональными данными и глобальными параметрами вашего сайта в одном месте.
	</p> -->
</PageIntro>

<Container class="mt-12 mb-24 sm:mt-20 lg:mt-24">
	<FadeInStagger class="flex flex-col gap-y-32">
		<!-- Account Info -->
		<FadeIn>
			<div class="flex max-w-3xl flex-col gap-12">
				<div class="flex items-center justify-between gap-4">
					<div>
						<h2 class="font-display text-3xl font-semibold text-neutral-950">Аккаунт</h2>
						<!-- <p class="mt-4 text-base text-neutral-600">
							Ваша персональная информация и текущий баланс для оплаты услуг.
						</p> -->
					</div>
					<div class="flex gap-3">
						<Button href="/settings" invert>Ваши сайты</Button>
						<Button onclick={handleLogout} class="bg-neutral-600 text-white hover:bg-neutral-700">
							Выйти
						</Button>
					</div>
				</div>

				<div class="space-y-12">
					<!-- Balance at the top -->
					<div
						class="rounded-3xl border border-white/50 bg-neutral-50 p-8 shadow-sm ring-1 ring-neutral-950/5"
					>
						<div class="flex flex-wrap items-center justify-between gap-6">
							<div>
								<p class="text-sm font-semibold text-neutral-600">Баланс на счёте</p>
								<p class="mt-2 text-4xl font-semibold text-neutral-950">
									{account.balance.toLocaleString('ru-RU')} ₽
								</p>
							</div>
							<Button>Пополнить</Button>
						</div>
					</div>

					<!-- Form Fields Grid -->
					<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
						<div class="group relative">
							<label for="owner-name" class="block text-sm font-semibold text-neutral-950"
								>Имя владельца</label
							>
							<input
								type="text"
								id="owner-name"
								bind:value={account.name}
								class="mt-2 block w-full rounded-2xl border-neutral-200 bg-transparent px-4 py-3 text-base text-neutral-950 transition placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-neutral-950/5"
							/>
						</div>

						<div class="group relative">
							<label for="owner-email" class="block text-sm font-semibold text-neutral-950"
								>Почта</label
							>
							<input
								type="email"
								id="owner-email"
								bind:value={account.email}
								class="mt-2 block w-full rounded-2xl border-neutral-200 bg-transparent px-4 py-3 text-base text-neutral-950 transition placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-neutral-950/5"
							/>
						</div>

						<div class="group relative">
							<label for="owner-phone" class="block text-sm font-semibold text-neutral-950"
								>Телефон</label
							>
							<input
								type="tel"
								id="owner-phone"
								bind:value={account.phone}
								class="mt-2 block w-full rounded-2xl border-neutral-200 bg-transparent px-4 py-3 text-base text-neutral-950 transition placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-neutral-950/5"
							/>
						</div>

						<div class="group relative">
							<label for="owner-messenger" class="block text-sm font-semibold text-neutral-950"
								>Мессенджер</label
							>
							<input
								type="text"
								id="owner-messenger"
								bind:value={account.messenger}
								class="mt-2 block w-full rounded-2xl border-neutral-200 bg-transparent px-4 py-3 text-base text-neutral-950 transition placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-neutral-950/5"
							/>
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
