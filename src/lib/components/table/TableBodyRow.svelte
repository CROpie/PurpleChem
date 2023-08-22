<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { getContext } from 'svelte';

	let outline = getContext('outline');
	let hoverable = getContext('hoverable');

	const hoverClass = 'hover:bg-primaryDark hover:text-neutral';
	const noHoverClass = 'hover:text-neutral';

	const outlineClass =
		'border-2 text-primary odd:border-primaryLight even:border-primary bg-transparent  ';
	const fillClass = 'text-neutral odd:bg-primaryLight even:bg-primary hover:bg-primaryDark';
</script>

<tr
	{...$$restProps}
	class={twMerge(
		outline ? outlineClass : fillClass,
		hoverable ? hoverClass : noHoverClass,
		$$props.class
	)}
>
	<slot />
</tr>

<!--
  @component
  ## Props
    color: update the color scheme of the body rows
-->
