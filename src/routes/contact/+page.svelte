<script>
	import Border from '$lib/components/Border.svelte';
	import Button from '$lib/components/Button.svelte';
	import Container from '$lib/components/Container.svelte';
	import FadeIn from '$lib/components/FadeIn.svelte';
	import Offices from '$lib/components/Offices.svelte';
	import PageIntro from '$lib/components/PageIntro.svelte';
	import SocialMedia from '$lib/components/SocialMedia.svelte';
	import { getAuthApiUrl } from '$lib/utils/config.js';

	// Form state
	let formData = $state({
		name: '',
		email: '',
		company: '',
		phone: '',
		message: '',
		budget: ''
	});

	// Validation errors
	let errors = $state({
		name: '',
		email: '',
		message: ''
	});

	// Form submission state
	let isSubmitting = $state(false);
	let submitSuccess = $state(false);
	let submitError = $state('');

	// Generate unique IDs for form fields
	let nameId = $state('');
	let emailId = $state('');
	let companyId = $state('');
	let phoneId = $state('');
	let messageId = $state('');

	$effect(() => {
		nameId = crypto.randomUUID();
		emailId = crypto.randomUUID();
		companyId = crypto.randomUUID();
		phoneId = crypto.randomUUID();
		messageId = crypto.randomUUID();
	});

	// Validate email format
	function isValidEmail(email) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	// Validate form
	function validateForm() {
		let isValid = true;
		errors = { name: '', email: '', message: '' };

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

		if (!formData.message.trim()) {
			errors.message = 'Введите сообщение';
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
				phone: formData.phone.trim() || null,
				company: formData.company.trim() || null,
				message: formData.message.trim(),
				source_url: sourceUrl
			};

			const authApiUrl = getAuthApiUrl();
			const response = await fetch(`${authApiUrl}/notify/contact`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify(requestData)
			});

			const result = await response.json();

			if (!response.ok || !result.success) {
				throw new Error(result.message || 'Ошибка отправки');
			}

			submitSuccess = true;

			// Reset form
			formData = {
				name: '',
				email: '',
				company: '',
				phone: '',
				message: '',
				budget: ''
			};
		} catch (err) {
			console.error('Contact form submit error:', err);
			submitError =
				'Не удалось отправить заявку. Пожалуйста, попробуйте позже или напишите нам напрямую.';
		} finally {
			isSubmitting = false;
		}
	}

	// Email contacts data
	const emailContacts = [
		{ label: 'Сотрудничество', email: 'info@leget.ru' },
		{ label: 'Работа в компании', email: 'hr@leget.ru' }
	];
</script>

<svelte:head>
	<title>Контакты — Студия LEGET. Свяжитесь с нами</title>
	<meta
		name="description"
		content="Свяжитесь с командой LEGET для консультации по запуску вашего сайта. Оставьте заявку на сайте или напишите нам на почту info@leget.ru."
	/>
</svelte:head>

<Container class="mt-24 sm:mt-32 lg:mt-40">
	<div class="grid grid-cols-1 gap-x-8 gap-y-24 lg:grid-cols-2">
		<!-- Contact Form -->
		<FadeIn class="lg:order-last">
			<form onsubmit={handleSubmit}>
				<h2 class="font-display text-base font-semibold text-neutral-950">Заявка на интеграцию</h2>

				{#if submitSuccess}
					<div class="mt-6 rounded-2xl bg-green-50 p-6 text-green-800">
						<p class="font-semibold">Спасибо!</p>
						<p class="mt-2">Мы свяжемся с вами в ближайшее время.</p>
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
								bind:value={formData.name}
								class="peer block w-full border border-neutral-300 bg-transparent px-6 pt-12 pb-4 text-base/6 text-neutral-950 ring-4 ring-transparent transition focus:border-neutral-950 focus:ring-neutral-950/5 focus:outline-hidden"
								class:border-red-500={errors.name}
							/>
							<label
								for={nameId}
								class="pointer-events-none absolute top-1/2 left-6 -mt-3 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-neutral-950"
							>
								Ваше имя
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

						<!-- Company Input -->
						<div class="group relative z-0 transition-all focus-within:z-10">
							<input
								type="text"
								id={companyId}
								name="company"
								autocomplete="organization"
								placeholder=" "
								bind:value={formData.company}
								class="peer block w-full border border-neutral-300 bg-transparent px-6 pt-12 pb-4 text-base/6 text-neutral-950 ring-4 ring-transparent transition focus:border-neutral-950 focus:ring-neutral-950/5 focus:outline-hidden"
							/>
							<label
								for={companyId}
								class="pointer-events-none absolute top-1/2 left-6 -mt-3 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-neutral-950"
							>
								Компания
							</label>
						</div>

						<!-- Phone Input -->
						<div class="group relative z-0 transition-all focus-within:z-10">
							<input
								type="tel"
								id={phoneId}
								name="phone"
								autocomplete="tel"
								placeholder=" "
								bind:value={formData.phone}
								class="peer block w-full border border-neutral-300 bg-transparent px-6 pt-12 pb-4 text-base/6 text-neutral-950 ring-4 ring-transparent transition focus:border-neutral-950 focus:ring-neutral-950/5 focus:outline-hidden"
							/>
							<label
								for={phoneId}
								class="pointer-events-none absolute top-1/2 left-6 -mt-3 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-neutral-950"
							>
								Телефон
							</label>
						</div>

						<!-- Message Input -->
						<div class="group relative z-0 transition-all focus-within:z-10">
							<input
								type="text"
								id={messageId}
								name="message"
								placeholder=" "
								bind:value={formData.message}
								class="peer block w-full border border-neutral-300 bg-transparent px-6 pt-12 pb-4 text-base/6 text-neutral-950 ring-4 ring-transparent transition focus:border-neutral-950 focus:ring-neutral-950/5 focus:outline-hidden"
								class:border-red-500={errors.message}
							/>
							<label
								for={messageId}
								class="pointer-events-none absolute top-1/2 left-6 -mt-3 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-neutral-950"
							>
								Сообщение
							</label>
							{#if errors.message}
								<p class="absolute -bottom-5 left-6 text-sm text-red-500">{errors.message}</p>
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
							Работаем!
						{/if}
					</Button>
				{/if}
			</form>
		</FadeIn>

		<!-- Contact Details -->
		<FadeIn>
			<h2 class="font-display text-base font-semibold text-neutral-950">Наши контакты</h2>
			<p class="mt-2.5 text-base text-neutral-600">
				Предпочитаете делать дела лично? Свяжитесь с нами.
			</p>

			<Offices class="mt-13 grid grid-cols-1 gap-8 sm:grid-cols-2" />

			<Border class="mt-16 pt-16">
				<h2 class="font-display text-base font-semibold text-neutral-950">Рабочая почта</h2>
				<dl class="mt-6 grid grid-cols-1 gap-8 text-sm sm:grid-cols-2">
					{#each emailContacts as contact}
						<div>
							<dt class="font-semibold text-neutral-950">{contact.label}</dt>
							<dd>
								<a href="mailto:{contact.email}" class="text-neutral-600 hover:text-neutral-950">
									{contact.email}
								</a>
							</dd>
						</div>
					{/each}
				</dl>
			</Border>

			<!-- <Border class="mt-16 pt-16">
				<h2 class="font-display text-base font-semibold text-neutral-950">Follow us</h2>
				<SocialMedia class="mt-6" />
			</Border> -->
		</FadeIn>
	</div>
</Container>
