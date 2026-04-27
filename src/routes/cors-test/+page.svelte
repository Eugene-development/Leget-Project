<script>
	import { browser } from '$app/environment';
	import { getGraphQLUrl, getAuthApiUrl } from '$lib/utils/config.js';

	let result = $state(null);
	let error = $state(null);
	let loading = $state(false);
	let configInfo = $state(null);

	$effect(() => {
		if (browser) {
			configInfo = {
				graphqlUrl: getGraphQLUrl(),
				authUrl: getAuthApiUrl(),
				appConfig: window.__APP_CONFIG__ ?? 'NOT LOADED'
			};
		}
	});

	async function testRequest() {
		loading = true;
		error = null;
		result = null;

		const token = localStorage.getItem('auth_token');
		const url = getGraphQLUrl();

		try {
			const res = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					...(token ? { 'Authorization': `Bearer ${token}` } : {})
				},
				body: JSON.stringify({
					query: `query MyLicenses {
						myLicenses {
							id
							domain
							name
							isActive
							status
						}
					}`
				})
			});

			const corsHeader = res.headers.get('access-control-allow-origin');
			const credHeader = res.headers.get('access-control-allow-credentials');
			const data = await res.json();

			result = {
				httpStatus: res.status,
				corsOriginHeader: corsHeader,
				corsCredentialsHeader: credHeader,
				data
			};
		} catch (err) {
			error = err.message;
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>CORS Test | LEGET</title>
</svelte:head>

<div class="mx-auto max-w-2xl p-8 font-mono text-sm">
	<h1 class="mb-6 text-2xl font-bold text-neutral-950">CORS Test Page</h1>

	<!-- Config info -->
	{#if configInfo}
		<div class="mb-6 rounded-xl bg-neutral-100 p-4">
			<p class="font-semibold text-neutral-700">Config:</p>
			<p>GraphQL URL: <span class="text-indigo-600">{configInfo.graphqlUrl}</span></p>
			<p>Auth URL: <span class="text-indigo-600">{configInfo.authUrl}</span></p>
			<p>Token: <span class="text-indigo-600">
				{#if browser}
					{localStorage.getItem('auth_token') ? '✅ present' : '❌ not found (not logged in)'}
				{/if}
			</span></p>
			<p class="mt-2 text-xs text-neutral-500">
				APP_CONFIG: {JSON.stringify(configInfo.appConfig)}
			</p>
		</div>
	{/if}

	<button
		onclick={testRequest}
		disabled={loading}
		class="mb-6 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
	>
		{loading ? 'Запрос...' : 'Отправить запрос к API'}
	</button>

	{#if error}
		<div class="rounded-xl bg-red-50 p-4 text-red-700">
			<p class="font-semibold">❌ Ошибка:</p>
			<p>{error}</p>
		</div>
	{/if}

	{#if result}
		<div class="rounded-xl bg-green-50 p-4">
			<p class="font-semibold text-green-800">✅ Ответ получен:</p>
			<div class="mt-2 space-y-1">
				<p>HTTP Status: <span class="font-bold">{result.httpStatus}</span></p>
				<p>Access-Control-Allow-Origin: 
					<span class:text-green-700={result.corsOriginHeader} class:text-red-600={!result.corsOriginHeader}>
						{result.corsOriginHeader ?? '❌ ОТСУТСТВУЕТ'}
					</span>
				</p>
				<p>Access-Control-Allow-Credentials: 
					<span class:text-orange-600={result.corsCredentialsHeader === 'true'}>
						{result.corsCredentialsHeader ?? 'не задан'}
					</span>
				</p>
			</div>
			<pre class="mt-4 overflow-auto rounded bg-white p-3 text-xs">{JSON.stringify(result.data, null, 2)}</pre>
		</div>
	{/if}
</div>
