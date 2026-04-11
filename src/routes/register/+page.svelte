<script>
	import Border from '$lib/components/Border.svelte';
	import Button from '$lib/components/Button.svelte';
	import Container from '$lib/components/Container.svelte';
	import FadeIn from '$lib/components/FadeIn.svelte';
	import PageIntro from '$lib/components/PageIntro.svelte';
	import { getAuthApiUrl } from '$lib/utils/config.js';

	// Form state
	let formData = $state({
		name: '',
		email: '',
		phone: ''
	});

	// Validation errors
	let errors = $state({
		name: '',
		email: '',
		phone: ''
	});

	// Form submission state
	let isSubmitting = $state(false);
	let submitSuccess = $state(false);
	let submitError = $state('');

	// Generate unique IDs for form fields
	let nameId = $state('');
	let emailId = $state('');
	let phoneId = $state('');

	$effect(() => {
		nameId = crypto.randomUUID();
		emailId = crypto.randomUUID();
		phoneId = crypto.randomUUID();
	});

	// Validate email format
	function isValidEmail(email) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	// Validate phone format (basic validation)
	function isValidPhone(phone) {
		const phoneRegex = /^[\d\s\+\-\(\)]+$/;
		return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
	}

	// Validate form
	function validateForm() {
		let isValid = true;
		errors = { name: '', email: '', phone: '' };

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

		if (!formData.phone.trim()) {
			errors.phone = 'Введите телефон';
			isValid = false;
		} else if (!isValidPhone(formData.phone)) {
			errors.phone = 'Введите корректный номер телефона';
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
			const sourceUrl = typeof window !== 'undefined' ? window.location.href : '';

			const requestData = {
				name: formData.name.trim(),
				email: formData.email.trim(),
				phone: formData.phone.trim(),
				source_url: sourceUrl
			};

			const authApiUrl = getAuthApiUrl();
			const response = await fetch(`${authApiUrl}/notify/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify(requestData)
			});

			const result = await response.json();

			if (!response.ok || !result.success) {
				throw new Error(result.message || 'Ошибка регистрации');
			}

			submitSuccess = true;

			// Reset form
			formData = {
				name: '',
				email: '',
				phone: ''
			};
		} catch (err) {
			console.error('Registration form submit error:', err);
			submitError =
				'Не удалось отправить заявку на регистрацию. Пожалуйста, попробуйте позже или свяжитесь с нами напрямую.';
		} finally {
			isSubmitting = false;
		}
	}
</script>

<svelte:head>
	<title>Регистрация - Легет</title>
	<meta
		name="description"
		content="Зарегистрируйтесь на нашей платформе и начните работу с готовыми сайтами по подписке."
	/>
</svelte:head>

<PageIntro eyebrow="Регистрация" title="Присоединяйтесь к нам">
	<!-- <p>Заполните форму регистрации, и мы свяжемся с вами для завершения настройки вашего аккаунта.</p> -->
</PageIntro>

<Container class="mt-24 sm:mt-24 lg:mt-32">
	<div class="mx-auto max-w-2xl">
		<FadeIn>
			<form onsubmit={handleSubmit}>
				<h2 class="font-display text-base font-semibold text-neutral-950">Форма регистрации</h2>

				{#if submitSuccess}
					<div class="mt-6 rounded-2xl bg-green-50 p-6 text-green-800">
						<p class="font-semibold">Спасибо за регистрацию!</p>
						<p class="mt-2">Мы свяжемся с вами в ближайшее время для завершения настройки.</p>
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

						<!-- Phone Input -->
						<div class="group relative z-0 transition-all focus-within:z-10">
							<input
								type="tel"
								id={phoneId}
								name="phone"
								autocomplete="tel"
								placeholder=" "
								required
								bind:value={formData.phone}
								class="peer block w-full border border-neutral-300 bg-transparent px-6 pt-12 pb-4 text-base/6 text-neutral-950 ring-4 ring-transparent transition focus:border-neutral-950 focus:ring-neutral-950/5 focus:outline-hidden"
								class:border-red-500={errors.phone}
							/>
							<label
								for={phoneId}
								class="pointer-events-none absolute top-1/2 left-6 -mt-3 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-neutral-950"
							>
								Телефон <span class="text-red-500">*</span>
							</label>
							{#if errors.phone}
								<p class="absolute -bottom-5 left-6 text-sm text-red-500">{errors.phone}</p>
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
							Отправка...
						{:else}
							Зарегистрироваться
						{/if}
					</Button>

					<p class="mt-6 text-sm text-neutral-600">
						Уже есть аккаунт? <a href="/login" class="font-semibold text-neutral-950 hover:underline">Войти в личный кабинет</a>
					</p>
				{/if}
			</form>

			<Border class="mt-16 pt-16">
				<h2 class="font-display text-base font-semibold text-neutral-950">Что дальше?</h2>
				<p class="mt-4 text-base text-neutral-600">
					После регистрации наш менеджер свяжется с вами для обсуждения деталей подписки и настройки вашего сайта. Обычно это занимает не более 24 часов.
				</p>
			</Border>
		</FadeIn>
	</div>
</Container>
