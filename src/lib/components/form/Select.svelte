<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import type { colorChoice } from '../types';

	type itemList = { value: string; name: string }[];

	export let items: itemList = [];
	export let value: any = undefined;
	export let placeholder = 'Choose option: ';
	//export let size = 'md';
	export let label = '';

	export let color = 'primary';

	const selectColours: colorChoice = {
		primary: 'dark:bg-transparent dark:text-primaryA-800 dark:border-primaryA-500 focus:ring-0'
	};
	/*
	const sizes: colorChoice = {
		sm: 'text-sm p-2',
		md: 'text-sm p-2.5',
		lg: 'text-base py-3 px-4'
	};
*/
	let labelColours: colorChoice = {
		primary: 'text-green-400 dark:text-primaryA-500'
	};

	let selectClass = twMerge(
		//sizes[size],
		'block w-full rounded-lg border-2 p-2 text-lg',
		selectColours[color],
		$$props.class
	);
	let optionClass = twMerge('', selectColours[color]);

	let divClass = twMerge('w-full', $$props.divClass);
</script>

<div class={divClass}>
	<div class={labelColours[color]}>{label}</div>
	<select {...$$restProps} bind:value class={selectClass} on:change on:contextmenu on:input>
		{#if placeholder}
			<option disabled selected value="" class={optionClass}>{placeholder}</option>
		{/if}

		{#each items as { value, name }}
			<option {value} class={optionClass}>{name}</option>
		{:else}
			<slot />
		{/each}
	</select>
</div>
