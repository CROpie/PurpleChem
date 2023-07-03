<script>
	import ToolbarButton from './ToolbarButton.svelte';
	import Menu from './Menu.svelte';
	import { twMerge } from 'tailwind-merge';

	export let btnClass = 'ml-3 md:hidden';
	export let menuClass = 'h-6 w-6 shrink-0';
</script>

<ToolbarButton
	name="Open main menu"
	on:click
	{...$$restProps}
	class={twMerge(btnClass, $$props.class)}
>
	<Menu class={twMerge(menuClass, $$props.classMenu)} />
</ToolbarButton>
