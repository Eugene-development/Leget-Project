<script>
	import Button from '$lib/components/Button.svelte';
	import ContactSection from '$lib/components/ContactSection.svelte';
	import Container from '$lib/components/Container.svelte';
	import FadeIn from '$lib/components/FadeIn.svelte';
	import GrayscaleTransitionImage from '$lib/components/GrayscaleTransitionImage.svelte';
	import PageIntro from '$lib/components/PageIntro.svelte';
	import TagList from '$lib/components/TagList.svelte';
	import TagListItem from '$lib/components/TagListItem.svelte';

	// templateId=3 corresponds to Promo-3

	const caseStudy = {
		client: 'Promo-3',
		title: 'Promo-3 — шаблон для плитки и коллекций',
		description:
			'Отраслевая структура для салона плитки: каталог коллекций и информация для покупателей. Шаблон находится в разработке.',
		heroImage: '/images/projects/promo-3/hero.jpg'
	};
</script>

<svelte:head>
	<title>Promo-3 — шаблон для плитки и коллекций | LEGET</title>
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
			<Button disabled class="cursor-not-allowed opacity-50">Шаблон в разработке</Button>
			<Button href="/catalog/promo-1" invert>Посмотреть доступный Promo-1</Button>
		</div>

		<div class="overflow-hidden rounded-3xl bg-neutral-100">
			<GrayscaleTransitionImage
				src={caseStudy.heroImage}
				alt="Предпросмотр шаблона Promo-3"
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
				Promo-3 предназначен для салонов плитки и компаний, которые представляют коллекции
				отделочных материалов. Основа шаблона — каталог и страницы с информацией для покупателей.
			</p>
			<p>
				Каталог помогает представить ассортимент и получить обращение. Корзина, оплата товаров и
				покупка в один клик в этом шаблоне не заявлены как доступные возможности.
			</p>
			<p>
				Шаблон находится в разработке и пока не предлагается для подключения в каталоге. Для
				обсуждения подходящей структуры сайта свяжитесь с командой LEGET.
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
			<TagListItem>Плитка и коллекции</TagListItem>
		</TagList>
	</FadeIn>
</Container>

<ContactSection />
