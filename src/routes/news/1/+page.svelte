<script>
	import Border from '$lib/components/Border.svelte';
	import ContactSection from '$lib/components/ContactSection.svelte';
	import Container from '$lib/components/Container.svelte';
	import FadeIn from '$lib/components/FadeIn.svelte';
	import PageIntro from '$lib/components/PageIntro.svelte';
	import PageLinks from '$lib/components/PageLinks.svelte';
	import { formatDate } from '$lib/formatDate.js';

	/**
	 * Новости Article: Старт проекта LEGET
	 */

	const article = {
		date: '2025-08-01',
		title: 'Старт проекта LEGET: новый взгляд на разработку сайтов',
		description:
			'Официальный запуск платформы LEGET. Наша миссия — сделать профессиональные веб-решения доступными для каждого бизнеса.',
		author: {
			name: 'Евгений Че',
			role: 'CEO LEGET',
			image: '/images/team/andrey.jpg'
		}
	};

	const moreArticles = [
		{
			href: '/news/2',
			date: '2026-04-03',
			title: 'Запуск сайта за 72 часа: преимущества аренды',
			description:
				'Почему современному бизнесу выгоднее арендовать готовое технологичное решение.'
		},
		{
			href: '/news/3',
			date: '2025-12-01',
			title: 'Как выбрать идеальный проект для бизнеса',
			description:
				'Разбираемся, на что обратить внимание при выборе структуры сайта.'
		}
	];
</script>

<svelte:head>
	<title>{article.title} - LEGET</title>
	<meta name="description" content={article.description} />
</svelte:head>

<Container as="article" class="mt-24 sm:mt-32 lg:mt-40">
	<FadeIn>
		<header class="mx-auto flex max-w-5xl flex-col text-center">
			<h1
				class="mt-6 font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-6xl"
			>
				{article.title}
			</h1>
			<time datetime={article.date} class="order-first text-sm text-neutral-950">
				{formatDate(article.date)}
			</time>
			<p class="mt-6 text-sm font-semibold text-neutral-950">
				Автор: {article.author.name}, {article.author.role}
			</p>
		</header>
	</FadeIn>

	<FadeIn>
		<div
			class="[&>*]:mx-auto [&>*]:max-w-3xl [&>:first-child]:!mt-0 [&>:last-child]:!mb-0 mt-24 sm:mt-32 lg:mt-40"
		>
			<div class="typography">
				<h2>Рождение идеи</h2>
				<p>
					Проект LEGET родился из простого наблюдения: малый и средний бизнес часто оказывается заложником между сложными, дорогостоящими студиями и примитивными конструкторами сайтов, которые часто не дают нужного качества. Мы решили создать «золотую середину» — сервис аренды готовых высокотехнологичных сайтов.
				</p>
				<p>
					Наша цель — избавить предпринимателя от головной боли, связанной с поиском разработчиков, дизайнеров и хостинга. Мы объединили премиальный дизайн и мощную техническую базу в одно доступное решение.
				</p>
				<figure class="my-10">
					<img src="/images/projects/promo-1/hero.jpg" alt="Команда LEGET" class="rounded-2xl" />
				</figure>

				<h2>Наши приоритеты</h2>
				<p>
					С самого первого дня мы поставили во главу угла три принципа: скорость, качество и поддержка. Мы используем Svelte — один из самых быстрых фреймворков современности, чтобы ваши сайты летали. Мы работаем с YandexCloud, чтобы обеспечить надежность.
				</p>
				<p>
					Старт LEGET — это только начало большого пути. Мы планируем постоянно расширять линейку проектов, добавлять новые модули интеграции и упрощать процесс взаимодействия с клиентом.
				</p>

				<h2>Будущее доступного веба</h2>
				<p>
					Мы верим, что в скором времени аренда сайта станет таким же стандартом, как аренда офиса. Это позволяет бизнесу быть гибким, быстро проверять гипотезы и не тратить лишние средства на этапе старта. Присоединяйтесь к нам в этом путешествии!
				</p>
			</div>
		</div>
	</FadeIn>
</Container>

<PageLinks
	class="mt-24 sm:mt-32 lg:mt-40"
	title="Другие новости"
	intro="Узнайте больше о развитии платформы и полезных советах для бизнеса."
	pages={moreArticles}
/>

<ContactSection />
