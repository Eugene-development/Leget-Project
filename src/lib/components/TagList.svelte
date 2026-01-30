<script>
	/**
	 * TagList component - Container for displaying tags in a flex wrap layout
	 *
	 * @prop {string} class - Additional CSS classes
	 * @prop {Snippet} children - TagListItem components
	 *
	 * Requirements: 12.9
	 */
	let { class: className = '', children } = $props();
</script>

<ul role="list" class="flex flex-wrap gap-4 {className}">
	{@render children?.()}
</ul>
