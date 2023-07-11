<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { getContext } from 'svelte';

	let outline = getContext('outline');

	const outlineClass =
		'border-2 text-primary odd:border-primaryLight even:border-primary bg-transparent hover:bg-primaryDark hover:text-neutral';
	const fillClass = 'text-neutral odd:bg-primaryLight even:bg-primary hover:bg-primaryDark';
</script>

<tr {...$$restProps} class={twMerge(outline ? outlineClass : fillClass, $$props.class)}>
	<slot />
</tr>

<!--
  @component
  ## Props
    color: update the color scheme of the body rows
-->
