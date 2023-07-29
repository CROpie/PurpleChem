<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	type ActiveId = string | null;
	type ActiveIdContext = Writable<ActiveId>;

	let outline = getContext('outline');

	const defaultClass = 'flex items-center p-2 text-base font-normal rounded-lg cursor-pointer';
	let fillClass = 'text-neutral hover:text-complement';
	let outlineClass = 'text-primary hover:text-complement';

	export let href = '';
	export let label = '';
	export let spanClass = 'ml-3';

	// change colour when clicked
	const componentId = crypto.randomUUID();
	const activeComponentId: ActiveIdContext = getContext('active');

	export let startSelected = false;
	$: startSelected && setActive();

	function setActive() {
		$activeComponentId = componentId;
	}

	export let isActive = false;

	let selectedColour: string = getContext('selectedColour');
	$: isActive = $activeComponentId === componentId;

	let elementClass = '';
	$: elementClass = twMerge(
		defaultClass,
		outline ? outlineClass : fillClass,
		isActive ? selectedColour : '',
		$$props.class
	);
</script>

<li>
	<svelte:element
		this={href ? 'a' : 'button'}
		{...$$restProps}
		on:click={setActive}
		role={href ? undefined : 'link'}
		class={elementClass}
		on:click
	>
		<slot name="icon" />

		<span role="button" class={spanClass}>{label}</span>

		{#if $$slots.subtext}
			<slot name="subtext" />
		{/if}
	</svelte:element>
</li>
