<script>
	/**
	 * Видимый виджет Yandex SmartCaptcha.
	 *
	 * Рендерится прямо в форме. Юзер решает чекбокс → Яндекса отдаёт одноразовый
	 * токен в `onverify`. Токен летит на бэкенд как `captcha_token` (см. формы).
	 * Сбросить виджет (для повторной попытки) — вызвать `reset()` через bind:this.
	 *
	 * Без SITE_KEY компонент не рендерит ничего (fail-open).
	 */
	import { onMount } from 'svelte';
	import { SITE_KEY, loadCaptchaScript } from '$lib/antibot/smartcaptcha.js';

	let { onverify = () => {}, onerror = () => {} } = $props();

	let container = $state(null);
	let widgetId = null;

	onMount(() => {
		if (!SITE_KEY) return;

		loadCaptchaScript().then(() => {
			if (container && window.smartCaptcha) {
				widgetId = window.smartCaptcha.render(container, {
					sitekey: SITE_KEY,
					callback: (token) => onverify(token),
					'error-callback': (err) => onerror(err)
				});
			}
		});
	});

	/** Сбрасывает виджет — токен аннулируется, юзер может пройти проверку заново. */
	export function reset() {
		if (widgetId !== null && typeof window !== 'undefined' && window.smartCaptcha) {
			window.smartCaptcha.reset(widgetId);
		}
	}
</script>

{#if SITE_KEY}
	<!-- Контейнер виджета; резервируем min-height, чтобы избежать скачка вёрстки. -->
	<div bind:this={container} class="smartcaptcha"></div>
{/if}

<style>
	.smartcaptcha {
		min-height: 76px;
	}
</style>
