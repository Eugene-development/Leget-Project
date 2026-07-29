/**
 * Открытие печатной формы счёта на оплату.
 *
 * Счёт отдаётся защищённым эндпоинтом /invoices/{id}/download, поэтому его
 * нельзя открыть простой ссылкой — нужен заголовок Authorization. Из-за этого
 * окно приходится открывать вручную, и здесь важен порядок: `window.open`
 * вызывается синхронно, до первого `await`. Если открыть окно после запроса,
 * браузер уже не считает это следствием клика и блокирует popup.
 */
import { getApiUrl } from './config.js';

const LOADING_DOCUMENT = `<!DOCTYPE html>
<html lang="ru"><head><meta charset="utf-8"><title>Счёт на оплату</title></head>
<body style="font-family:system-ui,-apple-system,sans-serif;padding:48px;color:#666">Загрузка счёта…</body></html>`;

/**
 * Загружает HTML-счёт и показывает его в новой вкладке.
 *
 * @param {string|number} invoiceId
 * @returns {Promise<void>} Отклоняется с понятным пользователю сообщением.
 */
export async function openInvoice(invoiceId) {
	// Синхронно, в рамках пользовательского жеста — иначе popup будет заблокирован
	const win = window.open('', '_blank');
	if (!win) {
		throw new Error('Разрешите всплывающие окна, чтобы открыть счёт.');
	}
	writeDocument(win, LOADING_DOCUMENT);

	try {
		const base = getApiUrl().replace(/\/api\/?$/, '');
		const token = localStorage.getItem('auth_token');

		const response = await fetch(`${base}/invoices/${invoiceId}/download`, {
			headers: {
				// Без этого заголовка Laravel отвечает на истёкший токен редиректом, а не 401
				Accept: 'application/json',
				...(token ? { Authorization: `Bearer ${token}` } : {})
			}
		});

		if (response.status === 401) {
			throw new Error('Сессия истекла. Войдите заново, чтобы открыть счёт.');
		}
		if (response.status === 404) {
			throw new Error('Счёт не найден.');
		}
		if (!response.ok) {
			throw new Error('Не удалось получить счёт. Попробуйте позже.');
		}

		writeDocument(win, await response.text());
	} catch (err) {
		win.close();
		throw err;
	}
}

/**
 * @param {Window} win
 * @param {string} html
 */
function writeDocument(win, html) {
	win.document.open();
	win.document.write(html);
	win.document.close();
}
