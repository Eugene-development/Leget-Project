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
		title: 'Обновление каталога: новые шаблоны с фокусом на конверсию',
		description:
			'Добавили новые проекты с продуманной структурой посадочных страниц, которые помогают превращать посетителей в клиентов.',
		author: {
			name: 'Анжела Фишер',
			role: 'Фронтенд-разработчик LEGET',
			image: '/images/team/angela-fisher.jpg'
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
	<title>{article.title} — Блог LEGET</title>
	<meta
		name="description"
		content="Новые проекты LEGET с оптимизированной структурой лендингов. Узнайте, как повысить конверсию и получать больше заявок от клиентов без написания кода."
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
				<h2>Меньше кликов — больше заявок</h2>
				<p>
					<strong>1 декабря 2025 года</strong> мы обновили линейку готовых сайтов. Главное изменение — глубокая проработка структуры посадочных страниц (landing pages) для разных сфер бизнеса.
				</p>
				<p>
					Мы спроектировали путь пользователя так, чтобы он мог быстро найти ответы на главные вопросы: какие услуги вы оказываете, сколько это стоит, как посмотреть отзывы и как оставить заявку.
				</p>
				<figure class="my-10">
					<img src="/images/news/a-short-guide-to-component-naming/magnifying-glass.jpg" alt="Выбор проекта" class="rounded-2xl" />
				</figure>

				<h2>Что нового в шаблонах:</h2>
				<ul>
					<li><strong>Модульная сетка.</strong> Разделы услуг, отзывов и контактов можно легко переставлять местами под ваши задачи.</li>
					<li><strong>Адаптивность.</strong> Все новые страницы идеально отображаются на смартфонах и соответствуют стандартам доступности.</li>
					<li><strong>Настройка в пару кликов.</strong> Менять шрифты, цвета и изображения теперь можно прямо через удобную панель управления, не прикасаясь к коду.</li>
				</ul>
				<p>
					«Мы изучили десятки сайтов в сфере услуг и мебельном бизнесе. Главная проблема везде одна — перегруженный интерфейс и медленная загрузка. В новых шаблонах мы убрали всё лишнее, чтобы клиент мог оставить заявку за 3 клика», — комментирует Анжела Фишер, наш фронтенд-разработчик.
				</p>

				<h2>Кастомизация без кода</h2>
				<p>
					Все новые проекты поддерживают гибкую настройку внешнего вида: цветовые схемы, шрифты, расположение блоков меняются через панель управления. При этом сохраняется единая стилистика и премиальное качество вёрстки.
				</p>
				<p>
					Все новые проекты уже доступны в каталоге. Если вы уже арендуете сайт на LEGET, напишите в поддержку — мы поможем обновиться до новой структуры.
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
