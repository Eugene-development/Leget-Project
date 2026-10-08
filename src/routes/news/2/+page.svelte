<script>
	import Border from '$lib/components/Border.svelte';
	import ContactSection from '$lib/components/ContactSection.svelte';
	import Container from '$lib/components/Container.svelte';
	import FadeIn from '$lib/components/FadeIn.svelte';
	import PageLinks from '$lib/components/PageLinks.svelte';
	import { formatDate } from '$lib/formatDate.js';

	import { articles } from '$lib/content/articles.js';
	const article = articles.find((item) => item.id === 2);
	const moreArticles = articles.filter((item) => item.id !== 2).slice(0, 2);
</script>

<svelte:head>
	<title>{article.title} — Материалы LEGET</title>
	<meta name="description" content={article.description} />
</svelte:head>

<Container as="article" class="mt-24 sm:mt-32 lg:mt-40">
	<FadeIn>
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
				<h2>Зарегистрируйтесь и создайте сайт</h2>
				<p>
					Создайте аккаунт и подтвердите почту по ссылке из письма. После входа выберите доступный
					шаблон в каталоге и создайте сайт. Он появится в разделе «Мои сайты».
				</p>
				<p>
					Тестовый период длится 72 часа с момента создания сайта. Он даёт время познакомиться с
					шаблоном и подготовить материалы. Это не обещание настроить домен и наполнить сайт за три
					дня.
				</p>
				<h2>Подготовьте материалы и подключите домен</h2>
				<p>
					Укажите домен в личном кабинете и направьте его на платформу у своего регистратора. Если
					нужна помощь с подключением, обратитесь в LEGET.
				</p>
				<p>
					Добавьте название, логотип и город в настройках. На самом сайте замените стартовые
					описания, фотографии и контакты. Проверьте каталог, ссылки и получение обращений.
				</p>
				<h2>Решите, продолжать ли подписку</h2>
				<p>
					Для дальнейшей работы пополните баланс через ЮKassa или по безналичному счёту. Первое
					списание запланировано на 06:30 по Москве после завершения полных 72 часов тестового
					периода.
				</p>
				<p>
					Если сайт вам не подходит, отмените лицензию в его настройках до начала списаний. Отмена
					отключит сайт и остановит будущие начисления; отсутствие пополнений само по себе подписку
					не отменяет.
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
