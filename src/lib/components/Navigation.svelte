<script>
	/**
	 * Navigation component - Full-screen navigation overlay
	 * @component
	 *
	 * Displays navigation links, office locations, and social media links
	 * in a full-screen overlay when the menu is expanded.
	 *
	 * Props:
	 * - None (uses internal navigation data)
	 *
	 * Requirements: 4.2, 4.3
	 */

	import Container from './Container.svelte';
	import Offices from './Offices.svelte';
	import SocialMedia from './SocialMedia.svelte';

	// Navigation links data
	const navigationLinks = [
		{ href: '/work', label: 'Our Work' },
		{ href: '/about', label: 'About Us' },
		{ href: '/process', label: 'Our Process' },
		{ href: '/blog', label: 'Blog' }
	];
</script>

<!-- Navigation links section -->
<nav class="mt-px font-display text-5xl font-medium tracking-tight text-white">
	<!-- First row: Our Work, About Us -->
	<div class="even:mt-px sm:bg-neutral-950">
		<Container>
			<div class="grid grid-cols-1 sm:grid-cols-2">
				<a
					href={navigationLinks[0].href}
					class="group relative isolate -mx-6 bg-neutral-950 px-6 py-10 even:mt-px sm:mx-0 sm:px-0 sm:py-16 sm:odd:pr-16 sm:even:mt-0 sm:even:border-l sm:even:border-neutral-800 sm:even:pl-16"
				>
					{navigationLinks[0].label}
					<span
						class="absolute inset-y-0 -z-10 w-screen bg-neutral-900 opacity-0 transition group-odd:right-0 group-even:left-0 group-hover:opacity-100"
					></span>
				</a>
				<a
					href={navigationLinks[1].href}
					class="group relative isolate -mx-6 bg-neutral-950 px-6 py-10 even:mt-px sm:mx-0 sm:px-0 sm:py-16 sm:odd:pr-16 sm:even:mt-0 sm:even:border-l sm:even:border-neutral-800 sm:even:pl-16"
				>
					{navigationLinks[1].label}
					<span
						class="absolute inset-y-0 -z-10 w-screen bg-neutral-900 opacity-0 transition group-odd:right-0 group-even:left-0 group-hover:opacity-100"
					></span>
				</a>
			</div>
		</Container>
	</div>

	<!-- Second row: Our Process, Blog -->
	<div class="even:mt-px sm:bg-neutral-950">
		<Container>
			<div class="grid grid-cols-1 sm:grid-cols-2">
				<a
					href={navigationLinks[2].href}
					class="group relative isolate -mx-6 bg-neutral-950 px-6 py-10 even:mt-px sm:mx-0 sm:px-0 sm:py-16 sm:odd:pr-16 sm:even:mt-0 sm:even:border-l sm:even:border-neutral-800 sm:even:pl-16"
				>
					{navigationLinks[2].label}
					<span
						class="absolute inset-y-0 -z-10 w-screen bg-neutral-900 opacity-0 transition group-odd:right-0 group-even:left-0 group-hover:opacity-100"
					></span>
				</a>
				<a
					href={navigationLinks[3].href}
					class="group relative isolate -mx-6 bg-neutral-950 px-6 py-10 even:mt-px sm:mx-0 sm:px-0 sm:py-16 sm:odd:pr-16 sm:even:mt-0 sm:even:border-l sm:even:border-neutral-800 sm:even:pl-16"
				>
					{navigationLinks[3].label}
					<span
						class="absolute inset-y-0 -z-10 w-screen bg-neutral-900 opacity-0 transition group-odd:right-0 group-even:left-0 group-hover:opacity-100"
					></span>
				</a>
			</div>
		</Container>
	</div>
</nav>

<!-- Offices and Social Media section -->
<div
	class="relative bg-neutral-950 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-neutral-800"
>
	<Container>
		<div class="grid grid-cols-1 gap-y-10 pb-16 pt-10 sm:grid-cols-2 sm:pt-16">
			<!-- Our offices -->
			<div>
				<h2 class="font-display text-base font-semibold text-white">Our offices</h2>
				<Offices invert class="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2" />
			</div>

			<!-- Follow us -->
			<div class="sm:border-l sm:border-transparent sm:pl-16">
				<h2 class="font-display text-base font-semibold text-white">Follow us</h2>
				<SocialMedia class="mt-6" invert />
			</div>
		</div>
	</Container>
</div>
