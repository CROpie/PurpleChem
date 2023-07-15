<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { getContext } from 'svelte';

	let outline = getContext('outline');

	const defaultClass = 'overflow-y-auto py-4 px-3 rounded';
	const fillClass = 'bg-primary';
	const outlineClass = 'border-2 border-primary bg-transparent';

	let divClass = twMerge(defaultClass, outline ? outlineClass : fillClass, $$props.class);
</script>

<div {...$$restProps} class={divClass}>
	<slot />
</div>
