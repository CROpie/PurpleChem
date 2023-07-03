<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { getContext } from 'svelte';
	import type { colorChoice } from '../types';

	export let slideParams = { delay: 250, duration: 500, easing: quintOut };
	export let hidden = true;

	// the key for showing and hiding the nav is in defaultDivClass
	// {hidden} equates to display: none
	// for md: and larger screens, it gets given md:block which takes precedence
	// smaller than md: and it is hidden
	// clicking the button toggles hidden <-> !hidden
	let defaultUlClass =
		'flex flex-col p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium';
	let defaultDivClass = 'w-full md:block md:w-auto';

	export let color: string = getContext('colorChoice');

	let ulColours: colorChoice = {
		primary: 'dark:border-primaryB-300'
	};

	let divClass = twMerge([defaultDivClass, $$props.class]);

	$: ulClass = twMerge([
		defaultUlClass,
		ulColours[color],
		!hidden && 'border rounded-lg-border',
		$$props.class
	]);

	/*
	let MobileUlClass = twMerge([
		defaultUlClass,
		'rounded-lg border',
		ulColours[color],
		$$props.class
	]);
	*/
</script>

{#if !hidden}
	<div
		{...$$restProps}
		class={divClass}
		transition:slide={slideParams}
		on:click
		role="button"
		tabindex="0"
	>
		<ul class={ulClass}>
			<slot />
		</ul>
	</div>
{:else}
	<div {...$$restProps} class={divClass} {hidden}>
		<ul class={ulClass}>
			<slot />
		</ul>
	</div>
{/if}
