<script>
	let { id, title, open = $bindable(false), children } = $props();
</script>

<section
	aria-labelledby={`${id}-heading`}
	class="rounded-3xl border border-neutral-100 bg-neutral-50/50 shadow-sm ring-1 ring-neutral-950/5"
>
	<h3 id={`${id}-heading`} class="font-display text-lg font-semibold text-neutral-950">
		<button
			type="button"
			aria-expanded={open}
			aria-controls={`${id}-content`}
			onclick={() => (open = !open)}
			data-goal-ignore="Раскрытие и сворачивание раздела настроек сайта"
			class="flex w-full cursor-pointer items-center justify-between gap-4 rounded-3xl p-6 text-left transition-colors hover:bg-neutral-100/60 focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:outline-none sm:p-8"
		>
			<span>{title}</span>
			<svg
				aria-hidden="true"
				class="h-5 w-5 shrink-0 text-neutral-600"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1.5"
					d={open ? 'M19 15l-7-7-7 7' : 'M5 9l7 7 7-7'}
				/>
			</svg>
		</button>
	</h3>
	<div id={`${id}-content`} hidden={!open} class="space-y-6 px-6 pb-6 sm:px-8 sm:pb-8">
		{@render children?.()}
	</div>
</section>
