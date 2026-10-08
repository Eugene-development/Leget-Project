<script>
	import Border from '$lib/components/Border.svelte';
	import ContactSection from '$lib/components/ContactSection.svelte';
	import Container from '$lib/components/Container.svelte';
	import FadeIn from '$lib/components/FadeIn.svelte';
	import PageIntro from '$lib/components/PageIntro.svelte';
	import PageLinks from '$lib/components/PageLinks.svelte';
	import { formatDate } from '$lib/formatDate.js';

	import { articles } from '$lib/content/articles.js';
	const article = articles.find((item) => item.id === 1);
	const moreArticles = articles.filter((item) => item.id !== 1).slice(0, 2);
</script>

<svelte:head>
	<title>{article.title} — Материалы LEGET</title>
	<meta name="description" content={article.description} />
</svelte:head>

<Container as="article" class="mt-24 sm:mt-32 lg:mt-40">
	<FadeIn>
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
				<h2>Сайт начинается с отраслевого шаблона</h2>
				<p>
					LEGET предоставляет сайты по посуточной подписке. Шаблон определяет страницы, разделы и
					стартовый контент. Для подключения сейчас доступен Promo-1 — сайт для компаний, которые
					работают с мебелью на заказ.
				</p>
				<p>
					Перед работой с клиентами замените примеры на сведения о своей компании: тексты,
					фотографии, контакты и условия услуг. Проверьте, какие разделы действительно нужны вашему
					бизнесу.
				</p>
				<h2>Личный кабинет и ваш сайт</h2>
				<p>
					В личном кабинете находятся ваши сайты, настройки и баланс. Здесь можно указать домен,
					загрузить логотип, выбрать город и управлять видимостью разделов каталога.
				</p>
				<p>
					Для изменения текстов и изображений откройте сам сайт и войдите в режим редактирования. В
					Promo-1 также доступны версии блоков — варианты их композиции.
				</p>
				<h2>Подписка и поддержка</h2>
				<p>
					После создания сайта начинаются 72 часа тестового периода без списаний. Затем каждый
					активный сайт оплачивается с баланса аккаунта по 150 ₽ в сутки.
				</p>
				<p>
					Вы можете настроить сайт самостоятельно или обратиться в LEGET за помощью. Напишите, какой
					у вас бизнес и на каком этапе возник вопрос.
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
