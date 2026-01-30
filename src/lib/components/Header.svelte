<script>
	/**
	 * Header component - Site header with logo, contact button, and menu toggle
	 * @component
	 *
	 * Props:
	 * - panelId: string - ID for the navigation panel (for aria-controls)
	 * - icon: Snippet - Icon component to render in the toggle button (MenuIcon or XIcon)
	 * - expanded: boolean - Whether the navigation panel is expanded
	 * - onToggle: function - Callback when menu toggle is clicked
	 * - invert: boolean - Invert colors for dark backgrounds
	 * - logoHovered: boolean - Whether the logo is being hovered (for fill animation)
	 * - onLogoHover: function - Callback when logo hover state changes
	 *
	 * Requirements: 4.1
	 */

	import Container from './Container.svelte';
	import Logo from './Logo.svelte';
	import Logomark from './Logomark.svelte';
	import Button from './Button.svelte';

	let {
		panelId = '',
		icon,
		expanded = false,
		onToggle = () => {},
		invert = false,
		logoHovered = false,
		onLogoHover = (hovered) => {}
	} = $props();

	// Compute toggle button classes based on invert prop
	const toggleButtonClasses = $derived(
		invert ? 'hover:bg-white/10' : 'hover:bg-neutral-950/10'
	);

	const iconClasses = $derived(
		invert
			? 'fill-white group-hover:fill-neutral-200'
			: 'fill-neutral-950 group-hover:fill-neutral-700'
	);
</script>

<Container>
	<div class="flex items-center justify-between">
		<!-- Logo link -->
		<a
			href="/"
			aria-label="Home"
			onmouseenter={() => onLogoHover(true)}
			onmouseleave={() => onLogoHover(false)}
		>
			<!-- Logomark for mobile (small screens) -->
			<Logomark class="h-8 sm:hidden" {invert} filled={logoHovered} />
			<!-- Full Logo for larger screens -->
			<Logo class="hidden h-8 sm:block" {invert} filled={logoHovered} />
		</a>

		<!-- Right side: Contact button and menu toggle -->
		<div class="flex items-center gap-x-8">
			<Button href="/contact" {invert}>Contact us</Button>

			<!-- Menu toggle button -->
			<button
				type="button"
				onclick={onToggle}
				aria-expanded={expanded ? 'true' : 'false'}
				aria-controls={panelId}
				class="group -m-2.5 rounded-full p-2.5 transition {toggleButtonClasses}"
				aria-label="Toggle navigation"
			>
				{#if icon}
					{@render icon({ class: `h-6 w-6 ${iconClasses}` })}
				{/if}
			</button>
		</div>
	</div>
</Container>
