<script>
	/**
	 * Logomark component - Icon-only version of the logo
	 * @component
	 * 
	 * Props:
	 * - invert: boolean - Invert colors (white on dark background)
	 * - filled: boolean - Show filled state
	 * - class: string - Additional CSS classes
	 */
	
	let { 
		invert = false, 
		filled = false, 
		class: className = '',
		...restProps 
	} = $props();
</script>

<svg
	width="48"
	height="48"
	viewBox="0 0 36 36"
	fill="none"
	aria-hidden="true"
	class={className}
	{...restProps}
>
	<path 
		d="M1 20C1 26.6274 6.37258 32 13 32H29V4H1V20Z" 
		class="transition-colors duration-300 {invert ? 'fill-white' : 'fill-neutral-950'}"
	/>
	<path 
		fill-rule="evenodd" 
		clip-rule="evenodd"
		d="M11.5 10.5V21.5L22.5 21.5V25.5H11.5C9.29086 25.5 7.5 23.7091 7.5 21.5V10.5H11.5ZM22.5 10.5H18.5V15.5C18.5 16.6046 19.3954 17.5 20.5 17.5C21.6046 17.5 22.5 16.6046 22.5 15.5V10.5Z"
		class="transition-colors duration-300 {invert ? 'fill-neutral-950' : 'fill-white'}"
	/>
</svg>

