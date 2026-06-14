<script>
	import Border from '$lib/components/Border.svelte';
	import Button from '$lib/components/Button.svelte';
	import ContactSection from '$lib/components/ContactSection.svelte';
	import Container from '$lib/components/Container.svelte';
	import FadeIn from '$lib/components/FadeIn.svelte';
	import PageIntro from '$lib/components/PageIntro.svelte';
	import { formatDate } from '$lib/formatDate.js';

	/**
	 * Новости page - displays list of news section articles
	 *
	 * Requirements: 10.1, 10.2, 10.3, 13.6
	 * - PageIntro with news section heading
	 * - List of articles with titles, dates, and descriptions
	 * - Author information with images
	 * - ContactSection at the bottom
	 */

	// Новости articles data (migrated from MDX files)
	const articles = [
		{
			href: '/news/5',
			date: '2026-06-13',
			title: 'LEGET расширяет границы: теперь мы работаем в 6 странах',
			description:
				'Запустили локальные версии платформы и поддержку местных платежных систем для предпринимателей из Армении, Беларуси, Казахстана, Кыргызстана и Узбекистана.',
			author: {
				name: 'Евгений Че',
				role: 'CEO LEGET',
				image: '/images/team/andrey.jpg'
			}
		},
		{
			href: '/news/4',
			date: '2026-05-18',
			title: 'Как мы заставили сайты летать: технические детали оптимизации',
			description:
				'Рассказываем, как мы ускорили работу платформы LEGET, снизили время ответа API до 120 мс и почему это важно для продаж.',
			author: {
				name: 'Евгений Че',
				role: 'CEO LEGET',
				image: '/images/team/andrey.jpg'
			}
		},
		{
			href: '/news/2',
			date: '2026-04-03',
			title: 'Сайт за 72 часа: запускаем аренду готовых решений',
			description:
				'Официальный старт сервиса LEGET. Объясняем, как работает аренда сайтов и почему это выгоднее разработки с нуля.',
			author: {
				name: 'Евгений Че',
				role: 'CEO LEGET',
				image: '/images/team/andrey.jpg'
			}
		},
		{
			href: '/news/3',
			date: '2025-12-01',
			title: 'Обновление каталога: новые шаблоны с фокусом на конверсию',
			description:
				'Добавили новые проекты с продуманной структурой посадочных страниц, которые помогают превращать посетителей в клиентов.',
			author: {
				name: 'Анжела Фишер',
				role: 'Фронтенд-разработчик LEGET',
				image: '/images/team/angela-fisher.jpg'
			}
		},
		{
			href: '/news/1',
			date: '2025-08-01',
			title: 'Как мы придумали LEGET: история создания платформы',
			description:
				'Рассказываем, почему мы решили делать готовые сайты для бизнеса по подписке и от каких проблем хотели избавить предпринимателей.',
			author: {
				name: 'Евгений Че',
				role: 'CEO LEGET',
				image: '/images/team/andrey.jpg'
			}
		}
	];
</script>

<svelte:head>
	<title>Новости и полезные статьи — Студия LEGET</title>
	<meta
		name="description"
		content="Лента новостей компании LEGET. Полезные статьи о запуске сайтов, аренде готовых решений и развитии бизнеса в цифровую эпоху."
	/>
</svelte:head>

<!-- Page Introduction -->
<PageIntro eyebrow="Информация" title="Последние новости">
	<p>Будьте в курсе последних новостей компании.</p>
</PageIntro>

<!-- Articles List -->
<Container class="mt-24 sm:mt-32 lg:mt-40">
	<div class="space-y-24 lg:space-y-32">
		{#each articles as article (article.href)}
			<FadeIn>
				<article>
					<Border class="pt-16">
						<div class="relative lg:-mx-4 lg:flex lg:justify-end">
							<div class="pt-10 lg:w-2/3 lg:flex-none lg:px-4 lg:pt-0">
								<h2 class="font-display text-2xl font-semibold text-neutral-950">
									<a href={article.href}>{article.title}</a>
								</h2>
								<dl class="lg:absolute lg:top-0 lg:left-0 lg:w-1/3 lg:px-4">
									<dt class="sr-only">Published</dt>
									<dd class="absolute top-0 left-0 text-sm text-neutral-950 lg:static">
										<time datetime={article.date}>
											{formatDate(article.date)}
										</time>
									</dd>
									<dt class="sr-only">Author</dt>
									<!-- Аватарка автора скрыта -->
									<dd class="mt-6 flex gap-x-4">
										<div class="text-sm text-neutral-950">
											<div class="font-semibold">
												{article.author.name}
											</div>
											<div>{article.author.role}</div>
										</div>
									</dd>
								</dl>
								<p class="mt-6 max-w-2xl text-base text-neutral-600">
									{article.description}
								</p>
								<Button href={article.href} aria-label="Читать далее: {article.title}" class="mt-8">
									Читать далее
								</Button>
							</div>
						</div>
					</Border>
				</article>
			</FadeIn>
		{/each}
	</div>
</Container>

<!-- Contact Section -->
<ContactSection />
