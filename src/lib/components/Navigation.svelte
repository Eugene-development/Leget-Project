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
		{ href: '/', label: 'Главная' },
		{ href: '/projects', label: 'Проекты' },
		{ href: '/about', label: 'О нас' },
		{ href: '/process', label: 'Интеграция' },
		{ href: '/news', label: 'Новости' },
		{ href: '/contact', label: 'Контакты' }
	];
</script>

<!-- Navigation links section -->
<nav class="font-display mt-px text-3xl sm:text-5xl font-medium tracking-tight text-white">
	{#each navigationLinks as link, index}
		{#if index % 2 === 0}
			<div class="relative sm:bg-neutral-950 border-t border-neutral-800">
				<Container>
					<div class="grid grid-cols-1 sm:grid-cols-2">
						<a
							href={link.href}
							class="group relative isolate -mx-6 bg-neutral-950 px-6 py-6 sm:mx-0 sm:px-0 sm:py-16 sm:pr-16 border-r border-neutral-800"
						>
							{link.label}
							<span
								class="absolute inset-y-0 -z-10 right-0 left-0 bg-neutral-900 opacity-0 transition group-hover:opacity-100"
							></span>
						</a>
						{#if navigationLinks[index + 1]}
							<a
								href={navigationLinks[index + 1].href}
								class="group relative isolate -mx-6 bg-neutral-950 px-6 py-6 sm:mx-0 sm:px-0 sm:py-16 sm:pl-16 border-t sm:border-t-0 border-neutral-800"
							>
								{navigationLinks[index + 1].label}
								<span
									class="absolute inset-y-0 -z-10 right-0 left-0 bg-neutral-900 opacity-0 transition group-hover:opacity-100"
								></span>
							</a>
						{/if}
					</div>
				</Container>
			</div>
		{/if}
	{/each}
</nav>

<!-- Offices and Social Media section -->
<div
	class="relative bg-neutral-950 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-neutral-800"
>
	<Container>
		<div class="grid grid-cols-1 gap-y-10 pt-10 pb-16 sm:grid-cols-2 sm:pt-16">
			<!-- Our offices -->
			<div>
				<!-- <h2 class="font-display text-base font-semibold text-white">Связь с нами</h2> -->
				<Offices invert class="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2" />
			</div>

			<!-- Follow us -->
			<div class="sm:border-l sm:border-transparent sm:pl-16">
				<!-- <h2 class="font-display text-base font-semibold text-white">Мы в месенджерах</h2> -->
				<!-- <SocialMedia class="mt-6" invert /> -->
			</div>
		</div>
	</Container>
</div>
