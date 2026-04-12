<script>
	import { onMount } from 'svelte';
	import Modal from './Modal.svelte';
	import { regionState } from '$lib/state/region.svelte';

	let isBotFilterModalOpen = $state(false);

	$effect(() => {
		if (regionState.isCityModalOpen) {
			isBotFilterModalOpen = true;
		}
	});

	$effect(() => {
		if (!isBotFilterModalOpen) {
			regionState.isCityModalOpen = false;
		}
	});

	let botFilterMountedTime = $state(0);
	let v_token = $state('');
	let activeCountry = $state('Россия');

	const showroomsData = {
		Россия: [
			'Москва и МО',
			'Санкт-Петербург',
			'Нижний Новгород',
			'Казань',
			'Екатеринбург',
			'Новосибирск',
			'Омск',
			'Тюмень',
			'Челябинск',
			'Уфа',
			'Самара',
			'Воронеж',
			'Краснодар',
			'Ростов-на-Дону',
			'Волгоград',
			'Пермь',
			'Красноярск'
		],
		Беларусь: ['Минск', 'Гродно', 'Брест', 'Витебск', 'Гомель', 'Могилёв']
	};

	function handleCitySelect(city) {
		const timeTaken = Date.now() - botFilterMountedTime;

		// Silent check: honeypot or too fast (< 1000ms)
		if (v_token !== '' || timeTaken < 1000) return;

		regionState.setCity(city);
		regionState.confirmCity();
		isBotFilterModalOpen = false;
	}

	onMount(() => {
		if (!regionState.hasConfirmedCity) {
			setTimeout(() => {
				// double check in case they navigated or somehow confirmed before timeout fired
				if (!regionState.hasConfirmedCity) {
					isBotFilterModalOpen = true;
					botFilterMountedTime = Date.now();
				}
			}, 5000);
		}
	});
</script>

<Modal bind:showModal={isBotFilterModalOpen} title="Выберите ваш город" dismissible={false}>
	<div class="flex flex-col gap-6">
		<p class="text-sm text-neutral-600">
			Добро пожаловать на LEGET! Для продолжения работы с сайтом, пожалуйста, выберите ваш
			город. Это поможет нам показывать актуальную информацию.
		</p>

		<!-- Honeypot: field with unobvious name to trap bots -->
		<input
			type="text"
			name="session_verification_token"
			class="absolute -left-9999 top-0 h-0 w-0 opacity-0"
			tabindex="-1"
			autocomplete="off"
			bind:value={v_token}
		/>

		<div class="flex items-center gap-4 border-b border-neutral-100 pb-4">
			{#each Object.keys(showroomsData) as country}
				<button
					class="relative text-sm font-medium tracking-wide transition-colors duration-300 {activeCountry ===
					country
						? 'text-neutral-950'
						: 'text-neutral-400 hover:text-neutral-600'}"
					onclick={() => (activeCountry = country)}
				>
					{country}
					{#if activeCountry === country}
						<span class="absolute -bottom-[17px] left-0 h-px w-full bg-neutral-950"
						></span>
					{/if}
				</button>
			{/each}
		</div>

		<div class="grid max-h-[50vh] grid-cols-1 gap-3 overflow-y-auto pr-1 sm:max-h-none sm:grid-cols-3 sm:overflow-visible sm:pr-0">
			{#each showroomsData[activeCountry] as city}
				<button
					class="rounded-xl border border-neutral-100 px-4 py-3 text-sm tracking-wide transition-all duration-300 {regionState.selectedCity ===
					city
						? 'border-neutral-950 bg-neutral-950 text-white'
						: 'bg-transparent text-neutral-600 hover:border-neutral-950 hover:text-neutral-950'}"
					onclick={() => handleCitySelect(city)}
				>
					{city}
				</button>
			{/each}
		</div>
	</div>
</Modal>
