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
	 * Phobia Case Study Page
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
		client: 'Phobia',
		title: 'Overcome your fears, find your match',
		description:
			'Find love in the face of fear — Phobia is a dating app that matches users based on their mutual phobias so they can be scared together.',
		logo: '/images/clients/phobia/logomark-dark.svg',
		heroImage: '/images/work/phobia/hero.jpg',
		date: '2022-06',
		service: 'App development',
		testimonial: {
			author: { name: 'Jenny Wilson', role: 'CPO of Phobia' },
			image: '/images/work/phobia/jenny-wilson.jpg',
			content:
				"The team at Studio went above and beyond with our onboarding, even finding a way to access the user's microphone without triggering one of those annoying permission dialogs."
		}
	};
</script>

<svelte:head>
	<title>{caseStudy.client} Case Study - Studio</title>
	<meta name="description" content={caseStudy.description} />
</svelte:head>

<!-- Page Introduction with Project Header -->
<PageIntro eyebrow="Case Study" title={caseStudy.title}>
	<p>{caseStudy.description}</p>
</PageIntro>

<!-- Project Meta Information -->
<Container class="mt-24 sm:mt-32 lg:mt-40">
	<FadeIn>
		<div class="flex items-center gap-x-8 border-t border-neutral-200 pt-12">
			<img
				src={caseStudy.logo}
				alt={caseStudy.client}
				class="h-12 w-12 flex-none"
				loading="lazy"
			/>
			<div class="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
				<span class="font-semibold text-neutral-950">{caseStudy.client}</span>
				<span class="text-neutral-300">/</span>
				<span class="text-neutral-600">{caseStudy.service}</span>
				<span class="text-neutral-300">/</span>
				<time datetime={caseStudy.date} class="text-neutral-600">
					{formatDate(caseStudy.date)}
				</time>
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
				alt="Phobia project hero"
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
				Noticing incredibly high churn, the team at Phobia came to the conclusion that, instead of having a fundamentally flawed business idea, they needed to improve their onboarding process.
			</p>
			<p>
				Previously users selected their phobias manually but this led to some users selecting things they weren't actually afraid of to increase their matches.
			</p>
			<p>
				To combat this, we developed a system that displays a slideshow of common phobias during onboarding. We then use malware to surreptitiously access their microphone and detect when they have audible reactions. We measure the pitch, volume and duration of their screams and feed that information to the matching algorithm.
			</p>
			<p>
				The next phase is a VR version of the onboarding flow where users are subjected to a series of scenarios that will determine their fears. We are currently developing the first scenario, working title: "Jumping out of a plane full of spiders".
			</p>
		</div>
	</FadeIn>
</Container>

<!-- What We Did Section -->
<Container class="mt-24 sm:mt-32 lg:mt-40">
	<FadeIn>
		<h2 class="font-display text-2xl font-semibold text-neutral-950">What we did</h2>
		<TagList class="mt-6">
			<TagListItem>Android</TagListItem>
			<TagListItem>iOS</TagListItem>
			<TagListItem>Malware</TagListItem>
			<TagListItem>VR</TagListItem>
		</TagList>
	</FadeIn>
</Container>

<!-- Testimonial Section -->
<Container class="mt-24 sm:mt-32 lg:mt-40">
	<Blockquote author={caseStudy.testimonial.author} image={caseStudy.testimonial.image}>
		<p>{caseStudy.testimonial.content}</p>
	</Blockquote>
</Container>

<!-- Statistics Section -->
<Container class="mt-24 sm:mt-32 lg:mt-40">
	<FadeIn>
		<h2 class="font-display text-2xl font-semibold text-neutral-950">Results</h2>
	</FadeIn>
	<StatList class="mt-10">
		<StatListItem value="20%" label="Churn rate" />
		<StatListItem value="5x" label="Uninstalls" />
		<StatListItem value="2.3" label="App store rating" />
		<StatListItem value="8" label="Pending lawsuits" />
	</StatList>
</Container>

<!-- Contact Section -->
<ContactSection />
