<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { page } from '$app/stores';
	import Dark from './dark.svelte';
	import Light from './light.svelte';
	import { clickOutside } from './clickOutside';
	import createPopperAction from './usePopper';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';

	const [usePopperElement, usePopperTooltip] = createPopperAction();

	export let brightness = 'dark';
	export let colours = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'gray'];
	export let placement = 'bottom';
	const formClass = twMerge('', $$props.class);

	const colourJi = {
		red: '🔴',
		orange: '🟠',
		yellow: '🟡',
		green: '🟢',
		blue: '🔵',
		purple: '🟣',
		gray: '⚪'
	};

	let showOptions = false;

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
		showOptions = false;
	};
</script>

<form
	method="POST"
	use:clickOutside={() => {
		showOptions = false;
	}}
	use:enhance={submitUpdateTheme}
	class={formClass}
>
	<ul class="text-primary w-7" use:usePopperElement>
		<button type="button" on:click={() => (showOptions = !showOptions)}>
			{#if brightness === 'dark'}
				<Dark />
			{:else if brightness === 'light'}
				<Light />
			{/if}
		</button>
		{#if showOptions}
			<div
				class="bg-opNeutral w-7 flex flex-col justify-center items-center"
				use:usePopperTooltip={{ placement }}
			>
				{#each colours as colour, index (index)}
					<li class="text-{colour}-500">
						<button
							formaction="/?/setTheme&themeld=theme-{brightness}&themeco=theme-{colour}&redirectTo={$page
								.url.pathname}"
							class="text-lg">{colourJi[colour]}</button
						>
					</li>
				{/each}
			</div>
		{/if}
	</ul>
</form>
