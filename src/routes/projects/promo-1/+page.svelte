<script>
	import Blockquote from '$lib/components/Blockquote.svelte';
	import Button from '$lib/components/Button.svelte';
	import ContactSection from '$lib/components/ContactSection.svelte';
	import Container from '$lib/components/Container.svelte';
	import FadeIn from '$lib/components/FadeIn.svelte';
	import GrayscaleTransitionImage from '$lib/components/GrayscaleTransitionImage.svelte';
	import PageIntro from '$lib/components/PageIntro.svelte';
	import StatList from '$lib/components/StatList.svelte';
	import StatListItem from '$lib/components/StatListItem.svelte';
	import TagList from '$lib/components/TagList.svelte';
	import TagListItem from '$lib/components/TagListItem.svelte';
	import SubscribeLicenseModal from '$lib/components/SubscribeLicenseModal.svelte';
	import { formatDate } from '$lib/formatDate.js';

	// templateId=2 corresponds to Promo-1 (see ComponentResolver.svelte)
	const TEMPLATE_ID = 2;
	let modalOpen = $state(false);

	/**
	 * Promo-1 Case Study Page
	 *
	 * Requirements: 9.4, 13.5
	 * - Detailed project description
	 * - Project header with logo, client name, date, service
	 * - Hero image
	 * - Testimonial/quote from client
	 * - StatList with project statistics
	 * - ContactSection at the bottom
	 */

	const caseStudy = {
		client: 'Promo-1',
		title: 'Promo-1',
		description:
			'Многостраничный сайт с множеством настраиваемых функций и разделов. Отличная юзабельность и адаптивность под любые устройства вкупе с современным дизайном.',
		heroImage: '/images/projects/promo-1/hero.png',
		date: '2023-01',
		service: 'Web development, SvelteKit',
		testimonial: {
			author: { name: 'Евгений Че', role: 'Директор по маркетингу' },
			image: '/images/projects/promo-1/debra-fiscal.jpg',
			content:
				'Данный сайт позволяет перейти компании на новый уровень в информационной сети интернет.'
		}
	};
</script>

<svelte:head>
	<title>Проект Promo-1 — Универсальный многостраничный сайт | LEGET</title>
	<meta
		name="description"
		content="Описание шаблона Promo-1: современный многостраничный сайт с настраиваемыми функциями, созданный на стеке SvelteKit."
	/>
</svelte:head>

<!-- Page Introduction with Project Header -->
<PageIntro eyebrow="Проект" title={caseStudy.title}>
	<p>{caseStudy.description}</p>
</PageIntro>

<!-- Project Meta Information -->
<Container class="mt-24 sm:mt-32 lg:mt-40">
	<FadeIn>
		<div class="flex items-center gap-x-8 border-t border-neutral-200 pt-12">
			<div class="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
				<a href="/" class="text-neutral-600 transition hover:text-neutral-950">Главная</a>
				<span class="text-neutral-300">/</span>
				<a href="/projects" class="text-neutral-600 transition hover:text-neutral-950">Проекты</a>
				<span class="text-neutral-300">/</span>
				<span class="font-semibold text-neutral-950">{caseStudy.client}</span>
			</div>
		</div>
	</FadeIn>
</Container>

<!-- Hero Image -->
<Container class="mt-16">
	<FadeIn>
		<div class="mb-8 flex flex-wrap justify-center gap-4">
			<Button
				href="https://novostroy.org"
				target="_blank"
				aria-label="View demo: {caseStudy.client}"
			>
				Посмотреть демо версию сайта
			</Button>
			<Button
				invert={false}
				onclick={() => (modalOpen = true)}
				aria-label="Подписаться на лицензию {caseStudy.client}"
			>
				Подписаться на лицензию
			</Button>
		</div>

		<SubscribeLicenseModal
			open={modalOpen}
			templateId={TEMPLATE_ID}
			templateName="Promo-1"
			onClose={() => (modalOpen = false)}
			onSuccess={(id) => {
				modalOpen = false;
			}}
		/>
		<div class="overflow-hidden rounded-3xl bg-neutral-100">
			<GrayscaleTransitionImage
				src={caseStudy.heroImage}
				alt="Promo-1 project hero"
				class="w-full object-cover"
				loading="lazy"
			/>
		</div>
	</FadeIn>
</Container>

<!-- Overview Section -->
<Container class="mt-24 sm:mt-32 lg:mt-40">
	<FadeIn>
		<h2 class="font-display text-2xl font-semibold text-neutral-950">Описание проекта</h2>
		<div class="mt-6 space-y-6 text-base text-neutral-600">
			<p>
				Шаблон Promo-1 — это современное решение для многостраничного корпоративного сайта или интернет-витрины. Разработанный на базе SvelteKit, он обеспечивает молниеносную скорость работы и отличные показатели SEO.
			</p>
			<p>
				Структура шаблона позволяет легко адаптировать его под различные виды бизнеса, будь то производство мебели, строительные услуги или любое другое направление, требующее детального представления товаров и услуг.
			</p>
			<p>
				В шаблоне реализованы все необходимые разделы: от функционального каталога до страниц с описанием процесса работы и контактной информации. Внимание к деталям в дизайне и коде гарантирует высокий уровень конверсии и доверие пользователей.
			</p>
			<p>
				Полная адаптивность обеспечивает корректное отображение на всех типах устройств, что позволяет клиентам с комфортом взаимодействовать с сайтом в любое время и из любого места.
			</p>
		</div>
	</FadeIn>
</Container>

<!-- What We Did Section -->
<Container class="mt-24 sm:mt-32 lg:mt-40">
	<FadeIn>
		<h2 class="font-display text-2xl font-semibold text-neutral-950">
			Подходит для видов деятельности
		</h2>
		<TagList class="mt-6">
			<TagListItem>Мебельная компания</TagListItem>
		</TagList>
	</FadeIn>
</Container>

<!-- Testimonial Section -->
<!-- <Container class="mt-24 sm:mt-32 lg:mt-40">
	<Blockquote author={caseStudy.testimonial.author} image={caseStudy.testimonial.image}>
		<p>{caseStudy.testimonial.content}</p>
	</Blockquote>
</Container> -->

<!-- Statistics Section -->
<!-- <Container class="mt-24 sm:mt-32 lg:mt-40">
	<FadeIn>
		<h2 class="font-display text-2xl font-semibold text-neutral-950">Results</h2>
	</FadeIn>
	<StatList class="mt-10">
		<StatListItem value="25%" label="Less traffic" />
		<StatListItem value="10x" label="Page load times" />
		<StatListItem value="15%" label="Higher infra costs" />
		<StatListItem value="$1.2M" label="Legal fees" />
	</StatList>
</Container> -->

<!-- Contact Section -->
<ContactSection />
