<script>
	import '../app.css';
	import favicon from '$lib/assets/favicon.ico';
	import RootLayout from '$lib/components/RootLayout.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<RootLayout>
	{@render children()}
</RootLayout>
