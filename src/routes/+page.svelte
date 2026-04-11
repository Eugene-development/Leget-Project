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
		{ name: 'Yandex Cloud' },
		{ name: 'SvelteKit' },
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
			client: 'Promo-1',
			name: 'Промо-1',
			title: 'Мебель на заказ',
			description:
				'Представляет собой многостраничный сайт с множеством настраиваемых функций и разделов.',
			href: '/projects/promo-1',
			date: '01.04.26'
		},
		{
			client: 'Promo-2',
			name: 'Промо-2',
			title: 'Фабрика мебели',
			description:
				'Минималистичный дизайн с акцентом на контент и высокую скорость загрузки для вашего продукта.',
			href: '/projects/promo-2',
			date: '05.04.26'
		},
		{
			client: 'Promo-3',
			name: 'Промо-3',
			title: 'Мебельный магазин',
			description: 'Интерактивный интерфейс с продуманной структурой для вовлечения пользователей.',
			href: '/projects/promo-3',
			date: '11.04.26'
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
			class="font-display py-6 text-5xl font-medium tracking-tight text-balance text-neutral-950 sm:text-7xl"
		>
			Сайты по подписке на инфрастрктуре YandexCloud
		</h1>
		<p class="mt-6 text-xl text-neutral-600">
			Готовые к внедрению тематические сайты для вашего бизнеса. Выберите готовый бизнес проект и мы
			запустим его для вас за 72 часа на вашем домене.
		</p>
		<p class="mt-6 text-xl text-neutral-600">
			Дружелюбная к SEO и рекламному продвижению архитектура выведет ваш бизнес на шаг вперёд
			конкурентов.
		</p>
		<!-- <p class="mt-6 text-xl text-neutral-600">
			Минимум усилий и максимум выгоды <span class="text-neutral-950"> за 5000 рублей в месяц</span>
		</p> -->
		<div class="mt-10 flex flex-wrap gap-4">
			<Button href="/register">Регистрация</Button>
			<Button href="/login" invert>Кабинет</Button>
		</div>
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
						<span class="font-semibold">{caseStudy.name}</span>
						<span class="text-neutral-300" aria-hidden="true">/</span>
						<time dateTime={caseStudy.date}>
							{caseStudy.date}
						</time>
					</p>
					<p class="font-display mt-6 text-2xl font-semibold text-neutral-950">
						<a href={caseStudy.href}>
							<span class="absolute inset-0 rounded-3xl"></span>
							{caseStudy.title}
						</a>
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
				>Команда проекта Leget</span
			>
		</div>
	{/snippet}
	Мы пошли дальше стереотипов в современном интернет бизнесе, создали концепт и разработали для вас уникальную
	архитектуру эффективных web-приложений по подписке.
</Testimonial>

<!-- Services Section -->
<SectionIntro
	eyebrow="Сервис"
	title="В рамках подписки мы гарантируем стабильность"
	class="mt-24 sm:mt-32 lg:mt-40"
>
	<p>
		Мы уделяем особое внимание безопасности и стабильности работы сайта. Наши специалисты постоянно
		следят за обновлениями и оперативно реагируют на любые проблемы.
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
				>Мы постоянно улучшаем и дополняем компоненты в проект, получая обратную связь от вас. Наши
				решения это всегда высокая скорость и премиальный дизайн.</ListItem
			>
			<ListItem title="Техническая поддержка">
				В случае непредвиденной ситуации мы и технические cпециалисты YandexCloud оперативно решим
				проблему и восстановим работоспособность сайта.
			</ListItem>
			<ListItem title="Безопасность">
				Ключевой аспект нашей работы - это безопасность. Мы используем современные методы защиты
				данных и регулярно обновляем компоненты сайта.
			</ListItem>
			<ListItem title="Управление контентом">
				Используем современные решения для управления контентом, которые позволяют нам создавать
				эффективные и удобные сайты для наших клиентов.
			</ListItem>
		</List>
	</div>
</Container>

<!-- Contact Section -->
<ContactSection />
