<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	import { getAccordionOptions } from './context';
	// by default the accordian item is closed
	export let open = false;

	const componentId = crypto.randomUUID();

	const { colapse, activeComponentId } = getAccordionOptions();

	// replaced by a link to context.ts
	// import { getContext } from 'svelte';
	// const colapse = getContext('colapse');
	// const activeComponentId = getContext('active');

	let defaultAccordionName = 'w-full flex justify-between p-1 border-2 border-black rounded-lg';
	let defaultAccordionContent = 'p-1';
	function setActive() {
		$activeComponentId = componentId; // activeComponentId.set(componentId)
	}

	function toggleOpen() {
		open = !open;
	}

	// if user passed collapse, use setActive, otherwise have use toggleOpen as default
	function handleClick() {
		colapse ? setActive() : toggleOpen();
	}

	// if open is true and colapse is true, short circuit it and set it to active
	$: open && colapse && setActive();

	// look to see if the active component id matches the component id
	$: isActive = $activeComponentId === componentId;

	// if colapse is passed, then look for isActive, otherwise look for open
	$: isOpen = colapse ? isActive : open;
</script>

<div>
	<button on:click={handleClick} class={twMerge(defaultAccordionName, $$props.nameClass)}>
		<div>
			<slot name="title" />
		</div>
	</button>

	{#if isOpen}
		<div class={twMerge(defaultAccordionContent, $$props.contentClass)}>
			<slot name="content" />
		</div>
	{/if}
</div>

<!--
  @component
  # PROPS
  open: set an item to be open by default
-->
