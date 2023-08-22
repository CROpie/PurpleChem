<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { setContext } from 'svelte';

	// export let striped = true;
	export let outline = false;
	export let hoverable = false;

	// setContext('striped', striped);
	setContext('outline', outline);
	setContext('hoverable', hoverable);

	let divClass = 'relative overflow-x-auto shadow-md sm:rounded-lg';
	let tableClass = 'w-full text-left text-sm';
</script>

<div class={twMerge(divClass, $$props.divClass)}>
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
