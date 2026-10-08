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

	const clients = [
		{
			name: 'Готовая структура страниц'
		},
		{
			name: 'Стартовые тексты'
		},
		{
			name: 'Правка на сайте'
		},
		{
			name: 'Версии блоков'
		},
		{
			name: 'Каталог компании'
		},
		{
			name: 'Формы обращений'
		},
		{
			name: 'Настройки сайта'
		},
		{
			name: 'Личный кабинет'
		},
		{
			name: 'Посуточная подписка'
		},
		{
			name: 'Баланс и платежи'
		},
		{
			name: 'История списаний'
		},
		{
			name: 'Поддержка LEGET'
		}
	];
	// Case studies data
	const caseStudies = [
		{
			client: 'Promo-1',
			name: 'Промо-1',
			title: 'Мебельная компания',
			description:
				'Сайт для мебели на заказ: каталог, проекты, услуги, контакты и формы обращений.',
			href: '/catalog/promo-1',
			date: '01.04.26',
			status: 'active'
		},
		{
			client: 'Promo-2',
			name: 'Промо-2',
			title: 'Фабрика мебели',
			description:
				'Шаблон для мебельной фабрики: продукция, производство и сотрудничество. В разработке.',
			href: '/catalog/promo-2',
			date: '05.04.26',
			status: 'draft'
		},
		{
			client: 'Promo-3',
			name: 'Промо-3',
			title: 'Плитка и коллекции',
			description:
				'Шаблон для салона плитки: каталог коллекций и информация для покупателей. В разработке.',
			href: '/catalog/promo-3',
			date: '11.04.26',
			status: 'draft'
		}
	];
</script>

<svelte:head>
	<title>LEGET — сайты для мебельного бизнеса по подписке</title>
	<meta
		name="description"
		content="Сайт для мебельного бизнеса за 150 ₽ в сутки. Готовая структура, редактирование на сайте и 72 часа тестового периода после создания сайта."
	/>
</svelte:head>

<!-- Hero Section -->
<Container class="mt-24 font-light sm:mt-32 md:mt-56 ">
	<FadeIn class="max-w-4xl">
		<!-- Trial period notification -->
		<!-- Пилюля снята: цену держит типографика, а не контейнер.
		     Акцент — ось ширины Mona Sans и плотность краски. -->
		<div class="text-sm leading-normal font-normal text-neutral-600">
			Всего за
			<span
				class="font-display border-b border-neutral-950/25 pb-0.5 text-[1.25em] font-semibold tracking-[-0.01em] text-neutral-950"
				>150 руб/день</span
			>
		</div>
		<h1
			class="font-display py-6 text-3xl font-medium tracking-normal text-balance text-neutral-950 sm:text-7xl"
		>
			Сайт для мебельного бизнеса <span class="font-medium text-neutral-900">по подписке</span>
		</h1>
		<!-- <p class="mt-6 text-lg text-neutral-600 sm:text-xl">
			Современные решения по подписке <span class="font-semibold text-neutral-900"
				>всего за 150 руб/день</span
			>.
		</p> -->
		<p class="mt-2 text-sm text-neutral-600 sm:text-xl">
			Выберите шаблон, создайте сайт и замените стартовые тексты и изображения на свои. Контент
			редактируется прямо на сайте, а настройки и баланс доступны в личном кабинете. Первые 72 часа
			после создания сайта — тестовый период без списаний.
		</p>
		<div class="mt-10 flex flex-wrap gap-4">
			<Button href="/register" class="px-8 py-3 text-lg">Попробовать бесплатно</Button>
			<Button href="/login" invert class="px-8 py-3 text-lg ring-1 ring-neutral-950"
				>Войти в кабинет</Button
			>
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
				Что доступно на платформе
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
<SectionIntro
	title="Шаблоны для мебели и обустройства дома"
	class="mt-24 sm:mt-32 lg:mt-40"
	maxWidth="max-w-3xl"
>
	<p>
		Для подключения доступен Promo-1 — сайт для мебели на заказ. Promo-2 для мебельных фабрик и
		Promo-3 для плитки и коллекций находятся в разработке. У каждого шаблона своя структура страниц
		и разделов.
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
						<span class="font-semibold">Шаблон: {caseStudy.name}</span>
					</p>
					<p class="font-display mt-6 text-2xl font-semibold text-neutral-950">
						{#if caseStudy.status === 'active'}
							<a href={caseStudy.href}>
								{caseStudy.title}
							</a>
						{:else}
							{caseStudy.title}
						{/if}
					</p>
					<p class="mt-4 flex-auto text-base text-neutral-600">
						{caseStudy.description}
					</p>
					<div class="mt-8 flex">
						{#if caseStudy.status === 'active'}
							<Button href={caseStudy.href}>Подробнее</Button>
						{:else}
							<Button disabled class="cursor-not-allowed opacity-50">В разработке</Button>
						{/if}
					</div>
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
				>Команда LEGET</span
			>
		</div>
	{/snippet}
	LEGET объединяет структуру отраслевого сайта, редактирование контента и посуточную подписку. Вы работаете
	с предложением своей компании, а команда LEGET развивает платформу.
</Testimonial>

<!-- Services Section -->
<SectionIntro
	eyebrow="Сервис"
	title="Один сайт — от настройки до ежедневной работы"
	class="mt-24 sm:mt-32 lg:mt-40"
>
	<p>
		Начните самостоятельно или обратитесь в LEGET за помощью с настройкой. После запуска вы сможете
		обновлять материалы и следить за оплатой в своём аккаунте.
	</p>
</SectionIntro>

<Container class="mt-16">
	<div class="lg:flex lg:items-center lg:justify-end">
		<div class="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
			<FadeIn class="w-135 flex-none lg:w-180">
				<StylizedImage
					src="/images/laptop.jpg"
					alt="Работа с сайтом на ноутбуке"
					class="justify-center lg:justify-end"
				/>
			</FadeIn>
		</div>
		<List class="mt-16 lg:mt-0 lg:w-1/2 lg:min-w-132 lg:pl-4">
			<ListItem title="Разработка"
				>Команда LEGET обновляет платформу и доступные блоки шаблонов. Сохранённые материалы вашей
				компании используются отдельно от стартового контента.</ListItem
			>
			<ListItem title="Техническая поддержка">
				По вопросам настройки и работы сайта обращайтесь в LEGET через страницу контактов. Укажите
				домен и опишите, что произошло.
			</ListItem>
			<ListItem title="Безопасность">
				Доступ к управлению сайтом привязан к аккаунту владельца. Подтвердите почту при регистрации
				и используйте надёжный пароль.
			</ListItem>
			<ListItem title="Управление контентом">
				Тексты и изображения меняются на самом сайте в режиме редактирования. В личном кабинете
				доступны настройки сайта, разделы каталога и баланс.
			</ListItem>
		</List>
	</div>
</Container>

<!-- Contact Section -->
<ContactSection />
