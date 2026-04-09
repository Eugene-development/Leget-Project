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
			href: '/news/1',
			date: '2025-08-01',
			title: 'Старт проекта LEGET',
			description: 'Начало работы',
			author: {
				name: 'Евгений Че',
				role: 'CEO',
				image: '/images/team/andrey.jpg'
			}
		},
		{
			href: '/news/2',
			date: '2026-04-03',
			title: 'Запуск сайта за 72 часа: преимущества аренды готовых решений',
			description:
				'Почему современному бизнесу выгоднее арендовать готовое технологичное решение, чем вкладываться в длительную и дорогостоящую разработку с нуля.',
			author: {
				name: 'Евгений Че',
				role: 'CEO LEGET',
				image: '/images/team/andrey.jpg'
			}
		},
		{
			href: '/news/3',
			date: '2025-12-01',
			title: 'Как выбрать идеальный проект для вашего бизнеса',
			description:
				'Разбираемся, на что обратить внимание при выборе структуры сайта, чтобы он максимально эффективно решал задачи вашего направления.',
			author: {
				name: 'Angela Fisher',
				role: 'Front-end Developer',
				image: '/images/team/angela-fisher.jpg'
			}
		}
	];
</script>

<svelte:head>
	<title>Новости - LEGET</title>
	<meta name="description" content="Будьте в курсе последних новостей отрасли." />
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
									<dd class="mt-6 flex gap-x-4">
										<div class="flex-none overflow-hidden rounded-xl bg-neutral-100">
											<img
												alt=""
												src={article.author.image}
												class="h-12 w-12 object-cover grayscale"
												loading="lazy"
											/>
										</div>
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
