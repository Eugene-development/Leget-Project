<script>
	import Border from '$lib/components/Border.svelte';
	import Button from '$lib/components/Button.svelte';
	import ContactSection from '$lib/components/ContactSection.svelte';
	import Container from '$lib/components/Container.svelte';
	import FadeIn from '$lib/components/FadeIn.svelte';
	import PageIntro from '$lib/components/PageIntro.svelte';
	import { formatDate } from '$lib/formatDate.js';

	/**
	 * Blog page - displays list of blog articles
	 *
	 * Requirements: 10.1, 10.2, 10.3, 13.6
	 * - PageIntro with blog heading
	 * - List of articles with titles, dates, and descriptions
	 * - Author information with images
	 * - ContactSection at the bottom
	 */

	// Blog articles data (migrated from MDX files)
	const articles = [
		{
			href: '/blog/future-of-web-development',
			date: '2023-04-06',
			title: 'The Future of Web Development: Our Predictions for 2023',
			description:
				"Let's explore the latest trends in web development, and regurgitate some predictions we read on X for how they will shape the industry in the coming year.",
			author: {
				name: 'Chelsea Hagon',
				role: 'Senior Developer',
				image: '/images/team/chelsea-hagon.jpg'
			}
		},
		{
			href: '/blog/3-lessons-we-learned-going-back-to-the-office',
			date: '2023-02-18',
			title: '3 Lessons We Learned Going Back to the Office',
			description:
				'Earlier this year we made the bold decision to make everyone come back to the office full-time after two years working from a dressing table in the corner of their bedroom.',
			author: {
				name: 'Leslie Alexander',
				role: 'Co-Founder / CEO',
				image: '/images/team/leslie-alexander.jpg'
			}
		},
		{
			href: '/blog/a-short-guide-to-component-naming',
			date: '2022-12-01',
			title: 'A Short Guide to Component Naming',
			description:
				"As a developer, the most important aspect of your job is naming components. It's not just about being descriptive and clear, but also about having fun and being creative.",
			author: {
				name: 'Angela Fisher',
				role: 'Front-end Developer',
				image: '/images/team/angela-fisher.jpg'
			}
		}
	];
</script>

<svelte:head>
	<title>Blog - Studio</title>
	<meta
		name="description"
		content="Stay up-to-date with the latest industry news as our marketing teams finds new ways to re-purpose old CSS tricks articles."
	/>
</svelte:head>

<!-- Page Introduction -->
<PageIntro eyebrow="Blog" title="The latest articles and news">
	<p>
		Stay up-to-date with the latest industry news as our marketing teams finds new ways to
		re-purpose old CSS tricks articles.
	</p>
</PageIntro>

<!-- Articles List -->
<Container class="mt-24 sm:mt-32 lg:mt-40">
	<div class="space-y-24 lg:space-y-32">
		{#each articles as article (article.href)}
			<FadeIn>
				<article>
					<Border class="pt-16">
						<div class="relative lg:-mx-4 lg:flex lg:justify-end">
							<div class="pt-10 lg:w-2/3 lg:flex-none lg:px-4 lg:pt-0">
								<h2 class="font-display text-2xl font-semibold text-neutral-950">
									<a href={article.href}>{article.title}</a>
								</h2>
								<dl class="lg:absolute lg:top-0 lg:left-0 lg:w-1/3 lg:px-4">
									<dt class="sr-only">Published</dt>
									<dd class="absolute top-0 left-0 text-sm text-neutral-950 lg:static">
										<time datetime={article.date}>
											{formatDate(article.date)}
										</time>
									</dd>
									<dt class="sr-only">Author</dt>
									<dd class="mt-6 flex gap-x-4">
										<div class="flex-none overflow-hidden rounded-xl bg-neutral-100">
											<img
												alt=""
												src={article.author.image}
												class="h-12 w-12 object-cover grayscale"
												loading="lazy"
											/>
										</div>
										<div class="text-sm text-neutral-950">
											<div class="font-semibold">
												{article.author.name}
											</div>
											<div>{article.author.role}</div>
										</div>
									</dd>
								</dl>
								<p class="mt-6 max-w-2xl text-base text-neutral-600">
									{article.description}
								</p>
								<Button
									href={article.href}
									aria-label="Read more: {article.title}"
									class="mt-8"
								>
									Read more
								</Button>
							</div>
						</div>
					</Border>
				</article>
			</FadeIn>
		{/each}
	</div>
</Container>

<!-- Contact Section -->
<ContactSection />
