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
	import Button from './Button.svelte';
	import { regionState } from '$lib/state/region.svelte';

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
<nav class="font-display mt-px text-3xl font-medium tracking-tight text-white sm:text-5xl">
	{#each navigationLinks as link, index}
		{#if index % 2 === 0}
			<div class="relative border-t border-neutral-800 sm:bg-neutral-950">
				<div class="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2">
					<a
						href={link.href}
						class="group relative isolate border-r border-neutral-800 bg-neutral-950 px-6 py-6 sm:py-16 sm:pl-6 lg:pl-8"
					>
						{link.label}
						<span
							class="absolute inset-y-0 right-0 left-0 -z-10 bg-neutral-900 opacity-0 transition group-hover:opacity-100"
						></span>
					</a>
					{#if navigationLinks[index + 1]}
						<a
							href={navigationLinks[index + 1].href}
							class="group relative isolate border-t border-neutral-800 bg-neutral-950 px-6 py-6 sm:mx-0 sm:border-t-0 sm:py-16 sm:pl-16"
						>
							{navigationLinks[index + 1].label}
							<span
								class="absolute inset-y-0 right-0 left-0 -z-10 bg-neutral-900 opacity-0 transition group-hover:opacity-100"
							></span>
						</a>
					{/if}
				</div>
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
			<div class=" flex flex-col gap-x-12 gap-y-6 sm:flex-row sm:items-baseline sm:col-span-2">
				<!-- <Offices invert /> -->
				<div class="flex flex-col items-start gap-y-6 w-full sm:flex-row sm:items-center sm:justify-between">
					<button
						type="button"
						class="flex items-center gap-x-2 text-base font-medium text-neutral-300 hover:text-white transition"
						onclick={() => {
							regionState.isCountryModalOpen = true;
						}}
					>
						<svg
							class="h-4 w-4 text-neutral-400"
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
						{regionState.selectedCountry}
					</button>
					<div class="flex items-center gap-4">
						<Button href="/login" invert class="!px-5 !py-2.5 !text-base">Кабинет</Button>
						<Button href="/register" class="!px-5 !py-2.5 !text-base bg-neutral-800 hover:bg-neutral-700">Регистрация</Button>
					</div>
				</div>
			</div>

			<!-- Follow us -->
			<div class="sm:border-l sm:border-transparent sm:pl-16">
				<!-- <h2 class="font-display text-base font-semibold text-white">Мы в месенджерах</h2> -->
				<!-- <SocialMedia class="mt-6" invert /> -->
			</div>
		</div>
	</Container>
</div>
