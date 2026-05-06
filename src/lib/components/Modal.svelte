<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { backOut } from 'svelte/easing';
	import type { Snippet } from 'svelte';

	let {
		showModal = $bindable(false),
		title = '',
		dismissible = true,
		position = 'center',
		showBackdrop = true,
		children
	}: {
		showModal?: boolean;
		title?: string;
		dismissible?: boolean;
		position?: 'center' | 'bottom-right';
		showBackdrop?: boolean;
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
		class="fixed inset-0 z-[100] flex p-4 {position === 'center'
			? 'items-center justify-center'
			: 'pointer-events-none items-end justify-end'}"
		transition:fade={{ duration: 300 }}
	>
		{#if showBackdrop}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="absolute inset-0 bg-neutral-950/60 backdrop-blur-sm pointer-events-auto"
				transition:fade={{ duration: 300 }}
				onclick={close}
			></div>
		{/if}

		<!-- Modal Dialog -->
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<div
			class="relative w-full max-h-[calc(100dvh-2rem)] overflow-y-auto overflow-x-hidden rounded-3xl bg-white p-6 shadow-2xl pointer-events-auto sm:p-8 {position ===
			'center'
				? 'max-w-2xl'
				: 'mb-4 mr-4 max-w-sm'}"
			transition:fly={{
				y: position === 'center' ? 50 : 20,
				x: position === 'center' ? 0 : 20,
				duration: 400,
				easing: backOut
			}}
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
				<h3
					class="font-semibold tracking-tight text-neutral-950 {position === 'center'
						? 'mb-6 text-2xl'
						: 'mb-3 text-lg'}"
				>
					{title}
				</h3>
			{/if}

			{@render children?.()}
		</div>
	</div>
{/if}
