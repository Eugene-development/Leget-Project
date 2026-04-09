<script>
	import Border from '$lib/components/Border.svelte';
	import ContactSection from '$lib/components/ContactSection.svelte';
	import Container from '$lib/components/Container.svelte';
	import FadeIn from '$lib/components/FadeIn.svelte';
	import PageLinks from '$lib/components/PageLinks.svelte';
	import { formatDate } from '$lib/formatDate.js';

	/**
	 * Новости Article: Как выбрать идеальный проект
	 */

	const article = {
		date: '2025-12-01',
		title: 'Как выбрать идеальный проект для вашего бизнеса',
		description:
			'Разбираемся, на что обратить внимание при выборе структуры сайта, чтобы он максимально эффективно решал задачи вашего направления.',
		author: {
			name: 'Анжела Фишер',
			role: 'Фронтенд-разработчик LEGET',
			image: '/images/team/angela-fisher.jpg'
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
			href: '/news/2',
			date: '2026-04-03',
			title: 'Запуск сайта за 72 часа: преимущества аренды',
			description:
				'Почему современному бизнесу выгоднее арендовать готовое технологичное решение.'
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
				<h2>Ориентированность на вашу нишу</h2>
				<p>
					Выбор проекта — это не просто выбор красивых картинок. Это фундамент вашего будущего онлайн-представительства. В LEGET мы создаем проекты, исходя из специфики различных бизнес-направлений: от мебельных компаний до сервисных центров.
				</p>
				<p>
					Важно понимать, какие именно задачи должен решать ваш сайт. Нужен ли вам каталог продукции, форма записи на услуги или подробный раздел с описанием выполненных проектов? Каждый наш проект оптимизирован под конкретный пользовательский путь.
				</p>
				<figure class="my-10">
					<img src="/images/news/a-short-guide-to-component-naming/magnifying-glass.jpg" alt="Выбор проекта" class="rounded-2xl" />
				</figure>

				<h2>Структура и навигация</h2>
				<p>
					Хороший сайт — это тот, на котором пользователь находит нужную информацию за считанные секунды. Мы уделяем огромное внимание чистоте кода и продуманной навигации в каждом нашем решении.
				</p>
				<p>
					При выборе проекта стоит обратить внимание на то, как представлены ваши услуги. Иерархия заголовков, акцент на кнопках действия (CTA) и адаптация под мобильные устройства уже заложены в ДНК нашей платформы.
				</p>

				<h2>Брендинг и индивидуальность</h2>
				<p>
					Несмотря на то, что это готовое решение, каждый сайт LEGET может и должен отражать индивидуальность вашей компании. Мы помогаем адаптировать цветовую схему, шрифты и контент так, чтобы сайт выглядел уникальным и соответствовал вашему фирменному стилю.
				</p>
				<p>
					Правильно подобранный проект в сочетании с качественным контентом создает доверие у ваших клиентов и повышает конверсию в заказы.
				</p>
			</div>
		</div>
	</FadeIn>
</Container>

<PageLinks
	class="mt-24 sm:mt-32 lg:mt-40"
	title="Другие новости"
	intro="Подпишитесь на уведомления, чтобы не пропустить важные новости отрасли."
	pages={moreArticles}
/>

<ContactSection />
