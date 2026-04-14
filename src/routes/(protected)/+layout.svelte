<script>
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { getAuthApiUrl } from '$lib/utils/config.js';

	let { children } = $props();
	let isChecking = $state(true);
	let isAuthenticated = $state(false);
	let isEmailVerified = $state(false);
	let user = $state(null);

	$effect(() => {
		if (browser) {
			checkAuth();
		}
	});

	async function checkAuth() {
		isChecking = true;

		const token = localStorage.getItem('auth_token');

		if (!token) {
			goto('/login');
			return;
		}

		try {
			const authApiUrl = getAuthApiUrl();
			const response = await fetch(`${authApiUrl}/auth/me`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${token}`
				}
			});

			if (!response.ok) {
				// Token is invalid or expired
				localStorage.removeItem('auth_token');
				localStorage.removeItem('email_verified');
				goto('/login');
				return;
			}

			const result = await response.json();

			if (!result.success) {
				localStorage.removeItem('auth_token');
				goto('/login');
				return;
			}

			user = result.user;
			isEmailVerified = result.email_verified ?? false;
			isAuthenticated = true;
		} catch (err) {
			console.error('Auth check error:', err);
			// Network error — allow access if token exists (offline-friendly)
			isAuthenticated = !!token;
			isEmailVerified = localStorage.getItem('email_verified') === '1';
		} finally {
			isChecking = false;
		}
	}
</script>

{#if isChecking}
	<!-- Auth check loading -->
	<div class="flex min-h-screen items-center justify-center">
		<div class="text-center">
			<svg class="mx-auto h-10 w-10 animate-spin text-neutral-400" fill="none" viewBox="0 0 24 24">
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
				<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
			</svg>
			<p class="mt-4 text-sm text-neutral-500">Проверяем доступ...</p>
		</div>
	</div>

{:else if isAuthenticated && !isEmailVerified}
	<!-- Email not verified — show verification reminder -->
	<div class="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
		<div class="max-w-md w-full text-center">
			<div class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-100">
				<svg class="h-10 w-10 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
				</svg>
			</div>
			<h1 class="font-display text-2xl font-semibold text-neutral-950">Подтвердите email</h1>
			<p class="mt-4 text-neutral-600">
				Для доступа к личному кабинету необходимо подтвердить ваш адрес электронной почты.
			</p>
			{#if user?.email}
				<p class="mt-2 text-sm text-neutral-500">
					Письмо отправлено на: <strong>{user.email}</strong>
				</p>
			{/if}
			<div class="mt-8 space-y-3">
				<p class="text-sm text-neutral-500">
					Не получили письмо? Проверьте папку «Спам» или
				</p>
				<a
					href="/login"
					class="inline-flex items-center gap-2 rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white hover:bg-neutral-800 transition"
				>
					Вернуться ко входу
				</a>
			</div>
		</div>
	</div>

{:else if isAuthenticated && isEmailVerified}
	<!-- Authenticated and verified — show protected content -->
	{@render children()}

{/if}
