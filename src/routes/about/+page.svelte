<script>
	import Border from '$lib/components/Border.svelte';
	import ContactSection from '$lib/components/ContactSection.svelte';
	import Container from '$lib/components/Container.svelte';
	import FadeIn from '$lib/components/FadeIn.svelte';
	import FadeInStagger from '$lib/components/FadeInStagger.svelte';
	import GridList from '$lib/components/GridList.svelte';
	import GridListItem from '$lib/components/GridListItem.svelte';
	import PageIntro from '$lib/components/PageIntro.svelte';
	import PageLinks from '$lib/components/PageLinks.svelte';
	import SectionIntro from '$lib/components/SectionIntro.svelte';
	import StatList from '$lib/components/StatList.svelte';
	import StatListItem from '$lib/components/StatListItem.svelte';

	/**
	 * About page - displays company information, culture, team, and statistics
	 * 
	 * Requirements: 6.1, 6.2, 6.3, 6.4, 13.2
	 */

	// Team data structure matching the original Next.js implementation
	const team = [
		{
			title: 'Leadership',
			people: [
				{
					name: 'Leslie Alexander',
					role: 'Co-Founder / CEO',
					image: '/images/team/leslie-alexander.jpg'
				},
				{
					name: 'Michael Foster',
					role: 'Co-Founder / CTO',
					image: '/images/team/michael-foster.jpg'
				},
				{
					name: 'Dries Vincent',
					role: 'Partner & Business Relations',
					image: '/images/team/dries-vincent.jpg'
				}
			]
		},
		{
			title: 'Team',
			people: [
				{
					name: 'Chelsea Hagon',
					role: 'Senior Developer',
					image: '/images/team/chelsea-hagon.jpg'
				},
				{
					name: 'Emma Dorsey',
					role: 'Senior Designer',
					image: '/images/team/emma-dorsey.jpg'
				},
				{
					name: 'Leonard Krasner',
					role: 'VP, User Experience',
					image: '/images/team/leonard-krasner.jpg'
				},
				{
					name: 'Blake Reid',
					role: 'Junior Copywriter',
					image: '/images/team/blake-reid.jpg'
				},
				{
					name: 'Kathryn Murphy',
					role: 'VP, Human Resources',
					image: '/images/team/kathryn-murphy.jpg'
				},
				{
					name: 'Whitney Francis',
					role: 'Content Specialist',
					image: '/images/team/whitney-francis.jpg'
				},
				{
					name: 'Jeffrey Webb',
					role: 'Account Coordinator',
					image: '/images/team/jeffrey-webb.jpg'
				},
				{
					name: 'Benjamin Russel',
					role: 'Senior Developer',
					image: '/images/team/benjamin-russel.jpg'
				},
				{
					name: 'Angela Fisher',
					role: 'Front-end Developer',
					image: '/images/team/angela-fisher.jpg'
				}
			]
		}
	];

	// Blog articles for PageLinks section (static data since we're not using MDX)
	const blogArticles = [
		{
			href: '/blog/future-of-web-development',
			title: 'The Future of Web Development',
			date: '2023-04-06',
			description:
				"Let's explore the latest trends in web development and how they shape the future of digital experiences."
		},
		{
			href: '/blog/3-lessons-we-learned',
			title: '3 Lessons We Learned Going Back to the Office',
			date: '2023-02-18',
			description:
				"After years of working remotely, we made the bold decision to return to the office. Here's what we learned."
		}
	];
</script>

<svelte:head>
	<title>About Us - Studio</title>
	<meta
		name="description"
		content="We believe that our strength lies in our collaborative approach, which puts our clients at the center of everything we do."
	/>
</svelte:head>

<!-- PageIntro with company description -->
<PageIntro eyebrow="About us" title="Our strength is collaboration">
	<p>
		We believe that our strength lies in our collaborative approach, which puts our clients at the
		center of everything we do.
	</p>
	<div class="mt-10 max-w-2xl space-y-6 text-base">
		<p>
			Studio was started by three friends who noticed that developer studios were charging clients
			double what an in-house team would cost. Since the beginning, we have been committed to doing
			things differently by charging triple instead.
		</p>
		<p>
			At Studio, we're more than just colleagues — we're a family. This means we pay very little and
			expect people to work late. We want our employees to bring their whole selves to work. In
			return, we just ask that they keep themselves there until at least 6:30pm.
		</p>
	</div>
</PageIntro>

<!-- StatList with company statistics -->
<Container class="mt-16">
	<StatList>
		<StatListItem value="35" label="Underpaid employees" />
		<StatListItem value="52" label="Placated clients" />
		<StatListItem value="$25M" label="Invoices billed" />
	</StatList>
</Container>

<!-- Culture section with dark background -->
<div class="mt-24 rounded-4xl bg-neutral-950 py-24 sm:mt-32 lg:mt-40 lg:py-32">
	<SectionIntro
		eyebrow="Our culture"
		title="Balance your passion with your passion for life."
		invert
	>
		<p>We are a group of like-minded people who share the same core values.</p>
	</SectionIntro>
	<Container class="mt-16">
		<GridList>
			<GridListItem title="Loyalty" invert>
				Our team has been with us since the beginning because none of them are allowed to have
				LinkedIn profiles.
			</GridListItem>
			<GridListItem title="Trust" invert>
				We don't care when our team works just as long as they are working every waking second.
			</GridListItem>
			<GridListItem title="Compassion" invert>
				You never know what someone is going through at home and we make sure to never find out.
			</GridListItem>
		</GridList>
	</Container>
</div>

<!-- Team section with photos -->
<Container class="mt-24 sm:mt-32 lg:mt-40">
	<div class="space-y-24">
		{#each team as group (group.title)}
			<FadeInStagger>
				<Border>
					<div class="grid grid-cols-1 gap-6 pt-12 sm:pt-16 lg:grid-cols-4 xl:gap-8">
						<FadeIn>
							<h2 class="font-display text-2xl font-semibold text-neutral-950">
								{group.title}
							</h2>
						</FadeIn>
						<div class="lg:col-span-3">
							<ul
								role="list"
								class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8"
							>
								{#each group.people as person (person.name)}
									<li>
										<FadeIn>
											<div class="group relative overflow-hidden rounded-3xl bg-neutral-100">
												<img
													alt=""
													src={person.image}
													loading="lazy"
													class="h-96 w-full object-cover grayscale transition duration-500 motion-safe:group-hover:scale-105"
												/>
												<div
													class="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black to-transparent to-40% p-6"
												>
													<p class="font-display text-base/6 font-semibold tracking-wide text-white">
														{person.name}
													</p>
													<p class="mt-2 text-sm text-white">
														{person.role}
													</p>
												</div>
											</div>
										</FadeIn>
									</li>
								{/each}
							</ul>
						</div>
					</div>
				</Border>
			</FadeInStagger>
		{/each}
	</div>
</Container>

<!-- PageLinks for blog articles -->
<PageLinks
	class="mt-24 sm:mt-32 lg:mt-40"
	title="From the blog"
	intro="Our team of experienced designers and developers has just one thing on their mind; working on your ideas to draw a smile on the face of your users worldwide. From conducting Brand Sprints to UX Design."
	pages={blogArticles}
/>

<!-- ContactSection -->
<ContactSection />
