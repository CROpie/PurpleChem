<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { getContext } from 'svelte';
	import type { colorChoice } from '../types';

	export let color: string = getContext('colorChoice');

	const sidebarColours: colorChoice = {
		primary: 'dark:bg-primaryA-800'
	};

	export let divClass = 'overflow-y-auto py-4 px-3 rounded';
</script>

<div {...$$restProps} class={twMerge(divClass, sidebarColours[color], $$props.class)}>
	<slot />
</div>
