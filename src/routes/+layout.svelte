<script>
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import RootLayout from '$lib/components/RootLayout.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<RootLayout>
	{@render children()}
</RootLayout>
