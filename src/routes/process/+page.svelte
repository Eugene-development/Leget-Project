<script>
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
	<title>Как начать работу с сайтом — LEGET</title>
	<meta
		name="description"
		content="Создайте сайт на шаблоне LEGET, проверьте его за 72 часа тестового периода, настройте домен и контент и пополните баланс для дальнейшей работы."
	/>
</svelte:head>

<!-- Page Introduction -->
<PageIntro eyebrow="Начало работы" title="Как начать работу с сайтом">
	<p>
		Зарегистрируйтесь, подтвердите почту и выберите доступный шаблон. Настройте сайт самостоятельно
		или обратитесь в LEGET за помощью. Тестовый период начинается в момент создания сайта.
	</p>
</PageIntro>

<!-- Process Sections -->
<div class="mt-24 space-y-24 [counter-reset:section] sm:mt-32 sm:space-y-32 lg:mt-40 lg:space-y-40">
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
						class="font-display mt-2 text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl"
					>
						Создайте сайт
					</h2>
					<div class="mt-6">
						<div class="space-y-6 text-base text-neutral-600">
							<p>
								После подтверждения почты войдите в личный кабинет, откройте Promo-1 в каталоге и
								создайте сайт с этим шаблоном. Он появится в разделе «Мои сайты» со стартовым
								набором страниц.
							</p>
							<p>
								С момента создания сайта у вас есть 72 часа без списаний. Подготовьте материалы
								компании: они понадобятся для замены стартового контента и настройки сайта.
							</p>
						</div>

						<h3 class="font-display mt-12 text-base font-semibold text-neutral-950">
							Что подготовить
						</h3>
						<TagList class="mt-4">
							<TagListItem>Домен</TagListItem>
							<TagListItem>Логотип</TagListItem>
							<TagListItem>Город работы</TagListItem>
							<TagListItem>Контакты для связи</TagListItem>
							<TagListItem>Тексты и фотографии</TagListItem>
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
						class="font-display mt-2 text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl"
					>
						Настройте сайт
					</h2>
					<div class="mt-6">
						<div class="space-y-6 text-base text-neutral-600">
							<p>
								В разделе «Мои сайты» укажите домен. В настройках сайта добавьте название, логотип и
								город, выберите нужные разделы каталога и укажите идентификаторы счётчиков
								аналитики, если они есть.
							</p>
							<p>
								Для открытия сайта по своему адресу домен должен быть направлен на платформу. Если
								нужна помощь с подключением, напишите в LEGET. Сохранение доменного имени в кабинете
								само по себе не меняет настройки у регистратора.
							</p>
							<p>
								После входа на сайт замените стартовые тексты, изображения и контакты на свои. В
								Promo-1 выберите подходящие версии доступных блоков и проверьте страницы на телефоне
								и компьютере.
							</p>
						</div>
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
						class="font-display mt-2 text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl"
					>
						Проверьте сайт и оплату
					</h2>
					<div class="mt-6">
						<div class="space-y-6 text-base text-neutral-600">
							<p>
								Проверьте контакты, ссылки, каталог и получателей заявок. Удалите или замените
								примеры, которые не относятся к вашей компании, и убедитесь, что посетитель понимает
								ваше предложение.
							</p>
							<p>
								Чтобы продолжить работу после тестового периода, пополните баланс в личном кабинете
								через ЮKassa или по безналичному счёту. История пополнений и списаний доступна в
								разделе «Баланс и платежи».
							</p>
							<p>
								Если решили отказаться от сайта, отмените лицензию в его настройках. Это отключит
								сайт и остановит будущие ежедневные списания; одного прекращения пополнений для
								отмены недостаточно.
							</p>
						</div>

						<h3 class="font-display mt-12 text-base font-semibold text-neutral-950">
							Перед началом работы
						</h3>
						<List class="mt-8">
							<ListItem title="Содержание">
								Проверьте описания, изображения, условия услуг и контакты вашей компании.
							</ListItem>
							<ListItem title="Обращения и аналитика">
								Проверьте получение заявок. Для аналитики подключите свой счётчик и настройте цели
								по карте кнопок шаблона.
							</ListItem>
							<ListItem title="Баланс">
								Следите за балансом: после тестового периода каждый активный сайт оплачивается
								отдельно, по 150 ₽ в сутки.
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
			class="absolute inset-0 h-full w-full mask-[linear-gradient(to_bottom_left,white_40%,transparent_50%)] fill-neutral-100 stroke-neutral-950/5"
			yOffset={-270}
		/>
	</div>

	<SectionIntro eyebrow="Результат" title="Что остаётся у вас под управлением">
		<p>
			После настройки продолжайте работать в том же аккаунте: обновляйте материалы на сайте, меняйте
			настройки в кабинете и контролируйте оплату.
		</p>
	</SectionIntro>

	<Container class="mt-24">
		<GridList>
			<GridListItem title="Контент"
				>Меняйте тексты и изображения в доступных для редактирования блоках прямо на сайте.</GridListItem
			>
			<GridListItem title="Каталог"
				>Включайте нужные рубрики и категории в настройках своего сайта.</GridListItem
			>
			<GridListItem title="Версии блоков"
				>В Promo-1 выбирайте доступные композиции блоков без самостоятельной вёрстки.</GridListItem
			>
			<GridListItem title="Настройки"
				>Обновляйте название, логотип, город и идентификаторы счётчиков в личном кабинете.</GridListItem
			>
			<GridListItem title="Оплата"
				>Пополняйте баланс и смотрите историю операций по вашим сайтам.</GridListItem
			>
			<GridListItem title="Поддержка"
				>Обращайтесь в LEGET, если нужна помощь с подключением или работой сайта.</GridListItem
			>
		</GridList>
	</Container>
</div>

<!-- Contact Section -->
<ContactSection />
