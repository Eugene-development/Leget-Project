<script>
	/**
	 * TagListItem component - Individual tag item with pill styling
	 *
	 * @prop {string} class - Additional CSS classes
	 * @prop {Snippet} children - Tag text content
	 *
	 * Requirements: 12.9
	 */
	let { class: className = '', children } = $props();
</script>

<li class="rounded-full bg-neutral-100 px-4 py-1.5 text-base text-neutral-600 {className}">
	{@render children?.()}
</li>
