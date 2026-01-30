<script>
	import Container from './Container.svelte';
	import FadeIn from './FadeIn.svelte';
	import GridPattern from './GridPattern.svelte';

	/**
	 * Testimonial component - Displays a client testimonial with logo
	 * Features a decorative grid pattern background and styled quote
	 *
	 * @prop {Object} client - Client information { name: string, logo: string }
	 * @prop {string} class - Additional CSS classes
	 * @prop {Snippet} children - Quote text content
	 *
	 * Requirements: 12.7
	 */
	let { client, class: className = '', children } = $props();
</script>

<div class="relative isolate bg-neutral-50 py-16 sm:py-28 md:py-32 {className}">
	<GridPattern
		class="absolute inset-0 -z-10 h-full w-full fill-neutral-100 stroke-neutral-950/5 mask-[linear-gradient(to_bottom_left,white_50%,transparent_60%)]"
		yOffset={-256}
	/>
	<Container>
		<FadeIn>
			<figure class="mx-auto max-w-4xl">
				<blockquote
					class="relative font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl"
				>
					<p class="testimonial-quote sm:before:absolute sm:before:right-full">
						{@render children?.()}
					</p>
				</blockquote>
				<figcaption class="mt-10">
					<img src={client.logo} alt={client.name} loading="lazy" />
				</figcaption>
			</figure>
		</FadeIn>
	</Container>
</div>


<style>
	/* Testimonial quote styling */
	:global(.testimonial-quote::before) {
		content: '"';
	}
	:global(.testimonial-quote::after) {
		content: '"';
	}
</style>
