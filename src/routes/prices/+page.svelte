<script>
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

	const pricingTiers = [
		{
			name: 'Лендинг',
			price: '170',
			period: 'день',
			description: 'Идеальное решение для старта. Быстрый запуск продукта или услуги.',
			status: 'dev' // В разработке
		},
		{
			name: 'Фирменный сайт',
			price: '170',
			period: 'день',
			description: 'Полноценное представительство вашего бизнеса в интернете.',
			featured: true,
			status: 'active',
			href: '/catalog'
		},
		{
			name: 'Интернет-магазин',
			price: '170',
			period: 'день',
			description: 'Мощный инструмент для эффективных онлайн-продаж.',
			status: 'dev' // В разработке
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

	function handleSubscribe(tier) {
		if (tier.status !== 'active') return;
		if (browser) {
			const token = localStorage.getItem('auth_token');
			if (!token) {
				const returnUrl = encodeURIComponent('/prices');
				goto(`/login?redirect=${returnUrl}`);
			} else {
				goto(tier.href);
			}
		}
	}
</script>

<svelte:head>
	<title>Цены и тарифы — LEGET</title>
	<meta
		name="description"
		content="Тарифы на готовые сайты по подписке. Лендинг, фирменный сайт или интернет-магазин."
	/>
</svelte:head>

<Container class="mt-24 sm:mt-32 md:mt-56">
	<FadeIn class="max-w-3xl">
		<h1
			class="font-display text-5xl font-medium tracking-tight text-balance text-neutral-950 sm:text-7xl"
		>
			Прозрачные тарифы без скрытых платежей
		</h1>
		<p class="mt-6 text-xl text-neutral-600">
			Выберите подходящий формат для вашего бизнеса. Все заботы по поддержке, безопасности и
			развитию мы берем на себя.
		</p>
	</FadeIn>
</Container>

<Container class="mt-24 sm:mt-32 lg:mt-40">
	<FadeInStagger class="align-items-center grid grid-cols-1 gap-8 lg:grid-cols-3">
		{#each pricingTiers as tier}
			<FadeIn class="flex h-full">
				<div
					class="flex w-full flex-col justify-between rounded-3xl p-8 ring-1 transition-all duration-300 sm:p-10
					{tier.featured
						? 'z-10 scale-100 bg-neutral-950 text-white shadow-xl ring-neutral-950 lg:scale-105'
						: 'bg-white text-neutral-950 ring-neutral-950/10 hover:bg-neutral-50/50'}"
				>
					<div>
						<h3 id={tier.name} class="font-display text-2xl font-semibold">
							{tier.name}
						</h3>
						<p
							class="mt-4 text-sm leading-6 {tier.featured
								? 'text-neutral-300'
								: 'text-neutral-600'}"
						>
							{tier.description}
						</p>
						<div class="mt-8 flex items-baseline gap-x-2">
							<span class="text-5xl font-bold tracking-tight"
								>{tier.price} <span class="text-3xl font-medium">₽</span></span
							>
							<span
								class="text-sm leading-6 font-semibold {tier.featured
									? 'text-neutral-300'
									: 'text-neutral-500'}">/ {tier.period}</span
							>
						</div>
					</div>
					<div class="mt-10">
						{#if tier.status === 'active'}
							<Button
								onclick={() => handleSubscribe(tier)}
								invert={!tier.featured}
								class="w-full justify-center"
							>
								Выбрать шаблон
							</Button>
						{:else}
							<button
								disabled
								class="w-full cursor-not-allowed rounded-full px-6 py-3 text-sm font-semibold opacity-50
								{tier.featured ? 'bg-white text-neutral-950' : 'bg-neutral-950 text-white'}"
							>
								В разработке
							</button>
						{/if}
					</div>
				</div>
			</FadeIn>
		{/each}
	</FadeInStagger>
</Container>

<SectionIntro title="Что входит в базовую настройку" class="mt-24 sm:mt-32 lg:mt-40">
	<p>
		Каждый тарифный план включает в себя необходимые услуги для успешного старта. Вы получаете
		полностью готовый к работе инструмент за 72 часа.
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
