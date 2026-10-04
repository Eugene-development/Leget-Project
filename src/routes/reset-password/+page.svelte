<script>
	import { afterNavigate, replaceState } from '$app/navigation';
	import { page } from '$app/state';
	import Button from '$lib/components/Button.svelte';
	import Container from '$lib/components/Container.svelte';
	import { getAuthApiUrl } from '$lib/utils/config.js';
	import { postPasswordRecovery } from '$lib/utils/password-recovery.js';

	let { data } = $props();
	let password = $state('');
	let confirmation = $state('');
	let errors = $state({ password: '', confirmation: '' });
	let submitError = $state('');
	let isSubmitting = $state(false);
	let isSaved = $state(false);
	let tokenRejected = $state(false);
	let statusRef = $state();
	let passwordRef = $state();
	let confirmationRef = $state();
	const invalidLink = $derived(!data.email || !data.token || tokenRejected);

	// Server-loaded credentials stay in memory while the URL is safe for incidental navigation.
	afterNavigate(async () => {
		// Initial afterNavigate callbacks run just before Kit marks the router initialized.
		await Promise.resolve();
		if (window.location.search || window.location.hash) replaceState(page.url.pathname, page.state);
	});

	async function handleSubmit(event) {
		event.preventDefault();
		if (isSubmitting || invalidLink || isSaved) return;
		errors = { password: '', confirmation: '' };
		submitError = '';
		if ([...password].length < 8) errors.password = 'Пароль должен содержать минимум 8 символов.';
		else if (new TextEncoder().encode(password).length > 72)
			errors.password =
				'Пароль слишком длинный: максимум 72 латинских символа или меньше для кириллицы.';
		else if (password.includes('\0')) errors.password = 'Пароль содержит недопустимый символ.';
		if (!confirmation) errors.confirmation = 'Повторите новый пароль.';
		else if (password !== confirmation) errors.confirmation = 'Пароли не совпадают.';
		if (errors.password || errors.confirmation) {
			(errors.password ? passwordRef : confirmationRef)?.focus();
			return;
		}
		isSubmitting = true;
		try {
			await postPasswordRecovery(getAuthApiUrl(), 'reset', {
				email: data.email,
				token: data.token,
				password,
				password_confirmation: confirmation
			});
			password = '';
			confirmation = '';
			isSaved = true;
			replaceState('/reset-password', page.state);
		} catch (error) {
			if (error.code === 'invalid_reset_token' || error.errors?.token) {
				tokenRejected = true;
				password = '';
				confirmation = '';
			} else {
				errors = {
					password: error.errors?.password?.[0] || '',
					confirmation: error.errors?.password_confirmation?.[0] || ''
				};
				submitError =
					error.name === 'PasswordRecoveryError'
						? error.message
						: 'Не удалось сохранить пароль. Проверьте соединение и попробуйте ещё раз.';
			}
		} finally {
			isSubmitting = false;
		}
	}

	$effect(() => {
		if (isSaved || tokenRejected) statusRef?.focus();
	});
</script>

<svelte:head>
	<title>Новый пароль — LEGET</title>
	<meta name="robots" content="noindex, nofollow" />
	<meta name="referrer" content="no-referrer" />
</svelte:head>

<Container class="mt-24 sm:mt-24 lg:mt-32">
	<div class="mx-auto max-w-2xl">
		{#if isSaved}
			<div bind:this={statusRef} tabindex="-1" class="focus:outline-none" role="status">
				<h1 class="font-display text-2xl font-semibold text-neutral-950">Пароль обновлён</h1>
				<p class="mt-4 text-base/7 text-neutral-600">
					Вернитесь на страницу входа, где начали восстановление, и войдите с новым паролем.
				</p>
			</div>
			<Button
				href="/login"
				class="mt-8 min-h-11 items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950"
				>Вход в кабинет владельца</Button
			>
		{:else if invalidLink}
			<div bind:this={statusRef} tabindex="-1" class="focus:outline-none" role="alert">
				<h1 class="font-display text-2xl font-semibold text-neutral-950">Ссылка недействительна</h1>
				<p class="mt-4 text-base/7 text-neutral-600">
					Срок действия ссылки истёк или она уже использована. Запросите новое письмо для
					восстановления пароля.
				</p>
			</div>
			<div class="mt-8 flex flex-wrap items-center gap-6">
				<Button
					href="/forgot-password"
					class="min-h-11 items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950"
					>Получить новую ссылку</Button
				>
				<a
					href="/login"
					class="min-h-11 content-center text-sm font-semibold text-neutral-950 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950"
					>Перейти ко входу</a
				>
			</div>
		{:else}
			<form onsubmit={handleSubmit} novalidate aria-busy={isSubmitting}>
				<h1 class="font-display text-2xl font-semibold text-neutral-950">
					Установите новый пароль
				</h1>
				<p class="mt-4 text-base/7 text-neutral-600" id="password-hint">
					Минимум 8 символов. Выберите пароль, который не используете на других сайтах.
				</p>
				<div class="mt-8">
					<label for="reset-password" class="block text-sm font-semibold text-neutral-950"
						>Новый пароль</label
					>
					<input
						id="reset-password"
						bind:this={passwordRef}
						name="password"
						type="password"
						autocomplete="new-password"
						minlength="8"
						required
						bind:value={password}
						disabled={isSubmitting}
						aria-invalid={!!errors.password}
						aria-describedby={errors.password ? 'password-hint password-error' : 'password-hint'}
						class="mt-2 block w-full rounded-2xl border border-neutral-300 bg-transparent px-4 py-3 text-base/6 text-neutral-950 caret-neutral-950 transition focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/60 focus:outline-hidden disabled:opacity-60"
						class:border-red-700={!!errors.password}
					/>
					{#if errors.password}<p
							id="password-error"
							class="mt-2 text-sm text-red-700"
							role="alert"
						>
							{errors.password}
						</p>{/if}
				</div>
				<div class="mt-6">
					<label for="reset-confirmation" class="block text-sm font-semibold text-neutral-950"
						>Повторите пароль</label
					>
					<input
						id="reset-confirmation"
						bind:this={confirmationRef}
						name="password_confirmation"
						type="password"
						autocomplete="new-password"
						minlength="8"
						required
						bind:value={confirmation}
						disabled={isSubmitting}
						aria-invalid={!!errors.confirmation}
						aria-describedby={errors.confirmation ? 'confirmation-error' : undefined}
						class="mt-2 block w-full rounded-2xl border border-neutral-300 bg-transparent px-4 py-3 text-base/6 text-neutral-950 caret-neutral-950 transition focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/60 focus:outline-hidden disabled:opacity-60"
						class:border-red-700={!!errors.confirmation}
					/>
					{#if errors.confirmation}<p
							id="confirmation-error"
							class="mt-2 text-sm text-red-700"
							role="alert"
						>
							{errors.confirmation}
						</p>{/if}
				</div>
				{#if submitError}<p
						class="mt-6 rounded-2xl bg-red-50 p-4 text-sm text-red-700"
						role="alert"
					>
						{submitError}
					</p>{/if}
				<Button
					type="submit"
					data-goal-ignore="Восстановление аккаунта"
					disabled={isSubmitting}
					class="mt-8 min-h-11 items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950 disabled:cursor-wait disabled:opacity-60"
					>{isSubmitting ? 'Сохраняем…' : 'Сохранить новый пароль'}</Button
				>
			</form>
		{/if}
	</div>
</Container>
