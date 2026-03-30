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
	 * Unseal Case Study Page
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
		client: 'Unseal',
		title: 'Get a hodl of your health',
		description:
			'Unseal is the first NFT platform where users can mint and trade NFTs of their own personal health records, allowing them to take control of their data.',
		logo: '/images/clients/unseal/logomark-dark.svg',
		heroImage: '/images/work/unseal/hero.jpg',
		date: '2022-10',
		service: 'Blockchain development',
		testimonial: {
			author: { name: 'Emily Selman', role: 'Head of Engineering at Unseal' },
			image: '/images/work/unseal/emily-selman.jpg',
			content:
				"Studio did an amazing job building out our core blockchain infrastructure and I'm sure once PlaceboCoin rallies they'll be able to finish the project."
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
				alt="Unseal project hero"
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
				Annoyed that his wife's gynaecologist would not disclose the results of her pap smear, Unseal's founder Kevin came up with the idea of using the block chain to store individual health records.
			</p>
			<p>
				Unseal approached us early in their development, having just raised funds through an ICO of their cryptocurrency PlaceboCoin. Having never worked on a web3 product we decided to farm the project out to an agency in Kyiv and skim profits off the top. Despite frequent complaints about missile strikes and power outages, the Ukrainians delivered the brief ahead of schedule.
			</p>
			<p>
				After reaching a high of $12k, PlaceboCoin went to zero in a matter of hours. Because we took payment in PlaceboCoin but our subcontractors insisted on being paid in USD we have taken a huge financial loss on this project.
			</p>
		</div>
	</FadeIn>
</Container>

<!-- What We Did Section -->
<Container class="mt-24 sm:mt-32 lg:mt-40">
	<FadeIn>
		<h2 class="font-display text-2xl font-semibold text-neutral-950">What we did</h2>
		<TagList class="mt-6">
			<TagListItem>Blockchain development</TagListItem>
			<TagListItem>Backend (Solidity)</TagListItem>
			<TagListItem>Smart contracts</TagListItem>
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
		<StatListItem value="34%" label="Fewer transactions" />
		<StatListItem value="10%" label="Slower transactions" />
		<StatListItem value="1000ms" label="Transaction latency" />
		<StatListItem value="3" label="Active nodes" />
	</StatList>
</Container>

<!-- Contact Section -->
<ContactSection />
