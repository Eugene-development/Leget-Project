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
		title: 'Как мы придумали LEGET: история создания платформы',
		description:
			'Рассказываем, почему мы решили делать готовые сайты для бизнеса по подписке и от каких проблем хотели избавить предпринимателей.',
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
			href: '/news/4',
			date: '2026-05-18',
			title: 'Скорость — главный фактор юзабилити',
			description:
				'Как мы провели масштабную оптимизацию сервисов LEGET.'
		}
	];
</script>

<svelte:head>
	<title>{article.title} — Новости LEGET</title>
	<meta
		name="description"
		content="Как создавался LEGET: история запуска платформы готовых решений для бизнеса. Рассказываем о начале нашего пути и о том, как мы избавляем клиентов от рутины."
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
				<h2>Почему конструкторы и веб-студии не всегда работают</h2>
				<p>
					Идея LEGET появилась из простого наблюдения: малому бизнесу очень сложно запустить нормальный сайт. С одной стороны — дорогие студии, которые просят сотни тысяч рублей и делают проект месяцами. С другой — конструкторы, где приходится всё собирать самому, а на выходе часто получается медленный и шаблонный сайт.
				</p>
				<p>
					Мы хотели дать альтернативу: готовый, технически совершенный сайт с премиальным дизайном, который можно арендовать и запустить за пару дней.
				</p>
				<figure class="my-10">
					<img src="/images/projects/promo-1/hero.jpg" alt="Команда LEGET" class="rounded-2xl" />
				</figure>

				<h2>Три вещи, на которые мы сделали упор</h2>
				<p>
					<strong>Скорость.</strong> Мы выбрали Svelte — один из самых быстрых современных фреймворков. Благодаря этому сайты на LEGET буквально летают.
				</p>
				<p>
					<strong>Дизайн.</strong> Никаких перегруженных интерфейсов из 2010-х. Только чистый, минималистичный дизайн с приятной анимацией.
				</p>
				<p>
					<strong>Инфраструктура.</strong> Все сайты работают в облаке Yandex Cloud, с настроенным SSL, резервным копированием и защитой от сбоев.
				</p>

				<h2>Что дальше?</h2>
				<p>
					Старт LEGET — это только начало. Мы постоянно добавляем новые готовые проекты для разных ниш, интегрируем сервисы аналитики и платежей, чтобы запуск бизнеса в онлайне стал ещё проще. Присоединяйтесь к нам в этом путешествии!
				</p>
			</div>
		</div>
	</FadeIn>
</Container>

<PageLinks
	class="mt-24 sm:mt-32 lg:mt-40"
	title="Другие новости"
\tintro="Читайте другие новости и события компании LEGET."
	pages={moreArticles}
/>

<ContactSection />
