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

	const defaultClass = 'text-primary';
	const headingClass = twMerge(defaultClass, textSizes[tag], $$props.class);

	// need to include role={} if onclick is used with svelte:element due to A11y...
</script>

<svelte:element
	this={tag}
	{...$$restProps}
	on:click
	role={$$props.onclick ? 'button' : 'heading'}
	class={headingClass}
>
	<slot />
</svelte:element>
