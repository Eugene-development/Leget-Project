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
	<title>Наш процесс - LEGET</title>
	<meta
		name="description"
		content="Узнайте, как мы создаем эффективные решения для мебельного бизнеса: от сбора данных до запуска и поддержки."
	/>
</svelte:head>

<!-- Page Introduction -->
<PageIntro eyebrow="Процесс" title="Как мы работаем">
	<p>
		Мы стремимся к максимальной эффективности и прозрачности на каждом этапе разработки. Наш подход позволяет запускать качественные решения в кратчайшие сроки, обеспечивая стабильный рост вашего бизнеса.
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
						Предоставление данных
					</h2>
					<div class="mt-6">
						<div class="space-y-6 text-base text-neutral-600">
							<p>
								Мы начинаем с глубокого погружения в специфику вашего бизнеса. Нам важно понять ваши текущие <strong class="font-semibold text-neutral-950">задачи</strong>, структуру ассортимента и целевую аудиторию, чтобы предложить наиболее эффективное решение.
							</p>
							<p>
								На этапе сбора данных мы анализируем ваши текущие маркетинговые инструменты, логотип, фирменный стиль и технические требования. Это позволяет нам создать <strong class="font-semibold text-neutral-950">проект</strong>, который будет органично вписан в вашу бизнес-экосистему.
							</p>
							<p>
								Результатом этого этапа является четкое понимание структуры будущего проекта, согласованный <strong class="font-semibold text-neutral-950">план</strong> запуска и определенный бюджет.
							</p>
						</div>

						<h3 class="font-display mt-12 text-base font-semibold text-neutral-950">
							Необходимые нам данные
						</h3>
						<TagList class="mt-4">
							<TagListItem>Домен</TagListItem>
							<TagListItem>Логотип</TagListItem>
							<TagListItem>Контакты</TagListItem>
							<TagListItem>Ассортимент</TagListItem>
							<TagListItem>Акции</TagListItem>
							<TagListItem>Региональность</TagListItem>
							<TagListItem>Счётчики Яндекса и Гугла</TagListItem>
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
						Интеграция
					</h2>
					<div class="mt-6">
						<div class="space-y-6 text-base text-neutral-600">
							<p>
								На основе полученных данных мы приступаем к развертыванию решения. Мы используем проверенные технологические стеки, которые обеспечивают высокую скорость работы и надежность сайта.
							</p>
							<p>
								В процессе интеграции мы настраиваем все необходимые компоненты: от системы управления контентом до интеграции с внешними сервисами. Мы следим за тем, чтобы интерфейс был интуитивно понятным как для ваших клиентов, так и для ваших сотрудников.
							</p>
							<p>
								Каждый этап сопровождается тщательным внутренним тестированием, что позволяет нам гарантировать отсутствие ошибок при запуске проекта.
							</p>
						</div>

						<Blockquote author={{ name: 'Евгений Че', role: 'Основатель LEGET' }} class="mt-12">
							<p>
								Наша цель — не просто создать сайт, а предоставить бизнесу готовый инструмент, который начнет приносить результат с первого дня работы.
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
						class="font-display mt-2 text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl"
					>
						Согласование
					</h2>
					<div class="mt-6">
						<div class="space-y-6 text-base text-neutral-600">
							<p>
								Перед финальным запуском мы проводим полную проверку всех функций и страниц сайта. Мы убеждаемся, что верстка корректно отображается на всех устройствах, а формы обратной связи и аналитика работают без сбоев.
							</p>
							<p>
								На этом этапе вы получаете доступ к предварительной версии <strong class="font-semibold text-neutral-950">проекта</strong> для ознакомления и финальных правок. Мы обучаем вашу команду работе с административной панелью, чтобы вы могли самостоятельно управлять контентом.
							</p>
							<p>
								После завершения всех проверок и получения вашего одобрения мы осуществляем перенос сайта на основной домен и открываем доступ для пользователей. Теперь ваш проект <strong class="font-semibold text-neutral-950">полностью готов</strong> к работе.
							</p>
						</div>

						<h3 class="font-display mt-12 text-base font-semibold text-neutral-950">
							Действия на этой фазе
						</h3>
						<List class="mt-8">
							<ListItem title="Тестирование">
								Проводим комплексное тестирование производительности, безопасности и удобства использования интерфейса.
							</ListItem>
							<ListItem title="Утверждение">
								Финальная проверка контента, корректности работы интеграций и всех аналитических систем.
							</ListItem>
							<ListItem title="Переключение на ваш домен">
								Бесшовный перенос сайта на ваш домен, привязка почтовых сервисов и настройка SSL-сертификата.
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

	<SectionIntro eyebrow="Результат" title="Сбалансированное вэб-приложение">
		<p>
			Мы объединяем проверенные временем архитектурные решения с современными технологиями. Это позволяет нам создавать продукты, которые легко масштабировать и поддерживать в будущем.
		</p>
	</SectionIntro>

	<Container class="mt-24">
		<GridList>
			<GridListItem title="Скорость">
				Оптимизация кода и использование современных методов доставки данных гарантируют мгновенную загрузку страниц вашего сайта.
			</GridListItem>
			<GridListItem title="Эффективность">
				Мы фокусируемся на функциях, которые действительно важны для конверсии и обеспечивают удобство покупки для ваших клиентов.
			</GridListItem>
			<GridListItem title="Безопасность">
				Защита данных и стабильность работы системы — наш безусловный приоритет на всех этапах жизненного цикла продукта.
			</GridListItem>
			<GridListItem title="Конкурентность">
				Наши решения помогают вам выделиться среди конкурентов за счет качественного дизайна и высокой производительности.
			</GridListItem>
			<GridListItem title="Юзабельность">
				Продуманный пользовательский опыт (UX) делает взаимодействие с вашим брендом через сайт максимально легким и приятным.
			</GridListItem>
			<GridListItem title="Выгода">
				Аренда готовых технологичных решений позволяет существенно сократить затраты на разработку и ускорить возврат инвестиций.
			</GridListItem>
		</GridList>
	</Container>
</div>

<!-- Contact Section -->
<ContactSection />
