<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	type ActiveId = string | null;
	type ActiveIdContext = Writable<ActiveId>;

	export let href = '';

	let defaultLiClass = 'block py-2 pr-4 pl-3 md:p-0 rounded md:border-0 hover:text-complement';

	const componentId = crypto.randomUUID();

	// need to make activeComponentId a store (in NavUl)
	// think it is because each NavLi component saves an activeComponentId into its own variable
	// which means that the value stays on, rather than turning off, when clicking another component

	// retrieve the value stored as 'active'
	// let activeComponentId = getContext('active');
	const activeComponentId: ActiveIdContext = getContext('active');

	function setActive() {
		$activeComponentId = componentId;
	}

	export let isActive = false;

	let selected: string = getContext('selected');

	$: isActive = $activeComponentId === componentId;

	// need to make it reactive to allow for the isActive ? logic to be run

	// let liClass = twMerge(defaultLiClass, isActive ? selected : notSelected, $$props.class);
	// $: liClass = twMerge(defaultLiClass, isActive ? selected : '', $$props.class);

	$: liClass = twMerge(defaultLiClass, isActive && selected, $$props.class);

	// can is isActive && selected to choose selected if isActive is true
	// otherwise can use isActive ? selected : notSelected to choose from two options
</script>

<li>
	<svelte:element
		this={href ? 'a' : 'div'}
		role={href ? undefined : 'link'}
		{href}
		on:click={setActive}
		{...$$restProps}
		class={liClass}
	>
		<slot />
	</svelte:element>
</li>
