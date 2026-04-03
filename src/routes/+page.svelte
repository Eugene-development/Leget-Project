<script>
	import Container from '$lib/components/Container.svelte';
	import FadeIn from '$lib/components/FadeIn.svelte';
	import FadeInStagger from '$lib/components/FadeInStagger.svelte';
	import SectionIntro from '$lib/components/SectionIntro.svelte';
	import List from '$lib/components/List.svelte';
	import ListItem from '$lib/components/ListItem.svelte';
	import StylizedImage from '$lib/components/StylizedImage.svelte';
	import Testimonial from '$lib/components/Testimonial.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import ContactSection from '$lib/components/ContactSection.svelte';
	import Button from '$lib/components/Button.svelte';

	// Client logos data
	const clients = [
		{ name: 'Svelte' },
		{ name: 'Yandex Cloud' },
		{ name: 'Laravel' },
		{ name: 'MySQL' },
		{ name: 'Kubernetes' },
		{ name: 'GraphQL' },
		{ name: 'Nginx' },
		{ name: 'Tailwind' }
	];
	// const clients = [
	// 	{ name: 'Подключение домена' },
	// 	{ name: 'Настройка SSL сертификата' },
	// 	{ name: 'Настройка почты' },
	// 	{ name: 'Замена логотипа' },
	// 	{ name: 'Установка контактных данных' },
	// 	{ name: 'Удаление ненужных разделов' },
	// 	{ name: 'Редактирование текстов' },
	// 	{ name: 'Замена изображений' }
	// ];

	// Case studies data
	const caseStudies = [
		{
			client: 'FamilyFund',
			name: 'Промо-1',
			title: 'Корпоративный сайт',
			description:
				'Представляет собой многостраничный сайт с множеством настраиваемых функций и разделов.',
			href: '/templates/family-fund',
			date: '03/2026'
		}
	];
</script>

<svelte:head>
	<title>Studio - Award-winning development studio</title>
	<meta
		name="description"
		content="We are a development studio working at the intersection of design and technology."
	/>
</svelte:head>

<!-- Hero Section -->
<Container class="mt-24 sm:mt-32 md:mt-56">
	<FadeIn class="max-w-3xl">
		<h1
			class="font-display text-5xl font-medium tracking-tight text-balance text-neutral-950 sm:text-7xl"
		>
			Сайты в аренду от компании Leget
		</h1>
		<p class="mt-6 text-xl text-neutral-600">
			Готовые к внедрению тематические сайты для вашего бизнеса. Выберите готовый шаблон и мы
			адаптируем и запустим его для вас за 72 часа на вашем домене. Минимум усилий и максимум выгоды <strong
				>всего за 5000 рублей в месяц</strong
			>.
		</p>
		<Button href="/templates" class="mt-10">Ознакомиться с вариантами</Button>
	</FadeIn>
</Container>

<!-- Clients Section -->
<div class="mt-24 rounded-4xl bg-neutral-950 py-20 sm:mt-32 sm:py-32 lg:mt-56">
	<Container>
		<FadeIn class="flex items-center gap-x-8">
			<h2
				class="font-display text-center text-sm font-semibold tracking-wider text-white sm:text-left"
			>
				Технологии, которые мы применяем:
			</h2>
			<div class="h-px flex-auto bg-neutral-800"></div>
		</FadeIn>
		<FadeInStagger faster>
			<ul role="list" class="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 text-white lg:grid-cols-4">
				{#each clients as client}
					<li>
						<FadeIn>
							<span class="text-lg">{client.name}</span>
						</FadeIn>
					</li>
				{/each}
			</ul>
		</FadeInStagger>
	</Container>
</div>

<!-- Case Studies Section -->
<SectionIntro title="Ознакомьтесь с вариантами сайтов" class="mt-24 sm:mt-32 lg:mt-40">
	<p>
		Мы верим, что технологии — это ответ на самые сложные вызовы рынка. Наша платформа предлагает
		новый подход в решении современных бизнес задач. От вас только решение, от нас готовый сайт.
	</p>
</SectionIntro>

<Container class="mt-16">
	<FadeInStagger class="grid grid-cols-1 gap-8 lg:grid-cols-3">
		{#each caseStudies as caseStudy}
			<FadeIn class="flex">
				<article
					class="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8"
				>
					<p class="mt-6 flex gap-x-2 text-sm text-neutral-950">
						<time dateTime={caseStudy.date} class="font-semibold">
							{caseStudy.date}
						</time>
						<span class="text-neutral-300" aria-hidden="true">/</span>
						<span>{caseStudy.name}</span>
					</p>
					<p class="font-display mt-6 text-2xl font-semibold text-neutral-950">
						{caseStudy.title}
					</p>
					<p class="mt-4 text-base text-neutral-600">
						{caseStudy.description}
					</p>
				</article>
			</FadeIn>
		{/each}
	</FadeInStagger>
</Container>

<!-- Testimonial Section -->
<Testimonial class="mt-24 sm:mt-32 lg:mt-40" client={{ name: 'LEGET', LogoSnippet: LogoSnippet }}>
	{#snippet LogoSnippet()}
		<div class="flex items-center gap-x-4">
			<Logo class="h-12" />
			<span class="text-sm font-semibold tracking-wider text-neutral-950 uppercase"
				>Администрация проекта</span
			>
		</div>
	{/snippet}
	Наша команда пошла дальше стереотипов в современном интернет бизнесе. Мы создали концепт и разработали
	уникальную архитектуру эффективных web-приложений.
</Testimonial>

<!-- Services Section -->
<SectionIntro
	eyebrow="Сервис"
	title="В рамках подписки мы выполняем"
	class="mt-24 sm:mt-32 lg:mt-40"
>
	<p>
		As long as those opportunities involve giving us money to re-purpose old projects — we can come
		up with an endless number of those.
	</p>
</SectionIntro>

<Container class="mt-16">
	<div class="lg:flex lg:items-center lg:justify-end">
		<div class="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
			<FadeIn class="w-135 flex-none lg:w-180">
				<StylizedImage
					src="/images/laptop.jpg"
					alt="Laptop"
					class="justify-center lg:justify-end"
				/>
			</FadeIn>
		</div>
		<List class="mt-16 lg:mt-0 lg:w-1/2 lg:min-w-132 lg:pl-4">
			<ListItem title="Разработка"
				>Мы постоянно улучшаем и дополняем компоненты в шаблон, получая обратную связь от вас. Наши
				решения это всегда высокая скорость и премиальный дизайн.</ListItem
			>
			<ListItem title="Техническая поддержка">
				We have a team of skilled developers who are experts in the latest app frameworks, like
				Angular 1 and Google Web Toolkit.
			</ListItem>
			<ListItem title="Безопасность">
				We are at the forefront of modern e-commerce development. Which mainly means adding your
				logo to the Shopify store template we've used for the past six years.
			</ListItem>
			<ListItem title="Custom content management">
				At Studio we understand the importance of having a robust and customised CMS. That's why we
				run all of our client projects out of a single, enormous Joomla instance.
			</ListItem>
		</List>
	</div>
</Container>

<!-- Contact Section -->
<ContactSection />
