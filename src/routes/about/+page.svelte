<script>
	import Border from '$lib/components/Border.svelte';
	import ContactSection from '$lib/components/ContactSection.svelte';
	import Container from '$lib/components/Container.svelte';
	import FadeIn from '$lib/components/FadeIn.svelte';
	import FadeInStagger from '$lib/components/FadeInStagger.svelte';
	import GridList from '$lib/components/GridList.svelte';
	import GridListItem from '$lib/components/GridListItem.svelte';
	import PageIntro from '$lib/components/PageIntro.svelte';
	import PageLinks from '$lib/components/PageLinks.svelte';
	import SectionIntro from '$lib/components/SectionIntro.svelte';
	import StatList from '$lib/components/StatList.svelte';
	import StatListItem from '$lib/components/StatListItem.svelte';

	/**
	 * About page - displays company information, culture, team, and statistics
	 *
	 * Requirements: 6.1, 6.2, 6.3, 6.4, 13.2
	 */

	// Team data structure matching the original Next.js implementation
	const team = [
		{
			title: 'Руководство',
			people: [
				{
					name: 'Евгений Че',
					role: 'Основатель / CEO',
					image: '/images/team/andrey.jpg'
				},
				{
					name: 'Михаил Фостер',
					role: 'Технический директор / CTO',
					image: '/images/team/michael-foster.jpg'
				},
				{
					name: 'Дрис Винсент',
					role: 'Партнер / Бизнес-отношения',
					image: '/images/team/dries-vincent.jpg'
				}
			]
		},
		{
			title: 'Команда',
			people: [
				{
					name: 'Челси Хагон',
					role: 'Ведущий разработчик',
					image: '/images/team/chelsea-hagon.jpg'
				},
				{
					name: 'Эмма Дорси',
					role: 'Ведущий дизайнер',
					image: '/images/team/emma-dorsey.jpg'
				},
				{
					name: 'Леонард Краснер',
					role: 'UX-директор',
					image: '/images/team/leonard-krasner.jpg'
				},
				{
					name: 'Блейк Рейд',
					role: 'Копирайтер',
					image: '/images/team/blake-reid.jpg'
				},
				{
					name: 'Кэтрин Мерфи',
					role: 'HR-директор',
					image: '/images/team/kathryn-murphy.jpg'
				},
				{
					name: 'Уитни Фрэнсис',
					role: 'Контент-менеджер',
					image: '/images/team/whitney-francis.jpg'
				},
				{
					name: 'Джеффри Уэбб',
					role: 'Аккаунт-менеджер',
					image: '/images/team/jeffrey-webb.jpg'
				},
				{
					name: 'Бенджамин Рассел',
					role: 'Ведущий разработчик',
					image: '/images/team/benjamin-russel.jpg'
				},
				{
					name: 'Анжела Фишер',
					role: 'Front-end разработчик',
					image: '/images/team/angela-fisher.jpg'
				}
			]
		}
	];

	// Blog articles for PageLinks section (static data since we're not using MDX)
	const newsArticles = [
		{
			href: '/news/2',
			title: 'Запуск сайта за 72 часа: преимущества аренды готовых решений',
			date: '2026-04-03',
			description:
				'Почему современному бизнесу выгоднее арендовать готовое технологичное решение, чем вкладываться в длительную и дорогостоящую разработку.'
		},
		{
			href: '/news/3',
			title: 'Как выбрать идеальный проект для вашего бизнеса',
			date: '2025-12-01',
			description:
				'Разбираемся, на что обратить внимание при выборе структуры сайта, чтобы он максимально эффективно решал задачи вашего направления.'
		}
	];
</script>

<svelte:head>
	<title>О нас - Легет</title>
	<meta
		name="description"
		content="Студия LEGET: объединяем глубокую отраслевую экспертизу и передовые технологии для трансформации вашего мебельного бизнеса в цифровую эпоху."
	/>
</svelte:head>

<!-- PageIntro with company description -->
<PageIntro eyebrow="О нас" title="Наша сила в технологиях">
	<p>
		Мы убеждены: успех проекта кроется в синергии глубокой отраслевой экспертизы и передовых технологий. Наша цель — трансформировать ваш бизнес в цифровую эпоху.
	</p>
	<div class="mt-10 max-w-2xl space-y-6 text-base">
		<p>
			Студия LEGET возникла как ответ на вызовы современного мебельного рынка. Мы объединили опыт ведущих разработчиков и глубокое понимание бизнес-процессов мебельных фабрик, чтобы создавать по-настоящему эффективные инструменты.
		</p>
		<p>
			Для нас каждый проект — это не просто код и дизайн, а возможность помочь вашему бренду стать лидером. Мы выстраиваем долгосрочные партнерские отношения, основанные на прозрачности и достижении конкретных бизнес-результатов.
		</p>
	</div>
</PageIntro>

<!-- StatList with company statistics -->
<Container class="mt-16">
	<StatList>
		<StatListItem value="35" label="Современных технологий" />
		<StatListItem value="200+" label="Компонентов в разработке" />
		<StatListItem value="280%" label="Рост клиентской базы в месяц" />
	</StatList>
</Container>

<!-- Culture section with dark background -->
<div class="mt-24 rounded-4xl bg-neutral-950 py-24 sm:mt-32 lg:mt-40 lg:py-32">
	<SectionIntro eyebrow="Культура компании" title="Баланс прогресса и безопасности" invert>
		<p>Мы — команда профессионалов, разделяющих общие ценности и стремление к совершенству в каждой детали.</p>
	</SectionIntro>
	<Container class="mt-16">
		<GridList>
			<GridListItem title="Экспертиза" invert>
				Глубокое понимание мебельной отрасли позволяет нам предлагать решения, которые учитывают специфику вашего продукта и потребности покупателей.
			</GridListItem>
			<GridListItem title="Надежность" invert>
				Мы строим доверительные отношения с партнерами, обеспечивая стабильную работу систем и оперативную поддержку на всех этапах.
			</GridListItem>
			<GridListItem title="Инновации" invert>
				Мы не просто следим за трендами, мы адаптируем их под реалии мебельного бизнеса, создавая уникальный клиентский опыт.
			</GridListItem>
		</GridList>
	</Container>
</div>

<!-- Team section with photos -->
<!-- <Container class="mt-24 sm:mt-32 lg:mt-40">
	<div class="space-y-24">
		{#each team as group (group.title)}
			<FadeInStagger>
				<Border>
					<div class="grid grid-cols-1 gap-6 pt-12 sm:pt-16 lg:grid-cols-4 xl:gap-8">
						<FadeIn>
							<h2 class="font-display text-2xl font-semibold text-neutral-950">
								{group.title}
							</h2>
						</FadeIn>
						<div class="lg:col-span-3">
							<ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
								{#each group.people as person (person.name)}
									<li>
										<FadeIn>
											<div class="group relative overflow-hidden rounded-3xl bg-neutral-100">
												<img
													alt=""
													src={person.image}
													loading="lazy"
													class="h-96 w-full object-cover grayscale transition duration-500 motion-safe:group-hover:scale-105"
												/>
												<div
													class="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black to-transparent to-40% p-6"
												>
													<p
														class="font-display text-base/6 font-semibold tracking-wide text-white"
													>
														{person.name}
													</p>
													<p class="mt-2 text-sm text-white">
														{person.role}
													</p>
												</div>
											</div>
										</FadeIn>
									</li>
								{/each}
							</ul>
						</div>
					</div>
				</Border>
			</FadeInStagger>
		{/each}
	</div>
</Container> -->

<!-- PageLinks for blog articles -->
<PageLinks
	class="mt-24 sm:mt-32 lg:mt-40"
	title="Новости компании"
	intro="Наши эксперты следят за развитием технологий и изменениями рынка, чтобы вы получали только актуальные инсайты и лучшие практики для развития вашего бизнеса."
	pages={newsArticles}
/>

<!-- ContactSection -->
<ContactSection />
