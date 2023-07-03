<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import type { colorChoice } from '../types';

	export let color = 'primary';
	export let outline = false;
	export let size = 'md';

	export let href: string | undefined = undefined;

	const buttonColours: colorChoice = {
		primary:
			'dark:text-primaryB-300 dark:bg-primaryA-700 border dark:border-primaryB-300 dark:hover:bg-primaryA-300'
	};
	const outlineColours: colorChoice = {
		primary: 'dark:text-primaryA-500 border dark:border-primaryA-500 dark:hover:bg-primaryB-300'
	};
	const sizeClasses: colorChoice = {
		xs: 'px-3 py-2 text-xs',
		sm: 'px-4 py-2 text-sm',
		md: 'px-5 py-2.5 text-sm',
		lg: 'px-5 py-3 text-base',
		xl: 'px-6 py-3.5 text-base'
	};

	$: buttonClass = twMerge(
		'rounded-lg',
		outline ? outlineColours[color] : buttonColours[color],
		sizeClasses[size],
		$$props.class
	);
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	{href}
	{...$$restProps}
	class={buttonClass}
	on:click
	on:change
	on:keydown
	on:keyup
	on:touchstart
	on:touchend
	on:touchcancel
	on:mouseenter
	on:mouseleave
	role={'button'}
>
	<slot />
</svelte:element>
