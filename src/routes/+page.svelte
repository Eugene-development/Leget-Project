<script>
	import Container from '$lib/components/Container.svelte';
	import FadeIn from '$lib/components/FadeIn.svelte';
	import FadeInStagger from '$lib/components/FadeInStagger.svelte';
	import SectionIntro from '$lib/components/SectionIntro.svelte';
	import List from '$lib/components/List.svelte';
	import ListItem from '$lib/components/ListItem.svelte';
	import StylizedImage from '$lib/components/StylizedImage.svelte';
	import Testimonial from '$lib/components/Testimonial.svelte';
	import ContactSection from '$lib/components/ContactSection.svelte';

	// Client logos data
	const clients = [
		{ name: 'Phobia', logo: '/images/clients/phobia/logo-light.svg' },
		{ name: 'Family Fund', logo: '/images/clients/family-fund/logo-light.svg' },
		{ name: 'Unseal', logo: '/images/clients/unseal/logo-light.svg' },
		{ name: 'Mail Smirk', logo: '/images/clients/mail-smirk/logo-light.svg' },
		{ name: 'Home Work', logo: '/images/clients/home-work/logo-light.svg' },
		{ name: 'Green Life', logo: '/images/clients/green-life/logo-light.svg' },
		{ name: 'Bright Path', logo: '/images/clients/bright-path/logo-light.svg' },
		{ name: 'North Adventures', logo: '/images/clients/north-adventures/logo-light.svg' }
	];

	// Case studies data
	const caseStudies = [
		{
			client: 'FamilyFund',
			title: 'Skip the bank, borrow from those you trust',
			description:
				'FamilyFund is a crowdfunding platform for close friends and family., a way to pool funds for important life events.',
			logo: '/images/clients/family-fund/logo-dark.svg',
			href: '/work/family-fund',
			date: '2023'
		},
		{
			client: 'Unseal',
			title: 'Get a hodl of your health',
			description:
				'Unseal is the first NFT platform where users can mint and trade NFTs of their own personal health data.',
			logo: '/images/clients/unseal/logo-dark.svg',
			href: '/work/unseal',
			date: '2022'
		},
		{
			client: 'Phobia',
			title: 'Overcome your fears, find your match',
			description:
				'Find love in the face of fear — Phobia is a dating app that matches users based on their mutual phobias.',
			logo: '/images/clients/phobia/logo-dark.svg',
			href: '/work/phobia',
			date: '2022'
		}
	];
</script>

<svelte:head>
	<title>Studio - Award-winning development studio</title>
	<meta
		name="description"
		content="We are a development studio working at the intersection of design and technology."
	/>
</svelte:head>

<!-- Hero Section -->
<Container class="mt-24 sm:mt-32 md:mt-56">
	<FadeIn class="max-w-3xl">
		<h1 class="font-display text-5xl font-medium tracking-tight text-balance text-neutral-950 sm:text-7xl">
			Award-winning development studio based in Denmark.
		</h1>
		<p class="mt-6 text-xl text-neutral-600">
			We are a development studio working at the intersection of design and technology. It's a
			really busy intersection though — a lot of our staff have been involved in hit and runs.
		</p>
	</FadeIn>
</Container>

<!-- Clients Section -->
<div class="mt-24 rounded-4xl bg-neutral-950 py-20 sm:mt-32 sm:py-32 lg:mt-56">
	<Container>
		<FadeIn class="flex items-center gap-x-8">
			<h2
				class="text-center font-display text-sm font-semibold tracking-wider text-white sm:text-left"
			>
				We've worked with hundreds of amazing people
			</h2>
			<div class="h-px flex-auto bg-neutral-800"></div>
		</FadeIn>
		<FadeInStagger faster>
			<ul role="list" class="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
				{#each clients as client}
					<li>
						<FadeIn>
							<img src={client.logo} alt={client.name} loading="lazy" />
						</FadeIn>
					</li>
				{/each}
			</ul>
		</FadeInStagger>
	</Container>
</div>

<!-- Case Studies Section -->
<SectionIntro title="Harnessing technology for a brighter future" class="mt-24 sm:mt-32 lg:mt-40">
	<p>
		We believe technology is the answer to the world's greatest challenges. It's also the cause, so
		we find ourselves in bit of a catch 22 situation.
	</p>
</SectionIntro>

<Container class="mt-16">
	<FadeInStagger class="grid grid-cols-1 gap-8 lg:grid-cols-3">
		{#each caseStudies as caseStudy}
			<FadeIn class="flex">
				<article
					class="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8"
				>
					<h3>
						<a href={caseStudy.href}>
							<span class="absolute inset-0 rounded-3xl"></span>
							<img
								src={caseStudy.logo}
								alt={caseStudy.client}
								class="h-16 w-16"
								loading="lazy"
							/>
						</a>
					</h3>
					<p class="mt-6 flex gap-x-2 text-sm text-neutral-950">
						<time dateTime={caseStudy.date} class="font-semibold">
							{caseStudy.date}
						</time>
						<span class="text-neutral-300" aria-hidden="true">/</span>
						<span>Case study</span>
					</p>
					<p class="mt-6 font-display text-2xl font-semibold text-neutral-950">
						{caseStudy.title}
					</p>
					<p class="mt-4 text-base text-neutral-600">
						{caseStudy.description}
					</p>
				</article>
			</FadeIn>
		{/each}
	</FadeInStagger>
</Container>

<!-- Testimonial Section -->
<Testimonial
	class="mt-24 sm:mt-32 lg:mt-40"
	client={{ name: 'Phobia', logo: '/images/clients/phobia/logo-dark.svg' }}
>
	The team at Studio went above and beyond with our onboarding, even finding a way to access the
	user's microphone without triggering one of those annoying permission dialogs.
</Testimonial>

<!-- Services Section -->
<SectionIntro
	eyebrow="Services"
	title="We help you identify, explore and respond to new opportunities."
	class="mt-24 sm:mt-32 lg:mt-40"
>
	<p>
		As long as those opportunities involve giving us money to re-purpose old projects — we can come
		up with an endless number of those.
	</p>
</SectionIntro>

<Container class="mt-16">
	<div class="lg:flex lg:items-center lg:justify-end">
		<div class="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
			<FadeIn class="w-135 flex-none lg:w-180">
				<StylizedImage
					src="/images/laptop.jpg"
					alt="Laptop"
					class="justify-center lg:justify-end"
				/>
			</FadeIn>
		</div>
		<List class="mt-16 lg:mt-0 lg:w-1/2 lg:min-w-132 lg:pl-4">
			<ListItem title="Web development">
				We specialise in crafting beautiful, high quality marketing pages. The rest of the website
				will be a shell that uses lorem ipsum everywhere.
			</ListItem>
			<ListItem title="Application development">
				We have a team of skilled developers who are experts in the latest app frameworks, like
				Angular 1 and Google Web Toolkit.
			</ListItem>
			<ListItem title="E-commerce">
				We are at the forefront of modern e-commerce development. Which mainly means adding your
				logo to the Shopify store template we've used for the past six years.
			</ListItem>
			<ListItem title="Custom content management">
				At Studio we understand the importance of having a robust and customised CMS. That's why we
				run all of our client projects out of a single, enormous Joomla instance.
			</ListItem>
		</List>
	</div>
</Container>

<!-- Contact Section -->
<ContactSection />
