<script>
	import Border from '$lib/components/Border.svelte';
	import ContactSection from '$lib/components/ContactSection.svelte';
	import Container from '$lib/components/Container.svelte';
	import FadeIn from '$lib/components/FadeIn.svelte';
	import PageLinks from '$lib/components/PageLinks.svelte';
	import { formatDate } from '$lib/formatDate.js';

	import { articles } from '$lib/content/articles.js';
	const article = articles.find((item) => item.id === 3);
	const moreArticles = articles.filter((item) => item.id !== 3).slice(0, 2);
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
				<h2>Сначала — направление бизнеса</h2>
				<p>
					Promo-1 предназначен для мебели на заказ. В его составе есть каталог, проекты, услуги,
					контакты и формы обращений. Этот шаблон доступен для подключения.
				</p>
				<p>
					Promo-2 ориентирован на мебельные фабрики, Promo-3 — на плитку и коллекции. Оба шаблона
					доступны для подключения в каталоге.
				</p>
				<h2>Проверьте состав страниц</h2>
				<p>
					Сравните структуру шаблона с тем, что нужно вашим покупателям: ассортиментом, примерами
					работ, описанием услуг и способом связаться с компанией. Посмотрите демоверсию доступного
					шаблона.
				</p>
				<p>
					Каталог товаров или коллекций сам по себе не означает интернет-магазин с корзиной и
					оплатой. Проверяйте конкретные возможности в описании шаблона и уточняйте их у команды
					LEGET.
				</p>
				<h2>Шаблон, версия блока и контент</h2>
				<p>
					Шаблон задаёт структуру сайта. В Promo-1 версии блоков позволяют выбирать доступные
					варианты композиции прямо на странице. Ваши тексты и изображения — отдельное содержание
					этих блоков.
				</p>
				<p>
					Дизайн-система задаёт общие правила оформления. Самостоятельный выбор дизайн-системы в
					личном кабинете пока не доступен; свободная настройка шрифтов и цветов не входит в
					описанный здесь процесс.
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
