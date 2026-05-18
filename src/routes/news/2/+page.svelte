<script>
	import Border from '$lib/components/Border.svelte';
	import ContactSection from '$lib/components/ContactSection.svelte';
	import Container from '$lib/components/Container.svelte';
	import FadeIn from '$lib/components/FadeIn.svelte';
	import PageLinks from '$lib/components/PageLinks.svelte';
	import { formatDate } from '$lib/formatDate.js';

	/**
	 * Новости Article: Запуск сайта за 72 часа
	 */

	const article = {
		date: '2026-04-03',
		title: 'Запуск сайта за 72 часа: преимущества аренды готовых решений',
		description:
			'Почему современному бизнесу выгоднее арендовать готовое технологичное решение, чем вкладываться в длительную и дорогостоящую разработку с нуля.',
		author: {
			name: 'Евгений Че',
			role: 'CEO LEGET',
			image: '/images/team/andrey.jpg'
		}
	};

	const moreArticles = [
		{
			href: '/news/1',
			date: '2025-08-01',
			title: 'Старт проекта LEGET',
			description: 'Начало разработки и запуска нового концепта готовых решений для бизнеса.'
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
	<title>{article.title} — Блог LEGET</title>
	<meta
		name="description"
		content="Почему бизнесу выгоднее арендовать готовое технологичное решение, чем вкладываться в дорогую и длительную разработку с нуля. Разбираем экономику и технологии."
	/>
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
				<h2>LEGET запускает аренду готовых сайтов: сайт за 72 часа</h2>
				<p>
					<strong>3 апреля 2026 года</strong> — компания LEGET официально запустила сервис аренды готовых высокотехнологичных сайтов. Теперь предприниматели могут получить профессиональный веб-ресурс без длительной разработки и крупных вложений — всего за 72 часа.
				</p>
				<p>
					В отличие от классической модели разработки, которая занимает недели и требует найма целой команды специалистов, LEGET предлагает готовые проекты на базе современных технологий — Svelte, Tailwind CSS и GraphQL. Каждый сайт уже включает в себя все необходимые функции: адаптивный дизайн, SSL-сертификат, корпоративную почту, интеграцию с CDN и ежедневное резервное копирование.
				</p>
				<aside class="my-10 rounded-2xl bg-neutral-50 p-8">
					<p class="text-sm font-semibold text-neutral-950">Ключевые цифры запуска</p>
					<p class="mt-2 text-sm text-neutral-600">
						Стоимость аренды — от 170 ₽ в день. Вся инфраструктура развёрнута на YandexCloud с гарантией доступности 24/7. Запуск сайта — за 72 часа с момента выбора проекта.
					</p>
				</aside>
				<figure class="my-10">
					<img src="/images/laptop.jpg" alt="Профессиональный дизайн" class="rounded-2xl" />
				</figure>

				<h2>Как это работает</h2>
				<p>
					Клиент выбирает готовый проект из каталога, оплачивает подписку — и получает полностью настроенный сайт на своём домене. Все технические вопросы — хостинг, безопасность, обновления — LEGET берёт на себя.
				</p>
				<p>
					«Мы увидели, что малый и средний бизнес часто оказывается между дорогими студиями и примитивными конструкторами, — комментирует Евгений Че, CEO LEGET. — Наша задача — дать предпринимателям готовый, качественный продукт по цене подписки. Без компромиссов по скорости, дизайну или надёжности».
				</p>

				<h2>Планы развития</h2>
				<p>
					В ближайших планах LEGET — расширение каталога проектов, запуск новых отраслевых решений и внедрение дополнительных интеграций с популярными CRM и сервисами аналитики. Сейчас компания работает над модулем онлайн-записи и интеграцией с платёжными системами.
				</p>
				<p>
					На момент запуска в каталоге доступно несколько проектов для разных сфер бизнеса. Каждый из них можно протестировать до подписки — на сайте доступен предпросмотр.
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
