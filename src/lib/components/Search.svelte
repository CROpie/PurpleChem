<script lang="ts">
	export let inputValue = 'Search';
	export let placeholder = '';
	import { Input } from 'flowbite-svelte';
</script>

<div class="p-4">
	<div class="relative mt-1">
		<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
			<svg
				class="w-5 h-5 text-gray-500 dark:text-gray-400"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
				><path
					fill-rule="evenodd"
					d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
					clip-rule="evenodd"
				/></svg
			>
		</div>
		<Input
			{...$$restProps}
			bind:value={inputValue}
			type="text"
			class="border border-gray-300 text-sm rounded-lg dark:text-primary-500 pl-10 dark:bg-black"
			{placeholder}
		/>
	</div>
</div>
