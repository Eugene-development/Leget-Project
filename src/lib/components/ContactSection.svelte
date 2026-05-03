<script>
	import Button from './Button.svelte';
	import Container from './Container.svelte';
	import FadeIn from './FadeIn.svelte';
	import Offices from './Offices.svelte';
	import Logomark from './Logomark.svelte';
	import { regionState } from '$lib/state/region.svelte';

	const emailContacts = [
		{ label: 'Сотрудничество', email: 'info@leget.ru' },
		{ label: 'Работа в компании', email: 'hr@leget.ru' }
	];
</script>

<Container class="mt-24 sm:mt-32 lg:mt-40">
	<FadeIn class="relative -mx-6 rounded-4xl bg-neutral-950 px-6 py-20 sm:mx-0 sm:py-32 md:px-12">
		<Logomark invert class="absolute top-20 right-20 hidden  sm:block sm:h-20 sm:w-20" />
		<div class="mx-auto max-w-4xl">
			<div class="max-w-xl">
				<h2 class="font-display text-3xl font-medium text-balance text-white sm:text-4xl">
					Расскажите нам о себе
				</h2>
				<div class="mt-6 flex">
					<Button href="/contact" invert>Свяжитесь с нами</Button>
				</div>
				<div class="mt-10 border-t border-white/10 pt-10">
					<h3 class="font-display text-base font-semibold text-white">Наши контакты:</h3>

					<div class="mt-8 grid grid-cols-1 gap-8 text-sm sm:grid-cols-2 lg:grid-cols-3">
						{#each emailContacts as contact}
							<div>
								<div class="font-semibold text-white">{contact.label}</div>
								<div class="mt-1">
									<a
										href="mailto:{contact.email}"
										class="text-neutral-400 transition hover:text-white"
									>
										{contact.email}
									</a>
								</div>
							</div>
						{/each}
					</div>

					<div class="mt-10 border-t border-white/5 pt-10">
						<div class="grid grid-cols-1 gap-8 text-sm sm:grid-cols-2 lg:grid-cols-3">
							<div>
								<div class="font-semibold text-white">Страна</div>
								<button
									type="button"
									class="mt-1 text-neutral-400 transition hover:text-white"
									onclick={() => {
										regionState.isCountryModalOpen = true;
									}}
								>
									{regionState.selectedCountry}
								</button>
							</div>
							<div>
								<div class="font-semibold text-white">Телефон</div>
								<div class="mt-1">
									<a href="tel:+79154000020" class="text-neutral-400 transition hover:text-white">
										+7 (915) 400-00-20
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</FadeIn>
</Container>
