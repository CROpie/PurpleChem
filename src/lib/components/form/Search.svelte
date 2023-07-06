<script lang="ts">
	import { Input } from './formAll';
	import type { colorChoice } from '../types';
	import { twMerge } from 'tailwind-merge';
	export let inputValue = 'Search';
	export let placeholder = '';

	export let color = 'primary';

	let svgColours: colorChoice = {
		primary: 'dark:text-primaryA-500'
	};

	let svgClass = twMerge('w-5 h-5', svgColours[color], $$props.svgClass);
	let divClass = twMerge('', $$props.divClass);
</script>

<div class={divClass}>
	<div class="relative mt-1">
		<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
			<svg
				class={svgClass}
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
			{placeholder}
			class={twMerge('pl-10', $$props.class)}
		/>
	</div>
</div>

<!--
  @component
  ## Props
    divClass: container div
	svgClass: svg on the left
	class: input field
-->
