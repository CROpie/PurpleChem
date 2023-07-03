<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { writable } from 'svelte/store';
	import { setContext } from 'svelte';
	import type { colorChoice } from '../types';

	let defaultNavClass = 'px-2 sm:px-4 py-2.5 w-full';
	let defaultNavDivClass = 'mx-auto flex flex-wrap justify-between items-center';

	export let color = 'primary';

	const navBarColours: colorChoice = {
		primary: 'dark:text-primaryA-800'
	};
	setContext('colorChoice', color);

	let navClass = twMerge([defaultNavClass, navBarColours[color], $$props.class]);
	let navDivClass = twMerge([defaultNavDivClass, $$props.class]);

	let hidden = true;
	let toggle = () => {
		hidden = !hidden;
	};

	// want to make it colored as primary when clicked
	// need to use a store to ensure the value is able to change after being set on each component
	// const activeComponentId = null;
	const activeComponentId = writable(null);
	setContext('active', activeComponentId);

	// styles for selected anchor tags, retrieved on Brand and Li
	export let selectedColor = 'dark:text-primaryB-500';
	setContext('selected', selectedColor);
</script>

<nav {...$$restProps} class={navClass}>
	<div class={navDivClass}>
		<slot {hidden} {toggle} />
	</div>
</nav>
