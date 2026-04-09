<script>
	/**
	 * PhoneIcon component - Telephone handset icon
	 * @component
	 *
	 * Props:
	 * - class: string - Additional CSS classes
	 */

	let { class: className = '', ...restProps } = $props();
</script>

<svg viewBox="0 0 24 24" aria-hidden="true" class={className} {...restProps}>
	<path
		fill="currentColor"
		d="M19.95 21q-3.125 0-6.175-1.362t-5.55-3.863q-2.5-2.5-3.862-5.55T3 4.05q0-.45.3-.75t.75-.3H8.1q.35 0 .625.238t.325.562l.65 3.5q.05.4-.025.675t-.225.475L7.1 10.9q.35.7.763 1.35t.912 1.275q.5.5 1.15.913t1.35.762l2.45-2.35q.2-.2.475-.287t.675-.013l3.5.7q.35.075.575.338T19 21.1v4q0 .45-.3.75t-.75.3Z"
	/>
</svg>
