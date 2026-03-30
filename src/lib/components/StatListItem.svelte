<script>
	import Border from './Border.svelte';
	import FadeIn from './FadeIn.svelte';

	/**
	 * StatListItem component - Individual statistic item with label and value
	 * Displays value prominently with label below, with left border decoration
	 *
	 * @prop {string} label - Description of the statistic
	 * @prop {string} value - The statistic value to display
	 *
	 * Requirements: 12.5
	 */
	let { label, value } = $props();
</script>

<FadeIn>
	<Border position="left" class="flex flex-col-reverse pl-8">
		<dt class="mt-2 text-base text-neutral-600">{label}</dt>
		<dd class="font-display text-3xl font-semibold text-neutral-950 sm:text-4xl">
			{value}
		</dd>
	</Border>
</FadeIn>
