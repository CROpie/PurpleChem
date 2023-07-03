<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import type { colorChoice } from '../types';
	export let size = 'md';
	const svgSizes: colorChoice = {
		xs: 'w-3 h-3',
		sm: 'w-3.5 h-3.5',
		md: 'w-5 h-5',
		lg: 'w-5 h-5'
	};

	let buttonClass = twMerge('focus:outline-none whitespace-normal', $$props.class);
</script>

<button on:click type="button" {...$$restProps} class={buttonClass}>
	<slot svgSize={svgSizes[size]} />
</button>
