<script>
	import { twMerge } from 'tailwind-merge';
	import { getContext } from 'svelte';
	export let href = '';

	const componentId = crypto.randomUUID();

	// need to make activeComponentId a store (in NavUl)
	// think it is because each NavLi component saves an activeComponentId into its own variable
	// which means that the value stays on, rather than turning off, when clicking another component

	// retrieve the value stored as 'active'
	// let activeComponentId = getContext('active');
	const activeComponentId = getContext('active');

	function setActive() {
		$activeComponentId = componentId;
	}

	export let isActive = false;

	let selected = getContext('selected');

	$: isActive = $activeComponentId === componentId;
	const defaultAClass = 'flex items-center';

	$: aClass = twMerge(defaultAClass, isActive ? selected : '', $$props.class);
</script>

<a {href} {...$$restProps} class={aClass} on:click={setActive}>
	<slot />
</a>
