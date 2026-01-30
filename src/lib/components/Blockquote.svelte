<script>
	import Border from './Border.svelte';

	/**
	 * Blockquote component - Displays styled quotes with author attribution
	 * Supports two variants: with image (grid layout) and without image (simple border)
	 *
	 * @prop {Object} author - Author information { name: string, role: string }
	 * @prop {string} image - Optional image source for the with-image variant
	 * @prop {string} class - Additional CSS classes
	 * @prop {Snippet} children - Quote content
	 *
	 * Requirements: 12.6
	 */
	let { author, image = null, class: className = '', children } = $props();
</script>

{#if image}
	<!-- Blockquote with image variant -->
	<figure
		class="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-8 sm:grid-cols-12 sm:grid-rows-[1fr_auto_auto_1fr] sm:gap-x-10 lg:gap-x-16 {className}"
	>
		<blockquote
			class="col-span-2 text-xl/7 text-neutral-600 sm:col-span-7 sm:col-start-6 sm:row-start-2"
		>
			{@render children?.()}
		</blockquote>
		<div
			class="col-start-1 row-start-2 overflow-hidden rounded-xl bg-neutral-100 sm:col-span-5 sm:row-span-full sm:rounded-3xl"
		>
			<img
				alt=""
				src={image}
				loading="lazy"
				sizes="(min-width: 1024px) 17.625rem, (min-width: 768px) 16rem, (min-width: 640px) 40vw, 3rem"
				class="h-12 w-12 object-cover grayscale sm:aspect-7/9 sm:h-auto sm:w-full"
			/>
		</div>
		<figcaption class="text-sm text-neutral-950 sm:col-span-7 sm:row-start-3 sm:text-base">
			<span class="font-semibold">{author.name}</span>
			<span class="hidden font-semibold sm:inline">, </span>
			<br class="sm:hidden" />
			<span class="sm:font-semibold">{author.role}</span>
		</figcaption>
	</figure>
{:else}
	<!-- Blockquote without image variant -->
	<Border position="left" class="pl-8 {className}">
		<figure class="text-sm">
			<blockquote class="blockquote-quotes text-neutral-600">
				{@render children?.()}
			</blockquote>
			<figcaption class="mt-6 font-semibold text-neutral-950">
				{author.name}, {author.role}
			</figcaption>
		</figure>
	</Border>
{/if}


<style>
	/* Blockquote quotes styling for the without-image variant */
	:global(.blockquote-quotes > *) {
		position: relative;
	}
	:global(.blockquote-quotes > :first-child::before) {
		content: '"';
		position: absolute;
		right: 100%;
	}
	:global(.blockquote-quotes > :last-child::after) {
		content: '"';
	}
</style>
