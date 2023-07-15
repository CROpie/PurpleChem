<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	export let border = false;

	const defaultClass = 'space-y-2';
	export let borderClass = 'pt-4 mt-4 border-t border-neutral';
</script>

<ul {...$$restProps} class={twMerge(defaultClass, border ? borderClass : '', $$props.class)}>
	<slot />
</ul>
