<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { setContext } from 'svelte';
	export let color = 'primary';

	setContext('colorChoice', color);
</script>

<aside {...$$restProps} class={twMerge('w-64', $$props.class)} aria-label="Sidebar">
	<slot />
</aside>
