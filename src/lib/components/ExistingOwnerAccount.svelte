<script>
	import { saveAuthSession } from '$lib/utils/auth-session.js';
	import { goto } from '$app/navigation';
	import SmartCaptcha from './SmartCaptcha.svelte';
	import { SITE_KEY } from '$lib/antibot/smartcaptcha.js';
	import { getAuthApiUrl } from '$lib/utils/config.js';
	let { email, onCancel } = $props();
	let phase = $state('offer');
	let password = $state('');
	let token = $state('');
	let profile = $state(null);
	let busy = $state(false);
	let error = $state('');
	let captchaToken = $state(null);
	let captcha = $state();
	async function login(event) {
		event.preventDefault();
		if (busy) return;
		busy = true;
		error = '';
		try {
			const response = await fetch(`${getAuthApiUrl()}/auth/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
				body: JSON.stringify({ email, password, captcha_token: captchaToken })
			});
			const result = await response.json();
			if (!response.ok) throw new Error(result.message || 'Не удалось войти.');
			token = result.token;
			profile = result.user;
			password = '';
			phase = 'confirm';
		} catch (e) {
			error = e.message || 'Сервис недоступен.';
		} finally {
			busy = false;
			captchaToken = null;
			captcha?.reset();
		}
	}
	async function activate() {
		if (busy) return;
		busy = true;
		error = '';
		try {
			const response = await fetch(`${getAuthApiUrl()}/auth/activate-owner`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: '{}'
			});
			const result = await response.json();
			if (!response.ok) throw new Error(result.message || 'Не удалось подключить роль.');
			// This is the owner frontend's session, never the university cookie.
			saveAuthSession(result);
			token = '';
			await goto('/lk');
		} catch (e) {
			error = e.message || 'Сервис недоступен. Повторите действие.';
		} finally {
			busy = false;
		}
	}
	const inputClass =
		'mt-2 w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-neutral-950 focus-visible:outline-2';
</script>

<section class="ym-hide-content space-y-5">
	<h2 class="font-display text-2xl text-neutral-950">Использовать существующий аккаунт</h2>
	{#if phase === 'offer'}
		<p>
			Этот email уже зарегистрирован. Можно войти с прежним паролем и использовать тот же аккаунт
			для своего сайта.
		</p>
		<button
			type="button"
			onclick={() => (phase = 'login')}
			class="rounded-lg bg-neutral-950 px-5 py-3 text-white"
			data-metrika-goal="owner_existing_account_open"
			data-goal-action="open">Войти существующим аккаунтом</button
		>
	{:else if phase === 'login'}
		<form onsubmit={login} class="space-y-5">
			<label class="block"
				>Email<input
					type="email"
					value={email}
					readonly
					autocomplete="username"
					class={inputClass}
				/></label
			>
			<label class="block"
				>Прежний пароль<input
					type="password"
					bind:value={password}
					required
					autocomplete="current-password"
					class={inputClass}
				/></label
			>
			{#if SITE_KEY}<SmartCaptcha
					bind:this={captcha}
					onverify={(value) => (captchaToken = value)}
					onerror={() => (captchaToken = null)}
				/>{/if}
			<button
				type="submit"
				disabled={busy || (!!SITE_KEY && !captchaToken)}
				class="rounded-lg bg-neutral-950 px-5 py-3 text-white disabled:opacity-50"
				data-metrika-goal="owner_existing_account_login"
				data-goal-action="submit_click">{busy ? 'Входим…' : 'Войти'}</button
			>
		</form>
	{:else if profile}
		<p>{profile.name} · {profile.email}</p>
		{#if ['student', 'admin'].includes(profile.role)}
			<p>
				{profile.role === 'student'
					? 'Добавить роль Админ сайта? Обучение, сертификаты и пароль сохранятся. Лицензию сайта вы создадите отдельно.'
					: 'У вас уже есть роль Админ сайта. Можно открыть личный кабинет.'}
			</p>
			<button
				type="button"
				disabled={busy}
				onclick={activate}
				class="rounded-lg bg-neutral-950 px-5 py-3 text-white disabled:opacity-50"
				data-metrika-goal="owner_role_activate"
				data-goal-action="submit_click"
				>{busy
					? 'Подключаем…'
					: profile.role === 'student'
						? 'Добавить роль Админ сайта'
						: 'Открыть личный кабинет'}</button
			>
		{:else}<p>
				У аккаунта уже есть другая основная роль. Регистрация её не заменяет. Используйте свой
				действующий кабинет.
			</p>{/if}
	{/if}
	{#if error}<p role="alert" class="text-red-700">{error}</p>{/if}
	<button
		type="button"
		disabled={busy}
		onclick={() => {
			token = '';
			password = '';
			onCancel();
		}}
		class="block text-sm text-neutral-700 underline"
		data-metrika-goal="owner_existing_account_cancel"
		data-goal-action="close">Указать другой email</button
	>
</section>
