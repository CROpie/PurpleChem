<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { getContext } from 'svelte';
	import type { colorChoice } from '../types';

	// can turn it to false, then have to manually add <tr>'s.
	// this allows for multiple table rows in the table head.
	export let defaultRow = true;

	export let color: string = getContext('colorChoice');

	const tableHeadColours: colorChoice = {
		primary: 'text-primaryB-300 bg-primaryA-800'
	};

	let theadClass = twMerge(
		'text-xs uppercase cursor-pointer',
		tableHeadColours[color],
		$$props.class
	);
</script>

<thead {...$$restProps} class={theadClass}>
	{#if defaultRow}
		<tr>
			<slot />
		</tr>
	{:else}
		<slot />
	{/if}
</thead>

<!--
  @component
  ## Props
    color: change the color scheme of the Head row
-->
