<script>
	import { page } from '$app/stores';
	import Container from '$lib/components/Container.svelte';
	import FadeIn from '$lib/components/FadeIn.svelte';
	import { notifyError } from '$lib/utils/notify-error.js';
	import { requestError, userErrorMessage } from '$lib/utils/user-error.js';

	const failure = $derived(userErrorMessage(requestError($page.status), 'Не удалось загрузить страницу.'));
	$effect(() => {
		if ($page.status >= 500) notifyError(requestError($page.status), 'Не удалось загрузить страницу.');
	});
</script>

<svelte:head>
	<title>{$page.status} — LEGET</title>
</svelte:head>

<Container class="flex h-full items-center pt-24 sm:pt-32 lg:pt-40">
	<FadeIn class="flex max-w-xl flex-col items-center text-center">
		<p class="font-display text-4xl font-semibold text-neutral-950 sm:text-5xl">
			{$page.status}
		</p>
		<h1 class="mt-4 font-display text-2xl font-semibold text-neutral-950">
			{#if $page.status === 404}
				Страница не найдена
			{:else}
				Не удалось открыть страницу
			{/if}
		</h1>
		<p class="mt-2 text-sm text-neutral-600">
			{#if $page.status === 404}
				Проверьте адрес или перейдите на главную.
			{:else}
				{failure}
			{/if}
		</p>
		<a
			href="/"
			class="mt-4 text-sm font-semibold text-neutral-950 transition hover:text-neutral-700"
		>
			На главную
		</a>
	</FadeIn>
</Container>
