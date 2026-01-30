<script>
	import Border from '$lib/components/Border.svelte';
	import ContactSection from '$lib/components/ContactSection.svelte';
	import Container from '$lib/components/Container.svelte';
	import FadeIn from '$lib/components/FadeIn.svelte';
	import PageLinks from '$lib/components/PageLinks.svelte';
	import { formatDate } from '$lib/formatDate.js';

	/**
	 * Blog Article: 3 Lessons We Learned Going Back to the Office
	 * Requirements: 13.6
	 */

	const article = {
		date: '2023-02-18',
		title: '3 Lessons We Learned Going Back to the Office',
		description:
			'Earlier this year we made the bold decision to make everyone come back to the office full-time after two years working from a dressing table in the corner of their bedroom.',
		author: {
			name: 'Leslie Alexander',
			role: 'Co-Founder / CEO',
			image: '/images/team/leslie-alexander.jpg'
		}
	};

	const moreArticles = [
		{
			href: '/blog/future-of-web-development',
			date: '2023-04-06',
			title: 'The Future of Web Development: Our Predictions for 2023',
			description:
				"Let's explore the latest trends in web development, and regurgitate some predictions we read on X for how they will shape the industry in the coming year."
		},
		{
			href: '/blog/a-short-guide-to-component-naming',
			date: '2022-12-01',
			title: 'A Short Guide to Component Naming',
			description:
				"As a developer, the most important aspect of your job is naming components. It's not just about being descriptive and clear, but also about having fun and being creative."
		}
	];
</script>

<svelte:head>
	<title>{article.title} - Studio</title>
	<meta name="description" content={article.description} />
</svelte:head>

<Container as="article" class="mt-24 sm:mt-32 lg:mt-40">
	<FadeIn>
		<header class="mx-auto flex max-w-5xl flex-col text-center">
			<h1 class="mt-6 font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-6xl">
				{article.title}
			</h1>
			<time datetime={article.date} class="order-first text-sm text-neutral-950">
				{formatDate(article.date)}
			</time>
			<p class="mt-6 text-sm font-semibold text-neutral-950">
				by {article.author.name}, {article.author.role}
			</p>
		</header>
	</FadeIn>

	<FadeIn>
		<div class="[&>*]:mx-auto [&>*]:max-w-3xl [&>:first-child]:!mt-0 [&>:last-child]:!mb-0 mt-24 sm:mt-32 lg:mt-40">
			<div class="typography">
				<h2>1. Efficiency is Hard to Measure</h2>
				<p>
					Although almost every practical measure of our productivity decreased significantly after returning to the office, as a management team we felt this incredible uptick in energy. We realised that there is an intangible benefit to seeing everyone's screen at all times, that isn't easily measurable in numbers.
				</p>
				<p>
					Sure, we tried to recreate this feeling during our remote days with employee monitoring software but we always had this nagging doubt that our developers had hacked their way around it.
				</p>
				<aside class="my-10 rounded-2xl bg-neutral-50 p-8">
					<p class="text-sm font-semibold text-neutral-950">Top Tip</p>
					<p class="mt-2 text-sm text-neutral-600">
						Getting one of those old-timey punch clocks is a great way to monitor attendance while maintaining a fun atmosphere. Expect to hear things like "Back at the coalface today!".
					</p>
				</aside>
				<figure class="my-10">
					<img src="/images/blog/3-lessons-we-learned-going-back-to-the-office/punch-clock.jpg" alt="Punch clock" class="rounded-2xl" />
				</figure>

				<h2>2. Turnover: a Fresh Perspective</h2>
				<p>
					We parted ways with almost all of our senior development team within the first month of going back to the office, due to some irreconcilable differences. Stressed and worried, we decided to try turn this into a positive.
				</p>
				<p>
					Luckily for us, it was the same week that CoPilot launched and we were able to replace everyone with five bootcamp graduates all logged into one Github account.
				</p>
				<p>
					We have been consistently surprised at the fresh energy these new grads brought to our organisation and have since vowed to never hire anyone with more than 3 months experience again.
				</p>
				<figure class="my-10">
					<img src="/images/blog/3-lessons-we-learned-going-back-to-the-office/graduation.jpg" alt="Graduation" class="rounded-2xl" />
				</figure>

				<h2>3. Cost Efficiency</h2>
				<p>
					Demand is at an all time low for commercial real-estate, which means it's never been more affordable to cram forty people into an open plan office.
				</p>
				<p>
					What's more, is we've found that we can offer extremely low-cost perks like a snack cupboard or free beer in-lieu of higher salaries. For every foosball table we buy, we find we can offer around 5% less salary per job posting. Our full-time barista is the highest paid employee, after management.
				</p>
				<figure class="my-10">
					<img src="/images/blog/3-lessons-we-learned-going-back-to-the-office/jars.jpg" alt="Jars" class="rounded-2xl" />
				</figure>
			</div>
		</div>
	</FadeIn>
</Container>

<PageLinks
	class="mt-24 sm:mt-32 lg:mt-40"
	title="More articles"
	intro="Read more about our experiences and insights."
	pages={moreArticles}
/>

<ContactSection />
