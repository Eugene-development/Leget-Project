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

	// templateId=3 corresponds to Promo-3
	const TEMPLATE_ID = 3;
	let modalOpen = $state(false);

	const caseStudy = {
		client: 'Promo-3',
		title: 'Promo-3',
		description:
			'Мощный инструмент для эффективных онлайн-продаж. Интерактивный интерфейс с продуманной структурой для вовлечения пользователей.',
		heroImage: '/images/projects/promo-3/hero.jpg',
		date: '2025-05',
		service: 'Подписка',
		testimonial: {
			author: { name: 'Евгений Че', role: 'Директор по маркетингу' },
			image: '/images/projects/promo-3/jenny-wilson.jpg',
			content:
				"Чистый и профессиональный дизайн, который идеально подходит для нашей компании. Очень удобно настраивать."
		}
	};
</script>

<svelte:head>
	<title>Проект Промо-3 — Интерактивный сайт с продуманной структурой | LEGET</title>
	<meta
		name="description"
		content="Интерактивный интерфейс с проработанной структурой для вовлечения пользователей. Современное решение для вашего технологичного бизнеса."
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
			<Button href="/" aria-label="View demo: {caseStudy.client}">
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
			templateName="Promo-3"
			price="170"
			period="день"
			onClose={() => (modalOpen = false)}
			onSuccess={(id) => {
				modalOpen = false;
			}}
		/>
		<div class="overflow-hidden rounded-3xl bg-neutral-100">
			<GrayscaleTransitionImage
				src={caseStudy.heroImage}
				alt="Promo-3 project hero"
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
				Шаблон Promo-3 — это мощная платформа для создания полноценного интернет-магазина. Продуманный каталог, удобная корзина и интеграция с платежными системами делают этот шаблон лучшим выбором для e-commerce.
			</p>
			<p>
				Интерактивные элементы интерфейса повышают вовлеченность пользователей и способствуют увеличению среднего чека. Современная архитектура гарантирует стабильную работу даже при высоких нагрузках.
			</p>
			<p>
				Мы уделили особое внимание мобильной версии, чтобы ваши клиенты могли совершать покупки с любого устройства в один клик.
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
		<StatListItem value="20%" label="Churn rate" />
		<StatListItem value="5x" label="Uninstalls" />
		<StatListItem value="2.3" label="App store rating" />
		<StatListItem value="8" label="Pending lawsuits" />
	</StatList>
</Container> -->

<!-- Contact Section -->
<ContactSection />
