<script>
	import { toastState } from '$lib/state/toast.svelte.js';
	import { fly } from 'svelte/transition';
</script>

<div class="fixed bottom-6 right-6 z-[200] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
	{#each toastState.toasts as toast (toast.id)}
		<div
			transition:fly={{ y: 20, duration: 300 }}
			class="pointer-events-auto flex w-full items-start gap-3 rounded-2xl border border-neutral-100 bg-white p-4 shadow-xl ring-1 ring-neutral-950/5"
			role="alert"
		>
			{#if toast.type === 'success'}
				<div class="rounded-full bg-green-50 p-1 text-green-600">
					<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
					</svg>
				</div>
			{:else}
				<div class="rounded-full bg-red-50 p-1 text-red-600">
					<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</div>
			{/if}

			<div class="flex-1 min-w-0 pt-0.5">
				<p class="text-sm font-medium text-neutral-950">{toast.message}</p>
			</div>

			<button
				onclick={() => toastState.remove(toast.id)}
				class="shrink-0 rounded-full p-0.5 text-neutral-400 hover:bg-neutral-50 hover:text-neutral-600"
				aria-label="Закрыть"
			>
				<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
		</div>
	{/each}
</div>
