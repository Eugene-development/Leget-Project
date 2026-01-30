<script>
	/**
	 * Offices component - Displays office locations
	 * @component
	 *
	 * Props:
	 * - invert: boolean - Invert colors for dark backgrounds
	 * - class: string - Additional CSS classes
	 *
	 * Requirements: 4.4, 12.11
	 */

	let { invert = false, class: className = '' } = $props();

	const offices = [
		{
			name: 'Copenhagen',
			address: ['1 Carlsberg Gate', '1260, København, Denmark']
		},
		{
			name: 'Billund',
			address: ['24 Lego Allé', '7190, Billund, Denmark']
		}
	];
</script>

<ul role="list" class={className}>
	{#each offices as office}
		<li>
			<address class="text-sm not-italic {invert ? 'text-neutral-300' : 'text-neutral-600'}">
				<strong class={invert ? 'text-white' : 'text-neutral-950'}>
					{office.name}
				</strong>
				<br />
				{#each office.address as line, i}
					{line}
					{#if i < office.address.length - 1}
						<br />
					{/if}
				{/each}
			</address>
		</li>
	{/each}
</ul>
