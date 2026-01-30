<script>
	import Button from './Button.svelte';
	import Container from './Container.svelte';
	import FadeIn from './FadeIn.svelte';
	import Offices from './Offices.svelte';

	/**
	 * ContactSection component - Call-to-action section for contacting the company
	 * Features dark background with office locations and contact button
	 *
	 * Requirements: 5.6
	 */
</script>

<Container class="mt-24 sm:mt-32 lg:mt-40">
	<FadeIn class="-mx-6 rounded-4xl bg-neutral-950 px-6 py-20 sm:mx-0 sm:py-32 md:px-12">
		<div class="mx-auto max-w-4xl">
			<div class="max-w-xl">
				<h2 class="font-display text-3xl font-medium text-balance text-white sm:text-4xl">
					Tell us about your project
				</h2>
				<div class="mt-6 flex">
					<Button href="/contact" invert>Say Hej</Button>
				</div>
				<div class="mt-10 border-t border-white/10 pt-10">
					<h3 class="font-display text-base font-semibold text-white">Our offices</h3>
					<Offices invert class="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2" />
				</div>
			</div>
		</div>
	</FadeIn>
</Container>
