<script>
	import FadeInStagger from './FadeInStagger.svelte';

	/**
	 * StatList component - Container for displaying statistics in a grid layout
	 * Uses FadeInStagger for sequential animation of child items
	 *
	 * @prop {string} class - Additional CSS classes
	 * @prop {Snippet} children - StatListItem components
	 *
	 * Requirements: 12.5
	 */
	let { class: className = '', children, ...restProps } = $props();
</script>

<FadeInStagger class={className} {...restProps}>
	<dl
		class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:auto-cols-fr lg:grid-flow-col lg:grid-cols-none"
	>
		{@render children?.()}
	</dl>
</FadeInStagger>
