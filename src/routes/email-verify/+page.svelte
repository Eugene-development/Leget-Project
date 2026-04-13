<script>
	import Container from '$lib/components/Container.svelte';
	import FadeIn from '$lib/components/FadeIn.svelte';
	import { getAuthApiUrl } from '$lib/utils/config.js';
	import { page } from '$app/stores';

	// States
	let status = $state('loading'); // 'loading' | 'success' | 'already' | 'error'
	let errorMessage = $state('');

	$effect(() => {
		const params = $page.url.searchParams;
		const id = params.get('id');
		const hash = params.get('hash');

		if (!id || !hash) {
			status = 'error';
			errorMessage = 'Неверная ссылка подтверждения. Параметры отсутствуют.';
			return;
		}

		verifyEmail(id, hash);
	});

	async function verifyEmail(id, hash) {
		status = 'loading';
		try {
			const authApiUrl = getAuthApiUrl();
			const response = await fetch(`${authApiUrl}/auth/email-verify/${id}/${hash}`, {
				method: 'GET',
				headers: { Accept: 'application/json' }
			});

			const result = await response.json();

			if (!response.ok || !result.success) {
				status = 'error';
				errorMessage = result.message || 'Ошибка подтверждения email.';
				return;
			}

			if (result.message && result.message.includes('уже')) {
				status = 'already';
			} else {
				status = 'success';
				// Update local verification status
				localStorage.setItem('email_verified', '1');
			}
		} catch (err) {
			console.error('Email verification error:', err);
			status = 'error';
			errorMessage = 'Не удалось подтвердить email. Проверьте соединение с интернетом и попробуйте ещё раз.';
		}
	}
</script>

<svelte:head>
	<title>Подтверждение Email — LEGET</title>
	<meta name="description" content="Подтверждение адреса электронной почты для активации аккаунта LEGET" />
</svelte:head>

<Container class="mt-24 sm:mt-32 lg:mt-40">
	<div class="mx-auto max-w-xl">
		<FadeIn>
			{#if status === 'loading'}
				<!-- Loading state -->
				<div class="text-center py-16">
					<div class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
						<svg class="h-8 w-8 animate-spin text-neutral-500" fill="none" viewBox="0 0 24 24">
							<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
							<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
						</svg>
					</div>
					<h1 class="font-display text-2xl font-semibold text-neutral-950">Подтверждаем email...</h1>
					<p class="mt-3 text-base text-neutral-600">Пожалуйста, подождите.</p>
				</div>

			{:else if status === 'success'}
				<!-- Success state -->
				<div class="text-center py-16">
					<div class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
						<svg class="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</div>
					<h1 class="font-display text-3xl font-semibold text-neutral-950">Email подтверждён!</h1>
					<p class="mt-4 text-lg text-neutral-600">
						Ваш аккаунт активирован. Теперь вы можете войти в личный кабинет.
					</p>
					<div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
						<a
							href="/lk"
							id="go-to-lk-btn"
							class="inline-flex items-center gap-2 rounded-full bg-neutral-950 px-8 py-4 text-sm font-semibold text-white hover:bg-neutral-800 transition-all duration-200"
						>
							Перейти в личный кабинет
							<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
							</svg>
						</a>
						<a href="/" class="text-sm font-semibold text-neutral-600 hover:text-neutral-950 transition">
							На главную
						</a>
					</div>
				</div>

			{:else if status === 'already'}
				<!-- Already verified -->
				<div class="text-center py-16">
					<div class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
						<svg class="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</div>
					<h1 class="font-display text-3xl font-semibold text-neutral-950">Уже подтверждён</h1>
					<p class="mt-4 text-lg text-neutral-600">
						Ваш email уже был подтверждён ранее. Вы можете войти в личный кабинет.
					</p>
					<div class="mt-8">
						<a
							href="/lk"
							class="inline-flex items-center gap-2 rounded-full bg-neutral-950 px-8 py-4 text-sm font-semibold text-white hover:bg-neutral-800 transition"
						>
							Перейти в личный кабинет
						</a>
					</div>
				</div>

			{:else if status === 'error'}
				<!-- Error state -->
				<div class="text-center py-16">
					<div class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
						<svg class="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</div>
					<h1 class="font-display text-3xl font-semibold text-neutral-950">Ошибка подтверждения</h1>
					<p class="mt-4 text-base text-neutral-600">
						{errorMessage || 'Не удалось подтвердить email. Ссылка может быть устаревшей или недействительной.'}
					</p>
					<div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
						<a
							href="/register"
							class="inline-flex items-center gap-2 rounded-full bg-neutral-950 px-8 py-4 text-sm font-semibold text-white hover:bg-neutral-800 transition"
						>
							Зарегистрироваться заново
						</a>
						<a href="/login" class="text-sm font-semibold text-neutral-600 hover:text-neutral-950 transition">
							Войти в аккаунт
						</a>
					</div>
				</div>
			{/if}
		</FadeIn>
	</div>
</Container>
