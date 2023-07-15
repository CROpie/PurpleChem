<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { getContext } from 'svelte';

	let outline = getContext('outline');

	const defaultClass = 'w-full p-2';
	const fillClass =
		'text-neutral bg-primaryLight hover:text-opNeutral hover:bg-complement border-none outline-none';
	const outlineClass =
		'border text-primary border-primaryLight bg-opNeutral hover:text-complement hover:border-complement';

	const buttonClass = twMerge(defaultClass, outline ? outlineClass : fillClass, $$props.class);
</script>

<button class={buttonClass}>
	<slot />
</button>
