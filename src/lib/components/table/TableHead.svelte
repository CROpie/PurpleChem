<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { getContext } from 'svelte';

	// can turn it to false, then have to manually add <tr>'s.
	// this allows for multiple table rows in the table head.
	export let defaultRow = true;

	let outline = getContext('outline');

	const outlineClass = 'border-2 text-complement border-primary bg-transparent';
	const fillClass = 'text-complement bg-primary';

	let theadClass = twMerge(
		'text-xs uppercase cursor-pointer',
		outline ? outlineClass : fillClass,
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
