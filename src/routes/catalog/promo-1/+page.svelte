<script>
	import Button from '$lib/components/Button.svelte';
	import ContactSection from '$lib/components/ContactSection.svelte';
	import Container from '$lib/components/Container.svelte';
	import FadeIn from '$lib/components/FadeIn.svelte';
	import GrayscaleTransitionImage from '$lib/components/GrayscaleTransitionImage.svelte';
	import PageIntro from '$lib/components/PageIntro.svelte';
	import TagList from '$lib/components/TagList.svelte';
	import TagListItem from '$lib/components/TagListItem.svelte';
	import SubscribeLicenseModal from '$lib/components/SubscribeLicenseModal.svelte';

	// templateId=1 corresponds to Promo-1
	const TEMPLATE_ID = 1;
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
		title: 'Promo-1 — сайт для мебели на заказ',
		description:
			'Сайт для мебельной компании: каталог, проекты, услуги, контакты и формы обращений. Стартовую структуру можно наполнить своими материалами.',
		heroImage: '/images/projects/promo-1/hero.png'
	};
</script>

<svelte:head>
	<title>Promo-1 — сайт для мебели на заказ | LEGET</title>
	<meta name="description" content={caseStudy.description} />
</svelte:head>

<PageIntro eyebrow="Шаблон" title={caseStudy.title}>
	<p>{caseStudy.description}</p>
</PageIntro>

<Container class="mt-24 sm:mt-32 lg:mt-40">
	<FadeIn>
		<div class="flex items-center gap-x-8 border-t border-neutral-200 pt-12">
			<div class="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
				<a href="/" class="text-neutral-600 transition hover:text-neutral-950">Главная</a>
				<span class="text-neutral-300">/</span>
				<a href="/catalog" class="text-neutral-600 transition hover:text-neutral-950">Каталог</a>
				<span class="text-neutral-300">/</span>
				<span class="font-semibold text-neutral-950">{caseStudy.client}</span>
			</div>
		</div>
	</FadeIn>
</Container>

<Container class="mt-16">
	<FadeIn>
		<div class="mb-8 flex flex-wrap justify-center gap-4">
			<Button
				href="https://novostroy.org"
				target="_blank"
				class="px-8 py-3 text-lg"
				aria-label="Посмотреть демоверсию {caseStudy.client}"
			>
				Посмотреть демоверсию сайта
			</Button>
			<Button
				invert
				class="px-8 py-3 text-lg ring-1 ring-neutral-950"
				onclick={() => (modalOpen = true)}
				aria-label="Подписаться на лицензию {caseStudy.client}"
			>
				Подписаться на лицензию
			</Button>
		</div>

		<div class="overflow-hidden rounded-3xl bg-neutral-100">
			<GrayscaleTransitionImage
				src={caseStudy.heroImage}
				alt="Предпросмотр шаблона Promo-1"
				class="w-full object-cover"
				loading="lazy"
			/>
		</div>
	</FadeIn>
</Container>

<Container class="mt-24 sm:mt-32 lg:mt-40">
	<FadeIn>
		<h2 class="font-display text-2xl font-semibold text-neutral-950">Что входит в шаблон</h2>
		<div class="mt-6 space-y-6 text-base text-neutral-600">
			<p>
				Promo-1 предназначен для компаний, которые изготавливают и продают мебель на заказ. В
				шаблоне есть каталог мебели, примеры проектов, страницы услуг и информация о компании.
			</p>
			<p>
				После создания сайта настройте домен, название, логотип, город и разделы каталога в личном
				кабинете. На самом сайте замените стартовые тексты, изображения и контакты на свои.
			</p>
			<p>
				В режиме редактирования можно выбирать доступные версии блоков. Версия меняет композицию
				блока; содержание вашей компании хранится отдельно от стартовых данных шаблона.
			</p>
			<p>
				Формы принимают обращения посетителей. Для аналитики подключите свой счётчик Яндекс Метрики
				и создайте цели по карте кнопок шаблона. Рекламную кампанию и обработку обращений организует
				ваша компания.
			</p>
		</div>
	</FadeIn>
</Container>

<Container class="mt-24 sm:mt-32 lg:mt-40">
	<FadeIn>
		<h2 class="font-display text-2xl font-semibold text-neutral-950">
			Подходит для видов деятельности
		</h2>
		<TagList class="mt-6">
			<TagListItem>Мебель на заказ</TagListItem>
		</TagList>
	</FadeIn>
</Container>

<ContactSection />

<SubscribeLicenseModal
	open={modalOpen}
	templateId={TEMPLATE_ID}
	templateName="Promo-1"
	price="150"
	period="день"
	onClose={() => (modalOpen = false)}
	onSuccess={(id) => {
		modalOpen = false;
	}}
/>
