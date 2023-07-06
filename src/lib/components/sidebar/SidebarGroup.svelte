<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { getContext } from 'svelte';
	import type { colorChoice } from '../types';

	export let color: string = getContext('colorChoice');

	const separatorColours: colorChoice = {
		primary: 'dark:border-primaryB-300'
	};

	export let ulClass = 'space-y-2';
	export let borderClass = 'pt-4 mt-4 border-t';
	export let border = false;
	if (border) {
		ulClass += ' ' + borderClass;
	}
</script>

<ul {...$$restProps} class={twMerge(ulClass, separatorColours[color], $$props.class)}>
	<slot />
</ul>
