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
				<h2>Экономия времени и ресурсов</h2>
				<p>
					В современном мире скорость выхода на рынок является ключевым фактором успеха. Традиционная
					разработка сайта может занимать от нескольких недель до нескольких месяцев, требуя при этом значительных финансовых вложений и постоянного контроля над процессом. Команда LEGET предлагает альтернативный путь: запуск профессионального сайта всего за 72 часа.
				</p>
				<p>
					Мы создали библиотеку продуманных, премиальных проектов, которые уже содержат все необходимые функции для эффективной работы бизнеса. Вам не нужно платить за дизайн и верстку с нуля — вы арендуете готовое, отточенное решение по фиксированной цене.
				</p>
				<aside class="my-10 rounded-2xl bg-neutral-50 p-8">
					<p class="text-sm font-semibold text-neutral-950">Выгода в цифрах</p>
					<p class="mt-2 text-sm text-neutral-600">
						Стоимость аренды сайта от LEGET составляет всего 5000 рублей в месяц. Это в десятки раз
						дешевле, чем средняя стоимость разработки среднего корпоративного сайта у студий-партнеров.
					</p>
				</aside>
				<figure class="my-10">
					<img src="/images/laptop.jpg" alt="Профессиональный дизайн" class="rounded-2xl" />
				</figure>

				<h2>Технологическая база и безопасность</h2>
				<p>
					Аренда сайта у нас — это не просто картинка в интернете. Мы предоставляем полноценную
					инфраструктуру, развернутую на мощностях YandexCloud. Это гарантирует высокую доступность вашего ресурса в режиме 24/7.
				</p>
				<p>
					Мы берем на себя все технические вопросы: установку SSL-сертификатов для безопасной передачи данных, настройку домена, подключение корпоративной почты и ежедневное резервное копирование. Вам остается только заниматься развитием своего дела.
				</p>

				<h2>Масштабируемость и поддержка</h2>
				<p>
					Наши сайты построены на современных технологиях, таких как Svelte и Tailwind CSS, что обеспечивает молниеносную загрузку страниц. Мы постоянно обновляем наши проекты, добавляя в них новые возможности на основе обратной связи от наших клиентов.
				</p>
				<p>
					Если ваш бизнес вырастет и вам потребуются дополнительные функции, наше решение позволит легко адаптировать структуру сайта под новые задачи. Наша техническая поддержка всегда на связи, чтобы помочь вам с любыми изменениями контента или функционала.
				</p>
			</div>
		</div>
	</FadeIn>
</Container>

<PageLinks
	class="mt-24 sm:mt-32 lg:mt-40"
	title="Другие новости"
	intro="Прочтите о наших ценностях и новых решениях для вашего бизнеса."
	pages={moreArticles}
/>

<ContactSection />
