<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { getContext } from 'svelte';
	import type { colorChoice } from '../types';

	export let color: string = getContext('colorChoice');

	const aColours: colorChoice = {
		primary: 'dark:text-white dark:hover:bg-primaryA-500'
	};

	export let aClass = 'flex items-center p-2 text-base font-normal rounded-lg cursor-pointer';
	export let href = '';
	export let label = '';
	export let spanClass = 'ml-3';
	// export let activeClass = 'flex items-center p-2 text-base font-normal text-gray-900 bg-gray-200 dark:bg-gray-700 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700';
	// export let active = false;
</script>

<li>
	<svelte:element
		this={href ? 'a' : 'div'}
		{...$$restProps}
		role={href ? undefined : 'link'}
		class={twMerge(aClass, aColours[color], $$props.class)}
		on:click
	>
		<slot name="icon" />

		<span class={spanClass}>{label}</span>

		{#if $$slots.subtext}
			<slot name="subtext" />
		{/if}
	</svelte:element>
</li>
