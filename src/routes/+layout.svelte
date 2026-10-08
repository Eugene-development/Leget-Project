<script>
	import { afterNavigate, onNavigate } from '$app/navigation';
	import { navigating } from '$app/state';
	import '../app.css';
	import favicon from '$lib/assets/favicon.ico';
	import RootLayout from '$lib/components/RootLayout.svelte';

	let { children } = $props();
	const routeLoading = $derived(
		!!navigating.to &&
			!navigating.willUnload &&
			(navigating.from?.url.pathname !== navigating.to.url.pathname ||
				navigating.from?.url.search !== navigating.to.url.search)
	);

	onNavigate((navigation) => {
		if (
			routeLoading ||
			navigation.from?.url.pathname === navigation.to?.url.pathname ||
			!document.startViewTransition ||
			window.matchMedia('(prefers-reduced-motion: reduce)').matches
		)
			return;

		return new Promise((resolve) => {
			// Resume navigation after the old page is captured; finish after the new DOM is ready.
			const transition = document.startViewTransition(() => new Promise((done) => resolve(done)));
			transition.ready.catch(() => {});
			transition.finished.catch(() => {});
		});
	});

	afterNavigate((navigation) => {
		if (
			!navigation.from ||
			navigation.from.url.pathname === navigation.to?.url.pathname ||
			document.startViewTransition ||
			window.matchMedia('(prefers-reduced-motion: reduce)').matches
		)
			return;

		const body = document.body;
		if (body.classList.contains('page-entering')) {
			body.classList.remove('page-entering');
			void body.offsetWidth;
		}
		body.classList.add('page-entering');
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<RootLayout {routeLoading}>
	{@render children()}
</RootLayout>
