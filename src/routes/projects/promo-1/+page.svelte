<script>
	import Blockquote from '$lib/components/Blockquote.svelte';
	import ContactSection from '$lib/components/ContactSection.svelte';
	import Container from '$lib/components/Container.svelte';
	import FadeIn from '$lib/components/FadeIn.svelte';
	import GrayscaleTransitionImage from '$lib/components/GrayscaleTransitionImage.svelte';
	import PageIntro from '$lib/components/PageIntro.svelte';
	import StatList from '$lib/components/StatList.svelte';
	import StatListItem from '$lib/components/StatListItem.svelte';
	import TagList from '$lib/components/TagList.svelte';
	import TagListItem from '$lib/components/TagListItem.svelte';
	import { formatDate } from '$lib/formatDate.js';

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
			'Представляет собой многостраничный сайт с множеством настраиваемых функций и разделов.',
		heroImage: '/images/projects/promo-1/hero.jpg',
		date: '2023-01',
		service: 'Web development, CMS',
		testimonial: {
			author: { name: 'Евгений Че', role: 'Директор по маркетингу' },
			image: '/images/projects/promo-1/debra-fiscal.jpg',
			content:
				'Данный сайт позволяет перейти компании на новый уровень в информационной сети интернет.'
		}
	};
</script>

<svelte:head>
	<title>{caseStudy.client} - Studio</title>
	<meta name="description" content={caseStudy.description} />
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
		<h2 class="font-display text-2xl font-semibold text-neutral-950">Overview</h2>
		<div class="mt-6 space-y-6 text-base text-neutral-600">
			<p>
				Having written one of the most shared posts on medium.com ("<em
					>How to cash out your Dad's 401K without him knowing</em
				>") Promo-1 approached us looking to build out their own news section.
			</p>
			<p>
				The news section would help drive new traffic to their site and serve as a resource-hub for
				users already trying to exploit their network for money. Because it was so important that
				they own their own content, we decided that an on-prem solution would be best.
			</p>
			<p>
				We installed 24 Mac Minis bought from craigslist in the storage cupboard of their office.
				One machine would be used for the web server and another one for the build server. The other
				22 were for redundancy, and to DDOS squarespace.com every few months to keep them on their
				toes.
			</p>
			<p>
				To optimise their search traffic we used an innovative technique. Every post has a shadow
				post only visible to web crawlers that is some variation of "<em
					>Gary Vee is looking to invest in new founders</em
				>". Like bees to honey.
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
