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
		content="Советы по выбору структуры и дизайна сайта для максимально эффективного решения задач вашего бизнес-направления. На что обратить внимание при выборе готового проекта."
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
				<h2>LEGET представил новые проекты с посадочными страницами</h2>
				<p>
					<strong>1 декабря 2025 года</strong> — LEGET расширил каталог проектов, добавив несколько новых решений с улучшенной структурой landing page. Каждый проект теперь включает в себя не только главную страницу, но и продуманную систему внутренних разделов, адаптированных под конкретные бизнес-ниши.
				</p>
				<p>
					Новые проекты отличаются глубиной проработки пользовательского пути: от блока с услугами и портфолио до формы обратной связи и раздела с отзывами. Вся структура построена таким образом, чтобы посетитель сайта за минимальное количество кликов мог принять целевое действие — оставить заявку, заказать звонок или перейти в каталог.
				</p>
				<figure class="my-10">
					<img src="/images/news/a-short-guide-to-component-naming/magnifying-glass.jpg" alt="Выбор проекта" class="rounded-2xl" />
				</figure>

				<h2>Что изменилось</h2>
				<p>
					Главное нововведение — модульная структура посадочных страниц. Каждый блок (услуги, преимущества, кейсы, контакты) может быть независимо настроен под задачи конкретного бизнеса. При этом все блоки уже адаптированы под мобильные устройства и соответствуют современным стандартам доступности.
				</p>
				<p>
					«Мы проанализировали более сотни сайтов в мебельной нише и смежных отраслях, — комментирует Анжела Фишер, фронтенд-разработчик LEGET. — И поняли: большинство проблем с конверсией упирается в навигацию и скорость. В новых проектах мы сделали упор на то, чтобы пользователь доходил до цели в три клика, независимо от устройства».
				</p>

				<h2>Кастомизация без кода</h2>
				<p>
					Все новые проекты поддерживают гибкую настройку внешнего вида без необходимости писать код: цветовые схемы, шрифты, расположение блоков меняются через панель управления. При этом сохраняется единая стилистика и премиальное качество вёрстки, заложенное в ДНК всех решений LEGET.
				</p>
				<p>
					Каждый из новых проектов уже доступен для предпросмотра в каталоге. Арендаторы текущих проектов также могут оставить заявку на адаптацию структуры под обновлённые стандарты.
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
