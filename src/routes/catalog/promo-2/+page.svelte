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

	const TEMPLATE_ID = 2;
	let modalOpen = $state(false);

	const caseStudy = {
		client: 'Promo-2',
		title: 'Promo-2 — шаблон для мебельной фабрики',
		description:
			'Отраслевая структура для мебельной фабрики: производство, продукция и сотрудничество.',
		heroImage: '/images/projects/promo-2/hero.jpg'
	};
</script>

<svelte:head>
	<title>Promo-2 — шаблон для мебельной фабрики | LEGET</title>
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
				onclick={() => (modalOpen = true)}
				class="px-8 py-3 text-lg focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2"
				aria-label="Подписаться на лицензию {caseStudy.client}"
			>
				Подписаться на лицензию
			</Button>
		</div>

		<div class="overflow-hidden rounded-3xl bg-neutral-100">
			<GrayscaleTransitionImage
				src={caseStudy.heroImage}
				alt="Предпросмотр шаблона Promo-2"
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
				Promo-2 ориентирован на мебельные фабрики. Его структура предназначена для представления
				производства и продукции, а также условий сотрудничества.
			</p>
			<p>
				После создания сайта замените стартовые материалы на свои и настройте данные компании в
				личном кабинете.
			</p>
			<p>
				Сравните структуру шаблона с задачами своей компании. Команда LEGET поможет разобраться в
				составе страниц.
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
			<TagListItem>Мебельная фабрика</TagListItem>
		</TagList>
	</FadeIn>
</Container>

<ContactSection />

<SubscribeLicenseModal
	open={modalOpen}
	templateId={TEMPLATE_ID}
	templateName="Promo-2"
	price="150"
	period="день"
	onClose={() => (modalOpen = false)}
	onSuccess={() => (modalOpen = false)}
/>
