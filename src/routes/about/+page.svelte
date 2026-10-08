<script>
	import ContactSection from '$lib/components/ContactSection.svelte';
	import Container from '$lib/components/Container.svelte';
	import GridList from '$lib/components/GridList.svelte';
	import GridListItem from '$lib/components/GridListItem.svelte';
	import PageIntro from '$lib/components/PageIntro.svelte';
	import PageLinks from '$lib/components/PageLinks.svelte';
	import SectionIntro from '$lib/components/SectionIntro.svelte';
	import StatList from '$lib/components/StatList.svelte';
	import StatListItem from '$lib/components/StatListItem.svelte';

	import { articles } from '$lib/content/articles.js';
	const newsArticles = articles.slice(0, 2);
</script>

<svelte:head>
	<title>О платформе LEGET — сайты по подписке</title>
	<meta
		name="description"
		content="Как устроен LEGET: отраслевые шаблоны, редактирование контента на сайте и посуточная оплата с баланса."
	/>
</svelte:head>

<!-- PageIntro with company description -->
<PageIntro eyebrow="О нас" title="Готовая основа для сайта вашей компании">
	<p>
		LEGET — платформа сайтов по подписке для мебельного бизнеса и сферы обустройства дома. Вы
		выбираете отраслевой шаблон и наполняете его материалами своей компании.
	</p>
	<div class="mt-10 max-w-2xl space-y-6 text-base">
		<p>
			Шаблон задаёт страницы, разделы и стартовые тексты. После создания сайта вы заменяете
			контакты, описания и изображения. В Promo-1 можно выбирать доступные версии блоков прямо на
			странице.
		</p>
		<p>
			Сайт можно настроить самостоятельно или с помощью команды LEGET. В личном кабинете находятся
			настройки, сайты и баланс; тексты и изображения вы редактируете на самом сайте после входа.
		</p>
	</div>
</PageIntro>

<!-- StatList with company statistics -->
<Container class="mt-16">
	<StatList>
		<StatListItem value="150 ₽" label="В сутки за сайт" />
		<StatListItem value="72 часа" label="Тестовый период после создания сайта" />
		<StatListItem value="1 аккаунт" label="Для управления сайтами и балансом" />
	</StatList>
</Container>

<!-- Culture section with dark background -->
<div class="mt-24 rounded-4xl bg-neutral-950 py-24 sm:mt-32 lg:mt-40 lg:py-32">
	<SectionIntro eyebrow="Принципы работы" title="Понятные задачи на каждом этапе" invert>
		<p>
			LEGET отвечает за платформу, а владелец сайта — за актуальность предложения, материалов и
			контактов своей компании.
		</p>
	</SectionIntro>
	<Container class="mt-16">
		<GridList>
			<GridListItem title="Отраслевая структура" invert>
				Каталог, проекты, услуги и формы обращений помогают представить работу мебельной компании.
				Состав страниц зависит от шаблона.
			</GridListItem>
			<GridListItem title="Управление контентом" invert>
				Обновляйте доступные для редактирования тексты и изображения на сайте. Настройки домена,
				логотипа и каталога находятся в личном кабинете.
			</GridListItem>
			<GridListItem title="Посуточная оплата" invert>
				После тестового периода стоимость активного сайта списывается с баланса ежедневно.
				Пополнения и списания видны в истории операций.
			</GridListItem>
		</GridList>
	</Container>
</div>

<!-- Team section with photos -->

<!-- PageLinks for blog articles -->
<PageLinks
	class="mt-24 sm:mt-32 lg:mt-40"
	title="Материалы о платформе"
	intro="Порядок настройки сайта, выбор шаблона и работа с посуточной подпиской."
	pages={newsArticles}
/>

<!-- ContactSection -->
<ContactSection />
