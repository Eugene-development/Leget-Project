<script>
	import Border from '$lib/components/Border.svelte';
	import ContactSection from '$lib/components/ContactSection.svelte';
	import Container from '$lib/components/Container.svelte';
	import FadeIn from '$lib/components/FadeIn.svelte';
	import PageIntro from '$lib/components/PageIntro.svelte';
	import PageLinks from '$lib/components/PageLinks.svelte';
	import { formatDate } from '$lib/formatDate.js';

	/**
	 * Blog Article: The Future of Web Development
	 * Requirements: 13.6
	 */

	const article = {
		date: '2023-04-06',
		title: 'The Future of Web Development: Our Predictions for 2023',
		description:
			"Let's explore the latest trends in web development, and regurgitate some predictions we read on X for how they will shape the industry in the coming year.",
		author: {
			name: 'Chelsea Hagon',
			role: 'Senior Developer',
			image: '/images/team/chelsea-hagon.jpg'
		}
	};

	const moreArticles = [
		{
			href: '/blog/3-lessons-we-learned-going-back-to-the-office',
			date: '2023-02-18',
			title: '3 Lessons We Learned Going Back to the Office',
			description:
				'Earlier this year we made the bold decision to make everyone come back to the office full-time after two years working from a dressing table in the corner of their bedroom.'
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
			<!-- Article Content -->
			<div class="typography">
				<h2>1. AI Assisted Development</h2>
				<p>
					With the launch of Github Copilot in 2022 the industry got its first glimpse at what it would look like to have Stack Overflow plumbed straight into your IDE. Copilot has given thousands of developers what they always longed for: plausible deniability over the bugs they write.
				</p>
				<figure class="my-10">
					<img src="/images/blog/future-of-web-development/pilot.jpg" alt="AI pilot" class="rounded-2xl" />
				</figure>
				<p>
					In 2023 we can expect these assistants to become more sophisticated and for that to have ripple effects throughout the industry.
				</p>
				<p>
					We predict that traffic to MDN will decline precipitously as developers realise they no longer need to look up JS array methods. We also expect Stack Overflow's sister site, Prompt Overflow, to become one of the most popular sites on the internet in a matter of months.
				</p>

				<h2>2. Rendering Patterns</h2>
				<p>
					To server render or not to server render? In 2022 the owners of the internet, Vercel, decided that instead of making this choice once for your whole application, now you will need to decide every time you write a new component.
				</p>
				<p>
					Because front-end development was becoming too easy, the same people who write CSS will now need to know how Streaming SSR and Progressive Hydration work.
				</p>
				<figure class="my-10">
					<img src="/images/blog/future-of-web-development/server.jpg" alt="Server" class="rounded-2xl" />
				</figure>
				<p>
					In 2023 we can expect frameworks to adopt increasingly granular rendering patterns culminating in per-line rendering (PLR) later this year. We can also expect job postings for Rendering Reliability Engineers to reach an all time high.
				</p>

				<h2>3. JS Runtimes</h2>
				<p>
					Because choosing a JS runtime was one of the only areas where a developer wasn't paralysed with choice, in early 2020, the creator of Node gave us something new to agonise over. The launch of Deno and Bun heralded the final mutation of JavaScript into a language that can truly run anywhere it wasn't intended to.
				</p>
				<p>
					These new JS runtimes mean we can now serve HTML faster than ever before. For example, we've reduced the Time to First Byte (TTFB) of this blog to -0.4s. That means it actually loaded before you clicked the link.
				</p>
				<figure class="my-10">
					<img src="/images/blog/future-of-web-development/laptop.jpg" alt="Laptop" class="rounded-2xl" />
				</figure>
				<p>
					In 2023 we can expect even faster and more specialised JS runtimes to launch, including the promising Boil, a runtime specifically designed to reduce cold boot times on WiFi enabled kettles. All of these advancements promise to make the future of botnets a truly exciting one.
				</p>
			</div>
		</div>
	</FadeIn>
</Container>

<PageLinks
	class="mt-24 sm:mt-32 lg:mt-40"
	title="More articles"
	intro="Read more about web development trends and insights."
	pages={moreArticles}
/>

<ContactSection />
