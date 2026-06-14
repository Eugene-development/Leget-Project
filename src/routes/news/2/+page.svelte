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
		title: 'Сайт за 72 часа: запускаем аренду готовых решений',
		description:
			'Официальный старт сервиса LEGET. Объясняем, как работает аренда сайтов и почему это выгоднее разработки с нуля.',
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
			href: '/news/1',
			date: '2025-08-01',
			title: 'Старт проекта LEGET',
			description: 'Начало разработки и запуска нового концепта готовых решений для бизнеса.'
		}
	];
</script>

<svelte:head>
	<title>{article.title} — Блог LEGET</title>
	<meta
		name="description"
		content="Как запустить современный сайт за 72 часа по цене подписки. Разбираем все преимущества аренды готовых веб-решений перед долгой и дорогой разработкой с нуля."
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
				<h2>Запуск без лишней головной боли</h2>
				<p>
					<strong>3 апреля 2026 года</strong> мы официально запустили LEGET. Теперь любой предприниматель может получить готовый сайт на современном стеке (Svelte + GraphQL) всего за 3 дня.
				</p>
				<p>
					Вместо того чтобы нанимать дизайнеров, верстальщиков и программистов, вы выбираете готовое решение из нашего каталога. Мы сами переносём его на ваш домен, настроим почту, подключим SSL-сертификат и возьмём на себя всю техническую поддержку.
				</p>
				<aside class="my-10 rounded-2xl bg-neutral-50 p-8">
					<p class="text-sm font-semibold text-neutral-950">Простая математика аренды</p>
					<p class="mt-2 text-sm text-neutral-600">
						Аренда сайта стоит от 170 ₽ в день. Вы не платите огромную сумму за разработку на старте и можете в любой момент изменить или закрыть проект, если гипотеза не оправдалась. При этом сайт работает на стабильном облаке Yandex Cloud с гарантией доступности 24/7.
					</p>
				</aside>
				<figure class="my-10">
					<img src="/images/laptop.jpg" alt="Профессиональный дизайн" class="rounded-2xl" />
				</figure>

				<h2>Как это устроено:</h2>
				<ol>
					<li>Вы выбираете шаблон под ваш бизнес.</li>
					<li>Мы адаптируем его под ваши тексты, цвета и логотипы.</li>
					<li>Через 72 часа сайт готов к приёму клиентов.</li>
				</ol>
				<p>
					«Мы хотели убрать барьер между идеей бизнеса и его запуском в сети. Предприниматель должен заниматься продуктом и продажами, а не разбираться в хостингах и верстке», — говорит Евгений Че, CEO LEGET.
				</p>

				<h2>Что дальше</h2>
				<p>
					В ближайших планах LEGET — расширение каталога проектов, запуск новых отраслевых решений и внедрение дополнительных интеграций с популярными CRM и сервисами аналитики. Сейчас мы работаем над модулем онлайн-записи и интеграцией с платёжными системами.
				</p>
				<p>
					Попробовать платформу в деле можно прямо сейчас — все проекты доступны для интерактивного предпросмотра в нашем каталоге.
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
