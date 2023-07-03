<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { getContext } from 'svelte';
	import type { colorChoice } from '../types';

	export let color: string = getContext('colorChoice');

	const tableRowColours: colorChoice = {
		primary: 'dark:text-primaryB-100 dark:bg-primaryA-400 border-b dark:border-primaryA-300'
	};
	const stripedColours: colorChoice = {
		primary: 'dark:odd:bg-primaryA-400 dark:even:bg-primaryA-600 border-0'
	};
	const hoverColours: colorChoice = {
		primary: 'dark:hover:bg-primaryA-300'
	};

	let striped: boolean = getContext('striped');
</script>

<tr
	{...$$restProps}
	class={twMerge(
		tableRowColours[color],
		hoverColours[color],
		striped && stripedColours[color],
		$$props.class
	)}
>
	<slot />
</tr>

<!--
  @component
  ## Props
    color: update the color scheme of the body rows
-->
