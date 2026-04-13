<script>
	import Border from '$lib/components/Border.svelte';
	import Button from '$lib/components/Button.svelte';
	import Container from '$lib/components/Container.svelte';
	import FadeIn from '$lib/components/FadeIn.svelte';
	import { getAuthApiUrl } from '$lib/utils/config.js';

	// Form state
	let formData = $state({
		name: '',
		email: '',
		phone: '',
		password: '',
		password_confirmation: ''
	});

	// Validation errors
	let errors = $state({
		name: '',
		email: '',
		phone: '',
		password: '',
		password_confirmation: ''
	});

	// Form submission state
	let isSubmitting = $state(false);
	let submitSuccess = $state(false);
	let submitError = $state('');
	let registeredEmail = $state('');

	// Generate unique IDs for form fields
	let nameId = $state('');
	let emailId = $state('');
	let phoneId = $state('');
	let passwordId = $state('');
	let passwordConfirmId = $state('');

	$effect(() => {
		nameId = crypto.randomUUID();
		emailId = crypto.randomUUID();
		phoneId = crypto.randomUUID();
		passwordId = crypto.randomUUID();
		passwordConfirmId = crypto.randomUUID();
	});

	function isValidEmail(email) {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	}

	function isValidPhone(phone) {
		if (!phone) return true; // phone is optional
		return /^[\d\s\+\-\(\)]+$/.test(phone) && phone.replace(/\D/g, '').length >= 10;
	}

	function validateForm() {
		let isValid = true;
		errors = { name: '', email: '', phone: '', password: '', password_confirmation: '' };

		if (!formData.name.trim()) {
			errors.name = 'Введите ваше имя';
			isValid = false;
		}

		if (!formData.email.trim()) {
			errors.email = 'Введите email';
			isValid = false;
		} else if (!isValidEmail(formData.email)) {
			errors.email = 'Введите корректный email';
			isValid = false;
		}

		if (formData.phone && !isValidPhone(formData.phone)) {
			errors.phone = 'Введите корректный номер телефона';
			isValid = false;
		}

		if (!formData.password) {
			errors.password = 'Введите пароль';
			isValid = false;
		} else if (formData.password.length < 8) {
			errors.password = 'Пароль должен содержать минимум 8 символов';
			isValid = false;
		}

		if (!formData.password_confirmation) {
			errors.password_confirmation = 'Подтвердите пароль';
			isValid = false;
		} else if (formData.password !== formData.password_confirmation) {
			errors.password_confirmation = 'Пароли не совпадают';
			isValid = false;
		}

		return isValid;
	}

	async function handleSubmit(event) {
		event.preventDefault();

		if (!validateForm()) return;

		isSubmitting = true;
		submitError = '';

		try {
			const authApiUrl = getAuthApiUrl();
			const response = await fetch(`${authApiUrl}/auth/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify({
					name: formData.name.trim(),
					email: formData.email.trim().toLowerCase(),
					phone: formData.phone.trim() || null,
					password: formData.password,
					password_confirmation: formData.password_confirmation
				})
			});

			const result = await response.json();

			if (!response.ok || !result.success) {
				// Handle field-level errors from backend
				if (result.errors) {
					if (result.errors.email) errors.email = result.errors.email[0];
					if (result.errors.name) errors.name = result.errors.name[0];
					if (result.errors.password) errors.password = result.errors.password[0];
				}
				throw new Error(result.message || 'Ошибка регистрации');
			}

			// Store token
			if (result.token) {
				localStorage.setItem('auth_token', result.token);
			}

			registeredEmail = formData.email.trim().toLowerCase();
			submitSuccess = true;

			// Reset form
			formData = { name: '', email: '', phone: '', password: '', password_confirmation: '' };
		} catch (err) {
			console.error('Registration error:', err);
			if (!submitError) {
				submitError = err.message || 'Не удалось зарегистрироваться. Попробуйте позже.';
			}
		} finally {
			isSubmitting = false;
		}
	}
</script>

<svelte:head>
	<title>Регистрация в сервисе — LEGET</title>
	<meta
		name="description"
		content="Создайте аккаунт в LEGET и получите доступ к каталогу готовых сайтов и профессиональной инфраструктуре Yandex Cloud."
	/>
</svelte:head>

<Container class="mt-24 sm:mt-24 lg:mt-32">
	<div class="mx-auto max-w-2xl">
		<FadeIn>
			<form onsubmit={handleSubmit}>
				<h2 class="font-display text-base font-semibold text-neutral-950">Форма регистрации</h2>

				{#if submitSuccess}
					<div class="mt-6 rounded-2xl bg-green-50 p-8 text-center">
						<div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
							<svg class="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
							</svg>
						</div>
						<p class="font-semibold text-green-800 text-lg">Регистрация завершена!</p>
						<p class="mt-3 text-green-700">
							Мы отправили письмо с подтверждением на адрес:
						</p>
						<p class="mt-1 font-semibold text-green-900">{registeredEmail}</p>
						<p class="mt-3 text-sm text-green-600">
							Перейдите по ссылке в письме, чтобы подтвердить email и получить доступ к личному кабинету.
						</p>
						<div class="mt-6">
							<a href="/login" class="inline-block rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white hover:bg-neutral-800 transition">
								Перейти ко входу
							</a>
						</div>
					</div>
				{:else}
					<div class="isolate mt-6 -space-y-px rounded-2xl bg-white/50">
						<!-- Name Input -->
						<div class="group relative z-0 transition-all focus-within:z-10">
							<input
								type="text"
								id={nameId}
								name="name"
								autocomplete="name"
								placeholder=" "
								required
								bind:value={formData.name}
								class="peer block w-full border border-neutral-300 bg-transparent px-6 pt-12 pb-4 text-base/6 text-neutral-950 ring-4 ring-transparent transition focus:border-neutral-950 focus:ring-neutral-950/5 focus:outline-hidden"
								class:border-red-500={errors.name}
							/>
							<label
								for={nameId}
								class="pointer-events-none absolute top-1/2 left-6 -mt-3 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-neutral-950"
							>
								Имя <span class="text-red-500">*</span>
							</label>
							{#if errors.name}
								<p class="absolute -bottom-5 left-6 text-sm text-red-500">{errors.name}</p>
							{/if}
						</div>

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
								Почта <span class="text-red-500">*</span>
							</label>
							{#if errors.email}
								<p class="absolute -bottom-5 left-6 text-sm text-red-500">{errors.email}</p>
							{/if}
						</div>

						<!-- Phone Input (optional) -->
						<div class="group relative z-0 transition-all focus-within:z-10">
							<input
								type="tel"
								id={phoneId}
								name="phone"
								autocomplete="tel"
								placeholder=" "
								bind:value={formData.phone}
								class="peer block w-full border border-neutral-300 bg-transparent px-6 pt-12 pb-4 text-base/6 text-neutral-950 ring-4 ring-transparent transition focus:border-neutral-950 focus:ring-neutral-950/5 focus:outline-hidden"
								class:border-red-500={errors.phone}
							/>
							<label
								for={phoneId}
								class="pointer-events-none absolute top-1/2 left-6 -mt-3 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-neutral-950"
							>
								Телефон
							</label>
							{#if errors.phone}
								<p class="absolute -bottom-5 left-6 text-sm text-red-500">{errors.phone}</p>
							{/if}
						</div>

						<!-- Password Input -->
						<div class="group relative z-0 transition-all focus-within:z-10">
							<input
								type="password"
								id={passwordId}
								name="password"
								autocomplete="new-password"
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
								Пароль <span class="text-red-500">*</span>
							</label>
							{#if errors.password}
								<p class="absolute -bottom-5 left-6 text-sm text-red-500">{errors.password}</p>
							{/if}
						</div>

						<!-- Confirm Password Input -->
						<div class="group relative z-0 transition-all focus-within:z-10">
							<input
								type="password"
								id={passwordConfirmId}
								name="password_confirmation"
								autocomplete="new-password"
								placeholder=" "
								required
								bind:value={formData.password_confirmation}
								class="peer block w-full border border-neutral-300 bg-transparent px-6 pt-12 pb-4 text-base/6 text-neutral-950 ring-4 ring-transparent transition focus:border-neutral-950 focus:ring-neutral-950/5 focus:outline-hidden"
								class:border-red-500={errors.password_confirmation}
							/>
							<label
								for={passwordConfirmId}
								class="pointer-events-none absolute top-1/2 left-6 -mt-3 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-neutral-950"
							>
								Повторите пароль <span class="text-red-500">*</span>
							</label>
							{#if errors.password_confirmation}
								<p class="absolute -bottom-5 left-6 text-sm text-red-500">{errors.password_confirmation}</p>
							{/if}
						</div>
					</div>

					{#if submitError}
						<div class="mt-6 rounded-2xl bg-red-50 p-4 text-sm text-red-700">
							{submitError}
						</div>
					{/if}

					<Button type="submit" class="mt-10" disabled={isSubmitting}>
						{#if isSubmitting}
							Создание аккаунта...
						{:else}
							Зарегистрироваться
						{/if}
					</Button>

					<p class="mt-6 text-sm text-neutral-600">
						Уже есть аккаунт? <a
							href="/login"
							class="font-semibold text-neutral-950 hover:underline">Войти в личный кабинет</a
						>
					</p>
				{/if}
			</form>

			<Border class="mt-16 pt-16">
				<h2 class="font-display text-base font-semibold text-neutral-950">Что дальше?</h2>
				<p class="mt-4 text-base text-neutral-600">
					После регистрации вы получите письмо для подтверждения email. Подтвердив почту, вы
					получите полный доступ к личному кабинету и всем возможностям сервиса.
				</p>
			</Border>
		</FadeIn>
	</div>
</Container>
