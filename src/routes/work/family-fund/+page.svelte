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
	 * FamilyFund Case Study Page
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
		client: 'FamilyFund',
		title: 'Skip the bank, borrow from those you trust',
		description:
			'FamilyFund is a crowdfunding platform for friends and family. Allowing users to take personal loans from their network without a traditional financial institution.',
		logo: '/images/clients/family-fund/logomark-dark.svg',
		heroImage: '/images/work/family-fund/hero.jpg',
		date: '2023-01',
		service: 'Web development, CMS',
		testimonial: {
			author: { name: 'Debra Fiscal', role: 'CEO of FamilyFund' },
			image: '/images/work/family-fund/debra-fiscal.jpg',
			content:
				'Working with Studio, we felt more like a partner than a customer. They really resonated with our mission to change the way people convince their parents to cash out their pensions.'
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
				alt="FamilyFund project hero"
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
				Having written one of the most shared posts on medium.com ("<em>How to cash out your Dad's 401K without him knowing</em>") FamilyFund approached us looking to build out their own blog.
			</p>
			<p>
				The blog would help drive new traffic to their site and serve as a resource-hub for users already trying to exploit their network for money. Because it was so important that they own their own content, we decided that an on-prem solution would be best.
			</p>
			<p>
				We installed 24 Mac Minis bought from craigslist in the storage cupboard of their office. One machine would be used for the web server and another one for the build server. The other 22 were for redundancy, and to DDOS squarespace.com every few months to keep them on their toes.
			</p>
			<p>
				To optimise their search traffic we used an innovative technique. Every post has a shadow post only visible to web crawlers that is some variation of "<em>Gary Vee is looking to invest in new founders</em>". Like bees to honey.
			</p>
		</div>
	</FadeIn>
</Container>

<!-- What We Did Section -->
<Container class="mt-24 sm:mt-32 lg:mt-40">
	<FadeIn>
		<h2 class="font-display text-2xl font-semibold text-neutral-950">What we did</h2>
		<TagList class="mt-6">
			<TagListItem>Frontend (Next.js)</TagListItem>
			<TagListItem>Custom CMS</TagListItem>
			<TagListItem>SEO</TagListItem>
			<TagListItem>Infrastructure</TagListItem>
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
		<StatListItem value="25%" label="Less traffic" />
		<StatListItem value="10x" label="Page load times" />
		<StatListItem value="15%" label="Higher infra costs" />
		<StatListItem value="$1.2M" label="Legal fees" />
	</StatList>
</Container>

<!-- Contact Section -->
<ContactSection />
