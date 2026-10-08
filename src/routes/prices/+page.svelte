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
		description: 'Сайт на отраслевом шаблоне. Сейчас для подключения доступен Promo-1.',
		status: 'active',
		href: '/catalog'
	};

	// Поддерживаемые способы пополнения баланса.
	const paymentMethods = [
		{
			name: 'Онлайн через ЮKassa',
			description:
				'Создайте платёж из личного кабинета. Баланс пополнится после подтверждения успешной оплаты.'
		},
		{
			name: 'По безналичному счёту',
			description:
				'Укажите плательщика, скачайте счёт и оплатите его через свой банк. Средства поступят на баланс после подтверждения оплаты командой LEGET.'
		}
	];

	const baseFeatures = [
		{
			title: 'Структура и стартовый контент',
			description:
				'Страницы и блоки выбранного шаблона. Замените примеры текстов и изображений материалами своей компании.'
		},
		{
			title: 'Редактирование на сайте',
			description: 'Обновляйте доступные тексты и изображения прямо на сайте после входа.'
		},
		{
			title: 'Настройки в личном кабинете',
			description:
				'Название, домен, логотип, город, разделы каталога и идентификаторы счётчиков аналитики.'
		},
		{
			title: 'Приём обращений',
			description:
				'Обращения посетителей сохраняются в системе, а уведомления отправляются на настроенную почту.'
		},
		{
			title: 'Размещение и обновления',
			description: 'Сайт работает на платформе LEGET и получает обновления доступных блоков.'
		},
		{
			title: 'Помощь с настройкой',
			description:
				'Обратитесь в LEGET по вопросам подключения домена и работы сайта. Состав дополнительной помощи согласуйте с командой.'
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
		content="Сайт LEGET за 150 ₽ в сутки. 72 часа тестового периода после создания сайта, ежедневные списания с баланса, пополнение через ЮKassa или по счёту."
	/>
</svelte:head>

<Container class="mt-24 sm:mt-32 md:mt-56">
	<FadeIn class="max-w-3xl">
		<h1
			class="font-display text-5xl font-medium tracking-tight text-balance text-neutral-950 sm:text-7xl"
		>
			Сайт за 150 ₽ в сутки
		</h1>
		<p class="mt-6 text-xl text-neutral-600">
			Первые 72 часа после создания сайта — тестовый период без списаний. Затем стоимость каждого
			активного сайта списывается ежедневно с общего баланса аккаунта.
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

<!-- Способы оплаты -->
<Container class="mt-16 sm:mt-20">
	<FadeIn>
		<h2 class="font-display text-2xl font-semibold text-neutral-950">Как пополнить баланс</h2>
	</FadeIn>
	<FadeInStagger class="mt-8 border-t border-neutral-950/10">
		{#each paymentMethods as item}
			<FadeIn>
				<div
					class="flex flex-col gap-3 border-b border-neutral-950/10 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
				>
					<div class="sm:max-w-xl">
						<h3 class="text-lg font-semibold text-neutral-950">{item.name}</h3>
						<p class="mt-1 text-base text-neutral-600">{item.description}</p>
					</div>
				</div>
			</FadeIn>
		{/each}
	</FadeInStagger>
</Container>

<SectionIntro title="Что вы получаете по подписке" class="mt-24 sm:mt-32 lg:mt-40">
	<p>
		Шаблон даёт основу сайта, а вы добавляете материалы компании. Подключение домена и готовность
		контента определяют момент запуска; 72 часа — продолжительность тестового периода.
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

<SectionIntro title="Как происходят списания" class="mt-24 sm:mt-32 lg:mt-40">
	<p>
		Списание запланировано ежедневно на 06:30 по Москве. Первое списание — в ближайшее такое время
		после полных 72 часов тестового периода. За несколько активных сайтов средства списываются
		отдельно по каждому.
	</p>
	<p class="mt-6">
		Чтобы остановить будущие списания, отмените лицензию в настройках сайта. Прекращение пополнений
		не отменяет подписку: баланс может стать отрицательным. При отмене учитываются уже наступившие
		дни аренды.
	</p>
</SectionIntro>

<ContactSection class="mt-24 sm:mt-32 lg:mt-40" />
