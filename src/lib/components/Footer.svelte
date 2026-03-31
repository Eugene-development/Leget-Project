<script>
	/**
	 * Footer component - Site footer with navigation, newsletter form, and copyright
	 * @component
	 *
	 * Features:
	 * - Navigation sections (Work, Company, Connect)
	 * - Newsletter subscription form
	 * - Logo with hover animation
	 * - Copyright with current year
	 *
	 * Requirements: 4.5
	 */

	import Container from './Container.svelte';
	import FadeIn from './FadeIn.svelte';
	import Logo from './Logo.svelte';

	// Social media profiles for Connect section
	const socialMediaProfiles = [
		{ title: 'Facebook', href: 'https://facebook.com' },
		{ title: 'Instagram', href: 'https://instagram.com' },
		{ title: 'GitHub', href: 'https://github.com' },
		{ title: 'Dribbble', href: 'https://dribbble.com' }
	];

	// Navigation structure
	const navigation = [
		{
			title: 'Work',
			links: [
				{ title: 'FamilyFund', href: '/work/family-fund' },
				{ title: 'Unseal', href: '/work/unseal' },
				{ title: 'Phobia', href: '/work/phobia' },
				{ title: 'See all', href: '/work', hasArrow: true }
			]
		},
		{
			title: 'Company',
			links: [
				{ title: 'О нас', href: '/about' },
				{ title: 'Процесс', href: '/process' },
				{ title: 'Блог', href: '/blog' },
				{ title: 'Свяжитесь с нами', href: '/contact' }
			]
		},
		{
			title: 'Connect',
			links: socialMediaProfiles
		}
	];

	// Get current year for copyright
	const currentYear = new Date().getFullYear();
</script>

<!-- Arrow icon for "See all" link -->
{#snippet ArrowIcon()}
	<svg viewBox="0 0 16 6" aria-hidden="true" class="ml-1 inline-block w-4 fill-current">
		<path
			fill="currentColor"
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="M16 3 10 .5v2H0v1h10v2L16 3Z"
		/>
	</svg>
{/snippet}

<Container as="footer" class="mt-24 w-full sm:mt-32 lg:mt-40">
	<FadeIn>
		<div class="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
			<!-- Navigation -->
			<nav>
				<ul role="list" class="grid grid-cols-2 gap-8 sm:grid-cols-3">
					{#each navigation as section, sectionIndex}
						<li>
							<div class="font-display text-sm font-semibold tracking-wider text-neutral-950">
								{section.title}
							</div>
							<ul role="list" class="mt-4 text-sm text-neutral-700">
								{#each section.links as link, linkIndex}
									<li class="mt-4">
										<a href={link.href} class="transition hover:text-neutral-950">
											{link.title}
											{#if link.hasArrow}
												<span aria-hidden="true">→</span>
											{/if}
										</a>
									</li>
								{/each}
							</ul>
						</li>
					{/each}
				</ul>
			</nav>

			<!-- Newsletter Form -->
			<div class="flex lg:justify-end">
				<form class="max-w-sm">
					<h2 class="font-display text-sm font-semibold tracking-wider text-neutral-950">
						Будь в курсе событий
					</h2>
					<p class="mt-4 text-sm text-neutral-700">
						Подпишитесь, чтобы получать последние новости о новинках, статьи, ресурсы и вдохновение.
					</p>
					<div class="relative mt-6">
						<input
							type="email"
							placeholder="Ваша почта"
							autocomplete="email"
							aria-label="Email address"
							class="block w-full rounded-2xl border border-neutral-300 bg-transparent py-4 pr-20 pl-6 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:ring-neutral-950/5 focus:outline-none"
						/>
						<div class="absolute inset-y-1 right-1 flex justify-end">
							<button
								type="submit"
								aria-label="Submit"
								class="flex aspect-square h-full items-center justify-center rounded-xl bg-neutral-950 text-white transition hover:bg-neutral-800"
							>
								<svg viewBox="0 0 16 6" aria-hidden="true" class="w-4">
									<path
										fill="currentColor"
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M16 3 10 .5v2H0v1h10v2L16 3Z"
									/>
								</svg>
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>

		<!-- Bottom section with logo and copyright -->
		<div
			class="mt-24 mb-20 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-t border-neutral-950/10 pt-12"
		>
			<a href="/" aria-label="Home">
				<Logo class="h-8" fillOnHover />
			</a>
			<p class="text-sm text-neutral-700">
				© Studio Agency Inc. {currentYear}
			</p>
		</div>
	</FadeIn>
</Container>
