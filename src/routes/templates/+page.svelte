<script>
	import Border from '$lib/components/Border.svelte';
	import Button from '$lib/components/Button.svelte';
	import ContactSection from '$lib/components/ContactSection.svelte';
	import Container from '$lib/components/Container.svelte';
	import FadeIn from '$lib/components/FadeIn.svelte';
	import FadeInStagger from '$lib/components/FadeInStagger.svelte';
	import PageIntro from '$lib/components/PageIntro.svelte';
	import Testimonial from '$lib/components/Testimonial.svelte';
	import { formatDate } from '$lib/formatDate.js';

	const caseStudies = [
		{
			client: 'Для мебельных компаний',
			title: 'Промо-1',
			description:
				'FamilyFund is a crowdfunding platform for friends and family. Allowing users to take personal loans from their network without a traditional financial institution.',
			summary: [
				'FamilyFund is a crowdfunding platform for friends and family. Allowing users to take personal loans from their network without a traditional financial institution.',
				'We developed a custom CMS to power their news with and optimised their site to rank higher for the keywords "Gary Vee" and "Tony Robbins".'
			],
			logo: '/images/clients/family-fund/logo-dark.svg',
			href: '/templates/family-fund',
			date: '2025-01',
			service: 'Последнее обновление',
			testimonial: {
				author: { name: 'Debra Fiscal', role: 'CEO of FamilyFund' },
				content:
					'Мы верим в эффективность и максимизацию наших ресурсов для обеспечения наилучшей ценности для наших клиентов. Основной способ сделать это — повторное использование одних и тех же проектов, которые мы разрабатываем на протяжении десятилетия.'
			}
		}
	];

	// Client logos for the "You're in good company" section
	const clients = [
		{ name: 'Phobia', logo: '/images/clients/phobia/logo-dark.svg' },
		{ name: 'Family Fund', logo: '/images/clients/family-fund/logo-dark.svg' },
		{ name: 'Unseal', logo: '/images/clients/unseal/logo-dark.svg' },
		{ name: 'Mail Smirk', logo: '/images/clients/mail-smirk/logo-dark.svg' },
		{ name: 'Home Work', logo: '/images/clients/home-work/logo-dark.svg' },
		{ name: 'Green Life', logo: '/images/clients/green-life/logo-dark.svg' },
		{ name: 'Bright Path', logo: '/images/clients/bright-path/logo-dark.svg' },
		{ name: 'North Adventures', logo: '/images/clients/north-adventures/logo-dark.svg' }
	];
</script>

<svelte:head>
	<title>Наши проекты - Leget</title>
	<meta
		name="description"
		content="We believe in efficiency and maximizing our resources to provide the best value to our clients."
	/>
</svelte:head>

<!-- Page Introduction -->
<PageIntro eyebrow="Наши продукты" title="Готовые проекты сайтов">
	<p>
		Мы верим в эффективность и максимизацию наших ресурсов для обеспечения наилучшей ценности для
		наших клиентов.
	</p>
</PageIntro>

<!-- Case Studies Section -->
<Container class="mt-40">
	<FadeIn>
		<h2 class="font-display text-2xl font-semibold text-neutral-950">Шаблоны проектов</h2>
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
								<p class="text-sm text-neutral-950 lg:mt-2">
									<time datetime={caseStudy.date}>
										{formatDate(caseStudy.date)}
									</time>
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
							<div class="mt-8 flex">
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
<Testimonial
	class="mt-24 sm:mt-32 lg:mt-40"
	client={{ name: 'Mail Smirk', logo: '/images/clients/mail-smirk/logo-dark.svg' }}
>
	We approached <em>Studio</em> because we loved their past work. They delivered something remarkably
	similar in record time.
</Testimonial>

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
