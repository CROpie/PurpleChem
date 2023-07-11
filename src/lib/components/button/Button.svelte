<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import type { colorChoice } from '../types';

	export let outline = false;
	export let size = 'md';

	export let href: string | undefined = undefined;

	const defaultClass = 'rounded-lg';
	const fillClass = 'text-neutral bg-primary hover:text-opNeutral hover:bg-complement';
	const outlineClass =
		'border text-primary border-primary bg-transparent hover:text-complement hover:border-complement';

	const sizeClasses: colorChoice = {
		xs: 'px-3 py-2 text-xs',
		sm: 'px-4 py-2 text-sm',
		md: 'px-5 py-2.5 text-sm',
		lg: 'px-5 py-3 text-base',
		xl: 'px-6 py-3.5 text-base'
	};

	const buttonClass = twMerge(
		defaultClass,
		outline ? outlineClass : fillClass,
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
