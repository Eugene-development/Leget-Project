<script>
	import ContactSection from '$lib/components/ContactSection.svelte';
	import Container from '$lib/components/Container.svelte';
	import FadeIn from '$lib/components/FadeIn.svelte';
	import PageLinks from '$lib/components/PageLinks.svelte';
	import { formatDate } from '$lib/formatDate.js';

	/**
	 * Новости Article: Скорость — главный фактор юзабилити
	 */

	const article = {
		date: '2026-05-18',
		title: 'Как мы заставили сайты летать: технические детали оптимизации',
		description:
			'Рассказываем, как мы ускорили работу платформы LEGET, снизили время ответа API до 120 мс и почему это важно для продаж.',
		author: {
			name: 'Евгений Че',
			role: 'CEO LEGET',
			image: '/images/team/andrey.jpg'
		}
	};

	const moreArticles = [
		{
			href: '/news/5',
			date: '2026-06-13',
			title: 'LEGET выходит на международный рынок',
			description:
				'Платформа готовых сайтов для бизнеса теперь доступна предпринимателям в шести странах.'
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
		content="Рассказываем, как скорость загрузки страниц влияет на конверсию и продажи вашего бизнеса. Детальный разбор технической оптимизации платформы LEGET."
	/>
</svelte:head>

<Container as="article" class="mt-24 sm:mt-32 lg:mt-40">
	<FadeIn>
		<!-- Хлебные крошки: Главная / Новости -->
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
				<h2>Почему скорость — это деньги</h2>
				<p>
					Если сайт грузится дольше трёх секунд, половина пользователей просто уйдёт к конкурентам. Особенно на мобильных телефонах с медленным интернетом. Скорость загрузки напрямую влияет на то, останется ли клиент на странице и сделает ли он заказ.
				</p>
				<p>
					Мы провели большую техническую оптимизацию платформы LEGET, чтобы сделать сайты наших клиентов максимально быстрыми.
				</p>

				<h2>Что мы изменили под капотом:</h2>
				<ul>
					<li><strong>Оптимизировали API-запросы.</strong> Переписали наши GraphQL-запросы, настроили пагинацию и кэширование данных.</li>
					<li><strong>Включили Brotli-сжатие.</strong> Это современный алгоритм сжатия, который уменьшил вес страниц на сервере почти на 70%.</li>
					<li><strong>Настроили CDN.</strong> Картинки и скрипты теперь загружаются с ближайших к пользователю серверов.</li>
					<li><strong>Навели порядок во фронтенде.</strong> Настроили ленивую загрузку картинок (lazy-loading) и убрали лишний код из сборки.</li>
				</ul>

				<h2>Чего удалось достичь:</h2>
				<ul>
					<li>Страницы стали загружаться на 40% быстрее.</li>
					<li>Время ответа сервера (TTFB) снизилось до 120 мс.</li>
					<li>Оценка Lighthouse поднялась до 94 баллов.</li>
				</ul>

				<p>
					Мы продолжаем следить за производительностью. В планах — внедрение автооптимизации изображений в форматы WebP/AVIF прямо при загрузке. Ведь быстрый сайт — это вежливое отношение к вашим клиентам.
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
