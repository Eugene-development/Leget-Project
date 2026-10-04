<script>
	import { getAuthToken } from '$lib/utils/auth-session.js';
	import Container from '$lib/components/Container.svelte';
	import FadeIn from '$lib/components/FadeIn.svelte';
	import FadeInStagger from '$lib/components/FadeInStagger.svelte';
	import SectionIntro from '$lib/components/SectionIntro.svelte';
	import List from '$lib/components/List.svelte';
	import ListItem from '$lib/components/ListItem.svelte';
	import ContactSection from '$lib/components/ContactSection.svelte';
	import Button from '$lib/components/Button.svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	// Единственный формат, который можно купить сегодня.
	const plan = {
		name: 'Фирменный сайт',
		price: '150',
		period: 'день',
		description: 'Полноценное представительство вашего бизнеса в интернете.',
		status: 'active',
		href: '/catalog'
	};

	// Форматы, которых ещё нет. Они не тарифы: цены у них нет и купить их нельзя.
	const upcoming = [
		{
			name: 'Лендинг',
			description: 'Идеальное решение для старта. Быстрый запуск продукта или услуги.'
		},
		{
			name: 'Интернет-магазин',
			description: 'Мощный инструмент для эффективных онлайн-продаж.'
		}
	];

	const baseFeatures = [
		{
			title: 'Подключение и настройка домена',
			description: 'Помощь в привязке вашего доменного имени к сайту'
		},
		{
			title: 'Установка SSL-сертификата',
			description: 'Обеспечение безопасного соединения (HTTPS) для ваших пользователей'
		},
		{
			title: 'Интеграция логотипа',
			description: 'Установка вашего фирменного знака и цветовой палитры'
		},
		{
			title: 'Указание контактных данных',
			description: 'Размещение телефонов, email, адресов и ссылок на соцсети'
		},
		{
			title: 'Корпоративная почта',
			description: 'Настройка почтовых ящиков на вашем домене (например, info@yoursite.ru)'
		},
		{
			title: 'Базовое наполнение',
			description: 'Стартовый набор ваших фотографий и текстов для быстрого запуска'
		},
		{
			title: 'Уведомления о заявках',
			description: 'Настройка отправки всех обращений с сайта на вашу почту'
		}
	];

	function handleSubscribe() {
		if (plan.status !== 'active') return;
		if (browser) {
			const token = getAuthToken();
			if (!token) {
				const returnUrl = encodeURIComponent('/prices');
				goto(`/login?redirect=${returnUrl}`);
			} else {
				goto(plan.href);
			}
		}
	}
</script>

<svelte:head>
	<title>Цены и тарифы — LEGET</title>
	<meta
		name="description"
		content="Готовый сайт по подписке за 150 ₽ в день. Одна цена на любой шаблон из каталога, поддержка и развитие включены."
	/>
</svelte:head>

<Container class="mt-24 sm:mt-32 md:mt-56">
	<FadeIn class="max-w-3xl">
		<h1
			class="font-display text-5xl font-medium tracking-tight text-balance text-neutral-950 sm:text-7xl"
		>
			Одна цена без скрытых платежей
		</h1>
		<p class="mt-6 text-xl text-neutral-600">
			Цена одна для любого шаблона из каталога. Все заботы по поддержке, безопасности и развитию мы
			берем на себя.
		</p>
	</FadeIn>
</Container>

<!-- Тариф один, поэтому он не карточка в ряду, а разворот во всю полосу:
     слева — что покупают, справа — сколько это стоит и как начать. -->
<Container class="mt-24 sm:mt-32 lg:mt-40">
	<FadeIn>
		<div class="rounded-3xl bg-neutral-50 p-8 ring-1 ring-neutral-950/5 sm:p-12">
			<div class="lg:flex lg:items-end lg:justify-between lg:gap-16">
				<div class="lg:max-w-md">
					<h2 class="font-display text-3xl font-semibold text-neutral-950">
						{plan.name}
					</h2>
					<p class="mt-4 text-base text-neutral-600">
						{plan.description}
					</p>
				</div>
				<div
					class="mt-10 border-t border-neutral-950/10 pt-10 lg:mt-0 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-16"
				>
					<div class="flex items-baseline gap-x-3">
						<span
							class="font-display text-6xl font-semibold tracking-tight text-neutral-950 tabular-nums sm:text-7xl"
							>{plan.price}</span
						>
						<span class="font-display text-3xl font-medium text-neutral-950">₽</span>
						<span class="text-base text-neutral-500">/ {plan.period}</span>
					</div>
					<Button onclick={handleSubscribe} class="mt-8 w-full justify-center sm:w-auto">
						Выбрать шаблон
					</Button>
				</div>
			</div>
		</div>
	</FadeIn>
</Container>

<!-- Форматы без цены и без кнопки: они ещё не товар, и колонка прайса им не полагается. -->
<Container class="mt-16 sm:mt-20">
	<FadeIn>
		<h2 class="font-display text-2xl font-semibold text-neutral-950">Форматы в разработке</h2>
	</FadeIn>
	<FadeInStagger class="mt-8 border-t border-neutral-950/10">
		{#each upcoming as item}
			<FadeIn>
				<div
					class="flex flex-col gap-3 border-b border-neutral-950/10 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
				>
					<div class="sm:max-w-xl">
						<h3 class="text-lg font-semibold text-neutral-950">{item.name}</h3>
						<p class="mt-1 text-base text-neutral-600">{item.description}</p>
					</div>
					<span
						class="shrink-0 self-start rounded-3xl bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-600"
					>
						В разработке
					</span>
				</div>
			</FadeIn>
		{/each}
	</FadeInStagger>
</Container>

<SectionIntro title="Что входит в базовую настройку" class="mt-24 sm:mt-32 lg:mt-40">
	<p>
		Тариф включает в себя необходимые услуги для успешного старта. Вы получаете полностью готовый к
		работе инструмент за 72 часа.
	</p>
</SectionIntro>

<Container class="mt-16">
	<div class="rounded-4xl bg-neutral-50 px-6 py-16 ring-1 ring-neutral-950/5 sm:px-12 lg:px-20">
		<List class="grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-2">
			{#each baseFeatures as feature}
				<div class="group relative">
					<ListItem title={feature.title}>
						{feature.description}
					</ListItem>
				</div>
			{/each}
		</List>
	</div>
</Container>

<ContactSection class="mt-24 sm:mt-32 lg:mt-40" />
