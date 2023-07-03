<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	const tableRowClass = 'px-6 py-4 whitespace-nowrap font-medium';
</script>

<td {...$$restProps} class={twMerge(tableRowClass)} on:click>
	<slot />
</td>
