<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { setAccordionOptions } from './context';

	// by default more than one accordian can be open
	export let colapse = false;

	// all this is replaced by a link to context.ts
	// import { writable } from 'svelte/store';
	// import { setContext } from 'svelte';
	// const activeComponentId = writable(null);
	// setContext('colapse', colapse);
	// setContext('active', activeComponentId);

	setAccordionOptions({ colapse });

	let defaultDivStyle =
		'w-full p-2 text-primary-500 bg-yellow-200 border-4 border-white rounded-lg';
</script>

<div class={twMerge(defaultDivStyle)}>
	<slot />
</div>

<!--
  @component
  # PROPS
  collapse: clicking one will ensure all the others are closed
-->
