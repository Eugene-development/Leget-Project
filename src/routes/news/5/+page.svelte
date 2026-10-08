<script>
	import ContactSection from '$lib/components/ContactSection.svelte';
	import Container from '$lib/components/Container.svelte';
	import FadeIn from '$lib/components/FadeIn.svelte';
	import PageLinks from '$lib/components/PageLinks.svelte';
	import { formatDate } from '$lib/formatDate.js';

	import { articles } from '$lib/content/articles.js';
	const article = articles.find((item) => item.id === 5);
	const moreArticles = articles.filter((item) => item.id !== 5).slice(0, 2);
</script>

<svelte:head>
	<title>{article.title} — Материалы LEGET</title>
	<meta name="description" content={article.description} />
</svelte:head>

<Container as="article" class="mt-24 sm:mt-32 lg:mt-40">
	<FadeIn>
		<div class="mx-auto mb-8 flex max-w-5xl justify-center">
			<nav aria-label="Хлебные крошки">
				<ol
					class="font-display flex flex-wrap items-center gap-x-2 text-sm font-semibold text-neutral-500"
				>
					<li class="flex items-center gap-x-2">
						<a href="/" class="transition hover:text-neutral-950">Главная</a>
						<svg
							aria-hidden="true"
							class="size-3 shrink-0 text-neutral-300"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</li>
					<li class="flex items-center gap-x-2">
						<a href="/news" class="transition hover:text-neutral-950">Материалы</a>
					</li>
				</ol>
			</nav>
		</div>
		<header class="mx-auto flex max-w-5xl flex-col text-center">
			<h1
				class="font-display mt-6 text-5xl font-medium tracking-tight [text-wrap:balance] text-neutral-950 sm:text-6xl"
			>
				{article.title}
			</h1>
			<time datetime={article.date} class="order-first text-sm text-neutral-950">
				Обновлено {formatDate(article.date)}
			</time>
			<p class="mt-6 text-sm font-semibold text-neutral-950">
				{article.author.name}
			</p>
		</header>
	</FadeIn>

	<FadeIn>
		<div
			class="mt-24 sm:mt-32 lg:mt-40 [&>*]:mx-auto [&>*]:max-w-3xl [&>:first-child]:!mt-0 [&>:last-child]:!mb-0"
		>
			<div class="typography">
				<h2>Один баланс для ваших сайтов</h2>
				<p>
					Баланс аккаунта используется для оплаты всех его активных сайтов. Стоимость каждого сайта
					— 150 ₽ в сутки. Пополнения и списания видны в разделе «Баланс и платежи».
				</p>
				<p>
					При создании сайта начинается тестовый период 72 часа без списаний. Ежедневное списание
					запланировано на 06:30 по Москве; первое — после завершения полного тестового периода.
				</p>
				<h2>Два способа пополнения</h2>
				<p>
					Для онлайн-оплаты создайте платёж через ЮKassa из личного кабинета. Средства появятся на
					балансе после подтверждения успешного платежа. Возврат со страницы оплаты ещё не означает,
					что деньги зачислены.
				</p>
				<p>
					Для безналичной оплаты укажите плательщика и сумму, скачайте счёт и оплатите его в своём
					банке. Баланс пополнится после подтверждения поступления денег командой LEGET. Само
					создание счёта не является оплатой.
				</p>
				<h2>Как остановить подписку</h2>
				<p>
					Откройте настройки сайта и отмените лицензию. Сайт будет отключён, а будущие ежедневные
					списания прекратятся. Уже наступившие дни аренды учитываются при отмене.
				</p>
				<p>
					Прекращение пополнений не отменяет подписку: при активном сайте баланс может стать
					отрицательным. Следите за историей операций, а по вопросам оплаты обращайтесь в LEGET.
				</p>
			</div>
		</div>
	</FadeIn>
</Container>

<PageLinks
	class="mt-24 sm:mt-32 lg:mt-40"
	title="Другие материалы"
	intro="Инструкции по настройке сайта и работе с подпиской."
	pages={moreArticles}
/>

<ContactSection />
