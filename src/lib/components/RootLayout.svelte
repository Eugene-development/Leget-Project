<script>
	/**
	 * RootLayout component - Main layout wrapper for the entire application
	 * @component
	 *
	 * Features:
	 * - Dark header section (bg-neutral-950) with Header component
	 * - Navigation overlay that shows/hides on menu toggle
	 * - Main content area with white background and rounded corners
	 * - GridPattern as decorative background
	 * - Footer component
	 * - Manages expanded state for navigation
	 *
	 * Requirements: 4.1, 4.2
	 */

	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import Header from './Header.svelte';
	import Navigation from './Navigation.svelte';
	import Footer from './Footer.svelte';
	import GridPattern from './GridPattern.svelte';
	import MenuIcon from './icons/MenuIcon.svelte';
	import XIcon from './icons/XIcon.svelte';

	let { children } = $props();

	// State for navigation panel
	let expanded = $state(false);
	let logoHovered = $state(false);
	let panelId = $state('');
	let prefersReducedMotion = $state(false);

	// Refs for focus management
	let openRef = $state(null);
	let closeRef = $state(null);
	let navPanelRef = $state(null);

	// Generate unique panel ID on mount
	onMount(() => {
		panelId = `nav-panel-${crypto.randomUUID()}`;
		prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		// Close navigation when clicking on any link inside the navigation panel
		function onClick(event) {
			if (event.target instanceof HTMLElement) {
				const link = event.target.closest('a');
				// Close menu when clicking any navigation link inside the nav panel
				if (link && navPanelRef?.contains(link)) {
					expanded = false;
				}
			}
		}

		window.addEventListener('click', onClick);

		return () => {
			window.removeEventListener('click', onClick);
		};
	});

	// Toggle navigation panel
	function toggleNavigation() {
		expanded = !expanded;
		// Focus management after toggle
		setTimeout(() => {
			if (expanded && closeRef) {
				closeRef.focus({ preventScroll: true });
			} else if (!expanded && openRef) {
				openRef.focus({ preventScroll: true });
			}
		}, 0);
	}

	// Handle logo hover state
	function handleLogoHover(hovered) {
		logoHovered = hovered;
	}

	// Compute transition style based on reduced motion preference
	const transitionStyle = $derived(
		prefersReducedMotion ? 'none' : 'height 0.5s ease-in-out'
	);
</script>

{#snippet MenuIconSnippet(props)}
	<MenuIcon {...props} />
{/snippet}

{#snippet XIconSnippet(props)}
	<XIcon {...props} />
{/snippet}

<header>
	<!-- Header bar (visible when navigation is collapsed) -->
	<div
		class="absolute left-0 right-0 top-2 z-40 pt-14"
		aria-hidden={expanded ? 'true' : undefined}
		inert={expanded ? true : undefined}
	>
		<Header
			{panelId}
			icon={MenuIconSnippet}
			{expanded}
			onToggle={toggleNavigation}
			{logoHovered}
			onLogoHover={handleLogoHover}
		/>
	</div>

	<!-- Navigation panel (expandable) -->
	<div
		bind:this={navPanelRef}
		id={panelId}
		class="relative z-50 overflow-hidden bg-neutral-950 pt-2"
		style="height: {expanded ? 'auto' : '0.5rem'}; transition: {transitionStyle};"
		aria-hidden={expanded ? undefined : 'true'}
		inert={expanded ? undefined : true}
	>
		<div class="bg-neutral-800">
			<!-- Header inside navigation panel -->
			<div class="bg-neutral-950 pb-16 pt-14">
				<Header
					invert
					{panelId}
					icon={XIconSnippet}
					{expanded}
					onToggle={toggleNavigation}
					{logoHovered}
					onLogoHover={handleLogoHover}
				/>
			</div>

			<!-- Navigation links -->
			<Navigation />
		</div>
	</div>
</header>

<!-- Main content area with white background and rounded corners -->
<div
	class="relative flex flex-auto overflow-hidden bg-white pt-14"
	style="border-top-left-radius: 40px; border-top-right-radius: 40px;"
>
	<div class="relative isolate flex w-full flex-col pt-9">
		<!-- Decorative grid pattern background -->
		<GridPattern
			class="absolute inset-x-0 -top-14 -z-10 h-[1000px] w-full fill-neutral-50 stroke-neutral-950/5"
			style="mask-image: linear-gradient(to bottom left, white 40%, transparent 50%);"
			yOffset={-96}
			interactive
		/>

		<!-- Main content slot -->
		<main class="w-full flex-auto">
			{@render children?.()}
		</main>

		<!-- Footer -->
		<Footer />
	</div>
</div>
