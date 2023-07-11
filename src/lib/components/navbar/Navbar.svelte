<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { writable } from 'svelte/store';
	import { setContext } from 'svelte';

	// props
	export let outline = false;
	export let noborder = false;

	let defaultNavClass = 'py-2.5 w-full';
	let defaultNavDivClass =
		'px-4 py-1 mx-auto flex flex-wrap justify-between items-center rounded-lg';

	const fillClass = 'text-opNeutral bg-primary';
	const outlineClass = 'border text-primary border-primary bg-transparent';

	const noborderClass = 'border-none';

	setContext('outline', outline);

	let navClass = twMerge(defaultNavClass, $$props.class);
	let navDivClass = twMerge(
		defaultNavDivClass,
		outline ? outlineClass : fillClass,
		noborder ? noborderClass : '',
		$$props.class
	);

	let hidden = true;
	let toggle = () => {
		hidden = !hidden;
	};

	// want to make it colored as primary when clicked
	// need to use a store to ensure the value is able to change after being set on each component
	// const activeComponentId = null;
	const activeComponentId = writable(null);
	setContext('active', activeComponentId);

	// styles for selected anchor tags, retrieved on Brand and Li
	export let selectedColor = 'text-complement';
	setContext('selected', selectedColor);
</script>

<nav {...$$restProps} class={navClass}>
	<div class={navDivClass}>
		<slot {hidden} {toggle} />
	</div>
</nav>
