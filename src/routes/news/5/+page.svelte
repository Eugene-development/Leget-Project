<script>
	import ContactSection from '$lib/components/ContactSection.svelte';
	import Container from '$lib/components/Container.svelte';
	import FadeIn from '$lib/components/FadeIn.svelte';
	import PageLinks from '$lib/components/PageLinks.svelte';
	import { formatDate } from '$lib/formatDate.js';

	/**
	 * Новости Article: LEGET работает в шести странах
	 */

	const article = {
		date: '2026-06-13',
		title: 'LEGET выходит на международный рынок: работаем в шести странах',
		description:
			'Платформа готовых сайтов для бизнеса теперь доступна предпринимателям в шести странах. Рассказываем о географии присутствия и планах расширения.',
		author: {
			name: 'Евгений Че',
			role: 'CEO LEGET',
			image: '/images/team/andrey.jpg'
		}
	};

	const moreArticles = [
		{
			href: '/news/4',
			date: '2026-05-18',
			title: 'Скорость — главный фактор юзабилити',
			description:
				'Как мы провели масштабную оптимизацию сервисов LEGET и повысили скорость работы платформы.'
		},
		{
			href: '/news/2',
			date: '2026-04-03',
			title: 'Запуск сайта за 72 часа: преимущества аренды',
			description:
				'Почему современному бизнесу выгоднее арендовать готовое технологичное решение.'
		}
	];
</script>

<svelte:head>
	<title>{article.title} — Новости LEGET</title>
	<meta
		name="description"
		content="LEGET расширяет географию присутствия: платформа готовых сайтов для бизнеса теперь доступна предпринимателям в шести странах."
	/>
</svelte:head>

<Container as="article" class="mt-24 sm:mt-32 lg:mt-40">
	<FadeIn>
		<div class="mx-auto mb-8 flex max-w-5xl justify-center">
			<nav aria-label="Breadcrumb">
				<ol class="flex flex-wrap items-center gap-x-2 font-display text-sm font-semibold text-neutral-500">
					<li class="flex items-center gap-x-2">
						<a href="/" class="transition hover:text-neutral-950">Главная</a>
						<svg aria-hidden="true" class="size-3 shrink-0 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
						</svg>
					</li>
					<li class="flex items-center gap-x-2">
						<a href="/news" class="transition hover:text-neutral-950">Новости</a>
					</li>
				</ol>
			</nav>
		</div>
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
				<h2>Шесть стран — одна платформа</h2>
				<p>
					<strong>13 июня 2026 года</strong> — LEGET объявляет о расширении географии присутствия. Платформа готовых высокотехнологичных сайтов для бизнеса теперь доступна предпринимателям в шести странах.
				</p>
				<p>
					Начав работу в России, мы постепенно вышли на рынки соседних стран, адаптируя наши решения под местные особенности бизнеса, языковые требования и платёжные системы. Сегодня LEGET — это международная платформа, которая помогает предпринимателям в нескольких странах получить доступ к качественным веб-решениям без длительной и дорогостоящей разработки.
				</p>

				<h2>География присутствия</h2>
				<p>
					На сегодняшний день LEGET работает в следующих странах:
				</p>
				<ul>
					<li><strong>Россия</strong> — рынок, на котором мы начали работу и который остаётся ключевым.</li>
					<li><strong>Казахстан</strong> — активно растущий рынок с высоким спросом на готовые веб-решения для малого бизнеса.</li>
					<li><strong>Беларусь</strong> — близкий рынок с общей языковой и культурной средой.</li>
					<li><strong>Узбекистан</strong> — одна из быстрорастущих экономик Центральной Азии с активной цифровизацией.</li>
					<li><strong>Кыргызстан</strong> — рынок с потенциалом для внедрения доступных технологических решений.</li>
					<li><strong>Армения</strong> — рынок с активно развивающимся IT-сектором.</li>
				</ul>

				<aside class="my-10 rounded-2xl bg-neutral-50 p-8">
					<p class="text-sm font-semibold text-neutral-950">Ключевые цифры</p>
					<p class="mt-2 text-sm text-neutral-600">
						6 стран присутствия. Каталог проектов адаптирован под каждую страну. Поддержка местных языков и валют. Интеграция с локальными платёжными системами.
					</p>
				</aside>

				<h2>Что стоит за расширением</h2>
				<p>
					Выход на новый рынок — это не просто перевод интерфейса. Мы адаптируем каждый проект под особенности конкретной страны: локальные стандарты проектирования, предпочтения аудитории, юридические требования и платёжные инфраструктуры.
				</p>
				<p>
					«Каждый рынок уникален, — комментирует Евгений Че, CEO LEGET. — Мы не просто копируем решение из одной страны в другую. Мы изучаем потребности localного бизнеса и адаптируем наши проекты так, чтобы они действительно работали в каждом регионе».
				</p>

				<h2>Планы на будущее</h2>
				<p>
					Мы продолжаем активно исследовать новые рынки. В планах на ближайшее время — расширение присутствия в Закавказье и Центральной Азии, а также запуск локализованных версий проектов для рынков с арабоязычной аудиторией.
				</p>
				<p>
					Независимо от страны, качество и скорость остаются нашими главными принципами. Предприниматели в любой из стран, где работает LEGET, получают одинаковый уровень сервиса: запуск за 72 часа, премиальный дизайн и круглосуточную поддержку.
				</p>
			</div>
		</div>
	</FadeIn>
</Container>

<PageLinks
	class="mt-24 sm:mt-32 lg:mt-40"
	title="Другие новости"
	intro="Читайте другие новости и события компании LEGET."
	pages={moreArticles}
/>

<ContactSection />
