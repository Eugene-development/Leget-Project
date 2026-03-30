<script>
	/**
	 * XIcon component - Close/X icon
	 * @component
	 *
	 * Props:
	 * - class: string - Additional CSS classes
	 */

	let { class: className = '', ...restProps } = $props();
</script>

<svg viewBox="0 0 24 24" aria-hidden="true" class={className} {...restProps}>
	<path d="m5.636 4.223 14.142 14.142-1.414 1.414L4.222 5.637z" />
	<path d="M4.222 18.363 18.364 4.22l1.414 1.414L5.636 19.777z" />
</svg>
