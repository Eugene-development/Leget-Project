<script>
	import Border from '$lib/components/Border.svelte';
	import Button from '$lib/components/Button.svelte';
	import Container from '$lib/components/Container.svelte';
	import FadeIn from '$lib/components/FadeIn.svelte';
	import PageIntro from '$lib/components/PageIntro.svelte';
	import { getAuthApiUrl } from '$lib/utils/config.js';

	// Form state
	let formData = $state({
		email: '',
		password: ''
	});

	// Validation errors
	let errors = $state({
		email: '',
		password: ''
	});

	// Form submission state
	let isSubmitting = $state(false);
	let submitError = $state('');

	// Generate unique IDs for form fields
	let emailId = $state('');
	let passwordId = $state('');

	$effect(() => {
		emailId = crypto.randomUUID();
		passwordId = crypto.randomUUID();
	});

	// Validate email format
	function isValidEmail(email) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	// Validate form
	function validateForm() {
		let isValid = true;
		errors = { email: '', password: '' };

		if (!formData.email.trim()) {
			errors.email = 'Введите email';
			isValid = false;
		} else if (!isValidEmail(formData.email)) {
			errors.email = 'Введите корректный email';
			isValid = false;
		}

		if (!formData.password.trim()) {
			errors.password = 'Введите пароль';
			isValid = false;
		} else if (formData.password.length < 6) {
			errors.password = 'Пароль должен содержать минимум 6 символов';
			isValid = false;
		}

		return isValid;
	}

	// Handle form submission
	async function handleSubmit(event) {
		event.preventDefault();

		if (!validateForm()) {
			return;
		}

		isSubmitting = true;
		submitError = '';

		try {
			const requestData = {
				email: formData.email.trim(),
				password: formData.password
			};

			const authApiUrl = getAuthApiUrl();
			const response = await fetch(`${authApiUrl}/auth/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify(requestData)
			});

			const result = await response.json();

			if (!response.ok || !result.success) {
				throw new Error(result.message || 'Ошибка входа');
			}

			// Store token if provided
			if (result.token) {
				localStorage.setItem('auth_token', result.token);
			}

			// Redirect to dashboard or home
			window.location.href = '/';
		} catch (err) {
			console.error('Login form submit error:', err);
			submitError =
				err.message || 'Не удалось войти в систему. Проверьте правильность введенных данных.';
		} finally {
			isSubmitting = false;
		}
	}
</script>

<svelte:head>
	<title>Вход в личный кабинет — LEGET</title>
	<meta
		name="description"
		content="Авторизуйтесь в личном кабинете LEGET для управления вашими проектами и доступа к инструментам настройки сайта."
	/>
</svelte:head>

<Container class="mt-24 sm:mt-24 lg:mt-32">
	<div class="mx-auto max-w-2xl">
		<FadeIn>
			<form onsubmit={handleSubmit}>
				<h2 class="font-display text-base font-semibold text-neutral-950">Вход в систему</h2>

				<div class="isolate mt-6 -space-y-px rounded-2xl bg-white/50">
					<!-- Email Input -->
					<div class="group relative z-0 transition-all focus-within:z-10">
						<input
							type="email"
							id={emailId}
							name="email"
							autocomplete="email"
							placeholder=" "
							required
							bind:value={formData.email}
							class="peer block w-full border border-neutral-300 bg-transparent px-6 pt-12 pb-4 text-base/6 text-neutral-950 ring-4 ring-transparent transition focus:border-neutral-950 focus:ring-neutral-950/5 focus:outline-hidden"
							class:border-red-500={errors.email}
						/>
						<label
							for={emailId}
							class="pointer-events-none absolute top-1/2 left-6 -mt-3 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-neutral-950"
						>
							Почта
						</label>
						{#if errors.email}
							<p class="absolute -bottom-5 left-6 text-sm text-red-500">{errors.email}</p>
						{/if}
					</div>

					<!-- Password Input -->
					<div class="group relative z-0 transition-all focus-within:z-10">
						<input
							type="password"
							id={passwordId}
							name="password"
							autocomplete="current-password"
							placeholder=" "
							required
							bind:value={formData.password}
							class="peer block w-full border border-neutral-300 bg-transparent px-6 pt-12 pb-4 text-base/6 text-neutral-950 ring-4 ring-transparent transition focus:border-neutral-950 focus:ring-neutral-950/5 focus:outline-hidden"
							class:border-red-500={errors.password}
						/>
						<label
							for={passwordId}
							class="pointer-events-none absolute top-1/2 left-6 -mt-3 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-neutral-950"
						>
							Пароль
						</label>
						{#if errors.password}
							<p class="absolute -bottom-5 left-6 text-sm text-red-500">{errors.password}</p>
						{/if}
					</div>
				</div>

				{#if submitError}
					<div class="mt-6 rounded-2xl bg-red-50 p-4 text-sm text-red-700">
						{submitError}
					</div>
				{/if}

				<div class="mt-6 flex items-center justify-between">
					<label class="flex items-center gap-2 text-sm text-neutral-600">
						<input
							type="checkbox"
							class="h-4 w-4 rounded border-neutral-300 text-neutral-950 focus:ring-neutral-950"
						/>
						<span>Запомнить меня</span>
					</label>
					<a href="/reset-password" class="text-sm font-semibold text-neutral-950 hover:underline">
						Забыли пароль?
					</a>
				</div>

				<Button type="submit" class="mt-10" disabled={isSubmitting}>
					{#if isSubmitting}
						Вход...
					{:else}
						Войти
					{/if}
				</Button>

				<p class="mt-6 text-sm text-neutral-600">
					Нет аккаунта?
					<a href="/register" class="font-semibold text-neutral-950 hover:underline"
						>Зарегистрируйтесь</a
					>
				</p>
			</form>

			<Border class="mt-16 pt-16">
				<h2 class="font-display text-base font-semibold text-neutral-950">Нужна помощь?</h2>
				<p class="mt-4 text-base text-neutral-600">
					Если у вас возникли проблемы со входом, свяжитесь с нашей службой поддержки по адресу
					<a href="mailto:info@leget.ru" class="font-semibold text-neutral-950 hover:underline"
						>info@leget.ru</a
					>
					или через
					<a href="/contact" class="font-semibold text-neutral-950 hover:underline"
						>форму обратной связи</a
					>.
				</p>
			</Border>
		</FadeIn>
	</div>
</Container>
