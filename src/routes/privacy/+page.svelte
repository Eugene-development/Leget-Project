<script>
	import { onMount } from 'svelte';
	import Container from '$lib/components/Container.svelte';
	import PageIntro from '$lib/components/PageIntro.svelte';
	import ContactSection from '$lib/components/ContactSection.svelte';

	let activeSection = $state('general');

	const sections = [
		{ id: 'general', title: '1. Общие положения' },
		{ id: 'collection', title: '2. Сбор персональных данных' },
		{ id: 'purposes', title: '3. Цели обработки' },
		{ id: 'protection', title: '4. Защита и хранение' },
		{ id: 'rights', title: '5. Права пользователей' },
		{ id: 'cookies', title: '6. Файлы cookies' },
		{ id: 'changes', title: '7. Изменение политики' },
		{ id: 'contacts', title: '8. Контакты оператора' }
	];

	const privacySections = [
		{
			id: 'general',
			title: '1. Общие положения',
			content: [
				'1.1. Настоящая Политика конфиденциальности (далее — «Политика») определяет порядок обработки и защиты персональной информации пользователей (далее — «Пользователь»), которую сервис LEGET (далее — «Исполнитель») может получить во время использования Пользователем сайта leget.ru.',
				'1.2. Обеспечение конфиденциальности и безопасности персональных данных при их обработке является одним из приоритетов Исполнителя в соответствии с Федеральным законом РФ от 27.07.2006 № 152-ФЗ «О персональных данных».',
				'1.3. Используя Сервис и регистрируясь в Личном кабинете, Пользователь выражает свое полное согласие с условиями настоящей Политики.'
			]
		},
		{
			id: 'collection',
			title: '2. Сбор персональных данных',
			content: [
				'2.1. Исполнитель собирает только те персональные данные, которые необходимы для предоставления услуг аренды и технического сопровождения готовых сайтов.',
				'2.2. Персональные данные, предоставляемые Пользователем при регистрации: имя, адрес электронной почты (email), контактный телефон.',
				'2.3. Автоматически собираемые технические данные: IP-адрес, данные файлов cookie, тип и версия браузера, время доступа, адрес запрашиваемой страницы.'
			]
		},
		{
			id: 'purposes',
			title: '3. Цели обработки персональных данных',
			content: [
				'3.1. Регистрация и идентификация Пользователя в Личном кабинете сервиса LEGET.',
				'3.2. Предоставление доступа к арендованным готовым сайтам, их настройка, техническая поддержка и интеграция.',
				'3.3. Направление уведомлений, запросов, касающихся использования Сервиса, изменения тарифов, а также обработка запросов от Пользователя.',
				'3.4. Улучшение качества Сервиса, удобства его использования, разработка новых функциональных возможностей.'
			]
		},
		{
			id: 'protection',
			title: '4. Защита и хранение данных',
			content: [
				'4.1. Исполнитель принимает необходимые организационные и технические меры для защиты персональных данных Пользователя от неправомерного или случайного доступа, уничтожения, изменения, блокирования, копирования и распространения.',
				'4.2. Персональные данные Пользователей хранятся на защищенных серверах с использованием современных методов шифрования.',
				'4.3. Персональные данные обрабатываются до момента достижения целей их обработки или до удаления учетной записи Пользователем.'
			]
		},
		{
			id: 'rights',
			title: '5. Права пользователей',
			content: [
				'5.1. Пользователь имеет право запрашивать информацию, касающуюся обработки его персональных данных, требовать их уточнения, блокирования или уничтожения в случае, если данные являются неполными, устаревшими или неточными.',
				'5.2. Отзыв согласия на обработку персональных данных может быть осуществлен путем направления соответствующего запроса в службу поддержки Исполнителя.',
				'5.3. При отзыве согласия на обработку персональных данных Исполнитель оставляет за собой право полностью или частично приостановить оказание услуг из-за невозможности выполнения обязательств.'
			]
		},
		{
			id: 'cookies',
			title: '6. Файлы cookies',
			content: [
				'6.1. Файлы cookie используются для персонализации пользовательского опыта, анализа трафика сайта и работы Личного кабинета.',
				'6.2. Пользователь может отключить поддержку файлов cookie в настройках своего браузера, однако это может привести к некорректной работе некоторых разделов Сервиса.',
				'6.3. Мы используем сессионные и постоянные файлы cookie для сохранения авторизации Пользователя и его региональных настроек.'
			]
		},
		{
			id: 'changes',
			title: '7. Изменение политики',
			content: [
				'7.1. Исполнитель имеет право вносить изменения в настоящую Политику конфиденциальности в одностороннем порядке.',
				'7.2. Новая редакция Политики вступает в силу с момента ее публикации на сайте leget.ru/privacy.',
				'7.3. Продолжение использования Сервиса после публикации изменений означает согласие Пользователя с обновленной редакцией Политики.'
			]
		},
		{
			id: 'contacts',
			title: '8. Контакты оператора',
			content: [
				'Исполнитель: Студия готовых сайтов LEGET',
				'Email службы поддержки: info@leget.ru',
				'Контактный телефон: +7 (915) 400-00-20'
			]
		}
	];

	function scrollToSection(id) {
		activeSection = id;
		const element = document.getElementById(id);
		if (element) {
			const yOffset = -100; // Offset for sticky header
			const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
			window.scrollTo({ top: y, behavior: 'smooth' });
		}
	}

	onMount(() => {
		const observerOptions = {
			root: null,
			rootMargin: '-10% 0px -80% 0px',
			threshold: 0
		};

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					activeSection = entry.target.id;
				}
			});
		}, observerOptions);

		sections.forEach((sec) => {
			const el = document.getElementById(sec.id);
			if (el) observer.observe(el);
		});

		return () => {
			observer.disconnect();
		};
	});
</script>

<svelte:head>
	<title>Политика конфиденциальности — Студия LEGET</title>
	<meta
		name="description"
		content="Политика конфиденциальности и правила обработки персональных данных клиентов сервиса аренды готовых сайтов LEGET."
	/>
</svelte:head>

<PageIntro eyebrow="Правовая информация" title="Политика конфиденциальности">
	<p>
		Мы заботимся о безопасности ваших данных. Ознакомьтесь с правилами сбора, хранения и защиты
		персональной информации в рамках платформы LEGET.
	</p>
</PageIntro>

<Container class="mt-16 sm:mt-24 lg:mt-32">
	<div class="grid grid-cols-1 gap-12 lg:grid-cols-4">
		<!-- Sidebar Navigation (Sticky on desktop) -->
		<div class="hidden lg:col-span-1 lg:block">
			<div class="sticky top-10 max-h-[calc(100vh-80px)] space-y-1.5 overflow-y-auto pr-4">
				<div class="mb-4 px-3 text-xs font-semibold tracking-wider text-neutral-400 uppercase">
					Разделы документа
				</div>
				{#each sections as section}
					<button
						type="button"
						onclick={() => scrollToSection(section.id)}
						class="w-full rounded-xl px-3 py-2 text-left text-sm font-medium transition duration-200 focus:outline-hidden
						{activeSection === section.id
							? 'bg-neutral-950 font-semibold text-white shadow-xs'
							: 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950'}"
					>
						{section.title}
					</button>
				{/each}
			</div>
		</div>

		<!-- Document Content -->
		<div class="col-span-1 lg:col-span-3">
			<!-- Legal texts -->
			<div class="space-y-12">
				{#each privacySections as section}
					<section
						id={section.id}
						class="group scroll-mt-32 rounded-3xl border border-neutral-950/5 bg-neutral-50/50 p-6 transition-all duration-300 hover:border-neutral-950/10 hover:bg-neutral-50 md:p-8"
					>
						<h2
							class="font-display mb-6 text-xl font-semibold text-neutral-950 transition duration-300 group-hover:text-amber-700"
						>
							{section.title}
						</h2>
						<div class="space-y-4 text-base/7 text-neutral-700">
							{#each section.content as paragraph}
								<p>
									{paragraph}
								</p>
							{/each}
						</div>
					</section>
				{/each}
			</div>
		</div>
	</div>
</Container>

<ContactSection class="mt-24 sm:mt-32 lg:mt-40" />
