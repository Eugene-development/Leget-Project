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
		title: 'Скорость — главный фактор юзабилити: как мы ускорили LEGET',
		description:
			'Исследования показывают: 53% пользователей покидают сайт, если он грузится дольше 3 секунд. Мы провели оптимизацию сервисов LEGET — ускорение API-запросов, кэширование, сжатие контента и оптимизацию фронтенда — что значительно повысило скорость работы платформы.',
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
		content="Почему скорость работы сайта — ключевой фактор юзабилити, и как мы провели масштабную оптимизацию сервисов LEGET."
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
				<h2>Скорость загрузки = удержание клиентов</h2>
				<p>
					Современный пользователь не ждёт. Исследования Google показывают: 53% мобильных пользователей покидают сайт, если время загрузки превышает 3 секунды. Для интернет-магазина каждая секунда задержки — это до 7% потери конверсии.
				</p>
				<p>
					Юзабилити (usability) — это не просто про красивый дизайн. Это про то, насколько быстро и комфортно пользователь может решить свою задачу. И скорость загрузки здесь — фундамент, без которого остальные усилия по UX теряют смысл.
				</p>

				<h2>Что мы сделали</h2>
				<p>
					В LEGET мы провели комплексную оптимизацию всех сервисов платформы. Вот ключевые направления работы:
				</p>
				<ul>
					<li><strong>Ускорение API-запросов</strong> — оптимизировали GraphQL-запросы, добавили пагинацию и data loader'ы, чтобы избежать N+1 проблем.</li>
					<li><strong>Кэширование</strong> — внедрили многоуровневое кэширование: Redis для горячих данных, HTTP-кэши для статики и CDN для контента.</li>
					<li><strong>Сжатие контента</strong> — настроили Brotli-сжатие на уровне сервера, что сократило объём передаваемых данных до 70%.</li>
					<li><strong>Оптимизация фронтенда</strong> — пересмотрели загрузку ресурсов, добавили lazy-loading для изображений, code splitting и tree shaking.</li>
					<li><strong>Оптимизация базы данных</strong> — добавили индексы на часто используемые запросы, провели анализ медленных запросов через EXPLAIN.</li>
				</ul>

				<h2>Результаты</h2>
				<p>
					После проведённой оптимизации мы зафиксировали:
				</p>
				<ul>
					<li>Скорость загрузки страниц сократилась в среднем на 40%.</li>
					<li>Время ответа API (TTFB) уменьшилось с 450ms до ~120ms.</li>
					<li>Lighthouse Performance Score вырос с 68 до 94.</li>
					<li>Объём передаваемых данных при первом заходе уменьшен на 55%.</li>
				</ul>

				<p>
					Мы продолжаем следить за производительностью и внедрять новые оптимизации. В планах — полный переход на HTTP/3, серверный рендеринг критических компонентов и дальнейшая оптимизация изображений через WebP и AVIF.
				</p>

				<p>
					Скорость — это не роскошь, а необходимый стандарт качества. И в LEGET мы делаем всё, чтобы ваши сайты летали.
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
