<script>
	import { onMount } from 'svelte';
	import Modal from './Modal.svelte';
	import { regionState } from '$lib/state/region.svelte';

	let isBotFilterModalOpen = $state(false);

	$effect(() => {
		if (regionState.isCountryModalOpen) {
			isBotFilterModalOpen = true;
		}
	});

	$effect(() => {
		if (!isBotFilterModalOpen) {
			regionState.isCountryModalOpen = false;
		}
	});

	let botFilterMountedTime = $state(0);
	let v_token = $state('');

	const countries = ['Россия', 'Беларусь', 'Казахстан', 'Грузия', 'Армения', 'Узбекистан'];

	function handleCountrySelect(country) {
		const timeTaken = Date.now() - botFilterMountedTime;

		// Silent check: honeypot or too fast (< 1000ms)
		if (v_token !== '' || timeTaken < 1000) return;

		regionState.setCountry(country);
		regionState.confirmCountry();
		isBotFilterModalOpen = false;
	}

	onMount(() => {
		if (!regionState.hasConfirmedCountry) {
			setTimeout(() => {
				// double check in case they navigated or somehow confirmed before timeout fired
				if (!regionState.hasConfirmedCountry) {
					isBotFilterModalOpen = true;
					botFilterMountedTime = Date.now();
				}
			}, 5000);
		}
	});
</script>

<Modal bind:showModal={isBotFilterModalOpen} title="Выберите вашу страну" dismissible={false}>
	<div class="flex flex-col gap-6">
		<p class="text-sm text-neutral-600">
			Для продолжения работы с сайтом, пожалуйста, выберите вашу страну. Это поможет нам показывать
			актуальную информацию.
		</p>

		<!-- Honeypot: field with unobvious name to trap bots -->
		<input
			type="text"
			name="session_verification_token"
			class="absolute top-0 -left-9999 h-0 w-0 opacity-0"
			tabindex="-1"
			autocomplete="off"
			bind:value={v_token}
		/>

		<div
			class="grid max-h-[50vh] grid-cols-1 gap-3 overflow-y-auto pr-1 sm:max-h-none sm:grid-cols-2 sm:overflow-visible sm:pr-0"
		>
			{#each countries as country}
				<button
					class="rounded-xl border border-neutral-100 px-4 py-3 text-sm tracking-wide transition-all duration-300 {regionState.selectedCountry ===
					country
						? 'border-neutral-950 bg-neutral-950 text-white'
						: 'bg-transparent text-neutral-600 hover:border-neutral-950 hover:text-neutral-950'}"
					onclick={() => handleCountrySelect(country)}
				>
					{country}
				</button>
			{/each}
		</div>
	</div>
</Modal>
