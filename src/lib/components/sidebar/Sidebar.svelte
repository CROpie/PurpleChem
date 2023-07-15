<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	export let outline = false;

	setContext('outline', outline);

	const activeComponentId = writable(null);
	setContext('active', activeComponentId);

	export let selectedColour = 'text-complement';
	setContext('selectedColour', selectedColour);
</script>

<aside {...$$restProps} class={twMerge('w-64', $$props.class)} aria-label="Sidebar">
	<slot />
</aside>
