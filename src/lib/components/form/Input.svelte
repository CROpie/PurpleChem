<script lang="ts">
	/* want to replicate the Input component from flowbite */
	import { twMerge } from 'tailwind-merge';
	import type { colorChoice } from '../types';

	export let label = '';
	export let value: any = undefined;
	export let outline = false;

	const defaultClass = 'block w-full rounded-lg text-lg p-2 outline-none focus:ring-0';
	const outlineClass =
		'border-2 text-primary border-primary bg-transparent focus:border-complement';
	const fillClass = 'text-neutral bg-primary focus:bg-complement';

	export let divClass = twMerge('w-full', $$props.divClass);
	export let labelClass = twMerge('text-primary', $$props.labelClass);
	const inputClass = twMerge(defaultClass, outline ? outlineClass : fillClass, $$props.class);

	// without bind:value, can't use bind value
	// without {...$$restProps}, can't use input attributes like name, type etc
	// add $$props.class to inputClass allows for modifications via class="" when using the component
</script>

<div class={divClass}>
	<div class={labelClass}>{label}</div>
	<input {...$$restProps} bind:value class={inputClass} />
</div>

<!--
  @component
  # PROPS
  label: a label above the input field. No need for [input id=''] or [label for='']
-->
