<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { setContext } from 'svelte';

	export let color = 'default';
	export let striped = false;

	// Flowbite uses $: setContext ???
	setContext('colorChoice', color);
	setContext('striped', striped);

	let divClass = 'relative overflow-x-auto shadow-md sm:rounded-lg';
	let tableClass = 'w-full text-left text-sm';
</script>

<div class={twMerge(divClass)}>
	<table {...$$restProps} class={twMerge(tableClass, $$props.class)}>
		<slot />
	</table>
</div>

<!--
  @component
  ## Props
    color: set the color scheme of the entire table
    colors can be superceded by using the color prop on other table components
-->
