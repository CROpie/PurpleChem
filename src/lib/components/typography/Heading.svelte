<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import type { colorChoice } from '../types';

	export let tag = 'h1';

	const textSizes: colorChoice = {
		h1: 'text-5xl font-extrabold',
		h2: 'text-4xl font-bold',
		h3: 'text-3xl font-bold',
		h4: 'text-2xl font-bold',
		h5: 'text-xl font-bold',
		h6: 'text-lg font-bold'
	};

	export let color: string = 'primary';

	const headingColours: colorChoice = {
		primary: 'dark:text-primaryA-500'
	};

	// need to include role={} if onclick is used with svelte:element due to A11y...
</script>

<svelte:element
	this={tag}
	{...$$restProps}
	on:click
	role={$$props.onclick ? 'button' : undefined}
	class={twMerge(headingColours[color], textSizes[tag], $$props.class)}
>
	<slot />
</svelte:element>
