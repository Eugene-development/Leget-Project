<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { backOut } from 'svelte/easing';
	import type { Snippet } from 'svelte';

	let {
		showModal = $bindable(false),
		title = '',
		dismissible = true,
		children
	}: {
		showModal?: boolean;
		title?: string;
		dismissible?: boolean;
		children?: Snippet;
	} = $props();

	function close() {
		if (dismissible) {
			showModal = false;
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') close();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if showModal}
	<!-- Backdrop -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 z-[100] flex items-center justify-center bg-neutral-950/60 p-4 backdrop-blur-sm"
		transition:fade={{ duration: 300 }}
		onclick={close}
	>
		<!-- Modal Dialog -->
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<div
			class="relative w-full max-w-2xl max-h-[calc(100dvh-2rem)] overflow-y-auto overflow-x-hidden rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
			transition:fly={{ y: 50, duration: 400, easing: backOut }}
			onclick={(e) => e.stopPropagation()}
			role="dialog"
			aria-modal="true"
			tabindex="-1"
		>
			<!-- Close Button -->
			{#if dismissible}
				<button
					class="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 text-neutral-400 transition-colors hover:border-neutral-950 hover:text-neutral-950 focus:outline-none"
					onclick={close}
					aria-label="Закрыть"
				>
					<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.5"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			{/if}

			{#if title}
				<h3 class="mb-6 text-2xl font-semibold tracking-tight text-neutral-950">
					{title}
				</h3>
			{/if}

			{@render children?.()}
		</div>
	</div>
{/if}
