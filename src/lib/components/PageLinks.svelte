<script>
	import Border from './Border.svelte';
	import Container from './Container.svelte';
	import FadeIn from './FadeIn.svelte';
	import FadeInStagger from './FadeInStagger.svelte';
	import GridPattern from './GridPattern.svelte';
	import SectionIntro from './SectionIntro.svelte';
	import { formatDate } from '$lib/formatDate.js';

	/**
	 * PageLinks component - Displays a grid of page links with dates and descriptions
	 * Used for blog article navigation and related content sections
	 *
	 * @prop {string} title - Section title
	 * @prop {string} intro - Optional introduction text
	 * @prop {Array<{href: string, title: string, date: string, description: string}>} pages - Array of page objects
	 * @prop {string} class - Additional CSS classes
	 *
	 * Requirements: 12.10
	 */
	let { title, intro = '', pages, class: className = '' } = $props();
</script>

<div class="relative pt-24 sm:pt-32 lg:pt-40 {className}">
	<div
		class="absolute inset-x-0 top-0 -z-10 h-[884px] overflow-hidden rounded-t-4xl bg-linear-to-b from-neutral-50"
	>
		<GridPattern
			class="absolute inset-0 h-full w-full fill-neutral-100 stroke-neutral-950/5 mask-[linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
			yOffset={-270}
		/>
	</div>

	<SectionIntro {title} smaller>
		{#if intro}
			<p>{intro}</p>
		{/if}
	</SectionIntro>

	<Container class={intro ? 'mt-24' : 'mt-16'}>
		<FadeInStagger class="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
			{#each pages as page (page.href)}
				<FadeIn>
					<article>
						<Border position="left" class="relative flex flex-col items-start pl-8">
							<h3 class="mt-6 text-base font-semibold text-neutral-950">
								{page.title}
							</h3>
							<time dateTime={page.date} class="order-first text-sm text-neutral-600">
								{formatDate(page.date)}
							</time>
							<p class="mt-2.5 text-base text-neutral-600">{page.description}</p>
							<a
								href={page.href}
								class="mt-6 flex gap-x-3 text-base font-semibold text-neutral-950 transition hover:text-neutral-700"
								aria-label="Read more: {page.title}"
							>
								Read more
								<svg viewBox="0 0 24 6" aria-hidden="true" class="w-6 flex-none fill-current">
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M24 3 18 .5v2H0v1h18v2L24 3Z"
									/>
								</svg>
								<span class="absolute inset-0"></span>
							</a>
						</Border>
					</article>
				</FadeIn>
			{/each}
		</FadeInStagger>
	</Container>
</div>
