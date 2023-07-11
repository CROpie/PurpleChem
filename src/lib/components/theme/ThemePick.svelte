<script lang="ts">
	import { enhance } from '$app/forms';
	// export let brights = ['dark', 'light'];
	export let colours = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'gray'];
	import { page } from '$app/stores';
	import type { SubmitFunction } from '@sveltejs/kit';

	import Dark from './dark.svelte';
	import Light from './light.svelte';
	export let showDark = false;
	export let showLight = false;

	// Update the theme via the client, rather than the server
	// Means don't have to refresh the page to get the effect
	const submitUpdateTheme: SubmitFunction = ({ action }) => {
		const themeld = action.searchParams.get('themeld');
		const themeco = action.searchParams.get('themeco');
		const theme = `${themeld} ${themeco}`;

		if (theme) {
			// document.documentElement.setAttribute('class', theme);
			document.documentElement.setAttribute('class', theme);
		}
	};
</script>

<!-- <form method="POST">
	<ul class="text-primary">
		{#each brights as bright}
			<div class="flex justify-center items-center">
				{#if bright == 'dark'}
					<Dark />
				{:else}
					<Light />
				{/if}

				{#each colours as colour, index (index)}
					<li class="text-{colour}-500">
						<button
							formaction="/?/setTheme&themeld=theme-{bright}&themeco=theme-{colour}&redirectTo={$page
								.url.pathname}"
							class="text-{colour}-500 text-2xl">●</button
						>
					</li>
				{/each}
			</div>
		{/each}
	</ul>
</form> -->
<form method="POST" use:enhance={submitUpdateTheme}>
	<ul class="text-primary">
		<div class="flex justify-center items-center">
			<button type="button" on:click={() => (showDark = !showDark)}><Dark /></button>
			{#if showDark}
				{#each colours as colour, index (index)}
					<li class="text-{colour}-500">
						<button
							formaction="/?/setTheme&themeld=theme-dark&themeco=theme-{colour}&redirectTo={$page
								.url.pathname}"
							class="text-{colour}-500 text-2xl">●</button
						>
					</li>
				{/each}
			{/if}
		</div>
		<div class="flex justify-center items-center">
			<button type="button" on:click={() => (showLight = !showLight)}><Light /></button>
			{#if showLight}
				{#each colours as colour, index (index)}
					<li class="text-{colour}-500">
						<button
							formaction="/?/setTheme&themeld=theme-light&themeco=theme-{colour}&redirectTo={$page
								.url.pathname}"
							class="text-{colour}-500 text-2xl">●</button
						>
					</li>
				{/each}
			{/if}
		</div>
	</ul>
</form>
