<script>
	import ContactSection from '$lib/components/ContactSection.svelte';
	import Container from '$lib/components/Container.svelte';
	import FadeIn from '$lib/components/FadeIn.svelte';
	import PageLinks from '$lib/components/PageLinks.svelte';
	import { formatDate } from '$lib/formatDate.js';

	import { articles } from '$lib/content/articles.js';
	const article = articles.find((item) => item.id === 4);
	const moreArticles = articles.filter((item) => item.id !== 4).slice(0, 2);
</script>

<svelte:head>
	<title>{article.title} — Материалы LEGET</title>
	<meta name="description" content={article.description} />
</svelte:head>

<Container as="article" class="mt-24 sm:mt-32 lg:mt-40">
	<FadeIn>
		<!-- Хлебные крошки: Главная / Новости -->
		<div class="mx-auto mb-8 flex max-w-5xl justify-center">
			<nav aria-label="Хлебные крошки">
				<ol
					class="font-display flex flex-wrap items-center gap-x-2 text-sm font-semibold text-neutral-500"
				>
					<li class="flex items-center gap-x-2">
						<a href="/" class="transition hover:text-neutral-950">Главная</a>
						<svg
							aria-hidden="true"
							class="size-3 shrink-0 text-neutral-300"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</li>
					<li class="flex items-center gap-x-2">
						<a href="/news" class="transition hover:text-neutral-950">Материалы</a>
					</li>
				</ol>
			</nav>
		</div>
		<header class="mx-auto flex max-w-5xl flex-col text-center">
			<h1
				class="font-display mt-6 text-5xl font-medium tracking-tight [text-wrap:balance] text-neutral-950 sm:text-6xl"
			>
				{article.title}
			</h1>
			<time datetime={article.date} class="order-first text-sm text-neutral-950">
				Обновлено {formatDate(article.date)}
			</time>
			<p class="mt-6 text-sm font-semibold text-neutral-950">
				{article.author.name}
			</p>
		</header>
	</FadeIn>

	<FadeIn>
		<div
			class="mt-24 sm:mt-32 lg:mt-40 [&>*]:mx-auto [&>*]:max-w-3xl [&>:first-child]:!mt-0 [&>:last-child]:!mb-0"
		>
			<div class="typography">
				<h2>Тексты и изображения — на сайте</h2>
				<p>
					Откройте свой сайт и войдите в режим редактирования с аккаунтом владельца. Изменяйте
					доступные поля блоков и сохраняйте результат. Начните с контактов, предложения компании и
					фотографий.
				</p>
				<p>
					В Promo-1 можно переключать доступные версии блоков и тему секций там, где предусмотрены
					соответствующие элементы управления. Набор возможностей зависит от блока и шаблона.
				</p>
				<h2>Общие настройки — в личном кабинете</h2>
				<p>
					Откройте «Мои сайты» и настройки нужного сайта. Здесь находятся название, логотип, город и
					идентификаторы счётчиков аналитики. В каталоге можно включать и отключать рубрики и
					категории.
				</p>
				<p>
					Настройки относятся к выбранному сайту. Перед сохранением убедитесь, что открыли нужный
					домен, особенно если управляете несколькими сайтами.
				</p>
				<h2>После изменения — проверка</h2>
				<p>
					Посмотрите страницу как посетитель: прочитайте текст, проверьте изображения, ссылки и
					контакты. Убедитесь, что материалы удобно читать на телефоне.
				</p>
				<p>
					Обновления платформы развивают доступные блоки. Актуальность цен, описаний услуг и других
					материалов вашей компании остаётся под вашим контролем.
				</p>
			</div>
		</div>
	</FadeIn>
</Container>

<PageLinks
	class="mt-24 sm:mt-32 lg:mt-40"
	title="Другие материалы"
	intro="Инструкции по настройке сайта и работе с подпиской."
	pages={moreArticles}
/>

<ContactSection />
