<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import createPopperAction from './usePopper';
	import { setContext } from 'svelte';

	const [usePopperElement, usePopperTooltip] = createPopperAction();

	export let placement = 'bottom';
	export let outline = false;
	setContext('outline', outline);

	let selectedOption = '';
	setContext('selectedOption', selectedOption);

	let showOptions = false;

	const defaultClass = 'w-64 p-2';
	const fillClass = 'text-neutral bg-primary hover:text-opNeutral hover:bg-complement';
	const outlineClass =
		'border text-primary border-primary bg-transparent hover:text-complement hover:border-complement';

	const elementClass = twMerge(defaultClass, outline ? outlineClass : fillClass, $$props.class);
	// need to make width a clamp to ensure it's not too big at smaller screens ?
	const popupClass = twMerge('w-48', $$props.popClass);
</script>

<button on:click={() => (showOptions = !showOptions)} class={elementClass} use:usePopperElement
	>Dropdown</button
>

{#if showOptions}
	<div use:usePopperTooltip={{ placement }} class={popupClass}>
		<slot />
	</div>
{/if}
