<script>
	import Border from '$lib/components/Border.svelte';
	import ContactSection from '$lib/components/ContactSection.svelte';
	import Container from '$lib/components/Container.svelte';
	import FadeIn from '$lib/components/FadeIn.svelte';
	import PageLinks from '$lib/components/PageLinks.svelte';
	import { formatDate } from '$lib/formatDate.js';

	/**
	 * Blog Article: A Short Guide to Component Naming
	 * Requirements: 13.6
	 */

	const article = {
		date: '2022-12-01',
		title: 'A Short Guide to Component Naming',
		description:
			"As a developer, the most important aspect of your job is naming components. It's not just about being descriptive and clear, but also about having fun and being creative.",
		author: {
			name: 'Angela Fisher',
			role: 'Front-end Developer',
			image: '/images/team/angela-fisher.jpg'
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
			href: '/blog/3-lessons-we-learned-going-back-to-the-office',
			date: '2023-02-18',
			title: '3 Lessons We Learned Going Back to the Office',
			description:
				'Earlier this year we made the bold decision to make everyone come back to the office full-time after two years working from a dressing table in the corner of their bedroom.'
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
				<h2>1. Brevity is Key</h2>
				<p>
					Time is scarce, don't waste it typing out long, descriptive component names. One approach is to give them short, cryptic names that only you will understand.
				</p>
				<p>
					Need a button? Call it "btn". A modal? How about "md"? You'll save precious minutes per day and you'll get the added benefit of being the only person in the codebase who knows where anything is. This is called job security.
				</p>
				<figure class="my-10">
					<img src="/images/blog/a-short-guide-to-component-naming/typewriter.jpg" alt="Typewriter" class="rounded-2xl" />
				</figure>

				<h2>2. Rank High in Search</h2>
				<p>
					When working in large repos with lots of collaborators, it's important that your component ranks high when people search for anything.
				</p>
				<p>
					One way to stand out is to include all the possible search terms in your component name. Instead of "SignInButton" you might want call it "SignInButtonAuthenticationCookieUserLogIn" which will ensure that it is returned in almost any related search result.
				</p>
				<figure class="my-10">
					<img src="/images/blog/a-short-guide-to-component-naming/magnifying-glass.jpg" alt="Magnifying glass" class="rounded-2xl" />
				</figure>

				<h2>3. Mix Languages</h2>
				<p>
					If you work remotely, it's likely you are on a global team and yet all your components have English names. This slows down your non-english colleagues considerably so you should allow them to use their native tongue when naming components.
				</p>
				<p>
					You can create an index file that maps all the different languages within your repo. Need a dropdown? Look for "Desplegable". A form? Search "Форма". You'll learn multiple new languages while being more inclusive to your colleagues.
				</p>
				<figure class="my-10">
					<img src="/images/blog/a-short-guide-to-component-naming/everyday-english.jpg" alt="Everyday English" class="rounded-2xl" />
				</figure>
			</div>
		</div>
	</FadeIn>
</Container>

<PageLinks
	class="mt-24 sm:mt-32 lg:mt-40"
	title="More articles"
	intro="Read more about development best practices."
	pages={moreArticles}
/>

<ContactSection />
