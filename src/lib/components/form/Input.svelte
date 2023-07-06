<script lang="ts">
	/* want to replicate the Input component from flowbite */
	import { twMerge } from 'tailwind-merge';
	import type { colorChoice } from '../types';

	export let label = '';
	export let value: any = undefined;
	export let color = 'primary';

	let defaultClass = 'block w-full rounded-lg bg-transparent border-2 text-lg p-2 outline-none';

	let inputColours: colorChoice = {
		primary:
			'dark:text-primaryB-300 dark:border-primaryA-500 dark:focus:border-primaryA-800 focus:ring-0'
	};
	let labelColours: colorChoice = {
		primary: 'text-green-400 dark:text-primaryA-500'
	};

	let inputClass = twMerge([defaultClass, inputColours[color], $$props.class]);
	let divClass = twMerge('w-full', $$props.divClass);

	// without bind:value, can't use bind value
	// without {...$$restProps}, can't use input attributes like name, type etc
	// add $$props.class to inputClass allows for modifications via class="" when using the component
</script>

<div class={divClass}>
	<div class={labelColours[color]}>{label}</div>
	<input {...$$restProps} bind:value class={inputClass} />
</div>

<!--
  @component
  # PROPS
  label: a label above the input field. No need for [input id=''] or [label for='']
-->
