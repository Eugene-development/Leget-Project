<script>
	/**
	 * MenuIcon component - Hamburger menu icon
	 * @component
	 *
	 * Props:
	 * - class: string - Additional CSS classes
	 */

	let { class: className = '', ...restProps } = $props();
</script>

<svg viewBox="0 0 24 24" aria-hidden="true" class={className} {...restProps}>
	<path d="M2 6h20v2H2zM2 16h20v2H2z" />
</svg>
