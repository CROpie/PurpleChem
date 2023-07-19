<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { getContext } from 'svelte';

	import type { Writable } from 'svelte/store';
	type Details = { label: string; value: any } | null;
	type DetailsContext = Writable<Details>;

	let outline = getContext('outline');

	const defaultClass = 'w-full p-2';
	const fillClass =
		'text-neutral bg-primaryLight hover:text-opNeutral hover:bg-complement border-none outline-none';
	const outlineClass =
		'border text-primary border-primaryLight bg-opNeutral hover:text-complement hover:border-complement';

	const buttonClass = twMerge(defaultClass, outline ? outlineClass : fillClass, $$props.class);

	export let value: number | string | null = null;
	export let label = '';

	const details: DetailsContext = getContext('details');

	const clickHandler = () => {
		$details = { value, label };
	};

	// import { clickOutside } from './clickOutside';

	// function handleClickOutside(event) {
	// 	console.log('boop');
	// }
</script>

<button class={buttonClass} on:click={clickHandler} type="button">
	{label}
</button>
<!-- <div use:clickOutside on:click_outside={handleClickOutside}>Click outside me!</div> -->
