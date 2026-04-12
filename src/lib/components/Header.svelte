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
	import { regionState } from '$lib/state/region.svelte';

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
	const toggleButtonClasses = $derived(invert ? 'hover:bg-white/10' : 'hover:bg-neutral-950/10');

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
			<Logomark class="h-10 sm:hidden" {invert} filled={logoHovered} />
			<!-- Full Logo for larger screens -->
			<Logo class="hidden h-12 sm:block" {invert} filled={logoHovered} />
		</a>

		<!-- Right side: Contact button and menu toggle -->
		<div class="flex items-center gap-x-8">
			<button
				type="button"
				class="hidden items-center gap-x-2 text-sm font-medium transition sm:flex {invert
					? 'text-neutral-300 hover:text-white'
					: 'text-neutral-600 hover:text-neutral-950'}"
				onclick={() => {
					regionState.isCityModalOpen = true;
				}}
			>
				<svg
					class="h-4 w-4 {invert ? 'text-neutral-400' : 'text-neutral-500'}"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1.5"
						d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
					/>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1.5"
						d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
					/>
				</svg>
				{regionState.selectedCity}
			</button>

			<Button href="tel:+79154000020" {invert}>
				+7 (915) 400-00-20
			</Button>

			<!-- Menu toggle button -->
			<button
				type="button"
				onclick={onToggle}
				aria-expanded={expanded ? 'true' : 'false'}
				aria-controls={panelId}
				class="group -m-2.5 rounded-full px-6 py-2.5 transition w-[120px] {toggleButtonClasses}"
				aria-label="Toggle navigation"
			>
				<div class="flex items-center gap-x-2.5 justify-center">
					{#if !expanded}
						<span
							class="text-sm font-semibold transition {invert
								? 'text-white group-hover:text-neutral-200'
								: 'text-neutral-950 group-hover:text-neutral-700'}"
						>
							Меню
						</span>
					{/if}
					{#if icon}
						{@render icon({ class: `h-6 w-6 ${iconClasses}` })}
					{/if}
				</div>
			</button>
		</div>
	</div>
</Container>
