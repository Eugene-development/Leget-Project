<script>
	import { browser } from '$app/environment';
	import { getGraphQLUrl, getAuthApiUrl } from '$lib/utils/config.js';

	let result = $state(null);
	let error = $state(null);
	let loading = $state(false);
	let configInfo = $state(null);
	let autoLog = $state([]);
	let autoRunning = $state(false);
	let intervalId = $state(null);

	$effect(() => {
		if (browser) {
			configInfo = {
				graphqlUrl: getGraphQLUrl(),
				authUrl: getAuthApiUrl(),
				appConfig: window.__APP_CONFIG__ ?? 'NOT LOADED'
			};
		}
	});

	async function doRequest() {
		const token = typeof localStorage !== 'undefined' ? localStorage.getItem('auth_token') : null;
		const url = getGraphQLUrl();
		const now = new Date().toLocaleTimeString('ru-RU');

		try {
			const res = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					...(token ? { 'Authorization': `Bearer ${token}` } : {})
				},
				body: JSON.stringify({ query: '{ __typename }' })
			});

			const corsHeader = res.headers.get('access-control-allow-origin');
			const credHeader = res.headers.get('access-control-allow-credentials');

			return {
				time: now,
				ok: true,
				httpStatus: res.status,
				corsOrigin: corsHeader ?? 'ОТСУТСТВУЕТ',
				corsCredentials: credHeader ?? '-',
				error: null
			};
		} catch (err) {
			return {
				time: now,
				ok: false,
				httpStatus: '-',
				corsOrigin: '-',
				corsCredentials: '-',
				error: err.message
			};
		}
	}

	async function testRequest() {
		loading = true;
		error = null;
		result = null;
		const r = await doRequest();
		if (r.ok) {
			result = r;
		} else {
			error = r.error;
		}
		loading = false;
	}

	function toggleAuto() {
		if (autoRunning) {
			clearInterval(intervalId);
			intervalId = null;
			autoRunning = false;
		} else {
			autoRunning = true;
			runAutoCheck();
			intervalId = setInterval(runAutoCheck, 30000);
		}
	}

	async function runAutoCheck() {
		const r = await doRequest();
		autoLog = [r, ...autoLog].slice(0, 100);
	}
</script>

<svelte:head>
	<title>CORS Test | LEGET</title>
</svelte:head>

<div class="mx-auto max-w-3xl p-8 font-mono text-sm">
	<h1 class="mb-6 text-2xl font-bold text-neutral-950">CORS Test Page</h1>

	{#if configInfo}
		<div class="mb-6 rounded-xl bg-neutral-100 p-4">
			<p class="font-semibold text-neutral-700">Config:</p>
			<p>GraphQL URL: <span class="text-indigo-600">{configInfo.graphqlUrl}</span></p>
			<p>Auth URL: <span class="text-indigo-600">{configInfo.authUrl}</span></p>
			<p>Token: <span class="text-indigo-600">
				{#if browser}
					{localStorage.getItem('auth_token') ? '✅ present' : '❌ not found'}
				{/if}
			</span></p>
			<p class="mt-2 text-xs text-neutral-500">
				APP_CONFIG: {JSON.stringify(configInfo.appConfig)}
			</p>
		</div>
	{/if}

	<div class="mb-6 flex gap-4">
		<button
			onclick={testRequest}
			disabled={loading}
			class="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
		>
			{loading ? 'Запрос...' : 'Один запрос'}
		</button>

		<button
			onclick={toggleAuto}
			class="rounded-xl px-6 py-3 font-semibold text-white {autoRunning ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}"
		>
			{autoRunning ? '⏹ Остановить мониторинг' : '▶ Мониторинг (каждые 30с)'}
		</button>
	</div>

	{#if error}
		<div class="mb-4 rounded-xl bg-red-50 p-4 text-red-700">
			<p class="font-semibold">❌ Ошибка: {error}</p>
		</div>
	{/if}

	{#if result}
		<div class="mb-4 rounded-xl bg-green-50 p-4">
			<p class="font-semibold text-green-800">✅ HTTP {result.httpStatus} | CORS Origin: {result.corsOrigin}</p>
		</div>
	{/if}

	{#if autoLog.length > 0}
		<h2 class="mb-3 text-lg font-bold">Лог мониторинга ({autoLog.length} запросов)</h2>
		<div class="overflow-auto rounded-xl border">
			<table class="w-full text-xs">
				<thead class="bg-neutral-100">
					<tr>
						<th class="px-3 py-2 text-left">Время</th>
						<th class="px-3 py-2 text-left">Статус</th>
						<th class="px-3 py-2 text-left">CORS Origin</th>
						<th class="px-3 py-2 text-left">Credentials</th>
						<th class="px-3 py-2 text-left">Ошибка</th>
					</tr>
				</thead>
				<tbody>
					{#each autoLog as entry}
						<tr class="{entry.ok ? '' : 'bg-red-50'}">
							<td class="px-3 py-1.5">{entry.time}</td>
							<td class="px-3 py-1.5 {entry.ok ? 'text-green-700' : 'text-red-700'} font-bold">{entry.httpStatus}</td>
							<td class="px-3 py-1.5 {entry.corsOrigin === 'ОТСУТСТВУЕТ' ? 'text-red-600 font-bold' : ''}">{entry.corsOrigin}</td>
							<td class="px-3 py-1.5">{entry.corsCredentials}</td>
							<td class="px-3 py-1.5 text-red-600">{entry.error ?? ''}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
