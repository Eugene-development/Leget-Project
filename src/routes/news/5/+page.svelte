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
		title: 'LEGET расширяет границы: теперь мы работаем в 6 странах',
		description:
			'Запустили локальные версии платформы и поддержку местных платежных систем для предпринимателей из Армении, Беларуси, Казахстана, Кыргызстана и Узбекистана.',
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
		content="Платформа готовых сайтов LEGET выходит на международный рынок. Рассказываем об адаптации под локальные валюты, языки и популярные платежные системы."
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
				<h2>География растёт</h2>
				<p>
					<strong>13 июня 2026 года</strong> LEGET выходит на международный уровень. Теперь запустить готовый сайт по нашей подписке могут предприниматели в шести странах.
				</p>
				<p>
					Мы начинали с России, но быстро поняли, что аналогичные проблемы с запуском сайтов есть и у бизнеса в соседних странах. Мы адаптировали платформу под локальные рынки, чтобы дать удобный инструмент каждому.
				</p>

				<h2>Где теперь можно арендовать LEGET:</h2>
				<ul>
					<li><strong>Россия</strong> — наш первый рынок, где мы отладили все процессы.</li>
					<li><strong>Казахстан</strong> — здесь активно растёт спрос на быстрые готовые сайты для малого бизнеса.</li>
					<li><strong>Беларусь</strong> — запуск решений без культурных и языковых барьеров.</li>
					<li><strong>Узбекистан</strong> — быстро развивающийся рынок, где бизнесу сейчас очень важна цифровизация.</li>
					<li><strong>Кыргызстан</strong> — доступные веб-решения для запуска локальных проектов.</li>
					<li><strong>Армения</strong> — поддержка технологических инициатив и сферы услуг.</li>
				</ul>

				<aside class="my-10 rounded-2xl bg-neutral-50 p-8">
					<p class="text-sm font-semibold text-neutral-950">Что значит локализация для бизнеса:</p>
					<p class="mt-2 text-sm text-neutral-600">
						Мы не просто перевели тексты. Для каждой страны мы добавили поддержку национальных валют, подключили популярные местные платежные шлюзы и оптимизировали доставку контента через региональные серверы.
					</p>
				</aside>

				<h2>Что стоит за расширением</h2>
				<p>
					Выход в новую страну — это детальная настройка под местные реалии. Мы учитываем юридические требования, предпочтения аудитории в оформлении и технические стандарты регионов.
				</p>
				<p>
					«Каждый рынок имеет свои особенности. Где-то все пользуются одной платежной системой, где-то привыкли к другому стилю оформления. Мы общаемся с местными предпринимателями и адаптируем шаблоны под их привычки», — отмечает Евгений Че, CEO LEGET.
				</p>

				<h2>Планы на будущее</h2>
				<p>
					Мы продолжаем подключать новые регионы. В планах на ближайшее время — расширение присутствия в Закавказье и Центральной Азии, а также локализация шаблонов для новых языковых групп.
				</p>
				<p>
					При этом наши стандарты остаются прежними для любого региона: запуск за 72 часа, качественный современный дизайн и поддержка, которая всегда на связи.
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
