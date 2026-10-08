<script>
	import Border from '$lib/components/Border.svelte';
	import Button from '$lib/components/Button.svelte';
	import ContactSection from '$lib/components/ContactSection.svelte';
	import Container from '$lib/components/Container.svelte';
	import FadeIn from '$lib/components/FadeIn.svelte';
	import PageIntro from '$lib/components/PageIntro.svelte';
	import { formatDate } from '$lib/formatDate.js';

	import { articles } from '$lib/content/articles.js';
</script>

<svelte:head>
	<title>Материалы о платформе — LEGET</title>
	<meta
		name="description"
		content="Как создать сайт на LEGET, выбрать шаблон, отредактировать контент и управлять посуточной подпиской."
	/>
</svelte:head>

<!-- Page Introduction -->
<PageIntro eyebrow="Информация" title="Как работать с LEGET">
	<p>Практические материалы о шаблонах, настройке сайта и оплате подписки.</p>
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
									<dt class="sr-only">Обновлено</dt>
									<dd class="absolute top-0 left-0 text-sm text-neutral-950 lg:static">
										<time datetime={article.date}>
											Обновлено {formatDate(article.date)}
										</time>
									</dd>
									<dt class="sr-only">Автор</dt>
									<!-- Аватарка автора скрыта -->
									<dd class="mt-6 flex gap-x-4">
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
								<Button href={article.href} aria-label="Читать далее: {article.title}" class="mt-8">
									Читать далее
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
