<script>
	import Border from '$lib/components/Border.svelte';
	import Button from '$lib/components/Button.svelte';
	import ContactSection from '$lib/components/ContactSection.svelte';
	import Container from '$lib/components/Container.svelte';
	import FadeIn from '$lib/components/FadeIn.svelte';
	import FadeInStagger from '$lib/components/FadeInStagger.svelte';
	import PageIntro from '$lib/components/PageIntro.svelte';
	import Testimonial from '$lib/components/Testimonial.svelte';
	import Logo from '$lib/components/Logo.svelte';

	// import { formatDate } from '$lib/formatDate.js';

	const caseStudies = [
		{
			client: 'Для мебельных компаний',
			title: 'Промо-1',
			description:
				'Проект для мебельной компании. Позволяет создать профессиональное присутствие в интернете за считанные часы.',
			summary: [
				'Проект для мебельной компании. Позволяет создать профессиональное присутствие в интернете за считанные часы. Ознакомьтесь с проектом и оцените возможности готовых решений от LEGET.'
			],
			logo: '/images/clients/promo-1/logo-dark.svg',
			href: '/projects/promo-1',
			price: 5000,
			service: 'Подписка',
			testimonial: {
				author: { name: 'Debra Fiscal', role: 'CEO of Promo-1' },
				content: ''
			}
		}
		// {
		// 	client: 'Для медицинских центров',
		// 	title: 'Промо-2',
		// 	description:
		// 		'Promo-2 is a project for medical centers. It allows you to create a professional web presence in a matter of hours.',
		// 	summary: [
		// 		'Promo-2 is a project for medical centers. It allows you to create a professional web presence in a matter of hours.',
		// 		'We developed a custom CMS to power their news with and optimised their site to rank higher for search engines.'
		// 	],
		// 	logo: '/images/clients/promo-2/logo-dark.svg',
		// 	href: '/projects/promo-2',
		// 	price: 5000,
		// 	service: 'Подписка',
		// 	testimonial: {
		// 		author: { name: 'Emily Selman', role: 'Head of Engineering at Promo-2' },
		// 		content:
		// 			'Этот проект позволили нам запустить сайт за считанные дни. Мы очень довольны результатом и скоростью работы.'
		// 	}
		// },
		// {
		// 	client: 'Для IT стартапов',
		// 	title: 'Промо-3',
		// 	description:
		// 		'Promo-3 is a project for IT startups. It allows you to create a professional web presence in a matter of hours.',
		// 	summary: [
		// 		'Promo-3 is a project for IT startups. It allows you to create a professional web presence in a matter of hours.',
		// 		'We developed a custom CMS to power their news with and optimised their site to rank higher for search engines.'
		// 	],
		// 	logo: '/images/clients/promo-3/logo-dark.svg',
		// 	href: '/projects/promo-3',
		// 	price: 5000,
		// 	service: 'Подписка',
		// 	testimonial: {
		// 		author: { name: 'Jenny Wilson', role: 'CPO of Promo-3' },
		// 		content:
		// 			'Чистый и профессиональный дизайн, который идеально подходит для нашей компании. Очень удобно настраивать.'
		// 	}
		// }
	];

	// Client logos for the "You're in good company" section
	const clients = [
		{ name: 'Promo-3', logo: '/images/clients/promo-3/logo-dark.svg' },
		{ name: 'Promo-1', logo: '/images/clients/promo-1/logo-dark.svg' },
		{ name: 'Promo-2', logo: '/images/clients/promo-2/logo-dark.svg' },
		{ name: 'Mail Smirk', logo: '/images/clients/mail-smirk/logo-dark.svg' },
		{ name: 'Home Work', logo: '/images/clients/home-work/logo-dark.svg' },
		{ name: 'Green Life', logo: '/images/clients/green-life/logo-dark.svg' },
		{ name: 'Bright Path', logo: '/images/clients/bright-path/logo-dark.svg' },
		{ name: 'North Adventures', logo: '/images/clients/north-adventures/logo-dark.svg' }
	];
</script>

<svelte:head>
	<title>Готовые проекты сайтов для бизнеса — Студия LEGET</title>
	<meta
		name="description"
		content="Каталог готовых проектов сайтов по подписке. Выберите подходящий дизайн и структуру для вашего бизнеса. Запуск за 72 часа от 5000 ₽/мес."
	/>
</svelte:head>

<!-- Page Introduction -->
<PageIntro eyebrow="Наши продукты" title="Готовые проекты сайтов">
	<p>
		Эффективные решения для вашего бизнеса от компании LEGET. Выберите готовый проект и запустите
		сайт за 72 часа.
	</p>
</PageIntro>

<!-- Case Studies Section -->
<Container class="mt-40">
	<FadeIn>
		<h2 class="font-display text-2xl font-semibold text-neutral-950">Варианты проектов</h2>
	</FadeIn>
	<div class="mt-10 space-y-20 sm:space-y-24 lg:space-y-32">
		{#each caseStudies as caseStudy (caseStudy.client)}
			<FadeIn>
				<article>
					<Border class="grid grid-cols-3 gap-x-8 gap-y-8 pt-16">
						<div
							class="col-span-full sm:flex sm:items-center sm:justify-between sm:gap-x-8 lg:col-span-1 lg:block"
						>
							<!-- <div class="sm:flex sm:items-center sm:gap-x-6 lg:block">
								<img src={caseStudy.logo} alt="" class="h-16 w-16 flex-none" loading="lazy" />
								<h3 class="mt-6 text-sm font-semibold text-neutral-950 sm:mt-0 lg:mt-8">
									{caseStudy.client}
								</h3>
							</div> -->
							<div class="mt-1 flex gap-x-4 sm:mt-0 lg:block">
								<p
									class="text-sm tracking-tight text-neutral-950 after:ml-4 after:font-semibold after:text-neutral-300 after:content-['/'] lg:mt-2 lg:after:hidden"
								>
									{caseStudy.service}
								</p>
								<p class="text-sm font-semibold text-neutral-950 lg:mt-2">
									{caseStudy.price} ₽/мес
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
								<Button href={caseStudy.href} aria-label="Read case study: {caseStudy.client}">
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

<!-- Testimonial Section -->
<Testimonial class="mt-24 sm:mt-32 lg:mt-40" client={{ name: 'LEGET', LogoSnippet: LogoSnippet }}>
	{#snippet LogoSnippet()}
		<div class="flex items-center gap-x-4">
			<Logo class="h-12" />
			<span class="text-sm font-semibold tracking-wider text-neutral-950 uppercase"
				>Команда проекта Leget</span
			>
		</div>
	{/snippet}
	Какой вариант вам больше нравится? Напишите нам и мы запустим его для вас за 72 часа.</Testimonial
>

<!-- Clients Section -->
<!-- <Container class="mt-24 sm:mt-32 lg:mt-40">
	<FadeIn>
		<h2 class="font-display text-2xl font-semibold text-neutral-950">Интеграции</h2>
	</FadeIn>
	<FadeInStagger class="mt-10" faster>
		<Border />
		<ul role="list" class="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
			{#each clients as client, index (client.name)}
				<li class="group">
					<FadeIn class="overflow-hidden">
						<Border
							class="pt-12 {index < 2 ? '-mt-px' : ''} {index === 2 ? 'sm:-mt-px' : ''} {index === 3
								? 'lg:-mt-px'
								: ''}"
						>
							<img src={client.logo} alt={client.name} loading="lazy" />
						</Border>
					</FadeIn>
				</li>
			{/each}
		</ul>
	</FadeInStagger>
</Container> -->

<!-- Contact Section -->
<ContactSection />
