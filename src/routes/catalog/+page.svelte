<script>
	import Border from '$lib/components/Border.svelte';
	import Button from '$lib/components/Button.svelte';
	import ContactSection from '$lib/components/ContactSection.svelte';
	import Container from '$lib/components/Container.svelte';
	import FadeIn from '$lib/components/FadeIn.svelte';
	import PageIntro from '$lib/components/PageIntro.svelte';
	import Testimonial from '$lib/components/Testimonial.svelte';
	import Logo from '$lib/components/Logo.svelte';

	// import { formatDate } from '$lib/formatDate.js';

	const caseStudies = [
		{
			client: 'Для мебели на заказ',
			title: 'Promo-1',
			summary: [
				'Каталог мебели, примеры проектов, услуги и формы обращений. После создания сайта замените стартовые материалы на свои и настройте данные компании.'
			],
			href: '/catalog/promo-1',
			price: 150,
			service: 'Посуточная подписка'
		},
		{
			client: 'Для мебельных фабрик',
			title: 'Promo-2',
			summary: [
				'Шаблон для мебельной фабрики: информация о производстве, продукции и сотрудничестве.'
			],
			href: '/catalog/promo-2',
			price: 150,
			service: 'Посуточная подписка'
		},
		{
			client: 'Для плитки и коллекций',
			title: 'Promo-3',
			summary: ['Шаблон для салона плитки с каталогом коллекций и информацией для покупателей.'],
			href: '/catalog/promo-3',
			price: 150,
			service: 'Посуточная подписка'
		}
	];
</script>

<svelte:head>
	<title>Каталог шаблонов сайтов — LEGET</title>
	<meta
		name="description"
		content="Отраслевые шаблоны LEGET: Promo-1 для мебели на заказ, Promo-2 для мебельных фабрик и Promo-3 для плитки. Посуточная подписка и тестовый период 72 часа."
	/>
</svelte:head>

<PageIntro eyebrow="Наши продукты" title="Шаблоны для вашего бизнеса">
	<p>
		Выберите шаблон по направлению бизнеса и составу страниц. Для подключения доступны Promo-1,
		Promo-2 и Promo-3. После создания сайта начинается тестовый период 72 часа.
	</p>
</PageIntro>

<Container class="mt-40">
	<FadeIn>
		<h2 class="font-display text-2xl font-semibold text-neutral-950">Отраслевые шаблоны</h2>
	</FadeIn>
	<div class="mt-10 space-y-20 sm:space-y-24 lg:space-y-32">
		{#each caseStudies as caseStudy (caseStudy.client)}
			<FadeIn>
				<article>
					<Border class="grid grid-cols-3 gap-x-8 gap-y-8 pt-16">
						<div
							class="col-span-full sm:flex sm:items-center sm:justify-between sm:gap-x-8 lg:col-span-1 lg:block"
						>
							<div class="mt-1 flex gap-x-4 sm:mt-0 lg:block">
								<p
									class="text-sm tracking-tight text-neutral-950 after:ml-4 after:font-semibold after:text-neutral-300 after:content-['/'] lg:mt-2 lg:after:hidden"
								>
									{caseStudy.service}
								</p>
								<p class="text-sm font-semibold text-neutral-950 lg:mt-2">
									{caseStudy.price} ₽/день
								</p>
							</div>
						</div>
						<div class="col-span-full lg:col-span-2 lg:max-w-2xl">
							<p class="font-display text-4xl font-medium text-neutral-950">
								<a href={caseStudy.href}>{caseStudy.title}</a>
							</p>
							<div class="mt-6 space-y-6 text-base text-neutral-600">
								{#each caseStudy.summary as paragraph}
									<p>{paragraph}</p>
								{/each}
							</div>
							<div class="mt-8 flex gap-x-4">
								<Button href={caseStudy.href} aria-label="Подробнее о шаблоне: {caseStudy.client}">
									Подробнее
								</Button>
							</div>
						</div>
					</Border>
				</article>
			</FadeIn>
		{/each}
	</div>
</Container>

<Testimonial class="mt-24 sm:mt-32 lg:mt-40" client={{ name: 'LEGET', LogoSnippet: LogoSnippet }}>
	{#snippet LogoSnippet()}
		<div class="flex items-center gap-x-4">
			<Logo class="h-12" />
			<span class="text-sm font-semibold tracking-wider text-neutral-950 uppercase"
				>Команда LEGET</span
			>
		</div>
	{/snippet}
	Нужна помощь с выбором? Расскажите команде LEGET о своей компании: подскажем, какие страницы и разделы
	подходят для вашей задачи.</Testimonial
>

<ContactSection />
