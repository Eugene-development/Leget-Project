<script>
	import Blockquote from '$lib/components/Blockquote.svelte';
	import ContactSection from '$lib/components/ContactSection.svelte';
	import Container from '$lib/components/Container.svelte';
	import FadeIn from '$lib/components/FadeIn.svelte';
	import GridList from '$lib/components/GridList.svelte';
	import GridListItem from '$lib/components/GridListItem.svelte';
	import GridPattern from '$lib/components/GridPattern.svelte';
	import List from '$lib/components/List.svelte';
	import ListItem from '$lib/components/ListItem.svelte';
	import PageIntro from '$lib/components/PageIntro.svelte';
	import SectionIntro from '$lib/components/SectionIntro.svelte';
	import StylizedImage from '$lib/components/StylizedImage.svelte';
	import TagList from '$lib/components/TagList.svelte';
	import TagListItem from '$lib/components/TagListItem.svelte';
</script>

<svelte:head>
	<title>Our Process - Studio</title>
	<meta
		name="description"
		content="We believe in efficiency and maximizing our resources to provide the best value to our clients."
	/>
</svelte:head>

<!-- Page Introduction -->
<PageIntro eyebrow="Our process" title="How we work">
	<p>
		We believe in efficiency and maximizing our resources to provide the best value to our clients.
		The primary way we do that is by re-using the same five projects we've been developing for the
		past decade.
	</p>
</PageIntro>

<!-- Process Sections -->
<div
	class="mt-24 space-y-24 [counter-reset:section] sm:mt-32 sm:space-y-32 lg:mt-40 lg:space-y-40"
>
	<!-- Discover Section -->
	<Container class="group/section [counter-increment:section]">
		<div
			class="lg:flex lg:items-center lg:justify-end lg:gap-x-8 lg:group-even/section:justify-start xl:gap-x-20"
		>
			<div class="flex justify-center">
				<FadeIn class="w-135 flex-none lg:w-180">
					<StylizedImage
						src="/images/whiteboard.jpg"
						alt="Team brainstorming at whiteboard"
						shape={0}
						class="justify-center lg:justify-end lg:group-even/section:justify-start"
					/>
				</FadeIn>
			</div>
			<div class="mt-12 lg:mt-0 lg:w-148 lg:flex-none lg:group-even/section:order-first">
				<FadeIn>
					<div
						class="font-display text-base font-semibold before:text-neutral-300 before:content-['/_'] after:text-neutral-950 after:content-[counter(section,decimal-leading-zero)]"
						aria-hidden="true"
					></div>
					<h2
						class="mt-2 font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl"
					>
						Discover
					</h2>
					<div class="mt-6">
						<div class="space-y-6 text-base text-neutral-600">
							<p>
								We work closely with our clients to understand their
								<strong class="font-semibold text-neutral-950">needs</strong> and goals, embedding ourselves
								in their every day operations to understand what makes their business tick.
							</p>
							<p>
								Our team of private investigators shadow the company director's for several weeks
								while our account managers focus on going through their trash. Our senior security
								experts then perform social engineering hacks to gain access to their
								<strong class="font-semibold text-neutral-950">business</strong>
								accounts — handing that information over to our forensic accounting team.
							</p>
							<p>
								Once the full audit is complete, we report back with a comprehensive
								<strong class="font-semibold text-neutral-950">plan</strong> and, more importantly, a
								budget.
							</p>
						</div>

						<h3 class="mt-12 font-display text-base font-semibold text-neutral-950">
							Included in this phase
						</h3>
						<TagList class="mt-4">
							<TagListItem>In-depth questionnaires</TagListItem>
							<TagListItem>Feasibility studies</TagListItem>
							<TagListItem>Blood samples</TagListItem>
							<TagListItem>Employee surveys</TagListItem>
							<TagListItem>Proofs-of-concept</TagListItem>
							<TagListItem>Forensic audit</TagListItem>
						</TagList>
					</div>
				</FadeIn>
			</div>
		</div>
	</Container>

	<!-- Build Section -->
	<Container class="group/section [counter-increment:section]">
		<div
			class="lg:flex lg:items-center lg:justify-end lg:gap-x-8 lg:group-even/section:justify-start xl:gap-x-20"
		>
			<div class="flex justify-center">
				<FadeIn class="w-135 flex-none lg:w-180">
					<StylizedImage
						src="/images/laptop.jpg"
						alt="Developer working on laptop"
						shape={1}
						class="justify-center lg:justify-end lg:group-even/section:justify-start"
					/>
				</FadeIn>
			</div>
			<div class="mt-12 lg:mt-0 lg:w-148 lg:flex-none lg:group-even/section:order-first">
				<FadeIn>
					<div
						class="font-display text-base font-semibold before:text-neutral-300 before:content-['/_'] after:text-neutral-950 after:content-[counter(section,decimal-leading-zero)]"
						aria-hidden="true"
					></div>
					<h2
						class="mt-2 font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl"
					>
						Build
					</h2>
					<div class="mt-6">
						<div class="space-y-6 text-base text-neutral-600">
							<p>
								Based off of the discovery phase, we develop a comprehensive roadmap for each
								product and start working towards delivery. The roadmap is an intricately tangled
								mess of technical nonsense designed to drag the project out as long as possible.
							</p>
							<p>
								Each client is assigned a key account manager to keep lines of communication open
								and obscure the actual progress of the project. They act as a buffer between the
								client's incessant nagging and the development team who are hard at work scouring
								open source projects for code to re-purpose.
							</p>
							<p>
								Our account managers are trained to only reply to client emails after 9pm, several
								days after the initial email. This reinforces the general aura that we are very busy
								and dissuades clients from asking for changes.
							</p>
						</div>

						<Blockquote
							author={{ name: 'Debra Fiscal', role: 'CEO of Unseal' }}
							class="mt-12"
						>
							<p>
								Studio were so regular with their progress updates we almost began to think they
								were automated!
							</p>
						</Blockquote>
					</div>
				</FadeIn>
			</div>
		</div>
	</Container>

	<!-- Deliver Section -->
	<Container class="group/section [counter-increment:section]">
		<div
			class="lg:flex lg:items-center lg:justify-end lg:gap-x-8 lg:group-even/section:justify-start xl:gap-x-20"
		>
			<div class="flex justify-center">
				<FadeIn class="w-135 flex-none lg:w-180">
					<StylizedImage
						src="/images/meeting.jpg"
						alt="Team meeting"
						shape={2}
						class="justify-center lg:justify-end lg:group-even/section:justify-start"
					/>
				</FadeIn>
			</div>
			<div class="mt-12 lg:mt-0 lg:w-148 lg:flex-none lg:group-even/section:order-first">
				<FadeIn>
					<div
						class="font-display text-base font-semibold before:text-neutral-300 before:content-['/_'] after:text-neutral-950 after:content-[counter(section,decimal-leading-zero)]"
						aria-hidden="true"
					></div>
					<h2
						class="mt-2 font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl"
					>
						Deliver
					</h2>
					<div class="mt-6">
						<div class="space-y-6 text-base text-neutral-600">
							<p>
								About halfway through the Build phase, we push each project out by 6 weeks due to a
								change in
								<strong class="font-semibold text-neutral-950">requirements</strong>. This allows us
								to increase the budget a final time before launch.
							</p>
							<p>
								Despite largely using pre-built components, most of the
								<strong class="font-semibold text-neutral-950">progress</strong>
								on each project takes place in the final 24 hours. The development time allocated to
								each client is actually spent making augmented reality demos that go viral on social
								media.
							</p>
							<p>
								We ensure that the main pages of the site are
								<strong class="font-semibold text-neutral-950">fully functional</strong>
								at launch — the auxiliary pages will, of course, be lorem ipusm shells which get updated
								as part of our exorbitant
								<strong class="font-semibold text-neutral-950">maintenance</strong>
								retainer.
							</p>
						</div>

						<h3 class="mt-12 font-display text-base font-semibold text-neutral-950">
							Included in this phase
						</h3>
						<List class="mt-8">
							<ListItem title="Testing">
								Our projects always have 100% test coverage, which would be impressive if our tests
								weren't as porous as a sieve.
							</ListItem>
							<ListItem title="Infrastructure">
								To ensure reliability we only use the best Digital Ocean droplets that $4 a month
								can buy.
							</ListItem>
							<ListItem title="Support">
								Because we hold the API keys for every critical service your business uses, you can
								expect a lifetime of support, and invoices, from us.
							</ListItem>
						</List>
					</div>
				</FadeIn>
			</div>
		</div>
	</Container>
</div>

<!-- Values Section -->
<div class="relative mt-24 pt-24 sm:mt-32 sm:pt-32 lg:mt-40 lg:pt-40">
	<div
		class="absolute inset-x-0 top-0 -z-10 h-[884px] overflow-hidden rounded-t-4xl bg-linear-to-b from-neutral-50"
	>
		<GridPattern
			class="absolute inset-0 h-full w-full fill-neutral-100 stroke-neutral-950/5 mask-[linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
			yOffset={-270}
		/>
	</div>

	<SectionIntro eyebrow="Our values" title="Balancing reliability and innovation">
		<p>
			We strive to stay at the forefront of emerging trends and technologies, while completely
			ignoring them and forking that old Rails project we feel comfortable using. We stand by our
			core values to justify that decision.
		</p>
	</SectionIntro>

	<Container class="mt-24">
		<GridList>
			<GridListItem title="Meticulous">
				The first part of any partnership is getting our designer to put your logo in our template.
				The second step is getting them to do the colors.
			</GridListItem>
			<GridListItem title="Efficient">
				We pride ourselves on never missing a deadline which is easy because most of the work was
				done years ago.
			</GridListItem>
			<GridListItem title="Adaptable">
				Every business has unique needs and our greatest challenge is shoe-horning those needs into
				something we already built.
			</GridListItem>
			<GridListItem title="Honest">
				We are transparent about all of our processes, banking on the simple fact our clients never
				actually read anything.
			</GridListItem>
			<GridListItem title="Loyal">
				We foster long-term relationships with our clients that go beyond just delivering a product,
				allowing us to invoice them for decades.
			</GridListItem>
			<GridListItem title="Innovative">
				The technological landscape is always evolving and so are we. We are constantly on the
				lookout for new open source projects to clone.
			</GridListItem>
		</GridList>
	</Container>
</div>

<!-- Contact Section -->
<ContactSection />
