<script>
	import { twMerge } from 'tailwind-merge';
	export let tableHeaderClass = 'px-6 py-3';
</script>

<th {...$$restProps} class={twMerge(tableHeaderClass, $$props.class)} on:click>
	<slot />
</th>
