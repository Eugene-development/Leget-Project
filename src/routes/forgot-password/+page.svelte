<script>
	import Button from '$lib/components/Button.svelte';
	import Container from '$lib/components/Container.svelte';
	import SmartCaptcha from '$lib/components/SmartCaptcha.svelte';
	import { SITE_KEY } from '$lib/antibot/smartcaptcha.js';
	import { getAuthApiUrl } from '$lib/utils/config.js';
	import { postPasswordRecovery } from '$lib/utils/password-recovery.js';

	let email = $state('');
	let emailError = $state('');
	let submitError = $state('');
	let isSubmitting = $state(false);
	let isSent = $state(false);
	let captchaToken = $state(null);
	let captchaRef = $state();
	let statusRef = $state();
	let emailRef = $state();

	async function handleSubmit(event) {
		event.preventDefault();
		if (isSubmitting) return;
		emailError = '';
		submitError = '';
		const address = email.trim().toLowerCase();
		if (!address) emailError = 'Введите email, указанный при регистрации.';
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address) || address.length > 254)
			emailError = 'Введите корректный email.';
		if (emailError) {
			emailRef?.focus();
			return;
		}
		if (SITE_KEY && !captchaToken) {
			submitError = 'Подтвердите, что вы не робот.';
			return;
		}
		isSubmitting = true;
		try {
			await postPasswordRecovery(getAuthApiUrl(), 'forgot', {
				email: address,
				captcha_token: captchaToken
			});
			isSent = true;
		} catch (error) {
			emailError = error.errors?.email?.[0] || '';
			submitError =
				error.errors?.captcha_token?.[0] ||
				(error.name === 'PasswordRecoveryError'
					? error.message
					: 'Не удалось отправить запрос. Проверьте соединение и попробуйте ещё раз.');
		} finally {
			captchaRef?.reset();
			captchaToken = null;
			isSubmitting = false;
		}
	}

	$effect(() => {
		if (isSent) statusRef?.focus();
	});

	function tryAgain() {
		isSent = false;
		submitError = '';
	}
</script>

<svelte:head>
	<title>Восстановление пароля — LEGET</title>
	<meta name="robots" content="noindex, nofollow" />
	<meta name="referrer" content="no-referrer" />
</svelte:head>

<Container class="mt-24 sm:mt-24 lg:mt-32">
	<div class="mx-auto max-w-2xl">
		{#if isSent}
			<div bind:this={statusRef} tabindex="-1" class="focus:outline-none" role="status">
				<h1 class="font-display text-2xl font-semibold text-neutral-950">Проверьте почту</h1>
				<p class="mt-4 text-base/7 text-neutral-600">
					Если аккаунт с таким email существует, на него придёт письмо со ссылкой для восстановления
					пароля. Проверьте также папку «Спам».
				</p>
			</div>
			<div class="mt-8 flex flex-wrap items-center gap-6">
				<Button
					href="/login"
					class="min-h-11 items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950"
					>Перейти ко входу</Button
				>
				<button
					type="button"
					onclick={tryAgain}
					data-goal-ignore="Повтор запроса восстановления аккаунта"
					class="min-h-11 text-sm font-semibold text-neutral-950 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950"
					>Отправить ещё раз</button
				>
			</div>
		{:else}
			<form onsubmit={handleSubmit} novalidate aria-busy={isSubmitting}>
				<h1 class="font-display text-2xl font-semibold text-neutral-950">Восстановление пароля</h1>
				<p class="mt-4 text-base/7 text-neutral-600">
					Укажите email, который использовали при регистрации. Мы отправим ссылку для установки
					нового пароля.
				</p>
				<div class="mt-8">
					<label for="recovery-email" class="block text-sm font-semibold text-neutral-950"
						>Почта</label
					>
					<input
						id="recovery-email"
						bind:this={emailRef}
						name="email"
						type="email"
						autocomplete="email"
						maxlength="254"
						required
						bind:value={email}
						disabled={isSubmitting}
						aria-invalid={!!emailError}
						aria-describedby={emailError ? 'recovery-email-error' : undefined}
						class="mt-2 block w-full rounded-2xl border border-neutral-300 bg-transparent px-4 py-3 text-base/6 text-neutral-950 caret-neutral-950 transition focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/60 focus:outline-hidden disabled:opacity-60"
						class:border-red-700={!!emailError}
					/>
					{#if emailError}<p
							id="recovery-email-error"
							class="mt-2 text-sm text-red-700"
							role="alert"
						>
							{emailError}
						</p>{/if}
				</div>
				{#if SITE_KEY}
					<div class="mt-6">
						<SmartCaptcha
							bind:this={captchaRef}
							onverify={(token) => (captchaToken = token)}
							onerror={() => {
								captchaToken = null;
								submitError = 'Не удалось пройти проверку. Обновите страницу и попробуйте ещё раз.';
							}}
						/>
					</div>
				{/if}
				{#if submitError}<p
						class="mt-6 rounded-2xl bg-red-50 p-4 text-sm text-red-700"
						role="alert"
					>
						{submitError}
					</p>{/if}
				<div class="mt-8 flex flex-wrap items-center gap-6">
					<Button
						type="submit"
						data-goal-ignore="Восстановление аккаунта"
						disabled={isSubmitting}
						class="min-h-11 items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950 disabled:cursor-wait disabled:opacity-60"
						>{isSubmitting ? 'Отправляем…' : 'Отправить ссылку'}</Button
					>
					<a
						href="/login"
						class="min-h-11 content-center text-sm font-semibold text-neutral-950 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950"
						>Вернуться ко входу</a
					>
				</div>
			</form>
		{/if}
	</div>
</Container>
