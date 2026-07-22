<script>
	import Border from '$lib/components/Border.svelte';
	import Button from '$lib/components/Button.svelte';
	import Container from '$lib/components/Container.svelte';
	import FadeIn from '$lib/components/FadeIn.svelte';
	import SmartCaptcha from '$lib/components/SmartCaptcha.svelte';
	import { SITE_KEY } from '$lib/antibot/smartcaptcha.js';
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

	// SmartCaptcha (защита от ботов)
	let captchaToken = $state(null);
	let captchaRef = $state();

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

	// Password strength checks
	const passwordRules = [
		{ id: 'length', label: 'Минимум 8 символов', test: (p) => p.length >= 8 },
		{ id: 'lower', label: 'Строчная буква', test: (p) => /[a-zа-яё]/.test(p) },
		{ id: 'upper', label: 'Заглавная буква', test: (p) => /[A-ZА-ЯЁ]/.test(p) },
		{ id: 'digit', label: 'Цифра (0–9)', test: (p) => /[0-9]/.test(p) },
		{ id: 'special', label: 'Спецсимвол (!@#$%…)', test: (p) => /[^a-zA-Zа-яёА-ЯЁ0-9]/.test(p) }
	];

	function getPasswordStrength(password) {
		if (!password) return { score: 0, label: '', color: '' };
		const passed = passwordRules.filter((r) => r.test(password)).length;
		if (passed <= 1) return { score: 1, label: 'Очень слабый', color: '#ef4444' };
		if (passed === 2) return { score: 2, label: 'Слабый', color: '#f97316' };
		if (passed === 3) return { score: 3, label: 'Средний', color: '#eab308' };
		if (passed === 4) return { score: 4, label: 'Хороший', color: '#84cc16' };
		return { score: 5, label: 'Надёжный', color: '#22c55e' };
	}

	let passwordStrength = $derived(getPasswordStrength(formData.password));
	let showPasswordHints = $state(false);
	let showPassword = $state(false);
	let copySuccess = $state(false);

	function generatePassword() {
		const lower = 'abcdefghijklmnopqrstuvwxyz';
		const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		const digits = '0123456789';
		const special = '!@#$%^&*()-_=+[]{}|;:,.<>?';
		const all = lower + upper + digits + special;

		// Guarantee at least one of each required class
		const pick = (src) => src[crypto.getRandomValues(new Uint32Array(1))[0] % src.length];
		const base = [pick(lower), pick(upper), pick(digits), pick(special)];

		// Fill remaining 8 characters randomly
		const extra = Array.from({ length: 8 }, () => pick(all));

		// Fisher-Yates shuffle
		const chars = [...base, ...extra];
		for (let i = chars.length - 1; i > 0; i--) {
			const j = crypto.getRandomValues(new Uint32Array(1))[0] % (i + 1);
			[chars[i], chars[j]] = [chars[j], chars[i]];
		}

		const pwd = chars.join('');
		formData.password = pwd;
		formData.password_confirmation = pwd;
		showPassword = true;
		showPasswordHints = true;
		copySuccess = false;
	}

	async function copyPassword() {
		try {
			await navigator.clipboard.writeText(formData.password);
			copySuccess = true;
			setTimeout(() => (copySuccess = false), 2000);
		} catch {}
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
		} else if (passwordStrength.score < 3) {
			const failed = passwordRules.filter((r) => !r.test(formData.password));
			errors.password = `Пароль слишком простой. Добавьте: ${failed.map((r) => r.label.toLowerCase()).join(', ')}`;
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

		// Антибот: при включённой капче требуется токен
		if (SITE_KEY && !captchaToken) {
			submitError = 'Подтвердите, что вы не робот.';
			return;
		}

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
					password_confirmation: formData.password_confirmation,
					captcha_token: captchaToken
				})
			});

			const result = await response.json();

			if (!response.ok || !result.success) {
				// Handle field-level errors from backend
				if (result.errors) {
					if (result.errors.email) errors.email = result.errors.email[0];
					if (result.errors.name) errors.name = result.errors.name[0];
					if (result.errors.password) errors.password = result.errors.password[0];
					if (result.errors.captcha_token) submitError = result.errors.captcha_token[0];
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
			// Токен одноразовый — сбрасываем капчу для повторной попытки
			captchaRef?.reset();
			captchaToken = null;
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
						<div
							class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100"
						>
							<svg
								class="h-7 w-7 text-green-600"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M5 13l4 4L19 7"
								/>
							</svg>
						</div>
						<p class="text-lg font-semibold text-green-800">Регистрация завершена!</p>
						<p class="mt-3 text-green-700">Мы отправили письмо с подтверждением на адрес:</p>
						<p class="mt-1 font-semibold text-green-900">{registeredEmail}</p>
						<p class="mt-3 text-sm text-green-600">
							Перейдите по ссылке в письме, чтобы подтвердить email и получить доступ к личному
							кабинету.
						</p>
						<div class="mt-6">
							<a
								href="/login"
								class="inline-block rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
							>
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
								type={showPassword ? 'text' : 'password'}
								id={passwordId}
								name="password"
								autocomplete="new-password"
								placeholder=" "
								required
								bind:value={formData.password}
								onfocus={() => (showPasswordHints = true)}
								class="peer block w-full border border-neutral-300 bg-transparent px-6 pt-12 pr-32 pb-4 text-base/6 text-neutral-950 ring-4 ring-transparent transition focus:border-neutral-950 focus:ring-neutral-950/5 focus:outline-hidden"
								class:border-red-500={errors.password}
							/>
							<label
								for={passwordId}
								class="pointer-events-none absolute top-1/2 left-6 -mt-3 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-neutral-950"
							>
								Пароль <span class="text-red-500">*</span>
							</label>
							<!-- Icon buttons group: show/hide · copy · generate -->
							<div class="absolute top-1/2 right-2 flex -translate-y-1/2 items-center gap-0.5">
								<!-- Show/hide -->
								<button
									type="button"
									onclick={() => (showPassword = !showPassword)}
									title={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
									class="rounded p-1.5 text-neutral-400 transition hover:text-neutral-700 focus:outline-none"
								>
									{#if showPassword}
										<svg
											class="h-4 w-4"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											stroke-width="1.75"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
											/>
										</svg>
									{:else}
										<svg
											class="h-4 w-4"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											stroke-width="1.75"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
											/>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
											/>
										</svg>
									{/if}
								</button>
								<!-- Copy (only when there's a password) -->
								{#if formData.password}
									<button
										type="button"
										onclick={copyPassword}
										title={copySuccess ? 'Скопировано!' : 'Скопировать пароль'}
										class="rounded p-1.5 transition focus:outline-none"
										style="color: {copySuccess
											? '#16a34a'
											: '#a3a3a3'}; transition: color 0.25s ease;"
									>
										{#if copySuccess}
											<svg
												class="h-4 w-4"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												stroke-width="2"
											>
												<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
											</svg>
										{:else}
											<svg
												class="h-4 w-4"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												stroke-width="2"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
												/>
											</svg>
										{/if}
									</button>
								{/if}
								<!-- Generate -->
								<button
									type="button"
									onclick={generatePassword}
									title="Сгенерировать пароль"
									class="inline-flex items-center gap-1 rounded px-1.5 py-1 text-xs text-neutral-400 transition hover:text-neutral-700 focus:outline-none"
								>
									<svg
										class="h-3.5 w-3.5 shrink-0"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										stroke-width="2"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
										/>
									</svg>
									<span class="leading-none">Сгенерировать</span>
								</button>
							</div>
							{#if errors.password}
								<p class="absolute -bottom-5 left-6 text-sm text-red-500">{errors.password}</p>
							{/if}
						</div>

						<!-- Password strength indicator -->
						{#if showPasswordHints || formData.password}
							<div class="px-1 pt-4 pb-2">
								<!-- Strength bar -->
								<div class="mb-3 flex items-center gap-3">
									<div class="flex flex-1 gap-1">
										{#each [1, 2, 3, 4, 5] as step}
											<div
												style="background-color: {passwordStrength.score >= step
													? passwordStrength.color
													: '#e5e7eb'}; transition: background-color 0.3s ease;"
												class="h-1.5 flex-1 rounded-full"
											></div>
										{/each}
									</div>
									{#if formData.password}
										<span
											style="color: {passwordStrength.color}; transition: color 0.3s ease;"
											class="text-xs font-semibold whitespace-nowrap">{passwordStrength.label}</span
										>
									{/if}
								</div>
								<!-- Requirements checklist -->
								<ul class="grid grid-cols-1 gap-1 sm:grid-cols-2">
									{#each passwordRules as rule}
										{@const ok = formData.password ? rule.test(formData.password) : false}
										<li
											class="flex items-center gap-1.5 text-xs"
											style="color: {ok ? '#16a34a' : '#6b7280'}; transition: color 0.25s ease;"
										>
											<svg class="h-3.5 w-3.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
												{#if ok}
													<path
														fill-rule="evenodd"
														d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
														clip-rule="evenodd"
													/>
												{:else}
													<path
														fill-rule="evenodd"
														d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3a1 1 0 002 0V7zm-1 6a1 1 0 100 2 1 1 0 000-2z"
														clip-rule="evenodd"
													/>
												{/if}
											</svg>
											{rule.label}
										</li>
									{/each}
								</ul>
							</div>
						{/if}

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
								<p class="absolute -bottom-5 left-6 text-sm text-red-500">
									{errors.password_confirmation}
								</p>
							{/if}
						</div>
					</div>

					{#if SITE_KEY}
						<div class="mt-6">
							<SmartCaptcha
								bind:this={captchaRef}
								onverify={(token) => (captchaToken = token)}
								onerror={() => (captchaToken = null)}
							/>
						</div>
					{/if}

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
