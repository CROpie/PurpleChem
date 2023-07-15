<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import createPopperAction from './usePopper';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import type { Writable } from 'svelte/store';

	type Details = { label: string; value: any } | null;
	type DetailsContext = Writable<Details>;

	const [usePopperElement, usePopperTooltip] = createPopperAction();

	export let placement = 'bottom';
	export let outline = false;
	setContext('outline', outline);

	export let defaultText = 'Choose an option:';
	export let label: string | null = null;
	let value: any = null;
	export let name: string | null = null;

	let showOptions = false;

	const divClass = twMerge('w-full', $$props.divClass);

	const defaultClass = 'p-2 text-lg w-full';
	const fillClass = 'text-neutral bg-primary hover:text-opNeutral hover:bg-complement';
	const outlineClass =
		'border text-primary border-primary bg-transparent hover:text-complement hover:border-complement';

	const elementClass = twMerge(defaultClass, outline ? outlineClass : fillClass, $$props.class);
	// need to make width a clamp to ensure it's not too big at smaller screens ?
	const popupClass = twMerge('', $$props.popClass);
	const labelClass = twMerge('text-primary', $$props.labelClass);

	const details: DetailsContext = writable(null);
	setContext('details', details);

	const getData = () => {
		if ($details) {
			value = $details.value;
			defaultText = $details.label;
			showOptions = false;
		}
	};

	// $: console.log('details store: ', $details);
	$: $details && getData();

	import { clickOutside } from './clickOutside';
</script>

<div
	use:clickOutside={() => {
		showOptions = false;
	}}
	class={divClass}
>
	{#if label}
		<div class={labelClass}>{label}</div>
	{/if}
	<button
		type="button"
		class={elementClass}
		on:click={() => (showOptions = !showOptions)}
		use:usePopperElement>{defaultText}</button
	>

	{#if showOptions}
		<div use:usePopperTooltip={{ placement }} class={popupClass}>
			<slot />
		</div>
	{/if}
	<input type="hidden" {name} bind:value />
</div>
