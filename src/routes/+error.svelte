<script>
	import { page } from '$app/stores';
	import Container from '$lib/components/Container.svelte';
	import FadeIn from '$lib/components/FadeIn.svelte';

	/**
	 * Error page (404 and other errors)
	 * Requirements: 13.7
	 */
</script>

<svelte:head>
	<title>{$page.status} - Studio</title>
</svelte:head>

<Container class="flex h-full items-center pt-24 sm:pt-32 lg:pt-40">
	<FadeIn class="flex max-w-xl flex-col items-center text-center">
		<p class="font-display text-4xl font-semibold text-neutral-950 sm:text-5xl">
			{$page.status}
		</p>
		<h1 class="mt-4 font-display text-2xl font-semibold text-neutral-950">
			{#if $page.status === 404}
				Page not found
			{:else}
				Something went wrong
			{/if}
		</h1>
		<p class="mt-2 text-sm text-neutral-600">
			{#if $page.status === 404}
				Sorry, we couldn't find the page you're looking for.
			{:else}
				{$page.error?.message || 'An unexpected error occurred.'}
			{/if}
		</p>
		<a
			href="/"
			class="mt-4 text-sm font-semibold text-neutral-950 transition hover:text-neutral-700"
		>
			Go to the home page
		</a>
	</FadeIn>
</Container>
