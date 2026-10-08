<script>
	import { getContext } from 'svelte';
	import Container from './Container.svelte';
	import { contentLoadingContext } from '$lib/utils/content-loading.js';

	let { fullPage = false, track = true, label = 'Загружаем содержимое страницы…' } = $props();
	const tracker = getContext(contentLoadingContext);

	$effect(() => {
		if (track) return tracker?.start();
	});
</script>

{#snippet placeholders()}
	<div class="content-skeleton" role="status" aria-live="polite">
		<span class="sr-only">{label}</span>
		<div aria-hidden="true">
			{#if fullPage}
				<div class="skeleton-line skeleton-title"></div>
				<div class="skeleton-line skeleton-intro"></div>
				<div class="skeleton-line skeleton-intro-short"></div>
			{/if}
			<div class="skeleton-sections" class:full-page={fullPage}>
				<div class="skeleton-section">
					<div class="skeleton-line skeleton-heading"></div>
					<div class="skeleton-line skeleton-copy"></div>
					<div class="skeleton-line skeleton-copy-short"></div>
					<div class="skeleton-surface"></div>
				</div>
				<div class="skeleton-section">
					<div class="skeleton-line skeleton-heading"></div>
					<div class="skeleton-line skeleton-copy"></div>
					<div class="skeleton-line skeleton-copy-short"></div>
				</div>
			</div>
		</div>
	</div>
{/snippet}

{#if fullPage}
	<Container class="mt-24 mb-24 sm:mt-32 lg:mt-40">
		{@render placeholders()}
	</Container>
{:else}
	{@render placeholders()}
{/if}

<style>
	.content-skeleton {
		min-height: 24rem;
	}

	.skeleton-line,
	.skeleton-surface {
		background: var(--color-neutral-100);
		border-radius: var(--radius-xl);
	}

	.skeleton-line {
		height: 1rem;
		max-width: 100%;
	}

	.skeleton-title {
		width: 38rem;
		height: clamp(2.5rem, 6vw, 3.5rem);
		margin-bottom: 2rem;
	}

	.skeleton-intro {
		width: 43rem;
		height: 1.25rem;
	}

	.skeleton-intro-short {
		width: 30rem;
		height: 1.25rem;
		margin-top: 0.75rem;
	}

	.skeleton-sections {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 3rem;
	}

	.skeleton-sections.full-page {
		margin-top: 4rem;
	}

	.skeleton-section {
		min-width: 0;
		border-top: 1px solid var(--color-neutral-100);
		padding-top: 2rem;
	}

	.skeleton-heading {
		width: 16rem;
		height: 1.5rem;
		margin-bottom: 1.5rem;
	}

	.skeleton-copy {
		width: 48rem;
	}

	.skeleton-copy-short {
		width: 32rem;
		margin-top: 0.75rem;
	}

	.skeleton-surface {
		width: 100%;
		height: 9rem;
		margin-top: 2rem;
		background: var(--color-neutral-50);
		border-radius: var(--radius-3xl);
	}

	@media (prefers-reduced-motion: no-preference) {
		.skeleton-line,
		.skeleton-surface {
			animation: skeleton-pulse 1.8s ease-in-out infinite;
		}
	}

	@keyframes skeleton-pulse {
		50% {
			opacity: 0.5;
		}
	}
</style>
